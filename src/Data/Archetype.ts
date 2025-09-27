import { TO_BASE_ID } from "./Cards";
import { Decklist } from "./Decklist";

export const ALL_ARCHETYPES = [
    "Ahri", "Darius", "Jinx Aggro", "Kai'Sa Midrange", "Kai'Sa Control", "Lee Sin Midrange", "Leona Midrange", "Miss Fortune Aurora", "Miss Fortune Aggro", "Sett Aurora", "Sett Midrange", "Teemo", "Viktor", "Volibear Ramp", "Yasuo Midrange",
    "Annie Tempo", "Garen Midrange", "Lux Control", "Master Yi Midrange", "Master Yi Aurora",
    "Unknown"
] as const;
export type Archetype = typeof ALL_ARCHETYPES[number];

export function ARCHETYPE_FROM_STRING(str: string): Archetype {
    return (ALL_ARCHETYPES.includes(str as Archetype)) ? str as Archetype : "Unknown";
}

export const UNKNOWN_LEGEND_ID = "???-???";
const archetypeLegendDict: {[archetype in Archetype]: string} = {
    "Annie Tempo": "OGS-017",
    "Master Yi Midrange": "OGS-019",
    "Master Yi Aurora": "OGS-019",
    "Lux Control": "OGS-021",
    "Garen Midrange": "OGS-023",
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
    "Viktor": "OGN-265",
    "Miss Fortune Aggro": "OGN-267",
    "Miss Fortune Aurora": "OGN-267",
    "Sett Midrange": "OGN-269",
    "Sett Aurora": "OGN-269",
    "Unknown": UNKNOWN_LEGEND_ID
};
export function ARCHETYPE_TO_LEGEND_BASE_ID(archetype: Archetype): string {
    return (archetype in archetypeLegendDict) ? archetypeLegendDict[archetype] : UNKNOWN_LEGEND_ID;
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
    console.log(decklist, potentialArchetype);
    if(potentialArchetype !== "Unknown") {
        return potentialArchetype;
    } else if(baseLegendId === "OGS-019") {
        return decklist.contains("OGN-160", {exactCount: 3}) ? "Master Yi Aurora" : "Master Yi Midrange";
    } else if(baseLegendId === "OGN-247") {
        return decklist.contains("OGN-099") ? "Kai'Sa Control" : "Kai'Sa Midrange"; // garbage grabber lol
    } else if(baseLegendId === "OGN-267") {
        return decklist.contains("OGN-160", {exactCount: 3}) ? "Miss Fortune Aurora" : "Miss Fortune Aggro";
    } else if(baseLegendId === "OGN-269") {
        return decklist.contains("OGN-160", {exactCount: 3}) ? "Sett Aurora" : "Sett Midrange";
    }
    return "Unknown";
}

export const ARCHETYPE_TIER_NAMES = ["Favorites", "Contenders", "Challengers", "Dark Horses", "Memes"];
export const ARCHETYPE_TIERS: Archetype[][] = [
    ["Kai'Sa Midrange", "Master Yi Midrange"],
    ["Miss Fortune Aurora", "Darius", "Sett Midrange", "Master Yi Aurora", "Viktor", "Ahri", "Annie Tempo"],
    ["Teemo"],
    ["Kai'Sa Control", "Lee Sin Midrange", "Sett Aurora", "Volibear Ramp", "Lux Control", "Jinx Aggro", "Leona Midrange", "Yasuo Midrange", "Miss Fortune Aggro"],
    ["Garen Midrange"],
];

export const MAX_ARCHETYPE_TIER_SIZE = Math.max(...ARCHETYPE_TIERS.map((tier) => tier.length));
