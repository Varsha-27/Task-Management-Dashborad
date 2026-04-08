import { describe, it, expect, beforeEach } from 'vitest';
import { taskService } from '../services/taskService';
import { Task } from '../types';

describe('taskService', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should return an empty array if no tasks are stored', () => {
    const tasks = taskService.getTasks();
    expect(tasks).toEqual([]);
  });

  it('should save and retrieve tasks', () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Test Task',
        description: 'Description',
        priority: 'High',
        status: 'Pending',
        dueDate: '2026-04-10',
        createdAt: Date.now(),
      },
    ];

    taskService.saveTasks(mockTasks);
    const retrievedTasks = taskService.getTasks();
    expect(retrievedTasks).toEqual(mockTasks);
  });
});
