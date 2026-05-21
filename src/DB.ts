import { MongoClient, Db, Collection } from "mongodb";
import PokemonEntity from "./interfaces/PokemonEntity";

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/pokemon';

const connectionPromise: Promise<Db> = new MongoClient(MONGO_URI).connect().then(client => client.db());

export async function getPokemonCollection(): Promise<Collection> {
    const db = await connectionPromise;

    return db.collection('pokemon');
}

export async function loadPokemon(id: number): Promise<PokemonEntity> {
    const pokemons = await getPokemonCollection();
    const pokemon = await pokemons.findOne({ id }) as unknown as PokemonEntity | null;
    if (!pokemon) {
        throw new Error(`Pokemon not found: id ${id}`);
    }
    return pokemon;
}

export async function closeConnection(): Promise<void> {
    const client = await connectionPromise;

    await client.client.close();
}