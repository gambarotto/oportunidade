'use client'

import { useCallback, useState } from "react";
import { reduxApi } from "@infor/services";
import { ItemList } from "@infor/ui";
import { Add } from "@mui/icons-material";
import { Grid, IconButton, List, Stack, TextField } from "@mui/material";

export default function Todo () {
  const [newTask, setNewTask] = useState('');
  
  const {
    data: tasks,
    isLoading,
    isError,
    isSuccess,
  } = reduxApi.tasks.useTasksQuery([]);

  const [addTask] = reduxApi.tasks.useAddTaskMutation();

  const handleCreateTask = useCallback(() => {
    addTask(newTask);
    setNewTask('');
  }, [addTask, newTask]);

  if(isLoading) {
    return <h1>loading</h1>
  }
  if (isError) {
    return <h1>error</h1>;
  }
  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Grid
        container
        maxWidth="sm"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Stack
          width="50ch"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={6}
        >
          <TextField
            id="standard-basic"
            label="Nova Tarefa"
            variant="standard"
            fullWidth
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
          />
          <IconButton
            color="primary"
            aria-label="add to-do"
            onClick={handleCreateTask}
          >
            <Add />
          </IconButton>
        </Stack>
        <List>
          { isSuccess && tasks.map((item) => (
            <ItemList
              key={item.id}
              task={item}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
