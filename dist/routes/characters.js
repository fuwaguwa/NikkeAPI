"use strict";
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const fuse_js_1 = tslib_1.__importDefault(require("fuse.js"));
const process_1 = require("../lib/process");
const router = express_1.default.Router();
const characters = [];
(async () => {
    const response = await (0, node_fetch_1.default)("https://www.prydwen.gg/page-data/sq/d/4170130662.json");
    const json = await response.json();
    json.data.allContentfulNikkeCharacter.nodes.forEach((character) => {
        characters.push(character.name);
    });
})();
router.get("/", (req, res) => {
    res.send({
        "/characters/:name": characters.sort(),
    });
});
router.get("/:charName", async (req, res) => {
    const search = (searcher, name) => {
        let result = searcher.search(name)[0] || null;
        if (result)
            delete result.refIndex;
        return result;
    };
    const searcher = new fuse_js_1.default(characters);
    const result = search(searcher, req.params.charName);
    res.send({
        data: result ? { item: await (0, process_1.getChar)(result.item), } : "No NIKKE Found!",
    });
});
module.exports = router;
