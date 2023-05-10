import { State } from "@/lib/database/models";
import { Sequelize } from "sequelize";

export default async function handler(req, res) {
  const { search, countryId } = req.query;

  try {
    if (search) {
      const states = await State.findAll({
        where: {
          name: {
            [Sequelize.Op.like]: `%${search}%`,
          },
          country_id: countryId,
        },
        limit: 10,
      });
      const statesJson = states.map((e) => {
        return { value: e.id, label: e.name };
      });

      res.json({ states: statesJson });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
