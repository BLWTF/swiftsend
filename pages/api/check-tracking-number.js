import { Package } from "@/lib/database/models";

export default async function handler(req, res) {
  const { trackingNumber } = req.query;

  try {
    const pkg = await Package.findOne({
      where: {
        trackingNumber,
      },
    });

    res.json({
      pkg,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}
