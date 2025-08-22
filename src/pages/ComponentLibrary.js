const styled = window.styled.default;

const LibraryContainer = styled.div`
    width: 100%;
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

const ComponentGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing['3xl']};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        grid-template-columns: 1fr;
        gap: ${props => props.theme.spacing.lg};
    }
`;

const ComponentShowcase = styled.div`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing.xl};
    transition: all 0.3s ease;
    
    &:hover {
        border-color: ${props => props.theme.colors.secondary};
        box-shadow: ${props => props.theme.shadows.lg};
    }
`;

const ComponentTitle = styled.h3`
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.md};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
`;

const ComponentDescription = styled.p`
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: ${props => props.theme.spacing.lg};
    line-height: 1.6;
`;

const ComponentPreview = styled.div`
    background: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.lg};
`;

const VariationList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
`;

const VariationItem = styled.div`
    padding: ${props => props.theme.spacing.md};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.sm};
    background: ${props => props.theme.colors.background};
`;

const VariationTitle = styled.h4`
    color: ${props => props.theme.colors.accent};
    font-size: ${props => props.theme.fonts.sizes.sm};
    margin-bottom: ${props => props.theme.spacing.sm};
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const UsageNote = styled.div`
    background: rgba(212, 175, 55, 0.1);
    border-left: 4px solid ${props => props.theme.colors.secondary};
    padding: ${props => props.theme.spacing.md};
    margin-top: ${props => props.theme.spacing.lg};
    border-radius: ${props => props.theme.borderRadius.sm};
    
    .note-title {
        font-weight: ${props => props.theme.fonts.weights.semibold};
        color: ${props => props.theme.colors.secondary};
        margin-bottom: ${props => props.theme.spacing.sm};
    }
    
    .note-content {
        color: ${props => props.theme.colors.text};
        font-size: ${props => props.theme.fonts.sizes.sm};
        margin: 0;
    }
`;

