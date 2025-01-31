import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.packndt.app',
  appName: 'packnd',
  webDir: 'build',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      // serverClientId: '783045027871-5bv1kiereils6qhvenum0luqcl6lj4ve.apps.googleusercontent.com', // Web Client ID
      androidClientId: '783045027871-24ql3d901b6nfpt8p1tso92ouq700a69.apps.googleusercontent.com', // Android Client ID
      forceCodeForRefreshToken: true, // Needed for refresh tokens
    },
  },
  android: {
    allowMixedContent: true,
    webContentsDebuggingEnabled: true,
  }
};

export default config;
