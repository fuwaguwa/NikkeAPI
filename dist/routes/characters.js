"use strict";
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const NikkeCharsInfo_json_1 = tslib_1.__importDefault(require("../../data/NikkeCharsInfo.json"));
const search_1 = tslib_1.__importDefault(require("../lib/search"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const characters = [];
    NikkeCharsInfo_json_1.default.data.forEach(char => { characters.push(char.name); });
    res.send({
        "/characters/:name": characters.sort()
    });
});
router.get("/:charName", (req, res) => {
    const result = search_1.default.search(req.params.charName);
    res.send({
        data: result ? result : 'NIKKE Not Found!'
    });
});
module.exports = router;
