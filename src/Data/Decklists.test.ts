import { ALL_ARCHETYPES, ARCHETYPE_TIERS } from './Decklists';

test('ARCHETYPE_TIERS contains ALL_ARCHETYPES', () => {
    expect(ARCHETYPE_TIERS.map((tier) => tier.length).reduce((sum, current) => sum + current)).toEqual(ALL_ARCHETYPES.length);
});
