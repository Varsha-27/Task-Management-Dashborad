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

## Getting Started

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

## Design Decisions

### 1. Architectural Pattern: Separation of Concerns (SoC)
The project is architected with a clear separation of concerns to ensure maintainability and scalability:
- **Presentation Layer (`components/`):** Divided into `common` (atomic, reusable UI elements) and `task` (feature-specific components). This promotes high reusability and consistent UI across the application.
- **View Layer (`views/`):** Orchestrates the layout and manages the high-level state of specific pages, keeping the root `App.tsx` clean and focused on routing/initialization.
- **Logic & Persistence Layer (`services/` & `hooks/`):** Business logic and data handling are abstracted into services and custom hooks. This decouples the UI from the data source, making it easier to swap `localStorage` for a real API in the future.

### 2. Styling Strategy: Vanilla CSS & Modular Design
I deliberately chose **Custom CSS** over utility-first frameworks like Tailwind or component libraries like shadcn/ui.
- **Demonstrating Fundamentals:** This choice highlights a deep understanding of core CSS concepts, including Flexbox, CSS Grid, and responsive design principles.
- **Performance:** By using targeted CSS, the application avoids the overhead of large utility libraries, resulting in a leaner and faster-loading application.
- **Maintainability:** Modular CSS files paired with components ensure that styles are scoped and easy to debug.

### 3. State Management & Data Persistence
- **Local Storage Integration:** For the scope of this project, `localStorage` was chosen to provide immediate data persistence without the latency or complexity of a backend.
- **Custom Hook (`useLocalStorage`):** A custom hook was implemented to synchronize React state with `localStorage` automatically, demonstrating an advanced use of React's hook system.

### 4. User-Centric UX & Interactivity
- **Dynamic View Switching:** The inclusion of both **Card** and **List** views demonstrates a commitment to user preference and accessibility, allowing users to choose the layout that best fits their workflow.
- **Intuitive Reordering:** Integration of `@hello-pangea/dnd` provides a modern, tactile experience for task management, which is a key differentiator in high-quality productivity tools.
- **Real-time Feedback:** Micro-interactions, such as status toggles with visual success indicators and priority-based color coding, provide immediate and clear feedback to the user.

### 5. Quality Assurance: Comprehensive Testing
- **Vitest & React Testing Library:** A robust testing suite was implemented to verify component behavior and business logic.
- **Behavior-Driven Testing:** Tests focus on user interactions (e.g., "can a user create a task?") rather than implementation details, ensuring the application remains functional as it evolves.

### 6. Accessibility (A11y) & Semantic HTML
- **Inclusive Design:** Every interactive element is built with accessibility in mind, utilizing semantic HTML, proper label associations, and `aria-label` attributes where necessary. This ensures the application is usable by individuals relying on assistive technologies.

## Deployment Details

This app is ready to be deployed to **Vercel** or **Netlify**.

**Live URL:** [https://task-management-dashborad.vercel.app/]
