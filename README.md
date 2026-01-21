# Colorado AI Lab Website

This repository contains the source code for the Colorado AI Lab (formerly AI @ CU Boulder) website. It is a modern, static site built with [Next.js](https://nextjs.org/) and styled with [Tailwind CSS](https://tailwindcss.com/).

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
├── public/          # Static assets (images, fonts, headshots)
├── src/
│   ├── app/         # Next.js App Router pages and layouts
│   ├── components/  # Reusable React components
│   ├── content/     # Data files (YAML and Markdown) - EDIT HERE
│   ├── lib/         # Utility functions (data fetching, helpers)
│   └── styles/      # Global styles
└── package.json     # Dependencies and scripts
```

---

## Content Management: How-to Guides

The website's content is separated from the code to make updates easy for faculty and contributors. Most data lives in the `src/content/` directory.

### 1. Managing People (`src/content/people.yaml`)

To add or update faculty members, edit `src/content/people.yaml`.

**Format:**
```yaml
faculty:
  - name: "Prof. Jane Doe"
    role: "Assistant Professor"
    image: "/headshots/jane_doe.jpg"  # Path relative to the public/ folder
    link: "https://janedoe.com/"
    interests: ["Machine Learning", "Robotics"]
```

**Adding Images:**
1.  Save the headshot image into the `public/headshots/` directory.
2.  Ensure the `image` path in YAML starts with `/headshots/filename.ext`.
3.  Recommended size: Square aspect ratio, at least 400x400px.

---

### 2. Managing Publications (`src/content/publications.yaml`)

This file controls both the **Network Graph** visualization and the **Publication List**.

#### Adding a Publication to the List
Scroll to the `publications` section and add a new entry:

```yaml
publications:
  - title: "Paper Title"
    venue: "NeurIPS"
    year: "2024"
    month: "December" # Optional
    award: "Best Paper" # Optional
    # Use markdown (**) to bold lab authors
    authors: "**J. Doe**, A. Smith, **B. Hayes**"
    links:
      pdf: "https://arxiv.org/..."
      code: "https://github.com/..."
      video: "#" # Optional
    abstract: >
      Paste the abstract here. The greater-than sign (>) allows
      for multi-line strings in YAML.
```

#### Updating the Network Graph
The interactive graph is defined manually in the `network` section to allow for precise layout control.

1.  **Nodes**: Define the people or entities.
    *   `x` and `y` are coordinates on the canvas. You may need to adjust these values trial-and-error style to position nodes where you want them (e.g., clustering collaborators together).
    ```yaml
    - id: "Jane Doe"
      group: "author"
      x: 800  # Horizontal position
      y: 200  # Vertical position
    ```
2.  **Links**: Define connections (lines) between nodes.
    ```yaml
    - source: "Colorado AI Lab"
      target: "Jane Doe"
    ```

---

### 3. Managing Projects

Projects can be displayed as simple summary cards or have full dedicated pages.

#### Summary Cards (`src/content/projects.yaml`)
To add a project to the main "Projects" list:
```yaml
projects:
  - title: "Project Name"
    categories: ["Robotics", "NLP"]
    description: "Brief summary..."
    image: "https://..." # or local path like /images/project.jpg
    external_url: "/projects/my-project" # Link to internal page or external site
    status: "Active"
    featured: true
```

#### Detailed Project Pages (`src/content/projects/*.md`)
To create a dedicated page:
1.  Create a new file: `src/content/projects/my-project-name.md`.
2.  Add **Frontmatter** at the top (metadata between `---`):

```markdown
---
title: "My Project Name"
subtitle: "One-line tagline."
status: "Active"
categories: ["Robotics"]
hero_image: "https://..."
duration: "2024 - Present"
funding: "NSF"
team:
  pis:
    - name: "Prof. Name"
      role: "PI"
      department: "CS"
  researchers:
    - name: "Student Name"
      role: "PhD Candidate"
related_publications:
  - title: "Related Paper"
    venue: "ICRA 2024"
    year: "2024"
---

### Project Overview
Write your project description here using standard Markdown.
```

---

### 4. Teaching & Curriculum Tree (`src/content/teaching.yaml`)

This file configures the "Course Curriculum Tree" visualization.

#### Adding a Course
Add a new entry under `courses`.

**Crucial Fields for the Tree:**
*   `id`: A unique identifier (e.g., `csci-5434`). This is used for linking.
*   `requisites`: A list of other course `id`s. This draws the **arrows** connecting courses.
*   `coordinates`: `{ x: 100, y: 100 }`. This sets the position of the node on the canvas.
    *   **X-axis**: Generally represents the "Track" or topic cluster.
    *   **Y-axis**: Generally represents the timeline/level (100-200 for entry level, 500+ for advanced).

**Example:**
```yaml
courses:
  - id: "csci-7000-new-topic"
    code: "CSCI 7000"
    title: "New Advanced Topic"
    description: "Description of the course."
    credits: 3
    type: "elective"
    semesters: ["Spring"]
    # This draws an arrow FROM csci-5622 TO this course
    requisites: ["csci-5622"]
    skills:
      ML: 40
      Math: 20
    instructor: "Prof. Name"
    status: "Open"
    level: "Graduate"
    # Position on canvas
    coordinates: { x: 1400, y: 450 }
    icon: "smart_toy" # Name of an icon from https://lucide.dev/icons
```

---

## Development & Deployment

### Getting Started

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view.

### Building for Production

```bash
npm run build
```
This generates a static version of the site in the `.next` (or `out`) directory.
