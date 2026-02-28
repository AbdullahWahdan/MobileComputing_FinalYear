# 📱 Mobile Computing — Final Year Assignments

Repository for Mobile Computing final year coursework assignments.

---

## Task 1 — To-Do List App

A **React Native** To-Do List application built with **Expo SDK 54**, featuring goal tracking, animated list items, a progress bar, and a dark UI design.

### Features
- ➕ Add goals via a text input and button
- ✅ Mark goals as complete with a checkbox (strikethrough style)
- 🗑️ Delete goals from the list
- 📊 Progress bar showing completed vs total goals
- 🎨 Spring animations on new goal items
- 🌙 Dark theme with a violet/emerald color palette

### Tech Stack
| | |
|---|---|
| Framework | React Native + Expo SDK 54 |
| Language | JavaScript (JSX) |
| Fonts | System fonts (SF Pro on iOS, Roboto on Android) |
| State | `useState`, `useCallback` hooks |
| Lists | `FlatList` |
| Animation | `Animated.spring` |

### 🔗 Links

| Resource | URL |
|---|---|
| 🧪 Expo Snack (Live Demo) | [snack.expo.dev/@amwahdan245/todolist](https://snack.expo.dev/@amwahdan245/todolist) |
| 🎬 Video Demo | [Watch on Google Drive](https://drive.google.com/file/d/1XtsWqiRLrpaJKnbXYh0UNZsWxsRwXHGX/view?usp=drivesdk) |

### 📁 Project Structure
```
ToDo_List_Task/
├── TodoListApp/
│   ├── App.js          # Main application component
│   ├── index.js        # Entry point
│   ├── app.json        # Expo configuration
│   ├── package.json    # Dependencies
│   └── assets/         # Icons and splash screen images
└── report.html         # Assignment report (color palette, fonts, links)
```

### 🚀 Running Locally
```bash
cd ToDo_List_Task/TodoListApp
npm install
npx expo start
```
Then scan the QR code with **Expo Go** on your phone.

---

*Final Year — Mobile Computing Assignment*
