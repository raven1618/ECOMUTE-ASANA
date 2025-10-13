# Ecomute Team Management Dashboard

A modern, Asana-like task and team management dashboard built specifically for Ecomute, specializing in acoustic and thermal isolation solutions.

## Features

### 🎯 Task Management
- Create, edit, and delete tasks
- Multiple views: List and Kanban board
- Task status tracking (To Do, In Progress, Done)
- Priority levels (Low, Medium, High, Critical)
- Due date management
- Team member assignment
- Project categories (Acoustic Panels, Thermal Insulation, Soundproofing, Composite Solution)

### 👥 Team Management
- View all team members
- Track individual workload
- Task completion rates per member
- Role-based organization

### 📊 KPI Dashboard
- Real-time metrics visualization
- Task completion rates
- Quality checks tracking
- Installation efficiency metrics
- Material utilization
- Project timeline performance
- Client satisfaction scores
- Interactive charts (Bar, Pie, Line)

### 🎨 Modern UI
- Clean, professional Asana-like interface
- Responsive design (mobile, tablet, desktop)
- Dark mode ready
- Smooth animations and transitions

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Local Storage** - Data persistence (demo)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ECOMUTE-ASANA
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ECOMUTE-ASANA/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Dashboard page
│   ├── tasks/             # Tasks management
│   ├── team/              # Team overview
│   ├── kpis/              # KPI analytics
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Header.tsx         # Page header
│   ├── TaskCard.tsx       # Task display card
│   ├── TaskModal.tsx      # Task create/edit modal
│   └── KPICard.tsx        # KPI metric card
├── lib/                   # Utility functions
│   ├── types.ts           # TypeScript types
│   ├── data.ts            # Initial mock data
│   ├── utils.ts           # Helper functions
│   └── storage.ts         # Local storage handling
└── public/                # Static assets
```

## Usage

### Dashboard
View overview statistics, recent tasks, and key performance indicators.

### Tasks
- Click "Add New" to create a task
- Switch between List and Board views using the view toggle
- Click any task card to edit its details
- Assign tasks to team members
- Set priorities and due dates

### Team
View all team members, their roles, and current workload distribution.

### KPIs
Monitor performance metrics with interactive charts:
- Task completion rates
- Quality metrics
- Efficiency tracking
- Project categories distribution

### Settings
Configure profile, notifications, appearance, and security settings.

## Data Persistence

Currently uses **Local Storage** for demo purposes. To upgrade to a database:

1. Replace `lib/storage.ts` with API calls
2. Set up your preferred database (PostgreSQL, MongoDB, etc.)
3. Update the data fetching logic in each page

## Customization

### Adding KPIs
Edit `lib/data.ts` to add custom KPIs relevant to your business:

```typescript
{
  id: 'unique-id',
  name: 'Your KPI Name',
  value: 85,
  target: 90,
  unit: '%',
  trend: 'up',
  category: 'productivity'
}
```

### Team Roles
Modify team member roles in `lib/data.ts`:

```typescript
{
  id: '1',
  name: 'Member Name',
  role: 'Custom Role',
  email: 'email@ecomute.com',
  avatar: 'MN',
  color: '#3B82F6'
}
```

### Project Categories
Update categories in `lib/types.ts` and corresponding labels in `lib/utils.ts`.

## Building for Production

```bash
npm run build
npm start
```

## Future Enhancements

- [ ] User authentication
- [ ] Real-time collaboration
- [ ] File attachments
- [ ] Comments and activity feed
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Time tracking
- [ ] Reports export (PDF/Excel)
- [ ] Mobile apps
- [ ] API integration with external tools

## License

Proprietary - Ecomute Internal Use

## Support

For issues or questions, contact your development team.

---

**Built with ❤️ for Ecomute**

