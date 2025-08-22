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
        content: 'Navigation Fragment';
        background: rgba(139, 69, 19, 0.1);
        color: ${props => props.theme.colors.accent};
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

// Main Navigation Fragment
const MainNavigationFragment = () => {
    const fragmentCode = `<!-- Main Navigation Fragment for Liferay -->
<nav class="fantasy-main-navigation">
    <div class="nav-container">
        <div class="nav-brand">
            <i class="fas fa-[#brandIcon]"></i>
            <span class="brand-text">[#brandName]</span>
        </div>
        
        <div class="nav-menu" id="navMenu">
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="[#homeUrl]" class="nav-link active">
                        <i class="fas fa-home"></i>
                        <span>[#homeText]</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle">
                        <i class="fas fa-[#menuIcon1]"></i>
                        <span>[#menuText1]</span>
                        <i class="fas fa-chevron-down"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="[#submenu1Url]" class="dropdown-link">[#submenu1Text]</a></li>
                        <li><a href="[#submenu2Url]" class="dropdown-link">[#submenu2Text]</a></li>
                    </ul>
                </li>
                <!-- Additional navigation items -->
            </ul>
        </div>
        
        <div class="nav-actions">
            <button class="search-toggle">
                <i class="fas fa-search"></i>
            </button>
            <button class="mobile-toggle" onclick="toggleMobileMenu()">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </div>
    
    <div class="nav-search" id="navSearch">
        <div class="search-container">
            <input type="text" placeholder="Search the realm..." class="search-input">
            <button class="search-btn">
                <i class="fas fa-search"></i>
            </button>
        </div>
    </div>
</nav>

<style>
.fantasy-main-navigation {
    background: linear-gradient(135deg, rgba(42, 31, 26, 0.95) 0%, rgba(26, 15, 10, 0.98) 100%);
    border-bottom: 3px solid #D4AF37;
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(139, 69, 19, 0.1);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #D4AF37;
    font-family: 'Cinzel', serif;
    font-weight: bold;
    font-size: 20px;
}

.nav-menu {
    display: flex;
    align-items: center;
}

.nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 8px;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #E8E3D3;
    text-decoration: none;
    padding: 12px 16px;
    border-radius: 6px;
    transition: all 0.3s ease;
    font-family: 'Cinzel', serif;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.nav-link:hover,
.nav-link.active {
    color: #D4AF37;
    background: rgba(212, 175, 55, 0.1);
}

.dropdown {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: #2a1f1a;
    border: 2px solid #8B4513;
    border-radius: 8px;
    min-width: 200px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    list-style: none;
    padding: 8px 0;
    margin: 0;
}

.dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-link {
    display: block;
    color: #E8E3D3;
    text-decoration: none;
    padding: 12px 20px;
    transition: all 0.3s ease;
}

.dropdown-link:hover {
    color: #D4AF37;
    background: rgba(212, 175, 55, 0.05);
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.search-toggle,
.mobile-toggle {
    background: transparent;
    border: 2px solid #8B4513;
    color: #D4AF37;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
}

.search-toggle:hover,
.mobile-toggle:hover {
    border-color: #D4AF37;
    background: rgba(212, 175, 55, 0.1);
}

.mobile-toggle {
    display: none;
}

.nav-search {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px 16px;
    display: none;
}

.nav-search.active {
    display: block;
}

.search-container {
    position: relative;
    max-width: 400px;
}

.search-input {
    width: 100%;
    background: #1a0f0a;
    border: 2px solid #8B4513;
    border-radius: 24px;
    padding: 12px 50px 12px 20px;
    color: #E8E3D3;
    font-family: 'Crimson Text', serif;
}

.search-input:focus {
    border-color: #D4AF37;
    outline: none;
}

.search-btn {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(135deg, #8B0000, #CD853F);
    color: #E8E3D3;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #2a1f1a;
        border-top: 2px solid #8B4513;
        padding: 20px;
    }
    
    .nav-menu.active {
        display: block;
    }
    
    .nav-list {
        flex-direction: column;
        gap: 4px;
    }
    
    .mobile-toggle {
        display: flex;
    }
}
</style>

<script>
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

function toggleSearch() {
    const navSearch = document.getElementById('navSearch');
    navSearch.classList.toggle('active');
}

// Add click event to search toggle
document.querySelector('.search-toggle').addEventListener('click', toggleSearch);
</script>`;

    return React.createElement(FragmentContainer, null,
        React.createElement(FragmentTitle, null,
            React.createElement(Icons.Menu, { size: 20 }),
            'Main Navigation Fragment'
        ),
        React.createElement(FragmentDescription, null,
            'A comprehensive navigation header with dropdown menus, search functionality, and mobile responsiveness.'
        ),
        React.createElement(FragmentPreview, null,
            React.createElement(Header)
        ),
        React.createElement(CodeBlock, null,
            React.createElement('code', null, fragmentCode)
        )
    );
};

