<template>
  <div>
    <div class="d-flex justify-content-between p-2">
      <h1 class="table-title">Task List</h1>
      <button @click="openAddModal" class="btn btn-success shadow">
        Add Task
      </button>
    </div>
    <div class="table-responsive">
      <table class="table caption-top">
        <!--caption>List of tasks</caption-->
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col" style="text-align: center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.status }}</td>
            <td class="d-flex justify-content-center gap-3">
              <button
                @click="deleteTask(task.id)"
                class="btn btn-danger shadow-sm"
              >
                Delete
              </button>
              <button
                @click="editTask(task.id)"
                class="btn btn-primary shadow-sm"
              >
                Toggle Status
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showAddModal" ref="addTaskModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeAddModal">&times;</span>
        <h2 class="modal-title">Add Task</h2>
        <form @submit.prevent="addNewTask">
          <input
            type="text"
            v-model="newTask.title"
            placeholder="Task title"
            required
            class="form-control mb-2"
          />
          <input
            type="text"
            v-model="newTask.status"
            placeholder="Task status"
            required
            class="form-control mb-2"
          />
          <button type="submit" class="btn btn-primary modal-button">
            Add Task
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "../models/Task";
import {
  getAllTasks,
  addTask,
  removeTask,
  findTask,
  editTask,
} from "../controllers/taskController";

export default {
  data() {
    return {
      tasks: [],
      newTask: new Task("", "", ""),
      editedTask: new Task("", "", ""),
      selectedTaskId: null,
      showAddModal: false,
    };
  },
  async mounted() {
    try {
      this.tasks = await getAllTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },
  methods: {
    async addNewTask() {
      try {
        await addTask(this.newTask);
        this.showAddModal = false;
        this.tasks = await getAllTasks();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },

    async editTask(taskId) {
        try {
            const task = await findTask(taskId);
            task.status = task.status === 'complete' ? 'incomplete' : 'complete';
            await editTask(task);
            this.tasks = await getAllTasks();
            console.log('Task successfully edited:', task);
        } catch (error) {
            console.error('Error editing task:', error);
        }
    },


    // ignore this. I thought edit task was supposed to edit the title and the completion status of the task.
    /*
    async editTask() {
      try {
        await editTask(this.editedTask);
        this.closeEditModal();
        this.tasks = await getAllTasks();
      } catch (error) {
        console.error("Error editing task:", error);
      }
    },*/

    async deleteTask(taskId) {
      try {
        await removeTask(taskId);
        this.tasks = await getAllTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },


    /*
    async openEditModal(taskId) {
      console.log("Opening edit modal");
      this.selectedTaskId = taskId;
      this.$nextTick(() => {
        this.$refs.editTaskModal.style.display = "block";
      });
      try {
        const task = await findTask(taskId);
        this.editedTask = task;
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    },
    */

    openAddModal() {
      console.log("Opening add modal");
      this.showAddModal = true;
      this.$nextTick(() => {
        this.$refs.addTaskModal.style.display = "block";
      });
    },

    /*
    closeEditModal() {
      console.log("Closing edit modal");
      this.selectedTaskId = null;
      this.$nextTick(() => {
        this.$refs.editTaskModal.style.display = "none";
      });
    },*/

    closeAddModal() {
      console.log("Closing add modal");
      this.showAddModal = false;
      this.$nextTick(() => {
        this.$refs.addTaskModal.style.display = "none";
      });
    },

    async getAllTasks() {
      try {
        this.tasks = await getAllTasks();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
  },
};
</script>
