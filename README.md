# SRV'D MVP – Order Routing System

## Stack

- ReactJS + MUI
- NodeJS + Express + Sequelize
- PostgreSQL

## Run an app

- Before running the app we should run the migrations and seeds using the following commands
- npm run migrate | npm run seed
- Server: npm run dev
- Client: npm run dev

## Features

- Admin dashboard with filterable order list
- Status updates for orders
- Borough-based batch route optimization
- Real-time alert system for batch thresholds

## Routing Logic

- Orders grouped by borough
- Batches of 5 dispatched per fleet

## What I'd do next

- Add driver assignments
- Track delivery lifecycle
- Optimize based on geo-coordinates (e.g., Google Maps API)