// Breadcrumb Navigation Fragment
const BreadcrumbFragment = () => {
    const fragmentCode = `<!-- Breadcrumb Navigation Fragment for Liferay -->
<nav class="fantasy-breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
            <a href="[#homeUrl]" class="breadcrumb-link">
                <i class="fas fa-home"></i>
                <span>[#homeText]</span>
            </a>
        </li>
        <li class="breadcrumb-separator">
            <i class="fas fa-chevron-right"></i>
        </li>
        <li class="breadcrumb-item">
            <a href="[#level1Url]" class="breadcrumb-link">
                <i class="fas fa-[#level1Icon]"></i>
                <span>[#level1Text]</span>
            </a>
        </li>
        <li class="breadcrumb-separator">
            <i class="fas fa-chevron-right"></i>
        </li>
        <li class="breadcrumb-item current" aria-current="page">
            <span class="breadcrumb-current">
                <i class="fas fa-[#currentIcon]"></i>
                <span>[#currentText]</span>
            </span>
        </li>
    </ol>
</nav>

<style>
.fantasy-breadcrumb {
    background: rgba(42, 31, 26, 0.5);
    border: 1px solid #8B4513;
    border-radius: 8px;
    padding: 12px 20px;
    margin-bottom: 24px;
}

.breadcrumb-list {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    gap: 8px;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
}

.breadcrumb-link {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #B8A888;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
    padding: 4px 8px;
    border-radius: 4px;
}

.breadcrumb-link:hover {
    color: #D4AF37;
    background: rgba(212, 175, 55, 0.1);
}

.breadcrumb-current {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #D4AF37;
    font-size: 14px;
    font-weight: 500;
}

.breadcrumb-separator {
    color: #8B4513;
    font-size: 12px;
    margin: 0 4px;
}

@media (max-width: 768px) {
    .breadcrumb-list {
        font-size: 12px;
    }
    
    .breadcrumb-link span,
    .breadcrumb-current span {
        display: none;
    }
}
</style>`;

    return React.createElement(FragmentContainer, null,
        React.createElement(FragmentTitle, null,
            React.createElement(Icons.Map, { size: 20 }),
            'Breadcrumb Navigation Fragment'
        ),
        React.createElement(FragmentDescription, null,
            'A hierarchical navigation trail showing the user\'s current location within the site structure.'
        ),
        React.createElement(FragmentPreview, null,
            React.createElement('nav', {
                style: {
                    background: 'rgba(42, 31, 26, 0.5)',
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.md,
                    padding: theme.spacing.md
                }
            },
                React.createElement('ol', {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        gap: theme.spacing.sm
                    }
                },
                    React.createElement('li', null,
                        React.createElement('a', {
                            href: '#',
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: theme.spacing.xs,
                                color: theme.colors.textMuted,
                                textDecoration: 'none',
                                fontSize: theme.fonts.sizes.sm
                            }
                        },
                            React.createElement(Icons.Home, { size: 14 }),
                            'Home'
                        )
                    ),
                    React.createElement('li', {
                        style: { color: theme.colors.border }
                    }, React.createElement(Icons.ChevronDown, { size: 12, style: { transform: 'rotate(-90deg)' } })),
                    React.createElement('li', null,
                        React.createElement('a', {
                            href: '#',
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: theme.spacing.xs,
                                color: theme.colors.textMuted,
                                textDecoration: 'none',
                                fontSize: theme.fonts.sizes.sm
                            }
                        },
                            React.createElement(Icons.Book, { size: 14 }),
                            'Components'
                        )
                    ),
                    React.createElement('li', {
                        style: { color: theme.colors.border }
                    }, React.createElement(Icons.ChevronDown, { size: 12, style: { transform: 'rotate(-90deg)' } })),
                    React.createElement('li', null,
                        React.createElement('span', {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: theme.spacing.xs,
                                color: theme.colors.secondary,
                                fontSize: theme.fonts.sizes.sm,
                                fontWeight: theme.fonts.weights.medium
                            }
                        },
                            React.createElement(Icons.Scroll, { size: 14 }),
                            'Navigation'
                        )
                    )
                )
            )
        ),
        React.createElement(CodeBlock, null,
            React.createElement('code', null, fragmentCode)
        )
    );
};

