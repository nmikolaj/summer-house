
# Summer House

A responsive website for managing and booking a summer house, built with vanilla HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

## Features
- **Responsive Design**: Utilizes CSS Media Queries for seamless experience across all devices.
- **Dynamic Booking System**: Calendar for searching available dates, managed through an admin panel.
- **Real-Time Availability**: Bookings are dynamically fetched and updated from a MongoDB database.
- **Admin Panel**: Allows the owner to manage bookings (add, view, delete).
- **High-Contrast Mode**: Accessibility feature for visually impaired users.

## Screenshots


| <img width="290" alt="user_mobile" src="https://github.com/user-attachments/assets/36f4dc0d-3e3e-4686-b9a8-e537606c3587"> | <img width="600" alt="admin_panel" src="https://github.com/user-attachments/assets/308149e8-65be-43cd-b8c0-d5206aa85e06"> |
|:---------------------------------------:|:---------------------------------------:|
| User's Calendar (Mobile)                | Admin Panel                          |

## Technologies Used

| **Frontend**  | **Description** |
| -------------------------  | -------------------------- |
| HTML/CSS                   | Structure and styling.  |
| JavaScript (Vanilla JS)    | Handling interactivity, calendar, dynamic price list. |
| AOS Library           | Animations and smooth transitions. |

| **Backend**  | **Description**  |
| -------------------------   | -------------------------- |
| Node.js | Server-side JavaScript runtime. |
| Express.js | Web framework for Node.js.   |
| MongoDB | Storing booking data. |
| Mongoose | Object Data Modeling (ODM) library for MongoDB. |
| REST API | Communication between frontend and backend. |

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```console
    git clone https://github.com/nmikolaj/summer-house.git
    cd summer-house-booking
    ```

2. **Install dependencies**:
    ```console
    npm install
    ```

3. **Set up environment variables**:
    Create a \`.env\` file in the root directory and add your MongoDB connection string:
    ```
    MONGO_URI=your-mongodb-uri
    PORT=3000
    ```

4. **Run the server**:
    ```console
    cd backend
    node server.js
    ```

5. **View in browser**:
- **User's Website**: \public\user\index.html
- **Admin Panel**: \public\admin\index.html

