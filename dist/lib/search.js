"use strict";
const tslib_1 = require("tslib");
const fuse_js_1 = tslib_1.__importDefault(require("fuse.js"));
const NikkeCharsInfo_json_1 = tslib_1.__importDefault(require("../../data/NikkeCharsInfo.json"));
const name = new fuse_js_1.default(NikkeCharsInfo_json_1.default.data, {
    keys: ['name']
});
module.exports = {
    search: function (nikkeName) {
        let result = name.search(nikkeName)[0] || null;
        if (result)
            delete result.refIndex;
        return result;
    }
};
