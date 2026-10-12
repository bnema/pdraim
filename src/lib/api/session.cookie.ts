import type { Cookies } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { createLogger } from '$lib/utils/logger.server';

const log = createLogger('session-cookie');

// Host-only cookie by default; set COOKIE_DOMAIN for cross-subdomain cookies
function getCookieDomain(): string | undefined {
	const envDomain = env.COOKIE_DOMAIN;
	if (envDomain) {
		log.debug('Using COOKIE_DOMAIN from environment:', { domain: envDomain });
		return envDomain;
	}
	return undefined;
}

export function setSessionTokenCookie(
	{ cookies }: { cookies: Cookies },
	token: string,
	expiresAt: number
): void {
	log.debug('Setting session cookie with expiry:', new Date(expiresAt));

	const domain = getCookieDomain();
	log.debug('Setting cookie for domain:', { domain });

	cookies.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev,
		domain,
		expires: new Date(expiresAt),
		path: '/'
	});
}

export function deleteSessionTokenCookie({ cookies }: { cookies: Cookies }): void {
	log.debug('Deleting session cookie');

	const domain = getCookieDomain();
	log.debug('Deleting cookie for domain:', { domain });

	cookies.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev,
		domain,
		maxAge: 0,
		path: '/'
	});
}

export function getSessionTokenCookie({ cookies }: { cookies: Cookies }): string | undefined {
	log.debug('Getting session cookie');
	return cookies.get('session');
}
