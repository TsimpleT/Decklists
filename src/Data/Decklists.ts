import { SFC_20250803 } from "./decklists/China";
import { RFC_20250809 } from "./decklists/France";
import { MCW_20250807 } from "./decklists/Italy";
import { RMW_20250809, RMW_20250802, RMW_20250726 } from "./decklists/RiftboundMetaWeekly";
import { RLT_20250808 } from "./decklists/Riftlab";
import { TNF_20250807, TNF_20250731 } from "./decklists/ThursdayNightFights";
import { Decklist, TournamentResults } from "./Interfaces";

export const TOURNAMENT_DECKLISTS: TournamentResults[] = [
    RMW_20250809, RFC_20250809, RLT_20250808, MCW_20250807, TNF_20250807, SFC_20250803, RMW_20250802, TNF_20250731, RMW_20250726
];

let decklistMap: {[archetype: string]: Decklist[]} = {};

for(let tournamentResult of TOURNAMENT_DECKLISTS) {
    for(let placing of tournamentResult.placings) {
        for(let decklist of placing.decklists) {
            if(!(decklist.archetype in decklistMap)) {
                decklistMap[decklist.archetype] = [];
            }
            decklistMap[decklist.archetype].push(decklist);
        }
    }
}

export function GET_ARCHETYPE_DECKLISTS(archetype: string): Decklist[] {
    if(!(archetype in decklistMap)) {
        throw Error(`archetype ${archetype} doesn't exist.`);
    }
    return decklistMap[archetype];
}

export const ALL_ARCHETYPES: string[] = Object.keys(decklistMap).sort();

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
