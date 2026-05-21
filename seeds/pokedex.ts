import fs from 'fs';
import path from 'path';
import { closeConnection, getPokemonCollection } from '../src/DB';

async function seed(): Promise<void> {
    const collection = await getPokemonCollection();

    // Truncate the collection before seeding, to avoid duplicates.
    await collection.deleteMany({});
    console.log('Deleted existing pokemon.');

    // Import pokemon data.
    const raw = fs.readFileSync(path.join(__dirname, '../fixtures/pokedex.json'), 'utf-8');
    const { pokemon } = JSON.parse(raw);
    await collection.insertMany(pokemon);
    console.log(`Seeded ${pokemon.length} pokemon.`);
}

// Using promises instead of top-level await, since it is still experimental.
seed()
    .catch(console.error)
    .finally(async () => await closeConnection());
