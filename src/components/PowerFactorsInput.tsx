import { Divider, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import powerFactorsJson from '../json/powerFactors.json';
import { useEffect, useState } from 'react';
import { SmallTableCell as TC } from './SmallTableCell';
import { readable } from '../model/Misc';
import { ExpensesDriver, driverLevel } from '../model/ExpensesDrivers';
import { Level, levelRangeCopy } from '../model/Level';
import LevelSelector from './LevelSelector';

export interface PowerFactorsInputProps {
  p: number;
  setP: (eaf: number) => void;
}

function PowerFactorsInput(props: PowerFactorsInputProps) {
  const updateLoc = (drivers: ExpensesDriver[]) => {
    const sum = drivers.reduce((acc, driver) => acc + driverLevel(driver).value, 0);
    props.setP(sum / 100 + 1.01);
  };

  const [powerFactors, setPowerFactors] = useState<ExpensesDriver[]>(
    powerFactorsJson.map((v): ExpensesDriver => ({ ...v, levels: levelRangeCopy(v.levels), level: v.level as Level })));

  const onValueChange = (index: number, value: Level) => {
    const res = powerFactors.map((v): ExpensesDriver => ({ ...v, levels: levelRangeCopy(v.levels) }));
    res[index].level = value;
    updateLoc(res);
    setPowerFactors(res);
  };

  useEffect(() => updateLoc(powerFactors), []);

  return (
    <TableContainer component={Paper}>
      <Typography variant='h5' align='center'>
        Факторы показателя степени модели
      </Typography>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TC><b>Название</b></TC>
            <TC><b>Описание</b></TC>
            <TC><b>Значение</b></TC>
          </TableRow>
        </TableHead>
        <TableBody>
          {powerFactors.map((value, index) => {
            return (
              <TableRow key={`project-param${index}`}>
                <TC align='center'>{value.name}</TC>
                <TC>{value.displayName}</TC>
                <TC>
                  <LevelSelector
                    level={value.level}
                    levelRange={value.levels}
                    setLevel={level => onValueChange(index, level)}
                  />
                </TC>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Typography align='center'>
        <b>P:</b> {readable(props.p)}
      </Typography>
    </TableContainer>
  );
}

export default PowerFactorsInput;
