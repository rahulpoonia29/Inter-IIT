# Inter IIT Task

## Overview

This is the repositery for Inter IIT Task 2024, a tree view was to be made with item showcase and backend integration.

## Tech Stack

### Backend

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Prisma (ORM) and Postgresql

### Frontend

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand

## Project Structure
```
    backend
        ├── controllers/
        ├── data/
        ├── prisma/
        ├── routes/
        ├── .env
        └── package.json

    frontend
        ├── app/
        ├── store/
        ├── components/
        ├── public/
        ├── utils/
        ├── .env.local
        ├── next.config.mjs
        ├── package.json
        └── tsconfig.json
```



    
## Backend

### Setup

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the environment variables by copying `.env`and updating the values.

```env
DATABASE_URL="your-database-url"
```

4. Run the Prisma migrations to set up the database schema:
    ```sh
    npx prisma migrate dev
    ```

5. Start the backend server:
    ```sh
    npm run dev
    ```


### API Endpoints

- **Godowns**:
  - `GET /api/v1/godowns/all`: Get all godowns.
  - `GET /api/v1/godowns/parent`: Get all parent godowns.
  - `GET /api/v1/godowns/id`: Get godown by ID.
  - `GET /api/v1/godowns/search`: Search godowns by name.

- **Items**:
  - `GET /api/v1/items/search`: Search items.

- **Upload**:
  - `GET /api/v1/upload`: Upload data.

## Frontend

### Setup

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the environment variables by copying `.env` and updating the values.
```env
NEXT_PUBLIC_BACKEND_URL="http://localhost:5000" (Update as needed)
```

4. Start the development server:
    ```sh
    npm run dev
    ```
