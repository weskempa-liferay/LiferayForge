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
        content: 'Fragment';
        background: rgba(212, 175, 55, 0.1);
        color: ${props => props.theme.colors.secondary};
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

// Basic Text Fragment
const TextFragment = () => {
    const fragmentCode = `<!-- Basic Text Fragment for Liferay -->
<div class="fantasy-text-fragment">
    <h2 class="fragment-title">[#title]</h2>
    <div class="fragment-content">
        [#content]
    </div>
</div>

<style>
.fantasy-text-fragment {
    background: #2a1f1a;
    border: 2px solid #D4AF37;
    border-radius: 8px;
    padding: 24px;
    color: #E8E3D3;
    font-family: 'Crimson Text', serif;
}

.fragment-title {
    color: #D4AF37;
    font-family: 'Cinzel', serif;
    font-weight: bold;
    margin-bottom: 16px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>`;

    return React.createElement(FragmentContainer, null,
        React.createElement(FragmentTitle, null,
            React.createElement(Icons.Scroll, { size: 20 }),
            'Basic Text Fragment'
        ),
        React.createElement(FragmentDescription, null,
            'A fundamental text display fragment with fantasy theming, configurable title and content.'
        ),
        React.createElement(FragmentPreview, null,
            React.createElement('h2', { 
                style: { 
                    color: theme.colors.secondary, 
                    marginBottom: theme.spacing.md,
                    fontFamily: theme.fonts.heading
                }
            }, 'Fragment Title Example'),
            React.createElement('p', { 
                style: { 
                    color: theme.colors.text, 
                    margin: 0 
                }
            }, 'This is how the content would appear in your Liferay page. The styling maintains the D&D theme while being easily customizable.')
        ),
        React.createElement(CodeBlock, null,
            React.createElement('code', null, fragmentCode)
        )
    );
};

// Button Fragment
const ButtonFragment = () => {
    const fragmentCode = `<!-- Button Fragment for Liferay -->
<div class="fantasy-button-fragment">
    <button class="fantasy-btn fantasy-btn-primary" onclick="[#onClick]">
        <i class="fas fa-sword"></i>
        <span>[#buttonText]</span>
    </button>
</div>

<style>
.fantasy-btn {
    background: linear-gradient(135deg, #8B0000, #A0001A);
    color: #E8E3D3;
    font-family: 'Cinzel', serif;
    font-weight: 600;
    padding: 12px 24px;
    border: 2px solid #D4AF37;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
    cursor: pointer;
}

.fantasy-btn:hover {
    background: linear-gradient(135deg, #A0001A, #8B0000);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
    transform: translateY(-2px);
}
</style>`;

    return React.createElement(FragmentContainer, null,
        React.createElement(FragmentTitle, null,
            React.createElement(Icons.Sword, { size: 20 }),
            'Interactive Button Fragment'
        ),
        React.createElement(FragmentDescription, null,
            'A styled button component with hover effects and customizable text and actions.'
        ),
        React.createElement(FragmentPreview, null,
            React.createElement(PrimaryButton, { icon: Icons.Sword }, 'Example Button')
        ),
        React.createElement(CodeBlock, null,
            React.createElement('code', null, fragmentCode)
        )
    );
};

// Card Fragment
const CardFragment = () => {
    const fragmentCode = `<!-- Card Fragment for Liferay -->
<div class="fantasy-card-fragment">
    <div class="card-header">
        <div class="card-icon">
            <i class="fas fa-[#icon]"></i>
        </div>
        <div class="card-content">
            <h3 class="card-title">[#title]</h3>
            <p class="card-description">[#description]</p>
        </div>
    </div>
    <div class="card-footer">
        <span class="card-tag">[#category]</span>
        <a href="[#link]" class="card-link">Learn More</a>
    </div>
</div>

<style>
.fantasy-card-fragment {
    background: #2a1f1a;
    border: 2px solid #8B4513;
    border-radius: 12px;
    padding: 24px;
    transition: all 0.3s ease;
    position: relative;
}

.fantasy-card-fragment:hover {
    border-color: #D4AF37;
    box-shadow: 0 10px 15px rgba(139, 69, 19, 0.1);
    transform: translateY(-4px);
}

.card-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #8B0000, #CD853F);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #E8E3D3;
}
</style>`;

    return React.createElement(FragmentContainer, null,
        React.createElement(FragmentTitle, null,
            React.createElement(Icons.Shield, { size: 20 }),
            'Content Card Fragment'
        ),
        React.createElement(FragmentDescription, null,
            'A versatile card component for displaying content with icons, titles, and descriptions.'
        ),
        React.createElement(FragmentPreview, null,
            React.createElement(ContentCard, {
                title: 'Fragment Example',
                description: 'This demonstrates how the card fragment would appear in your Liferay page.',
                icon: Icons.Book,
                tags: ['Example', 'Demo'],
                actions: [
                    { text: 'View', icon: Icons.Book, onClick: () => {} }
                ]
            })
        ),
        React.createElement(CodeBlock, null,
            React.createElement('code', null, fragmentCode)
        )
    );
};

const BasicFragments = () => {
    return React.createElement('div', null,
        React.createElement(TextFragment),
        React.createElement(ButtonFragment),
        React.createElement(CardFragment)
    );
};

window.BasicFragments = BasicFragments;
