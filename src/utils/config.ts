const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://anistreaming.com';

export const SITE_URL = configuredSiteUrl.replace(/\/$/, '');
export const SITE_ORIGIN = new URL(SITE_URL).origin;
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.animekudesu.web.id';
