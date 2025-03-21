# React + Vite
Deployment URL
https://slacktosurplus.netlify.app/
# Slack To Surplus 🍲

Welcome to **Slack To Surplus**, a food donation management system designed to turn surplus food into solutions for hunger. By connecting donors with recipients, we reduce food waste and promote food security—one donation at a time.

![[Homepage Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531892/photo_7_2025-03-21_10-05-37_nzq5cu.jpg)  
*Caption: The homepage feed raises awareness about food waste and showcases active donation posts.*

---

## 🌟 Project Overview

*Slack To Surplus* bridges the gap between individuals/organizations with surplus food and those in need, like NGOs. Built with a modern tech stack, it’s a user-friendly platform with robust features for donation tracking, user engagement, and education.

### Tech Stack
- **Backend**: Spring Boot, MySQL  
- **Frontend**: React (Vite)  
- **Storage**: Local storage for user data (no HttpSession)  
- **Design Choice**: No DTOs for streamlined development  

---

## 🚀 Core Features

### User Roles
| Role                  | Responsibilities                                      |
|-----------------------|------------------------------------------------------|
| **Admin**            | Manage users, food offers, urgent needs, and analytics |
| **Food Donor**       | Donate surplus food and earn points                  |
| **Recipient Org**    | Request donations and plan distributions            |
| **Data Analyst**     | View dashboards with donation/request metrics        |

### Key Functionalities

#### User Authentication
- Secure signup/login for all roles.
- Role-based access control.

#### Food Donation & Requests
- **Donors**: Post surplus food with details (type, quantity, expiry).  
- **Recipients**: Browse listings, request donations, and track statuses (PENDING → CONFIRMED → COMPLETED).  
- Approval/rejection workflow managed by donors.

![Donation Flow Screenshot](insert-link-here)  
*Caption: Step-by-step process for donating surplus food.*

#### Points & Incentives
- Donors earn points per donation.  
- Recipients gain points for successful receptions.  
- Auto-score updates based on activity.

#### Profile Management
- Edit personal details (name, phone, address, images).  
- View profile picture, banner, and stats (score, donations, received).

#### Post Management
- Active donation posts sorted by date.  
- Displays donor username and profile picture.

![Donation Listings Screenshot](insert-link-here)  
*Caption: Browse available donations by food type.*

#### Educational Hub
- Articles and tips on food security and waste reduction.  
- Integrated into the homepage feed for visibility.

#### Recipe Generator (Bonus Feature)
- Suggests recipes based on surplus ingredients.  

#### Recipient Organization Tools
- **Dashboard**: Tracks total food received, people fed, and pending requests.  
- **Distribution Planning**: Calculates servings, portion sizes, and distribution times.  
- **Success Stories**: Share and filter community impact stories.  
- **Payment Confirmation**: Validates UPI transactions for transparency.

![RO Dashboard Screenshot](insert-link-here)  
*Caption: Recipient dashboard with real-time metrics.*

#### Admin Panel
- **Urgent Needs**: Add/edit/delete urgent food requests with deadlines and event types.  
- **Food Offers**: Manage listings with location and expiry details.  
- **User Oversight**: View/edit profiles, assign badges (currently "NEW_USER").  

![Admin Urgent Needs Screenshot](insert-link-here)  
*Caption: Admin interface for managing urgent food needs.*

#### Analytics Dashboard
- Metrics: Total donations, requests, active users, top donors.  
- Visualized for Admins and Analysts.

---

## 🛠️ Installation & Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/slack-to-surplus.git
