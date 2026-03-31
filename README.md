# ibook

![CI](https://github.com/z0bla/ibook-app/actions/workflows/ci.yml/badge.svg)

A React Native mobile application built with Expo.

## Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **UI Components**: React Native Paper
- **Forms**: React Hook Form + Yup
- **State Management**: React Context API
- **Storage**: AsyncStorage

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn
- Expo CLI

### Installation

```bash
npm install
```

### Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Project Structure

```
src/
├── context/       # React Context providers
├── data/          # Static data files
├── hooks/         # Custom React hooks
├── services/      # Business logic services
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
