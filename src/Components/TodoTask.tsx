import React from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
  deleteTask(taskNameToDelete: string): void;
  toggleTaskCompleted(taskNameToToggle: string): void; // Add this line
}

export const TodoTask = ({ task, deleteTask, toggleTaskCompleted }: Props) => {
  return (
    <div className={`task ${task.isCompleted ? "completed" : ""}`}>
      <div className="content">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => toggleTaskCompleted(task.taskName)}
        />
        <span>{task.taskName}</span>
        <span>{task.deadline}</span>
      </div>
      <button onClick={() => deleteTask(task.taskName)}>X</button>
    </div>
  );
};
