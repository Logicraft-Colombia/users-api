import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'app-primary': {
          50: '#ecfeff',
          100: '#d0f9fd',
          200: '#a7f1fa',
          300: '#6ae5f6',
          400: '#ffffff',
          500: '#06212c',
          600: '#0b8eaf',
          700: '#10728e',
          800: '#175c73',
          900: '#174d62',
          950: '#06212c',
          DEFAULT: '#06212c',
        },
        'app-secondary': {
          50: '#f2fbf8',
          100: '#d3f4e9',
          200: '#a8e7d4',
          300: '#74d4ba',
          400: '#ffffff',
          500: '#0b2824',
          600: '#237e6c',
          700: '#1f6658',
          800: '#1d5248',
          900: '#1c453d',
          950: '#0b2824',
          DEFAULT: '#0b2824',
        },
      }
    }
  }
}
