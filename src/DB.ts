import mongoose from "mongoose";
import PokemonEntity from "./interfaces/PokemonEntity";

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/pokemon';

let connectionPromise: Promise<mongoose.mongo.Db> | null = null;

async function mongoConnect(): Promise<mongoose.mongo.Db> {
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(MONGO_URI).then(() => mongoose.connection.db!);
    }
    return connectionPromise;
}

export async function getPokemenCollection(): Promise<mongoose.mongo.Collection> {
    const db = await mongoConnect();

    return db.collection('pokemon');
}

export async function loadPokemon(id: number): Promise<PokemonEntity> {
    const pokemons = await getPokemenCollection();
    const pokemon = await pokemons.findOne({ id }) as unknown as PokemonEntity | null;
    if (!pokemon) {
        throw new Error(`Pokemon not found: id ${id}`);
    }
    return pokemon;
}