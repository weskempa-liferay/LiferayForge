const styled = window.styled.default;

const FragmentContainer = styled.div`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing.xl};
    margin: ${props => props.theme.spacing.lg} 0;
    position: relative;
`;

const FragmentTitle = styled.h3`
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.md};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
    
    &::after {
        content: 'Content Fragment';
        background: rgba(139, 0, 0, 0.1);
        color: ${props => props.theme.colors.primary};
        font-size: ${props => props.theme.fonts.sizes.xs};
        padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
        border-radius: ${props => props.theme.borderRadius.full};
        margin-left: auto;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
`;

const FragmentDescription = styled.p`
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: ${props => props.theme.spacing.lg};
    font-style: italic;
`;

const FragmentPreview = styled.div`
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.lg};
    background: ${props => props.theme.colors.background};
`;

const CodeBlock = styled.pre`
    background: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.lg};
    overflow-x: auto;
    font-size: ${props => props.theme.fonts.sizes.sm};
    color: ${props => props.theme.colors.textMuted};
    
    code {
        color: ${props => props.theme.colors.text};
    }
`;

// Hero Banner Fragment
const HeroBannerFragment = () => {
    const fragmentCode = `<!-- Hero Banner Fragment for Liferay -->
<div class="fantasy-hero-banner" style="background-image: url('[#backgroundImage]')">
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <div class="hero-icon">
            <i class="fas fa-[#heroIcon]"></i>
        </div>
        <h1 class="hero-title">[#title]</h1>
        <p class="hero-subtitle">[#subtitle]</p>
        <div class="hero-actions">
            <a href="[#primaryLink]" class="btn-primary">
                <i class="fas fa-sword"></i>
                [#primaryText]
            </a>
            <a href="[#secondaryLink]" class="btn-secondary">
                <i class="fas fa-book"></i>
                [#secondaryText]
            </a>
        </div>
    </div>
</div>

<style>
.fantasy-hero-banner {
    position: relative;
    min-height: 400px;
    background: linear-gradient(135deg, #1a0f0a 0%, #2a1a0f 50%, #1a0f0a 100%);
    background-size: cover;
    background-position: center;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 15, 10, 0.7);
}

.hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 48px;
    max-width: 800px;
}

.hero-icon {
    font-size: 64px;
    color: #D4AF37;
    margin-bottom: 24px;
}

.hero-title {
    font-family: 'Cinzel', serif;
    font-size: 48px;
    color: #D4AF37;
    margin-bottom: 16px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
    font-size: 18px;
    color: #E8E3D3;
    margin-bottom: 32px;
    font-style: italic;
}
</style>`;

    return React.createElement(FragmentContainer, null,
        React.createElement(FragmentTitle, null,
            React.createElement(Icons.Dragon, { size: 20 }),
            'Hero Banner Fragment'
        ),
        React.createElement(FragmentDescription, null,
            'A dramatic hero section with background image support, icon, title, subtitle, and call-to-action buttons.'
        ),
        React.createElement(FragmentPreview, null,
            React.createElement(HeroCard, {
                title: 'Welcome to the Realm',
                subtitle: 'Begin your legendary adventure with powerful fragments and mystical components.',
                primaryAction: { text: 'Start Quest', onClick: () => {} },
                secondaryAction: { text: 'View Codex', onClick: () => {} }
            })
        ),
        React.createElement(CodeBlock, null,
            React.createElement('code', null, fragmentCode)
        )
    );
};

