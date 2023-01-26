import express from "express";
import data from "../../data/NikkeCharsInfo.json";
import NIKKE from "../lib/search";

const router = express.Router();

router.get("/", (req, res) => 
{
	const characters = [];
	data.data.forEach((char) => 
	{
		characters.push(char.name);
	});

	res.send({
		"/characters/:name": characters.sort(),
	});
});

router.get("/:charName", (req, res) => 
{
	const result = NIKKE.search(req.params.charName);
	res.send({
		data: result ? result : "NIKKE Not Found!",
	});
});

export = router;