const ComponentLibrary = () => {
    return React.createElement(LibraryContainer, null,
        // Introduction
        React.createElement(HeroCard, {
            title: 'Component Library',
            subtitle: 'Explore the complete collection of D&D-themed UI components designed for Liferay DXP integration.',
            primaryAction: {
                text: 'View All Fragments',
                onClick: () => {}
            }
        }),

        // Layout Components Section
        React.createElement(SectionTitle, null,
            React.createElement(Icons.Home, { size: 32 }),
            'Layout Components'
        ),
        React.createElement(ComponentGrid, null,
            React.createElement(ComponentShowcase, null,
                React.createElement(ComponentTitle, null,
                    React.createElement(Icons.Shield, { size: 20 }),
                    'Header Component'
                ),
                React.createElement(ComponentDescription, null,
                    'A responsive navigation header with fantasy theming, dropdown menus, and mobile support.'
                ),
                React.createElement(ComponentPreview, null,
                    React.createElement('div', {
                        style: {
                            background: theme.colors.surface,
                            padding: theme.spacing.md,
                            borderRadius: theme.borderRadius.md,
                            border: `1px solid ${theme.colors.border}`
                        }
                    },
                        React.createElement('div', {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }
                        },
                            React.createElement('div', {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: theme.spacing.sm,
                                    color: theme.colors.secondary,
                                    fontFamily: theme.fonts.heading
                                }
                            },
                                React.createElement(Icons.Dragon, { size: 24 }),
                                'Site Brand'
                            ),
                            React.createElement('div', {
                                style: {
                                    display: 'flex',
                                    gap: theme.spacing.md
                                }
                            },
                                React.createElement('a', {
                                    href: '#',
                                    style: {
                                        color: theme.colors.text,
                                        textDecoration: 'none',
                                        fontSize: theme.fonts.sizes.sm
                                    }
                                }, 'Home'),
                                React.createElement('a', {
                                    href: '#',
                                    style: {
                                        color: theme.colors.textMuted,
                                        textDecoration: 'none',
                                        fontSize: theme.fonts.sizes.sm
                                    }
                                }, 'About'),
                                React.createElement('a', {
                                    href: '#',
                                    style: {
                                        color: theme.colors.textMuted,
                                        textDecoration: 'none',
                                        fontSize: theme.fonts.sizes.sm
                                    }
                                }, 'Contact')
                            )
                        )
                    )
                ),
                React.createElement(UsageNote, null,
                    React.createElement('div', { className: 'note-title' }, 'Liferay Usage'),
                    React.createElement('p', { className: 'note-content' }, 
                        'Perfect for master page templates and header fragments. Supports Liferay navigation menus and user account integration.'
                    )
                )
            ),

            React.createElement(ComponentShowcase, null,
                React.createElement(ComponentTitle, null,
                    React.createElement(Icons.Map, { size: 20 }),
                    'Navigation Component'
                ),
                React.createElement(ComponentDescription, null,
                    'Hierarchical navigation with category sections, perfect for organizing content areas.'
                ),
                React.createElement(ComponentPreview, null,
                    React.createElement('div', {
                        style: {
                            background: theme.colors.surface,
                            padding: theme.spacing.md,
                            borderRadius: theme.borderRadius.md,
                            border: `1px solid ${theme.colors.border}`
                        }
                    },
                        React.createElement('h4', {
                            style: {
                                color: theme.colors.secondary,
                                fontSize: theme.fonts.sizes.sm,
                                marginBottom: theme.spacing.sm
                            }
                        }, 'Content Categories'),
                        React.createElement('ul', {
                            style: {
                                listStyle: 'none',
                                padding: 0,
                                margin: 0
                            }
                        },
                            React.createElement('li', {
                                style: { marginBottom: theme.spacing.xs }
                            },
                                React.createElement('a', {
                                    href: '#',
                                    style: {
                                        color: theme.colors.textMuted,
                                        textDecoration: 'none',
                                        fontSize: theme.fonts.sizes.sm,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: theme.spacing.xs
                                    }
                                },
                                    React.createElement(Icons.Book, { size: 12 }),
                                    'Articles'
                                )
                            ),
                            React.createElement('li', {
                                style: { marginBottom: theme.spacing.xs }
                            },
                                React.createElement('a', {
                                    href: '#',
                                    style: {
                                        color: theme.colors.textMuted,
                                        textDecoration: 'none',
                                        fontSize: theme.fonts.sizes.sm,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: theme.spacing.xs
                                    }
                                },
                                    React.createElement(Icons.Scroll, { size: 12 }),
                                    'Guides'
                                )
                            )
                        )
                    )
                ),
                React.createElement(UsageNote, null,
                    React.createElement('div', { className: 'note-title' }, 'Liferay Usage'),
                    React.createElement('p', { className: 'note-content' }, 
                        'Ideal for sidebar navigation fragments and category-based content organization.'
                    )
                )
            )
        ),

        // Interactive Components Section
        React.createElement(SectionTitle, null,
            React.createElement(Icons.Dice, { size: 32 }),
            'Interactive Components'
        ),
        React.createElement(ComponentGrid, null,
            React.createElement(ComponentShowcase, null,
                React.createElement(ComponentTitle, null,
                    React.createElement(Icons.Sword, { size: 20 }),
                    'Button Components'
                ),
                React.createElement(ComponentDescription, null,
                    'Fantasy-themed buttons with multiple variants, sizes, and interactive states.'
                ),
                React.createElement(ComponentPreview, null,
                    React.createElement(VariationList, null,
                        React.createElement(VariationItem, null,
                            React.createElement(VariationTitle, null, 'Primary Button'),
                            React.createElement(PrimaryButton, { icon: Icons.Sword }, 'Call to Action')
                        ),
                        React.createElement(VariationItem, null,
                            React.createElement(VariationTitle, null, 'Secondary Button'),
                            React.createElement(SecondaryButton, { icon: Icons.Shield }, 'Secondary Action')
                        ),
                        React.createElement(VariationItem, null,
                            React.createElement(VariationTitle, null, 'Small Buttons'),
                            React.createElement('div', {
                                style: { display: 'flex', gap: theme.spacing.sm }
                            },
                                React.createElement(PrimaryButton, { size: 'small' }, 'Small'),
                                React.createElement(SecondaryButton, { size: 'small', variant: 'ghost' }, 'Ghost')
                            )
                        )
                    )
                ),
                React.createElement(UsageNote, null,
                    React.createElement('div', { className: 'note-title' }, 'Liferay Usage'),
                    React.createElement('p', { className: 'note-content' }, 
                        'Perfect for CTAs, form submissions, and navigation actions. Supports Liferay portlet actions and page redirects.'
                    )
                )
            ),

            React.createElement(ComponentShowcase, null,
                React.createElement(ComponentTitle, null,
                    React.createElement(Icons.Search, { size: 20 }),
                    'Search Component'
                ),
                React.createElement(ComponentDescription, null,
                    'Advanced search interface with autocomplete, filters, and result previews.'
                ),
                React.createElement(ComponentPreview, null,
                    React.createElement(SearchBar, {
                        placeholder: 'Search the realm...',
                        results: [
                            {
                                title: 'Sample Result',
                                description: 'Example search result',
                                icon: Icons.Book
                            }
                        ],
                        showResults: false
                    })
                ),
                React.createElement(UsageNote, null,
                    React.createElement('div', { className: 'note-title' }, 'Liferay Usage'),
                    React.createElement('p', { className: 'note-content' }, 
                        'Integrates with Liferay Search and can be configured as a search portlet or fragment.'
                    )
                )
            )
        ),

        // Content Display Components Section
        React.createElement(SectionTitle, null,
            React.createElement(Icons.Book, { size: 32 }),
            'Content Display Components'
        ),
        React.createElement(ComponentGrid, null,
            React.createElement(ComponentShowcase, null,
                React.createElement(ComponentTitle, null,
                    React.createElement(Icons.Scroll, { size: 20 }),
                    'Card Components'
                ),
                React.createElement(ComponentDescription, null,
                    'Versatile content cards for displaying articles, products, or any structured content.'
                ),
                React.createElement(ComponentPreview, null,
                    React.createElement(VariationList, null,
                        React.createElement(VariationItem, null,
                            React.createElement(VariationTitle, null, 'Standard Card'),
                            React.createElement(ContentCard, {
                                title: 'Example Content',
                                description: 'This is how content cards display information.',
                                icon: Icons.Book,
                                tags: ['Example', 'Demo']
                            })
                        ),
                        React.createElement(VariationItem, null,
                            React.createElement(VariationTitle, null, 'Featured Card'),
                            React.createElement(ContentCard, {
                                title: 'Featured Content',
                                description: 'This card has enhanced styling for important content.',
                                icon: Icons.Crown,
                                variant: 'featured',
                                tags: ['Featured', 'Important']
                            })
                        )
                    )
                ),
                React.createElement(UsageNote, null,
                    React.createElement('div', { className: 'note-title' }, 'Liferay Usage'),
                    React.createElement('p', { className: 'note-content' }, 
                        'Excellent for asset publishers, blog entries, and custom content types. Supports Liferay\'s content metadata.'
                    )
                )
            ),

            React.createElement(ComponentShowcase, null,
                React.createElement(ComponentTitle, null,
                    React.createElement(Icons.Star, { size: 20 }),
                    'Statistics Components'
                ),
                React.createElement(ComponentDescription, null,
                    'Eye-catching statistics displays with icons, values, and trend indicators.'
                ),
                React.createElement(ComponentPreview, null,
                    React.createElement('div', {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                            gap: theme.spacing.md
                        }
                    },
                        React.createElement(StatCard, {
                            icon: Icons.Users,
                            value: '2.4K',
                            label: 'Users',
                            change: '+12%',
                            changeType: 'positive'
                        }),
                        React.createElement(StatCard, {
                            icon: Icons.Crown,
                            value: '156',
                            label: 'Projects',
                            change: '+5%',
                            changeType: 'positive'
                        })
                    )
                ),
                React.createElement(UsageNote, null,
                    React.createElement('div', { className: 'note-title' }, 'Liferay Usage'),
                    React.createElement('p', { className: 'note-content' }, 
                        'Great for dashboards and analytics displays. Can integrate with Liferay Analytics Cloud data.'
                    )
                )
            )
        ),

        // Form Components Section
        React.createElement(SectionTitle, null,
            React.createElement(Icons.Scroll, { size: 32 }),
            'Form Components'
        ),
        React.createElement(ComponentGrid, null,
            React.createElement(ComponentShowcase, null,
                React.createElement(ComponentTitle, null,
                    React.createElement(Icons.Shield, { size: 20 }),
                    'Login Form'
                ),
                React.createElement(ComponentDescription, null,
                    'Complete login interface with validation, error handling, and accessibility features.'
                ),
                React.createElement(ComponentPreview, null,
                    React.createElement('div', {
                        style: {
                            maxWidth: '300px',
                            margin: '0 auto'
                        }
                    },
                        React.createElement(LoginForm, {
                            onSubmit: () => {},
                            onForgotPassword: () => {},
                            onSignUp: () => {}
                        })
                    )
                ),
                React.createElement(UsageNote, null,
                    React.createElement('div', { className: 'note-title' }, 'Liferay Usage'),
                    React.createElement('p', { className: 'note-content' }, 
                        'Can be customized for Liferay authentication, user registration, and custom form portlets.'
                    )
                )
            ),

            React.createElement(ComponentShowcase, null,
                React.createElement(ComponentTitle, null,
                    React.createElement(Icons.Map, { size: 20 }),
                    'Media Gallery'
                ),
                React.createElement(ComponentDescription, null,
                    'Interactive image gallery with filtering, modal views, and responsive layout.'
                ),
                React.createElement(ComponentPreview, null,
                    React.createElement(ImageGallery, {
                        images: [
                            {
                                id: 1,
                                title: 'Sample Gallery',
                                description: 'Demonstration of gallery component',
                                category: 'Demo',
                                icon: 'map'
                            }
                        ]
                    })
                ),
                React.createElement(UsageNote, null,
                    React.createElement('div', { className: 'note-title' }, 'Liferay Usage'),
                    React.createElement('p', { className: 'note-content' }, 
                        'Perfect for document libraries, image assets, and media-rich content displays.'
                    )
                )
            )
        ),

        // Usage Guidelines
        React.createElement(SectionTitle, null,
            React.createElement(Icons.Book, { size: 32 }),
            'Implementation Guidelines'
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
            React.createElement('h3', {
                style: {
                    color: theme.colors.secondary,
                    marginBottom: theme.spacing.lg
                }
            }, 'Adapting Components for Liferay'),
            React.createElement('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: theme.spacing.lg
                }
            },
                React.createElement('div', null,
                    React.createElement('h4', {
                        style: {
                            color: theme.colors.accent,
                            marginBottom: theme.spacing.sm
                        }
                    }, 'Fragment Development'),
                    React.createElement('ul', {
                        style: {
                            color: theme.colors.text,
                            paddingLeft: theme.spacing.lg
                        }
                    },
                        React.createElement('li', null, 'Copy CSS styles to fragment CSS'),
                        React.createElement('li', null, 'Replace React props with Liferay editables'),
                        React.createElement('li', null, 'Use Liferay\'s icon library or CDN icons'),
                        React.createElement('li', null, 'Test responsive behavior across devices')
                    )
                ),
                React.createElement('div', null,
                    React.createElement('h4', {
                        style: {
                            color: theme.colors.accent,
                            marginBottom: theme.spacing.sm
                        }
                    }, 'Theme Integration'),
                    React.createElement('ul', {
                        style: {
                            color: theme.colors.text,
                            paddingLeft: theme.spacing.lg
                        }
                    },
                        React.createElement('li', null, 'Define CSS custom properties for colors'),
                        React.createElement('li', null, 'Use relative units for responsive design'),
                        React.createElement('li', null, 'Implement dark/light mode variations'),
                        React.createElement('li', null, 'Ensure accessibility compliance')
                    )
                ),
                React.createElement('div', null,
                    React.createElement('h4', {
                        style: {
                            color: theme.colors.accent,
                            marginBottom: theme.spacing.sm
                        }
                    }, 'Content Management'),
                    React.createElement('ul', {
                        style: {
                            color: theme.colors.text,
                            paddingLeft: theme.spacing.lg
                        }
                    },
                        React.createElement('li', null, 'Configure editable elements for content authors'),
                        React.createElement('li', null, 'Set up proper content structure'),
                        React.createElement('li', null, 'Implement content validation'),
                        React.createElement('li', null, 'Plan for multilingual support')
                    )
                )
            )
        )
    );
};

window.ComponentLibrary = ComponentLibrary;
