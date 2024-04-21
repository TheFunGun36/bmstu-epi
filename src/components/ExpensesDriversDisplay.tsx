import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { ExpensesDriver, driverLevelValue } from '../model/ExpensesDrivers';
import expensesDrivers from '../json/drivers.json'
import LevelSelector from './LevelSelector';
import { useState } from 'react';
import { SmallTableCell as TC } from './SmallTableCell';
import { Level, LevelRange } from '../model/Level';

export interface ExpensesDriversDisplayProps {
  setEAF: (_eaf: number) => void
}

function ExpensesDriversDisplay(p: ExpensesDriversDisplayProps) {
  const updateEAF = (drivers: ExpensesDriver[]) => {
    p.setEAF(
      drivers
        .map(driver => driverLevelValue(driver))
        .reduce((a, b) => a * b, 1));
  }
  const [drivers, setDrivers] = useState<ExpensesDriver[]>(() => {
    const res = expensesDrivers.map(e => {
      const res: ExpensesDriver = {
        ...e,
        level: Level.NOMINAL
      };
      return res;
    });
    updateEAF(res);
    return res;
  });

  const onLevelChange = (index: number, level: Level) => {
    const newDrivers = drivers.map((value, i) => {
      const levels: LevelRange = {
        ...value.levels
      };
      const res: ExpensesDriver = {
        ...value,
        levels,
      };
      if (index == i)
        res.level = level;
      return res;
    });
    updateEAF(newDrivers);
    setDrivers(newDrivers);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TC pl={1}>Идентификатор</TC>
            <TC>Уточняющий фактор работ</TC>
            <TC pr={1}>Значение</TC>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver, index) => {
            return (
              <TableRow key={driver.name}>
                <TC align='center'>{driver.name}</TC>
                <TC>{driver.displayName}</TC>
                <TC>
                  <LevelSelector
                    level={driver.level}
                    levelRange={driver.levels}
                    setLevel={level => onLevelChange(index, level)}
                  />
                </TC>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpensesDriversDisplay;
