# Patient Management System

This is a Vue 3 web application for managing patient information. Users can view, search, filter, and edit patient details through a clean and intuitive interface. The following tools and technologies are used:

- Vue 3 with Composition API
- TypeScript
- Vue Router
- Vite
- Tailwind CSS
- Shadcn/ui components (Reka UI)
- Lucide Vue Next (icons)
- Vue Sonner (toast notifications)
- Axios (HTTP client)
- Vitest and Vue Test Utils
- ESLint and Prettier

## Features

- **Patient List View**: Browse all patients with search and filter capabilities
- **Patient Detail View**: View detailed patient information
- **Patient Editing**: Update patient information through a modal dialog
- **Status Management**: Track patient status (New, Pending, Qualified, Disqualified)
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Smooth loading indicators for better UX

## Live Demo

See it live on https://patients-preview-gamma.vercel.app/

![Patient Management Demo](./docs/demo.mp4)

## Getting Started

### Prerequisites

- Node.js (^20.19.0 || >=22.12.0)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <https://github.com/YassDH/patients_preview.git>
cd patients_preview
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

### Development

- `npm run dev` - Start development server with hot reload
- `npm run preview` - Preview production build locally

### Building

- `npm run build` - Build for production
- `npm run build-only` - Build without type checking
- `npm run type-check` - Run TypeScript type checking

### Testing

- `npm run test:unit` - Run tests in watch mode (development)
- `npm run test` - Run tests once
- `npm run test:ci` - Run tests with coverage (CI/CD)
