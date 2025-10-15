'use client';

import { useEffect, useState } from 'react';
import { Task, TeamMember } from '@/lib/types';
import { storage } from '@/lib/storage';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import { List, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'list' | 'board';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  useEffect(() => {
    setTasks(storage.getTasks());
    setTeamMembers(storage.getTeamMembers());
  }, []);

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (selectedTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === selectedTask.id
          ? { ...t, ...taskData, updatedAt: new Date().toISOString() }
          : t
      );
      setTasks(updatedTasks);
      storage.saveTasks(updatedTasks);
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title || '',
        description: taskData.description || '',
        status: taskData.status || 'pendiente',
        priority: taskData.priority || 'media',
        assigneeId: taskData.assigneeId || null,
        projectCategory: taskData.projectCategory || 'solucion_integral',
        dueDate: taskData.dueDate || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      storage.saveTasks(updatedTasks);
    }
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const pendingTasks = tasks.filter((t) => t.status === 'pendiente');
  const inProgressTasks = tasks.filter((t) => t.status === 'en_progreso');
  const doneTasks = tasks.filter((t) => t.status === 'completado');

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Tareas"
          showAddButton
          onAddClick={() => {
            setSelectedTask(null);
            setIsModalOpen(true);
          }}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'rounded-lg p-2 transition-colors',
                  viewMode === 'list'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('board')}
                className={cn(
                  'rounded-lg p-2 transition-colors',
                  viewMode === 'board'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tasks.length} tareas en total
            </p>
          </div>

          {viewMode === 'list' ? (
            <div className="space-y-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  teamMembers={teamMembers}
                  onClick={() => handleTaskClick(task)}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Pendientes</h3>
                  <span className="rounded-full bg-gray-200 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
                    {pendingTasks.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      teamMembers={teamMembers}
                      onClick={() => handleTaskClick(task)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">En Progreso</h3>
                  <span className="rounded-full bg-blue-200 dark:bg-blue-900 px-2 py-1 text-xs font-medium">
                    {inProgressTasks.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {inProgressTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      teamMembers={teamMembers}
                      onClick={() => handleTaskClick(task)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Completadas</h3>
                  <span className="rounded-full bg-green-200 dark:bg-green-900 px-2 py-1 text-xs font-medium">
                    {doneTasks.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {doneTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      teamMembers={teamMembers}
                      onClick={() => handleTaskClick(task)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        task={selectedTask}
        teamMembers={teamMembers}
      />
    </div>
  );
}

