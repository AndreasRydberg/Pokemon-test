import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/pokemon';

async function mongoConnect(): Promise<mongoose.mongo.Db> {
    await mongoose.connect(MONGO_URI);

    return mongoose.connection.db!;
}

export async function getPokemenCollection(): Promise<mongoose.mongo.Collection> {
    const db = await mongoConnect();

    return db.collection('pokemon');
}
