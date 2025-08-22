const styled = window.styled.default;

const CollectionsContainer = styled.div`
    width: 100%;
`;

const CollectionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing['3xl']};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        grid-template-columns: 1fr;
        gap: ${props => props.theme.spacing.lg};
    }
`;

const CollectionCard = styled.div`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
    
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
        transform: translateY(-4px);
    }
`;

const CollectionHeader = styled.div`
    padding: ${props => props.theme.spacing.xl};
    background: linear-gradient(135deg, 
        rgba(42, 31, 26, 0.5) 0%, 
        rgba(58, 47, 42, 0.3) 100%);
`;

const CollectionTitle = styled.h3`
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
`;

const CollectionDescription = styled.p`
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: ${props => props.theme.spacing.md};
    line-height: 1.6;
`;

const CollectionMeta = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fonts.sizes.sm};
    color: ${props => props.theme.colors.textMuted};
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
`;

const CollectionContent = styled.div`
    padding: ${props => props.theme.spacing.xl};
`;

const FragmentList = styled.div`
    margin-bottom: ${props => props.theme.spacing.lg};
`;

const FragmentItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
    padding: ${props => props.theme.spacing.md};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    margin-bottom: ${props => props.theme.spacing.sm};
    transition: all 0.3s ease;
    
    &:hover {
        border-color: ${props => props.theme.colors.secondary};
        background: rgba(212, 175, 55, 0.05);
    }
`;

const FragmentIcon = styled.div`
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    border-radius: ${props => props.theme.borderRadius.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fonts.sizes.sm};
`;

const FragmentInfo = styled.div`
    flex: 1;
`;

const FragmentName = styled.div`
    color: ${props => props.theme.colors.text};
    font-weight: ${props => props.theme.fonts.weights.medium};
    margin-bottom: ${props => props.theme.spacing.xs};
`;

const FragmentType = styled.div`
    color: ${props => props.theme.colors.textMuted};
    font-size: ${props => props.theme.fonts.sizes.xs};
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const CollectionActions = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.sm};
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
    background: ${props => props.theme.colors.background};
    border-top: 1px solid ${props => props.theme.colors.border};
`;

const SectionTitle = styled.h2`
    font-size: ${props => props.theme.fonts.sizes['3xl']};
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.xl};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
    
    &::after {
        content: '';
        flex: 1;
        height: 2px;
        background: linear-gradient(90deg, ${props => props.theme.colors.secondary}, transparent);
        margin-left: ${props => props.theme.spacing.lg};
    }
`;

const TabContainer = styled.div`
    margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const TabList = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.sm};
    margin-bottom: ${props => props.theme.spacing.xl};
    border-bottom: 2px solid ${props => props.theme.colors.border};
    overflow-x: auto;
`;

const TabButton = styled.button`
    background: ${props => props.active ? 
        `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})` :
        'transparent'};
    color: ${props => props.active ? props.theme.colors.text : props.theme.colors.textMuted};
    border: none;
    border-bottom: 3px solid ${props => props.active ? props.theme.colors.secondary : 'transparent'};
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fonts.weights.medium};
    font-size: ${props => props.theme.fonts.sizes.sm};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    
    &:hover:not(:disabled) {
        color: ${props => props.theme.colors.secondary};
        background: rgba(212, 175, 55, 0.05);
    }
