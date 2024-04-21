import { Box, Divider, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { ExpensesDriver, driverLevel } from '../model/ExpensesDrivers';
import earlyModel from '../json/earlyModel.json';
import LevelSelector from './LevelSelector';
import { useEffect, useState } from 'react';
import { SmallTableCell as TC } from './SmallTableCell';
import { readable } from '../model/Misc';
import { Level, levelRangeCopy } from '../model/Level';
import { laborCosts as calculateLaborCosts, projectModeFromKloc, projectTime as calculateProjectTime } from '../model/ProjectMode';
import NumberInput from './NumberInput';

export interface EarlyArchModelParams {
  loc: number;
}

function EarlyArchModel(p: EarlyArchModelParams) {
  const [averageSalary, setAverageSalary] = useState(160000);
  const [laborCosts, setLaborCosts] = useState(0.0);
  const [timeCosts, setTimeCosts] = useState(0.0);
  const [salaryCosts, setSalaryCosts] = useState(0.0);

  const updateLabor = (drivers: ExpensesDriver[]) => {
    const eaf = drivers.reduce((acc, driver) => acc * driverLevel(driver).value, 1);
    const kloc = p.loc / 1000;
    const mode = projectModeFromKloc(kloc);

    const labor = calculateLaborCosts(mode, eaf, kloc);
    const time = calculateProjectTime(mode, labor);

    setLaborCosts(labor);
    setTimeCosts(time);
    setSalaryCosts(labor * averageSalary);
  };

  const [drivers, setDrivers] = useState<ExpensesDriver[]>(
    earlyModel.map((e): ExpensesDriver => ({
      ...e,
      level: (e.level as Level | undefined) || Level.NOMINAL
    }))
  );

  const onLevelChange = (index: number, level: Level) => {
    const res = drivers.map((value): ExpensesDriver => ({
      ...value,
      levels: levelRangeCopy(value.levels),
    }));
    res[index].level = level;
    updateLabor(res);
    setDrivers(res);
  };

  useEffect(() => updateLabor(drivers), [averageSalary, p.loc]);

  return (
    <TableContainer component={Paper}>
      <Typography variant='h5' align='center'>
        Модель ранней разработки архитектуры
      </Typography>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TC><b>Идентификатор</b></TC>
            <TC><b>Описание</b></TC>
            <TC><b>Значение</b></TC>
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
            );
          })}
        </TableBody>
      </Table>
      <Grid container>
        <Grid item xs={6} display='flex' alignItems='center' justifyContent='center'>
          <NumberInput
            forbidNegative
            setValue={setAverageSalary}
            value={averageSalary}
            label='Средняя зарплата'
            variant='outlined'
          />
        </Grid>
        <Grid item xs={6}>
          <Typography align='center'>
            <b>Трудозатраты:</b> {readable(laborCosts)} чел-мес
          </Typography>
          <Typography align='center'>
            <b>Время:</b> {readable(timeCosts)} месяцев
          </Typography>
          <Typography align='center'>
            <b>Бюджет:</b> {readable(salaryCosts)} р.
          </Typography>
        </Grid>
      </Grid>
    </TableContainer>
  );
}

export default EarlyArchModel;
