'use client';

import { useEffect, useState } from 'react';
import { Task, KPI } from '@/lib/types';
import { storage } from '@/lib/storage';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import KPICard from '@/components/KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function KPIsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [kpis, setKPIs] = useState<KPI[]>([]);

  useEffect(() => {
    setTasks(storage.getTasks());
    setKPIs(storage.getKPIs());
  }, []);

  const taskStatusData = [
    { name: 'Pendiente', value: tasks.filter((t) => t.status === 'pendiente').length },
    { name: 'En Progreso', value: tasks.filter((t) => t.status === 'en_progreso').length },
    { name: 'Completado', value: tasks.filter((t) => t.status === 'completado').length },
  ];

  const taskPriorityData = [
    { name: 'Baja', value: tasks.filter((t) => t.priority === 'baja').length },
    { name: 'Media', value: tasks.filter((t) => t.priority === 'media').length },
    { name: 'Alta', value: tasks.filter((t) => t.priority === 'alta').length },
    { name: 'Crítica', value: tasks.filter((t) => t.priority === 'critica').length },
  ];

  const projectCategoryData = [
    { name: 'Acústica', value: tasks.filter((t) => t.projectCategory === 'paneles_acusticos').length },
    { name: 'Térmica', value: tasks.filter((t) => t.projectCategory === 'aislamiento_termico').length },
    { name: 'Insonorización', value: tasks.filter((t) => t.projectCategory === 'insonorizacion').length },
    { name: 'Integral', value: tasks.filter((t) => t.projectCategory === 'solucion_integral').length },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="KPIs y Analíticas" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {kpis.map((kpi) => (
              <KPICard key={kpi.id} kpi={kpi} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tareas por Estado
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taskStatusData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                  <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
                  <YAxis className="text-gray-600 dark:text-gray-400" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tareas por Prioridad
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskPriorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taskPriorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Distribución de Categorías de Proyectos
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectCategoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                <XAxis type="number" className="text-gray-600 dark:text-gray-400" />
                <YAxis type="category" dataKey="name" className="text-gray-600 dark:text-gray-400" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="value" fill="#10B981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}

