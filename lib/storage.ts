import { Task, TeamMember, KPI } from './types';
import { initialTasks, initialTeamMembers, initialKPIs } from './data';

const TASKS_KEY = 'ecomute_tasks_es';
const TEAM_KEY = 'ecomute_team_es';
const KPI_KEY = 'ecomute_kpis_es';

export const storage = {
  getTasks: (): Task[] => {
    if (typeof window === 'undefined') return initialTasks;
    const stored = localStorage.getItem(TASKS_KEY);
    return stored ? JSON.parse(stored) : initialTasks;
  },

  saveTasks: (tasks: Task[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  getTeamMembers: (): TeamMember[] => {
    if (typeof window === 'undefined') return initialTeamMembers;
    const stored = localStorage.getItem(TEAM_KEY);
    return stored ? JSON.parse(stored) : initialTeamMembers;
  },

  saveTeamMembers: (members: TeamMember[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TEAM_KEY, JSON.stringify(members));
  },

  getKPIs: (): KPI[] => {
    if (typeof window === 'undefined') return initialKPIs;
    const stored = localStorage.getItem(KPI_KEY);
    return stored ? JSON.parse(stored) : initialKPIs;
  },

  saveKPIs: (kpis: KPI[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KPI_KEY, JSON.stringify(kpis));
  },
};

