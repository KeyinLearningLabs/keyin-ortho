# Template for Keyin's Front-End Stack

## Tech Stack

### Core
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for fast development and optimized builds
- **[React](https://reactjs.org/)**: JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)**: Strongly typed programming language that builds on JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Daisy UI](https://daisyui.com/)**: Component library for Tailwind CSS

### Code Quality
- **[ESLint](https://eslint.org/)**: Linting utility for JavaScript and TypeScript
- **[Prettier](https://prettier.io/)**: Code formatter
- **[Husky](https://typicode.github.io/husky/)**: Git hooks to enforce code quality

### Dependencies
- **[Axios](https://axios-http.com/)**: Promise-based HTTP client
- **[React Router](https://reactrouter.com/)**: Declarative routing for React
- **[Moment](https://momentjs.com/)**: Date manipulation library
- **[Formik](https://formik.org/)**: Form handling library
- **[React Input Mask](https://github.com/sanniassin/react-input-mask)**: Input masking component

## Getting Started

### Prerequisites
- Node.js (version 16.x or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Run ESLint with auto-fix
- `npm run format`: Run Prettier to format code
- `npm run type-check`: Run TypeScript type checking
- `npm run prepare`: Set up Husky git hooks

## Project Structure

```
├── lib/                # Project files
│   ├── assets/         # Static assets like images, icons, etc.
│   │   └── favicon.ico # Site favicon
│   ├── components/     # Reusable React components
│   │   └── PhoneInput.tsx # Phone input component
│   ├── pages/          # Page components
│   │   ├── Home.tsx    # Home page component
│   │   └── index.css   # Page-specific styles
│   └── main.tsx        # Main entry point
├── node_modules/       # Node.js dependencies
├── .eslintrc.js        # ESLint configuration
├── .eslintrcignore     # ESLint ignore configuration
├── .gitignore          # Git ignore configuration
├── .prettierrc         # Prettier configuration
├── index.html          # HTML entry point
├── package-lock.json   # Dependency lock file
├── package.json        # Package metadata and dependencies
├── postcss.config.js   # PostCSS configuration for Tailwind
├── README.md           # Project documentation
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── tsconfig.node.json  # TypeScript configuration for Node
├── vite.config.ts      # Vite configuration
└── vite-env.d.ts       # Vite type declarations
```

## Contributing

1. Create a new branch (`git checkout -b feature/amazing-feature`)
2. Make your changes
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Daisy UI Documentation](https://daisyui.com/docs/install/)
