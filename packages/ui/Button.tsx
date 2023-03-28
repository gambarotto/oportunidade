// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { Button, ButtonProps } from '@mui/material'

export const ButtonText: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>
}
export const ButtonContainer: React.FC<ButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <Button variant="contained" {...rest}>
      {children}
    </Button>
  )
}
export const ButtonOutline: React.ElementType<ButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <Button variant="outlined" {...rest}>
      {children}
    </Button>
  )
}
