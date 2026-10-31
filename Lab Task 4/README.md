# Product Inventory API

A single-entity CRUD API built with NestJS, TypeORM, and PostgreSQL for Lab Task 04.

## Requirements
- Node.js 18+
- PostgreSQL
- npm

## Setup

1. Create the PostgreSQL database:

```sql
CREATE DATABASE product_inventory_db;
```

2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and enter your PostgreSQL credentials.

4. Start the API:

```bash
npm run start:dev
```

The API runs at `http://localhost:3000`.

> `synchronize: true` is enabled for this development lab only. Do not use it in production.

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/products` | Create a product |
| GET | `/products` | List products, newest first |
| GET | `/products/search?keyword=phone` | Search product names (case-insensitive) |
| GET | `/products/category/Electronics` | Filter by category |
| GET | `/products/:id` | Get one product |
| PATCH | `/products/:id` | Partially update a product |
| PUT | `/products/:id` | Replace product fields (all required fields must be sent) |
| DELETE | `/products/:id` | Delete a product |
| PATCH | `/products/:id/toggle` | Toggle active status |

Specific routes (`search` and `category/:cat`) are declared before `:id`.

## Example create request

`POST /products`

```json
{
  "name": "iPhone 15",
  "price": 999.99,
  "stock": 50,
  "category": "Electronics"
}
```

## Lab test data

Create the four products listed in the lab PDF:
- iPhone 15 — 999.99 — stock 50 — Electronics
- Samsung TV — 499.99 — stock 20 — Electronics
- Running Shoes — 89.99 — stock 100 — Sports
- Notebook — 4.99 — stock 200 — Stationery

Then test the routes and validation cases in section 10 of the lab sheet.