// Side Navigation Fragment
const SideNavigationFragment = () => {
    const fragmentCode = `<!-- Side Navigation Fragment for Liferay -->
<aside class="fantasy-side-navigation">
    <div class="side-nav-header">
        <h3 class="side-nav-title">
            <i class="fas fa-[#navIcon]"></i>
            [#navigationTitle]
        </h3>
    </div>
    
    <nav class="side-nav-content">
        <ul class="side-nav-list">
            <li class="side-nav-section">
                <h4 class="section-title">
                    <i class="fas fa-[#section1Icon]"></i>
                    [#section1Title]
                </h4>
                <ul class="section-items">
                    <li class="nav-item">
                        <a href="[#item1Url]" class="nav-link active">
                            <i class="fas fa-[#item1Icon]"></i>
                            <span>[#item1Text]</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="[#item2Url]" class="nav-link">
                            <i class="fas fa-[#item2Icon]"></i>
                            <span>[#item2Text]</span>
                        </a>
                    </li>
                </ul>
            </li>
            
            <li class="side-nav-section">
                <h4 class="section-title">
                    <i class="fas fa-[#section2Icon]"></i>
                    [#section2Title]
                </h4>
                <ul class="section-items">
                    <li class="nav-item">
                        <a href="[#item3Url]" class="nav-link">
                            <i class="fas fa-[#item3Icon]"></i>
                            <span>[#item3Text]</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
    
    <div class="side-nav-footer">
        <div class="nav-actions">
            <button class="action-btn">
                <i class="fas fa-plus"></i>
                [#actionText]
            </button>
        </div>
    </div>
</aside>

<style>
.fantasy-side-navigation {
    background: #2a1f1a;
    border: 2px solid #8B4513;
    border-radius: 12px;
    width: 280px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
}

.side-nav-header {
    padding: 20px;
    border-bottom: 1px solid #8B4513;
}

.side-nav-title {
    color: #D4AF37;
    font-family: 'Cinzel', serif;
    font-size: 18px;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.side-nav-content {
    flex: 1;
    padding: 20px 0;
    overflow-y: auto;
}

.side-nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.side-nav-section {
    margin-bottom: 24px;
}

.section-title {
    color: #CD853F;
    font-family: 'Cinzel', serif;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 12px 0;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.section-items {
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-item {
    margin-bottom: 4px;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #B8A888;
    text-decoration: none;
    padding: 12px 20px;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
}

.nav-link:hover {
    color: #E8E3D3;
    background: rgba(212, 175, 55, 0.05);
    border-left-color: #D4AF37;
    padding-left: 24px;
}

.nav-link.active {
    color: #D4AF37;
    background: rgba(212, 175, 55, 0.1);
    border-left-color: #D4AF37;
}

.side-nav-footer {
    padding: 20px;
    border-top: 1px solid #8B4513;
}

.action-btn {
    width: 100%;
    background: linear-gradient(135deg, #8B0000, #CD853F);
    color: #E8E3D3;
    border: 2px solid #D4AF37;
    border-radius: 6px;
    padding: 12px;
    font-family: 'Cinzel', serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.action-btn:hover {
    background: linear-gradient(135deg, #CD853F, #8B0000);
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
}

@media (max-width: 768px) {
    .fantasy-side-navigation {
        width: 100%;
        min-height: auto;
    }
}
</style>`;

    return React.createElement(FragmentContainer, null,
        React.createElement(FragmentTitle, null,
            React.createElement(Icons.Shield, { size: 20 }),
            'Side Navigation Fragment'
        ),
        React.createElement(FragmentDescription, null,
            'A vertical navigation sidebar with sections, hierarchical menu items, and action buttons.'
        ),
        React.createElement(FragmentPreview, null,
            React.createElement(Navigation)
        ),
        React.createElement(CodeBlock, null,
            React.createElement('code', null, fragmentCode)
        )
    );
};

