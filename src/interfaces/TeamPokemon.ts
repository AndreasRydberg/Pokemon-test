import PokemonEntity from "./PokemonEntity";

export default interface TeamPokemon {
    speed: number;
    entity: PokemonEntity;
    hp: number;
    attack: number;
    defense: number;
}
