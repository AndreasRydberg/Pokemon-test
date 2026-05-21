import { Router } from "express";
import { battle, list } from "../controller/pokemon.controllers";
import BattleService from "../services/battle.service";

class PokemonRoutes {

    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/index", list);
        this.router.get("/battle", battle);
    }
}

export default new PokemonRoutes().router;
