# VinylScrobbler

VinylScrobbler is a web application designed to provide an immersive, retro-inspired experience for scrobbling music to Last.fm. By simulating a vinyl record player interface, it turns the routine act of tracking listened music into a visual, tactile event.

## Table of Contents

1. [Features](https://www.google.com/search?q=%23features)
2. [Tech Stack](https://www.google.com/search?q=%23tech-stack)
3. [Project Structure](https://www.google.com/search?q=%23project-structure)
4. [Getting Started](https://www.google.com/search?q=%23getting-started)
5. [Scripts](https://www.google.com/search?q=%23scripts)
6. [Configuration](https://www.google.com/search?q=%23configuration)
7. [Contributing](https://www.google.com/search?q=%23contributing)

## Features

* **Retro Turntable Simulation**: Includes an interactive, animated CSS-based turntable.
* **Last.fm Integration**: Seamless authentication and scrobbling through the Last.fm API.
* **Search Discovery**: Integrated search functionality to find albums and artists.
* **Real-time Visualization**: Dynamic playback progress tracking with a visual tonearm and rotating vinyl disk.
* **Responsive UI**: Optimized for modern browser experiences.

## Tech Stack

* **Runtime**: Vite
* **Framework**: React 19
* **Language**: TypeScript
* **HTTP Client**: Axios
* **Linting**: ESLint

## Project Structure

* `src/`: Core source code.
* `assets/`: Static resources and media.
* `components/`: Modular UI components (Footer, Header, Login, Search, VinylPlayer).
* `types/`: TypeScript interface definitions for the application.
* `App.tsx`: Main application orchestration and state management.
* `i18n.ts`: Localization and string management.
* `index.css`: Global styles and animation definitions.
* `main.tsx`: Entry point for the React application.


* `public/`: Static public assets.
* `eslint.config.js`: Linting rules and configuration.
* `vite.config.ts`: Vite build configuration.
* `tsconfig.*`: TypeScript compiler configurations for different environments.

## Getting Started

### Prerequisites

* Node.js installed (LTS recommended)
* npm or another package manager

### Installation

1. Clone the repository.
2. Install dependencies:
```bash
npm install

```


3. Configure your environment variables using `.env.example` as a template.

## Scripts

* `npm run dev`: Starts the development server via Vite.
* `npm run build`: Compiles TypeScript and creates a production build.
* `npm run lint`: Runs ESLint across the codebase.
* `npm run preview`: Starts a local preview server for the built project.

## Configuration

The project utilizes Vite for environment management. Ensure that the `VITE_API_BASE_URL` is configured in your `.env` file to point toward your backend API instance.

TypeScript strict typing is enforced via the `tsconfig` files, ensuring type safety across the `components` and `types` directories.

## Contributing

This project is currently private. If you are part of the development team, please ensure you run `npm run lint` before committing any changes to maintain project standards.