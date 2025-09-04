# System Patterns - Psalmodos Mobile

## Architecture Overview
The app follows a modern React Native architecture with clear separation of concerns:

```
app/ (Expo Router pages)
├── (tabs)/ (Tab navigation)
├── mezmur-detail.tsx (Full-screen player)
└── _layout.tsx (Root layout with providers)

components/ (Reusable UI components)
├── player.tsx (Main music player)
├── PlayerControls.tsx (Play/pause/skip controls)
├── floating-track-control.tsx (Mini player)
└── ui/ (Design system components)

store/ (Zustand state management)
├── mezmur.store.ts (Music data & playback state)
└── category.store.ts (Category management)

services/ (Business logic)
├── track-player.service.js (Audio playback)
├── http-service.ts (API communication)
└── storage.service.ts (Local data persistence)
```

## Key Technical Decisions

### State Management: Zustand
- **Rationale**: Lightweight, TypeScript-friendly state management
- **Pattern**: Separate stores for different domains (mezmurs, categories)
- **Benefits**: Simple API, good performance, easy testing

### Audio Playback: React Native Track Player
- **Rationale**: Professional-grade audio library with background playback
- **Features**: Queue management, remote controls, progress tracking
- **Integration**: Service-based architecture for background playback

### UI Framework: NativeWind + Custom Components
- **Rationale**: Tailwind CSS for rapid styling, custom components for consistency
- **Pattern**: Utility-first CSS with component composition
- **Benefits**: Fast development, consistent design system

### Navigation: Expo Router
- **Rationale**: File-based routing with native navigation performance
- **Pattern**: Stack and tab navigation with typed routes
- **Benefits**: Type safety, automatic deep linking, native feel

## Component Relationships

### Player Architecture
```
floating-track-control.tsx (Mini player)
    ↓
mezmur-detail.tsx (Full player)
    ↓
player.tsx (Player container)
    ├── PlayerProgressbar.tsx
    ├── PlayerControls.tsx
    └── PlayerVolumeBar.tsx
```

### Data Flow
```
API/Storage → Store → Components → User Actions → Store Updates
```

## Design Patterns

### Service Layer Pattern
- **Audio Service**: Handles all TrackPlayer interactions
- **HTTP Service**: Manages API communication with Supabase
- **Storage Service**: Handles local data persistence with MMKV

### Store Pattern
- **Domain Separation**: Each store manages specific business logic
- **Action-Based**: Clear action methods for state updates
- **Reactive**: Components automatically re-render on state changes

### Component Composition
- **Atomic Design**: Small, reusable components (buttons, inputs)
- **Container/Presenter**: Logic separation between containers and presenters
- **Hook Pattern**: Custom hooks for shared logic (useTrackPlayerEvents)
