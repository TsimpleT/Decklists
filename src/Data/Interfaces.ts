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
