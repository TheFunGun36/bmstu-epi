import { Box, Card, Divider, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { SmallTableCell as TC } from './SmallTableCell';
import { readable } from '../model/Misc';
import NumberInput from './NumberInput';
import LevelSelector from './LevelSelector';
import { Level, LevelRange, levelValue } from '../model/Level';

export interface CompositionModelParams {
  loc: number;
  p: number;
}

const expirienceLevelRange: LevelRange = {
  veryLow: { value: 4 },
  low: { value: 7 },
  nominal: { value: 13 },
  high: { value: 25 },
  veryHigh: { value: 50 }
};

function CompositionModel(p: CompositionModelParams) {
  const [averageSalary, setAverageSalary] = useState(160000);
  const [laborCosts, setLaborCosts] = useState(0.0);
  const [timeCosts, setTimeCosts] = useState(0.0);
  const [salaryCosts, setSalaryCosts] = useState(0.0);

  const [simpleScreenForms, setSimpleScreenForms] = useState(3);
  const [mediumScreenForms, setMediumScreenForms] = useState(2);
  const [complexScreenForms, setComplexScreenForms] = useState(0);
  const [simpleReports, setSimpleReports] = useState(2);
  const [mediumReports, setMediumReports] = useState(1);
  const [complexReports, setComplexReports] = useState(0);

  const [modules, setModules] = useState(3);
  const [ruse, setRuse] = useState(0);
  const [expirienceLevel, setExpirienceLevel] = useState(Level.VERY_LOW);

  const updateLabor = () => {
    const pts = simpleScreenForms
      + mediumScreenForms * 2
      + complexScreenForms * 3
      + simpleReports * 2
      + mediumReports * 5
      + complexReports * 8
      + modules;
    const labor = pts * (100 - ruse) / 100 / levelValue(expirienceLevelRange, expirienceLevel);
    const time = 3 * Math.pow(labor, 0.33 + 0.2 * (p.p - 1.01));
    setLaborCosts(labor);
    setTimeCosts(time);
    setSalaryCosts(labor * averageSalary);
  };

  useEffect(() => updateLabor(), [
    averageSalary,
    p.loc,
    simpleScreenForms,
    mediumScreenForms,
    complexScreenForms,
    simpleReports,
    mediumReports,
    complexReports,
    ruse,
    expirienceLevel,
    modules,
  ]);

  return (
    <Grid container component={Paper} spacing={1} m={0}>
      <Grid item xs={12}>
        <Typography variant='h5' align='center'>
          Модель композиции
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={5}>
        <TableContainer component={Card} variant='outlined'>
          <Table>
            <TableHead>
              <TableRow>
                <TC></TC>
                <TC><b>Экранные формы</b></TC>
                <TC><b>Отчёты</b></TC>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TC>Простые</TC>
                <TC><NumberInput sx={{ maxWidth: 50 }} forbidNegative setValue={setSimpleScreenForms} value={simpleScreenForms} /></TC>
                <TC><NumberInput sx={{ maxWidth: 50 }} forbidNegative setValue={setSimpleReports} value={simpleReports} /></TC>
              </TableRow>
              <TableRow>
                <TC>Средние</TC>
                <TC><NumberInput sx={{ maxWidth: 50 }} forbidNegative setValue={setMediumScreenForms} value={mediumScreenForms} /></TC>
                <TC><NumberInput sx={{ maxWidth: 50 }} forbidNegative setValue={setMediumReports} value={mediumReports} /></TC>
              </TableRow>
              <TableRow>
                <TC>Сложные</TC>
                <TC><NumberInput sx={{ maxWidth: 50 }} forbidNegative setValue={setComplexScreenForms} value={complexScreenForms} /></TC>
                <TC><NumberInput sx={{ maxWidth: 50 }} forbidNegative setValue={setComplexReports} value={complexReports} /></TC>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={7}>
        <TableContainer component={Card} variant='outlined'>
          <Table>
            <TableBody>
              <TableRow>
                <TC>Модулей на языках 3-го поколения</TC>
                <TC><NumberInput sx={{ maxWidth: 50 }} forbidNegative setValue={setModules} value={modules} /></TC>
                <TC></TC>
              </TableRow>
              <TableRow>
                <TC>Повторное использование компонентов % (RUSE)</TC>
                <TC><NumberInput sx={{ maxWidth: 50 }} forbidNegative setValue={setRuse} value={ruse} /></TC>
                <TC></TC>
              </TableRow>
              <TableRow>
                <TC>Опыт команды разработчиков</TC>
                <TC><LevelSelector level={expirienceLevel} levelRange={expirienceLevelRange} setLevel={setExpirienceLevel}/></TC>
                <TC></TC>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
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
  );
}

export default CompositionModel;
