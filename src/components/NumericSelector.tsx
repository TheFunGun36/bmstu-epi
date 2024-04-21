import { MenuItem, Select, SelectChangeEvent, SxProps, Theme } from '@mui/material';

interface NumericSelectorProps {
  value: number;
  setValue: (value: number) => void;
  minVal: number;
  maxVal: number;
  sx?: SxProps<Theme>;
  variant?: 'standard' | 'outlined' | 'filled';
}

function NumericSelector(props: NumericSelectorProps) {
  const handleChange = (e: SelectChangeEvent) => {
    props.setValue(Number(e.target.value));
  };

  const range = (start: number, end: number) => Array.from(
    Array(end - start + 1).keys()).map(x => x + start);

  return (
    <Select
      sx={props.sx}
      value={props.value.toString()}
      onChange={handleChange}
      variant={props.variant || 'standard'}
    >
      {range(props.minVal, props.maxVal).map(e => (
        <MenuItem key={e.toString()} value={e.toString()}>{e}</MenuItem>
      ))}
    </Select>
  );
}

export default NumericSelector;
