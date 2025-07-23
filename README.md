# Ecommerce Project

A full-stack Ecommerce application built with React (Vite) and Tailwind CSS (frontend), Node.js & Express (backend), and MySQL (database).

---

## 🛠️ Tech Stack

- **Frontend:** [React (Vite)](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database:** [MySQL](https://www.mysql.com/)

---

## 🚀 Getting Started

### 1. Database Setup

1. Ensure MySQL is installed and running.
2. Open MySQL Workbench (or your preferred client).
3. Copy and execute the `create_schema.sql` file inside the `ecommerce-db` folder to create the required database.

### 2. Backend Setup

1. Navigate to the backend folder:
   ```
   cd ecommerce-server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root of `ecommerce-server`:

   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_root
   DB_PASSWORD=your_root_password
   DB_NAME=ecommerce_db
   DB_DIALECT=mysql
   JWT_SECRET=!@$%^&*1234567890

   ADMIN_NAME=Admin
   ADMIN_EMAIL=admin@admin.com
   ADMIN_PASSWORD=admin123
   ```

   > **Note:** Replace `your_root` and `your_root_password` with your actual MySQL credentials.  
   > **Note:** You can also customize `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` as desired.

4. Start the backend server:
   ```
   npm run start
   ```
   The server should now be running on [http://localhost:3000](http://localhost:3000).

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```
   cd ecommerce-client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root of `ecommerce-client`:

   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   The app will likely run on [http://localhost:5173](http://localhost:5173) by default.

---

## ⚡ Optional: Generate Sample Products

You can populate the product list with sample data:

1. Execute the `generate_products.sql` script from the `ecommerce-db` folder.

---

## 📂 Project Structure

ECOMMERCE
├───ecommerce-client
│ ├───public
│ └───src
│ ├───api
│ ├───assets
│ ├───components
│ ├───context
│ └───pages
│ ├───Admin
│ └───Auth
├───ecommerce-db
└───ecommerce-server
├───config
├───controllers
├───middlewares
├───models
├───queries
├───routes
└───utils
