MyStore: Full-Stack E-Commerce Platform (Task 2)

A premium, responsive e-commerce application built with the **MERN** stack (Express, React, Node.js). This project features a dynamic product catalog, real-time search, and a persistent shopping cart localized for the Indian market.

## ## Prerequisites
1. **Node.js** 18+
2. **npm** or **yarn**
3. **Framer Motion** (for UI animations)

## ## Setup Guide

### ### 1. Backend Setup
1. **Navigate to backend**: `cd backend`
2. **Install dependencies**: `npm install`
3. **Run Server**: `node server.js`
   - Server starts at `http://localhost:5000`

### ### 2. Frontend Setup
1. **Open a new terminal**.
2. **Navigate to frontend**: `cd frontend`
3. **Install dependencies**: `npm install`
4. **Run App**: `npm run dev`
   - Open browser at `http://localhost:5173`

## ## Key Features

1. **Dynamic Search**: Integrated a real-time filtering system that scans product titles as the user types, providing instant feedback without page reloads.
2. **Smart Cart Logic**: Optimized state management to handle item quantities. Adding an existing item increments its count rather than creating duplicates.
3. **Indian Localization**: Implemented a global utility using `Intl.NumberFormat` to display all prices in Indian Rupees (₹) with proper lakh/crore formatting.
4. **Premium UI**: Features smooth Framer Motion transitions, "Amazon-style" hover effects, and skeleton loaders for a high-end user experience.

## ## How it Works

* **Product Filtering**: The frontend uses a combined filter algorithm:
  $$\text{Filtered List} = \text{Products} \cap \text{Category} \cap \text{SearchTerm}$$
* **State Persistence**: The cart state is lifted to `App.jsx`, ensuring data remains consistent while navigating between the Home and Product Details pages.
* **Data Integrity**: Price calculations use raw numeric values internally to prevent `$NaN` errors, only converting to localized strings during the final render.



## ## Debugging & Fixes
* **State Sync**: Resolved page refresh issues by implementing `e.preventDefault()` on all "Add to Cart" triggers.
* **Module Resolution**: Fixed `MODULE_NOT_FOUND` errors by standardizing the directory hierarchy and singular/plural file naming conventions.
* **Layout Reset**: Applied a global `box-sizing: border-box` to fix header clipping and horizontal overflow issues.

---
**Repository Name**: `minizeo_task2`  
**Internship Task**: Task 2 Implementation

---