const styled = window.styled.default;

const ArticleListContainer = styled.div`
    width: 100%;
`;

const ArticleItem = styled.article`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.lg};
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(180deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.accent});
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }
    
    &:hover {
        border-color: ${props => props.theme.colors.secondary};
        box-shadow: ${props => props.theme.shadows.lg};
        transform: translateX(4px);
        
        &::before {
            transform: translateX(0);
        }
    }
`;

const ArticleHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.lg};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        flex-direction: column;
        gap: ${props => props.theme.spacing.md};
    }
`;

const ArticleIcon = styled.div`
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    border-radius: ${props => props.theme.borderRadius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fonts.sizes.xl};
`;

const ArticleContent = styled.div`
    flex: 1;
`;

const ArticleTitle = styled.h3`
    font-size: ${props => props.theme.fonts.sizes['2xl']};
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

const ArticleMeta = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textMuted};
    font-size: ${props => props.theme.fonts.sizes.sm};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        flex-wrap: wrap;
        gap: ${props => props.theme.spacing.md};
    }
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
`;

const ArticleExcerpt = styled.p`
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.lg};
`;

const ArticleFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: ${props => props.theme.spacing.lg};
    border-top: 1px solid ${props => props.theme.colors.border};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        flex-direction: column;
        gap: ${props => props.theme.spacing.md};
        align-items: flex-start;
    }
`;

const ArticleTags = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.sm};
    flex-wrap: wrap;
`;

const Tag = styled.span`
    background: rgba(212, 175, 55, 0.1);
    color: ${props => props.theme.colors.secondary};
    font-size: ${props => props.theme.fonts.sizes.xs};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.full};
    border: 1px solid rgba(212, 175, 55, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const ReadMoreButton = styled.a`
    color: ${props => props.theme.colors.secondary};
    font-weight: ${props => props.theme.fonts.weights.medium};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    transition: all 0.3s ease;
    
    &:hover {
        color: ${props => props.theme.colors.secondaryHover};
        gap: ${props => props.theme.spacing.sm};
    }
`;

const LoadMoreButton = styled.div`
    text-align: center;
    margin-top: ${props => props.theme.spacing.xl};
`;

const ArticleList = ({
    articles = [],
    showLoadMore = false,
    onLoadMore,
    ...props
}) => {
    // Default articles for demonstration
    const defaultArticles = [
        {
            id: 1,
            title: 'Building Epic Campaigns in D&D',
            excerpt: 'Learn the art of creating memorable adventures that will keep your players engaged for sessions to come. From world-building to NPC development.',
            author: 'Dungeon Master Supreme',
            date: '3 days ago',
            readTime: '8 min read',
            category: 'DM Guide',
            tags: ['Campaign', 'World Building', 'NPCs'],
            icon: 'map',
            slug: 'building-epic-campaigns'
        },
        {
            id: 2,
            title: 'Character Development Beyond Stats',
            excerpt: 'Discover how to create rich backstories and meaningful character arcs that enhance roleplay and create deeper connections to the game world.',
            author: 'Roleplay Expert',
            date: '1 week ago',
            readTime: '6 min read',
            category: 'Player Guide',
            tags: ['Character', 'Roleplay', 'Backstory'],
            icon: 'crown',
            slug: 'character-development'
        },
        {
            id: 3,
            title: 'Mastering Combat Encounters',
            excerpt: 'Strategic tips for creating balanced, exciting combat encounters that challenge players without overwhelming them.',
            author: 'Tactical Sage',
            date: '2 weeks ago',
            readTime: '10 min read',
            category: 'Combat',
            tags: ['Combat', 'Strategy', 'Balance'],
            icon: 'sword',
            slug: 'mastering-combat'
        },
        {
            id: 4,
            title: 'The Art of Improvisation',
            excerpt: 'How to handle unexpected player actions and create compelling narratives on the fly during your gaming sessions.',
            author: 'Improv Master',
            date: '3 weeks ago',
            readTime: '7 min read',
            category: 'DM Guide',
            tags: ['Improvisation', 'Storytelling', 'Tips'],
            icon: 'book-open',
            slug: 'art-of-improvisation'
        }
    ];

    const displayArticles = articles.length > 0 ? articles : defaultArticles;

    const getIconComponent = (iconName) => {
        const iconMap = {
            map: Icons.Map,
            crown: Icons.Crown,
            sword: Icons.Sword,
            'book-open': Icons.Book,
            scroll: Icons.Scroll,
            dragon: Icons.Dragon
        };
        return iconMap[iconName] || Icons.Book;
    };

    return React.createElement(ArticleListContainer, props,
        displayArticles.map(article => {
            const IconComponent = getIconComponent(article.icon);
            
            return React.createElement(ArticleItem, { key: article.id },
                React.createElement(ArticleHeader, null,
                    React.createElement(ArticleIcon, null,
                        React.createElement(IconComponent, { size: 28 })
                    ),
                    React.createElement(ArticleContent, null,
                        React.createElement(ArticleTitle, null,
                            React.createElement('a', { href: `#article/${article.slug}` }, article.title)
                        ),
                        React.createElement(ArticleMeta, null,
                            React.createElement(MetaItem, null,
                                React.createElement(Icons.Users, { size: 14 }),
                                article.author
                            ),
                            React.createElement(MetaItem, null,
                                React.createElement('i', { className: 'fas fa-clock' }),
                                article.date
                            ),
                            React.createElement(MetaItem, null,
                                React.createElement('i', { className: 'fas fa-book-reader' }),
                                article.readTime
                            ),
                            React.createElement(MetaItem, null,
                                React.createElement('i', { className: 'fas fa-folder' }),
                                article.category
                            )
                        ),
                        React.createElement(ArticleExcerpt, null, article.excerpt)
                    )
                ),
                React.createElement(ArticleFooter, null,
                    React.createElement(ArticleTags, null,
                        article.tags.map((tag, index) =>
                            React.createElement(Tag, { key: index }, tag)
                        )
                    ),
                    React.createElement(ReadMoreButton, { href: `#article/${article.slug}` },
                        'Read More',
                        React.createElement('i', { className: 'fas fa-arrow-right' })
                    )
                )
            );
        }),
        
        showLoadMore && React.createElement(LoadMoreButton, null,
            React.createElement(SecondaryButton, {
                icon: Icons.ChevronDown,
                onClick: onLoadMore
            }, 'Load More Articles')
        )
    );
};

window.ArticleList = ArticleList;
