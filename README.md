# Pizza Order Management System

## YouTube Video of the website:
[Watch the demo](https://youtu.be/JDG__LA9xFs)

## Overview
This project is a Pizza Order Management System built with Spring Boot. It allows users to create accounts, customize pizzas with a variety of ingredients, place orders, and view their order history. Admins can manage users and orders through an admin panel.

## Prerequisites
- Java 17 or later
- Maven 3.6.3 or later
- XAMPP for Apache and MySQL

## Setup
1. Clone the project from GitHub
2. Load Maven
3. Open XAMPP as administrator, activate Apache and MySQL
4. In MySQL (port 3306), open the admin option and create the database "ex5"
5. Run the project
6. Open `localhost:8080` and enjoy the website

## Features

### User Registration and Authentication:
- Users can sign up and log in.
- Admins can block/unblock users.

### Pizza Customization:
- Users can build pizzas with a variety of ingredients.

### Order Management:
- Users can place orders and view their order history.
- Admins can manage and update orders.

### Admin Panel:
- Admins can manage users (block/activate or delete) and orders through the admin interface.

## Project Structure:
- **Model**: Contains entity classes like User, Order, Pizza, and Ingredient.
- **Repository**: Interfaces for database operations.
- **Service**: Business logic and service methods.
- **Controller**: REST controllers for handling HTTP requests.

## Assumptions:
- The website uses the Bootstrap CDN, so an internet connection is required.

## Execution:
- The submission is a Spring Boot project that can be run directly from the IDE.

## Localhost:
The website runs on `localhost:8080` for Spring Boot, but `localhost:3000` is assumed in the execution section.

## Made by:
- **Daniel Korik**  
  Email: danielko@edu.hac.ac.il

- **Maor Man**  
  Email: maorma@edu.hac.ac.il

## GitHub Project:
[GitHub Repository](https://github.com/danielkorik/pizza-website-Spring-Boot)
