'use client';

import { useEffect, useState } from 'react';
import { Task, TeamMember, KPI } from '@/lib/types';
import { storage } from '@/lib/storage';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import KPICard from '@/components/KPICard';
import { BarChart3, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [kpis, setKPIs] = useState<KPI[]>([]);

  useEffect(() => {
    setTasks(storage.getTasks());
    setTeamMembers(storage.getTeamMembers());
    setKPIs(storage.getKPIs());
  }, []);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pendiente').length,
    inProgress: tasks.filter((t) => t.status === 'en_progreso').length,
    done: tasks.filter((t) => t.status === 'completado').length,
  };

  const recentTasks = tasks.slice(0, 5);
  const topKPIs = kpis.slice(0, 3);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Panel de Control" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total de Tareas</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
                </div>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
                  <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pendientes</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.pending}</p>
                </div>
                <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3">
                  <AlertCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">En Progreso</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.inProgress}</p>
                </div>
                <div className="rounded-full bg-orange-100 dark:bg-orange-900 p-3">
                  <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completadas</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.done}</p>
                </div>
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {topKPIs.map((kpi) => (
              <KPICard key={kpi.id} kpi={kpi} />
            ))}
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tareas Recientes</h3>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <TaskCard key={task.id} task={task} teamMembers={teamMembers} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

