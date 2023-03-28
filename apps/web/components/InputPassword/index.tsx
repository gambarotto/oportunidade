'use client'
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, OutlinedInputProps } from "@mui/material";
import { useState } from "react";

interface CustomInputPasswordProps extends OutlinedInputProps {
  inputText: string;
  inputWidth: string | number;
  inputId: string;
  inputLabel: string;
}

export default function InputPassword ({ 
  inputText, 
  inputWidth, 
  inputId, 
  inputLabel,
}:CustomInputPasswordProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormControl
      sx={{ m: 1, width: inputWidth, marginBottom: 4 }}
      variant="outlined"
      color="info"
    >
      <InputLabel htmlFor={inputId}>{inputLabel}</InputLabel>
      <OutlinedInput
        id={inputId}
        type={"password"}
        fullWidth
        label={inputText}
      />
    </FormControl>
  );
}