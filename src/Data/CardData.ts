import { FACTION, TYPE, CCATEGORY } from "./Enums";
import { CardDTO } from "./Interfaces";

const R = FACTION.FURY, O = FACTION.BODY, P = FACTION.CHAOS;
const G = FACTION.CALM, B = FACTION.MIND, Y = FACTION.ORDER;

const BF = TYPE.BATTLEFIELD;
const CU = TYPE.CHAMPION_UNIT;
const GE = TYPE.GEAR;
const LG = TYPE.LEGEND;
const RU = TYPE.RUNE;
const SP = TYPE.SPELL;
const UN = TYPE.UNIT;

const CCLG = CCATEGORY.LEGEND;
const EARL = CCATEGORY.EARLY;
const E2ND = CCATEGORY.EARLY2ND;
const INTR = CCATEGORY.INTERACTION;
const CORE = CCATEGORY.CORE;
const BINT = CCATEGORY.BIG_INTERACTION;
const LATE = CCATEGORY.LATE;
const SIDE = CCATEGORY.SIDE;
const CCBF = CCATEGORY.BATTLEFIELD;
const CCRU = CCATEGORY.RUNE;

let cardData: {[cardId: string]: CardDTO} = {};
let cardCategories: {[cardId: string]: CCATEGORY} = {};
function addCard(id: string, cc: CCATEGORY, name: string, energy: number, power: number, type: TYPE, faction?: FACTION): void {
    const card: CardDTO = {
        id: id, collectorNumber: 0, set: id.substring(0,3), name: name,
        stats: { energy: energy, might: 0, cost: 0, power: power },
        description: "", type: type, rarity: "", faction: faction, 
        keywords: [], /*art: { thumbnailURL: `https://static.dotgg.gg/riftbound/cards/${id}.webp`, fullURL: `https://static.dotgg.gg/riftbound/cards/${id}.webp`, artist: "" },*/
        flavorText: "", tags: []
    };
    if(id in cardData) {
        throw Error(`Card ${card.id} already exists.`);
    }
    cardData[id] = card;
    cardCategories[id] = cc;
}

addCard("OGS-001", CORE, "Annie, Fiery", 5, 1, CU, R);
addCard("OGS-002", BINT, "Firestorm", 6, 1, SP, R);
addCard("OGS-003", INTR, "Incinerate", 2, 0, SP, R);
addCard("OGS-004", CORE, "Master Yi, Meditative", 5, 1, CU, G);
addCard("OGS-005", CORE, "Zephyr Sage", 6, 1, UN, G);
addCard("OGS-006", CORE, "Lux, Illuminated", 6, 1, CU, B);
addCard("OGS-007", CORE, "Garen, Rugged", 6, 1, CU, O);
addCard("OGS-008", BINT, "Gentlemen's Duel", 6, 1, SP, O);
addCard("OGS-009", LATE, "Master Yi, Honed", 7, 1, CU, O);
addCard("OGS-010", CORE, "Annie, Stubborn", 4, 1, CU, P);
addCard("OGS-011", INTR, "Flash", 2, 0, SP, P);
addCard("OGS-012", BINT, "Blast of Power", 6, 1, SP, Y);
addCard("OGS-013", CORE, "Garen, Commander", 6, 1, CU, Y);
addCard("OGS-014", CORE, "Lux, Crownguard", 4, 0, CU, Y);
addCard("OGS-015", CORE, "Recruit the Vanguard", 6, 0, SP, Y);
addCard("OGS-016", CORE, "Vanguard Attendant", 6, 1, UN, Y);
addCard("OGS-017", CCLG, "Annie, Dark Child", 0, 0, LG);
addCard("OGS-018", LATE, "Tibbers", 8, 2, UN);
addCard("OGS-019", CCLG, "Master Yi, Wuju Bladesman", 0, 0, LG);
addCard("OGS-020", INTR, "Highlander", 4, 0, SP);
addCard("OGS-021", CCLG, "Lux, Lady of Luminosity", 0, 0, LG);
addCard("OGS-022", BINT, "Final Spark", 8, 0, SP);
addCard("OGS-023", CCLG, "Garen, Might of Demacia", 0, 0, LG);
addCard("OGS-024", BINT, "Decisive Strike", 5, 1, SP);

