import { TOURNAMENT_RESULTS } from "./TournamentResults";

interface PlayerPlacing {
    placing: string;
    tournament: string;
    date: string;
}

let playerResults: {[username: string]: PlayerPlacing[]} = {};

for(let tournamentResult of TOURNAMENT_RESULTS) {
    for(let placing of tournamentResult.results) {
        for(let decklist of placing.decklists) {
            if(decklist.username[0] === "*") {
                continue;
            }
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
