# iBook App - Project Structure & Implementation Plan

## Overview

iBook is a React Native appointment booking application built with Expo. This document outlines the complete project structure, all 50 development tasks organized by 7 phases, and implementation guidelines for junior developers.

**Total Estimated Time**: ~60 hours  
**Duration**: 7 weeks (1 week per phase)  
**Framework**: React Native + Expo  
**State Management**: React Context + useReducer  
**Navigation**: React Navigation  
**UI Library**: React Native Paper  
**Local Storage**: AsyncStorage  
**Notifications**: Expo Notifications (local only)

---

## Project Directory Structure

```
ibook/
├── src/
│   ├── screens/                    # All screen components
│   │   ├── auth/                   # Login, Signup, Profile
│   │   ├── categories/             # Browse categories, salons, details
│   │   ├── booking/                # Calendar, time selection, confirmation
│   │   ├── appointments/           # Upcoming, past, details
│   │   └── home/                   # Dashboard/home screen
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── common/                 # Header, Button, Loading, Error, EmptyState
│   │   ├── booking/                # SalonCard, ServiceCard, AppointmentCard, TimeSlotCard
│   │   └── auth/                   # LoginForm, SignupForm
│   │
│   ├── context/                    # React Context providers
│   │   ├── AuthContext.tsx         # User authentication state
│   │   ├── BookingContext.tsx      # Appointment booking state
│   │   └── NotificationContext.tsx # Notification scheduling state
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.ts              # Auth context wrapper
│   │   ├── useBooking.ts           # Booking context wrapper
│   │   ├── useNotification.ts      # Notification context wrapper
│   │   └── useNotificationListener.ts # Notification listener
│   │
│   ├── data/                       # Mock data (JSON)
│   │   ├── users.json              # Mock user accounts
│   │   ├── categories.json         # Service categories
│   │   ├── salons.json             # Salon information
│   │   └── services.json           # Services offered by salons
│   │
│   ├── types/                      # TypeScript type definitions
│   │   ├── auth.types.ts           # Auth types
│   │   ├── salon.types.ts          # Service/salon types
│   │   ├── booking.types.ts        # Booking types
│   │   └── notification.types.ts   # Notification types
│   │
│   ├── utils/                      # Utility functions
│   │   ├── date.utils.ts           # Date calculations and formatting
│   │   ├── validation.utils.ts     # Form validation helpers
│   │   └── notification.utils.ts   # Notification helpers
│   │
│   ├── navigation/                 # Navigation configuration
│   │   ├── RootNavigator.tsx       # Main app navigator
│   │   ├── AuthNavigator.tsx       # Auth flow navigator
│   │   ├── AppNavigator.tsx        # App tabs navigator
│   │   ├── BookingNavigator.tsx    # Booking flow navigator
│   │   └── types.ts                # Navigation type definitions
│   │
│   ├── styles/                     # Global styles & theme
│   │   └── theme.ts                # Color, spacing, typography, theme config
│   │
│   └── App.tsx                     # Main app entry point with providers
│
├── __tests__/                      # Test files
│   ├── utils/                      # Utility function tests
│   ├── components/                 # Component tests
│   └── context/                    # Context/reducer tests
│
├── app.json                        # Expo configuration
├── eas.json                        # EAS Build configuration
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript configuration
├── PROJECT_STRUCTURE.md            # This file
└── README.md                       # Project overview
```

---

## Implementation Phases

### Phase 0: Project Setup & Foundation (Week 1)

**Duration**: 1.5 hours | **Issues**: #1-3

Setup Expo project, folder structure, and install dependencies.

