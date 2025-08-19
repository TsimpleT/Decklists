import { GET_CARD } from "./CardData";
import { FACTION, PATCH, TYPE } from "./Enums";

export interface TournamentResults {
    tournamentName: string;
    abbrName: "RMW" | "TNF" | "SFC" | "RLT" | "MCW" | "RFC" | "LRCS" | "AEGIS";
    date: string;
    meta: PATCH;
    host: string;
    // size: number;
    links: string[];
    placings: TournamentPlacing[];
}

export interface TournamentPlacing {
    placing: string;
    decklists: Decklist[];
}

export interface PlayerPlacing {
    placing: string;
    tournament: string;
    date: string;
}

export interface Decklist {
    username: string;
    date: string;
    archetype: string;
    legend: string;
    chosenChampion: string;
    mainDeck: DecklistCardAmount[];
    battlefields: DecklistCardAmount[];
    runeDeck: DecklistCardAmount[];
    sideboard: DecklistCardAmount[];
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
    art: CardArtDTO;
    flavorText: string;
    tags: string[];
}

export interface CardStatsDTO {
    energy: number;
    might: number;
    cost: number;
    power: number;
}

export interface CardArtDTO {
    thumbnailURL: string;
    fullURL: string;
    artist: string;
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
    sbMin: number;
    sbMax: number;
}

export interface DL_CC_CARD_STATS {
    total: number;
    sbTotal: number;
}

export function TOURNAMENT_RESULT_TO_ID(result: TournamentResults): string {
    return `${result.abbrName}${result.date.replaceAll("/","")}`;
}

export function PARSE_DECKLIST(text: string): Decklist {
    const rawCardList: string[] = text.split(" ");
    let cardDict: {[cardId: string]: number} = {};
    for(let cardId of rawCardList) {
        if(cardId in cardDict) {
            cardDict[cardId] += 1;
        } else {
            cardDict[cardId] = 1;
        }
    }

    let decklist: Decklist = {
        username: "", date: "", archetype: "", legend: rawCardList[0], chosenChampion: rawCardList[1],
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
