// eslint-disable-next-line no-use-before-define
import React from 'react'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material'

interface CustomInputProps extends OutlinedInputProps {
  inputText: string
  inputWidth: string | number
  inputId: string
  inputType: string
  inputLabel: string
}

export default function Input({
  inputText,
  inputWidth,
  inputId,
  inputType,
  inputLabel,
  ...rest
}: CustomInputProps) {
  return (
    <FormControl
      sx={{ m: 1, width: inputWidth }}
      variant="outlined"
      color="info"
    >
      <InputLabel htmlFor="outlined-adornment-email">{inputText}</InputLabel>
      <OutlinedInput
        id={inputId}
        type={inputType}
        fullWidth
        label={inputLabel}
        {...rest}
      />
    </FormControl>
  )
}
