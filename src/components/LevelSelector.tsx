import { MenuItem, Select, SelectChangeEvent, SxProps, Theme } from '@mui/material';
import { Level, LevelRange } from '../model/Level';

interface LevelSelectorParams {
  levelRange: LevelRange;
  level: Level;
  setLevel: (level: Level) => void;
  sx?: SxProps<Theme>;
  variant?: 'standard' | 'outlined' | 'filled';
}

function LevelSelector({ level, levelRange, setLevel, sx, variant }: LevelSelectorParams) {
  const handleChange = (e: SelectChangeEvent) => {
    setLevel(e.target.value as Level);
  };

  return (
    <Select
      sx={{ minWidth: 170, ...sx }}
      value={level}
      onChange={handleChange}
      variant={variant || 'standard'}
    >
      {levelRange.veryLow &&
        <MenuItem value={Level.VERY_LOW}>
          {levelRange.veryLow.label ?
            levelRange.veryLow.label :
            `Очень низкий (${levelRange.veryLow.value})`}
        </MenuItem>}
      {levelRange.low &&
        <MenuItem value={Level.LOW}>
          {levelRange.low.label ?
            levelRange.low.label :
            `Низкий (${levelRange.low.value})`}
        </MenuItem>}
      {levelRange.nominal &&
        <MenuItem value={Level.NOMINAL}>
          {levelRange.nominal.label ?
            levelRange.nominal.label :
            `Номинальный (${levelRange.nominal.value})`}
        </MenuItem>}
      {levelRange.high &&
        <MenuItem value={Level.HIGH}>
          {levelRange.high.label ?
            levelRange.high.label :
            `Высокий (${levelRange.high.value})`}
        </MenuItem>}
      {levelRange.veryHigh &&
        <MenuItem value={Level.VERY_HIGH}>
          {levelRange.veryHigh.label ?
            levelRange.veryHigh.label :
            `Очень высокий (${levelRange.veryHigh.value})`}
        </MenuItem>}
      {levelRange.ultraHigh &&
        <MenuItem value={Level.ULTRA_HIGH}>
          {levelRange.ultraHigh.label ?
            levelRange.ultraHigh.label :
            `Сверхвысокий (${levelRange.ultraHigh.value})`}
        </MenuItem>}
    </Select>
  );
}

export default LevelSelector;
