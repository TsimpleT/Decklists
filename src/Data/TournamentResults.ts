import { Decklist, IDecklist } from "./Decklist";
import { AEGIS_20250817 } from "./Decklists/Aegis";
import { HZO_20250914, BJO_20250831, CQO_20250907, GZO_20250824, SFC_20250803 } from "./Decklists/China";
import { RFC_20250809 } from "./Decklists/France";
import { MCW_20250807 } from "./Decklists/Italy";
import { LUX_20250816 } from "./Decklists/LuxuryRiftboundChampionSeries";
import { RMW_20250809, RMW_20250802, RMW_20250726 } from "./Decklists/RiftboundMetaWeekly";
import { RLL_20250919, RLL_20250905, RLL_20250822, RLL_20250823, RLT_20250808 } from "./Decklists/Riftlab";
import { TNF_20250918, TNF_20250911, TNF_20250904, TNF_20250828, TNF_20250807, TNF_20250731, TNF_20250814, TNF_20250821 } from "./Decklists/ThursdayNightFights";
import { Archetype } from "./Archetype";

type TournamentAbbrName = "RMW" | "TNF" | "SFC" | "RLT" | "MCW" | "RFC" | "LUX" | "AEG" | "RLL" | "GZO" | "BJO" | "CQO" | "HZO";
type TournamentTier = number; // 0 = Championship, 1 = Regional, 2 = Regional-ish, 3 = Local, 4 = "Small Local";

interface BaseTournamentResults<T> {
    tournamentName: string;
    abbrName: TournamentAbbrName;
    date: string;
    meta: "OGN";
    tier: TournamentTier;
    host: string;
    // size: number;
    links: string[];
    results: T[];
}
export type ITournamentResults = BaseTournamentResults<ITournamentPlacing>;
export type TournamentResults = BaseTournamentResults<TournamentPlacing>;

interface BaseTournamentPlacing<T> {
    placing: string;
    decklists: T[];
}
type ITournamentPlacing = BaseTournamentPlacing<IDecklist>;
type TournamentPlacing = BaseTournamentPlacing<Decklist>;

export function GET_TOURNAMENT_ID(abbrName: string, date: string): string {
    return `${abbrName}-${date.replaceAll("/","")}`;
}

export const TOURNAMENT_RESULTS: TournamentResults[] = [
    RLL_20250919, TNF_20250918, HZO_20250914, TNF_20250911, CQO_20250907, RLL_20250905, TNF_20250904, BJO_20250831, TNF_20250828, GZO_20250824, RLL_20250823, RLL_20250822, TNF_20250821, AEGIS_20250817, LUX_20250816, TNF_20250814, RMW_20250809, RFC_20250809, RLT_20250808, MCW_20250807, TNF_20250807, SFC_20250803, RMW_20250802, TNF_20250731, RMW_20250726
].map((itr: ITournamentResults): TournamentResults => {
    return {
        tournamentName: itr.tournamentName, abbrName: itr.abbrName, date: itr.date, meta: itr.meta, tier: itr.tier, host: itr.host, links: itr.links,
        results: itr.results.map((itp) => {
            return {
                placing: itp.placing,
                decklists: itp.decklists.map((idl) => new Decklist(idl, itr.tournamentName, GET_TOURNAMENT_ID(itr.abbrName, itr.date), itp.placing))
            };
        })
    };
});

let tournamentDict: {[id: string]: TournamentResults} = {};
let tournamentNames: {[id: string]: string} = {};
let tournamentNameToAbbrDict: {[name: string]: string} = {};

let archetypeDecklists: {[archetype in Archetype]: Decklist[]} = {
    "Kai'Sa Midrange": [],
    "Master Yi Midrange": [],
    "Miss Fortune Aurora": [],
    "Miss Fortune Aggro": [],
    "Darius": [],
    "Sett Midrange": [],
    "Master Yi Aurora": [],
    "Viktor": [],
    "Annie Tempo": [],
    "Teemo": [],
    "Ahri": [],
    "Kai'Sa Control": [],
    "Lee Sin Midrange": [],
    "Sett Aurora": [],
    "Volibear Ramp": [],
    "Lux Control": [],
    "Jinx Aggro": [],
    "Leona Midrange": [],
    "Yasuo Midrange": [],
    "Garen Midrange": [],
    "Unknown": []
};

for(let tournamentResults of TOURNAMENT_RESULTS) {
    const tournId = GET_TOURNAMENT_ID(tournamentResults.abbrName, tournamentResults.date);
    tournamentDict[tournId] = tournamentResults;
    tournamentNameToAbbrDict[tournamentResults.tournamentName] = tournamentResults.abbrName;
    tournamentNames[tournId] = tournamentResults.tournamentName;
    for(let placing of tournamentResults.results) {
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
    for(let placing of tournamentResult.results) {
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
    for(let placing of tournamentResult.results) {
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
