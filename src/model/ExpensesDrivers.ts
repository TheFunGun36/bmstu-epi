import { Level, LevelRange, levelItem, levelValue } from "./Level";

export type ExpensesDriver = {
  name: string,
  displayName: string,
  levels: LevelRange,
  level: Level,
};

export function driverIterator(driver: ExpensesDriver): Level | undefined {
  return (driver.levels.veryLow && Level.VERY_LOW)
    || (driver.levels.low && Level.LOW)
    || Level.NOMINAL;
}

export function driverIteratorNext(driver: ExpensesDriver, iterator: Level): Level | undefined {
  switch (iterator) {
    case Level.VERY_LOW:
      return Level.LOW;
    case Level.LOW:
      return Level.NOMINAL;
    case Level.NOMINAL:
      return driver.levels.high ? Level.HIGH : undefined;
    case Level.HIGH:
      return driver.levels.veryHigh ? Level.VERY_HIGH : undefined;
    case Level.VERY_HIGH:
      return driver.levels.ultraHigh ? Level.ULTRA_HIGH : undefined;
  }
}

export function driverLevel(driver: ExpensesDriver) {
  return levelItem(driver.levels, driver.level);
}

export function driverLevelValue(driver: ExpensesDriver) {
  return levelValue(driver.levels, driver.level);
}
