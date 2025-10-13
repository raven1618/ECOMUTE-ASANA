export type TaskStatus = 'pendiente' | 'en_progreso' | 'completado';
export type TaskPriority = 'baja' | 'media' | 'alta' | 'critica';
export type ProjectCategory = 'paneles_acusticos' | 'aislamiento_termico' | 'insonorizacion' | 'solucion_integral';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string | null;
  projectCategory: ProjectCategory;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  color: string;
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'productivity' | 'quality' | 'efficiency';
}

export interface ViewMode {
  type: 'list' | 'board' | 'calendar';
}

