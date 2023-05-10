import { Country } from "@/lib/database/models";
import { Sequelize } from "sequelize";

export default async function handler(req, res) {
  const { search } = req.query;

  try {
    if (search) {
      const countries = await Country.findAll({
        where: {
          name: {
            [Sequelize.Op.like]: `%${search}%`,
          },
        },
        limit: 10,
      });
      const countriesJson = countries.map((e) => {
        return { value: e.id, label: e.name };
      });

      res.json({ countries: countriesJson });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
