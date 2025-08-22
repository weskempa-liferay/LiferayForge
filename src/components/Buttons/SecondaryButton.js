const styled = window.styled.default;

const StyledSecondaryButton = styled.button`
    background: transparent;
    color: ${props => props.theme.colors.secondary};
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fonts.weights.medium};
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
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background: ${props => props.theme.colors.secondary};
        transition: width 0.3s ease;
        z-index: 0;
    }
    
    &:hover {
        color: ${props => props.theme.colors.textDark};
        border-color: ${props => props.theme.colors.secondaryHover};
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        transform: translateY(-1px);
        
        &::before {
            width: 100%;
        }
    }
    
    &:active {
        transform: translateY(0);
    }
    
    &:disabled {
        color: ${props => props.theme.colors.textMuted};
        border-color: ${props => props.theme.colors.border};
        cursor: not-allowed;
        transform: none;
        
        &:hover {
            transform: none;
            box-shadow: none;
            
            &::before {
                width: 0;
            }
        }
    }
    
    ${props => props.fullWidth && `
        width: 100%;
    `}
    
    ${props => props.variant === 'ghost' && `
        border: none;
        background: rgba(212, 175, 55, 0.05);
        
        &:hover {
            background: rgba(212, 175, 55, 0.1);
            color: ${props.theme.colors.secondaryHover};
        }
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

const SecondaryButton = ({ 
    children, 
    size = 'medium', 
    fullWidth = false, 
    icon, 
    disabled = false,
    variant = 'default',
    onClick,
    ...props 
}) => {
    return React.createElement(StyledSecondaryButton, {
        size,
        fullWidth,
        disabled,
        variant,
        onClick,
        ...props
    },
        React.createElement(ButtonContent, null,
            icon && React.createElement(icon, { size: 16 }),
            children
        )
    );
};

window.SecondaryButton = SecondaryButton;
