import React, { useState, useMemo, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { format } from 'date-fns';

import { Button } from '../../components/common/Button/Button';
import { Input } from '../../components/common/Input/Input';
import { Modal } from '../../components/common/Modal/Modal';
import { TaskCard } from '../../components/task/TaskCard/TaskCard';
import { TaskFilters } from '../../components/task/TaskFilter/TaskFilters';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { taskService } from '../../services/taskService';
import { Task, Priority, Status, ViewMode } from '../../types';
import { STORAGE_KEYS } from '../../constants';

import './Dashboard.css';

// Casting for DND to avoid TS issues in this environment
const DraggableAny = Draggable as any;
const DroppableAny = Droppable as any;

export const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEYS.TASKS, []);
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>(STORAGE_KEYS.VIEW_MODE, 'card');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'All'>('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium' as Priority,
    dueDate: format(new Date(), 'yyyy-MM-dd'),
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
  }), [tasks]);

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...formData } : t));
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        ...formData,
        status: 'Pending',
        createdAt: Date.now(),
      };
      setTasks([newTask, ...tasks]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
    });
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    setDeleteConfirmId(null);
  };

  const toggleStatus = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { 
      ...t, 
      status: t.status === 'Pending' ? 'Completed' : 'Pending' 
    } : t));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="logo">TaskFlow</h1>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-label">Total</span>
                <span className="stat-value">{stats.total}</span>
              </div>
              <div className="stat-box pending">
                <span className="stat-label">Pending</span>
                <span className="stat-value">{stats.pending}</span>
              </div>
              <div className="stat-box completed">
                <span className="stat-label">Completed</span>
                <span className="stat-value">{stats.completed}</span>
              </div>
            </div>
          </div>
          
          <div className="header-right">
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus size={20} className="btn-icon" /> New Task
            </Button>
          </div>
        </header>

        {/* Filters */}
        <TaskFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Task List */}
        <DragDropContext onDragEnd={onDragEnd}>
          <DroppableAny droppableId="tasks">
            {(provided: any) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className={viewMode === 'card' ? "task-grid" : "task-list"}
              >
                {filteredTasks.map((task, index) => (
                  <DraggableAny key={task.id} draggableId={task.id} index={index}>
                    {(provided: any, snapshot: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="fade-in"
                      >
                        <TaskCard 
                          task={task}
                          onEdit={handleEdit}
                          onDelete={setDeleteConfirmId}
                          onToggleStatus={toggleStatus}
                          dragHandleProps={provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                          viewMode={viewMode}
                        />
                      </div>
                    )}
                  </DraggableAny>
                ))}
                {provided.placeholder}
              </div>
            )}
          </DroppableAny>
        </DragDropContext>

        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <p>No tasks found. Start by creating one!</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={editingTask ? 'Edit Task' : 'New Task'}
      >
        <form onSubmit={handleCreateOrUpdate} className="task-form">
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">Title</label>
            <Input 
            id="task-title"
              value={formData.title} 
              onChange={(e: any) => setFormData({ ...formData, title: e.target.value })} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-desc" className="form-label">Description</label>
            <textarea 
            id="task-desc" 
              className="form-textarea"
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select 
                className="form-select"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <Input 
                type="date" 
                value={formData.dueDate} 
                onChange={(e: any) => setFormData({ ...formData, dueDate: e.target.value })} 
                required 
              />
            </div>
          </div>
          <Button type="submit" className="form-submit-btn">
            {editingTask ? 'Save Changes' : 'Create Task'}
          </Button>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal 
        isOpen={!!deleteConfirmId} 
        onClose={() => setDeleteConfirmId(null)} 
        title="Delete Task"
      >
        <p className="delete-confirm-text">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="delete-actions">
          <Button variant="outline" className="btn-flex" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
          <Button variant="destructive" className="btn-flex" onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
};
