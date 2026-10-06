# Store App Frontend

React + Vite + Tailwind CSS frontend for the learning store backend.

## Run

```bash
npm install
npm run dev
```

By default the frontend expects the backend at:

```text
http://localhost:3000/api
```

If your backend uses another port, create `.env`:

```text
VITE_API_URL=http://localhost:YOUR_PORT/api
```

Then restart Vite.

## Pages

- `/` Home
- `/products` Product listing
- `/products/:id` Product details
- `/admin` Create, update and delete products
