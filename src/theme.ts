import { createTheme } from '@mui/material/styles';

export const warmColors = {
  background: '#FFF7F0',
  text: '#4B2923',
  mutedText: '#765047',
  orange: '#C2410C',
  coral: '#BE123C',
  pink: '#9D174D',
  border: '#F0D3C8',
};

export const warmGradients = {
  accent: 'linear-gradient(110deg, #C2410C 0%, #BE123C 55%, #9D174D 100%)',
  peach: 'linear-gradient(135deg, #FFFAF5 0%, #FFE8D6 100%)',
  rose: 'linear-gradient(135deg, #FFF9F6 0%, #FFE4EC 100%)',
  home: 'linear-gradient(135deg, #FFFAF5, #FFE8D6 55%, #FFE4EC)',
};

const focusRing = {
  outline: `3px solid ${warmColors.pink}`,
  outlineOffset: '3px',
};

const theme = createTheme({
  palette: {
    primary: { main: warmColors.orange },
    secondary: { main: warmColors.coral },
    error: { main: warmColors.pink },
    text: { primary: warmColors.text, secondary: warmColors.mutedText },
    background: { default: warmColors.background, paper: '#FFFAF5' },
  },
  typography: {
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    button: { textTransform: 'none', fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    h1: { fontSize: 'clamp(3.5rem, 12vw, 6rem)', fontWeight: 700 },
    h3: { fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 800 },
    h5: { fontSize: '1.35rem', fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--warm-border': warmColors.border,
          '--warm-home-gradient': warmGradients.home,
          '--warm-card-shadow': '0 8px 24px rgba(106, 49, 44, 0.08)',
        },
        body: {
          minHeight: '100vh',
          background: 'radial-gradient(ellipse at top left, #FFE8D6 0%, transparent 55%), radial-gradient(ellipse at bottom right, #FFE4EC 0%, transparent 55%), #FFF7F0',
        },
        'a:focus-visible': focusRing,
      },
    },
    MuiAppBar: {
      styleOverrides: { root: { background: warmGradients.accent, color: '#FFFFFF', boxShadow: '0 4px 20px rgba(157, 23, 77, 0.16)' } },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 20, border: `1px solid ${warmColors.border}`, background: warmGradients.peach, boxShadow: '0 8px 24px rgba(106, 49, 44, 0.08)' } },
    },
    MuiCardContent: {
      styleOverrides: { root: { padding: 16, '@media (min-width: 600px)': { padding: 24 }, '&:last-child': { paddingBottom: 24 } } },
    },
    MuiButton: {
      styleOverrides: {
        root: { minHeight: 44, padding: '10px 20px', borderRadius: 12, '&.Mui-focusVisible': focusRing },
        containedPrimary: {
          background: warmGradients.accent, color: '#FFFFFF',
          boxShadow: '0 4px 12px rgba(190, 18, 60, 0.18)',
          '&:hover': { background: warmGradients.accent, filter: 'brightness(0.92)', boxShadow: '0 6px 16px rgba(190, 18, 60, 0.24)' },
          '&.Mui-disabled': { background: '#EADDD7', color: warmColors.mutedText, boxShadow: 'none', filter: 'none' },
        },
        outlinedSecondary: { borderColor: warmColors.coral, '&:hover': { borderColor: warmColors.pink, backgroundColor: '#FFE4EC' } },
      },
    },
    MuiIconButton: { styleOverrides: { root: ({ ownerState }) => ({ '&.Mui-focusVisible': { ...focusRing, outlineColor: ownerState.color === 'inherit' ? '#FFFFFF' : warmColors.pink } }) } },
    MuiOutlinedInput: {
      styleOverrides: { root: { backgroundColor: '#FFFFFF', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B07D6A' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: warmColors.coral }, '&.Mui-focused': { outline: `2px solid ${warmColors.pink}`, outlineOffset: 2 }, '&.Mui-disabled': { backgroundColor: '#EADDD7' } } },
    },
    MuiRadio: { styleOverrides: { root: { color: warmColors.mutedText, '&.Mui-focusVisible': focusRing } } },
    MuiMenuItem: {
      styleOverrides: { root: { '&:hover, &.Mui-focusVisible': { backgroundColor: '#FFE8D6' }, '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE4EC', color: warmColors.pink } } },
    },
  },
});

export default theme;
