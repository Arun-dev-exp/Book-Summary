# Book Summary
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Arun-dev-exp/Book-Summary.git)

A full-stack web application for creating, managing, and browsing a personal collection of book summaries. The application features a dynamic, modern interface and is built with Node.js, Express, and PostgreSQL.

## Features

-   **CRUD Operations:** Full capability to Create, Read, Update, and Delete book summaries.
-   **Dynamic Homepage:** Displays all book summaries in a responsive grid layout.
-   **Sorting Functionality:** Sort summaries by date, rating, or title in ascending or descending order.
-   **Book Cover Integration:** Automatically fetches and displays book covers from the [Open Library API](https://openlibrary.org/dev/docs/api/covers) using the book's OLID (Open Library ID).
-   **Detailed View:** A dedicated page to view the full text of a book summary.
-   **Responsive Design:** A clean, dark-themed UI that works seamlessly on desktop and mobile devices.

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** PostgreSQL
-   **Templating:** EJS (Embedded JavaScript)
-   **Styling:** CSS3 with custom properties for theming.
-   **Dependencies:** `pg` for database connection, `dotenv` for environment variable management.

## Setup and Installation

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Arun-dev-exp/Book-Summary.git
cd Book-Summary
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the PostgreSQL Database

-   Ensure you have PostgreSQL installed and running.
-   Create a new database for the project.
-   Connect to your database and run the following SQL command to create the necessary table:

```sql
CREATE TABLE book_summary (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    summary_date DATE NOT NULL,
    rating NUMERIC(3, 1) CHECK (rating >= 1 AND rating <= 5),
    book_cover_id VARCHAR(50) NOT NULL
);
```

### 4. Configure Environment Variables

-   Create a file named `.env` in the root directory of the project.
-   Add your database connection details to this file.

```env
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_DATABASE=your_database_name
DB_HOST=localhost
DB_PORT=5432
```

### 5. Run the Application

```bash
node index.js
```

The application will be running at `http://localhost:3000`.

## How to Use

1.  Navigate to the homepage (`http://localhost:3000`) to see all existing book summaries.
2.  Click the **"New Post"** button to add a new summary.
3.  On the form, provide:
    *   **Book Title:** The title of the book.
    *   **Summary:** Your notes and summary of the book.
    *   **Rating:** A score from 1 to 5.
    *   **Cover ID:** The **Open Library ID (OLID)** for the book. You can find this on the book's page on [OpenLibrary.org](https://openlibrary.org). For example, the OLID for "The Hobbit" is `OL27448W`.
4.  Use the **Sort by** and **Order** dropdowns on the homepage to organize the book list.
5.  On each book card, you can:
    *   Click **"Read Full"** to see the complete summary.
    *   Click **"Edit"** to modify the summary details.
    *   Click **"Delete"** to remove the summary from your collection.

## API Endpoints

The application uses the following routes to manage data:

| Method | Route                  | Description                                                        |
| :----- | :--------------------- | :----------------------------------------------------------------- |
| `GET`  | `/`                    | Displays the homepage with all book summaries.                     |
| `GET`  | `/new-post`            | Renders the form for creating a new summary.                       |
| `POST` | `/post`                | Handles the creation of a new summary and saves it to the database. |
| `GET`  | `/post/:id`            | Renders the form to edit an existing summary.                      |
| `POST` | `/update-post/:id`     | Updates a specific summary in the database.                        |
| `GET`  | `/delete-post/:id`     | Deletes a specific summary from the database.                      |
| `GET`  | `/view/:id`            | Displays the full details of a single summary.                     |