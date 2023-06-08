import { Package } from "@/lib/database/models";

export default async function handler(req, res) {
  const { body } = req;
  const { packageId } = req.query;

  try {
    await Package.update(body, {
      where: {
        id: packageId,
      },
    });
    res.send({ status: 200 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}
