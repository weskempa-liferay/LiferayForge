const { useState } = React;
const styled = window.styled.default;

const HeaderContainer = styled.header`
    background: linear-gradient(135deg, 
        rgba(42, 31, 26, 0.95) 0%, 
        rgba(26, 15, 10, 0.98) 100%);
    border-bottom: 3px solid ${props => props.theme.colors.secondary};
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: ${props => props.theme.shadows.lg};
`;

const HeaderContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        padding: ${props => props.theme.spacing.md};
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
    
    h1 {
        font-size: ${props => props.theme.fonts.sizes['2xl']};
        margin: 0;
        background: linear-gradient(135deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.accent});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: none;
        
        @media (max-width: ${props => props.theme.breakpoints.md}) {
            font-size: ${props => props.theme.fonts.sizes.xl};
        }
    }
`;

const NavMenu = styled.nav`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.lg};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        display: ${props => props.isOpen ? 'flex' : 'none'};
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: ${props => props.theme.colors.surface};
        flex-direction: column;
        padding: ${props => props.theme.spacing.lg};
        border-top: 1px solid ${props => props.theme.colors.border};
    }
`;

const NavItem = styled.a`
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fonts.weights.medium};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.md};
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
        color: ${props => props.theme.colors.secondary};
        background: rgba(212, 175, 55, 0.1);
        box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
    }
    
    &:active {
        transform: translateY(1px);
    }
`;

const MobileMenuButton = styled.button`
    display: none;
    background: transparent;
    color: ${props => props.theme.colors.secondary};
    font-size: ${props => props.theme.fonts.sizes.xl};
    padding: ${props => props.theme.spacing.sm};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        display: block;
    }
    
    &:hover {
        color: ${props => props.theme.colors.secondaryHover};
    }
`;

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return React.createElement(HeaderContainer, null,
        React.createElement(HeaderContent, null,
            React.createElement(Logo, null,
                React.createElement(Icons.Dragon, { size: 32, color: theme.colors.secondary }),
                React.createElement('h1', null, 'D&D Component Library')
            ),
            React.createElement(NavMenu, { isOpen: isMobileMenuOpen },
                React.createElement(NavItem, { href: '#components' }, 'Components'),
                React.createElement(NavItem, { href: '#fragments' }, 'Fragments'),
                React.createElement(NavItem, { href: '#documentation' }, 'Documentation'),
                React.createElement(NavItem, { href: '#examples' }, 'Examples')
            ),
            React.createElement(MobileMenuButton, { onClick: toggleMobileMenu },
                React.createElement(Icons.Menu)
            )
        )
    );
};

window.Header = Header;
