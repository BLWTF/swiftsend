import SqlizeService from "@/lib/database/services/sqlize";

export default async function handler(req, res) {
  try {
    const { set, limit, search } = req.query;
    const offset = limit * (set - 1);
    const service = new SqlizeService();
    const packages = await service.getPackages({ search, limit, offset });
    const packagesCount = await service.countPackages({
      search,
    });
    const packagesJson = packages.map((p) => p.toJSON());

    res.json({
      packages: packagesJson,
      count: packagesCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
