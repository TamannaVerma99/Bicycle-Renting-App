# Bicycle Renting Application: Your Gateway to Convenient Bicycles Renting

Welcome to the **Bicycle Rental Application**, a comprehensive platform designed to streamline the process of renting bicycles and managing rentals. This application serves as a user-friendly solution for both users and administrators, ensuring seamless bicycle rental experiences and efficient management.

## Key Features
### User Registration and Authentication

1. **User Account Creation:** Users can securely create their accounts with necessary details, ensuring a personalized experience.

2. **Authentication:** The application provides a secure authentication mechanism, allowing registered users to log in using their credentials.

3. **User and Admin Differentiation:** The registration process includes distinguishing between user and admin types, setting the stage for differentiated access and functionality.

### Bicycle Addition and Availability

1. **Bicycle Registration:** Both users and admins have the capability to add bicycles to the application. This dynamic feature populates the bicycle inventory.

2. **Initial Availability Setting:** When bicycles are added, they are initially set as available for rent, ensuring a seamless browsing experience for users.

### Bicycle Availability Listing

1. **Accessible Bicycles:** A dedicated page showcases all available bicycles that users can rent. This listing simplifies the process of selecting a bicycle for rent.

### Rent Request Submission

1. **User-Initiated Rent Requests:** Users can submit rent requests for the bicycles they wish to rent. This initiates the process of renting a bicycle.

2. **Pending Rent Requests:** Rent requests are recorded as pending, reflecting that the request is under review by the system and admin.

### Admin Approval for Rent Requests

1. **Admin Review:** Admins have the authority to view and review pending rent requests. This step ensures proper oversight and validation of user requests.

2. **Bicycle Renting Process:** Once approved by an admin, the requested bicycle is marked as rented, and a rental entry is generated, indicating the bicycle's status change.

### Rental Management and Completion

1. **User Rental Overview:** Users can access a dedicated section to view their rented bicycles and track the status of their active rentals.

2. **Rental Completion:** When users complete their rental duration, the application calculates the rental cost, providing users with an accurate summary of their rental experience.

### Return Request Submission

1. **Returning Rented Bicycles:** Users can initiate return requests for the bicycles they've rented. This step marks the end of the rental period.

2. **Pending Return Requests:** Similar to rent requests, return requests are initially marked as pending until admin validation.

### Admin Validation for Return Requests

1. **Admin Review of Returns:** Admins can validate pending return requests, verifying that the bicycles have been returned as per the user's request.

2. **Bicycle Availability Update:** After validation, the bicycles are marked as available, allowing them to be rented by other users, while the rental status is updated accordingly.

## Technologies Used

- **Backend:** Node.js, Express.js, mysql2
- **Frontend:** React
- **Authentication:** JWT (JSON Web Tokens)

## Prerequisites
1. Create a database to save all the data for the project in the MySQL server you are using(either localhost or some other hosted server)
   
   ### Create database
   ```sql
      /* create database */
      create database <database_name> ;
   
2. Create .env file in backend folder
   ## contents of the file
   ```env
      MYSQL_HOST=""       # mysql host
      MYSQL_USER=""       # mysql user
      MYSQL_PASSWORD=""   # mysql password
      MYSQL_DATABASE=""   # mysql database name
      SECRET_KEY=""       # secret key to hash password
   
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/bicycle-app.git
   
2. Install the dependencies for the backend:
   ```bash
   cd bicycle-app/backend
   npm install
   
3. Install the dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   
4. Start the backend server:
   ```bash
   cd ../backend
   node index.js

6. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start

## Demo Video  
[![Watch the video](https://img.youtube.com/vi/5FF3u7K0S-A/hqdefault.jpg)](https://www.youtube.com/embed/5FF3u7K0S-A)


## Get Rolling

Experience the convenience of bicycle rentals with the Bicycle Rental Application. Register, rent, ride, and return bicycles seamlessly, all while enjoying a user-friendly interface and efficient management.

Happy Riding!
