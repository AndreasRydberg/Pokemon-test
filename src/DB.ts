import mongoose from "mongoose";
import PokemonEntity from "./interfaces/PokemonEntity";

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/pokemon';

async function mongoConnect(): Promise<mongoose.mongo.Db> {
    await mongoose.connect(MONGO_URI);

    return mongoose.connection.db!;
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