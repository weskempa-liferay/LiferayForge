const styled = window.styled.default;

const NavContainer = styled.nav`
    background: ${props => props.theme.colors.surface};
    border-bottom: 2px solid ${props => props.theme.colors.border};
    padding: ${props => props.theme.spacing.md} 0;
`;

const NavContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.lg};
    display: flex;
    gap: ${props => props.theme.spacing.xl};
    overflow-x: auto;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        padding: 0 ${props => props.theme.spacing.md};
        gap: ${props => props.theme.spacing.md};
    }
`;

const NavSection = styled.div`
    min-width: 200px;
    
    h3 {
        font-size: ${props => props.theme.fonts.sizes.lg};
        margin-bottom: ${props => props.theme.spacing.sm};
        color: ${props => props.theme.colors.secondary};
        border-bottom: 1px solid ${props => props.theme.colors.border};
        padding-bottom: ${props => props.theme.spacing.sm};
    }
`;

const NavList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const NavListItem = styled.li`
    margin-bottom: ${props => props.theme.spacing.xs};
`;

const NavLink = styled.a`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.textMuted};
    font-size: ${props => props.theme.fonts.sizes.sm};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.sm};
    transition: all 0.3s ease;
    
    &:hover {
        color: ${props => props.theme.colors.text};
        background: rgba(212, 175, 55, 0.05);
        padding-left: ${props => props.theme.spacing.md};
    }
`;

const Navigation = () => {
    const sections = [
        {
            title: 'Layout Components',
            icon: Icons.Home,
            items: [
                { name: 'Header', href: '#header' },
                { name: 'Navigation', href: '#navigation' },
                { name: 'Footer', href: '#footer' },
                { name: 'Grid System', href: '#grid' }
            ]
        },
        {
            title: 'Content Display',
            icon: Icons.Book,
            items: [
                { name: 'Cards', href: '#cards' },
                { name: 'Articles', href: '#articles' },
                { name: 'Media Gallery', href: '#media' },
                { name: 'Featured Content', href: '#featured' }
            ]
        },
        {
            title: 'Interactive Elements',
            icon: Icons.Dice,
            items: [
                { name: 'Buttons', href: '#buttons' },
                { name: 'Forms', href: '#forms' },
                { name: 'Search', href: '#search' },
                { name: 'Modals', href: '#modals' }
            ]
        },
        {
            title: 'Fragment Collections',
            icon: Icons.Scroll,
            items: [
                { name: 'Basic Fragments', href: '#basic-fragments' },
                { name: 'Content Fragments', href: '#content-fragments' },
                { name: 'Navigation Fragments', href: '#nav-fragments' },
                { name: 'Custom Fragments', href: '#custom-fragments' }
            ]
        }
    ];

    return React.createElement(NavContainer, null,
        React.createElement(NavContent, null,
            sections.map(section =>
                React.createElement(NavSection, { key: section.title },
                    React.createElement('h3', null,
                        React.createElement(section.icon, { size: 16 }),
                        ' ',
                        section.title
                    ),
                    React.createElement(NavList, null,
                        section.items.map(item =>
                            React.createElement(NavListItem, { key: item.name },
                                React.createElement(NavLink, { href: item.href },
                                    React.createElement(Icons.ChevronDown, { size: 12 }),
                                    item.name
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

window.Navigation = Navigation;
