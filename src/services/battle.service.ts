import Team from "../interfaces/Team";

export default class BattleService {
    constructor() {
        // Initialize any necessary properties or dependencies here
    }

    public async battle(team1: Team, team2: Team): Promise<Team> {
        const battleLog = [];

        while (team1.pokemons.length > 0 && team2.pokemons.length > 0) {
            const pokemon1 = team1.pokemons[0];
            const pokemon2 = team2.pokemons[0];

            // Calculate damage from pokemon1 to pokemon2
            const damageToPokemon2 = Math.max(0, pokemon1.attack - pokemon2.defense);
            pokemon2.hp -= damageToPokemon2;
            battleLog.push(`${pokemon1.entity.name} attacks ${pokemon2.entity.name} for ${damageToPokemon2} damage`);

            // Check if pokemon2 is defeated
            if (pokemon2.hp <= 0) {
                team2.pokemons.shift();
                battleLog.push(`${pokemon1.entity.name} defeated ${pokemon2.entity.name}`);
                continue;
            }

            // Calculate damage from pokemon2 to pokemon1
            const damageToPokemon1 = Math.max(0, pokemon2.attack - pokemon1.defense);
            pokemon1.hp -= damageToPokemon1;
            battleLog.push(`${pokemon2.entity.name} attacks ${pokemon1.entity.name} for ${damageToPokemon1} damage`);

            // Check if pokemon1 is defeated
            if (pokemon1.hp <= 0) {
                team1.pokemons.shift();
                battleLog.push(`${pokemon2.entity.name} defeated ${pokemon1.entity.name}`);
            }
        }

        const winner = team1.pokemons.length > 0 ? team1 : team2;
        battleLog.push(`${winner.name} wins the battle!`);

        // TODO: write battleLog to a file or database for later analysis.
        console.log(battleLog.join("\n"));

        return winner;
    }
}

