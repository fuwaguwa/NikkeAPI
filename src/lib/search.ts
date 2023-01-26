import Fuse from "fuse.js";
import NIKKE from "../../data/NikkeCharsInfo.json";

const name = new Fuse(NIKKE.data, {
	keys: ["name"],
});

export = {
	search: function (nikkeName: string) 
	{
		let result = name.search(nikkeName)[0] || null;
		if (result) delete result.refIndex;
		return result;
	},
};
