import React from 'react';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';
import { ViewMode, Status, Priority } from '../../../types';
import './TaskFilters.css';
import { Input } from '@/components/common/Input/Input';

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: Status | 'All';
  onStatusChange: (status: Status | 'All') => void;
  priorityFilter: Priority | 'All';
  onPriorityChange: (priority: Priority | 'All') => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="filters-container">
      <div className="search-wrapper">
        <Search className="search-icon" size={18} />
        <Input 
        aria-label="Search tasks"
          placeholder="Search tasks..." 
          value={searchQuery}
          onChange={(e: any) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="select-group">
        <select 
        aria-label="Filter by status"
          className="filter-select"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as any)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        
        <select 
                  aria-label="Filter by priority"

          className="filter-select"
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value as any)}
        >
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <div className="view-toggle">
          <button 
            aria-label="Card view"
            onClick={() => onViewModeChange('card')}
            className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
            title="Card view"
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            aria-label="List view"
            onClick={() => onViewModeChange('list')}
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            title="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
