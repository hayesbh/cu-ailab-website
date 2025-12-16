# AI @ CU Boulder Website

This repository contains the source code for the AI @ CU Boulder website. It is a modern, static site built with [Next.js](https://nextjs.org/) and styled with [Tailwind CSS](https://tailwindcss.com/).

## Tech Stack

The project relies on the following frontend stack:

-   **Framework**: [Next.js 16](https://nextjs.org/) (React 19) - handles routing, static generation, and optimized rendering.
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - CSS framework for rapid UI development.
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) - library for declarative animations (used for transitions, carousels, trees).
-   **Icons**: [Lucide React](https://lucide.dev/) - icon set.
-   **Content Management**:
    -   `js-yaml`: Parses YAML data files.
    -   `gray-matter`: Parses frontmatter from Markdown files.
    -   `react-markdown`: Renders Markdown content into React components.
-   **3D Graphics**: [Three.js](https://threejs.org/) - used for 3D visualizations.

## Project Structure

```bash
├── public/          # Static assets (images, fonts)
├── src/
│   ├── app/         # Next.js App Router pages and layouts
│   ├── components/  # Reusable React components
│   ├── content/     # Data files (YAML and Markdown)
│   ├── lib/         # Utility functions (data fetching, helpers)
│   └── styles/      # Global styles (globals.css)
└── package.json     # Dependencies and scripts
```

## Content Organization

The content for the website is separated from the code to make updates easier. It resides in the `src/content` directory and uses two formats: **YAML** for structured data lists and **Markdown** for rich text pages.

### 1. YAML Data Files (`src/content/*.yaml`)

These files store structured lists of data, such as publications, people, and research areas. They are loaded using the helper function `getContent` in `src/lib/content.ts`, which reads the file and parses it into a JSON object.

**Key Files:**

-   **`home.yaml`**: Configuration for the landing page (hero text, featured sections).
-   **`news.yaml`**: List of news items and updates.
-   **`people.yaml`**: Directory of lab members (faculty, students, alumni).
-   **`publications.yaml`**: Comprehensive list of research papers.
-   **`research.yaml`**: Definitions of research themes and focus areas.
-   **`teaching.yaml`**: Course offerings and curriculum details.

**Example Usage (`src/lib/content.ts`):**
```typescript
import { getContent } from '@/lib/content';

// Load the publications data
const publications = getContent<Publication[]>('publications');
```

### 2. Project Pages (`src/content/projects/*.md`)

Individual project pages are stored as Markdown files in the `src/content/projects` directory.

-   **Frontmatter**: The top of easier file (between `---`) contains metadata like the project title, status, team members, and associated funding. This is parsed by `gray-matter`.
-   **Body**: The rest of the file is standard Markdown, which is rendered as the main content of the project page.

**Data Loading (`src/lib/projectUtils.ts`):**
-   `getAllProjectSlugs()`: Scans the directory to generate routes for each project.
-   `getProjectData(slug)`: Reads a specific markdown file and separates the frontmatter from the content.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This generates a static version of the site in the `.next` directory (or `out` if static export is configured).
