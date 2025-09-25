
import { GET_CARD, IS_CARD, TO_TTS_ID, TTS_ID_TO_ID } from "./Cards";
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

export const ALL_ARCHETYPES = [
    "Kai'Sa Midrange", "Master Yi Midrange",
    "Miss Fortune Aurora", "Darius", "Sett Midrange", "Master Yi Aurora", "Viktor",
    "Annie Tempo", "Teemo", "Ahri",
    "Kai'Sa Control", "Lee Sin Midrange", "Sett Aurora", "Volibear Ramp", "Lux Control", "Jinx Aggro", "Leona Midrange", "Yasuo Midrange",
    "Garen Midrange", "Unknown"
] as const;
export type Archetype = typeof ALL_ARCHETYPES[number];

export function ARCHETYPE_FROM_STRING(str: string): Archetype {
    return (ALL_ARCHETYPES.includes(str as Archetype)) ? str as Archetype : "Unknown";
}

export interface RawDecklist {
    date?: string;
    username: string;
    archetype: Archetype;
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

// in order: 1x legend, 40x main deck, 3x battlefield, 12x rune, 8x sideboard (or 0x)
export function PARSE_TTS_DECKLIST(text: string): RawDecklist {
    const cardIdList: string[] = text.split(" ").map(ttsId => TTS_ID_TO_ID(ttsId));

    let decklist: RawDecklist = {
        username: "", archetype: "Unknown", date: "", link: "",
        legend: (cardIdList.length > 0) ? cardIdList[0] : "", chosenChampion: (cardIdList.length > 1) ? cardIdList[1] : "",
        mainDeck: [], battlefields: [], runeDeck: [], sideboard: []
    };
    let cardDict: {[cardId: string]: number} = {};
    for(let id of cardIdList) {
        if(!IS_CARD(id)) continue;
        if(id in cardDict) {
            cardDict[id] += 1;
        } else {
            cardDict[id] = 1;
        }
    }

    let mode: "MD" | "BF" | "RU" | "SB" = "MD";
    function getDecklistPortion(): DecklistCardAmount[] {
        return (mode === "MD") ? decklist.mainDeck : (mode === "BF") ? decklist.battlefields : (mode === "RU") ? decklist.runeDeck : decklist.sideboard;
    }
    
    let count = 0;
    for(let i = 1; i < cardIdList.length; i++) { // first card is legend
        count++;
        if(i === cardIdList.length-1 || cardIdList[i] !== cardIdList[i+1]) {
            if(!IS_CARD(cardIdList[i])) {
                count = 0;
                continue;
            }
            const cardType = GET_CARD(cardIdList[i]).type;
            if(cardType === TYPE.BATTLEFIELD) {
                mode = "BF";
            } else if(cardType === TYPE.RUNE) {
                mode = "RU";
            } else if(mode === "RU") { // cardType is already guaranteed not to be RUNE bc else
                mode = "SB";
            }
            getDecklistPortion().push({id: cardIdList[i], count: count});
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
