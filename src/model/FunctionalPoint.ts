import { Level, LevelRange } from "./Level";

export type FunctionalPoint = {
    name: string,
    displayName: string,
    count: number;
    levelRange: LevelRange;
    level: Level;
}
