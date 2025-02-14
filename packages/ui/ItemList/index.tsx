'use client'
// eslint-disable-next-line no-use-before-define
import React, { useCallback, useState } from 'react'
import { IconButton, Divider, Checkbox, InputBase } from '@mui/material'
import Paper from '@mui/material/Paper'
import { Edit, Check, Delete } from '@mui/icons-material'
import { TaskProps } from '../../services/types'
import { reduxApi } from '@infor/services'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

interface ListItemProps {
  task: TaskProps
}

export default function ItemList({ task }: ListItemProps) {
  const [isChecked, setIsChecked] = useState(task.done)
  const [isEditing, setIsEditing] = useState(false)
  const [inputText, setInputText] = useState(task.content)

  const [updateTask] = reduxApi.tasks.useUpdateTaskMutation()
  const [deleteTask] = reduxApi.tasks.useDeleteTaskMutation()

  const handleEdit = useCallback(() => {
    if (isEditing && inputText !== task.content) {
      updateTask({ ...task, content: inputText })
    }
    setIsEditing(!isEditing)
  }, [inputText, isEditing, task, updateTask])

  const handleChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event) {
        const target = event.target as HTMLInputElement
        setInputText(target.value)
      }
    },
    [],
  )
  const handleCheckBox = useCallback(() => {
    // task.done = !isChecked
    const data = { ...task, done: !isChecked }
    console.log(data)

    updateTask(data)
    setIsChecked(!isChecked)
  }, [isChecked, task, updateTask])

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
      <Checkbox {...label} checked={isChecked} onClick={handleCheckBox} />

      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          textDecoration: isChecked ? 'line-through' : 'none',
        }}
        value={inputText}
        inputProps={{ 'aria-label': 'search google maps' }}
        color="primary"
        readOnly={!isEditing}
        onChange={handleChangeText}
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
          deleteTask(task)
        }}
      >
        <Delete color="info" />
      </IconButton>
    </Paper>
  )
}
