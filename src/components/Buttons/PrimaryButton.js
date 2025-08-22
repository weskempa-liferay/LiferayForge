const styled = window.styled.default;

const StyledPrimaryButton = styled.button`
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryHover});
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fonts.weights.semibold};
    font-size: ${props => props.size === 'large' ? props.theme.fonts.sizes.lg : 
                      props.size === 'small' ? props.theme.fonts.sizes.sm : 
                      props.theme.fonts.sizes.md};
    padding: ${props => props.size === 'large' ? `${props.theme.spacing.lg} ${props.theme.spacing['2xl']}` :
                       props.size === 'small' ? `${props.theme.spacing.sm} ${props.theme.spacing.md}` :
                       `${props.theme.spacing.md} ${props.theme.spacing.xl}`};
    border: 2px solid ${props => props.theme.colors.secondary};
    border-radius: ${props => props.theme.borderRadius.md};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: ${props => props.theme.shadows.md};
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.6s ease;
    }
    
    &:hover {
        background: linear-gradient(135deg, ${props => props.theme.colors.primaryHover}, ${props => props.theme.colors.primary});
        border-color: ${props => props.theme.colors.secondaryHover};
        box-shadow: ${props => props.theme.shadows.lg}, 0 0 20px rgba(212, 175, 55, 0.4);
        transform: translateY(-2px);
        
        &::before {
            left: 100%;
        }
    }
    
    &:active {
        transform: translateY(0);
        box-shadow: ${props => props.theme.shadows.md};
    }
    
    &:disabled {
        background: ${props => props.theme.colors.surfaceLight};
        color: ${props => props.theme.colors.textMuted};
        border-color: ${props => props.theme.colors.border};
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
        
        &:hover {
            transform: none;
            box-shadow: none;
        }
    }
    
    ${props => props.fullWidth && `
        width: 100%;
    `}
`;

const ButtonContent = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.theme.spacing.sm};
    position: relative;
    z-index: 1;
`;

const PrimaryButton = ({ 
    children, 
    size = 'medium', 
    fullWidth = false, 
    icon, 
    disabled = false,
    onClick,
    ...props 
}) => {
    return React.createElement(StyledPrimaryButton, {
        size,
        fullWidth,
        disabled,
        onClick,
        ...props
    },
        React.createElement(ButtonContent, null,
            icon && React.createElement(icon, { size: 16 }),
            children
        )
    );
};

window.PrimaryButton = PrimaryButton;
