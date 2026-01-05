# Delivery Management System - Implementation Plan

## 1. System Overview
A comprehensive Delivery & Management System connecting Admins, Employees (Drivers/Staff), and Customers.
**Stack**: Vue.js 3, Quasar Framework, Tailwind CSS, Pinia (State), Firebase (simulated/actual for backend).

## 2. Architecture & Database Design

### 2.1 Users & Authentication
*   **Authentication Strategy**:
    *   **Customers**: Email/Phone + Password.
    *   **Employees**: Manual ID (pre-assigned by Admin) + Password.
    *   **RBAC**: Derived from User Object `role` ('admin', 'employee', 'customer').

### 2.2 Database Schema (ERD Concept)

#### Collection: `users`
*   `uid` (String, PK)
*   `role` (Enum: 'admin', 'employee', 'customer')
*   `email` (String)
*   `phone` (String)
*   `displayName` (String)
*   `createdAt` (Timestamp)
*   **Employee Specific**:
    *   `employeeId` (String, Unique)
    *   `department` (String)
    *   `status` (Enum: 'active', 'inactive', 'on_job')
    *   `skills` (Array<String>)
*   **Customer Specific**:
    *   `address` (Object)

#### Collection: `orders`
*   `orderId` (String, PK)
*   `customerId` (FK -> users.uid)
*   `status` (Enum: 'pending', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled')
*   `items` (Array)
*   `assignedTo` (Array<FK -> users.uid>) // Supports multiple employees
*   `pickupLocation` (Object)
*   `deliveryLocation` (Object)
*   `cost` (Number)

#### Collection: `inventory`
*   `partId` (String, PK)
*   `name` (String)
*   `quantity` (Number)
*   `threshold` (Number) // Low stock alert level
*   `supplierId` (FK)

## 3. Implementation Phases

### Phase 1: Foundation & UI Modernization (Current)
*   [x] Basic Pages (Home, Login, Register, Pricing, Services)
*   [ ] **Tailwind CSS Integration** (Requested)
*   [ ] **Authentication Logic Implementation** (Manual ID vs Customer)

### Phase 2: Core Modules
*   **Admin Dashboard**: Order management, Inventory table, Staff allocation view.
*   **Employee Dashboard**: Job list, Status toggle, Profile view.
*   **Customer Portal**: Order history, Tracking view.

### Phase 3: Advanced Features
*   Notification System (Toast/In-app).
*   Inventory Prediction Logic.
*   Reporting & Analytics.

## 4. Next Steps (Immediate)
1.  **Install Tailwind CSS**: Configure it alongside Quasar.
2.  **Update Config**: Ensure styling co-exists.
3.  **Refactor Auth**: Implement the `Employee ID` validation logic in `RegisterPage` and `LoginPage`.
