import { Request, Response } from "express";
import { getPokemenCollection } from "../DB";
import PokemonEntity from "../interfaces/PokemonEntity";
import Team from "../interfaces/Team";
import BattleService from "../services/battle.service";


export async function battle(req: Request, res: Response): Promise<Response> {
    const pokemons = await getPokemenCollection();

    const pokemon1 = await pokemons.findOne({ id: 1 }) as unknown as PokemonEntity;

    const pokemon2 = await pokemons.findOne({ id: 4 }) as unknown as PokemonEntity;

    // Todo: implement HP, attack, and defense calculations based on pokemon stats and types.

    const team1: Team = {
        name: "Team 1",
        pokemons: [
            {
                entity: pokemon1,
                hp: 100,
                attack: 10,
                defense: 5,
            },
        ]
    }

    const team2: Team = {
        name: "Team 2",
        pokemons: [
            {
                entity: pokemon2,
                hp: 100,
                attack: 12,
                defense: 4,
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