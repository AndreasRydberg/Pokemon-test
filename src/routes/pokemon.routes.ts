import { Router, Request, Response, NextFunction } from "express";
import { battle, list } from "../controller/pokemon.controllers";

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

class PokemonRoutes {

    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/index", asyncHandler(list));

        // Using GET for battle for simplicity, but in a real application this should
        // probably be a POST with a request body containing the team data.
        this.router.get("/battle", asyncHandler(battle));
    }
}

export default new PokemonRoutes().router;
