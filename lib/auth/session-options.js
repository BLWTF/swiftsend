export const sessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD,
	cookieName: 'swift_send',
	cookieOptions : {
		secure: process.env.NODE_ENV == 'production',
	},
}