import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ExpensesDriver, ExpensesDriverLevels, SelectedLevel, driverLevel } from '../model/ExpensesDrivers';
import expensesDrivers from '../json/drivers.json'
import DriverLevelSelector from './DriverLevelSelector';
import { PropsWithChildren, useState } from 'react';

interface TCProps {
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  p?: number;
  pl?: number;
  pr?: number;
}

function TC(p: PropsWithChildren<TCProps>) {
  return (
    <TableCell
      sx={{ padding: p.p || 0.5, pl: p.pl, pr: p.pr }}
      align={p.align}
    >
      {p.children}
    </TableCell>)
}

export interface ExpensesDriversDisplayProps {
  setEAF: (_eaf: number) => void
}

function ExpensesDriversDisplay(p: ExpensesDriversDisplayProps) {
  const updateEAF = (drivers: ExpensesDriver[]) => {
    p.setEAF(
      drivers
        .map(driver => driverLevel(driver))
        .reduce((a, b) => a * b, 1));
  }
  const [drivers, setDrivers] = useState<ExpensesDriver[]>(() => {
    const res = expensesDrivers.map(e => {
      const res: ExpensesDriver = {
        ...e,
        level: SelectedLevel.NOMINAL
      };
      return res;
    });
    updateEAF(res);
    return res;
  });

  const onLevelChange = (index: number, level: SelectedLevel) => {
    const newDrivers = drivers.map((value, i) => {
      const levels: ExpensesDriverLevels = {
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
            <TC pr={1}>Значение параметра</TC>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((value, index) => {
            return (
              <TableRow key={value.name}>
                <TC align='center'>{value.name}</TC>
                <TC>{value.displayName}</TC>
                <TC>
                  <DriverLevelSelector
                    driver={value}
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
