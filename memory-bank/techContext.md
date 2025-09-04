# Technical Context - Psalmodos Mobile

## Technology Stack

### Core Framework
- **Expo SDK 50**: Development platform and build system
- **React Native 0.73.6**: Cross-platform mobile framework
- **TypeScript**: Type-safe JavaScript development
- **Expo Router**: File-based navigation system

### Audio & Media
- **React Native Track Player 4.1.1**: Professional audio playback
- **Expo File System**: Local file management for downloads
- **React Native MMKV**: High-performance local storage

### UI & Styling
- **NativeWind 4.1.23**: Tailwind CSS for React Native
- **Lucide React Native**: Icon library
- **React Native Reanimated**: Smooth animations
- **React Native Gesture Handler**: Touch interactions

### State Management
- **Zustand 5.0.3**: Lightweight state management
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
npm install
npx expo install
```

### Development Commands
```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm test           # Run tests
npm run lint       # Lint code
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