| # | Task | Issue | Time |
|---|------|-------|------|
| 0.1 | Initialize React Native Project with Expo | [#1](https://github.com/z0bla/ibook-app/issues/1) | 30-45 min |
| 0.2 | Set Up Folder Structure & Architecture | [#2](https://github.com/z0bla/ibook-app/issues/2) | 45 min |
| 0.3 | Install Required Dependencies | [#3](https://github.com/z0bla/ibook-app/issues/3) | 20 min |

**Deliverables**: Working Expo app, organized folder structure, all dependencies installed

---

### Phase 1: Authentication System (Week 2)

**Duration**: 8.5 hours | **Issues**: #4-11

Build user authentication with login, signup, and profile screens.

| # | Task | Issue | Time |
|---|------|-------|------|
| 1.1 | Define TypeScript Types for Authentication | [#4](https://github.com/z0bla/ibook-app/issues/4) | 30 min |
| 1.2 | Create Mock User Data | [#5](https://github.com/z0bla/ibook-app/issues/5) | 20 min |
| 1.3 | Create AuthContext with useReducer | [#6](https://github.com/z0bla/ibook-app/issues/6) | 60 min |
| 1.4 | Create useAuth Custom Hook | [#7](https://github.com/z0bla/ibook-app/issues/7) | 25 min |
| 1.5 | Create LoginScreen Component | [#8](https://github.com/z0bla/ibook-app/issues/8) | 60 min |
| 1.6 | Create SignupScreen Component | [#9](https://github.com/z0bla/ibook-app/issues/9) | 60 min |
| 1.7 | Create AuthNavigator & RootNavigator | [#10](https://github.com/z0bla/ibook-app/issues/10) | 45 min |
| 1.8 | Create ProfileScreen Component (Basic) | [#11](https://github.com/z0bla/ibook-app/issues/11) | 40 min |

**Deliverables**: Complete authentication system, login/signup flows, user profiles

---

### Phase 2: Service Categories & Salons (Week 3)

**Duration**: 9 hours | **Issues**: #12-19

Build service browsing with categories, salon listings, and details.

| # | Task | Issue | Time |
|---|------|-------|------|
| 2.1 | Define TypeScript Types for Services | [#12](https://github.com/z0bla/ibook-app/issues/12) | 30 min |
| 2.2 | Create Mock Data - Categories | [#13](https://github.com/z0bla/ibook-app/issues/13) | 20 min |
| 2.3 | Create Mock Data - Salons | [#14](https://github.com/z0bla/ibook-app/issues/14) | 40 min |
| 2.4 | Create Mock Data - Services | [#15](https://github.com/z0bla/ibook-app/issues/15) | 25 min |
| 2.5 | Create CategoriesScreen Component | [#16](https://github.com/z0bla/ibook-app/issues/16) | 50 min |
| 2.6 | Create SalonsListScreen Component | [#17](https://github.com/z0bla/ibook-app/issues/17) | 60 min |
| 2.7 | Create SalonDetailScreen Component | [#18](https://github.com/z0bla/ibook-app/issues/18) | 75 min |
| 2.8 | Create SalonCard & ServiceCard Components | [#19](https://github.com/z0bla/ibook-app/issues/19) | 40 min |

**Deliverables**: Service browsing interface, salon details, reusable cards

---

### Phase 3: Booking & Calendar (Week 4-5)

**Duration**: 11 hours | **Issues**: #20-27

Build complete appointment booking flow with calendar and confirmation.

| # | Task | Issue | Time |
|---|------|-------|------|
| 3.1 | Define TypeScript Types for Bookings | [#20](https://github.com/z0bla/ibook-app/issues/20) | 30 min |
| 3.2 | Create BookingContext with useReducer | [#21](https://github.com/z0bla/ibook-app/issues/21) | 75 min |
| 3.3 | Create useBooking Custom Hook | [#22](https://github.com/z0bla/ibook-app/issues/22) | 25 min |
| 3.4 | Create Date Utility Functions | [#23](https://github.com/z0bla/ibook-app/issues/23) | 45 min |
| 3.5 | Create CalendarScreen Component | [#24](https://github.com/z0bla/ibook-app/issues/24) | 90 min |
| 3.6 | Create SelectTimeScreen Component | [#25](https://github.com/z0bla/ibook-app/issues/25) | 70 min |
| 3.7 | Create ConfirmationScreen Component | [#26](https://github.com/z0bla/ibook-app/issues/26) | 60 min |
| 3.8 | Create TimeSlotCard Component | [#27](https://github.com/z0bla/ibook-app/issues/27) | 35 min |

**Deliverables**: Complete booking flow, calendar selection, time slots, confirmation

---

### Phase 4: Notifications & Appointments Management (Week 5-6)

**Duration**: 13 hours | **Issues**: #28-37

Build appointment management and notification system.

| # | Task | Issue | Time |
|---|------|-------|------|
| 4.1 | Define TypeScript Types for Notifications | [#28](https://github.com/z0bla/ibook-app/issues/28) | 20 min |
| 4.2 | Create NotificationContext | [#29](https://github.com/z0bla/ibook-app/issues/29) | 60 min |
| 4.3 | Create useNotification Custom Hook | [#30](https://github.com/z0bla/ibook-app/issues/30) | 20 min |
| 4.4 | Create Notification Utility Functions | [#31](https://github.com/z0bla/ibook-app/issues/31) | 45 min |
| 4.5 | Create UpcomingAppointmentsScreen | [#32](https://github.com/z0bla/ibook-app/issues/32) | 70 min |
| 4.6 | Create PastAppointmentsScreen | [#33](https://github.com/z0bla/ibook-app/issues/33) | 45 min |
| 4.7 | Create AppointmentDetailScreen | [#34](https://github.com/z0bla/ibook-app/issues/34) | 60 min |
| 4.8 | Create AppointmentCard Component | [#35](https://github.com/z0bla/ibook-app/issues/35) | 40 min |
| 4.9 | Integrate Notifications with Appointments | [#36](https://github.com/z0bla/ibook-app/issues/36) | 50 min |
| 4.10 | Create Notification Listener Hook | [#37](https://github.com/z0bla/ibook-app/issues/37) | 40 min |

**Deliverables**: Appointment listings, details, notifications, cancellation

---

### Phase 5: App Navigation & Bottom Tab Setup (Week 5)

**Duration**: 6.5 hours | **Issues**: #38-43

Set up complete app navigation structure with bottom tabs.

| # | Task | Issue | Time |
|---|------|-------|------|
| 5.1 | Define Navigation Types | [#38](https://github.com/z0bla/ibook-app/issues/38) | 30 min |
| 5.2 | Create HomeScreen Component | [#39](https://github.com/z0bla/ibook-app/issues/39) | 60 min |
| 5.3 | Create AppNavigator (Bottom Tabs) | [#40](https://github.com/z0bla/ibook-app/issues/40) | 60 min |
| 5.4 | Create Booking Stack Navigator | [#41](https://github.com/z0bla/ibook-app/issues/41) | 45 min |
| 5.5 | Create RootNavigator | [#42](https://github.com/z0bla/ibook-app/issues/42) | 45 min |
| 5.6 | Wrap App with Required Providers | [#43](https://github.com/z0bla/ibook-app/issues/43) | 50 min |

**Deliverables**: Bottom tab navigation, home screen, complete app structure

---

### Phase 6: UI Polish & Theming (Week 6)

**Duration**: 8 hours | **Issues**: #44-47

Polish UI with theme system, reusable components, and error handling.

| # | Task | Issue | Time |
|---|------|-------|------|
| 6.1 | Create Theme Configuration | [#44](https://github.com/z0bla/ibook-app/issues/44) | 40 min |
| 6.2 | Create Reusable UI Components | [#45](https://github.com/z0bla/ibook-app/issues/45) | 120 min |
| 6.3 | Apply Theme & Styling to All Screens | [#46](https://github.com/z0bla/ibook-app/issues/46) | 180 min |
| 6.4 | Add Loading & Error States | [#47](https://github.com/z0bla/ibook-app/issues/47) | 120 min |

**Deliverables**: Professional theming, reusable components, error handling

---

### Phase 7: Testing & Documentation (Week 7)

**Duration**: 6 hours | **Issues**: #48-50

Write comprehensive tests for utilities, components, and state management.

| # | Task | Issue | Time |
|---|------|-------|------|
| 7.1 | Write Unit Tests for Utility Functions | [#48](https://github.com/z0bla/ibook-app/issues/48) | 90 min |
| 7.2 | Write Component Tests | [#49](https://github.com/z0bla/ibook-app/issues/49) | 120 min |
| 7.3 | Write Context & Reducer Tests | [#50](https://github.com/z0bla/ibook-app/issues/50) | 120 min |

**Deliverables**: Comprehensive test coverage, tested utilities, components, and state management

---

## Quick Reference: All 50 Issues

| Phase | Issue Range | Tasks | Duration |
|-------|-------------|-------|----------|
| Phase 0: Setup | #1-3 | 3 | 1.5 hrs |
| Phase 1: Auth | #4-11 | 8 | 8.5 hrs |
| Phase 2: Browse | #12-19 | 8 | 9 hrs |
| Phase 3: Booking | #20-27 | 8 | 11 hrs |
| Phase 4: Appointments | #28-37 | 10 | 13 hrs |
| Phase 5: Navigation | #38-43 | 6 | 6.5 hrs |
| Phase 6: UI Polish | #44-47 | 4 | 8 hrs |
| Phase 7: Testing | #48-50 | 3 | 6 hrs |
| **TOTAL** | **#1-50** | **50** | **~60 hrs** |

---

## Development Guidelines for Junior Developers

### Code Style

- Use TypeScript for all `.ts` and `.tsx` files
- No `any` type - use `unknown` and narrow types
- Prefer named exports over default exports
- Follow React Hooks best practices
- Keep components small and focused (single responsibility)
- Use functional components, no class components

### Naming Conventions

- **Components**: PascalCase (e.g., `LoginScreen`, `SalonCard`)
- **Functions/variables**: camelCase (e.g., `getUserData`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`, `API_ENDPOINT`)
- **Files**: Match content name (components use PascalCase, utilities use camelCase)
- **Types/Interfaces**: PascalCase with descriptive suffix (e.g., `UserProps`, `AuthState`)

### File Organization

- One component per file
- Keep related files together in folders
- Export from index files for clean imports
- Tests mirror source structure in `__tests__/`

### State Management Pattern

```
Context + useReducer Pattern:
1. Define types (types/*.types.ts)
2. Create reducer with actions (context/*Context.tsx)
3. Create provider component (context/*Context.tsx)
4. Create custom hook (hooks/use*.ts)
5. Use hook in components
```

### Error Handling

- Always handle errors explicitly
- Use try-catch for async operations
- Show user-friendly error messages
- Log errors for debugging
- Provide retry options where possible

### Testing Standards

- Test files: `__tests__/**/*.test.ts(x)`
- Descriptive test names explaining behavior
- Test happy path and error cases
- Mock external dependencies
- Aim for meaningful coverage, not 100%

---

## Dependencies

### Core Dependencies

| Package | Purpose |
|---------|---------|
| `expo` | Development framework |
| `react-native` | Mobile framework |
| `typescript` | Type safety |

### Navigation

| Package | Purpose |
|---------|---------|
| `@react-navigation/native` | Navigation framework |
| `@react-navigation/stack` | Stack navigation |
| `@react-navigation/bottom-tabs` | Tab navigation |
| `react-native-screens` | Native screens |
| `react-native-safe-area-context` | Safe area handling |

### UI & Styling

| Package | Purpose |
|---------|---------|
| `react-native-paper` | Material Design components |
| `react-native-calendars` | Calendar component |

### Data & Storage

| Package | Purpose |
|---------|---------|
| `@react-native-async-storage/async-storage` | Local storage |
| `date-fns` | Date manipulation |

### Forms & Validation

| Package | Purpose |
|---------|---------|
| `react-hook-form` | Form handling |
| `yup` | Schema validation |

### Notifications

| Package | Purpose |
|---------|---------|
| `expo-notifications` | Local notifications |

---

## Commands Reference

```bash
# Development
npm install          # Install dependencies
npm start            # Start Expo dev server
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator

# Code Quality
npm run lint         # Run linter
npm run format       # Format code
npm run type-check   # TypeScript check

# Testing
npm test             # Run all tests
npm test -- --watch  # Watch mode
npm test -- <file>   # Run specific test

# Build
npm run build        # Production build
```

---

## App Features Summary

### For Users
- Browse service categories (Hair, Nails, Eyebrows)
- View salon details (ratings, reviews, services, hours)
- Book appointments with calendar selection
- Choose available time slots
- Receive notifications (24hr and 1hr before)
- View upcoming and past appointments
- Cancel appointments anytime
- User profile management

### Technical Features
- Type-safe with TypeScript
- Local data persistence (AsyncStorage)
- Local push notifications
- Responsive design (iOS & Android)
- Bottom tab navigation
- Theme system for consistent UI
- Error handling and loading states
- Comprehensive test coverage

---

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Start with Phase 0, Issue #1
4. Follow issues in order within each phase
5. Mark issues as complete when done
6. Move to next phase after completing all issues

**Repository**: https://github.com/z0bla/ibook-app

**All Issues**: https://github.com/z0bla/ibook-app/issues

---

## Support

- Check issue descriptions for detailed implementation steps
- Each issue includes learning resources
- Follow the dependency order within phases
- Ask questions in issue comments if stuck

Happy coding!