addCard("OGN-001", CORE, "Blazing Scorcher", 5, 0, UN, R);
addCard("OGN-002", CORE, "Brazen Buccaneer", 6, 0, UN, R);
addCard("OGN-003", EARL, "Chemtech Enforcer", 2, 0, UN, R);
addCard("OGN-004", INTR, "Cleave", 1, 0, SP, R);
addCard("OGN-005", INTR, "Disintegrate", 4, 0, SP, R);
addCard("OGN-006", CORE, "Flame Chompers", 3, 0, UN, R);
addCard("OGN-007", CCRU, "Fury Rune", 0, 0, RU, R);
addCard("OGN-008", INTR, "Get Excited!", 2, 1, SP, R);
addCard("OGN-009", INTR, "Hextech Ray", 1, 1, SP, R);
addCard("OGN-010", EARL, "Legion Rearguard", 2, 0, UN, R);
addCard("OGN-011", LATE, "Magma Wurm", 8, 1, UN, R);
addCard("OGN-012", CORE, "Noxus Hopeful", 4, 0, UN, R);
addCard("OGN-013", EARL, "Pouty Poro", 2, 0, UN, R);
addCard("OGN-014", BINT, "Skysplitter", 8, 1, SP, R);
addCard("OGN-015", CORE, "Captain Farron", 4, 1, UN, R);
addCard("OGN-016", CORE, "Dangerous Duo", 3, 0, UN, R);
addCard("OGN-017", CORE, "Iron Ballista", 3, 0, GE, R);
addCard("OGN-018", SIDE, "Noxus Saboteur", 3, 0, UN, R);
addCard("OGN-019", CORE, "Raging Soul", 4, 0, UN, R);
addCard("OGN-020", CORE, "Scrapyard Champion", 5, 1, UN, R);
addCard("OGN-021", CORE, "Sun Disc", 2, 1, GE, R);
addCard("OGN-022", SIDE, "Thermo Beam", 5, 2, SP, R);
addCard("OGN-023", CORE, "Unlicensed Armory", 2, 0, GE, R);
addCard("OGN-024", INTR, "Void Seeker", 3, 1, SP, R);
addCard("OGN-025", CORE, "Blind Fury", 4, 2, SP, R);
addCard("OGN-026", SIDE, "Brynhir Thundersong", 6, 0, UN, R);
addCard("OGN-027", CORE, "Darius, Trifarian", 5, 1, CU, R);
addCard("OGN-028", LATE, "Draven, Showboat", 5, 1, CU, R);
addCard("OGN-029", INTR, "Falling Star", 2, 2, SP, R);
addCard("OGN-030", CORE, "Jinx, Demolitionist", 3, 1, CU, R);
addCard("OGN-031", CORE, "Raging Firebrand", 6, 1, UN, R);
addCard("OGN-032", CORE, "Ravenborn Tome", 3, 0, GE, R);
addCard("OGN-033", CORE, "Shakedown", 2, 1, SP, R);
addCard("OGN-034", LATE, "Tryndamere, Barbarian", 7, 2, CU, R);
addCard("OGN-035", CORE, "Vayne, Hunter", 4, 1, CU, R);
addCard("OGN-036", LATE, "Vi, Destructive", 2, 1, CU, R);
addCard("OGN-037", CORE, "Immortal Phoenix", 3, 1, UN, R);
addCard("OGN-038", LATE, "Kadregrin the Infernal", 9, 2, UN, R);
addCard("OGN-039", CORE, "Kai'Sa, Survivor", 4, 0, CU, R);
addCard("OGN-040", SIDE, "Seal of Rage", 0, 1, GE, R);
addCard("OGN-041", LATE, "Volibear, Furious", 10, 2, CU, R);
addCard("OGN-042", CCRU, "Calm Rune", 0, 0, RU, G);
addCard("OGN-043", INTR, "Charm", 1, 1, SP, G);
addCard("OGN-044", EARL, "Clockwork Keeper", 2, 0, UN, G);
addCard("OGN-045", INTR, "Defy", 1, 1, SP, G);
addCard("OGN-046", INTR, "En Garde", 1, 0, SP, G);
addCard("OGN-047", CORE, "Find Your Center", 3, 0, SP, G);
addCard("OGN-048", CORE, "Meditation", 2, 0, SP, G);
addCard("OGN-049", CORE, "Playful Phantom", 5, 0, UN, G);
addCard("OGN-050", INTR, "Rune Prison", 2, 1, SP, G);
addCard("OGN-051", CORE, "Solari Shieldbearer", 3, 0, UN, G);
addCard("OGN-052", EARL, "Stalwart Poro", 2, 0, UN, G);
addCard("OGN-053", INTR, "Stand United", 3, 0, SP, G);
addCard("OGN-054", E2ND, "Sunlit Guardian", 3, 0, UN, G);
addCard("OGN-055", E2ND, "Wielder of Water", 3, 0, UN, G);
addCard("OGN-056", SIDE, "Adaptatron", 4, 0, UN, G);
addCard("OGN-057", INTR, "Block", 2, 0, SP, G);
addCard("OGN-058", INTR, "Discipline", 2, 0, SP, G);
addCard("OGN-059", LATE, "Eclipse Herald", 7, 1, UN, G);
addCard("OGN-060", EARL, "Mask of Foresight", 2, 0, GE, G);
addCard("OGN-061", CORE, "Poro Herder", 3, 1, UN, G);
addCard("OGN-062", CORE, "Reinforce", 5, 0, SP, G);
addCard("OGN-063", SIDE, "Spirit's Refuge", 2, 1, GE, G);
addCard("OGN-064", INTR, "Wind Wall", 3, 2, SP, G);
addCard("OGN-065", CORE, "Wizened Elder", 4, 0, UN, G);
addCard("OGN-066", LATE, "Ahri, Alluring", 5, 1, CU, G);
addCard("OGN-067", BINT, "Blitzcrank, Impassive", 5, 1, CU, G);
addCard("OGN-068", CORE, "Caitlyn, Patrolling", 3, 1, CU, G);
addCard("OGN-069", INTR, "Last Stand", 3, 1, SP, G);
addCard("OGN-070", SIDE, "Mageseeker Warden", 6, 1, UN, G);
addCard("OGN-071", CORE, "Party Favors", 3, 0, SP, G);
addCard("OGN-072", CORE, "Solari Shrine", 3, 0, GE, G);
addCard("OGN-073", CORE, "Sona, Harmonious", 4, 1, CU, G);
addCard("OGN-074", CORE, "Taric, Protector", 4, 1, CU, G);
addCard("OGN-075", LATE, "Tasty Faefolk", 7, 0, UN, G);
addCard("OGN-076", CORE, "Yasuo, Remorseful", 6, 2, CU, G);
addCard("OGN-077", INTR, "Zhonya's Hourglass", 2, 0, GE, G);
addCard("OGN-078", CORE, "Lee Sin, Ascetic", 5, 1, CU, G);
addCard("OGN-079", CORE, "Leona, Zealot", 6, 1, CU, G);
addCard("OGN-080", BINT, "Mystic Reversal", 4, 3, SP, G);
addCard("OGN-081", SIDE, "Seal of Focus", 0, 1, GE, G);
addCard("OGN-082", LATE, "Whiteflame Protector", 8, 2, UN, G);
addCard("OGN-083", CORE, "Consult the Past", 4, 0, SP, B);
addCard("OGN-084", CORE, "Eager Apprentice", 3, 0, UN, B);
addCard("OGN-085", INTR, "Falling Comet", 5, 0, SP, B);
addCard("OGN-086", CORE, "Jeweled Colossus", 5, 0, UN, B);
addCard("OGN-087", E2ND, "Lecturing Yordle", 3, 0, UN, B);
addCard("OGN-088", CORE, "Mega-Mech", 7, 0, UN, B);
addCard("OGN-089", CCRU, "Mind Rune", 0, 0, RU, B);
addCard("OGN-090", CORE, "Orb of Regret", 1, 0, GE, B);
addCard("OGN-091", E2ND, "Pit Crew", 3, 0, UN, B);
addCard("OGN-092", CORE, "Riptide Rex", 6, 2, UN, B);
addCard("OGN-093", INTR, "Smoke Screen", 2, 1, SP, B);
addCard("OGN-094", CORE, "Sprite Call", 3, 0, SP, B);
addCard("OGN-095", INTR, "Stupefy", 1, 0, SP, B);
addCard("OGN-096", EARL, "Watchful Sentry", 2, 0, UN, B);
addCard("OGN-097", EARL, "Blastcone Fae", 2, 1, UN, B);
addCard("OGN-098", E2ND, "Energy Conduit", 3, 0, GE, B);
addCard("OGN-099", EARL, "Garbage Grabber", 2, 0, GE, B);
addCard("OGN-100", E2ND, "Gemcraft Seer", 3, 1, UN, B);
addCard("OGN-101", CORE, "Mushroom Pouch", 2, 0, GE, B);
addCard("OGN-102", INTR, "Portal Rescue", 3, 1, SP, B);
addCard("OGN-103", EARL, "Ravenbloom Student", 2, 0, UN, B);
addCard("OGN-104", INTR, "Retreat", 1, 0, SP, B);
addCard("OGN-105", BINT, "Singularity", 6, 2, SP, B);
addCard("OGN-106", CORE, "Sprite Mother", 4, 1, UN, B);
addCard("OGN-107", CORE, "Ava Achiever", 5, 0, UN, B);
addCard("OGN-108", INTR, "Convergent Mutation", 2, 1, SP, B);
addCard("OGN-109", LATE, "Dr. Mundo, Expert", 8, 2, CU, B);
addCard("OGN-110", CORE, "Ekko, Recurrent", 5, 1, CU, B);
addCard("OGN-111", CORE, "Heimerdinger, Inventor", 3, 1, CU, B);
addCard("OGN-112", CORE, "Kai'Sa, Evolutionary", 6, 1, CU, B);
addCard("OGN-113", CORE, "Malzahar, Fanatic", 4, 0, CU, B);
addCard("OGN-114", CORE, "Progress Day", 6, 1, SP, B);
addCard("OGN-115", CORE, "Promising Future", 5, 1, SP, B);
addCard("OGN-116", LATE, "Thousand-Tailed Watcher", 7, 1, UN, B);
addCard("OGN-117", CORE, "Viktor, Innovator", 4, 1, CU, B);
addCard("OGN-118", CORE, "Wraith of Echoes", 6, 1, UN, B);
addCard("OGN-119", CORE, "Ahri, Inquisitive", 3, 1, CU, B);
addCard("OGN-120", SIDE, "Seal of Insight", 0, 1, GE, B);
addCard("OGN-121", CORE, "Teemo, Strategist", 2, 1, CU, B);
addCard("OGN-122", LATE, "Time Warp", 10, 4, SP, B);
addCard("OGN-123", BINT, "Unchecked Power", 7, 2, SP, B);
addCard("OGN-124", CORE, "Arena Bar", 3, 0, GE, O);
addCard("OGN-125", CORE, "Bilgewater Bully", 6, 0, UN, O);
addCard("OGN-126", CCRU, "Body Rune", 0, 0, RU, O);
addCard("OGN-127", INTR, "Cannon Barrage", 2, 1, SP, O);
addCard("OGN-128", INTR, "Challenge", 2, 1, SP, O);
addCard("OGN-129", EARL, "Confront", 2, 0, SP, O);
addCard("OGN-130", E2ND, "Crackshot Corsair", 3, 0, UN, O);
addCard("OGN-131", CORE, "Dune Drake", 5, 0, UN, O);
addCard("OGN-132", CORE, "First Mate", 3, 0, UN, O);
addCard("OGN-133", INTR, "Flurry of Blades", 1, 0, SP, O);
addCard("OGN-134", EARL, "Mobilize", 2, 0, SP, O);
addCard("OGN-135", E2ND, "Pakaa Cub", 3, 0, UN, O);
addCard("OGN-136", EARL, "Pit Rookie", 2, 0, UN, O);
addCard("OGN-137", CORE, "Stormclaw Ursine", 7, 0, UN, O);
addCard("OGN-138", CORE, "Catalyst of Aeons", 4, 0, SP, O);
addCard("OGN-139", EARL, "Cithria of Cloudfield", 2, 0, UN, O);
addCard("OGN-140", CORE, "Herald of Scales", 4, 0, UN, O);
addCard("OGN-141", CORE, "Kinkou Monk", 4, 1, UN, O);
addCard("OGN-142", CORE, "Mountain Drake", 9, 0, UN, O);
addCard("OGN-143", CORE, "Pirate's Haven", 3, 0, GE, O);
addCard("OGN-144", CORE, "Spoils of War", 4, 1, SP, O);
addCard("OGN-145", SIDE, "Unyielding Spirit", 1, 1, SP, O);
addCard("OGN-146", CORE, "Wallop", 2, 0, SP, O);
addCard("OGN-147", CORE, "Wildclaw Shaman", 4, 0, UN, O);
addCard("OGN-148", LATE, "Anivia, Primal", 7, 2, CU, O);
addCard("OGN-149", CORE, "Carnivorous Snapvine", 5, 2, UN, O);
addCard("OGN-150", CORE, "Kraken Hunter", 3, 2, UN, O);
addCard("OGN-151", CORE, "Lee Sin, Centered", 6, 0, CU, O);
addCard("OGN-152", CORE, "Mistfall", 3, 0, GE, O);
addCard("OGN-153", CORE, "Overt Operation", 5, 2, SP, O);
addCard("OGN-154", BINT, "Primal Strength", 4, 1, SP, O);
addCard("OGN-155", CORE, "Qiyana, Victorious", 4, 1, CU, O);
addCard("OGN-156", INTR, "Sabotage", 1, 1, SP, O);
addCard("OGN-157", CORE, "Udyr, Wildman", 6, 1, CU, O);
addCard("OGN-158", LATE, "Volibear, Imposing", 12, 2, CU, O);
addCard("OGN-159", CORE, "Warwick, Hunter", 6, 1, CU, O);
addCard("OGN-160", LATE, "Dazzling Aurora", 9, 2, GE, O);
addCard("OGN-161", LATE, "Deadbloom Predator", 8, 2, UN, O);
addCard("OGN-162", CORE, "Miss Fortune, Captain", 5, 1, CU, O);
addCard("OGN-163", SIDE, "Seal of Strength", 0, 1, GE, O);
addCard("OGN-164", CORE, "Sett, Brawler", 5, 1, CU, O);
addCard("OGN-165", CORE, "Cemetery Attendant", 3, 1, UN, P);
addCard("OGN-166", CCRU, "Chaos Rune", 0, 0, RU, P);
addCard("OGN-167", CORE, "Ember Monk", 4, 0, UN, P);
addCard("OGN-168", INTR, "Fight or Flight", 2, 0, SP, P);
addCard("OGN-169", INTR, "Gust", 1, 0, SP, P);
addCard("OGN-170", CORE, "Morbid Return", 2, 0, SP, P);
addCard("OGN-171", EARL, "Mystic Poro", 2, 0, UN, P);
addCard("OGN-172", INTR, "Rebuke", 2, 2, SP, P);
addCard("OGN-173", INTR, "Ride the Wind", 2, 1, SP, P);
addCard("OGN-174", CORE, "Sai Scout", 6, 0, UN, P);
addCard("OGN-175", E2ND, "Shipyard Skulker", 3, 0, UN, P);
addCard("OGN-176", E2ND, "Sneaky Deckhand", 3, 0, UN, P);
addCard("OGN-177", CORE, "Stealthy Pursuer", 4, 1, UN, P);
addCard("OGN-178", CORE, "Undercover Agent", 5, 1, UN, P);
addCard("OGN-179", SIDE, "Acceptable Losses", 1, 0, SP, P);
addCard("OGN-180", INTR, "Fading Memories", 4, 1, SP, P);
addCard("OGN-181", EARL, "Pack of Wonders", 2, 0, GE, P);
addCard("OGN-182", EARL, "Scrapheap", 2, 0, GE, P);
addCard("OGN-183", CORE, "Stacked Deck", 1, 0, GE, P);
addCard("OGN-184", CORE, "The Syren", 2, 0, GE, P);
addCard("OGN-185", EARL, "Traveling Merchant", 2, 0, UN, P);
addCard("OGN-186", EARL, "Treasure Trove", 2, 0, GE, P);
addCard("OGN-187", INTR, "Whirlwind", 4, 1, SP, P);
addCard("OGN-188", CORE, "Zaunite Bouncer", 4, 2, UN, P);
addCard("OGN-189", CORE, "Kayn, Unleashed", 6, 1, CU, P);
addCard("OGN-190", CORE, "Kog'Maw, Caustic", 3, 1, CU, P);
addCard("OGN-191", CORE, "Maddened Marauder", 5, 0, UN, P);
addCard("OGN-192", LATE, "Mindsplitter", 7, 2, UN, P);
addCard("OGN-193", CORE, "Miss Fortune, Buccaneer", 4, 1, CU, P);
addCard("OGN-194", CORE, "Nocturne, Horrifying", 4, 1, CU, P);
addCard("OGN-195", CORE, "Rhasa the Sunderer", 10, 1, UN, P);
addCard("OGN-196", LATE, "Soul Gorger", 8, 2, UN, P);
addCard("OGN-197", CORE, "Teemo, Scout", 2, 0, CU, P);
addCard("OGN-198", CORE, "The Harrowing", 6, 2, SP, P);
addCard("OGN-199", INTR, "Tideturner", 2, 0, UN, P);
addCard("OGN-200", CORE, "Twisted Fate, Gambler", 4, 0, CU, P);
addCard("OGN-201", CORE, "Invert Timelines", 3, 1, SP, P);
addCard("OGN-202", CORE, "Jinx, Rebel", 5, 1, CU, P);
addCard("OGN-203", LATE, "Possession", 8, 3, SP, P);
addCard("OGN-204", SIDE, "Seal of Discord", 0, 1, GE, P);
addCard("OGN-205", CORE, "Yasuo, Windrider", 5, 1, CU, P);
addCard("OGN-206", INTR, "Back to Back", 3, 0, SP, Y);
addCard("OGN-207", INTR, "Call to Glory", 3, 0, SP, Y);
addCard("OGN-208", CORE, "Cruel Patron", 4, 0, UN, Y);
addCard("OGN-209", INTR, "Cull the Weak", 2, 1, SP, Y);
addCard("OGN-210", EARL, "Daring Poro", 2, 0, UN, Y);
addCard("OGN-211", E2ND, "Faithful Manufactor", 3, 0, UN, Y);
addCard("OGN-212", SIDE, "Forge of the Future", 2, 0, GE, Y);
addCard("OGN-213", INTR, "Hidden Blade", 2, 1, SP, Y);
addCard("OGN-214", CCRU, "Order Rune", 0, 0, RU, Y);
addCard("OGN-215", CORE, "Petty Officer", 5, 0, UN, Y);
addCard("OGN-216", EARL, "Soaring Scout", 2, 0, UN, Y);
addCard("OGN-217", EARL, "Trifarian Gloryseeker", 2, 0, UN, Y);
addCard("OGN-218", CORE, "Vanguard Captain", 3, 1, UN, Y);
addCard("OGN-219", CORE, "Vanguard Sergeant", 4, 0, UN, Y);
addCard("OGN-220", INTR, "Facebreaker", 2, 0, SP, Y);
addCard("OGN-221", BINT, "Imperial Decree", 5, 2, SP, Y);
addCard("OGN-222", E2ND, "Noxian Drummer", 3, 0, UN, Y);
addCard("OGN-223", CORE, "Peak Guardian", 6, 1, UN, Y);
addCard("OGN-224", SIDE, "Salvage", 2, 1, SP, Y);
addCard("OGN-225", CORE, "Solari Chief", 5, 1, UN, Y);
addCard("OGN-226", CORE, "Spectral Matron", 4, 2, UN, Y);
addCard("OGN-227", EARL, "Symbol of the Solari", 1, 0, GE, Y);
addCard("OGN-228", EARL, "Vanguard Helm", 2, 0, GE, Y);
addCard("OGN-229", INTR, "Vengeance", 4, 2, SP, Y);
addCard("OGN-230", CORE, "Albus Ferros", 4, 0, UN, Y);
addCard("OGN-231", CORE, "Commander Ledros", 6, 4, UN, Y);
addCard("OGN-232", CORE, "Fiora, Victorious", 4, 0, CU, Y);
addCard("OGN-233", LATE, "Grand Strategem", 6, 3, SP, Y);
addCard("OGN-234", LATE, "Harnessed Dragon", 8, 2, UN, Y);
addCard("OGN-235", CORE, "Karma, Channeler", 6, 1, CU, Y);
addCard("OGN-236", CORE, "Karthus, Eternal", 3, 1, CU, Y);
addCard("OGN-237", BINT, "King's Edict", 6, 2, SP, Y);
addCard("OGN-238", CORE, "Leona, Determined", 4, 1, CU, Y);
addCard("OGN-239", CORE, "Machine Evangel", 5, 1, UN, Y);
addCard("OGN-240", CORE, "Sett, Kingpin", 4, 1, CU, Y);
addCard("OGN-241", INTR, "Shen, Kinkou", 3, 1, CU, Y);
addCard("OGN-242", CORE, "Baited Hook", 3, 0, GE, Y);
addCard("OGN-243", CORE, "Darius, Executioner", 6, 1, CU, Y);
addCard("OGN-244", BINT, "Divine Judgement", 7, 2, SP, Y);
addCard("OGN-245", SIDE, "Seal of Unity", 0, 1, GE, Y);
addCard("OGN-246", CORE, "Viktor, Leader", 4, 1, CU, Y);
addCard("OGN-247", CCLG, "Kai'Sa, Daughter of the Void", 0, 0, LG);
addCard("OGN-248", BINT, "Icathian Rain", 7, 3, SP);
addCard("OGN-249", CCLG, "Volibear, Relentless Storm", 0, 0, LG);
addCard("OGN-250", BINT, "Stormbringer", 6, 2, SP);
addCard("OGN-251", CCLG, "Jinx, Loose Cannon", 0, 0, LG);
addCard("OGN-252", INTR, "Super Mega Death Rocket!", 4, 1, SP);
addCard("OGN-253", CCLG, "Darius, Hand of Noxus", 0, 0, LG);
addCard("OGN-254", INTR, "Noxian Guillotine", 4, 1, SP);
addCard("OGN-255", CCLG, "Ahri, Nine-Tailed Fox", 0, 0, LG);
addCard("OGN-256", INTR, "Fox-Fire", 3, 0, SP);
addCard("OGN-257", CCLG, "Lee Sin, Blind Monk", 0, 0, LG);
addCard("OGN-258", INTR, "Dragon's Rage", 4, 1, SP);
addCard("OGN-259", CCLG, "Yasuo, Unforgiven", 0, 0, LG);
addCard("OGN-260", INTR, "Last Breath", 3, 2, SP);
addCard("OGN-261", CCLG, "Leona, Radiant Dawn", 0, 0, LG);
addCard("OGN-262", INTR, "Zenith Blade", 3, 2, SP);
addCard("OGN-263", CCLG, "Teemo, Swift Scout", 0, 0, LG);
addCard("OGN-264", INTR, "Guerilla Warfare", 2, 1, SP);
addCard("OGN-265", CCLG, "Viktor, Herald of the Arcane", 0, 0, LG);
addCard("OGN-266", INTR, "Siphon Power", 2, 1, SP);
addCard("OGN-267", CCLG, "Miss Fortune, Bounty Hunter", 0, 0, LG);
addCard("OGN-268", BINT, "Bullet Time", 1, 0, SP);
addCard("OGN-269", CCLG, "Sett, the Boss", 0, 0, LG);
addCard("OGN-270", INTR, "Showstopper", 1, 1, SP);

