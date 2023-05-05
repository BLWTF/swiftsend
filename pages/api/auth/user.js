import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "../../../lib/auth/session-options"

async function userRoute(req, res) {
	if (req.session.auth) {
		res.json({
			...req.session.auth,
			isLoggedIn: true,
		})
	} else {
		res.json({
			isLoggedIn: false,
			user: null,
		})
	}
}

export default withIronSessionApiRoute(userRoute, sessionOptions)