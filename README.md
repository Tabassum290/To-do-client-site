# FLOW_TASK

## Short Description

This project is about TaskManagement. It allows users to add their to-do list , they can edit their tasks and delete tasks. A task has three category - To-Do,In-Progess and Done Status. Also user can Drag and drop one category to another. 
## Live Links

- **Live Site**: (https://flowtask-29.netlify.app/)

## Dependencies

This project uses the following dependencies:
### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **React-dnd**: A javascript framework for building Drag and Drop functionality.
- **Firebase**: For user Authentication.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Netlify**: Platform for frontend deployment (used for deployment).
- **MongoDB**: Database for storing data.
- **dotenv**: Loads environment variables from a `.env` file.
- **React-Toastify**:For showing success and error message . 
- **Sweet Alert**:For showing success and error message .

### Backend:
- **Express**: Web framework for Node.js to handle requests.
- **MongoDB**: Database for storing user data and tasks.
- **dotenv**: Loads environment variables for the backend.
- **jsonwebtoken (JWT)**: Used for handling user authentication.
- **MongoDB**: Database for storing data.
- **Vercel**: Platform for backend deployment.

To see the complete list of dependencies, check the `package.json` file.

## Installation Steps For Frontend

Follow these steps to get the project running locally:

1. **Clone the repository Client-Site**:
   ```bash
   git clone https://github.com/Tabassum290/flow-task-client-site
   cd flow-task-client-site

2. **Clone the repository Client-Site**:
   ```bash
   git clone https://github.com/Tabassum290/Flowtask-server-site
   cd Flowtask-server-site
3. **Install dependencies: Install the required dependencies using npm or yarn**:
npm install
# or if you use yarn:
yarn install

4. **Add Environment Variables**:
Create a .env file in the root of your project (if it doesn't exist).
Add the following variables:
DB_USER=your-db-username
DB_PASS=your-db-password
API_KEY=your-api-key

5. **Start the Development Server: Run the following command to start the app locally**:
npm start
# or if you use yarn:
yarn start
This will start the development server, and you can view the app in your browser at http://localhost:5173.

## Technologies Used
- React: Frontend JavaScript framework for building user interfaces.
- Tailwind CSS: Utility-first CSS framework for styling the app.
- Node.js: JavaScript runtime for the backend.
- MongoDB: NoSQL database for data storage.
- Vercel: Deployment platform for both frontend and backend (serverless functions).
- dotenv: For managing environment variables securely.