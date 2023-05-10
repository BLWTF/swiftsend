import { City } from "@/lib/database/models";
import { Sequelize } from "sequelize";

export default async function handler(req, res) {
  const { search, stateId } = req.query;

  try {
    if (search) {
      const cities = await City.findAll({
        where: {
          name: {
            [Sequelize.Op.like]: `%${search}%`,
          },
          state_id: stateId,
        },
        limit: 10,
      });
      const citiesJson = cities.map((e) => {
        return { value: e.id, label: e.name };
      });

      res.json({ cities: citiesJson });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
