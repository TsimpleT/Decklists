
import { GET_CARD, TO_TTS_ID, TTS_ID_TO_ID } from "./Cards";
import { DOMAIN, PATCH, PRETYPE, TYPE } from "./Enums";

type TournamentAbbrName = "RMW" | "TNF" | "SFC" | "RLT" | "MCW" | "RFC" | "LUX" | "AEG" | "RLL" | "GZO" | "BJO" | "CQO" | "HZO";
type TournamentTier = number; // 0 = Championship, 1 = Regional, 2 = Regional-ish, 3 = Local, 4 = "Small Local";

interface ITournamentResults {
    tournamentName: string;
    abbrName: TournamentAbbrName;
    date: string;
    meta: PATCH;
    tier: TournamentTier;
    host: string;
    // size: number;
    links: string[];
}

export interface TournamentResults extends ITournamentResults {
    placings: TournamentPlacing[];
}

export interface RawTournamentResults extends ITournamentResults {
    placings: RawTournamentPlacing[];
}

export interface TournamentPlacing {
    placing: string;
    decklists: Decklist[];
}

export interface RawTournamentPlacing {
    placing: string;
    decklists: RawDecklist[];
}

export interface PlayerPlacing {
    placing: string;
    tournament: string;
    date: string;
}

export interface Decklist extends RawDecklist {
    date: string;
    tournId: string;
    tournamentName: string;
    placing: string;
}

export interface RawDecklist {
    date?: string;
    username: string;
    archetype: string;
    legend: string;
    chosenChampion: string;
    mainDeck: DecklistCardAmount[];
    battlefields: DecklistCardAmount[];
    runeDeck: DecklistCardAmount[];
    sideboard: DecklistCardAmount[];
    link?: string;
}

export interface DecklistCardAmount {
    id: string;
    count: number;
}

//'Base ID', 'Name', 'Pre-Type', 'Type', 'Domains', 'Rarity', 'Energy Cost', 'Power Cost', 'Might', 'Rules Text', 'Champion Tag', 'Other Tags', 'Other'
export interface CardDTO {
    baseId:	string;
    name: string;
    preType?: PRETYPE;
    type: TYPE;
    domains: DOMAIN[];
    rarity: "Common"|"Uncommon"|"Rare"|"Epic"|"Alt Art";
    energy?: number;
    power?: number;
    might?: number;
    rulesText: string;
    championTag?: string;
    otherTags: string[];
    other?: object;
}

export interface CARD_STATS {
    mdApp: number;
    avg: number;
    sbAvg: number;
    min: number;
    max: number;
}

export interface CC_CARD_STATS {
    avg: number;
    sbAvg: number;
    min: number;
    max: number;
    // sbMin: number;
    // sbMax: number;
}

export interface DL_CC_CARD_STATS {
    total: number;
    sbTotal: number;
}

export function GET_TOURNAMENT_ID(abbrName: string, date: string): string {
    return `${abbrName}-${date.replaceAll("/","")}`;
}

export function PARSE_TTS_DECKLIST(text: string): RawDecklist {
    const cardIds: string[] = text.split(" ").map(ttsId => TTS_ID_TO_ID(ttsId));
    let cardDict: {[cardId: string]: number} = {};
    for(let id of cardIds) {
        if(id in cardDict) {
            cardDict[id] += 1;
        } else {
            cardDict[id] = 1;
        }
    }

    let decklist: RawDecklist = {
        username: "", archetype: "", date: "", link: "",
        legend: cardIds[0], chosenChampion: cardIds[1],
        mainDeck: [], battlefields: [], runeDeck: [], sideboard: []
    };
    let mode: "MD" | "BF" | "RU" | "SB" = "MD";
    function getDecklistPortion(): DecklistCardAmount[] {
        return (mode === "MD") ? decklist.mainDeck : (mode === "BF") ? decklist.battlefields : (mode === "RU") ? decklist.runeDeck : decklist.sideboard;
    }
    
    let count = 0;
    for(let i = 1; i < cardIds.length; i++) {
        count++;
        if(i === cardDict.length-1 || cardIds[i] !== cardIds[i+1]) {
            const cardType = GET_CARD(cardIds[i]).type;
            if(cardType === TYPE.BATTLEFIELD) {
                mode = "BF";
            } else if(cardType === TYPE.RUNE) {
                mode = "RU";
            } else if(mode === "RU") { // cardType is already guaranteed not to be RUNE bc else
                mode = "SB";
            }
            getDecklistPortion().push({id: cardIds[i], count: count});
            count = 0;
        }
    }

    return decklist;
}

export function DECKLIST_TTS_EXPORT(decklist: RawDecklist): string {
    return [{id: decklist.legend, count: 1}].concat(decklist.mainDeck).concat(decklist.battlefields).concat(decklist.runeDeck).concat(decklist.sideboard)
        .map((cardAmount: DecklistCardAmount) => {
            let arr = [];
            for(let i = 0; i < cardAmount.count; i++) {
                arr.push(TO_TTS_ID(cardAmount.id));
            }
            return arr.join(" ");
        }).join(" ");
}

export const parseDCAForTCGA = (dca: DecklistCardAmount) => `${dca.count} ${GET_CARD(dca.id).name}`;
export function DECKLIST_TCGA_EXPORT(decklist: RawDecklist): string {
    return [[{id: decklist.legend, count: 1}], decklist.mainDeck, decklist.battlefields, decklist.runeDeck]
        .map((dcaArr: DecklistCardAmount[]) => dcaArr.map(parseDCAForTCGA).join("\n")).join("\n\n") +
        ((decklist.sideboard.length === 0) ? "" :
            "\n\nSideboard:\n" + decklist.sideboard.map(parseDCAForTCGA).join("\n")
        );
}

export function MOCK_DECKLIST_FROM_RAW(raw: RawDecklist): Decklist {
    return {...raw, tournId: "", tournamentName: "", placing: "", date: raw.date ?? ""};
}
