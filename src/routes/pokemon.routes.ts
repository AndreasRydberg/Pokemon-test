import { Router } from "express";
import { welcome } from "../controller/Pokemon.controllers";

class PokemonRoutes {

    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/", welcome);
    }
}

export default new PokemonRoutes().router;
