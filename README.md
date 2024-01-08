# Axlr Backend

## Overview

Axlr Backend is a Node.js server designed for the Axlr project. It includes a JavaScript-based web scraper to extract data from Flipkart for simulation purposes. The backend serves as a crucial component to support the overall functionality of the Axlr project.

## Setup

1. **Environment Variables:**
   - Duplicate the `.env.template` file and rename it to `.env`.
   - Fill in the required environment variables in the `.env` file.

2. **Install Dependencies:**
   ```bash
   npm install
3. **Run Server:**
   ```bash
   npm run dev

### Functionality
## 1) User Login API with Token
## 2) Products Upload API with Token Verification
## 3) Custom Search API

### Objective
Implement a secure user login API that returns an authentication token upon successful login.
Allow users to upload product data from an Excel sheet. Verify the user using an authentication token and save the data in the database.
Implement a custom search API similar to Flipkart's search functionality.

