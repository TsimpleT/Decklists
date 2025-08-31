import { GET_CARD } from "./CardData";
import { FACTION, PATCH, TYPE } from "./Enums";

type TournamentAbbrName = "RMW" | "TNF" | "SFC" | "RLT" | "MCW" | "RFC" | "LUX" | "AEG" | "RLL" | "GZO";
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

export interface RiftboundContentDTO {
    game: string;
    version: string;
    lastUpdated: string;
    sets: SetDTO[];
}

export interface SetDTO {
    id: string;
    name: string;
    cards: CardDTO[];
}

export interface CardDTO {
    id:	string;
    collectorNumber: number;
    set: string;
    name: string;
    description: string;
    type: TYPE;
    rarity: string;
    faction?: FACTION;
    stats: CardStatsDTO;
    keywords: string[];
    // art: CardArtDTO;
    flavorText: string;
    tags: string[];
}

export interface CardStatsDTO {
    energy: number;
    might: number;
    cost: number;
    power: number;
}

// export interface CardArtDTO {
//     thumbnailURL: string;
//     fullURL: string;
//     artist: string;
// }

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
    sbMin: number;
    sbMax: number;
}

export interface DL_CC_CARD_STATS {
    total: number;
    sbTotal: number;
}

export function GET_TOURNAMENT_ID(abbrName: string, date: string): string {
    return `${abbrName}-${date.replaceAll("/","")}`;
}

export function PARSE_DECKLIST(text: string): RawDecklist {
    const rawCardList: string[] = text.split(" ");
    let cardDict: {[cardId: string]: number} = {};
    for(let cardId of rawCardList) {
        if(cardId in cardDict) {
            cardDict[cardId] += 1;
        } else {
            cardDict[cardId] = 1;
        }
    }

    let decklist: RawDecklist = {
        username: "", archetype: "", date: "", link: "",
        legend: rawCardList[0], chosenChampion: rawCardList[1],
        mainDeck: [], battlefields: [], runeDeck: [], sideboard: []
    };
    let mode: "MD" | "BF" | "RU" | "SB" = "MD";
    function getDecklistPortion(): DecklistCardAmount[] {
        return (mode === "MD") ? decklist.mainDeck : (mode === "BF") ? decklist.battlefields : (mode === "RU") ? decklist.runeDeck : decklist.sideboard;
    }
    
    let count = 0;
    for(let i = 1; i < rawCardList.length; i++) {
        count++;
        if(i === cardDict.length-1 || rawCardList[i] !== rawCardList[i+1]) {
            const cardType = GET_CARD(rawCardList[i]).type;
            if(cardType === TYPE.BATTLEFIELD) {
                mode = "BF";
            } else if(cardType === TYPE.RUNE) {
                mode = "RU";
            } else if(mode === "RU") { // cardType is already guaranteed not to be RUNE bc else
                mode = "SB";
            }
            getDecklistPortion().push({id: rawCardList[i], count: count});
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
                arr.push(cardAmount.id);
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
