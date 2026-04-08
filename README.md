# TaskFlow Dashboard

A clean, efficient, and responsive Task Management Dashboard built with React, TypeScript, and custom CSS.

## Features

- **Task Management:** Create, Read, Update, and Delete (CRUD) tasks.
- **Drag-and-Drop:** Reorder tasks easily using a drag-and-drop interface.
- **Persistence:** All data is saved to `localStorage`, so your tasks stay even after a page refresh.
- **Search & Filter:** Find tasks by title/description and filter by status or priority.
- **Responsive Design:** Works perfectly on mobile, tablet, and desktop.
- **Interactive UI:** Smooth animations and intuitive feedback (e.g., green checkmarks for completed tasks).

## Tech Stack

- **React 19:** Functional components and hooks.
- **TypeScript:** Type safety and better developer experience.
- **Custom CSS:** Simple, modular CSS for easy understanding and maintenance.
- **Lucide React:** Beautiful and consistent icons.
- **@hello-pangea/dnd:** Robust drag-and-drop functionality.

## Project Structure

The project follows a clean and organized structure, ideal for interview reviews:

- `src/components/common`: Reusable UI elements (Button, Input, Modal, Badge).
- `src/components/task`: Task-specific components (TaskCard, TaskFilters).
- `src/views`: Main application views (Dashboard).
- `src/services`: Data handling logic (taskService).
- `src/hooks`: Custom hooks (useLocalStorage).
- `src/constants`: Application-wide constants.
- `src/types.ts`: TypeScript interfaces and types.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

