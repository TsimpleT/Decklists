import { ALL_ARCHETYPES, Archetype, GET_ARCHETYPE_TIERS } from './Archetype';
import { ALL_METAS, GET_ARCHETYPE_DECKLISTS } from './TournamentResults';

test('each archetype not in the tierlist has zero decks', () => {
    for(let meta of ALL_METAS) {
        const tierlistArchetypes: Archetype[] = GET_ARCHETYPE_TIERS(meta).flat();
        for(let archetype of ALL_ARCHETYPES) {
            if(archetype !== "Unknown" && !tierlistArchetypes.includes(archetype)) {
                const dls = GET_ARCHETYPE_DECKLISTS(archetype, meta);
                console.dir(`${meta} ${archetype} ${dls.length}`);
                expect(dls.length).toEqual(0);
            }
        }
    }
});