// Article List Fragment
const ArticleListFragment = () => {
    const fragmentCode = `<!-- Article List Fragment for Liferay -->
<div class="fantasy-article-list">
    <div class="section-header">
        <h2 class="section-title">
            <i class="fas fa-[#sectionIcon]"></i>
            [#sectionTitle]
        </h2>
        <p class="section-description">[#sectionDescription]</p>
    </div>
    
    <div class="articles-container">
        <!-- Article items will be dynamically generated -->
        <article class="article-item">
            <div class="article-header">
                <div class="article-icon">
                    <i class="fas fa-[#articleIcon]"></i>
                </div>
                <div class="article-content">
                    <h3 class="article-title">
                        <a href="[#articleUrl]">[#articleTitle]</a>
                    </h3>
                    <div class="article-meta">
                        <span class="meta-item">
                            <i class="fas fa-user"></i>
                            [#author]
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-clock"></i>
                            [#publishDate]
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-folder"></i>
                            [#category]
                        </span>
                    </div>
                    <p class="article-excerpt">[#excerpt]</p>
                </div>
            </div>
            <div class="article-footer">
                <div class="article-tags">
                    <span class="tag">[#tag1]</span>
                    <span class="tag">[#tag2]</span>
                </div>
                <a href="[#articleUrl]" class="read-more">
                    Read More
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    </div>
</div>

<style>
.fantasy-article-list {
    background: #2a1f1a;
    border: 2px solid #8B4513;
    border-radius: 12px;
    padding: 32px;
}

.section-header {
    text-align: center;
    margin-bottom: 32px;
}

.section-title {
    font-family: 'Cinzel', serif;
    font-size: 32px;
    color: #D4AF37;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.article-item {
    background: #1a0f0a;
    border: 2px solid #8B4513;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
    transition: all 0.3s ease;
}

.article-item:hover {
    border-color: #D4AF37;
    transform: translateX(4px);
}
</style>`;

    return React.createElement(FragmentContainer, null,
        React.createElement(FragmentTitle, null,
            React.createElement(Icons.Book, { size: 20 }),
            'Article List Fragment'
        ),
        React.createElement(FragmentDescription, null,
            'A dynamic article listing component with meta information, tags, and responsive layout.'
        ),
        React.createElement(FragmentPreview, null,
            React.createElement(ArticleList, {
                articles: [
                    {
                        id: 1,
                        title: 'Sample Article',
                        excerpt: 'This is how articles would appear in your Liferay fragment.',
                        author: 'Fragment Author',
                        date: 'Now',
                        readTime: '2 min read',
                        category: 'Example',
                        tags: ['Demo', 'Fragment'],
                        icon: 'book',
                        slug: 'sample-article'
                    }
                ]
            })
        ),
        React.createElement(CodeBlock, null,
            React.createElement('code', null, fragmentCode)
        )
    );
};

// Statistics Display Fragment
const StatsDisplayFragment = () => {
    const fragmentCode = `<!-- Statistics Display Fragment for Liferay -->
<div class="fantasy-stats-display">
    <h3 class="stats-title">
        <i class="fas fa-chart-bar"></i>
        [#statsTitle]
    </h3>
    
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-[#stat1Icon]"></i>
            </div>
            <div class="stat-value">[#stat1Value]</div>
            <div class="stat-label">[#stat1Label]</div>
            <div class="stat-change positive">
                <i class="fas fa-arrow-up"></i>
                [#stat1Change]
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-[#stat2Icon]"></i>
            </div>
            <div class="stat-value">[#stat2Value]</div>
            <div class="stat-label">[#stat2Label]</div>
            <div class="stat-change negative">
                <i class="fas fa-arrow-down"></i>
                [#stat2Change]
            </div>
        </div>
        
        <!-- Additional stat cards as needed -->
    </div>
</div>

<style>
.fantasy-stats-display {
    background: #2a1f1a;
    border: 2px solid #8B4513;
    border-radius: 12px;
    padding: 24px;
}

.stats-title {
    font-family: 'Cinzel', serif;
    color: #D4AF37;
    text-align: center;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.stat-card {
    background: #1a0f0a;
    border: 2px solid #8B4513;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
}

.stat-card:hover {
    border-color: #D4AF37;
    transform: translateY(-2px);
}

.stat-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #8B0000, #CD853F);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    font-size: 24px;
    color: #E8E3D3;
}

.stat-value {
    font-family: 'Cinzel', serif;
    font-size: 32px;
    font-weight: bold;
    color: #D4AF37;
    margin-bottom: 8px;
}

.stat-label {
    color: #B8A888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
}

.stat-change {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
}

.stat-change.positive {
    color: #228B22;
}

.stat-change.negative {
    color: #DC143C;
}
</style>`;

    return React.createElement(FragmentContainer, null,
        React.createElement(FragmentTitle, null,
            React.createElement(Icons.Star, { size: 20 }),
            'Statistics Display Fragment'
        ),
        React.createElement(FragmentDescription, null,
            'A responsive grid of statistics cards with icons, values, labels, and change indicators.'
        ),
        React.createElement(FragmentPreview, null,
            React.createElement('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: theme.spacing.lg
                }
            },
                React.createElement(StatCard, {
                    icon: Icons.Users,
                    value: '1,234',
                    label: 'Adventurers',
                    change: '+12%',
                    changeType: 'positive'
                }),
                React.createElement(StatCard, {
                    icon: Icons.Dragon,
                    value: '56',
                    label: 'Quests',
                    change: '+8%',
                    changeType: 'positive'
                }),
                React.createElement(StatCard, {
                    icon: Icons.Crown,
                    value: '789',
                    label: 'Treasures',
                    change: '-2%',
                    changeType: 'negative'
                })
            )
        ),
        React.createElement(CodeBlock, null,
            React.createElement('code', null, fragmentCode)
        )
    );
};

