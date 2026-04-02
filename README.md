# Finance Dashboard UI

Frontend project for a personal finance dashboard built with React and Vite.

## What This App Does

The app provides a complete frontend simulation of a finance dashboard where users can:

- View summary metrics for balance, income, and expenses
- Analyze trends using charts
- Search, filter, sort, and paginate transactions
- Switch between Viewer and Admin roles
- Add or edit transactions in Admin mode
- Export filtered data
- Use dark and light themes with persisted preferences

The project is intentionally frontend-only and uses mock data with local persistence.

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Install Dependencies

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open the URL shown in terminal, typically http://localhost:5173.

### Lint

```bash
npm run lint
```

### Build and Preview Production

```bash
npm run build
npm run preview
```

## Overview of Approach

### 1. Component-Driven UI

The interface is split into focused components for maintainability and reuse, including header, charts, summary cards, transactions section, grouped summary, and insights.

### 2. Logic Extraction with Custom Hook

Core dashboard behavior is centralized in a dedicated hook at src/hooks/useDashboardData.js:

- Data loading from mock API
- Local storage persistence
- Theme and role state
- Filters, sorting, and pagination
- Derived summaries, chart datasets, and insights

This keeps src/App.jsx mostly as an orchestration layer.

### 3. Derived Data and Performance

Derived values are memoized for predictable rendering and clean logic boundaries:

- Filtered transactions
- Summary metrics
- Trend and category chart data
- Insight calculations
- Paginated rows

### 4. Frontend-Only Role Simulation

The role switch controls UI permissions only:

- Viewer can browse and analyze data
- Admin can create and edit transactions

No backend authorization is implemented, by design for the current project scope.

### 5. Styling Strategy

- Tailwind CSS is configured in the project toolchain
- Existing app styling uses custom CSS for the dashboard visual language
- Dropdowns are implemented via a reusable custom select component for consistent cross-browser appearance

## Explanation of Features

### Dashboard Header

- Role switcher
- Theme toggle
- Project heading and context text

### Summary Cards

- Total balance
- Total income
- Total expenses

### Charts

- Balance trend line chart over time
- Category breakdown chart for spending distribution

### Transactions Section

- Search by note or category
- Filter by type and category
- Sort by date or amount
- Filter by date range and amount range
- Grouping mode selection
- Paginated table
- Reset filters

### Admin Transaction Form

- Add new transaction
- Edit existing transaction
- Input validation for required fields and amount

### Export Actions

- Export currently filtered rows as CSV
- Export currently filtered rows as JSON

### Grouped Summary

- Optional grouped breakdown by category or month

### Insights Panel

- Highest spending category
- Monthly net comparison
- Expense trend observations

### Loading and Empty States

- Mock API loading panel
- Empty state when filters return no rows

## Project Structure

```text
src/
  components/
  hooks/
    useDashboardData.js
  services/
    mockApi.js
  data/
    transactions.js
  utils/
    finance.js
  App.jsx
```

## Key Technical Decisions

- Mock API with delay to simulate real async behavior
- Local storage for transactions, role, theme, and filters
- Pure utility helpers for formatting and finance computations
- Recharts for data visualization
- ESLint for code quality checks

## Assumptions and Scope

- Currency display uses USD formatting
- No backend or authentication is included
- Data persistence is browser-local only
- Role-based permissions are UI-level simulation for demo purposes
