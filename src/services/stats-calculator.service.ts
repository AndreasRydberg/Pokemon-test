import PokemonEntity from "../interfaces/PokemonEntity";
import Team from "../interfaces/Team";

export default class StatsCalculatorService {
    public calculateStats(pokemon: PokemonEntity): {
        hp: number;
        attack: number;
        defense: number;
        speed: number;
     } {
        const weight = parseFloat(pokemon.weight);
        const height = parseFloat(pokemon.height);

        const size = weight * height;

        const multipliers = pokemon.multipliers || [1]; // Default to 1 if no multipliers are defined

        // The multipliers array contains the combat multipliers for the Pokemon, which can be used to
        // calculate its attack and defense stats.
        // @link https://github.com/Biuni/PokemonGO-Pokedex/blob/master/README.md#elements
        const combatMultiplier = multipliers[0];

        const hp = Math.round(size * 10);
        const attack = Math.round(size * combatMultiplier);
        const defense = Math.round(size * (combatMultiplier / 2));

        const speed = Math.round(size * height * 100) / 100; // Round to 2 decimal places
        console.log(`Calculated stats for ${pokemon.name}: HP=${hp}, Attack=${attack}, Defense=${defense}, Speed=${speed}`);

        return {
            hp,
            attack,
            defense,
            speed,
        };
    }
}
