import BaseCardList from "./BaseCardList.json";
import CardCategories from "./CardCategories.json";
import IdMappings from "./IdMappings.json";
import { CCATEGORY, TYPE } from '../Enums';
import { CardDTO } from "../Interfaces";

let cardData: {[cardId: string]: CardDTO} = BaseCardList.cards as any;
let cardCategories: {[cardId: string]: CCATEGORY} = CardCategories.cardCategories as any;
const fullIdMappings: {[id: string]: {baseId: string, ttsId: string}} = IdMappings.mappings as any;
let ttsIdMappings: {[id: string]: string} = {};
let fromTtsIdMappings: {[ttsId: string]: string} = {};
for(let id in fullIdMappings) {
    const mapping = fullIdMappings[id];
    cardData[id] = cardData[mapping.baseId];
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

export function GET_CARD(id: string): CardDTO {
    if(!(id in cardData)) {
        console.warn(`Card "${id}" not found in cardData.`);
        cardData[id] = { baseId: id, name: id, type: TYPE.LEGEND, domains: [], rarity: "Common", rulesText: "", otherTags: [] };
    }
    return cardData[id];
}

export const ALL_CARD_IDS: string[] = Object.keys(cardData);

export function GET_CCATEGORY(potentiallyFullID: string): CCATEGORY {
    return (potentiallyFullID.substring(0,7) in cardCategories) ? cardCategories[potentiallyFullID.substring(0,7)] : CCATEGORY.LEGEND;
}

export function TO_BASE_ID(id: string): string {
    return GET_CARD(id).baseId;
}

export function TO_TTS_BASE_ID(id: string): string {
    if(!(id in ttsIdMappings)) {
        console.warn(`Card "${id}" not found in idMappings.`);
        ttsIdMappings[id] = (id.length === 7 || id.length === 8) ? `${id}-1` : id;
    }
    return ttsIdMappings[id];
}

export function TTS_ID_TO_ID(ttsId: string): string {
    if(!(ttsId in fromTtsIdMappings)) {
        console.warn(`Card "${ttsId}" not found in fromTtsIdMappings.`);
        fromTtsIdMappings[ttsId] = (ttsId.length > 7 && ttsId[3] === '-') ? ttsId.substring(0,7) : ttsId;
    }
    return fromTtsIdMappings[ttsId];
}

export function GET_CARD_ART(printId: string): string {
    return `https://static.dotgg.gg/riftbound/cards/${printId.replaceAll("*","s")}.webp`;
}
