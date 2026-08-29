# Dynamic sitemap

`sitemap.php` menghasilkan XML Sitemap Protocol 0.9 dari tabel `genres`, `anime`, dan `episodes` melalui PDO. Pastikan kolom berikut tersedia: `slug`, `updated_at`; selain itu `genres.is_active`, `anime.id/status`, serta `episodes.anime_id/is_published/published_at`.

Set environment variable berikut pada server:

```text
SITE_URL=https://anistreaming.com
DB_DSN=mysql:host=127.0.0.1;dbname=anistream;charset=utf8mb4
DB_USER=...
DB_PASS=...
```

Arahkan `/sitemap.xml` ke skrip ini. Contoh Apache `.htaccess`:

```apache
RewriteEngine On
RewriteRule ^sitemap\.xml$ /sitemap.php [L]
```

`robots.txt` sudah mengarahkan crawler ke `https://anistreaming.com/sitemap.xml`. Submit URL tersebut ke Google Search Console dan Bing Webmaster Tools. Sitemap sebaiknya tidak menampilkan URL yang memerlukan login, URL duplikat, atau URL yang diblokir robots/noindex.
