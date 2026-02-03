import { TO_BASE_ID } from "./Cards";
import { Decklist } from "./Decklist";
import { Meta } from "./TournamentResults";

export const ALL_ARCHETYPES = [
    "Ahri", "Darius", "Jinx Aggro", "Kai'Sa Midrange", "Kai'Sa Control", "Lee Sin Midrange", "Leona Midrange", "Miss Fortune Aurora", "Miss Fortune Aggro", "Sett Aurora", "Sett Midrange", "Teemo", "Viktor Midrange", "Viktor Control", "Volibear Ramp", "Yasuo Midrange",
    "Annie Midrange", "Garen Midrange", "Lux Control", "Master Yi Midrange", "Master Yi Aurora", "Garen Aurora",
    "Rumble Midrange", "Lucian", "Draven Midrange", "Draven Storm", "Rek'Sai", "Ornn", "Jax Midrange", "Irelia", "Azir", "Ezreal", "Renata Glasc", "Sivir Midrange", "Sivir Aurora", "Fiora Midrange",
    "Unknown"
] as const;
export type Archetype = typeof ALL_ARCHETYPES[number];

export function ARCHETYPE_FROM_STRING(str: string): Archetype {
    return (ALL_ARCHETYPES.includes(str as Archetype)) ? str as Archetype : "Unknown";
}

const archetypeLegendDict: {[archetype in Archetype]: string} = {
    "Annie Midrange": "OGS-017",
    "Master Yi Midrange": "OGS-019",
    "Master Yi Aurora": "OGS-019",
    "Lux Control": "OGS-021",
    "Garen Midrange": "OGS-023",
    "Garen Aurora": "OGS-023",
    "Kai'Sa Midrange": "OGN-247",
    "Kai'Sa Control": "OGN-247",
    "Volibear Ramp": "OGN-249",
    "Jinx Aggro": "OGN-251",
    "Darius": "OGN-253",
    "Ahri": "OGN-255",
    "Lee Sin Midrange": "OGN-257",
    "Yasuo Midrange": "OGN-259",
    "Leona Midrange": "OGN-261",
    "Teemo": "OGN-263",
    "Viktor Midrange": "OGN-265",
    "Viktor Control": "OGN-265",
    "Miss Fortune Aggro": "OGN-267",
    "Miss Fortune Aurora": "OGN-267",
    "Sett Midrange": "OGN-269",
    "Sett Aurora": "OGN-269",
    "Rumble Midrange": "SFD-181",
    "Lucian": "SFD-183",
    "Draven Midrange": "SFD-185",
    "Draven Storm": "SFD-185",
    "Rek'Sai": "SFD-187",
    "Ornn": "SFD-189",
    "Jax Midrange": "SFD-193",
    "Irelia": "SFD-195",
    "Azir": "SFD-197",
    "Ezreal": "SFD-199",
    "Renata Glasc": "SFD-201",
    "Sivir Midrange": "SFD-203",
    "Sivir Aurora": "SFD-203",
    "Fiora Midrange": "SFD-205",
    "Unknown": ""
};
export function ARCHETYPE_TO_LEGEND_BASE_ID(archetype: Archetype): string {
    return (archetype in archetypeLegendDict) ? archetypeLegendDict[archetype] : "";
}
let legendArchetypesDict: {[baseId: string]: Archetype[]} = {};
for(let archetypeStr in archetypeLegendDict) {
    const archetype = archetypeStr as Archetype;
    const id = archetypeLegendDict[archetype];
    if(!(id in legendArchetypesDict)) {
        legendArchetypesDict[id] = [];
    }
    legendArchetypesDict[id].push(archetype);
}

function LEGEND_BASE_ID_TO_ARCHETYPE(baseId: string): Archetype {
    return !(baseId in legendArchetypesDict) ? "Unknown" : (legendArchetypesDict[baseId].length === 1) ? legendArchetypesDict[baseId][0] : "Unknown";
}

