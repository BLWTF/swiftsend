import SqlizeService from "@/lib/database/services/sqlize";

export default async function handler(req, res) {
  try {
    const { set, limit, search } = req.query;
    const offset = limit * (set - 1);
    const service = new SqlizeService();
    const customersCount = await service.countCustomers({ search });
    const customers = await service.getCustomers({ limit, offset, search });
    const customerJson = customers.map((customer) => customer.toJSON());

    res.json({
      customers: customerJson,
      count: customersCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
