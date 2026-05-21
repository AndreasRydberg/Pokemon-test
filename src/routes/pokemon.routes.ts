import { Router } from "express";
import { welcome, list } from "../controller/Pokemon.controllers";

class PokemonRoutes {

    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/", welcome);
        this.router.get("/index", list);
    }
}

export default new PokemonRoutes().router;
