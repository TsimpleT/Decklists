import { PlayerPlacing } from "./Interfaces";
import { TOURNAMENT_RESULTS } from "./Decklists";

let playerResults: {[username: string]: PlayerPlacing[]} = {};

for(let tournamentResult of TOURNAMENT_RESULTS) {
    for(let placing of tournamentResult.placings) {
        for(let decklist of placing.decklists) {
            if(!(decklist.username in playerResults)) {
                playerResults[decklist.username] = [];
            }
            playerResults[decklist.username].push({placing: placing.placing, tournament: tournamentResult.tournamentName, date: tournamentResult.date});
        }
    }
}

export function GET_PLAYER_RESULTS(username: string): PlayerPlacing[] {
    if(!(username in playerResults)) {
        throw Error(`player ${username} doesn't exist.`);
    }
    return playerResults[username];
}

export const ALL_PLAYERS: string[] = Object.keys(playerResults).sort();
