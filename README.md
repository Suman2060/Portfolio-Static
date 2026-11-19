# Suman Dangol — Developer Portfolio

A modern, responsive developer portfolio built with Next.js, React, TypeScript, and Tailwind CSS. The site presents professional experience, technical skills, contact details, and a curated selection of public GitHub projects.

## Features

- Responsive portfolio layout with dark and light themes.
- Hero section with profile information and calls to action.
- GitHub profile integration using the GitHub REST API.
- Project search and sorting by update date, stars, or name.
- Project cards with repository links, languages, topics, stars, forks, and previews.
- GitHub project allowlist so only selected work is displayed.
- Skills, experience, contact, and social sections.
- Local GitHub response caching to reduce repeated API requests.
- Static data store with no application database or backend service.

## Featured Projects

The project section currently displays only these repositories:

1. **Buying and rental ecommerce**
2. **Travel Operator**
3. **Inventory Management**
4. **Asterid Resolver**
5. **Invoice detail Extraction**

The allowlist and repository-name aliases are maintained in [`app/utils/github.ts`](./app/utils/github.ts).

## Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- GitHub REST API

## Getting Started

### Requirements

- Node.js 20 or newer
- npm or pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Validation

```bash
pnpm lint
pnpm build
```

### Production

```bash
pnpm start
```

## Configuration

The default GitHub account is `Suman2060`. To use another account, create a local environment file:

```env
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
```

Environment files are ignored by Git because they may contain private configuration or credentials.

## Project Structure

```text
app/
├── components/       # Page sections and reusable UI components
├── hooks/            # Client-side data hooks
├── store/            # Static portfolio content
├── types/            # TypeScript interfaces
├── utils/            # GitHub integration and shared helpers
├── globals.css       # Theme and component styles
├── layout.tsx        # Root layout and metadata
└── page.tsx          # Main portfolio page
```

## Updating Portfolio Content

- Edit personal information, skills, experience, and social links in [`app/store/siteStore.ts`](./app/store/siteStore.ts).
- Update the displayed GitHub repositories in [`app/utils/github.ts`](./app/utils/github.ts).
- Update global visual styles in [`app/globals.css`](./app/globals.css).
- Run `pnpm lint` and `pnpm build` before publishing changes.

## Deployment

This project can be deployed to Vercel or any platform that supports Next.js:

1. Push the repository to GitHub.
2. Import the repository into the deployment platform.
3. Add `NEXT_PUBLIC_GITHUB_USERNAME` if a GitHub account other than `Suman2060` is required.
4. Deploy using the standard Next.js build command.
