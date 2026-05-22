# 🍔 Chwiggy - Premium Food Delivery App

A high-fidelity React Native mobile application built with **Expo SDK 55**, utilizing the modern **Expo Router** routing framework. 

This project serves as a comprehensive implementation of intermediate and advanced mobile navigation architectures, focusing on nested routers, dynamic route parameter passing, custom native OS headers, dynamic tab badges, nested drawer overlays, and custom scheme deep linking. It is styled with a stunning dark-mode aesthetic featuring vibrant orange accents.

---

## 🎬 App Demo

> [!NOTE]
> **Video Demo:** Watch the video below to see the app's smooth animations, navigation flows, and interactive features.

https://github.com/user-attachments/assets/dee667c5-f0cd-465a-b83d-51388cdd61ba


---

## 📸 UI Showcase

<div align="center">
  <img src="https://github.com/user-attachments/assets/62b8f9dd-b614-473a-ad43-658af8220178" width="250" style="margin: 10px; border-radius: 16px; border: 1px solid #333;" alt="Home Screen"/>
  <img src="https://github.com/user-attachments/assets/29b52135-b61f-4793-bfcd-a385cac2c5ce" width="250" style="margin: 10px; border-radius: 16px; border: 1px solid #333;" alt="Restaurant Menu"/>
  <img src="https://github.com/user-attachments/assets/2c6895ac-4485-4821-8f9e-814143856019" width="250" style="margin: 10px; border-radius: 16px; border: 1px solid #333;" alt="Cart & Checkout"/>
  
  <br/>
  
  <img src="https://github.com/user-attachments/assets/0a88895c-0a0d-4020-8c2e-3cafc251c558" width="250" style="margin: 10px; border-radius: 16px; border: 1px solid #333;" alt="Global Search"/>
  <img src="https://github.com/user-attachments/assets/3f8222e2-3dba-47c7-81bc-2b17cfacacdb" width="250" style="margin: 10px; border-radius: 16px; border: 1px solid #333;" alt="Profile Drawer"/>
  <img src="https://github.com/user-attachments/assets/0fcc2b65-28ce-4aff-8815-13b725611d87" width="250" style="margin: 10px; border-radius: 16px; border: 1px solid #333;" alt="Settings & Help"/>

  <br/>

  <img src="https://github.com/user-attachments/assets/1b08f1ad-e326-4d04-9080-9df8e9e9ce2c" width="250" style="margin: 10px; border-radius: 16px; border: 1px solid #333;" alt="Extra Screen 1"/>
  <img src="https://github.com/user-attachments/assets/adbf0ea7-0ec2-4a27-a117-764e2612977c" width="250" style="margin: 10px; border-radius: 16px; border: 1px solid #333;" alt="Extra Screen 2"/>
</div>

*(Replace the placeholder links above with direct paths to your actual `.png` screenshot files!)*

---

## 📱 Architecture & Data Model

Chwiggy is designed with a reactive routing architecture where physical directory layouts govern route boundaries and screen access, coordinated dynamically by a central **Route Guard**.

### Data Hierarchy
The app realistically mimics a food delivery platform utilizing a **Restaurant → Menu → Food Item** model. 
- The `Home` screen lists **Restaurants**.
- Tapping a restaurant opens a **Menu View** (`restaurant/[id].tsx`), displaying specific **Food Items**.
- Users add **Food Items** to their cart, and the app tracks both the food item details and the host restaurant.

### Route Tree
```text
Root (src/app/_layout.tsx)
 ├── (auth) Group (Stack Navigator) [Unauthenticated Flow]
 │    ├── onboarding.tsx  (Welcome & Complete Onboarding State)
 │    └── login.tsx       (Collect User Details & Sign In)
 │
 └── (app) Group (Stack Navigator) [Authenticated Flow]
      ├── (tabs) Sibling (Bottom Tab Navigator)
      │    ├── home (Stack Navigator)
      │    │    └── index.tsx     (Restaurant Lists)
      │    ├── search.tsx         (Global Food Search)
      │    ├── orders.tsx         (Active Orders & Dynamic Cart Badge)
      │    └── profile (Drawer Navigator Nested inside Tab)
      │         ├── index.tsx     (Profile Dashboard)
      │         ├── orders.tsx    (Order History log)
      │         ├── settings.tsx  (Preferences Panel)
      │         └── help.tsx      (FAQ & Support)
      │
      ├── restaurant/
      │    └── [id].tsx           (Menu Screen - Hides Tab Bar!)
      │
      └── cart.tsx                (Checkout Screen - Hides Tab Bar!)
```

---

## 🛠️ Technology Stack
* **Framework**: React Native with [Expo SDK 55](https://docs.expo.dev/versions/v55.0.0/)
* **Routing**: [Expo Router v3](https://docs.expo.dev/router/introduction/) (Built on React Navigation v7)
* **Local Session Persistence**: [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
* **Icons**: `@expo/vector-icons` (Ionicons)
* **Type Safety**: TypeScript
* **Design & Styling**: Pure Vanilla React Native Stylesheets (Dark Mode)

---

## 🚀 Installation & Setup Guide

Follow these steps to get the app running on your local machine.

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed. Download the [Expo Go](https://expo.dev/go) app on your physical iOS/Android device, or configure local Android/iOS emulators.

### 2. Install Dependencies
Clone the repository, navigate into the directory, and run:
```bash
npm install
```

### 3. Sync Native Storage Bridges
Install the compatible native module wrapper for AsyncStorage using Expo:
```bash
npx expo install @react-native-async-storage/async-storage
```

### 4. Start the Application
Boot the Metro bundler with a clean cache:
```bash
npx expo start -c
```
- Press **`a`** to open on Android Emulator.
- Press **`i`** to open on iOS Simulator.
- **Scan the QR code** with your camera (iOS) or Expo Go app (Android) to test natively on a physical device.

---

## 🔗 Deep Linking & Routing

Chwiggy supports custom URI schemes. Tapping a link formatted as `foodapp://restaurant/[id]` will immediately wake up the app and launch the designated Restaurant Menu screen!

### Testing Deep Links on Emulator
With your Expo dev server active, execute the following command in a new terminal:

**For Android Emulator:**
```bash
npx uri-scheme open foodapp://restaurant/103 --android
```

**For iOS Simulator:**
```bash
npx uri-scheme open foodapp://restaurant/103 --ios
```

**Result:** The app will instantly open the **South Indian Express** menu directly, bypassing normal navigation flows!
