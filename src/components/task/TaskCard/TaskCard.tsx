import React from 'react';
import { Pencil, Trash2, Clock, CheckCircle2, GripVertical } from 'lucide-react';
import { format } from 'date-fns';
import './TaskCard.css';
import { Badge } from '@/components/common/Badge/Badge';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  dragHandleProps?: any;
  isDragging?: boolean;
  viewMode?: 'card' | 'list';
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleStatus,
  dragHandleProps,
  isDragging,
  viewMode = 'card'
}) => {
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className={`task-list-item ${isDragging ? 'dragging' : ''} ${task.status === 'Completed' ? 'completed' : ''}`}>
        <div {...dragHandleProps} className="drag-handle">
          <GripVertical size={18} />
        </div>
        
        <div className="list-status">
          <button 
            onClick={() => onToggleStatus(task.id)}
            className={`status-btn ${task.status === 'Completed' ? 'is-completed' : ''}`}
          >
            {task.status === 'Completed' ? <CheckCircle2 size={18} /> : <div className="circle-icon" />}
          </button>
        </div>

        <div className="list-content">
          <h3 className="list-title">{task.title}</h3>
        </div>

        <div className="list-meta">
          <Badge variant={getPriorityVariant(task.priority)}>
            {task.priority}
          </Badge>
          <div className="list-date">
            <Clock size={12} />
            <span>{format(new Date(task.dueDate), 'MMM d')}</span>
          </div>
        </div>

        <div className="list-actions">
          <button onClick={() => onEdit(task)} className="action-btn edit"  title="Edit Task">
            <Pencil size={16} />
          </button>
          <button onClick={() => onDelete(task.id)} className="action-btn delete" title="Delete Task">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-card ${isDragging ? 'dragging' : ''} ${task.status === 'Completed' ? 'completed' : ''}`}>
      <div className="task-card-inner">
        <div {...dragHandleProps} className="drag-handle">
          <GripVertical size={20} />
        </div>
        
        <div className="task-content">
          <div className="task-header">
            <Badge variant={getPriorityVariant(task.priority)}>
              {task.priority}
            </Badge>
            <div className="task-actions">
              <button onClick={() => onEdit(task)} className="action-btn edit">
                <Pencil size={16} />
              </button>
              <button onClick={() => onDelete(task.id)} className="action-btn delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <h3 className="task-title">{task.title}</h3>
          <p className="task-desc">{task.description || 'No description provided.'}</p>
          
          <div className="task-footer">
            <div className="task-date">
              <Clock size={12} />
              <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
            </div>
            <button 
              onClick={() => onToggleStatus(task.id)}
              className={`status-toggle ${task.status === 'Completed' ? 'is-completed' : ''}`}
            >
              {task.status === 'Completed' ? <CheckCircle2 size={18} /> : <div className="circle-icon" />}
              <span>{task.status}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
