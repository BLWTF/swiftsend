import { User } from "@/lib/database/models";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session-options";

async function handler(req, res) {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    zipCode,
    cityId,
    address,
  } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    await user.createCustomer({
      phone,
      zipCode,
      cityId,
      address,
    });

    console.log(user);
    
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
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}


export default withIronSessionApiRoute(handler, sessionOptions)