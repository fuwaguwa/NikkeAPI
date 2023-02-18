import express from "express";
import fetch from "node-fetch";
import Fuse from "fuse.js";
import { getChar } from "../lib/process";

const router = express.Router();

const characters = [];

(async () => 
{
	const response = await fetch(
		"https://www.prydwen.gg/page-data/sq/d/4170130662.json"
	);
	const json = await response.json();
	json.data.allContentfulNikkeCharacter.nodes.forEach((character) => 
	{
		characters.push(character.name);
	});
})();

router.get("/", (req, res) => 
{
	res.send({
		"/characters/:name": characters.sort(),
	});
});

router.get("/:charName", async (req, res) => 
{
	const search = (searcher, name) => 
	{
		let result = searcher.search(name)[0] || null;
		if (result) delete result.refIndex;
		return result;
	};

	const searcher = new Fuse(characters);

	const result = search(searcher, req.params.charName);

	res.send({
		data: result ? { item: await getChar(result.item), } : "No NIKKE Found!",
	});
});

export = router;
