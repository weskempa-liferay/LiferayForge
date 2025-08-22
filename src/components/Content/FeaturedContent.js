const styled = window.styled.default;

const FeaturedContainer = styled.div`
    width: 100%;
    margin: ${props => props.theme.spacing['2xl']} 0;
`;

const SectionTitle = styled.h2`
    font-size: ${props => props.theme.fonts.sizes['3xl']};
    text-align: center;
    margin-bottom: ${props => props.theme.spacing['2xl']};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.theme.spacing.md};
    
    &::before,
    &::after {
        content: '';
        flex: 1;
        height: 2px;
        background: linear-gradient(90deg, transparent, ${props => props.theme.colors.secondary}, transparent);
        max-width: 100px;
    }
`;

const FeaturedGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.xl};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        grid-template-columns: 1fr;
        gap: ${props => props.theme.spacing.lg};
    }
`;

const FeaturedCard = styled.div`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.accent});
    }
    
    &:hover {
        border-color: ${props => props.theme.colors.secondary};
        box-shadow: ${props => props.theme.shadows.xl};
        transform: translateY(-8px);
    }
    
    ${props => props.featured && `
        border-color: ${props.theme.colors.secondary};
        background: linear-gradient(135deg, 
            ${props.theme.colors.surface} 0%, 
            rgba(212, 175, 55, 0.05) 100%);
        
        &::before {
            height: 6px;
        }
    `}
`;

const CardImagePlaceholder = styled.div`
    height: 200px;
    background: linear-gradient(135deg, 
        ${props => props.theme.colors.background} 0%, 
        ${props => props.theme.colors.surface} 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.textMuted};
    font-size: ${props => props.theme.fonts.sizes['3xl']};
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 0, 0, 0.1) 0%, transparent 50%);
    }
    
    i {
        position: relative;
        z-index: 1;
    }
`;

const CardContent = styled.div`
    padding: ${props => props.theme.spacing.xl};
`;

const CardTitle = styled.h3`
    font-size: ${props => props.theme.fonts.sizes.xl};
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.secondary};
    
    a {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s ease;
        
        &:hover {
            text-shadow: 0 0 5px ${props => props.theme.colors.secondary};
        }
    }
`;

const CardMeta = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textMuted};
    font-size: ${props => props.theme.fonts.sizes.sm};
    flex-wrap: wrap;
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
`;

const CardDescription = styled.p`
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.lg};
`;

const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: ${props => props.theme.spacing.lg};
    border-top: 1px solid ${props => props.theme.colors.border};
`;

const Badge = styled.div`
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fonts.sizes.xs};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.full};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: ${props => props.theme.fonts.weights.semibold};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
`;

const ViewAllButton = styled.div`
    text-align: center;
    margin-top: ${props => props.theme.spacing.xl};
`;

const FeaturedContent = ({
    title = "Featured Adventures",
    content = [],
    showViewAll = true,
    onViewAll,
    ...props
}) => {
    // Default featured content for demonstration
    const defaultContent = [
        {
            id: 1,
            title: 'The Dragon\'s Hoard Collection',
            description: 'A comprehensive set of components for displaying treasure, loot, and magical items in your Liferay fragments.',
            type: 'Component Collection',
            author: 'Fragment Master',
            date: '2 days ago',
            featured: true,
            icon: 'dragon',
            link: '#collection/dragons-hoard'
        },
        {
            id: 2,
            title: 'Tavern Menu Fragment',
            description: 'Perfect for displaying menus, price lists, or any structured content with fantasy theming.',
            type: 'Fragment',
            author: 'UI Bard',
            date: '5 days ago',
            featured: false,
            icon: 'scroll',
            link: '#fragment/tavern-menu'
        },
        {
            id: 3,
            title: 'Character Sheet Layout',
            description: 'A comprehensive layout fragment for displaying character information, stats, and abilities.',
            type: 'Layout Fragment',
            author: 'Design Paladin',
            date: '1 week ago',
            featured: false,
            icon: 'crown',
            link: '#fragment/character-sheet'
        }
    ];

    const displayContent = content.length > 0 ? content : defaultContent;

    const getIconComponent = (iconName) => {
        const iconMap = {
            dragon: Icons.Dragon,
            scroll: Icons.Scroll,
            crown: Icons.Crown,
            sword: Icons.Sword,
            book: Icons.Book,
            map: Icons.Map
        };
        return iconMap[iconName] || Icons.Star;
    };

    const getBadgeIcon = (type) => {
        if (type.includes('Collection')) return Icons.Dragon;
        if (type.includes('Layout')) return Icons.Map;
        return Icons.Scroll;
    };

    return React.createElement(FeaturedContainer, props,
        React.createElement(SectionTitle, null,
            React.createElement(Icons.Star, { size: 32 }),
            title
        ),
        
        React.createElement(FeaturedGrid, null,
            displayContent.map(item => {
                const IconComponent = getIconComponent(item.icon);
                const BadgeIcon = getBadgeIcon(item.type);
                
                return React.createElement(FeaturedCard, {
                    key: item.id,
                    featured: item.featured
                },
                    React.createElement(CardImagePlaceholder, null,
                        React.createElement(IconComponent, { size: 64 })
                    ),
                    React.createElement(CardContent, null,
                        React.createElement(CardTitle, null,
                            React.createElement('a', { href: item.link }, item.title)
                        ),
                        React.createElement(CardMeta, null,
                            React.createElement(MetaItem, null,
                                React.createElement(Icons.Users, { size: 12 }),
                                item.author
                            ),
                            React.createElement(MetaItem, null,
                                React.createElement('i', { className: 'fas fa-clock' }),
                                item.date
                            )
                        ),
                        React.createElement(CardDescription, null, item.description),
                        React.createElement(CardFooter, null,
                            React.createElement(Badge, null,
                                React.createElement(BadgeIcon, { size: 10 }),
                                item.type
                            ),
                            React.createElement(SecondaryButton, {
                                size: 'small',
                                variant: 'ghost',
                                icon: Icons.Book
                            }, 'View Details')
                        )
                    )
                );
            })
        ),
        
        showViewAll && React.createElement(ViewAllButton, null,
            React.createElement(PrimaryButton, {
                icon: Icons.Map,
                onClick: onViewAll
            }, 'View All Collections')
        )
    );
};

window.FeaturedContent = FeaturedContent;