// Tab Navigation Fragment
const TabNavigationFragment = () => {
    const fragmentCode = `<!-- Tab Navigation Fragment for Liferay -->
<div class="fantasy-tab-navigation">
    <div class="tab-header">
        <ul class="tab-list" role="tablist">
            <li class="tab-item" role="presentation">
                <button class="tab-button active" 
                        role="tab" 
                        aria-selected="true" 
                        aria-controls="tab-panel-1"
                        data-tab="tab1">
                    <i class="fas fa-[#tab1Icon]"></i>
                    <span>[#tab1Text]</span>
                </button>
            </li>
            <li class="tab-item" role="presentation">
                <button class="tab-button" 
                        role="tab" 
                        aria-selected="false" 
                        aria-controls="tab-panel-2"
                        data-tab="tab2">
                    <i class="fas fa-[#tab2Icon]"></i>
                    <span>[#tab2Text]</span>
                </button>
            </li>
            <li class="tab-item" role="presentation">
                <button class="tab-button" 
                        role="tab" 
                        aria-selected="false" 
                        aria-controls="tab-panel-3"
                        data-tab="tab3">
                    <i class="fas fa-[#tab3Icon]"></i>
                    <span>[#tab3Text]</span>
                </button>
            </li>
        </ul>
    </div>
    
    <div class="tab-content">
        <div class="tab-panel active" 
             id="tab-panel-1" 
             role="tabpanel" 
             aria-labelledby="tab1">
            [#tab1Content]
        </div>
        <div class="tab-panel" 
             id="tab-panel-2" 
             role="tabpanel" 
             aria-labelledby="tab2">
            [#tab2Content]
        </div>
        <div class="tab-panel" 
             id="tab-panel-3" 
             role="tabpanel" 
             aria-labelledby="tab3">
            [#tab3Content]
        </div>
    </div>
</div>

<style>
.fantasy-tab-navigation {
    background: #2a1f1a;
    border: 2px solid #8B4513;
    border-radius: 12px;
    overflow: hidden;
}

.tab-header {
    background: #1a0f0a;
    border-bottom: 2px solid #8B4513;
}

.tab-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-x: auto;
}

.tab-item {
    flex-shrink: 0;
}

.tab-button {
    background: transparent;
    color: #B8A888;
    border: none;
    border-bottom: 3px solid transparent;
    padding: 16px 24px;
    font-family: 'Cinzel', serif;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    position: relative;
}

.tab-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #D4AF37;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.tab-button:hover {
    color: #D4AF37;
    background: rgba(212, 175, 55, 0.05);
}

.tab-button:hover::before,
.tab-button.active::before {
    transform: scaleX(1);
}

.tab-button.active {
    color: #D4AF37;
    border-bottom-color: #D4AF37;
    background: rgba(212, 175, 55, 0.1);
}

.tab-content {
    padding: 24px;
}

.tab-panel {
    display: none;
    color: #E8E3D3;
    line-height: 1.6;
}

.tab-panel.active {
    display: block;
}

@media (max-width: 768px) {
    .tab-button {
        padding: 12px 16px;
        font-size: 12px;
    }
    
    .tab-button span {
        display: none;
    }
    
    .tab-content {
        padding: 16px;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            const targetPanel = document.getElementById('tab-panel-' + targetTab.slice(-1));
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});
</script>`;

    return React.createElement(FragmentContainer, null,
        React.createElement(FragmentTitle, null,
            React.createElement(Icons.Scroll, { size: 20 }),
            'Tab Navigation Fragment'
        ),
        React.createElement(FragmentDescription, null,
            'An accessible tab interface for organizing content into multiple sections with smooth transitions.'
        ),
        React.createElement(FragmentPreview, null,
            React.createElement('div', {
                style: {
                    background: theme.colors.surface,
                    border: `2px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.lg,
                    overflow: 'hidden'
                }
            },
                React.createElement('div', {
                    style: {
                        background: theme.colors.background,
                        borderBottom: `2px solid ${theme.colors.border}`,
                        display: 'flex',
                        gap: 0
                    }
                },
                    React.createElement('button', {
                        style: {
                            background: `rgba(212, 175, 55, 0.1)`,
                            color: theme.colors.secondary,
                            border: 'none',
                            borderBottom: `3px solid ${theme.colors.secondary}`,
                            padding: theme.spacing.md,
                            fontFamily: theme.fonts.heading,
                            fontSize: theme.fonts.sizes.sm,
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing.xs
                        }
                    },
                        React.createElement(Icons.Home, { size: 14 }),
                        'Overview'
                    ),
                    React.createElement('button', {
                        style: {
                            background: 'transparent',
                            color: theme.colors.textMuted,
                            border: 'none',
                            borderBottom: '3px solid transparent',
                            padding: theme.spacing.md,
                            fontFamily: theme.fonts.heading,
                            fontSize: theme.fonts.sizes.sm,
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing.xs
                        }
                    },
                        React.createElement(Icons.Shield, { size: 14 }),
                        'Components'
                    ),
                    React.createElement('button', {
                        style: {
                            background: 'transparent',
                            color: theme.colors.textMuted,
                            border: 'none',
                            borderBottom: '3px solid transparent',
                            padding: theme.spacing.md,
                            fontFamily: theme.fonts.heading,
                            fontSize: theme.fonts.sizes.sm,
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing.xs
                        }
                    },
                        React.createElement(Icons.Scroll, { size: 14 }),
                        'Fragments'
                    )
                ),
                React.createElement('div', {
                    style: {
                        padding: theme.spacing.lg,
                        color: theme.colors.text
                    }
                }, 'This tab shows an example of content that would be displayed in the active tab panel.')
            )
        ),
        React.createElement(CodeBlock, null,
            React.createElement('code', null, fragmentCode)
        )
    );
};

const NavigationFragments = () => {
    return React.createElement('div', null,
        React.createElement(MainNavigationFragment),
        React.createElement(BreadcrumbFragment),
        React.createElement(SideNavigationFragment),
        React.createElement(TabNavigationFragment)
    );
};

window.NavigationFragments = NavigationFragments;
