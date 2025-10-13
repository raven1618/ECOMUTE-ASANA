'use client';

import { Task, TeamMember } from '@/lib/types';
import { formatDate, getStatusColor, getPriorityColor, getCategoryLabel, getStatusLabel, getPriorityLabel, cn } from '@/lib/utils';
import { Calendar, User, Tag } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  teamMembers: TeamMember[];
  onClick?: () => void;
}

export default function TaskCard({ task, teamMembers, onClick }: TaskCardProps) {
  const assignee = teamMembers.find((m) => m.id === task.assigneeId);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 transition-all hover:shadow-md hover:border-primary/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {task.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={cn('inline-flex items-center rounded-full px-2 py-1 text-xs font-medium', getStatusColor(task.status))}>
              {getStatusLabel(task.status).toUpperCase()}
            </span>
            <span className={cn('inline-flex items-center rounded-full px-2 py-1 text-xs font-medium', getPriorityColor(task.priority))}>
              {getPriorityLabel(task.priority).toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              <span>{getCategoryLabel(task.projectCategory)}</span>
            </div>
          </div>
        </div>
        {assignee && (
          <div className="flex-shrink-0">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
              style={{ backgroundColor: assignee.color }}
              title={assignee.name}
            >
              {assignee.avatar}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

