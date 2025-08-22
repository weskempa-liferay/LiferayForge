import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        font-family: ${props => props.theme.fonts.body};
        background: linear-gradient(135deg, 
            ${props => props.theme.colors.background} 0%, 
            #2a1a0f 50%, 
            ${props => props.theme.colors.background} 100%);
        color: ${props => props.theme.colors.text};
        line-height: 1.6;
        min-height: 100vh;
        position: relative;
        overflow-x: hidden;
    }

    body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 0, 0, 0.03) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.01'%3E%3Cpath d='m0 0h40v40h-40z'/%3E%3C/g%3E%3C/svg%3E");
        pointer-events: none;
        z-index: -1;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: ${props => props.theme.fonts.heading};
        font-weight: ${props => props.theme.fonts.weights.bold};
        color: ${props => props.theme.colors.secondary};
        margin-bottom: ${props => props.theme.spacing.md};
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    h1 {
        font-size: ${props => props.theme.fonts.sizes['4xl']};
        letter-spacing: 0.05em;
    }

    h2 {
        font-size: ${props => props.theme.fonts.sizes['3xl']};
        letter-spacing: 0.025em;
    }

    h3 {
        font-size: ${props => props.theme.fonts.sizes['2xl']};
    }

    p {
        margin-bottom: ${props => props.theme.spacing.md};
        color: ${props => props.theme.colors.text};
    }

    a {
        color: ${props => props.theme.colors.secondary};
        text-decoration: none;
        transition: all 0.3s ease;
        
        &:hover {
            color: ${props => props.theme.colors.secondaryHover};
            text-shadow: 0 0 5px ${props => props.theme.colors.secondary};
        }
    }

    button {
        cursor: pointer;
        border: none;
        outline: none;
        font-family: inherit;
        transition: all 0.3s ease;
    }

    input, textarea, select {
        font-family: inherit;
        outline: none;
        transition: all 0.3s ease;
    }

    .parchment-texture {
        background: linear-gradient(135deg, 
            rgba(232, 227, 211, 0.95) 0%, 
            rgba(200, 180, 140, 0.95) 100%);
        background-image: 
            radial-gradient(circle at 100% 50%, transparent 20%, rgba(139, 69, 19, 0.1) 21%, rgba(139, 69, 19, 0.1) 34%, transparent 35%, transparent),
            linear-gradient(0deg, transparent 24%, rgba(139, 69, 19, 0.05) 25%, rgba(139, 69, 19, 0.05) 26%, transparent 27%, transparent 74%, rgba(139, 69, 19, 0.05) 75%, rgba(139, 69, 19, 0.05) 76%, transparent 77%, transparent);
        color: ${props => props.theme.colors.textDark};
    }

    .fantasy-border {
        border: 2px solid ${props => props.theme.colors.secondary};
        border-image: linear-gradient(45deg, 
            ${props => props.theme.colors.secondary}, 
            ${props => props.theme.colors.accent}, 
            ${props => props.theme.colors.secondary}) 1;
        position: relative;
    }

    .fantasy-border::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        background: linear-gradient(45deg, 
            ${props => props.theme.colors.secondary}, 
            transparent, 
            ${props => props.theme.colors.secondary});
        border-radius: ${props => props.theme.borderRadius.md};
        opacity: 0.3;
        z-index: -1;
    }

    .glow-effect {
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
    }

    .scroll-smooth {
        scroll-behavior: smooth;
    }

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        body {
            font-size: ${props => props.theme.fonts.sizes.sm};
        }
        
        h1 {
            font-size: ${props => props.theme.fonts.sizes['3xl']};
        }
        
        h2 {
            font-size: ${props => props.theme.fonts.sizes['2xl']};
        }
    }
`;

export default GlobalStyles;