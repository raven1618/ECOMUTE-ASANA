'use client';

import { useEffect, useState } from 'react';
import { Task, TeamMember } from '@/lib/types';
import { storage } from '@/lib/storage';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Mail, Phone, Award } from 'lucide-react';

export default function TeamPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    setTasks(storage.getTasks());
    setTeamMembers(storage.getTeamMembers());
  }, []);

  const getTasksByMember = (memberId: string) => {
    const memberTasks = tasks.filter((t) => t.assigneeId === memberId);
    return {
      total: memberTasks.length,
      todo: memberTasks.filter((t) => t.status === 'pendiente').length,
      inProgress: memberTasks.filter((t) => t.status === 'en_progreso').length,
      done: memberTasks.filter((t) => t.status === 'completado').length,
    };
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Equipo" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => {
              const taskStats = getTasksByMember(member.id);
              const completionRate = taskStats.total > 0 
                ? Math.round((taskStats.done / taskStats.total) * 100)
                : 0;

              return (
                <div
                  key={member.id}
                  className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Resumen de Tareas
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {completionRate}% completado
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Total de Tareas</span>
                        <span className="font-medium text-gray-900 dark:text-white">{taskStats.total}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">En Progreso</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">{taskStats.inProgress}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Completadas</span>
                        <span className="font-medium text-green-600 dark:text-green-400">{taskStats.done}</span>
                      </div>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