addCard("OGN-275", CCBF, "Altar to Unity", 0, 0, BF);
addCard("OGN-276", CCBF, "Aspirant's Climb", 0, 0, BF);
addCard("OGN-277", CCBF, "Back-Alley Bar", 0, 0, BF);
addCard("OGN-278", CCBF, "Bandle Tree", 0, 0, BF);
addCard("OGN-279", CCBF, "Fortified Position", 0, 0, BF);
addCard("OGN-280", CCBF, "Grove of the God-Willow", 0, 0, BF);
addCard("OGN-281", CCBF, "Hallowed Tomb", 0, 0, BF);
addCard("OGN-282", CCBF, "Monastery of Hirana", 0, 0, BF);
addCard("OGN-283", CCBF, "Navori Fighting Pit", 0, 0, BF);
addCard("OGN-284", CCBF, "Obelisk of Power", 0, 0, BF);
addCard("OGN-285", CCBF, "Reaver's Row", 0, 0, BF);
addCard("OGN-286", CCBF, "Reckoner's Arena", 0, 0, BF);
addCard("OGN-287", CCBF, "Sigil of the Storm", 0, 0, BF);
addCard("OGN-288", CCBF, "Startipped Peak", 0, 0, BF);
addCard("OGN-289", CCBF, "Targon's Peak", 0, 0, BF);
addCard("OGN-290", CCBF, "The Arena's Greatest", 0, 0, BF);
addCard("OGN-291", CCBF, "The Candlelit Sanctum", 0, 0, BF);
addCard("OGN-292", CCBF, "The Dreaming Tree", 0, 0, BF);
addCard("OGN-293", CCBF, "The Grand Plaza", 0, 0, BF);
addCard("OGN-294", CCBF, "Trifarian War Camp", 0, 0, BF);
addCard("OGN-295", CCBF, "Vilemaw's Lair", 0, 0, BF);
addCard("OGN-296", CCBF, "Void Gate", 0, 0, BF);
addCard("OGN-297", CCBF, "Windswept Hillock", 0, 0, BF);
addCard("OGN-298", CCBF, "Zaun Warrens", 0, 0, BF);

