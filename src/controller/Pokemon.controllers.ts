import { Request, Response } from "express";
import { getPokemenCollection, loadPokemon } from "../DB";
import Team from "../interfaces/Team";
import BattleService from "../services/battle.service";
import StatsCalculatorService from "../services/stats-calculator.service";

export async function battle(req: Request, res: Response): Promise<Response> {
    const teamIds1 = parseTeamIds(req.query.team1?.toString() || "");
    if (teamIds1.length === 0) {
        return res.status(400).json({ error: "Invalid team1 parameter. Please provide a comma-separated list of Pokemon IDs." });
    }

    const teamIds2 = parseTeamIds(req.query.team2?.toString() || "");
    if (teamIds2.length === 0) {
        return res.status(400).json({ error: "Invalid team2 parameter. Please provide a comma-separated list of Pokemon IDs." });
    }

    const teamPokemons1 = await Promise.all(teamIds1.map((pokemonId: number) => loadPokemon(pokemonId)));
    const teamPokemons2 = await Promise.all(teamIds2.map((pokemonId: number) => loadPokemon(pokemonId)));

    const statsCalculator = new StatsCalculatorService();

    const team1: Team = {
        name: "Team 1",
        pokemons: teamPokemons1.map((pokemon) => ({
            entity: pokemon,
            ...statsCalculator.calculateStats(pokemon),
        })),
    }

    const team2: Team = {
        name: "Team 2",
        pokemons: teamPokemons2.map((pokemon) => ({
            entity: pokemon,
            ...statsCalculator.calculateStats(pokemon),
        })),
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

function parseTeamIds(teamIds: string): number[] {
    return teamIds.split(",")
        .map(id => parseInt(id.trim(), 10))
        .filter(id => !isNaN(id))
        .filter(id => id > 0);

    }
