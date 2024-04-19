import { SxProps, TextField, Theme } from '@mui/material';
import { ChangeEvent, useState } from 'react';

interface NumberInputProps {
  forbidNegative?: boolean;
  value: number;
  label?: string;
  setValue: (_value: number) => void;
  sx?: SxProps<Theme>
}

function NumberInput(p: NumberInputProps) {
  const [stringValue, setStringValue] = useState(p.value.toString());

  const numberValid = (v: number) => {
    let ok = !isNaN(v);

    if (ok && p.forbidNegative && v < 0)
      ok = false;

    return ok;
  }

  const toNumber = (v: string) => {
    const n = Number(v);
    if (numberValid(n))
      return n;
  }

  const strValid = toNumber(stringValue) !== undefined && true;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStringValue(e.target.value);

    const n = toNumber(e.target.value);
    if (n !== undefined)
      p.setValue(n);
  }

  return (
    <TextField
      value={stringValue}
      onChange={handleChange}
      error={!strValid}
      label={p.label}
      variant='outlined'
      sx={p.sx}
    />
  )
}

export default NumberInput;
