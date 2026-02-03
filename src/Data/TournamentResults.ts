import { Decklist, IDecklist } from "./Decklist";
import { AEGIS_20250817 } from "./Decklists/Aegis";
import { HZO_20250914, BJO_20250831, CQO_20250907, GZO_20250824, SFC_20250803, NOS_20251101, CDO_20260124, FZO_20260117, DLO_20260131 } from "./Decklists/China";
import { RFC_20250809 } from "./Decklists/France";
import { MCW_20250807 } from "./Decklists/Italy";
import { LUX_20250816, LUX_20251108 } from "./Decklists/LuxuryGaming";
import { RMW_20250809, RMW_20250802, RMW_20250726, RMW_20251214 } from "./Decklists/RiftboundMetaWeekly";
import { RLL_20250919, RLL_20250905, RLL_20250822, RLL_20250823, RLT_20250808, RLT_20251002 } from "./Decklists/Riftlab";
import { TNF_20250918, TNF_20250911, TNF_20250904, TNF_20250828, TNF_20250807, TNF_20250731, TNF_20250814, TNF_20250821, TNF_20250925, TNF_20251002, TNF_20251009, TNF_20251016, TNF_20251023, TNF_20251030, TNF_20251106, TNF_20251120, TNF_20251113, TNF_20251204, TNF_20251211, TNF_20251218 } from "./Decklists/ThursdayNightFights";
import { ALL_ARCHETYPES, Archetype } from "./Archetype";
import { RNR_20250927, RNR_20251011, RNR_20251018, RNR_20251025, RNR_20251108, RNR_20251115, RNR_20251130, RNR_20251220, RNR_20251227 } from "./Decklists/RunesAndRift";
import { TBB_20250927, TBB_20251004, TBB_20251011, TBB_20251018, TBB_20251026, TBB_20251109, TBB_20251116 } from "./Decklists/BandleBlitz";
import { RMX_20251004, RMX_20251011, RMX_20251018, RMX_20251025, RMX_20251117, RMX_20251124, RMX_20251208, RMX_20251215, RMX_20251222 } from "./Decklists/Riftmaxxing";
import { SRL_20251005 } from "./Decklists/SundayRiftboundLeague";
import { BRO_20251025, BRO_20251210, BRO_20251221 } from "./Decklists/Brocains";
import { CCS_20251122 } from "./Decklists/CharliesCollectables";
import { SCG_20251123 } from "./Decklists/StarCityGames";
import { REQ_20251206 } from "./Decklists/Officials";
import { PPG_20251212, PPG_20251213, PPG_20251214 } from "./Decklists/ProPlayGames";

type TournamentAbbrName = "REQ" | "RMW" | "TNF" | "SFC" | "RLT" | "MCW" | "RFC" | "LUX" | "AEG" | "RLL" | "GZO" | "BJO" | "CQO" | "HZO" | "RNR" | "TBB" | "NOS" | "RMX" | "SRL" | "BRO" | "CCS" | "SCG" | "PPG" | "XYZ" | "FZO" | "CDO" | "DLO";
type TournamentTier = number; // 0 = Championship, 1 = Regional, 2 = Regional-ish, 3 = Local, 4 = "Small Local";

export const ALL_METAS = [ "OGN", "SFD" ] as const;
export type Meta = typeof ALL_METAS[number];
export function META_FROM_STRING(str: string): Meta {
    return (ALL_METAS.includes(str.toUpperCase() as Meta)) ? str.toUpperCase() as Meta : ALL_METAS[ALL_METAS.length-1];
}

interface BaseTournamentResults<T> {
    tournamentName: string;
    abbrName: TournamentAbbrName;
    date: string;
    meta: Meta;
    tier: TournamentTier;
    host: string;
    size?: number;
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
    DLO_20260131, CDO_20260124, FZO_20260117, RNR_20251227, RNR_20251220, RMX_20251222, BRO_20251221, TNF_20251218, RMX_20251215, RMW_20251214, PPG_20251214, PPG_20251213, PPG_20251212, TNF_20251211, BRO_20251210, RMX_20251208, REQ_20251206, TNF_20251204, RNR_20251130, RMX_20251124, SCG_20251123, CCS_20251122, TNF_20251120, RMX_20251117, TBB_20251116, RNR_20251115, TNF_20251113, TBB_20251109, LUX_20251108, RNR_20251108, TNF_20251106, NOS_20251101, TNF_20251030, TBB_20251026, RNR_20251025, BRO_20251025, RMX_20251025, TNF_20251023, TBB_20251018, RNR_20251018, RMX_20251018, TNF_20251016, TBB_20251011, RNR_20251011, RMX_20251011, TNF_20251009, SRL_20251005, TBB_20251004, RMX_20251004, RLT_20251002, TNF_20251002, TBB_20250927, RNR_20250927, TNF_20250925, RLL_20250919, TNF_20250918, HZO_20250914, TNF_20250911, CQO_20250907, RLL_20250905, TNF_20250904, BJO_20250831, TNF_20250828, GZO_20250824, RLL_20250823, RLL_20250822, TNF_20250821, AEGIS_20250817, LUX_20250816, TNF_20250814, RMW_20250809, RFC_20250809, RLT_20250808, MCW_20250807, TNF_20250807, SFC_20250803, RMW_20250802, TNF_20250731, RMW_20250726
].map((itr) => {
    return {
        tournamentName: itr.tournamentName, abbrName: itr.abbrName, date: itr.date, meta: itr.meta, tier: itr.tier, host: itr.host, links: itr.links,
        results: itr.results.map((itp: ITournamentPlacing) => {
            return {
                placing: itp.placing,
                decklists: itp.decklists.map((idl) => new Decklist(idl, itr.tournamentName, GET_TOURNAMENT_ID(itr.abbrName, itr.date), itp.placing))
            };
        })
    };
});

export const TOURNAMENT_RESULT_DICT: {[key in Meta]: TournamentResults[]} = {"OGN": [], "SFD": []};

for(let tr of TOURNAMENT_RESULTS) {
    TOURNAMENT_RESULT_DICT[tr.meta].push(tr);
}

let tournamentDict: {[id: string]: TournamentResults} = {};
let tournamentNames: {[id: string]: string} = {};
let tournamentNameToAbbrDict: {[name: string]: string} = {};

let metaArchetypeDecklists: {[meta in Meta]: {[archetype in Archetype]: Decklist[]}} = Object.fromEntries(
    ALL_METAS.map((meta) => [meta,
        Object.fromEntries(ALL_ARCHETYPES.map((archetype) => [archetype, []]))
    ])
) as any;

for(let tournamentResults of Object.values(TOURNAMENT_RESULT_DICT).flat()) {
    const tournId = GET_TOURNAMENT_ID(tournamentResults.abbrName, tournamentResults.date);
    tournamentDict[tournId] = tournamentResults;
    tournamentNameToAbbrDict[tournamentResults.tournamentName] = tournamentResults.abbrName;
    tournamentNames[tournId] = tournamentResults.tournamentName;
    for(let placing of tournamentResults.results) {
        for(let decklist of placing.decklists) {
            if(decklist.archetype && decklist.mainDeck.length > 0) {
                metaArchetypeDecklists[tournamentResults.meta][decklist.archetype].push(decklist);
            }
        }
    }
}

export function GET_ARCHETYPE_DECKLISTS(archetype: Archetype, meta: Meta): Decklist[] {
    return metaArchetypeDecklists[meta][archetype];
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
