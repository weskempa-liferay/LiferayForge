const styled = window.styled.default;

const FooterContainer = styled.footer`
    background: linear-gradient(135deg, 
        rgba(26, 15, 10, 0.98) 0%, 
        rgba(42, 31, 26, 0.95) 100%);
    border-top: 3px solid ${props => props.theme.colors.secondary};
    margin-top: ${props => props.theme.spacing['5xl']};
    padding: ${props => props.theme.spacing['3xl']} 0 ${props => props.theme.spacing.xl};
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.lg};
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${props => props.theme.spacing.xl};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        padding: 0 ${props => props.theme.spacing.md};
        gap: ${props => props.theme.spacing.lg};
    }
`;

const FooterSection = styled.div`
    h4 {
        font-size: ${props => props.theme.fonts.sizes.lg};
        margin-bottom: ${props => props.theme.spacing.md};
        color: ${props => props.theme.colors.secondary};
    }
    
    p {
        color: ${props => props.theme.colors.textMuted};
        font-size: ${props => props.theme.fonts.sizes.sm};
        line-height: 1.6;
    }
`;

const FooterList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const FooterListItem = styled.li`
    margin-bottom: ${props => props.theme.spacing.sm};
`;

const FooterLink = styled.a`
    color: ${props => props.theme.colors.textMuted};
    font-size: ${props => props.theme.fonts.sizes.sm};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
    transition: all 0.3s ease;
    
    &:hover {
        color: ${props => props.theme.colors.secondary};
        padding-left: ${props => props.theme.spacing.sm};
    }
`;

const FooterBottom = styled.div`
    border-top: 1px solid ${props => props.theme.colors.border};
    margin-top: ${props => props.theme.spacing.xl};
    padding-top: ${props => props.theme.spacing.lg};
    text-align: center;
    
    p {
        color: ${props => props.theme.colors.textMuted};
        font-size: ${props => props.theme.fonts.sizes.sm};
        margin: 0;
    }
`;

const Footer = () => {
    return React.createElement(FooterContainer, null,
        React.createElement(FooterContent, null,
            React.createElement(FooterSection, null,
                React.createElement('h4', null, 'About This Library'),
                React.createElement('p', null, 
                    'A comprehensive D&D-themed component library designed as a reference for Liferay DXP fragment development. Built with React and styled-components to demonstrate fantasy-themed UI patterns.'
                )
            ),
            React.createElement(FooterSection, null,
                React.createElement('h4', null, 'Component Categories'),
                React.createElement(FooterList, null,
                    React.createElement(FooterListItem, null,
                        React.createElement(FooterLink, { href: '#layout' },
                            React.createElement(Icons.Home, { size: 14 }),
                            'Layout Components'
                        )
                    ),
                    React.createElement(FooterListItem, null,
                        React.createElement(FooterLink, { href: '#content' },
                            React.createElement(Icons.Book, { size: 14 }),
                            'Content Display'
                        )
                    ),
                    React.createElement(FooterListItem, null,
                        React.createElement(FooterLink, { href: '#interactive' },
                            React.createElement(Icons.Dice, { size: 14 }),
                            'Interactive Elements'
                        )
                    ),
                    React.createElement(FooterListItem, null,
                        React.createElement(FooterLink, { href: '#forms' },
                            React.createElement(Icons.Scroll, { size: 14 }),
                            'Form Components'
                        )
                    )
                )
            ),
            React.createElement(FooterSection, null,
                React.createElement('h4', null, 'Fragment Collections'),
                React.createElement(FooterList, null,
                    React.createElement(FooterListItem, null,
                        React.createElement(FooterLink, { href: '#basic-fragments' },
                            React.createElement(Icons.Shield, { size: 14 }),
                            'Basic Fragments'
                        )
                    ),
                    React.createElement(FooterListItem, null,
                        React.createElement(FooterLink, { href: '#content-fragments' },
                            React.createElement(Icons.Map, { size: 14 }),
                            'Content Fragments'
                        )
                    ),
                    React.createElement(FooterListItem, null,
                        React.createElement(FooterLink, { href: '#navigation-fragments' },
                            React.createElement(Icons.Crown, { size: 14 }),
                            'Navigation Fragments'
                        )
                    )
                )
            ),
            React.createElement(FooterSection, null,
                React.createElement('h4', null, 'Liferay Resources'),
                React.createElement(FooterList, null,
                    React.createElement(FooterListItem, null,
                        React.createElement(FooterLink, { 
                            href: 'https://learn.liferay.com/w/dxp/sites/creating-pages/page-fragments-and-widgets/using-fragments/default-fragments-reference',
                            target: '_blank',
                            rel: 'noopener noreferrer'
                        },
                            React.createElement(Icons.Book, { size: 14 }),
                            'Fragment Reference'
                        )
                    ),
                    React.createElement(FooterListItem, null,
                        React.createElement(FooterLink, { 
                            href: 'https://learn.liferay.com/w/dxp/development/client-extensions/client-extension-reference',
                            target: '_blank',
                            rel: 'noopener noreferrer'
                        },
                            React.createElement(Icons.Scroll, { size: 14 }),
                            'Client Extensions'
                        )
                    )
                )
            )
        ),
        React.createElement(FooterBottom, null,
            React.createElement('p', null, 
                '© 2025 D&D Component Library. Built for Liferay DXP fragment development reference.'
            )
        )
    );
};

window.Footer = Footer;
