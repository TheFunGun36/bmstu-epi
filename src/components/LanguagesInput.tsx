import { Divider, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import languages from '../json/languages.json';
import { useEffect, useState } from 'react';
import { SmallTableCell as TC } from './SmallTableCell';
import { readable } from '../model/Misc';
import { Language } from '../model/Language';
import NumberInput from './NumberInput';

export interface LanguagesInputProps {
  nfp: number;
  loc: number;
  setLoc: (nfp: number) => void;
}

function LanguagesInput(props: LanguagesInputProps) {
  const updateLoc = (langs: Language[]) => {
    const sum = langs.reduce((prev: number, cur: Language) => (
      prev + (cur.percentage || 0) / 100 * cur.fpModifier), 0);
    props.setLoc(props.nfp * sum);
  };

  const [langs, setLangs] = useState<Language[]>(
    languages.map((v): Language => ({ ...v })));

  const onValueChange = (index: number, value: number) => {
    const res = langs.map((v): Language => ({ ...v }));
    res[index].percentage = value;
    updateLoc(res);
    setLangs(res);
  };

  useEffect(() => updateLoc(langs), [props.nfp]);

  return (
    <TableContainer component={Paper}>
      <Typography variant='h5' align='center'>
        Языки программирования
      </Typography>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TC><b>Наименование</b></TC>
            <TC><b>Значение</b></TC>
          </TableRow>
        </TableHead>
        <TableBody>
          {langs.map((value, index) => {
            return (
              <TableRow key={`project-param${index}`}>
                <TC>{value.name}</TC>
                <TC>
                  <NumberInput
                    setValue={n => onValueChange(index, n)}
                    value={langs[index].percentage || 0}
                    sx={{maxWidth: 50}}
                  />
                </TC>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Typography align='center'>
        <b>LOC:</b> {readable(props.loc)}
      </Typography>
    </TableContainer>
  );
}

export default LanguagesInput;
