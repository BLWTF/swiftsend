import { Package } from "@/lib/database/models";

export default async function handler(req, res) {
  const { packageId } = req.query;

  try {
    const pkg = await Package.findByPk(packageId);
    res.json({
      isPaused: pkg.isPaused,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
