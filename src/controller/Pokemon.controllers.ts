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
    const pokemon2 = await loadPokemon(4);

    // TODO: Refactor stats calculation into BattleService?

    const statsCalculator = new StatsCalculatorService();

    const pokemonStats1 = statsCalculator.calculateStats(pokemon1);
    const pokemonStats2 = statsCalculator.calculateStats(pokemon2);

    const team1: Team = {
        name: "Team 1",
        pokemons: [
            {
                entity: pokemon1,
                ...pokemonStats1,
            },
        ]
    }

    const team2: Team = {
        name: "Team 2",
        pokemons: [
            {
                entity: pokemon2,
                ...pokemonStats2,
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

    console.log("Listing pokemons:", await pokemons.find().toArray());

    return res.json({
        pokemon: await pokemons.find().toArray(),
    });
}