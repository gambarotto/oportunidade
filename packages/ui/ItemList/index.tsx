'use client'
// eslint-disable-next-line no-use-before-define
import React from 'react'
import { IconButton, InputBase, Divider, Checkbox } from '@mui/material'
import Paper from '@mui/material/Paper'
import { Edit } from '@mui/icons-material'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
export default function ItemList() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <Checkbox {...label} defaultChecked />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="content"
        inputProps={{ 'aria-label': 'search google maps' }}
        disabled={true}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '6px' }} aria-label="edit">
        <Edit color="info" />
      </IconButton>
    </Paper>
  )
}
