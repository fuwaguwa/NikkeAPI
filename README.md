# Nikke API

~~Static~~ API for querying character information from the mobile game - "Nikke: Goddess of Victory". Data is processed from https://prydwen.gg, please go check them out!

API Link: https://nikke-api.vercel.app

## Hosting Locally
`npm i` then `npm start`

## Routes
Currently, the API only is able to provide information for the in game characters.<br>
### Characters
*  [`/characters/:nikkeName`](https://nikke-api.vercel.app)
    #### Notes
    The API will return the closest match to the `:nikkeName` param. Meaning even when you call [`/characters/ani`](https://nikke-api.vercel.app/characterx/ani), the API will still return information for the character `Anis` (closest name match)

    #### Character Structure
    ```typescript
    type NIKKERarity = "R" | "SR" | "SSR";
    type NIKKEClass = "Attacker" | "Defender" | "Supporter";
    type NIKKEElement = "Fire" | "Wind" | "Iron" | "Electric" | "Water";
    type NIKKEWeapon =
        | "Shotgun"
        | "SMG"
        | "Assault Rifle"
        | "Minigun"
        | "Rocket Launcher"
        | "Sniper Rifle";
    type NIKKEBurstType = "I" | "II" | "III";
    type NIKKEManufacturer = "Elysion" | "Missilis" | "Tetra" | "Pilgrim";
    
    type NIKKEAttackMode = "Normal" | "Charge";
    type NIKKESkillType = "Active" | "Passive";
    
    interface NIKKE {
        name: string;
        unitId: number;
        rarity: NIKKERarity;
        element: NIKKEElement;
        weapon: NIKKEWeapon;
        weaponName: string | null;
        class: NIKKEClass;
        burstType: NIKKEBurstType;
        manufacturer: NIKKEManufacturer;
        squad: string;
    
        backstory: string | null;
        releaseDate: string;
    
        stats: {
            hp: number | null;
            atk: number | null;
            def: number | null;
        };
        skills: {
            normal: {
                name: "Normal Attack";
                mode: NIKKEAttackMode;
                ammo: number;
                reloadTime: string;
                description: string[];
            };
    
            skill1: {
                id: string;
                name: string;
                type: NIKKESkillType;
                cooldown: string | null;
                baseDescription: string[];
                maxDescription: string[];
            };
    
            skill2: {
                id: string;
                name: string;
                type: NIKKESkillType;
                cooldown: string | null;
                baseDescription: string[];
                maxDescription: string[];
            };
    
            burst: {
                id: string;
                name: string;
                type: NIKKESkillType;
                cooldown: string | null;
                baseDescription: string[];
                maxDescription: string[];
            };
        };
    
        voiceActors: {
            kr: string | null;
            jp: string | null;
            en: string | null;
        };
    
        images: {
            icon: string | null;
            card: string | null;
            full: string | null;
        };
    }

    ```
