import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/pokemon';

async function seed(): Promise<void> {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;
  const collection = db.collection('pokemon');

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
  .finally(() => mongoose.disconnect());
