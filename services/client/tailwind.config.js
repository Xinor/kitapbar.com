module.exports = {
  mode: 'jit',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        modalWrapper: {
          '0%': { backgroundColor: 'rgba(0, 0, 0, 0)' },
          '100%': { backgroundColor: 'rgba(0, 0, 0, .16)' },
        },
        modalWrapperOut: {
          '0%': { backgroundColor: 'rgba(0, 0, 0, .16)' },
          '100%': { backgroundColor: 'rgba(0, 0, 0, 0)' },
        },
        modalBox: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.1)' },
          '80%': { transform: 'scale(.98)' },
          '100%': { transform: 'scale(1)' },
        },
        modalBoxOut: {
          '0%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(.98)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
      animation: {
        'modalWrapper': 'modalWrapper 300ms ease-in-out forwards',
        'modalWrapper_out': 'modalWrapperOut 300ms ease-in-out forwards',
        'modalBox': 'modalBox 400ms ease-in-out forwards',
        'modalBox_out': 'modalBoxOut 400ms ease-in-out forwards',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        bg: 'var(--bg)',
        bgs: 'var(--bgs)',
        link: 'var(--link)'
      }
    },
  },
  plugins: [],
}
