import { Package } from "@/lib/database/models";

export default async function handler(req, res) {
  const { packageId } = req.query;

  try {
    const pkg = await Package.findByPk(packageId);
    await pkg.destroy();

    res.send({ status: 200 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}