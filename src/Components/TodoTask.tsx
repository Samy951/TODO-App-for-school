import React, { useState } from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
  deleteTask(taskIdToDelete: number): void;
  toggleTaskCompleted(taskIdToToggle: number): void;
  startEditing: (taskId: number) => void;
  applyEdit: (taskId: number, newName: string, newDeadline: number) => void;
  editing: boolean;
}

export const TodoTask = ({
  task,
  deleteTask,
  toggleTaskCompleted,
  startEditing,
  applyEdit,
  editing,
}: Props) => {
  const [newName, setNewName] = useState(task.taskName);
  const [newDeadline, setNewDeadline] = useState(task.deadline.toString());

  return (
    <div className={`task ${task.isCompleted ? "completed" : ""}`}>
      {editing ? (
        <div className="editing">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="number"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
          />
          <button
            onClick={() => applyEdit(task.id, newName, parseInt(newDeadline))}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="content">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => toggleTaskCompleted(task.id)}
          />
          <span>{task.taskName}</span>
          <span>{task.deadline}</span>
          <button className="editButton" onClick={() => startEditing(task.id)}>
            Edit
          </button>
          <button onClick={() => deleteTask(task.id)}>X</button>
        </div>
      )}
    </div>
  );
};
