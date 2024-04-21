export type LevelRangeItem = {
  value: number,
  label?: string,
}

export type LevelRange = {
  veryLow?: LevelRangeItem,
  low?: LevelRangeItem,
  nominal: LevelRangeItem,
  high?: LevelRangeItem,
  veryHigh?: LevelRangeItem,
  ultraHigh?: LevelRangeItem,
};

export function levelRangeCopy(levelRange: LevelRange): LevelRange {
  return {
    veryLow: levelRange.veryLow ? {...levelRange.veryLow} : undefined,
    low: levelRange.low ? {...levelRange.low} : undefined,
    nominal: levelRange.nominal,
    high: levelRange.high ? {...levelRange.high} : undefined,
    veryHigh: levelRange.veryHigh ? {...levelRange.veryHigh} : undefined,
    ultraHigh: levelRange.ultraHigh ? {...levelRange.ultraHigh} : undefined,
  }
}

export enum Level {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  NOMINAL = 'NOMINAL',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  ULTRA_HIGH = 'ULTRA_HIGH',
}

export function levelMin(levels: LevelRange) {
  return levels.veryLow || levels.low || levels.nominal;
}

export function levelMax(levels: LevelRange) {
  return levels.ultraHigh || levels.veryHigh || levels.high || levels.nominal;
}

export function levelItem(levels: LevelRange, level: Level) {
  switch (level) {
    case Level.VERY_LOW:
      return levels.veryLow as LevelRangeItem;
    case Level.LOW:
      return levels.low as LevelRangeItem;
    case Level.NOMINAL:
      return levels.nominal;
    case Level.HIGH:
      return levels.high as LevelRangeItem;
    case Level.VERY_HIGH:
      return levels.veryHigh as LevelRangeItem;
    case Level.ULTRA_HIGH:
      return levels.ultraHigh as LevelRangeItem;
  }
}

export function levelValue(levels: LevelRange, level: Level) {
  return levelItem(levels, level).value;
}
