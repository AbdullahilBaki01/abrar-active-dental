import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const repoName = process.env.GITHUB_REPOSITORY
    ? process.env.GITHUB_REPOSITORY.split('/')[1]
    : 'abrar-active-dental';

  return {
    base: mode === 'production' ? `/${repoName}/` : '/',
    plugins: [react()],
    server: {
      port: 3000,
      open: false,
    },
  };
});

