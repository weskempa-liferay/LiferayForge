const styled = window.styled.default;

const HeroCardContainer = styled.div`
    background: linear-gradient(135deg, 
        rgba(42, 31, 26, 0.95) 0%, 
        rgba(58, 47, 42, 0.95) 100%);
    border: 3px solid ${props => props.theme.colors.secondary};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing['3xl']};
    margin: ${props => props.theme.spacing.xl} 0;
    position: relative;
    overflow: hidden;
    box-shadow: ${props => props.theme.shadows.xl};
    
    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
        50% { transform: translate(-50%, -50%) rotate(180deg); }
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        padding: ${props => props.theme.spacing.xl};
        margin: ${props => props.theme.spacing.lg} 0;
    }
`;

const HeroContent = styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
`;

const HeroTitle = styled.h1`
    font-size: ${props => props.theme.fonts.sizes['5xl']};
    font-family: ${props => props.theme.fonts.heading};
    background: linear-gradient(135deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: ${props => props.theme.spacing.lg};
    text-shadow: none;
    letter-spacing: 0.02em;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        font-size: ${props => props.theme.fonts.sizes['3xl']};
    }
`;

const HeroSubtitle = styled.p`
    font-size: ${props => props.theme.fonts.sizes.xl};
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing['2xl']};
    line-height: 1.6;
    font-style: italic;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        font-size: ${props => props.theme.fonts.sizes.lg};
    }
`;

const HeroActions = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.lg};
    justify-content: center;
    flex-wrap: wrap;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        flex-direction: column;
        align-items: center;
    }
`;

const HeroIcon = styled.div`
    position: absolute;
    top: ${props => props.theme.spacing.lg};
    right: ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fonts.sizes['4xl']};
    color: ${props => props.theme.colors.secondary};
    opacity: 0.3;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        display: none;
    }
`;

const HeroCard = ({ 
    title, 
    subtitle, 
    primaryAction, 
    secondaryAction, 
    icon = Icons.Dragon 
}) => {
    return React.createElement(HeroCardContainer, null,
        React.createElement(HeroIcon, null,
            React.createElement(icon, { size: 64 })
        ),
        React.createElement(HeroContent, null,
            React.createElement(HeroTitle, null, title),
            subtitle && React.createElement(HeroSubtitle, null, subtitle),
            React.createElement(HeroActions, null,
                primaryAction && React.createElement(PrimaryButton, {
                    size: 'large',
                    icon: Icons.Sword,
                    onClick: primaryAction.onClick
                }, primaryAction.text),
                secondaryAction && React.createElement(SecondaryButton, {
                    size: 'large',
                    icon: Icons.Book,
                    onClick: secondaryAction.onClick
                }, secondaryAction.text)
            )
        )
    );
};

window.HeroCard = HeroCard;
