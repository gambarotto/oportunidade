'use client'

import { createTask, deleteTask, getTasks, updateTask } from "@infor/services";
import { ItemList } from "@infor/ui";
import { Add } from "@mui/icons-material";
import { Grid, IconButton, List, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { addTask, deleteReduxTask, getAllTasks, updateReduxTask, useAppSelectorTask } from "../../redux/features/task/taskSlice";

//TODO: get all tasks and set on redux
export default function Todo () {
  const [newTask, setNewTask] = useState('');

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const query = useQuery("todos", getTasks);

  const mutationCreateTask = useMutation(createTask, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos");
      setNewTask('')
      dispatch(addTask({...data}));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleCreateTask = () => {
    mutationCreateTask.mutate({content: newTask});
  };
  const mutationDeleteTask = useMutation(deleteTask, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos");
      dispatch(deleteReduxTask(data))
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const mutationUpdateTask = useMutation(updateTask, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos");
      dispatch(updateReduxTask(data))
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    async function loadTodos(){
      const data = await queryClient.fetchQuery('initialTasks', getTasks)
      console.log("initialTasks");
      
      dispatch(getAllTasks(data))
    }
    loadTodos()
  }, [dispatch, queryClient]);

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
            aria-label="add to shopping cart"
            onClick={handleCreateTask}
          >
            <Add />
          </IconButton>
        </Stack>
        <List>
          {query.data?.map((item) => (
            <ItemList
              key={item.id}
              task={item}
              removeTask={mutationDeleteTask}
              updateTask={mutationUpdateTask}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