`;

const FragmentCollections = () => {
    const [activeTab, setActiveTab] = React.useState('all');

    const collections = [
        {
            id: 'basic',
            title: 'Basic Fragments',
            description: 'Essential building blocks for any Liferay page - text, buttons, cards, and basic layouts.',
            icon: Icons.Shield,
            fragmentCount: 8,
            category: 'Foundation',
            complexity: 'Beginner',
            fragments: [
                { name: 'Text Display', type: 'Content', icon: Icons.Scroll },
                { name: 'Button Component', type: 'Interactive', icon: Icons.Sword },
                { name: 'Content Card', type: 'Layout', icon: Icons.Book },
                { name: 'Image Banner', type: 'Media', icon: Icons.Map }
            ]
        },
        {
            id: 'content',
            title: 'Content Display Fragments',
            description: 'Advanced components for showcasing articles, galleries, statistics, and rich content.',
            icon: Icons.Book,
            fragmentCount: 12,
            category: 'Content',
            complexity: 'Intermediate',
            fragments: [
                { name: 'Article List', type: 'Content', icon: Icons.Book },
                { name: 'Hero Banner', type: 'Layout', icon: Icons.Dragon },
                { name: 'Statistics Grid', type: 'Data', icon: Icons.Star },
                { name: 'Image Gallery', type: 'Media', icon: Icons.Map },
                { name: 'Feature Showcase', type: 'Content', icon: Icons.Crown }
            ]
        },
        {
            id: 'navigation',
            title: 'Navigation Fragments',
            description: 'Complete navigation solutions including headers, breadcrumbs, sidebars, and tab systems.',
            icon: Icons.Map,
            fragmentCount: 10,
            category: 'Navigation',
            complexity: 'Advanced',
            fragments: [
                { name: 'Main Navigation', type: 'Navigation', icon: Icons.Menu },
                { name: 'Breadcrumb Trail', type: 'Navigation', icon: Icons.Map },
                { name: 'Side Navigation', type: 'Navigation', icon: Icons.Shield },
                { name: 'Tab Interface', type: 'Interactive', icon: Icons.Scroll },
                { name: 'Mobile Menu', type: 'Navigation', icon: Icons.Menu }
            ]
        },
        {
            id: 'forms',
            title: 'Form & Input Fragments',
            description: 'User interaction components including forms, search, filters, and data entry interfaces.',
            icon: Icons.Scroll,
            fragmentCount: 6,
            category: 'Interactive',
            complexity: 'Intermediate',
            fragments: [
                { name: 'Login Form', type: 'Form', icon: Icons.Shield },
                { name: 'Search Interface', type: 'Interactive', icon: Icons.Search },
                { name: 'Contact Form', type: 'Form', icon: Icons.Scroll },
                { name: 'Filter Panel', type: 'Interactive', icon: Icons.Menu }
            ]
        },
        {
            id: 'specialized',
            title: 'Specialized Fragments',
            description: 'Unique D&D-themed components for gaming sites, character sheets, and fantasy content.',
            icon: Icons.Dragon,
            fragmentCount: 8,
            category: 'Specialty',
            complexity: 'Advanced',
            fragments: [
                { name: 'Character Sheet', type: 'Specialty', icon: Icons.Crown },
                { name: 'Dice Roller', type: 'Interactive', icon: Icons.Dice },
                { name: 'Quest Board', type: 'Content', icon: Icons.Scroll },
                { name: 'Tavern Menu', type: 'Content', icon: Icons.Book },
                { name: 'Spell List', type: 'Data', icon: Icons.Star }
            ]
        },
        {
            id: 'layout',
            title: 'Layout Fragments',
            description: 'Page structure components for creating consistent layouts and responsive designs.',
            icon: Icons.Home,
            fragmentCount: 5,
            category: 'Layout',
            complexity: 'Beginner',
            fragments: [
                { name: 'Two Column Layout', type: 'Layout', icon: Icons.Home },
                { name: 'Grid Container', type: 'Layout', icon: Icons.Map },
                { name: 'Sidebar Layout', type: 'Layout', icon: Icons.Shield },
                { name: 'Full Width Banner', type: 'Layout', icon: Icons.Dragon }
            ]
        }
    ];

    const tabs = [
        { id: 'all', label: 'All Collections', icon: Icons.Home },
        { id: 'Foundation', label: 'Foundation', icon: Icons.Shield },
        { id: 'Content', label: 'Content', icon: Icons.Book },
        { id: 'Navigation', label: 'Navigation', icon: Icons.Map },
        { id: 'Interactive', label: 'Interactive', icon: Icons.Dice },
        { id: 'Specialty', label: 'Specialty', icon: Icons.Dragon },
        { id: 'Layout', label: 'Layout', icon: Icons.Home }
    ];

    const filteredCollections = activeTab === 'all' 
        ? collections 
        : collections.filter(collection => collection.category === activeTab);

    const getComplexityColor = (complexity) => {
        switch (complexity) {
            case 'Beginner': return theme.colors.success;
            case 'Intermediate': return theme.colors.warning;
            case 'Advanced': return theme.colors.error;
            default: return theme.colors.textMuted;
        }
    };

    return React.createElement(CollectionsContainer, null,
        React.createElement(HeroCard, {
            title: 'Fragment Collections',
            subtitle: 'Comprehensive sets of Liferay fragments organized by functionality and complexity level.',
            primaryAction: {
                text: 'Download All',
                onClick: () => {}
            },
            secondaryAction: {
                text: 'View Documentation',
                onClick: () => {}
            }
        }),

        React.createElement(TabContainer, null,
            React.createElement(TabList, null,
                tabs.map(tab =>
                    React.createElement(TabButton, {
                        key: tab.id,
                        active: activeTab === tab.id,
                        onClick: () => setActiveTab(tab.id)
                    },
                        React.createElement(tab.icon, { size: 16 }),
                        tab.label
                    )
                )
            )
        ),

        React.createElement(SectionTitle, null,
            React.createElement(Icons.Scroll, { size: 32 }),
            activeTab === 'all' ? 'All Fragment Collections' : `${activeTab} Collections`
        ),

        React.createElement(CollectionGrid, null,
            filteredCollections.map(collection =>
                React.createElement(CollectionCard, { key: collection.id },
                    React.createElement(CollectionHeader, null,
                        React.createElement(CollectionTitle, null,
                            React.createElement(collection.icon, { size: 24 }),
                            collection.title
                        ),
                        React.createElement(CollectionDescription, null,
                            collection.description
                        ),
                        React.createElement(CollectionMeta, null,
                            React.createElement(MetaItem, null,
                                React.createElement('i', { className: 'fas fa-puzzle-piece' }),
                                `${collection.fragmentCount} fragments`
                            ),
                            React.createElement(MetaItem, null,
                                React.createElement('i', { className: 'fas fa-layer-group' }),
                                collection.category
                            ),
                            React.createElement(MetaItem, null,
                                React.createElement('i', { 
                                    className: 'fas fa-signal',
                                    style: { color: getComplexityColor(collection.complexity) }
                                }),
                                collection.complexity
                            )
                        )
                    ),
                    React.createElement(CollectionContent, null,
                        React.createElement('h4', {
                            style: {
                                color: theme.colors.accent,
                                marginBottom: theme.spacing.md,
                                fontSize: theme.fonts.sizes.sm,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }
                        }, 'Included Fragments'),
                        React.createElement(FragmentList, null,
                            collection.fragments.map((fragment, index) =>
                                React.createElement(FragmentItem, { key: index },
                                    React.createElement(FragmentIcon, null,
                                        React.createElement(fragment.icon, { size: 16 })
                                    ),
                                    React.createElement(FragmentInfo, null,
                                        React.createElement(FragmentName, null, fragment.name),
                                        React.createElement(FragmentType, null, fragment.type)
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(CollectionActions, null,
                        React.createElement(PrimaryButton, {
                            size: 'small',
                            icon: Icons.Book
                        }, 'View Details'),
                        React.createElement(SecondaryButton, {
                            size: 'small',
                            variant: 'ghost',
                            icon: Icons.Scroll
                        }, 'Download')
                    )
                )
            )
        ),

        // Implementation Guide Section
        React.createElement(SectionTitle, null,
            React.createElement(Icons.Map, { size: 32 }),
            'Implementation Guide'
        ),
        React.createElement('div', {
            style: {
                background: theme.colors.surface,
                border: `2px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.xl,
                marginBottom: theme.spacing.xl
            }
        },
            React.createElement('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: theme.spacing.xl
                }
            },
                React.createElement('div', null,
                    React.createElement('h3', {
                        style: {
                            color: theme.colors.secondary,
                            marginBottom: theme.spacing.lg,
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing.sm
                        }
                    },
                        React.createElement(Icons.Shield, { size: 20 }),
                        'Getting Started'
                    ),
                    React.createElement('ol', {
                        style: {
                            color: theme.colors.text,
                            paddingLeft: theme.spacing.lg,
                            lineHeight: 1.6
                        }
                    },
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Choose a fragment collection based on your needs'
                        ),
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Download the fragment files for your collection'
                        ),
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Import fragments into your Liferay instance'
                        ),
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Customize colors and styling to match your brand'
                        )
                    )
                ),
                React.createElement('div', null,
                    React.createElement('h3', {
                        style: {
                            color: theme.colors.secondary,
                            marginBottom: theme.spacing.lg,
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing.sm
                        }
                    },
                        React.createElement(Icons.Scroll, { size: 20 }),
                        'Best Practices'
                    ),
                    React.createElement('ul', {
                        style: {
                            color: theme.colors.text,
                            paddingLeft: theme.spacing.lg,
                            lineHeight: 1.6
                        }
                    },
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Test fragments on different screen sizes'
                        ),
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Maintain consistent spacing and typography'
                        ),
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Use semantic HTML for accessibility'
                        ),
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Document any customizations for your team'
                        )
                    )
                ),
                React.createElement('div', null,
                    React.createElement('h3', {
                        style: {
                            color: theme.colors.secondary,
                            marginBottom: theme.spacing.lg,
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing.sm
                        }
                    },
                        React.createElement(Icons.Crown, { size: 20 }),
                        'Advanced Usage'
                    ),
                    React.createElement('ul', {
                        style: {
                            color: theme.colors.text,
                            paddingLeft: theme.spacing.lg,
                            lineHeight: 1.6
                        }
                    },
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Combine multiple fragments for complex layouts'
                        ),
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Create custom variations for specific use cases'
                        ),
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Integrate with Liferay\'s content management features'
                        ),
                        React.createElement('li', { style: { marginBottom: theme.spacing.sm } }, 
                            'Set up automated testing for your fragments'
                        )
                    )
                )
            )
        ),

        // Quick Reference
        React.createElement('div', {
            style: {
                background: 'rgba(212, 175, 55, 0.1)',
                border: `2px solid ${theme.colors.secondary}`,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.xl
            }
        },
            React.createElement('h3', {
                style: {
                    color: theme.colors.secondary,
                    marginBottom: theme.spacing.lg,
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm
                }
            },
                React.createElement(Icons.Book, { size: 24 }),
                'Quick Reference'
            ),
            React.createElement('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: theme.spacing.lg
                }
            },
                React.createElement('div', null,
                    React.createElement('h4', {
                        style: { color: theme.colors.accent, marginBottom: theme.spacing.sm }
                    }, 'Total Fragments'),
                    React.createElement('div', {
                        style: {
                            fontSize: theme.fonts.sizes['2xl'],
                            fontWeight: theme.fonts.weights.bold,
                            color: theme.colors.secondary
                        }
                    }, '49')
                ),
                React.createElement('div', null,
                    React.createElement('h4', {
                        style: { color: theme.colors.accent, marginBottom: theme.spacing.sm }
                    }, 'Collections'),
                    React.createElement('div', {
                        style: {
                            fontSize: theme.fonts.sizes['2xl'],
                            fontWeight: theme.fonts.weights.bold,
                            color: theme.colors.secondary
                        }
                    }, '6')
                ),
                React.createElement('div', null,
                    React.createElement('h4', {
                        style: { color: theme.colors.accent, marginBottom: theme.spacing.sm }
                    }, 'Categories'),
                    React.createElement('div', {
                        style: {
                            fontSize: theme.fonts.sizes['2xl'],
                            fontWeight: theme.fonts.weights.bold,
                            color: theme.colors.secondary
                        }
                    }, '6')
                ),
                React.createElement('div', null,
                    React.createElement('h4', {
                        style: { color: theme.colors.accent, marginBottom: theme.spacing.sm }
                    }, 'Liferay Version'),
                    React.createElement('div', {
                        style: {
                            fontSize: theme.fonts.sizes.lg,
                            fontWeight: theme.fonts.weights.medium,
                            color: theme.colors.secondary
                        }
                    }, 'DXP 7.4+')
                )
            )
        )
    );
};

window.FragmentCollections = FragmentCollections;
