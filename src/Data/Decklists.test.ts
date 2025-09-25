import { ARCHETYPE_TIERS } from './Decklists';
import { ALL_ARCHETYPES } from './Interfaces';

test('ARCHETYPE_TIERS contains ALL_ARCHETYPES', () => {
    expect(ARCHETYPE_TIERS.map((tier) => tier.length).reduce((sum, current) => sum + current)).toEqual(ALL_ARCHETYPES.length-1); // remove "Unknown"
});