export function GET_CARD(ttsId: string): CardDTO {
    const id = ttsId.substring(0,7);
    if(!(id in cardData)) {
        console.warn(`Card "${id}" not found in cardData.`);
        addCard(id, CCLG, id, 0, 0, TYPE.LEGEND);
    }
    return cardData[id];
}

export const ALL_CARD_IDS: string[] = Object.keys(cardData);

export function GET_CCATEGORY(potentiallyFullID: string): CCATEGORY {
    return (potentiallyFullID.substring(0,7) in cardCategories) ? cardCategories[potentiallyFullID.substring(0,7)] : CCLG;
}

const OVERNUMBER_MAP: {[key: string]: string} = {
    "OGN-247": "OGN-299",
    "OGN-249": "OGN-300",
    "OGN-251": "OGN-301",
    "OGN-253": "OGN-302",
    "OGN-255": "OGN-303",
    "OGN-257": "OGN-304",
    "OGN-259": "OGN-305",
    "OGN-261": "OGN-306",
    "OGN-263": "OGN-307",
    "OGN-265": "OGN-308",
    "OGN-267": "OGN-309",
    "OGN-269": "OGN-310",
}

export function TO_PRINT_ID(ttsId: string): string {
    const set = ttsId.substring(0,3);
    const lastChar = (ttsId.length > 7) ? ttsId[ttsId.length-1] : "1";
    const altArt: boolean = (lastChar !== "1");
    const hasOvernumber: boolean = (ttsId.substring(0,7) in OVERNUMBER_MAP);
    const idIfOvernumber = (hasOvernumber) ? OVERNUMBER_MAP[ttsId.substring(0,7)] : ttsId;
    if(set === "OGN" && altArt) {
        return (hasOvernumber) ? `${idIfOvernumber}${(lastChar === "3") ? "*" : ""}` : `${ttsId.substring(0,7)}a`;
    }
    return ttsId.substring(0,7);
}

export function GET_CARD_ART(printId: string): string {
    return `https://static.dotgg.gg/riftbound/cards/${printId.replaceAll("*","s")}.webp`;
}
