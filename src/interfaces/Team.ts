import PokemonEntity from "./PokemonEntity";

export default interface Team {
    name: string
    pokemons: {
        entity: PokemonEntity;
        hp: number;
        attack: number;
        defense: number;
    }[];
}
