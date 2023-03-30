'use client'

import { createTask, getTasks } from "@infor/services";
import { TaskProps } from "@infor/services/types";
import { ItemList } from "@infor/ui";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function Todo () {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const queryClient = useQueryClient();

  const query = useQuery("todos", getTasks);
  const mutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  useEffect(() => {
    getTasks().then((response) => setTasks(response));
  }, []);

  return <>{query.data?.map((item) => <ItemList key={item.id} />)}</>;
}
