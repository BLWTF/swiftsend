import { User } from "@/lib/database/models";

export default async function handler(req, res) {
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
    res.json(user.toJSON());
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}
