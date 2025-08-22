const theme = {
    colors: {
        primary: '#8B0000',        // Dark red
        primaryHover: '#A0001A',   // Lighter red on hover
        secondary: '#D4AF37',      // Gold
        secondaryHover: '#FFD700', // Brighter gold
        background: '#1a0f0a',     // Very dark brown
        surface: '#2a1f1a',       // Dark brown
        surfaceLight: '#3a2f2a',  // Medium brown
        text: '#E8E3D3',          // Parchment white
        textMuted: '#B8A888',     // Muted parchment
        textDark: '#4A3429',      // Dark brown text
        border: '#8B4513',        // Saddle brown
        accent: '#CD853F',        // Peru
        success: '#228B22',       // Forest green
        warning: '#FF8C00',       // Dark orange
        error: '#DC143C'          // Crimson
    },
    fonts: {
        heading: "'Cinzel', serif",
        body: "'Crimson Text', serif",
        sizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem'
        },
        weights: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700
        }
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
        '4xl': '4rem',
        '5xl': '5rem'
    },
    borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem'
    },
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        glow: '0 0 20px rgba(212, 175, 55, 0.3)'
    },
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    }
};

export default theme;