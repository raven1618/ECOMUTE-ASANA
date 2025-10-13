import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return 'Sin fecha';
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Hoy';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Mañana';
  }
  
  return date.toLocaleDateString('es-PY', { month: 'short', day: 'numeric' });
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pendiente':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    case 'en_progreso':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    case 'completado':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'baja':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    case 'media':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'alta':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
    case 'critica':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getCategoryLabel(category: string): string {
  switch (category) {
    case 'paneles_acusticos':
      return 'Paneles Acústicos';
    case 'aislamiento_termico':
      return 'Aislamiento Térmico';
    case 'insonorizacion':
      return 'Insonorización';
    case 'solucion_integral':
      return 'Solución Integral';
    default:
      return category;
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'pendiente':
      return 'Pendiente';
    case 'en_progreso':
      return 'En Progreso';
    case 'completado':
      return 'Completado';
    default:
      return status;
  }
}

export function getPriorityLabel(priority: string): string {
  switch (priority) {
    case 'baja':
      return 'Baja';
    case 'media':
      return 'Media';
    case 'alta':
      return 'Alta';
    case 'critica':
      return 'Crítica';
    default:
      return priority;
  }
}

