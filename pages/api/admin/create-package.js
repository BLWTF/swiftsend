import SqlizeService from "@/lib/database/services/sqlize";

export default async function handler(req, res) {
  const {
    fromAddress,
    recipientCityId,
    recipientName,
    senderCityId,
    senderName,
    toAddress,
    trackingNumber,
    packageContent,
    packageWeight,
    note,
  } = req.body;
  const service = new SqlizeService();

  try {
		console.log({
      fromAddress,
      toAddress,
      fromCityId: senderCityId,
      toCityId: recipientCityId,
      senderName,
      recipientName,
      trackingNumber,
      packageContent,
      packageWeight,
      note,
    })
    const pkg = await service.createPackage({
      fromAddress,
      toAddress,
      fromCityId: senderCityId,
      toCityId: recipientCityId,
      senderName,
      recipientName,
      trackingNumber,
      packageContent,
      packageWeight,
      note,
    });

    res.json(pkg.toJSON());
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}
