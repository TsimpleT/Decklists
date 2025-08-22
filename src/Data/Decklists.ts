import { AEGIS_20250817 } from "./decklists/Aegis";
import { SFC_20250803 } from "./decklists/China";
import { RFC_20250809 } from "./decklists/France";
import { MCW_20250807 } from "./decklists/Italy";
import { LRCS_20250816 } from "./decklists/LuxuryRiftboundChampionSeries";
import { RMW_20250809, RMW_20250802, RMW_20250726 } from "./decklists/RiftboundMetaWeekly";
import { RLC_20250822, RLT_20250808 } from "./decklists/Riftlab";
import { TNF_20250807, TNF_20250731, TNF_20250814, TNF_20250821 } from "./decklists/ThursdayNightFights";
import { Decklist, GET_TOURNAMENT_ID, RawTournamentResults, TournamentResults } from "./Interfaces";

const RAW_TOURNAMENT_DECKLISTS: RawTournamentResults[] = [
    RLC_20250822, TNF_20250821, AEGIS_20250817, LRCS_20250816, TNF_20250814, RMW_20250809, RFC_20250809, RLT_20250808, MCW_20250807, TNF_20250807, SFC_20250803, RMW_20250802, TNF_20250731, RMW_20250726
];

export let TOURNAMENT_DECKLISTS: TournamentResults[] = [];
for(let raw of RAW_TOURNAMENT_DECKLISTS) {
    let tournamentResults: TournamentResults = {...raw} as TournamentResults;
    for(let placing of tournamentResults.placings) {
        for(let decklist of placing.decklists) {
            decklist.tournamentName = tournamentResults.tournamentName;
            decklist.date = tournamentResults.date;
            decklist.placing = placing.placing;
            decklist.tournId = GET_TOURNAMENT_ID(tournamentResults.abbrName, tournamentResults.date);
        }
    }
    TOURNAMENT_DECKLISTS.push(tournamentResults);
}

let archetypeDecklists: {[archetypeLower: string]: Decklist[]} = {};
let tournamentDict: {[id: string]: TournamentResults} = {};
let tournamentNames: {[id: string]: string} = {};
let tournamentNameToAbbrDict: {[name: string]: string} = {};

for(let tournamentResults of TOURNAMENT_DECKLISTS) {
    const tournId = GET_TOURNAMENT_ID(tournamentResults.abbrName, tournamentResults.date);
    tournamentDict[tournId] = tournamentResults;
    tournamentNameToAbbrDict[tournamentResults.tournamentName] = tournamentResults.abbrName;
    tournamentNames[tournId] = tournamentResults.tournamentName;
    for(let placing of tournamentResults.placings) {
        for(let decklist of placing.decklists) {
            if(decklist.archetype && decklist.mainDeck.length > 0) {
                const archetypeLower = decklist.archetype.toLowerCase();
                if(!(archetypeLower in archetypeDecklists)) {
                    archetypeDecklists[archetypeLower] = [];
                }
                archetypeDecklists[archetypeLower].push(decklist);
            }
        }
    }
}

export function GET_ARCHETYPE_DECKLISTS(archetype: string): Decklist[] {
    const archetypeLower = archetype.toLowerCase();
    if(!(archetypeLower in archetypeDecklists)) {
        if(!(archetype in archetypeLegendDict)) {
            console.warn(`Archetype "${archetype}" not found.`);
        }
        return [];
    }
    return archetypeDecklists[archetypeLower];
}

