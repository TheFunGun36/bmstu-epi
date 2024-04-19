export type ExpensesDriverLevels = {
  veryLow?: number,
  low?: number,
  nominal: number,
  high?: number,
  veryHigh?: number,
};

export enum SelectedLevel {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  NOMINAL = 'NOMINAL',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export type ExpensesDriver = {
  name: string,
  displayName: string,
  levels: ExpensesDriverLevels,
  level: SelectedLevel,
};

export function driverIterator(driver: ExpensesDriver): SelectedLevel | undefined {
  return (driver.levels.veryLow && SelectedLevel.VERY_LOW)
    || (driver.levels.low && SelectedLevel.LOW)
    || SelectedLevel.NOMINAL;
}

export function driverIteratorNext(driver: ExpensesDriver, iterator: SelectedLevel): SelectedLevel | undefined {
  switch (iterator) {
    case SelectedLevel.VERY_LOW:
      return SelectedLevel.LOW;
    case SelectedLevel.LOW:
      return SelectedLevel.NOMINAL;
    case SelectedLevel.NOMINAL:
      return driver.levels.high ? SelectedLevel.HIGH : undefined;
    case SelectedLevel.HIGH:
      return driver.levels.veryHigh ? SelectedLevel.VERY_HIGH : undefined;
  }
}

export function driverMin(driver: ExpensesDriver) {
  return driver.levels.veryLow || driver.levels.low || driver.levels.nominal;
}

export function driverMax(driver: ExpensesDriver) {
  return driver.levels.veryHigh || driver.levels.high || driver.levels.nominal;
}

export function driverLevel(driver: ExpensesDriver, level?: SelectedLevel) {
  switch (driver.level || level) {
    case SelectedLevel.VERY_LOW:
      return driver.levels.veryLow as number;
    case SelectedLevel.LOW:
      return driver.levels.low as number;
    case SelectedLevel.NOMINAL:
      return driver.levels.nominal;
    case SelectedLevel.HIGH:
      return driver.levels.high as number;
    case SelectedLevel.VERY_HIGH:
      return driver.levels.veryHigh as number;
  }
}
