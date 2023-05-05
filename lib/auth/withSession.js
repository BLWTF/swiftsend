import { withIronSessionSsr } from "iron-session/next"
import { sessionOptions } from "./session-options"

const withSession = withIronSessionSsr(async function({req, res}) {
	const auth = req.session.auth
	console.log(req.session)

	if (auth === undefined) {
		res.setHeader('location', '/')
		res.statusCode = 302
		res.end()
		return {
			props: {
				auth: { isLoggedIn: false, user: null }
			},
		}
	}

	return {
		props: { auth: req.session.auth },
	}
}, sessionOptions)

export default withSession