import { Request, Response } from "express";
import { getPokemenCollection } from "../DB";

export function welcome(req: Request, res: Response): Response {
    return res.json({
        message: "Welcome to pokemon battle simulator."
    });
}

export async function list(req: Request, res: Response): Promise<Response> {
    const pokemons = await getPokemenCollection();

    console.log("Listing pokemons:", await pokemons.find().toArray());

    return res.json({
        pokemon: await pokemons.find().toArray(),
    });
}