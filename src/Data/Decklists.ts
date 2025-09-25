import { Archetype, Decklist, GET_TOURNAMENT_ID, MOCK_DECKLIST_FROM_RAW, RawTournamentResults, TournamentResults } from "./Interfaces";
import { AEGIS_20250817 } from "./Decklists/Aegis";
import { HZO_20250914, BJO_20250831, CQO_20250907, GZO_20250824, SFC_20250803 } from "./Decklists/China";
import { EXPERT_DECKLISTS } from "./Decklists/PinnedDecklists";
import { RFC_20250809 } from "./Decklists/France";
import { MCW_20250807 } from "./Decklists/Italy";
import { LUX_20250816 } from "./Decklists/LuxuryRiftboundChampionSeries";
import { RMW_20250809, RMW_20250802, RMW_20250726 } from "./Decklists/RiftboundMetaWeekly";
import { RLL_20250919, RLL_20250905, RLL_20250822, RLL_20250823, RLT_20250808 } from "./Decklists/Riftlab";
import { TNF_20250918, TNF_20250911, TNF_20250904, TNF_20250828, TNF_20250807, TNF_20250731, TNF_20250814, TNF_20250821 } from "./Decklists/ThursdayNightFights";

const RAW_TOURNAMENT_RESULTS: RawTournamentResults[] = [
    RLL_20250919, TNF_20250918, HZO_20250914, TNF_20250911, CQO_20250907, RLL_20250905, TNF_20250904, BJO_20250831, TNF_20250828, GZO_20250824, RLL_20250823, RLL_20250822, TNF_20250821, AEGIS_20250817, LUX_20250816, TNF_20250814, RMW_20250809, RFC_20250809, RLT_20250808, MCW_20250807, TNF_20250807, SFC_20250803, RMW_20250802, TNF_20250731, RMW_20250726
];

let unknownPlayerCount = 0;
export let TOURNAMENT_RESULTS: TournamentResults[] = [];
for(let raw of RAW_TOURNAMENT_RESULTS) {
    let tournamentResults: TournamentResults = {...raw} as TournamentResults;
    for(let placing of tournamentResults.placings) {
        for(let decklist of placing.decklists) {
            decklist.tournamentName = tournamentResults.tournamentName;
            decklist.date = tournamentResults.date;
            decklist.placing = placing.placing;
            decklist.tournId = GET_TOURNAMENT_ID(tournamentResults.abbrName, tournamentResults.date);
            if(decklist.username === "") {
                decklist.username = `*Unknown${unknownPlayerCount++}*`;
            }
        }
    }
    TOURNAMENT_RESULTS.push(tournamentResults);
}

let archetypeDecklists: {[archetype in Archetype]: Decklist[]} = {
    "Kai'Sa Midrange": [],
    "Master Yi Midrange": [],
    "Miss Fortune Aurora": [],
    Darius: [],
    "Sett Midrange": [],
    "Master Yi Aurora": [],
    Viktor: [],
    "Annie Tempo": [],
    Teemo: [],
    Ahri: [],
    "Kai'Sa Control": [],
    "Lee Sin Midrange": [],
    "Sett Aurora": [],
    "Volibear Ramp": [],
    "Lux Control": [],
    "Jinx Aggro": [],
    "Leona Midrange": [],
    "Yasuo Midrange": [],
    "Garen Midrange": [],
    Unknown: []
};
let tournamentDict: {[id: string]: TournamentResults} = {};
let tournamentNames: {[id: string]: string} = {};
let tournamentNameToAbbrDict: {[name: string]: string} = {};

for(let decklist of EXPERT_DECKLISTS) {
    archetypeDecklists[decklist.archetype].push(MOCK_DECKLIST_FROM_RAW(decklist));
}

for(let tournamentResults of TOURNAMENT_RESULTS) {
    const tournId = GET_TOURNAMENT_ID(tournamentResults.abbrName, tournamentResults.date);
    tournamentDict[tournId] = tournamentResults;
    tournamentNameToAbbrDict[tournamentResults.tournamentName] = tournamentResults.abbrName;
    tournamentNames[tournId] = tournamentResults.tournamentName;
    for(let placing of tournamentResults.placings) {
        for(let decklist of placing.decklists) {
            if(decklist.archetype && decklist.mainDeck.length > 0) {
                archetypeDecklists[decklist.archetype].push(decklist);
            }
        }
    }
}

export function GET_ARCHETYPE_DECKLISTS(archetype: Archetype): Decklist[] {
    return archetypeDecklists[archetype];
}

export function GET_TOURNAMENT_DECKLIST(tournId: string, username: string): Decklist|undefined {
    if(!(tournId in tournamentDict)) { return undefined; }
    const tournamentResult = tournamentDict[tournId];
    for(let placing of tournamentResult.placings) {
        for(let decklist of placing.decklists) {
            if(decklist.username === username) {
                return decklist;
            }
        }
    }
}

export function GET_EXPERT_DECKLIST(archetype: Archetype, username: string): Decklist|undefined {
    for(let decklist of archetypeDecklists[archetype]) {
        if(decklist.username === username) {
            return decklist;
        }
    }
    return undefined;
}

export function GET_PLACING(tournId: string, username: string): string|undefined {
    if(!(tournId in tournamentDict)) { return undefined; }
    const tournamentResult = tournamentDict[tournId];
    for(let placing of tournamentResult.placings) {
        for(let decklist of placing.decklists) {
            if(decklist.username === username) {
                return placing.placing;
            }
        }
    }
}

export function GET_TOURNAMENT_NAME(tournId: string): string {
    return (tournId in tournamentNames) ? tournamentNames[tournId] : "Unknown Tournament Name";
}

export function GET_TOURNAMENT_ABBR(tournamentName: string): string {
    return (tournamentName in tournamentNameToAbbrDict) ? tournamentNameToAbbrDict[tournamentName] : "";
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
    "Miss Fortune Aurora": "OGN-267",
    "Sett Midrange": "OGN-269",
    "Sett Aurora": "OGN-269",
    "Unknown": UNKNOWN_LEGEND_ID
};
export function ARCHETYPE_TO_LEGEND_BASE_ID(archetype: Archetype): string {
    return (archetype in archetypeLegendDict) ? archetypeLegendDict[archetype] : UNKNOWN_LEGEND_ID;
}

export const ARCHETYPE_TIERS: Archetype[][] = [
    ["Kai'Sa Midrange", "Master Yi Midrange"],
    ["Miss Fortune Aurora", "Darius", "Sett Midrange", "Master Yi Aurora", "Viktor"],
    ["Annie Tempo", "Teemo", "Ahri"],
    ["Kai'Sa Control", "Lee Sin Midrange", "Sett Aurora", "Volibear Ramp", "Lux Control", "Jinx Aggro", "Leona Midrange", "Yasuo Midrange"],
    ["Garen Midrange"],
];

export const ARCHETYPE_TIER_NAMES = ["Favorites", "Contenders", "Challengers", "Dark Horses", "Memes"];
