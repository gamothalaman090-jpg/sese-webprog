import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0a0a0a', // Ink Black
        },
        secondary: {
            main: '#0047FF', // International Blue
        },
        background: {
            default: '#fafafa',
            paper: '#ffffff',
        },
        text: {
            primary: '#0a0a0a',
            secondary: '#71717a',
        },
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        h1: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 950,
            letterSpacing: '-0.05em',
            lineHeight: 1,
        },
        h2: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
        },
        h3: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            letterSpacing: '-0.02em',
        },
        h4: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        h5: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
        },
        h6: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontSize: '0.7rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#27272a',
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: '#71717a',
        },
        button: {
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '0.15em',
        },
    },
    shape: {
        borderRadius: 0, // Sharp Editorial edges
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    padding: '10px 24px',
                    transition: 'all 0.2s ease-in-out',
                    border: '2px solid #0a0a0a',
                    '&:hover': {
                        backgroundColor: '#0a0a0a',
                        color: '#ffffff',
                    },
                },
                outlined: {
                    border: '2px solid #0a0a0a',
                    '&:hover': {
                        border: '2px solid #0a0a0a',
                    }
                }
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: 'none',
                    border: '1px solid #e4e4e7',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    '&:hover': {
                        borderColor: '#0a0a0a',
                        transform: 'translateY(-4px)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(250, 250, 250, 0.8)',
                    backdropFilter: 'blur(8px)',
                    color: '#0a0a0a',
                    boxShadow: 'none',
                    borderBottom: '1px solid #0a0a0a',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: '1px solid #0a0a0a',
                    backgroundColor: '#fafafa',
                },
            },
        },
    },
});

export default theme;
