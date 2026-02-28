# The Study - School Elections Voting System

This is a Next.js-based online voting system designed for The Study International School. It allows students to log in with their School ID and cast votes for Head Boy and Head Girl candidates.

## Features

- **Secure Login**: Students log in using their School ID and a specific password (`thestudy123`).
- **One-Vote Enforcement**: Prevents multiple votes from the same browser session.
- **Responsive Design**: Optimized for all devices using Tailwind CSS and ShadCN UI.
- **Candidate Showcases**: Clear presentation of candidates with professional portraits.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Repository Setup

To push this project to your GitHub repository, you can use the following commands in your local terminal:

```bash
git init
git remote add origin https://github.com/alansamuel1825-commits/voting-system.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: ShadCN UI (Radix UI)
- **Icons**: Lucide React
- **Validation**: Zod & React Hook Form
