import { Request, Response } from "express";
import { getPokemenCollection } from "../DB";
import PokemonEntity from "../interfaces/PokemonEntity";
import Team from "../interfaces/Team";
import BattleService from "../services/battle.service";
import StatsCalculatorService from "../services/stats-calculator.service";

async function loadPokemon(id: number): Promise<PokemonEntity> {
    const pokemons = await getPokemenCollection();
    const pokemon = await pokemons.findOne({ id }) as unknown as PokemonEntity | null;
    if (!pokemon) {
        throw new Error(`Pokemon not found: id ${id}`);
    }
    return pokemon;
}


export async function battle(req: Request, res: Response): Promise<Response> {
    const pokemons = await getPokemenCollection();

    const pokemon1 = await loadPokemon(1);
    const pokemon2 = await loadPokemon(23);
    const pokemon3 = await loadPokemon(4);
    const pokemon4 = await loadPokemon(15);

    const statsCalculator = new StatsCalculatorService();

    const team1: Team = {
        name: "Team 1",
        pokemons: [
            {
                entity: pokemon1,
                ...statsCalculator.calculateStats(pokemon1),
            },
            {
                entity: pokemon2,
                ...statsCalculator.calculateStats(pokemon2),
            },
        ]
    }

    const team2: Team = {
        name: "Team 2",
        pokemons: [
            {
                entity: pokemon3,
                ...statsCalculator.calculateStats(pokemon3),
            },
            {
                entity: pokemon4,
                ...statsCalculator.calculateStats(pokemon4),
            },
        ]
    }


    const battleService = new BattleService();
    const winner = await battleService.battle(team1, team2);

    return res.json({
        winner: winner.name,
    });
}

export async function list(req: Request, res: Response): Promise<Response> {
    const pokemons = await getPokemenCollection();

    return res.json({
        pokemon: await pokemons.find().toArray(),
    });
}