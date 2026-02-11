# AGENTS.md - Coding Guidelines for Agentic AI

This document provides guidelines for agentic coding agents operating in the `ibook-app` repository.

## Build, Lint, Test Commands

### Setup
```bash
npm install                    # Install dependencies
npm run build                  # Build the project
```

### Development
```bash
npm run dev                    # Start development server
npm run lint                   # Run linter
npm run format                 # Format code
```

### Testing
```bash
npm test                       # Run all tests
npm test -- --watch           # Run tests in watch mode
npm test -- <test-file.ts>    # Run single test file
npm test -- --testNamePattern "test-name"  # Run specific test by name
```

### Type Checking
```bash
npm run type-check             # Run TypeScript type checking
```

## Code Style Guidelines

### Imports & Exports

- Use ES6 module syntax: `import` and `export`
- Group imports in the following order:
  1. External libraries (node_modules)
  2. Absolute paths / path aliases
  3. Relative imports
  4. Blank line between each group

```typescript
import React from 'react';
import { useMutation } from '@tanstack/react-query';

import { fetchUser } from '@/api/users';
import { useAuth } from '@/context/auth';

import { UserCard } from './UserCard';
import { useFormState } from './hooks';
```

- Prefer named exports over default exports
- Use `export { }` for re-exports

### Formatting & Whitespace

- Follow Prettier defaults (enforced by `npm run format`)
- 2-space indentation
- 80-character line length (soft limit, can exceed for readability)
- Trailing commas in multi-line structures
- Single quotes for strings (unless escaping needed)

### TypeScript & Types

- Always use TypeScript for `.ts` and `.tsx` files
- Never use `any` - use `unknown` if needed and narrow the type
- Define interfaces for component props and data structures

```typescript
interface UserProps {
  id: string;
  name: string;
  email?: string;
}
```

- Use strict type checking in `tsconfig.json`
- For async operations, always type Promise returns:
  ```typescript
  async function fetchData(): Promise<Data> { }
  ```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserCard`, `NavigationBar`)
- **Functions/variables**: camelCase (e.g., `getUserData`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`, `API_ENDPOINT`)
- **Files**: Match content - components use PascalCase, utilities use camelCase
- **Private properties/methods**: Prefix with underscore (e.g., `_handleClick`)

### Error Handling

- Always handle errors explicitly - no silent failures
- Use try-catch blocks for async operations:

```typescript
try {
  const data = await fetchUser(id);
  return data;
} catch (error) {
  console.error('Failed to fetch user:', error);
  throw new Error('Unable to load user data');
}
```

- For expected errors, define error types:
  ```typescript
  interface ApiError {
    message: string;
    code: string;
  }
  ```
- Never ignore rejected promises - always handle or return them

### React-specific (if applicable)

- Use functional components with hooks
- Keep component files focused (one component per file)
- Use custom hooks for shared logic
- Props should be memoized if passed to child components
- Define PropTypes or use TypeScript interfaces

### Functions & Methods

- Keep functions small and focused (single responsibility)
- Use descriptive function names that explain intent
- Avoid deeply nested logic - extract helper functions
- Max nesting depth: 3 levels

```typescript
// ❌ Bad
function process(data) {
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].active) {
        // ...
      }
    }
  }
}

// ✅ Good
function getActiveItems(data: Item[]): Item[] {
  return data.filter(item => item.active);
}
```

### Comments & Documentation

- Write self-documenting code first; comments should explain "why", not "what"
- Use JSDoc for public functions and exported types:

```typescript
/**
 * Fetches user data from the API
 * @param id - The user ID
 * @returns User object or null if not found
 */
export function fetchUser(id: string): Promise<User | null> { }
```

## Testing Guidelines

- Write tests for non-trivial logic and components
- Test file location: `__tests__` folder or `.test.ts`/`.spec.ts` suffix
- Name tests clearly: describe what is being tested and the expected behavior
- Use descriptive assertion messages

```typescript
describe('getUserData', () => {
  it('should return user data when API call succeeds', async () => {
    const result = await getUserData('123');
    expect(result).toEqual(expectedUser);
  });
});
```

## Directory Structure (Expected)

```
ibook-app/
├── src/
│   ├── components/       # React components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── api/              # API client functions
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   └── App.tsx
├── __tests__/            # Test files
├── public/               # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts        # Vite configuration
└── AGENTS.md
```

## Before Committing

- Run `npm run lint` and fix any issues
- Run `npm run format` to ensure consistent formatting
- Run `npm test` to ensure tests pass
- Run `npm run type-check` to ensure no type errors
- Verify code builds with `npm run build`
