# Frontend Application

This README provides instructions to build and run the frontend application using Docker and Docker Compose.

## Prerequisites

Make sure you have the following installed on your local machine:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

# Build and Run the Application
## Step 1: Clone the Repository

Clone the repository containing the frontend application code to your local machine:

```
git clone https://gitlab.fit.cvut.cz/gordeser/arthub_frontend
cd Arthub_frontend
```

## Step 2: Set backend URL and port
Update the values of `REACT_APP_API_URL` and `REACT_APP_API_PORT` in `docker-compose.yml` file to match the backend server's URL and port

## Step 3: Build the Docker Image
Build the Docker image for the frontend service by running:

```
docker-compose build
```

## Step 4: Start the Frontend Service
Start the frontend service using Docker Compose:
```
docker-compose up
```
The frontend application will be available at http://localhost:3000.

## Step 5: Stop the Frontend Service
To stop the frontend service, press Ctrl+C in the terminal where the service is running or run:
```
docker-compose down
```