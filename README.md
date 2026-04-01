# Finance Dashboard UI (React)

Frontend assignment implementation for a Finance Dashboard interface.

## Project Overview

This project simulates a personal finance dashboard where users can:

- View an overall financial summary
- Explore transaction history
- Analyze spending with visualizations
- Switch roles between `Viewer` and `Admin`
- See basic financial insights

The app is intentionally frontend-only and uses static/mock transaction data with local persistence.

## Overview of Approach

- Built as a modular React app with focused, reusable UI components.
- Kept business logic in derived selectors (`useMemo`) and utility helpers for clarity.
- Used local state for interaction-heavy UI flows (role switch, filters, pagination, form edit mode).
- Added persistence via local storage and mock async loading to simulate realistic frontend data handling.
- Prioritized readable, responsive UI patterns and explicit empty/loading/error-adjacent states.

## Tech Stack

- React (Vite)
- Recharts for data visualizations
- CSS (custom responsive styling)

## Explanation of Features

### 1. Dashboard Overview

- Summary cards:
	- Total Balance
	- Income
	- Expenses
- Time-based visualization:
	- Balance Trend line chart by month
- Category-based visualization:
	- Spending Breakdown pie chart

### 2. Transactions Section

- Transaction table with:
	- Date
	- Amount
	- Category
	- Type (income/expense)
	- Note
- Interactions:
	- Search by note/category
	- Filter by type/category
	- Sort by date/amount

### 3. Basic Role-Based UI (Frontend Simulation)

- `Viewer`:
	- Can view data only
- `Admin`:
	- Can add new transactions
	- Can edit existing transactions
- Role switcher in dashboard header

### 4. Insights Section

- Highest spending category
- Monthly net comparison
- Useful observation (expense spike detection)

### 5. State Management

Managed with React state and memoized derived selectors:

- Transactions data
- Filters and sorting
- Selected role
- Edit mode state

### 6. UI/UX

- Clean card-based dashboard layout
- Responsive behavior for mobile/tablet/desktop
- Empty-state handling for no matching transactions
- Subtle entrance animations

## Extra Enhancements Included

- Dark mode toggle with persistent theme preference
- Data persistence via local storage (transactions, role, theme, filters)
- Mock API integration with loading state (simulated async fetch)
- Additional animations and transitions (cards, table rows, loader)
- Export functionality for filtered data (CSV and JSON)
- Advanced filtering (date range and amount range)
- Grouped analytics view (category or month)

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:5173`).

### Build for Production

```bash
npm run build
npm run preview
```

## Assumptions

- Currency is displayed in USD for demo consistency.
- Role behavior is intentionally simulated on the frontend only.
- Data is mocked and persisted locally, no backend required.

## State Management Approach

- `useState` handles source-of-truth UI state:
	- transactions
	- role
	- theme
	- filters
	- pagination/edit state
- `useMemo` is used for derived data:
	- filtered transactions
	- dashboard summaries
	- chart datasets
	- insights and grouped analytics
- `useEffect` is used for side effects only:
	- local storage sync
	- theme attribute sync
	- async mock API load

