import { GET_CARD } from './Cards';
import { TOURNAMENT_RESULTS } from './TournamentResults';

test("Each deck's legend matches chosen champion", () => {
    for(let tr of TOURNAMENT_RESULTS) {
        for(let placing of tr.results) {
            for(let dl of placing.decklists) {
                if(dl.chosenChampion !== "" && dl.legend !== "") {
                    const lg = GET_CARD(dl.legend), cc = GET_CARD(dl.chosenChampion);
                    // console.dir(`${dl.tournId} | ${dl.username} | ${dl.placing} | ${lg.name} | ${cc.name}`);
                    expect(lg.championTag).toEqual(cc.championTag);
                }
            }
        }
    }
});

test("Each deck's chosen champion is the first entry in the main deck", () => {
    for(let tr of TOURNAMENT_RESULTS) {
        for(let placing of tr.results) {
            for(let dl of placing.decklists) {
                if(dl.chosenChampion !== "") {
                    expect(dl.mainDeck.length).toBeGreaterThan(0);
                    expect(dl.mainDeck[0].id).toBe(dl.chosenChampion);
                }
            }
        }
    }
});
