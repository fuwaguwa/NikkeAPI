import fetch from "node-fetch";
import fs from "fs";
import path from "path";

function updateFile(obj) 
{
	const jsonPath = path.join(__dirname, "..", "data", "NikkeCharsInfo.json");
	fs.readFile(jsonPath, "utf-8", (err, data) => 
	{
		const json = JSON.parse(data);
		json.data.push(obj);
		fs.writeFile(jsonPath, JSON.stringify(json, null, "\t"), "utf-8", (err) => 
		{
			if (err) console.error(err);
			console.log("Success!");
		});
	});
}

function resetFile() 
{
	const jsonPath = path.join(__dirname, "..", "data", "NikkeCharsInfo.json");
	fs.writeFile(
		jsonPath,
		JSON.stringify(
			{
				data: [],
			},
			null,
			"\t"
		),
		"utf-8",
		(err) => 
		{
			if (err) console.error(err);
			console.log("Reset File!");
		}
	);
}

// Credit to August from stackoverflow lmao
function convertToRoman(strNum) 
{
	let num = parseInt(strNum);
	var roman = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1,
	};
	var str = "";

	for (var i of Object.keys(roman)) 
	{
		var q = Math.floor(num / roman[i]);
		num -= q * roman[i];
		str += i.repeat(q);
	}

	return str;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

fetch("https://www.prydwen.gg/page-data/sq/d/1372249733.json")
	.then(response => response.json())
	.then(async (json) => 
	{
		resetFile();
		const getSkillEffect = (effect) => 
		{
			let skillEffect = "";
			effect.content.forEach((content) => 
			{
				skillEffect += content.value;
			});
			return skillEffect.trim();
		};

		await sleep(500);
		for (
			let i = 0;
			i < json.data.allContentfulNikkeCharacter.nodes.length;
			i++
		) 
		{
			const nikke = json.data.allContentfulNikkeCharacter.nodes[i];

			const normalAttack = JSON.parse(nikke.basicAttack.raw).content;
			const skill1 = JSON.parse(nikke.skills[0].descriptionLevel1.raw).content;
			const skill2 = JSON.parse(nikke.skills[1].descriptionLevel1.raw).content;
			const burst = JSON.parse(nikke.skills[2].descriptionLevel1.raw).content;
			const maxedSkill1 = JSON.parse(
				nikke.skills[0].descriptionLevel10.raw
			).content;
			const maxedSkill2 = JSON.parse(
				nikke.skills[1].descriptionLevel10.raw
			).content;
			const maxedBurst = JSON.parse(
				nikke.skills[2].descriptionLevel10.raw
			).content;

			const normalAttackDesc = [];
			const skill1Desc = [];
			const skill2Desc = [];
			const burstDesc = [];
			const maxedSkill1Desc = [];
			const maxedSkill2Desc = [];
			const maxedBurstDesc = [];

			normalAttack.forEach((effect) => 
			{
				normalAttackDesc.push(getSkillEffect(effect));
			});
			skill1.forEach((effect) => 
			{
				skill1Desc.push(getSkillEffect(effect));
			});
			skill2.forEach((effect) => 
			{
				skill2Desc.push(getSkillEffect(effect));
			});
			burst.forEach((effect) => 
			{
				burstDesc.push(getSkillEffect(effect));
			});
			maxedSkill1.forEach((effect) => 
			{
				maxedSkill1Desc.push(getSkillEffect(effect));
			});
			maxedSkill2.forEach((effect) => 
			{
				maxedSkill2Desc.push(getSkillEffect(effect));
			});
			maxedBurst.forEach((effect) => 
			{
				maxedBurstDesc.push(getSkillEffect(effect));
			});

			const obj = {
				name: nikke.name,
				unitId: nikke.unitId,
				rarity: nikke.rarity,
				element: nikke.element,
				weapon: nikke.weapon,
				weaponName: nikke.weaponName,
				class: nikke.class,
				burstType: convertToRoman(nikke.burstType),

				manufacturer: nikke.manufacturer,
				squad: nikke.squad,

				backstory: nikke.backstory ? nikke.backstory.backstory : null,
				releaseDate: nikke.releaseDate,

				stats: {
					hp: nikke.stats
						? parseInt(nikke.stats[Object.keys(nikke.stats)[1]].hp)
						: nikke.stats,
					atk: nikke.stats
						? parseInt(nikke.stats[Object.keys(nikke.stats)[1]].atk)
						: nikke.stats,
					def: nikke.stats
						? parseInt(nikke.stats[Object.keys(nikke.stats)[1]].hp)
						: nikke.stats,
				},

				skills: {
					normal: {
						name: "Normal Attack",
						mode: nikke.controlMode,
						ammo: nikke.ammoCapacity,
						reloadTime: `${nikke.reloadTime}s`,
						description: normalAttackDesc,
					},

					skill1: {
						id: nikke.skills[0].skillId,
						name: nikke.skills[0].name,
						type: nikke.skills[0].type,
						cooldown: nikke.skills[0].cooldown
							? `${nikke.skills[0].cooldown}s`
							: null,
						baseDescription: skill1Desc,
						maxDescription: maxedSkill1Desc,
					},

					skill2: {
						id: nikke.skills[1].skillId,
						name: nikke.skills[1].name,
						type: nikke.skills[1].type,
						cooldown: nikke.skills[1].cooldown
							? `${nikke.skills[1].cooldown}s`
							: null,
						baseDescription: skill2Desc,
						maxDescription: maxedSkill2Desc,
					},

					burst: {
						id: nikke.skills[2].skillId,
						name: nikke.skills[2].name,
						type: nikke.skills[2].type,
						cooldown: nikke.skills[2].cooldown
							? `${nikke.skills[2].cooldown}s`
							: null,
						baseDescription: burstDesc,
						maxDescription: maxedBurstDesc,
					},
				},

				voiceActors: {
					kr: nikke.cv.kr === "" ? null : nikke.cv.kr,
					jp: nikke.cv.jpn === "" ? null : nikke.cv.jpn,
					en: nikke.cv.en === "" ? null : nikke.cv.en,
				},

				images: {
					icon: nikke.smallImage
						? "https://www.prydwen.gg" +
						  nikke.smallImage.localFile.childImageSharp.gatsbyImageData.images.fallback.src
						: null,
					card: nikke.cardImage
						? "https://www.prydwen.gg" +
						  nikke.cardImage.localFile.childImageSharp.gatsbyImageData.images.fallback.src
						: null,
					full: nikke.fullImage
						? "https://www.prydwen.gg" +
						  nikke.fullImage.localFile.childImageSharp.gatsbyImageData.images.fallback.src
						: null,
				},
			};
			console.log(`Updating ${obj.name}`);
			updateFile(obj);

			await sleep(500);
		}
	});
