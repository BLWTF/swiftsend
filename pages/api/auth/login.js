import bcrypt from "bcrypt"
import SqlizeService from "@/lib/database/services/sqlize"
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session-options";


async function loginRoute(req, res) {
	const service = new SqlizeService()
  const { email, password } = await req.body;

  try {
    const user = await service.getUserByEmail(email);
    if (user === null) {
      res.status(500).json({ message: "Auth Error: Wrong Credentials" });
    }

    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) {
      res.status(500).json({ message: "Auth Error: Wrong Credentials" });
    }

    const sessionAuth = {
      isLoggedIn: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      },
    };

    req.session.auth = sessionAuth;
    await req.session.save();
    res.json(sessionAuth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)