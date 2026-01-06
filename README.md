# Legal House - AI-Powered Legal Document Management System

Legal House is an intelligent legal document review system that automates case analysis, generates AI-powered summaries of legal documents, and provides quick insights for law firms, courts, and legal professionals. The system leverages advanced natural language processing to streamline the legal workflow.

---

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Installation & Setup](#-installation--setup)
- [Application Flow](#-application-flow)
- [AI Model Configuration](#-ai-model-configuration)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [Contributors](#-contributors)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)

---

## 🚀 Features

### Core Features
1. **User Management**
   - Create and manage user profiles with contact details
   - Store user information (name, email, phone, address)
   - Link users to their respective cases

2. **Case Management**
   - Create new legal cases with detailed information
   - Upload legal documents (PDF format) for each case
   - Track case creation and resolution timestamps
   - Monitor case status (resolved/unresolved)

3. **Document Upload & Storage**
   - Secure PDF file upload functionality
   - File validation and size restrictions (10MB limit)
   - Organized file storage system with unique filenames
   - Direct access to uploaded documents via links

4. **AI-Powered Document Summarization**
   - Automated text extraction from PDF documents
   - Intelligent case summarization using local AI model (Ollama)
   - Point-wise structured summaries for easy comprehension
   - Real-time streaming response from AI model

5. **Case Status Tracking**
   - Differentiate between resolved and unresolved cases
   - Automatic status updates upon case resolution
   - Timestamp tracking for creation and resolution
   - Dashboard with case statistics

6. **View & Filter Cases**
   - View all unresolved cases requiring attention
   - Access resolved cases with their summaries
   - Quick access to case documents
   - Detailed case information display

7. **Dashboard Analytics**
   - Active cases count
   - Resolved cases count
   - Total documents processed
   - Recent cases overview

---

## 🛠 Tech Stack

### Frontend
- **React.js (v19.0.0)** - Modern JavaScript library for building user interfaces
- **Vite (v6.2.0)** - Fast build tool and development server
- **React Router DOM (v7.4.1)** - Client-side routing
- **Tailwind CSS (v3.4.1)** - Utility-first CSS framework
- **ShadCN UI** - Reusable component library built on Radix UI
- **Lucide React (v0.485.0)** - Beautiful icon library
- **Axios (v1.8.4)** - HTTP client for API requests
- **Sonner (v2.0.2)** - Toast notifications
- **Marked (v15.0.7)** - Markdown parser (for formatted summaries)

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js (v4.21.2)** - Web application framework
- **PostgreSQL** - Relational database management system
- **node-postgres (pg v8.14.1)** - PostgreSQL client for Node.js
- **Multer (v1.4.5-lts.2)** - Middleware for handling file uploads
- **pdf-parse (v1.1.1)** - PDF text extraction library
- **node-fetch (v3.3.2)** - Fetch API for Node.js
- **CORS (v2.8.5)** - Cross-Origin Resource Sharing middleware
- **dotenv (v16.4.7)** - Environment variable management

### AI/ML Model
- **Ollama** - Local AI model server
- **Deepseek R1 (1.56B)** - Pretrained language model for text summarization
  - Model Type: Generative text model
  - Running locally on port 11434
  - Streaming response capability
  - Optimized for document summarization tasks

### Database
- **PostgreSQL** - Production-grade relational database
  - Connection pooling for efficient resource management
  - Foreign key constraints for data integrity
  - Timestamp tracking for audit trails

---

## 🏗 System Architecture

```
┌─────────────────┐
│   React.js UI   │
│   (Frontend)    │
└────────┬────────┘
         │ HTTP Requests (Axios)
         ↓
┌─────────────────┐
│  Express.js API │
│   (Backend)     │
└────┬───────┬────┘
     │       │
     ↓       ↓
┌─────────┐ ┌──────────────┐
│PostgreSQL│ │Ollama AI Model│
│ Database │ │  (Local)      │
└──────────┘ └──────────────┘
```

### Request Flow:
1. **User Interaction** → React frontend receives user input
2. **API Request** → Axios sends HTTP request to Express backend
3. **Data Processing** → Express controllers handle business logic
4. **Database Operations** → PostgreSQL stores/retrieves data
5. **AI Processing** → Ollama model generates summaries
6. **Response** → Data sent back through the chain to frontend

---

## 🗄 Database Schema

### 1. Users Table
Stores information about legal professionals, clients, or case owners.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    phone_no VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL
);
```

**Fields:**
- `id` - Auto-incrementing primary key
- `user_name` - Full name of the user
- `phone_no` - Contact phone number
- `email` - Email address
- `address` - Physical address

### 2. Cases Table
Stores legal case information and links to users.

```sql
CREATE TABLE cases (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    case_name VARCHAR(255) NOT NULL,
    case_file_link VARCHAR(255) NOT NULL,
    case_resolve_file_link TEXT,
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_timestamp TIMESTAMP,
    resolve_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Fields:**
- `id` - Auto-incrementing primary key
- `user_id` - Foreign key linking to users table
- `case_name` - Name/title of the legal case
- `case_file_link` - Path to uploaded PDF document
- `case_resolve_file_link` - AI-generated summary text
- `creation_timestamp` - Automatic timestamp when case is created
- `resolved_timestamp` - Timestamp when case is resolved
- `resolve_status` - Boolean indicating if case is resolved (true/false)

**Relationships:**
- One user can have multiple cases (One-to-Many)
- CASCADE delete ensures cases are removed when user is deleted

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Endpoints

#### 1. Create User
**POST** `/create/user`

Creates a new user in the system.

**Request Body:**
```json
{
  "user_name": "John Doe",
  "phone_no": "1234567890",
  "email": "john@example.com",
  "address": "123 Main Street, City"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "data": [
    {
      "id": 1,
      "user_name": "John Doe",
      "phone_no": "1234567890",
      "email": "john@example.com",
      "address": "123 Main Street, City"
    }
  ]
}
```

---

#### 2. Create Case
**POST** `/create/case`

Creates a new case and uploads associated PDF document.

**Content-Type:** `multipart/form-data`

**Request Body:**
- `user_id` (number) - ID of the user
- `case_name` (string) - Name of the case
- `case_file_link` (file) - PDF file (max 10MB)

**Response:**
```json
{
  "message": "Case created successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "case_name": "Theft Case",
    "case_file_link": "/uploads/1234567890-document.pdf",
    "resolve_status": false,
    "creation_timestamp": "2024-01-06T10:30:00.000Z"
  }
}
```

---

#### 3. Upload File
**POST** `/create/upload`

Uploads a PDF file to the server.

**Content-Type:** `multipart/form-data`

**Request Body:**
- `case_file_link` (file) - PDF file

**Response:**
```json
{
  "message": "File uploaded successfully",
  "file": "1234567890-document.pdf"
}
```

---

#### 4. View Unresolved Cases
**GET** `/view/view`

Retrieves all cases that haven't been resolved yet.

**Response:**
```json
{
  "message": "Cases retrieved successfully",
  "data": [
    {
      "case_id": 1,
      "case_name": "Theft Case",
      "case_file_link": "/uploads/1234567890-document.pdf",
      "creation_timestamp": "2024-01-06T10:30:00.000Z",
      "resolved_timestamp": null,
      "resolve_status": false,
      "user_id": 1,
      "user_name": "John Doe",
      "phone_no": "1234567890",
      "email": "john@example.com",
      "address": "123 Main Street, City"
    }
  ]
}
```

---

#### 5. View Resolved Cases
**GET** `/view/view-resolve`

Retrieves all cases that have been resolved.

**Response:**
```json
{
  "message": "Cases retrieved successfully",
  "data": [
    {
      "case_id": 2,
      "case_name": "Property Dispute",
      "case_file_link": "/uploads/9876543210-document.pdf",
      "creation_timestamp": "2024-01-05T09:00:00.000Z",
      "resolved_timestamp": "2024-01-06T11:00:00.000Z",
      "resolve_status": true,
      "user_id": 1,
      "user_name": "John Doe",
      "phone_no": "1234567890",
      "email": "john@example.com",
      "address": "123 Main Street, City"
    }
  ]
}
```

---

#### 6. Get Case Summary
**GET** `/view/get-summary?id={case_id}`

Retrieves the AI-generated summary for a specific case.

**Query Parameters:**
- `id` (number) - Case ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "user_id": 1,
    "case_name": "Property Dispute",
    "case_file_link": "/uploads/9876543210-document.pdf",
    "case_resolve_file_link": "Summary text here...",
    "creation_timestamp": "2024-01-05T09:00:00.000Z",
    "resolved_timestamp": "2024-01-06T11:00:00.000Z",
    "resolve_status": true
  }
}
```

---

#### 7. Summarize Case
**POST** `/summarize`

Processes a case document and generates an AI-powered summary.

**Request Body:**
```json
{
  "pdfUrl": "/uploads/1234567890-document.pdf",
  "caseId": 1
}
```

**Response:**
```json
{
  "success": true,
  "output": "**Case Summary:**\n1. Key point one...\n2. Key point two...\n\n**Conclusion:** Overall summary..."
}
```

**Processing Steps:**
1. Fetches PDF from the provided URL
2. Extracts text content from PDF
3. Sends text to Ollama AI model for summarization
4. Streams response from AI model
5. Updates database with summary and resolution status
6. Returns formatted summary to client

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Ollama (for AI model)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/laatu08/SEMICOLON.git
cd SEMICOLON
```

### 2. Database Setup
```bash
# Install PostgreSQL (if not already installed)
# For Ubuntu/Debian:
sudo apt-get install postgresql postgresql-contrib

# For macOS:
brew install postgresql

# Start PostgreSQL service
sudo service postgresql start  # Linux
brew services start postgresql # macOS

# Create database
psql -U postgres
CREATE DATABASE legal_house;
\q
```

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
touch .env

# Add the following to .env file:
DATABASE_URL=postgresql://username:password@localhost:5432/legal_house
PORT=5000
MODEL_NAME=deepseek-r1:1.5b

# Create uploads directory
mkdir uploads

# Start the server
npx nodemon index.js
# OR
npm start
```

The backend server will start on `http://localhost:5000`

### 4. Frontend Setup
```bash
# Open new terminal
cd admin

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on `http://localhost:5173`

### 5. Ollama AI Model Setup
```bash
# Install Ollama
# For Linux:
curl -fsSL https://ollama.com/install.sh | sh

# For macOS:
brew install ollama

# For Windows: Download from https://ollama.com/download

# Start Ollama service
ollama serve

# Pull the Deepseek R1 model (in a new terminal)
ollama pull deepseek-r1:1.5b

# Verify model is running
curl http://localhost:11434/api/generate -d '{
  "model": "deepseek-r1:1.5b",
  "prompt": "Hello"
}'
```

---

## 🔄 Application Flow

### Complete User Journey

#### 1. Home Dashboard
```
User lands on homepage
↓
Sees statistics:
- Active cases count
- Resolved cases count
- Total documents
- Recent cases table
```

#### 2. Create New Case Flow
```
User clicks "New Case" button
↓
Redirected to /create-case page
↓
User fills form:
- Full Name
- Email
- Phone Number
- Address
- Case Name
- PDF File Upload
↓
Form validation
↓
Submit form → API POST /api/v1/create/user
↓
User created in database
↓
API POST /api/v1/create/case (with user_id)
↓
File uploaded to /uploads directory
↓
Case created in database (resolve_status = false)
↓
Success notification shown
```

#### 3. View & Summarize Cases Flow
```
User navigates to /view-case
↓
API GET /api/v1/view/view (fetches unresolved cases)
↓
Table displays all unresolved cases
↓
User clicks "Summarize" button
↓
Modal opens showing case details
↓
API POST /api/v1/summarize triggered
  ├─ Backend fetches PDF from server
  ├─ Extracts text using pdf-parse
  ├─ Sends text to Ollama AI model
  ├─ AI generates structured summary
  └─ Streams response back
↓
API updates database:
  ├─ Sets case_resolve_file_link = summary
  ├─ Sets resolved_timestamp = current time
  └─ Sets resolve_status = true
↓
Summary displayed in modal textarea
↓
User closes modal
↓
Case list refreshes (case removed from unresolved list)
```

#### 4. View Resolved Cases Flow
```
User navigates to /resolve-case
↓
API GET /api/v1/view/view-resolve (fetches resolved cases)
↓
Table displays all resolved cases
↓
User clicks "View Summary" button
↓
API GET /api/v1/view/get-summary?id={case_id}
↓
Modal opens with pre-generated summary
↓
User can read the summary
```

### Technical Flow Diagram

```
Frontend (React)
    │
    ├─→ Create Case
    │     ├─ Form Input
    │     ├─ File Upload
    │     └─ API Call → Backend → Database
    │
    ├─→ View Cases
    │     ├─ Fetch Data
    │     └─ API Call → Backend → Database Query
    │
    ├─→ Summarize
    │     ├─ Trigger AI
    │     ├─ API Call → Backend
    │     │     ├─ Fetch PDF
    │     │     ├─ Extract Text
    │     │     └─ Call Ollama
    │     └─ Update Database
    │
    └─→ View Summary
          └─ Fetch Summary → Backend → Database
```

---

## 🤖 AI Model Configuration

### Ollama Integration

**Model Details:**
- **Name:** Deepseek R1
- **Version:** 1.5B parameters
- **Type:** Generative Pre-trained Transformer
- **Purpose:** Legal document summarization
- **Deployment:** Local inference server

**Configuration:**
```javascript
// API Endpoint
const OLLAMA_URL = "http://localhost:11434/api/generate";

// Model Parameters
{
  "model": "deepseek-r1:1.5b",
  "prompt": "<system_prompt> + <extracted_text>",
  "stream": true
}
```

**Prompt Engineering:**
The system uses a carefully crafted prompt for optimal summarization:

```
You are an advanced AI model specialized in summarizing long texts.
Your task is to generate a structured, point-wise summary of the
given text, capturing key details concisely. Follow these guidelines:

1. Extract the most important points from the text in a clear and
   concise manner.
2. Present the summary in bullet points, avoiding unnecessary details.
3. Maintain clarity and coherence while ensuring completeness.
4. After listing the key points, provide a short conclusion
   summarizing the overall essence of the text.
5. Keep the response brief, to the point, and easy to read.

Here is the text to summarize:
[DOCUMENT_TEXT]
```

**Response Processing:**
- The model returns a streaming response
- Responses are concatenated into a full summary
- `<think>` tags are removed from the output
- Final summary is stored in the database

**Model Performance:**
- Average processing time: 30-60 seconds per document
- Suitable for documents up to 50 pages
- Generates structured, point-wise summaries
- Includes conclusion section

---

## 📁 Project Structure

```
SEMICOLON/
│
├── admin/                          # Frontend React Application
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   └── ui/                # ShadCN UI Components
│   │   │       ├── dialog.jsx     # Modal dialog component
│   │   │       └── navigation-menu.jsx
│   │   ├── lib/
│   │   │   └── utils.js          # Utility functions
│   │   ├── page/
│   │   │   ├── CreateCase.jsx    # Create new case page
│   │   │   ├── Footer.jsx        # Footer component
│   │   │   ├── Home.jsx          # Dashboard home page
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── ResolveCase.jsx   # View resolved cases
│   │   │   └── ViewCase.jsx      # View & summarize cases
│   │   ├── App.css
│   │   ├── App.jsx               # Main app component with routing
│   │   ├── index.css             # Global styles
│   │   └── main.jsx              # Entry point
│   ├── .gitignore
│   ├── components.json           # ShadCN configuration
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                        # Backend Node.js Application
│   ├── controllers/               # Business logic handlers
│   │   ├── case.controller.js    # Case creation logic
│   │   ├── fileUpload.controller.js  # File upload handling
│   │   ├── resolveView.controller.js # Resolved cases view
│   │   ├── summarize.controller.js   # AI summarization logic
│   │   ├── user.controller.js    # User management
│   │   └── view.controller.js    # Unresolved cases view
│   ├── models/                    # Database models
│   │   ├── case.model.js         # Cases table schema
│   │   └── user.model.js         # Users table schema
│   ├── routes/                    # API route definitions
│   │   ├── create.route.js       # Create user/case routes
│   │   ├── summerize.route.js    # Summarization route
│   │   └── view.route.js         # View cases routes
│   ├── uploads/                   # Uploaded PDF files storage
│   ├── .env                       # Environment variables
│   ├── .gitignore
│   ├── db.js                      # Database connection
│   ├── index.js                   # Server entry point
│   └── package.json
│
├── .gitignore
└── README.md                      # This file
```

### Key Files Explanation

**Frontend:**
- `App.jsx` - Main routing configuration
- `Home.jsx` - Dashboard with statistics and recent cases
- `CreateCase.jsx` - Form for creating new cases
- `ViewCase.jsx` - Table of unresolved cases with summarize button
- `ResolveCase.jsx` - Table of resolved cases with summaries
- `dialog.jsx` - Reusable modal component for displaying summaries

**Backend:**
- `index.js` - Express server setup and middleware configuration
- `db.js` - PostgreSQL connection pool
- `case.controller.js` - Handles case creation and file uploads
- `summarize.controller.js` - PDF extraction and AI summarization
- `user.controller.js` - User CRUD operations
- `*.model.js` - Database table creation scripts

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/legal_house

# Server Configuration
PORT=5000

# AI Model Configuration
MODEL_NAME=deepseek-r1:1.5b

# Optional: Node Environment
NODE_ENV=development
```

### Frontend (typically in .env or .env.local)
```env
# API Base URL
VITE_API_URL=http://localhost:5000
```

**Security Note:** Never commit `.env` files to version control. Add them to `.gitignore`.

---

## 📖 Usage Guide

### For Legal Professionals

#### Creating a Case
1. Navigate to the application homepage
2. Click on "New Case" button or go to "Create Case" in navigation
3. Fill in the client/case information:
   - Enter full name of the client
   - Provide email address
   - Add phone number
   - Enter physical address
   - Specify case name/title
   - Upload the legal document (PDF format, max 10MB)
4. Click "Create Case" button
5. Wait for success notification

#### Analyzing a Case
1. Go to "View Case" from navigation menu
2. Browse the list of unresolved cases
3. Click "View File" to review the original document
4. Click "Summarize" button for the desired case
5. Wait for AI processing (30-60 seconds)
6. Review the generated summary in the modal
7. The case is automatically marked as resolved

#### Reviewing Past Cases
1. Navigate to "Resolve Case" page
2. View all previously resolved cases
3. Click "View Summary" to see the AI-generated analysis
4. Review case details and summary

---

## 🤝 Contributors

- **Partha Borah** - Lead Developer
- **Abishesk Prasad** - Backend Developer
- **Nitul Das** - Frontend Developer
- **Sourav Kumar Barman** - Database & AI Integration

---

## 💡 Future Enhancements

### Planned Features
1. **Enhanced AI Capabilities**
   - Improve model efficiency for faster processing
   - Support for larger documents (100+ pages)
   - Multi-language document support
   - Legal terminology recognition and highlighting

2. **Advanced Search & Filtering**
   - Full-text search across cases
   - Filter by date range, status, user
   - Advanced query builder
   - Export search results

3. **Case Law Recommendations**
   - AI-powered similar case suggestions
   - Legal precedent identification
   - Citation extraction and linking

4. **User Authentication**
   - Secure login system
   - Role-based access control (Admin, Lawyer, Clerk)
   - User activity logs
   - Session management

5. **Document Management**
   - Support for multiple file formats (DOCX, TXT, etc.)
   - Document version control
   - Annotation and highlighting features
   - Collaborative editing

6. **Reporting & Analytics**
   - Case resolution time analytics
   - User activity reports
   - PDF export of summaries
   - Custom report generation

7. **Notifications**
   - Email notifications for case updates
   - Real-time alerts
   - Reminder system for pending cases

8. **Mobile Application**
   - React Native mobile app
   - Offline access to summaries
   - Push notifications

9. **Integration Capabilities**
   - Calendar integration
   - Email client integration
   - Court management system APIs
   - Cloud storage integration (Google Drive, Dropbox)

10. **Security Enhancements**
    - End-to-end encryption for documents
    - Two-factor authentication
    - Audit trails
    - GDPR compliance features

---

## 📜 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2024 SEMICOLON Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📩 Contact

For queries, suggestions, or collaboration opportunities:

- **GitHub Repository:** [https://github.com/laatu08/SEMICOLON](https://github.com/laatu08/SEMICOLON)
- **Email:** partha2002borah@gmail.com
- **Phone:** +91 88128-63574
- **Location:** JEC, Garmur, 785007

---

## 🙏 Acknowledgments

- OpenAI and Ollama teams for AI model infrastructure
- PostgreSQL community for robust database system
- React and Vite teams for modern frontend tooling
- ShadCN for beautiful UI components
- All contributors and testers

---

## 📊 System Requirements

### Minimum Requirements
- **CPU:** 2 cores
- **RAM:** 4 GB
- **Storage:** 10 GB free space
- **OS:** Windows 10, macOS 10.15+, Ubuntu 20.04+

### Recommended Requirements
- **CPU:** 4 cores or more
- **RAM:** 8 GB or more
- **Storage:** 20 GB SSD
- **GPU:** Optional, for faster AI processing
- **OS:** Latest stable versions

---

## 🐛 Troubleshooting

### Common Issues

**Issue 1: Database Connection Failed**
```
Solution:
- Check PostgreSQL is running: sudo service postgresql status
- Verify DATABASE_URL in .env file
- Ensure database exists: psql -U postgres -c "\l"
```

**Issue 2: Ollama Model Not Found**
```
Solution:
- Check Ollama is running: curl http://localhost:11434
- Pull model: ollama pull deepseek-r1:1.5b
- Verify model name in .env matches exactly
```

**Issue 3: File Upload Fails**
```
Solution:
- Check uploads directory exists
- Verify file size is under 10MB
- Ensure file is PDF format
- Check disk space available
```

**Issue 4: CORS Errors**
```
Solution:
- Verify CORS is enabled in backend
- Check frontend is running on correct port
- Clear browser cache
```

---

> **"Empowering legal professionals with AI-driven automation!"**

---

**Last Updated:** January 6, 2026
**Version:** 1.0.0
**Maintained by:** SEMICOLON Team
