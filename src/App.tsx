import React, { FC, ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import { TodoTask } from "./Components/TodoTask";
import { ITask } from "./Interfaces";

let taskIdCounter = Date.now();

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  useEffect(() => {
    const tasks = localStorage.getItem("todoList");
    if (tasks) {
      setTodoList(JSON.parse(tasks));
    }
    // Charger le dernier ID de tâche utilisé si disponible
    const lastTaskId = localStorage.getItem("taskIdCounter");
    if (lastTaskId) {
      taskIdCounter = parseInt(lastTaskId, 10);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("taskIdCounter", taskIdCounter.toString());
  }, [todoList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDealine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = {
      id: ++taskIdCounter,
      taskName: task,
      deadline: deadline,
      isCompleted: false,
    };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDealine(0);
  };

  const deleteTask = (taskIdToDelete: number): void => {
    setTodoList(todoList.filter((task) => task.id !== taskIdToDelete));
  };

  const toggleTaskCompleted = (taskIdToToggle: number): void => {
    setTodoList(
      todoList.map((task) =>
        task.id === taskIdToToggle
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  const startEditing = (taskId: number): void => {
    setEditingTaskId(taskId);
  };

  const applyEdit = (
    taskId: number,
    newName: string,
    newDeadline: number
  ): void => {
    setTodoList(
      todoList.map((task) =>
        task.id === taskId
          ? { ...task, taskName: newName, deadline: newDeadline }
          : task
      )
    );
    setEditingTaskId(null); // Reset l'état d'édition
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
              startEditing={startEditing}
              applyEdit={applyEdit}
              editing={editingTaskId === task.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
