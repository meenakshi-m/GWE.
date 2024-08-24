About

GWE (Grievance Web Application) is a web-based platform that allows users to submit, track, and manage grievances. The application includes both user and admin functionalities. Users can register, log in, and submit grievances, while admins can view, manage, and resolve grievances through a dedicated admin dashboard.
Features

    User Registration and Login: Users can register and log in to the platform.
    Grievance Submission: Users can submit grievances and upload supporting documents.
    Grievance Tracking: Users can view the status of their submitted grievances.
    Admin Dashboard: Admins can view all grievances, update their status, and manage the system.
    Responsive Design: The application is fully responsive and works on various devices.

Installation
Prerequisites

    Node.js
    MongoDB
    Git

Steps

    Clone the repository:

    bash

git clone https://github.com/meenakshi-m/GWE..git

Navigate to the project directory:

bash

cd GWE

Install dependencies:

bash

npm install

Set up environment variables:

Create a .env file in the root of your project and add the following:

env

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Start the development server:

bash

    npm start

    The application should now be running on http://localhost:5000.

Usage
User

    Register: Sign up with a new account.
    Login: Use your credentials to log in.
    Submit Grievance: Fill out the grievance form and submit it.
    View Grievance Status: Check the status of submitted grievances in your profile.

Admin

    Login: Admins use the same login page.
    Access Dashboard: After login, admins are redirected to the dashboard.
    Manage Grievances: View, update, and resolve grievances from the dashboard.

Technologies Used

    Frontend:
        HTML5
        CSS3
        JavaScript
        jQuery

    Backend:
        Node.js
        Express.js
        MongoDB
        Mongoose

    Authentication:
        JSON Web Tokens (JWT)

    Deployment:
        GitHub Pages (for static content)
        (Optional) Heroku or Vercel for dynamic content

Screenshots

(Insert screenshots of your application here)
Contributing

    Fork the repository.
    Create a new feature branch (git checkout -b feature/your-feature-name).
    Commit your changes (git commit -m 'Add some feature').
    Push to the branch (git push origin feature/your-feature-name).
    Open a Pull Request.

License

This project is licensed under the MIT License - see the LICENSE file for details.
Contact

For any inquiries, please contact:

    Meenakshi M
    Email: 2020meenakshi@example.com
