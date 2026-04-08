export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Pending' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: Status;
  createdAt: number;
}

export type ViewMode = 'list' | 'card';
