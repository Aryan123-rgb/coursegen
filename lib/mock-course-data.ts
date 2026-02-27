export interface Chapter {
  id: string;
  title: string;
  order: number;
  content: string;
  video_urls: string[];
}

export interface CourseData {
  id?: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

export const mockCourseData: CourseData = {
  title: "Full-Stack Web Development",
  description:
    "A comprehensive course covering modern web development from front-end to back-end, including React, Node.js, databases, and deployment.",
  chapters: [
    {
      id: "chapter-1",
      title: "Introduction to Web Development",
      order: 1,
      video_urls: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
      content: `## What is Web Development?

Web development is the work involved in building and maintaining websites. It encompasses everything from creating simple static pages to complex web applications, e-commerce platforms, and social network services.

### The Three Pillars

Modern web development is built on three core technologies:

1. **HTML** — The skeleton of every web page. It defines the structure and content semantics.
2. **CSS** — The skin and clothing. It controls layout, colors, fonts, and animations.
3. **JavaScript** — The muscles and brain. It adds interactivity, dynamic content, and communication with servers.

### Client vs. Server

The **client-side** (front-end) is what the user sees and interacts with in their browser. The **server-side** (back-end) handles data processing, storage, authentication, and business logic.

> Understanding this separation is fundamental to becoming a proficient full-stack developer.

### Tools You'll Need

- A modern code editor (VS Code recommended)
- Node.js and npm
- Git for version control
- A terminal / command line
`,
    },
    {
      id: "chapter-2",
      title: "HTML & Semantic Markup",
      order: 2,
      video_urls: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
      content: `## HTML: The Foundation

HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.

### Key Concepts

- **Elements & Tags**: Every piece of content is wrapped in tags like \`<p>\`, \`<h1>\`, \`<div>\`.
- **Attributes**: Tags can have attributes that provide additional information, e.g. \`<a href="...">\`.
- **Nesting**: Elements can contain other elements, creating a tree structure (the DOM).

### Semantic HTML5

Semantic elements clearly describe their meaning:

\`\`\`html
<header>Site Header</header>
<nav>Navigation Links</nav>
<main>
  <article>
    <section>Content Section</section>
  </article>
</main>
<footer>Site Footer</footer>
\`\`\`

Using semantic markup improves **accessibility**, **SEO**, and **code readability**.

### Forms & Input

Forms are essential for collecting user data:

- \`<input>\` — text, email, password, number
- \`<textarea>\` — multi-line text
- \`<select>\` — dropdown menus
- \`<button>\` — form submission
`,
    },
    {
      id: "chapter-3",
      title: "CSS & Modern Layouts",
      order: 3,
      video_urls: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
      content: `## Styling the Web

CSS (Cascading Style Sheets) controls the visual presentation of HTML elements.

### The Box Model

Every element is a rectangular box consisting of:
- **Content** — the actual text/image
- **Padding** — space between content and border
- **Border** — the edge of the element
- **Margin** — space outside the border

### Flexbox

Flexbox is a one-dimensional layout method for arranging items in rows or columns:

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
\`\`\`

### CSS Grid

Grid is a two-dimensional layout system:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
\`\`\`

### Responsive Design

Use media queries and relative units to make layouts adapt to any screen size. Mobile-first design is the industry standard approach.
`,
    },
    {
      id: "chapter-4",
      title: "JavaScript Fundamentals",
      order: 4,
      video_urls: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
      content: `## JavaScript: Making Pages Interactive

JavaScript is the programming language of the web, enabling dynamic content, user interactions, and complex application logic.

### Variables & Data Types

\`\`\`javascript
const name = "Alice";      // string
let age = 25;              // number
const isActive = true;     // boolean
const scores = [98, 87];   // array
const user = { name, age };// object
\`\`\`

### Functions

\`\`\`javascript
// Arrow function
const greet = (name) => \`Hello, \${name}!\`;

// Async function
async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}
\`\`\`

### DOM Manipulation

JavaScript can read and modify the HTML document:

\`\`\`javascript
const button = document.querySelector('#myButton');
button.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
\`\`\`

### ES6+ Features

Modern JavaScript includes powerful features like destructuring, template literals, spread operators, modules, and promises.
`,
    },
    {
      id: "chapter-5",
      title: "React & Component Architecture",
      order: 5,
      video_urls: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
      content: `## React: Building User Interfaces

React is a JavaScript library for building user interfaces through reusable, composable components.

### JSX

JSX lets you write HTML-like syntax in JavaScript:

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

### State & Hooks

React Hooks let you use state and lifecycle features in function components:

\`\`\`jsx
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

### Props & Composition

Components receive data through **props** and can be composed together like building blocks to create complex UIs from simple, reusable pieces.

### Next.js

Next.js extends React with server-side rendering, file-based routing, and API routes — making it ideal for production applications.
`,
    },
    {
      id: "chapter-6",
      title: "Node.js & Server-Side Development",
      order: 6,
      video_urls: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
      content: `## Server-Side JavaScript

Node.js allows you to run JavaScript on the server, enabling full-stack development with a single language.

### Creating an API

\`\`\`javascript
import express from 'express';
const app = express();

app.get('/api/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

app.listen(3000);
\`\`\`

### Middleware

Middleware functions process requests before they reach route handlers — useful for authentication, logging, error handling, and CORS.

### Environment Variables

Never hard-code secrets. Use \`.env\` files and libraries like \`dotenv\`:

\`\`\`bash
DATABASE_URL=postgresql://localhost/mydb
API_KEY=sk-abc123
\`\`\`

### Authentication

Common strategies include:
- **JWT** (JSON Web Tokens)
- **Session-based** authentication
- **OAuth 2.0** (Google, GitHub sign-in)
`,
    },
    {
      id: "chapter-7",
      title: "Databases & ORM",
      order: 7,
      video_urls: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
      content: `## Persistent Data Storage

Databases are essential for storing, querying, and managing application data.

### SQL vs NoSQL

| Feature | SQL (PostgreSQL) | NoSQL (MongoDB) |
|---------|-----------------|-----------------|
| Schema | Strict, defined | Flexible, schema-less |
| Relations | Joins & foreign keys | Embedded documents |
| Best for | Complex queries | Rapid prototyping |

### Drizzle ORM

Drizzle provides type-safe database access in TypeScript:

\`\`\`typescript
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});
\`\`\`

### Migrations

Migrations track changes to your database schema over time, allowing you to version-control your database structure alongside your application code.

### Query Optimization

- Use indexes for frequently queried columns
- Avoid N+1 query problems
- Use pagination for large datasets
`,
    },
    {
      id: "chapter-8",
      title: "Deployment & DevOps",
      order: 8,
      video_urls: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
      content: `## Shipping to Production

Deployment is the process of making your application available to users on the internet.

### Platforms

Popular deployment platforms for web applications:

- **Vercel** — Optimized for Next.js, zero-config deployments
- **Railway / Render** — Full-stack hosting with databases
- **AWS / GCP** — Enterprise-grade cloud infrastructure

### CI/CD Pipeline

Continuous Integration & Deployment automates testing and deployment:

1. Push code to GitHub
2. Automated tests run
3. Build process executes
4. Deploy to staging/production

### Docker

Containers package your application with all dependencies:

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
\`\`\`

### Monitoring

Post-deployment, monitor your application with:
- **Error tracking** (Sentry)
- **Analytics** (Vercel Analytics, Plausible)
- **Uptime monitoring** (Better Uptime)

> Congratulations! You've completed the Full-Stack Web Development course. 🎉
`,
    },
  ],
};
