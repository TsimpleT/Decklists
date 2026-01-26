import { ALL_ARCHETYPES, GET_ARCHETYPE_TIERS } from './Archetype';
import { ALL_METAS } from './TournamentResults';

test('each metas ARCHETYPE_TIERS has the same amount of Archetypes as ALL_ARCHETYPES excluding "Unknown"', () => {
    expect(GET_ARCHETYPE_TIERS(ALL_METAS[ALL_METAS.length-1]).map((tier) => tier.length).reduce((sum, current) => sum + current)).toEqual(ALL_ARCHETYPES.length-1); // remove "Unknown"
});
