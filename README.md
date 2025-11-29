#  Slack To Surplus 🍲 
## React + Vite & Spring Boot + AWS Deployement

# DEPLOYED LINK (Elastic Bean Stalk, S3, CICD, AIVEN, EC2) #
http://s2s-frontend-1702.s3-website-us-east-1.amazonaws.com/
[Link](http://s2s-frontend-1702.s3-website-us-east-1.amazonaws.com/)

Welcome to **Slack To Surplus**, a food donation management system designed to turn surplus food into solutions for hunger. By connecting donors with recipients, we reduce food waste and promote food security—one donation at a time.

![Homepage Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531892/photo_7_2025-03-21_10-05-37_nzq5cu.jpg)  
*Caption: The homepage feed raises awareness about food waste and showcases active donation posts.*

---

## 🌟 Project Overview

*Slack To Surplus* bridges the gap between individuals/organizations with surplus food and those in need, like NGOs. Built with a modern tech stack, it’s a user-friendly platform with robust features for donation tracking, user engagement, and education.

## Tech Stack

**Backend:** ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=springboot&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)  
**Frontend:** ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)  
**Storage:** Local storage for user data (no HttpSession)  
**Deployment:**  ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)  ![AWS EC2](https://img.shields.io/badge/EC2-F8991D?logo=amazonaws&logoColor=white)  ![CI/CD](https://img.shields.io/badge/CI%2FCD-232F3E?logo=amazonaws&logoColor=white)  ![CodeBuild](https://img.shields.io/badge/CodeBuild-FF9900?logo=amazonaws&logoColor=white)  ![CodeDeploy](https://img.shields.io/badge/CodeDeploy-FF9900?logo=amazonaws&logoColor=white)  
**CI/CD Tools:** ![CodeBuild](https://img.shields.io/badge/CodeBuild-FF9900?logo=amazonaws&logoColor=white) ![CodeDeploy](https://img.shields.io/badge/CodeDeploy-FF9900?logo=amazonaws&logoColor=white)  
**Repo & Pipeline:** ![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)  
**Design Choice:** No DTOs for streamlined development  

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

![Donation Flow Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531891/photo_13_2025-03-21_10-05-37_g69kme.jpg)  
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

![Donation Listings Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531890/photo_8_2025-03-21_10-05-37_bihvcy.jpg)  
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

![RO Dashboard Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531893/photo_1_2025-03-21_10-05-37_jg2my5.jpg)
![RO Distribution planning Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531890/photo_10_2025-03-21_10-05-37_nz865n.jpg)
![Payment](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531893/photo_2_2025-03-21_10-05-37_ll17od.jpg)  

*Caption: Recipient dashboard with real-time metrics.*

#### Admin Panel
- **Urgent Needs**: Add/edit/delete urgent food requests with deadlines and event types.  
- **Food Offers**: Manage listings with location and expiry details.  
- **User Oversight**: View/edit profiles, assign badges (currently "NEW_USER").  

![Admin Urgent Needs Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531888/photo_15_2025-03-21_10-05-37_zbi22o.jpg)  
*Caption: Admin interface for managing urgent food needs.*

#### Analytics Dashboard
- Metrics: Total donations, requests, active users, top donors.  
- Visualized for Admins and Analysts.

---


## Screenshots & Demo

| Feature            | Screenshot | Link |
|--------------------|------------|------|
| Homepage Feed      | ![Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531892/photo_7_2025-03-21_10-05-37_nzq5cu.jpg) | [Link](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531892/photo_7_2025-03-21_10-05-37_nzq5cu.jpg) |
| Donation Flow      | ![Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531891/photo_13_2025-03-21_10-05-37_g69kme.jpg) | [Link](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531891/photo_13_2025-03-21_10-05-37_g69kme.jpg) |
| Donation Listings  | ![Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531890/photo_8_2025-03-21_10-05-37_bihvcy.jpg) | [Link](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531890/photo_8_2025-03-21_10-05-37_bihvcy.jpg) |
| RO Dashboard       | ![Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531893/photo_1_2025-03-21_10-05-37_jg2my5.jpg) | [Link](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531893/photo_1_2025-03-21_10-05-37_jg2my5.jpg) |
| Admin Panel        | ![Screenshot](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531888/photo_14_2025-03-21_10-05-37_sibpnb.jpg) | [Link](https://res.cloudinary.com/dovvc3hvb/image/upload/v1742531888/photo_14_2025-03-21_10-05-37_sibpnb.jpg) |

**Demo Video:**  
[Watch Here](https://youtu.be/92kesGeA4TE?si=Mf_LS1EjDh5KfFNx) — *A walkthrough of Slack To Surplus in action.*

## API Endpoints (Optional)

| Endpoint                                          | Method | Description                           |
|---------------------------------------------------|--------|---------------------------------------|
| `/api/auth/login`                                 | POST   | Authenticate user                       |
| `/api/donations`                                  | GET    | Fetch active donation posts             |
| `/api/requests`                                   | POST   | Submit a donation request               |
| `/requests/4/cancel`                              | POST   | Cancel a donation request               |
| `/requests/5/confirm`                             | POST   | Confirm a donation request              |
| `/requests/create?offerId=3&requesterId=1`        | POST   | Create a donation request               |
| `/profile/details?username=vishnu1702`            | GET    | Fetch user profile details              |
| `/requests/user/6`                                | GET    | Fetch all requests made by a user       |


### API Documentation

[![Postman API Docs](https://img.shields.io/badge/Postman-API-blue?logo=postman)](https://documenter.getpostman.com/view/36780156/2sAYkGLK3t)

You can explore and test all API endpoints using the Postman documentation linked above.

## Contributing
We'd love your help!

1. Fork the repo.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Submit a pull request with a clear description of your changes.

---

