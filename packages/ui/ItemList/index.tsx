'use client'
// eslint-disable-next-line no-use-before-define
import React, { useCallback, useState, useRef } from 'react'
import { IconButton, InputBase, Divider, Checkbox } from '@mui/material'
import Paper from '@mui/material/Paper'
import { Edit, Check, Delete } from '@mui/icons-material'
import { TaskProps } from '../../services/types'
import { UseMutationResult } from 'react-query'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

interface ListItemProps {
  task: TaskProps
  removeTask: UseMutationResult<void, unknown, TaskProps, unknown>
  updateTask: UseMutationResult<TaskProps, unknown, TaskProps, unknown>
}

export default function ItemList({
  task,
  removeTask,
  updateTask,
}: ListItemProps) {
  const [isChecked, setIsChecked] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [inputText, setInputText] = useState(task.content)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = useCallback(() => {
    if (isEditing) {
      updateTask.mutate({ ...task, content: inputText })
    }
    setIsEditing(!isEditing)
  }, [inputText, isEditing, task, updateTask])
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        marginBottom: 1,
      }}
    >
      <Checkbox
        {...label}
        defaultChecked={false}
        onClick={() => setIsChecked(!isChecked)}
      />
      <InputBase
        ref={inputRef}
        sx={{
          ml: 1,
          flex: 1,
          textDecoration: isChecked ? 'line-through' : 'none',
        }}
        value={inputText}
        inputProps={{ 'aria-label': 'search google maps' }}
        color="primary"
        readOnly={!isEditing}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: '6px', marginRight: 2 }}
        aria-label="edit"
        onClick={handleEdit}
      >
        {isEditing ? <Check color="success" /> : <Edit color="info" />}
      </IconButton>
      <IconButton
        color="primary"
        sx={{ p: '6px' }}
        aria-label="edit"
        onClick={() => {
          removeTask.mutate(task)
        }}
      >
        <Delete color="info" />
      </IconButton>
    </Paper>
  )
}
