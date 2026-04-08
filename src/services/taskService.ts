import { Task } from '../types';
import { STORAGE_KEYS } from '../constants';

export const taskService = {
  getTasks: (): Task[] => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEYS.TASKS);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }
};
