import { Input } from "@mui/material";

interface NumberInputProps {
  value: number;
  setValue: (_value: number) => void;
}

function NumberInput({ value, setValue }: NumberInputProps) {
  return (
    <Input
      value={value.toString()}>
    </Input>
  )
}

export default NumberInput;
