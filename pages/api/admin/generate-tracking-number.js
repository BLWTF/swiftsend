import { generateString } from "@/lib/helpers";

export default async function handler(req, res) {
	const gen = `SWF${generateString(10)}`;

	res.json({
		gen
	});
}