import { ALL_ARCHETYPES, ARCHETYPE_TIERS } from './Archetype';

test('ARCHETYPE_TIERS has the same amount of Archetypes as ALL_ARCHETYPES excluding "Unknown"', () => {
    expect(ARCHETYPE_TIERS.map((tier) => tier.length).reduce((sum, current) => sum + current)).toEqual(ALL_ARCHETYPES.length-1); // remove "Unknown"
});
