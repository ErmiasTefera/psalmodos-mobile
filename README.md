# Psalmodos Mobile 🎵

A React Native/Expo mobile application for streaming Ethiopian Orthodox Christian hymns (mezmurs). Built with cultural sensitivity and offline-first architecture to provide seamless access to traditional religious music.

## Features ✨

- **🎵 Music Streaming**: Professional audio playback with React Native Track Player
- **📱 Cross-Platform**: Native iOS and Android apps built with Expo
- **💾 Offline Support**: Download mezmurs for offline listening
- **🎛️ Advanced Player**: Full-featured music player with controls, progress bar, and volume
- **📖 Lyrics Display**: View lyrics while listening to hymns
- **🏷️ Categories**: Browse mezmurs by categories and themes
- **🔄 Background Playback**: Continue listening when app is backgrounded
- **🎧 Lock Screen Controls**: Control playback from lock screen and notifications

## Tech Stack 🛠️

- **Framework**: Expo SDK 53 with React Native 0.79.5
- **Navigation**: Expo Router with file-based routing
- **State Management**: Zustand for lightweight state management
- **Audio**: React Native Track Player for professional audio playback
- **UI**: NativeWind (Tailwind CSS) with custom components
- **Storage**: MMKV for high-performance local storage
- **Backend**: Supabase for content management
- **Build**: EAS Build for cross-platform deployment

## Getting Started 🚀

### Prerequisites

- Node.js (latest LTS)
- pnpm (package manager)
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- EAS CLI (for builds)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd psalmodos-mobile
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Start the development server
   ```bash
   pnpm start
   ```

### Development Commands

```bash
pnpm start         # Start Expo development server
pnpm run android   # Run on Android emulator
pnpm run ios       # Run on iOS simulator
pnpm run web       # Run on web browser
pnpm test          # Run tests
pnpm run lint      # Lint code
pnpm add <package> # Add new dependency
pnpm remove <package> # Remove dependency
```

## Project Structure 📁

```
psalmodos-mobile/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   ├── mezmur-detail.tsx  # Full-screen player
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── player.tsx         # Main music player
│   ├── PlayerControls.tsx # Play/pause/skip controls
│   ├── floating-track-control.tsx # Mini player
│   └── ui/               # Design system components
├── store/                # Zustand state management
│   ├── mezmur.store.ts   # Music data & playback state
│   └── category.store.ts # Category management
├── services/             # Business logic
│   ├── track-player.service.js # Audio playback
│   ├── http-service.ts   # API communication
│   └── storage.service.ts # Local data persistence
├── models/               # TypeScript interfaces
├── hooks/                # Custom React hooks
└── memory-bank/          # Project documentation
```

## Architecture 🏗️

### Audio Playback
- **Service-based**: Background audio handled by `track-player.service.js`
- **Queue Management**: Tracks added to player queue via Zustand store
- **State Sync**: Centralized state management across all player components

### Player Components
```
floating-track-control.tsx (Mini player)
    ↓ navigates to
mezmur-detail.tsx (Full-screen player with lyrics)
    ↓ contains
player.tsx (Player container)
    ├── PlayerProgressbar.tsx
    ├── PlayerControls.tsx
    └── PlayerVolumeBar.tsx
```

### Data Flow
```
API/Storage → Zustand Store → Components → User Actions → Store Updates
```

## Key Features Implementation

### Music Player
- Professional audio controls (play, pause, skip, volume)
- Progress bar with seek functionality
- Background playback with lock screen controls
- Queue management and track switching

### Offline Support
- Download mezmurs for offline listening
- Local storage with MMKV for high performance
- Automatic fallback to cached content when offline

### User Interface
- Modern, responsive design with NativeWind
- Floating mini player that persists across screens
- Full-screen player with lyrics display
- Tab-based navigation for easy content discovery

## Build & Deployment 📦

### EAS Build Configuration

The project uses EAS Build for cross-platform deployment:

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for development
eas build --profile development

# Build for preview
eas build --profile preview

# Build for production
eas build --profile production
```

### Build Profiles

- **Development**: Custom development builds with debugging
- **Preview**: Internal distribution builds for testing
- **Production**: App store ready builds

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Cultural Considerations 🌍

This app is designed with deep respect for Ethiopian Orthodox Christian traditions:

- **Cultural Sensitivity**: UI and UX designed to honor religious context
- **Accessibility**: Works for users of all technical skill levels
- **Offline Priority**: Essential for areas with limited connectivity
- **Performance**: Optimized for various device capabilities

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Ethiopian Orthodox Church for preserving these beautiful hymns
- React Native Track Player for excellent audio capabilities
- Expo team for the amazing development platform
- All contributors who help preserve this cultural heritage

## Support 💬

For support, email [your-email@example.com] or join our community discussions.

---

**Psalmodos Mobile** - Preserving Ethiopian Orthodox musical heritage through modern technology.