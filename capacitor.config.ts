import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.packndt.app',
  appName: 'packnd',
  webDir: 'build',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '1049011506017-9lirq54k372991r8pvo8vumjvovm4r4a.apps.googleusercontent.com',
      webClientId: '1049011506017-9lirq54k372991r8pvo8vumjvovm4r4a.apps.googleusercontent.com',  // Optional for web
      forceCodeForRefreshToken: true, // Important for getting refresh tokens
    },
  },
  android: {
    allowMixedContent: true,
    webContentsDebuggingEnabled: true,
  }

};

export default config;