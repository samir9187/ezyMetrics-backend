# EzyMetrics Backend

EzyMetrics is a backend application designed to manage leads and marketing campaigns. It includes functionalities for extracting, transforming, and loading data into a MongoDB database, as well as generating reports in PDF and CSV formats.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [ETL Process](#etl-process)
- [License](#license)

## Features

- Retrieve leads and campaigns data.
- Generate reports in PDF and CSV formats.
- ETL (Extract, Transform, Load) process for managing and formatting data.
- Notification system for high lead counts (alerts sent if the number of leads exceeds 150).

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing leads and campaigns data.
- **Mongoose**: ODM for MongoDB and Node.js.
- **PDFKit**: Library for generating PDF documents.
- **CSV Writer**: Library for creating CSV files.
- **Nodemailer**: Module for sending emails.
- **dotenv**: Module for environment variable management.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas account)

### Clone the Repository

```bash
git clone <repository-url>
cd ezymetrics-backend
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

1. Create a `.env` file in the root of your project.
2. Add the following variables:

```
MONGODB_URI=<your_mongodb_connection_string>
EMAIL_USER=<your_email_address>
EMAIL_PASS=<your_email_password>(Don't use normal password , use your newly generated app password)
```

## Usage

To start the server, run:

```bash
node app.js
```

## API Endpoints

### 1. Retrieve Leads

- **GET** `/crm/leads`

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "leadId": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "source": "Google"
    },
    {
      "leadId": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "source": "Facebook"
    }
  ]
}
```

### 2. Retrieve Campaigns

- **GET** `/marketing/campaigns`

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "name": "Campaign 1",
      "startDate": "2024-10-01",
      "endDate": "2024-10-20",
      "budget": 1000,
      "status": "active"
    },
    {
      "name": "Campaign 2",
      "startDate": "2024-10-05",
      "endDate": "2024-10-25",
      "budget": 2000,
      "status": "active"
    }
  ]
}
```

### 3. Generate PDF Report

- **GET** `/report/pdf`

**Response:** A PDF file download with leads and campaigns data.

### 4. Generate CSV Report

- **GET** `/report/csv`

**Response:** A CSV file download containing leads data.

## ETL Process

The ETL process is handled in the `ExtractTransformLoad.js` file, where data is extracted from JSON files, transformed (e.g., changing the source to uppercase), and loaded into the MongoDB database.

### How to Trigger the ETL Process

The ETL process is automatically triggered when the server starts. It will format the data and insert it into the MongoDB database.

### Notification for High Lead Count

If the number of leads exceeds 150 or number of campaigns exceeds 150 , a notification email will be sent to the specified address. This feature helps in monitoring lead generation and campaign generation effectively.

## License

This project is licensed under the ISC License.
