import { Divider, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import functionalPointsJson from '../json/functionalPoints.json';
import LevelSelector from './LevelSelector';
import { useEffect, useState } from 'react';
import { SmallTableCell as TC } from './SmallTableCell';
import { Level, levelRangeCopy, levelValue } from '../model/Level';
import { FunctionalPoint } from '../model/FunctionalPoint';
import NumberInput from './NumberInput';

export interface FunctionalPointsInput {
  fp: number;
  setFp: (fp: number) => void;
}

function FunctionalPointsInput(p: FunctionalPointsInput) {
  const updateFp = (fp: FunctionalPoint[]) => {
    p.setFp(
      fp.map(fp => fp.count * levelValue(fp.levelRange, fp.level))
        .reduce((a, b) => a + b, 0));
  };

  const [fp, setFp] = useState<FunctionalPoint[]>(
    functionalPointsJson.map((fp): FunctionalPoint => ({
      ...fp,
      levelRange: { ...levelRangeCopy(fp.levelRange) },
      level: Level.LOW
    }))
  );

  const onFpChange = (index: number, level?: Level, count?: number) => {
    const res = fp.map((fp): FunctionalPoint => ({
      ...fp,
      levelRange: { ...levelRangeCopy(fp.levelRange) }
    }));
    res[index].level = level || res[index].level;
    res[index].count = count || res[index].count;
    updateFp(res);
    setFp(res);
  };

  useEffect(() => updateFp(fp), []);

  return (
    <TableContainer component={Paper}>
      <Typography variant='h5' align='center'>
        Функциональные точки
      </Typography>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TC>Название</TC>
            <TC>Описание</TC>
            <TC>Количество</TC>
            <TC>Уровень</TC>
          </TableRow>
        </TableHead>
        <TableBody>
          {fp.map((value, index) => {
            return (
              <TableRow key={value.name}>
                <TC align='center'>{value.name}</TC>
                <TC>{value.displayName}</TC>
                <TC>
                  <NumberInput
                    forbidNegative
                    setValue={count => onFpChange(index, undefined, count)}
                    value={fp[index].count}
                    sx={{ maxWidth: 50 }}
                  />
                </TC>
                <TC>
                  <LevelSelector
                    level={fp[index].level}
                    levelRange={fp[index].levelRange}
                    setLevel={level => onFpChange(index, level)}
                  />
                </TC>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Typography align='center'>
        <b>Число функциональных точек:</b> {p.fp}
      </Typography>
    </TableContainer>
  );
}

export default FunctionalPointsInput;
