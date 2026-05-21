import Team from "../interfaces/Team";
import TeamPokemon from "../interfaces/TeamPokemon";

export default class BattleService {
    public async battle(team1: Team, team2: Team): Promise<{ winner: Team; battleLog: string[] }> {
        const battleLog = [];

        // Add an iteration counter to prevent infinite loops
        let iteration = 0;
        const maxIterations = 1000;

        while (team1.pokemons.length > 0 && team2.pokemons.length > 0) {
            ++iteration;

            const pokemon1 = team1.pokemons[0];
            const pokemon2 = team2.pokemons[0];

            let [ firstAttacker, secondAttacker ] = pokemon1.speed >= pokemon2.speed
                ? [ pokemon1, pokemon2 ]
                : [ pokemon2, pokemon1 ];
            battleLog.push(`${firstAttacker.entity.name} (speed: ${firstAttacker.speed}) attacks first against ${secondAttacker.entity.name} (speed: ${secondAttacker.speed})`);

            this.attack(firstAttacker, secondAttacker, battleLog);

            // Check if pokemon2 is defeated
            if (secondAttacker.hp <= 0) {
                team2.pokemons.shift();
                battleLog.push(`${firstAttacker.entity.name} defeated ${secondAttacker.entity.name}`);

                // Check if team2 has no more pokemons left before allowing pokemon2 to attack back.
                if (team2.pokemons.length === 0) {
                    break;
                }

                if (iteration >= maxIterations) {
                    battleLog.push("Battle ended due to reaching maximum iterations. Possible infinite loop detected.");
                    break;
                }

                // Update pokemon2 reference to the next pokemon in team2 after the previous one was defeated.
                secondAttacker = team2.pokemons[0];
            }

            this.attack(secondAttacker, firstAttacker, battleLog);

            // Check if firstAttacker is defeated
            if (firstAttacker.hp <= 0) {
                team1.pokemons.shift();
                battleLog.push(`${secondAttacker.entity.name} defeated ${firstAttacker.entity.name}`);
            }

            if (iteration >= maxIterations) {
                battleLog.push("Battle ended due to reaching maximum iterations. Possible infinite loop detected.");
                break;
            }
        }

        const winner = team1.pokemons.length > 0 ? team1 : team2;
        battleLog.push(`${winner.name} wins the battle!`);

        return { winner, battleLog };
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
