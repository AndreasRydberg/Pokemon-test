import { Router } from "express";
import { battle, list } from "../controller/pokemon.controllers";

class PokemonRoutes {

    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/index", list);

        // Using GET for battle for simplicity, but in a real application this should
        // probably be a POST with a request body containing the team data.
        this.router.get("/battle", battle);
    }
}

export default new PokemonRoutes().router;
