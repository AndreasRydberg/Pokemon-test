
export default interface PokemonEntity {
    id: number;
    num: string;
    name: string;
    img: string;
    type: string[];
    height: string;
    weight: string;
    candy: string;
    candy_count: number;
    egg: string;
    spawn_chance: number;
    avg_spawns: number;
    spawn_time: string;
    multipliers: number[];
    weaknesses: string[];
    prev_evolution?: {
        num: string;
        name: string;
    }[];
    next_evolution?: {
        num: string;
        name: string;
    }[];
}
