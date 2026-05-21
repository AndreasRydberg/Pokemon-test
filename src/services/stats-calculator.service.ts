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
        const attackMultiplier = multipliers[0];
        const defenseMultiplier = multipliers[1] || 1;

        const hp = Math.round(size * 10);
        const attack = Math.round(size * attackMultiplier);
        const defense = Math.round(size * defenseMultiplier);

        console.log(`Calculated stats for ${pokemon.name}: HP=${hp}, Attack=${attack}, Defense=${defense}`);

        return {
            hp,
            attack,
            defense,
            speed: pokemon.spawn_chance,
         };
    }
}
