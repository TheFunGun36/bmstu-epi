export type ExpensesDriverLevels = {
  veryLow?: number,
  low?: number,
  nominal: number,
  high?: number,
  veryHigh?: number,
}

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
}

export function driverLevel(driver: ExpensesDriver) {
  switch (driver.level) {
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
