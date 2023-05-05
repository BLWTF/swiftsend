import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "../../../lib/auth/session-options"

function logoutRoute(req, res) {
	req.session.destroy()
	res.json({ isLoggedIn: false, user: null })
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)