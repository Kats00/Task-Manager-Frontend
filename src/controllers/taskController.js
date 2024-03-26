import axios from "../../axiosConfig";
import Task from "../models/Task";

export async function getAllTasks() {
  try {
    const response = await axios.get("/api/tasks");
    return response.data.map(
      (task) => new Task(task.id, task.title, task.status),
    );
  } catch (error) {
    throw error;
  }
}

export async function addTask(newTask) {
  try {
    await axios.post("/api/tasks/add-task", newTask);
  } catch (error) {
    throw error;
  }
}

export async function removeTask(id) {
  try {
    await axios.delete(`/api/tasks/delete-task/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function findTask(id) {
  try {
    const response = await axios.get(`/api/tasks/find-task/${id}`);
    const task = response.data;
    return new Task(task.id, task.title, task.status);
  } catch (error) {
    throw error;
  }
}

export async function editTask(task) {
  try {
    await axios.put(`/api/tasks/edit-task/${task.id}`, task);
  } catch (error) {
    throw error;
  }
}
