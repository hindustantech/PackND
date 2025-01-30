import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // appId: 'com.packndt.app',
   appId:'1:783045027871:android:348fab21d038487c760d2a',
  appName: 'packnd',
  webDir: 'build',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '783045027871-24ql3d901b6nfpt8p1tso92ouq700a69.apps.googleusercontent.com',
      webClientId: '783045027871-24ql3d901b6nfpt8p1tso92ouq700a69.apps.googleusercontent.com',  // Optional for web
      forceCodeForRefreshToken: true, // Important for getting refresh tokens
    },
  },
  android: {
    allowMixedContent: true,
    webContentsDebuggingEnabled: true,
  }

};

export default config;
