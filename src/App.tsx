import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import { TodoTask } from "./Components/TodoTask";
import { ITask } from "./Interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDealine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline, isCompleted: false };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDealine(0);
  };

  const deleteTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  const toggleTaskCompleted = (taskNameToToggle: string): void => {
    setTodoList(
      todoList.map((task) =>
        task.taskName === taskNameToToggle
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return (
            <TodoTask
              key={key}
              task={task}
              deleteTask={deleteTask}
              toggleTaskCompleted={toggleTaskCompleted}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
