# Technical Context - Psalmodos Mobile

## Technology Stack

### Core Framework
- **Expo SDK 53**: Development platform and build system
- **React Native 0.79.5**: Cross-platform mobile framework
- **React 19.0.0**: Latest React version
- **TypeScript 5.8.3**: Type-safe JavaScript development
- **Expo Router 5.1.5**: File-based navigation system

### Audio & Media
- **React Native Track Player 4.1.2**: Professional audio playback
- **Expo File System 18.1.11**: Local file management for downloads
- **React Native MMKV 2.12.2**: High-performance local storage

### UI & Styling
- **NativeWind 4.1.23**: Tailwind CSS for React Native
- **Lucide React Native 0.469.0**: Icon library
- **React Native Reanimated 3.17.5**: Smooth animations
- **React Native Gesture Handler 2.24.0**: Touch interactions

### State Management
- **Zustand 5.0.8**: Lightweight state management
- **React Hooks**: Component state and lifecycle management

### Backend & Storage
- **Supabase**: Backend-as-a-Service for data and authentication
- **MMKV**: Local key-value storage for offline data
- **Expo File System**: File system access for downloads

### Development Tools
- **EAS Build**: Cloud build service for app distribution
- **Expo Dev Client**: Custom development builds
- **Jest**: Testing framework
- **ESLint**: Code linting and formatting

## Development Setup

### Prerequisites
- Node.js (latest LTS)
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- EAS CLI (for builds)

### Installation
```bash
pnpm install
npx expo install
```

### Development Commands
```bash
pnpm start         # Start Expo development server
pnpm run android   # Run on Android
pnpm run ios       # Run on iOS
pnpm run web       # Run on web
pnpm test          # Run tests
pnpm run lint      # Lint code
pnpm add <package> # Add new dependency
pnpm remove <package> # Remove dependency
```

### Build Configuration
- **EAS Build**: Configured for development, preview, and production builds
- **Android**: APK builds for internal distribution
- **iOS**: Native builds with proper provisioning

## Technical Constraints

### Performance
- **Audio Streaming**: Optimized for various network conditions
- **Memory Management**: Efficient handling of audio buffers
- **Battery Usage**: Background playback optimization

### Platform Limitations
- **iOS**: Background audio requires proper entitlements
- **Android**: Audio focus management for phone calls
- **Storage**: Limited local storage for offline content

### Dependencies
- **React Native Track Player**: Requires native configuration
- **Expo Modules**: Some features require custom development builds
- **Platform APIs**: File system and audio permissions

## Architecture Decisions

### Monorepo Structure
- Single codebase for iOS and Android
- Shared business logic and UI components
- Platform-specific optimizations where needed

### Data Flow
- **Remote First**: Fetch from Supabase, cache locally
- **Offline Fallback**: Use cached data when offline
- **Progressive Enhancement**: Basic functionality works offline

### Security
- **API Keys**: Environment-based configuration
- **Local Storage**: Encrypted storage for sensitive data
- **Network**: HTTPS for all API communications