export function GET_DECKLIST(tournId: string, username: string): Decklist|undefined {
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

const archetypeLegendDict: {[archetype: string]: string} = {
    "Annie Aggro": "OGS-017",
    "Master Yi Midrange": "OGS-019",
    "Lux Control": "OGS-021",
    "Garen Midrange": "OGS-023",
    "Kai'Sa Tempo": "OGN-247",
    "Volibear Ramp": "OGN-249",
    "Jinx Aggro": "OGN-251",
    "Darius": "OGN-253",
    "Ahri Tempo": "OGN-255",
    "Lee Sin Midrange": "OGN-257",
    "Yasuo Midrange": "OGN-259",
    "Leona Midrange": "OGN-261",
    "Teemo Tempo": "OGN-263",
    "Viktor": "OGN-265",
    "Miss Fortune Aurora": "OGN-267",
    "Miss Fortune Aggro": "OGN-267",
    "Sett Midrange": "OGN-269",
};
export function ARCHETYPE_TO_LEGEND_ID(archetype: string): string {
    return (archetype in archetypeLegendDict) ? archetypeLegendDict[archetype] : "???";
}

export const ALL_ARCHETYPES: string[] = Object.keys(archetypeLegendDict).sort();

let archetypeCasedNames: {[archetypeLower: string]: string} = {};
for(let archetype in archetypeLegendDict) {
    archetypeCasedNames[archetype.toLowerCase()] = archetype;
}

export function GET_CASED_ARCHETYPE(archetype: string): string {
    const archetypeLower = archetype.toLowerCase();
    if(!(archetypeLower in archetypeCasedNames)) {
        throw Error(`archetype ${archetypeLower} doesn't exist.`);
    }
    return archetypeCasedNames[archetypeLower];
}

// {
//     "Viktor Swarm Control": [
//         {
//             username: "PochiPoom",
//             link: "https://piltoverarchive.com/decks/view/3889db57-5e18-4b15-9303-a2f6b3ab9ef6",
//             cardAmounts: [
//                 // LEGEND
//                 {id: "OGN-265-1", count: 1},
//                 // CHOSEN CHAMPION
//                 {id: "OGN-246-1", count: 1},
//                 // MAIN DECK
//                 {id: "OGN-095-1", count: 3},
//                 {id: "OGN-104-1", count: 2},
//                 {id: "OGN-108-1", count: 2},
//                 {id: "OGN-213-1", count: 3},
//                 {id: "OGN-093-1", count: 3},
//                 {id: "OGN-210-1", count: 3},
//                 {id: "OGN-209-1", count: 2},
//                 {id: "OGN-241-1", count: 2},
//                 {id: "OGN-211-1", count: 3},
//                 {id: "OGN-094-1", count: 3},
//                 {id: "OGN-218-1", count: 3},
//                 {id: "OGN-208-1", count: 3},
//                 {id: "OGN-233-1", count: 2},
//                 {id: "OGN-105-1", count: 2},
//                 {id: "OGN-116-1", count: 2},
//                 {id: "OGN-122-1", count: 1},
//                 // BATTLEFIELDS
//                 {id: "OGN-294-1", count: 1},
//                 {id: "OGN-284-1", count: 1},
//                 {id: "OGN-295-1", count: 1},
//                 // RUNE DECK
//                 {id: "OGN-214-1", count: 6},
//                 {id: "OGN-089-1", count: 6},
//                 // SIDEBOARD
//                 {id: "OGN-224-1", count: 2},
//                 {id: "OGN-238-1", count: 3},
//                 {id: "OGN-232-1", count: 3},
//             ]
//         },
//         {
//             username: "Zach (Riftbound Meta)",
//             link: "https://piltoverarchive.com/decks/view/7209fd9d-beb9-4afb-8f9c-da7124a0c2a3",
//             cardAmounts: [
//                 // LEGEND
//                 {id: "OGN-265-1", count: 1},
//                 // CHOSEN CHAMPION
//                 {id: "OGN-246-1", count: 1},
//                 // MAIN DECK
//                 {id: "OGN-095-1", count: 3},
//                 {id: "OGN-103-1", count: 3},
//                 {id: "OGN-213-1", count: 3},
//                 {id: "OGN-210-1", count: 3},
//                 {id: "OGN-266-1", count: 3},
//                 {id: "OGN-209-1", count: 3},
//                 {id: "OGN-096-1", count: 2},
//                 {id: "OGN-222-1", count: 3},
//                 {id: "OGN-211-1", count: 2},
//                 {id: "OGN-218-1", count: 3},
//                 {id: "OGN-208-1", count: 3},
//                 {id: "OGN-083-1", count: 2},
//                 {id: "OGN-233-1", count: 3},
//                 {id: "OGN-234-1", count: 3},
//                 // BATTLEFIELDS
//                 {id: "OGN-294-1", count: 1},
//                 {id: "OGN-284-1", count: 1},
//                 {id: "OGN-285-1", count: 1},
//                 // RUNE DECK
//                 {id: "OGN-214-1", count: 8},
//                 {id: "OGN-089-1", count: 4},
//                 // SIDEBOARD
//                 {id: "OGN-119-1", count: 3},
//                 {id: "OGN-085-1", count: 2},
//                 {id: "OGN-243-1", count: 3},
//             ]
//         },
//     ],
