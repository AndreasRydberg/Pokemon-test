import Team from "../interfaces/Team";
import TeamPokemon from "../interfaces/TeamPokemon";

export default class BattleService {
    constructor() {
        // Initialize any necessary properties or dependencies here
    }

    public async battle(team1: Team, team2: Team): Promise<Team> {
        const battleLog = [];

        // Possible improvement: Add a counter to limit the number of rounds and prevent infinite battles in edge cases.
        while (team1.pokemons.length > 0 && team2.pokemons.length > 0) {
            const pokemon1 = team1.pokemons[0];
            const pokemon2 = team2.pokemons[0];

            this.attack(pokemon1, pokemon2, battleLog);


            // Check if pokemon2 is defeated
            if (pokemon2.hp <= 0) {
                team2.pokemons.shift();
                battleLog.push(`${pokemon1.entity.name} defeated ${pokemon2.entity.name}`);
                continue;
            }

            this.attack(pokemon2, pokemon1, battleLog);

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

    private attack(attacker: TeamPokemon, defender: TeamPokemon, battleLog: string[]): number {
        let attackPower = attacker.attack;

        if (this.hasDefenderWeakness(attacker, defender)) {
            attackPower = Math.round(attackPower * 1.5); // Apply a 50% bonus for type advantage
            battleLog.push(`${attacker.entity.name} has a type advantage against ${defender.entity.name}! Attack power increased to ${attackPower}`);
        }

        const damage = Math.max(0, attackPower - defender.defense);
        defender.hp -= damage;

        battleLog.push(`${attacker.entity.name} attacks ${defender.entity.name} for ${damage} damage`);

        return damage;
    }

    private hasDefenderWeakness(attacker: TeamPokemon, defender: TeamPokemon): boolean {
        for (const type of attacker.entity.type) {
            if (defender.entity.weaknesses.includes(type)) {
                return true;
            }
        }

        return false;
    }

}
