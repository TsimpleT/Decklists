import BaseCardListOGN from "./BaseCardListOGN251219.json";
import BaseCardListOGS from "./BaseCardListOGS251219.json";
import BaseCardListSFD from "./BaseCardListSFD251219.json";
import CardCategories from "./CardCategories.json";
import IdMappings from "./IdMappings.json";

export type Domain = "Fury"|"Calm"|"Mind"|"Body"|"Chaos"|"Order";
type CardTypePrefix = "Signature"|"Champion"|"Token";
export type CardType = "Battlefield"|"Gear"|"Legend"|"Rune"|"Spell"|"Unit";
type Rarity = "Common"|"Uncommon"|"Rare"|"Epic"|"Showcase";

//'Base ID', 'Name', 'Pre-Type', 'Type', 'Domains', 'Rarity', 'Energy Cost', 'Power Cost', 'Might', 'Rules Text', 'Champion Tag', 'Other Tags', 'Other'
interface CardDTO {
    baseId:	string;
    name: string;
    preType?: CardTypePrefix;
    type: CardType;
    domains: Domain[];
    rarity: Rarity;
    energy?: number;
    power?: number;
    might?: number;
    rulesText: string;
    championTag?: string;
    otherTags: string[];
    other?: object;
}

export enum CCATEGORY { // CARD_CATEGORY
    LEGEND = "LEGEND", BATTLEFIELD = "BATTLEFIELD", RUNE = "RUNES", SIDE = "OTHER/SIDEBOARD",
    EARLY = "TURN 1 PLAYS", EARLY2ND = "TURN 1 PLAYS GOING 2ND", INTERACTION = "SMALL REMOVAL/INTERACTION",
    CORE = "CORE/VALUE", BIG_INTERACTION = "BIG REMOVAL/INTERACTION", LATE = "LATEGAME/CLOSERS"
}

// keep order matching CATEGORY_ORDERING
export const ALL_CCATEGORIES: CCATEGORY[] = [
    CCATEGORY.LEGEND, CCATEGORY.EARLY, CCATEGORY.EARLY2ND, CCATEGORY.INTERACTION, CCATEGORY.CORE,
    CCATEGORY.BIG_INTERACTION, CCATEGORY.LATE, CCATEGORY.SIDE, CCATEGORY.BATTLEFIELD, CCATEGORY.RUNE
];

// keep order matching ALL_CATEGORIES
export const CCATEGORY_ORDERING: {[key in CCATEGORY]: number} = {
    [CCATEGORY.LEGEND]: 0,
    [CCATEGORY.EARLY]: 1,
    [CCATEGORY.EARLY2ND]: 2,
    [CCATEGORY.INTERACTION]: 3,
    [CCATEGORY.CORE]: 4,
    [CCATEGORY.BIG_INTERACTION]: 5,
    [CCATEGORY.LATE]: 6,
    [CCATEGORY.SIDE]: 7,
    [CCATEGORY.BATTLEFIELD]: 9,
    [CCATEGORY.RUNE]: 10,
};

let cardData: {[cardId: string]: CardDTO} = {...BaseCardListOGN.cards, ...BaseCardListOGS.cards, ...BaseCardListSFD.cards} as any;
let cardCategories: {[cardId: string]: CCATEGORY} = CardCategories.cardCategories as any;
const fullIdMappings: {[id: string]: {baseId: string, ttsId: string, rarity: Rarity}} = IdMappings.mappings as any;
let ttsIdMappings: {[id: string]: string} = {};
let fromTtsIdMappings: {[ttsId: string]: string} = {};
for(let id in fullIdMappings) {
    const mapping = fullIdMappings[id];
    cardData[id] = {...cardData[mapping.baseId]};
    cardData[id].rarity = mapping.rarity;
    ttsIdMappings[id] = mapping.ttsId;
    fromTtsIdMappings[mapping.ttsId] = id;
}

var sortableArray = Object.entries(cardData);
var sortedArray = sortableArray.sort(([a,], [b,]) => a.localeCompare(b));
cardData = Object.fromEntries(sortedArray);

let setSet: Set<string> = new Set();
for(let card in cardData) {
    setSet.add(card.substring(0,3));
}

export const SET_LIST = Array.from(setSet.values());

export function IS_CARD(id: string): boolean {
    return id in cardData;
}

export function GET_CARD(id: string): CardDTO {
    if(!(id in cardData)) {
        console.warn(`Card "${id}" not found in cardData.`);
        return { baseId: id, name: id, type: "Legend", domains: [], rarity: "Common", rulesText: "", otherTags: [] };
        // cardData[id] = { baseId: id, name: id, type: TYPE.LEGEND, domains: [], rarity: "Common", rulesText: "", otherTags: [] };
    }
    return cardData[id];
}

export const ALL_CARD_IDS: string[] = Object.keys(cardData);

export function GET_CCATEGORY(id: string): CCATEGORY {
    return (TO_BASE_ID(id) in cardCategories) ? cardCategories[TO_BASE_ID(id)] : CCATEGORY.LEGEND;
}

export function TO_BASE_ID(id: string): string {
    return GET_CARD(id).baseId;
}

export function TO_TTS_ID(id: string): string {
    if(!(id in ttsIdMappings)) {
        ttsIdMappings[id] = (id.length === 7) ? `${id}-1` : id;
    }
    return ttsIdMappings[id];
}

export function TTS_ID_TO_ID(ttsId: string): string {
    if(!(ttsId in fromTtsIdMappings)) {
        fromTtsIdMappings[ttsId] = (ttsId.length >= 7 && ttsId[3] === '-') ? ttsId.substring(0,7) : ttsId;
    }
    return fromTtsIdMappings[ttsId];
}

export function GET_CARD_ART(id: string): string {
    return `https://static.dotgg.gg/riftbound/cards/${id.replaceAll("*","s")}.webp`;
    // https://cdn.rgpub.io/public/live/map/riftbound/latest/OGN/cards/OGN-001/full-desktop-2x.jpg // high quality
}
