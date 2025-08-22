const styled = window.styled.default;

const CardContainer = styled.div`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing.xl};
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.accent});
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }
    
    &:hover {
        border-color: ${props => props.theme.colors.secondary};
        box-shadow: ${props => props.theme.shadows.lg}, 0 0 20px rgba(212, 175, 55, 0.1);
        transform: translateY(-4px);
        
        &::before {
            transform: translateX(0);
        }
    }
    
    ${props => props.variant === 'featured' && `
        border-color: ${props.theme.colors.secondary};
        box-shadow: ${props.theme.shadows.lg};
        background: linear-gradient(135deg, 
            ${props.theme.colors.surface} 0%, 
            rgba(212, 175, 55, 0.05) 100%);
        
        &::before {
            transform: translateX(0);
        }
    `}
`;

const CardHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.lg};
`;

const CardIcon = styled.div`
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    border-radius: ${props => props.theme.borderRadius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fonts.sizes.xl};
`;

const CardContent = styled.div`
    flex: 1;
`;

const CardTitle = styled.h3`
    font-size: ${props => props.theme.fonts.sizes.xl};
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.secondary};
`;

const CardDescription = styled.p`
    color: ${props => props.theme.colors.textMuted};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.lg};
`;

const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${props => props.theme.spacing.lg};
    padding-top: ${props => props.theme.spacing.lg};
    border-top: 1px solid ${props => props.theme.colors.border};
`;

const CardTags = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.sm};
    flex-wrap: wrap;
`;

const Tag = styled.span`
    background: rgba(212, 175, 55, 0.1);
    color: ${props => props.theme.colors.secondary};
    font-size: ${props => props.theme.fonts.sizes.sm};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.full};
    border: 1px solid rgba(212, 175, 55, 0.3);
`;

const CardActions = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.sm};
`;

const ContentCard = ({
    title,
    description,
    icon = Icons.Book,
    variant = 'default',
    tags = [],
    actions = [],
    ...props
}) => {
    return React.createElement(CardContainer, { variant, ...props },
        React.createElement(CardHeader, null,
            React.createElement(CardIcon, null,
                React.createElement(icon, { size: 24 })
            ),
            React.createElement(CardContent, null,
                React.createElement(CardTitle, null, title),
                React.createElement(CardDescription, null, description)
            )
        ),
        (tags.length > 0 || actions.length > 0) && React.createElement(CardFooter, null,
            React.createElement(CardTags, null,
                tags.map((tag, index) =>
                    React.createElement(Tag, { key: index }, tag)
                )
            ),
            React.createElement(CardActions, null,
                actions.map((action, index) =>
                    React.createElement(SecondaryButton, {
                        key: index,
                        size: 'small',
                        variant: 'ghost',
                        icon: action.icon,
                        onClick: action.onClick
                    }, action.text)
                )
            )
        )
    );
};

window.ContentCard = ContentCard;
