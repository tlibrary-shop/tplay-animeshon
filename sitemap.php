<?php
declare(strict_types=1);

// Endpoint sitemap.xml dinamis untuk anistreaming.com.
// Konfigurasi melalui environment variable: DB_DSN, DB_USER, DB_PASS,
// SITE_URL (default https://anistreaming.com).

const SITEMAP_CONTENT_TYPE = 'application/xml; charset=UTF-8';

$siteUrl = rtrim((string) (getenv('SITE_URL') ?: 'https://anistreaming.com'), '/');
$dsn = getenv('DB_DSN') ?: 'mysql:host=127.0.0.1;dbname=anistream;charset=utf8mb4';
$dbUser = getenv('DB_USER') ?: '';
$dbPass = getenv('DB_PASS') ?: '';

header('Content-Type: ' . SITEMAP_CONTENT_TYPE);
header('Cache-Control: public, max-age=300, s-maxage=300');

function xmlUrl(string $siteUrl, string $path, ?string $lastmod, string $changefreq, string $priority): string
{
    $url = htmlspecialchars($siteUrl . '/' . ltrim($path, '/'), ENT_XML1 | ENT_QUOTES, 'UTF-8');
    $mod = $lastmod ? gmdate('c', strtotime($lastmod)) : null;
    $xml = "  <url>\n    <loc>{$url}</loc>\n";
    if ($mod) $xml .= '    <lastmod>' . htmlspecialchars($mod, ENT_XML1, 'UTF-8') . "</lastmod>\n";
    $xml .= "    <changefreq>{$changefreq}</changefreq>\n    <priority>{$priority}</priority>\n  </url>\n";
    return $xml;
}

function safeSegment(mixed $value): string
{
    // Hanya izinkan slug URL yang aman; cegah karakter ilegal XML/path traversal.
    return preg_replace('/[^A-Za-z0-9._~-]/', '-', trim((string) $value, " /\\\0..\37")) ?: '';
}

try {
    $pdo = new PDO($dsn, $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    $urls = [];
    $urls[] = xmlUrl($siteUrl, '/', gmdate('c'), 'hourly', '1.0');
    $urls[] = xmlUrl($siteUrl, '/anime', null, 'daily', '0.9');

    // Sesuaikan nama tabel/kolom berikut dengan skema aplikasi Anda.
    $genres = $pdo->query("SELECT slug, updated_at FROM genres WHERE is_active = 1 ORDER BY slug");
    foreach ($genres as $row) {
        $slug = safeSegment($row['slug'] ?? '');
        if ($slug !== '') $urls[] = xmlUrl($siteUrl, '/genre/' . $slug, $row['updated_at'] ?? null, 'daily', '0.7');
    }

    $anime = $pdo->query("SELECT slug, updated_at FROM anime WHERE status <> 'deleted' ORDER BY updated_at DESC");
    foreach ($anime as $row) {
        $slug = safeSegment($row['slug'] ?? '');
        if ($slug !== '') $urls[] = xmlUrl($siteUrl, '/anime/' . $slug, $row['updated_at'] ?? null, 'daily', '0.8');
    }

    $episodes = $pdo->query("SELECT a.slug AS anime_slug, e.slug AS episode_slug, e.updated_at, e.published_at
        FROM episodes e INNER JOIN anime a ON a.id = e.anime_id
        WHERE e.is_published = 1 AND a.status <> 'deleted' ORDER BY COALESCE(e.updated_at, e.published_at) DESC");
    foreach ($episodes as $row) {
        $animeSlug = safeSegment($row['anime_slug'] ?? '');
        $episodeSlug = safeSegment($row['episode_slug'] ?? '');
        if ($animeSlug === '' || $episodeSlug === '') continue;
        $date = $row['updated_at'] ?? $row['published_at'] ?? null;
        $fresh = $date && strtotime($date) >= strtotime('-7 days');
        $urls[] = xmlUrl($siteUrl, "/anime/{$animeSlug}/episode/{$episodeSlug}", $date, $fresh ? 'hourly' : 'weekly', $fresh ? '0.9' : '0.5');
    }

    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
    echo implode('', $urls);
    echo "</urlset>\n";
} catch (Throwable $error) {
    http_response_code(500);
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"></urlset>\n";
    error_log('Sitemap error: ' . $error->getMessage());
}