// Image Gallery Fragment
const ImageGalleryFragment = () => {
    const fragmentCode = `<!-- Image Gallery Fragment for Liferay -->
<div class="fantasy-image-gallery">
    <div class="gallery-header">
        <h3 class="gallery-title">
            <i class="fas fa-images"></i>
            [#galleryTitle]
        </h3>
        <div class="gallery-filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="[#category1]">[#category1]</button>
            <button class="filter-btn" data-filter="[#category2]">[#category2]</button>
        </div>
    </div>
    
    <div class="gallery-grid">
        <div class="gallery-item" data-category="[#itemCategory]">
            <div class="item-image">
                <img src="[#imageUrl]" alt="[#imageAlt]" />
                <div class="item-overlay">
                    <div class="overlay-content">
                        <i class="fas fa-search-plus"></i>
                        <span>View Details</span>
                    </div>
                </div>
            </div>
            <div class="item-info">
                <h4 class="item-title">[#itemTitle]</h4>
                <p class="item-description">[#itemDescription]</p>
            </div>
        </div>
    </div>
</div>

<style>
.fantasy-image-gallery {
    background: #2a1f1a;
    border: 2px solid #8B4513;
    border-radius: 12px;
    padding: 24px;
}

.gallery-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
}

.gallery-title {
    font-family: 'Cinzel', serif;
    color: #D4AF37;
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
}

.gallery-filters {
    display: flex;
    gap: 8px;
}

.filter-btn {
    background: transparent;
    color: #B8A888;
    border: 2px solid #8B4513;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
    cursor: pointer;
}

.filter-btn.active,
.filter-btn:hover {
    border-color: #D4AF37;
    color: #D4AF37;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.gallery-item {
    background: #1a0f0a;
    border: 2px solid #8B4513;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.gallery-item:hover {
    border-color: #D4AF37;
    transform: translateY(-4px);
}

.item-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.item-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.gallery-item:hover .item-overlay {
    opacity: 1;
}

.overlay-content {
    color: #D4AF37;
    text-align: center;
}

.item-info {
    padding: 16px;
}

.item-title {
    color: #D4AF37;
    margin-bottom: 8px;
}

.item-description {
    color: #B8A888;
    font-size: 14px;
    margin: 0;
}
</style>`;

    return React.createElement(FragmentContainer, null,
        React.createElement(FragmentTitle, null,
            React.createElement(Icons.Map, { size: 20 }),
            'Image Gallery Fragment'
        ),
        React.createElement(FragmentDescription, null,
            'An interactive image gallery with filtering, modal views, and responsive grid layout.'
        ),
        React.createElement(FragmentPreview, null,
            React.createElement(ImageGallery, {
                images: [
                    {
                        id: 1,
                        title: 'Example Image',
                        description: 'This demonstrates the gallery fragment.',
                        category: 'Demo',
                        icon: 'map'
                    }
                ]
            })
        ),
        React.createElement(CodeBlock, null,
            React.createElement('code', null, fragmentCode)
        )
    );
};

const ContentDisplayFragments = () => {
    return React.createElement('div', null,
        React.createElement(HeroBannerFragment),
        React.createElement(ArticleListFragment),
        React.createElement(StatsDisplayFragment),
        React.createElement(ImageGalleryFragment)
    );
};

window.ContentDisplayFragments = ContentDisplayFragments;