export function PREDICT_ARCHETYPE(decklist: Decklist): Archetype {
    if(decklist.legend === "") {
        return "Unknown";
    }
    const baseLegendId = TO_BASE_ID(decklist.legend);
    const potentialArchetype = LEGEND_BASE_ID_TO_ARCHETYPE(baseLegendId);
    if(potentialArchetype !== "Unknown") {
        return potentialArchetype;
    } else if(baseLegendId === "OGS-019") {
        return decklist.contains("OGN-160", {exactCount: 3}) ? "Master Yi Aurora" : "Master Yi Midrange";
    } else if(baseLegendId === "OGN-247") {
        return decklist.contains("OGN-098") && decklist.contains("OGN-099") ? "Kai'Sa Control" : "Kai'Sa Midrange"; // energy conduit + garbage grabber
    } else if(baseLegendId === "OGN-267") {
        return decklist.contains("OGN-160", {exactCount: 3}) ? "Miss Fortune Aurora" : "Miss Fortune Aggro";
    } else if(baseLegendId === "OGN-269") {
        return decklist.contains("OGN-160", {exactCount: 3}) ? "Sett Aurora" : "Sett Midrange";
    } else if(baseLegendId === "OGS-023") {
        return decklist.contains("OGN-160", {exactCount: 3}) ? "Garen Aurora" : "Garen Midrange";
    } else if(baseLegendId === "SFD-185") {
        return decklist.contains("SFD-012", {exactCount: 3}) ? "Draven Storm" : "Draven Midrange";
    } else if(baseLegendId === "OGN-265") {
        return (decklist.numOfCardType("Spell") >= 27) ? "Viktor Control" : "Viktor Midrange"; 
    } else if(baseLegendId === "SFD-203") {
        return decklist.contains("OGN-160", {exactCount: 3}) ? "Sivir Aurora" : "Sivir Midrange";
    }
    return "Unknown";
}

export const ARCHETYPE_TIER_NAMES = ["Favorites", "Contenders", "Challengers", "Dark Horses", "Struggles", "Memes"];
const META_ARCHETYPE_TIERS: {[meta in Meta]: Archetype[][]} = {
    "SFD": [
        ["Draven Midrange"],
        ["Irelia", "Fiora Midrange", "Kai'Sa Midrange", "Ezreal", "Draven Storm", "Sivir Midrange"],
        ["Viktor Midrange", "Annie Midrange", "Lucian", "Master Yi Midrange", "Azir", "Lux Control", "Miss Fortune Aurora", "Sivir Aurora", "Jax Midrange", "Sett Midrange"],
        ["Teemo", "Rek'Sai", "Ahri", "Ornn", "Rumble Midrange", "Volibear Ramp", "Leona Midrange", "Viktor Control", "Renata Glasc", "Yasuo Midrange"],
        ["Darius", "Garen Aurora", "Sett Aurora", "Lee Sin Midrange", "Jinx Aggro", "Miss Fortune Aggro"],
        ["Garen Midrange"],
    ], "OGN": [
        ["Kai'Sa Midrange", "Annie Midrange"],
        ["Miss Fortune Aurora", "Master Yi Aurora", "Master Yi Midrange"],
        ["Sett Midrange", "Viktor Midrange", "Ahri", "Darius", "Teemo"],
        ["Kai'Sa Control", "Yasuo Midrange"],
        ["Lee Sin Midrange", "Sett Aurora", "Volibear Ramp", "Lux Control", "Jinx Aggro", "Leona Midrange", "Miss Fortune Aggro", "Garen Aurora"],
        ["Garen Midrange"],
    ]
};
export function GET_ARCHETYPE_TIERS(meta: Meta): Archetype[][] {
    return META_ARCHETYPE_TIERS[meta];
}

export function GET_MAX_ARCHETYPE_TIER_SIZE(meta: Meta) {
    return Math.max(...META_ARCHETYPE_TIERS[meta].map((tier) => tier.length))
};
