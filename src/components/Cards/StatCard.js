const styled = window.styled.default;

const StatCardContainer = styled.div`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing.xl};
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
            rgba(212, 175, 55, 0.05) 0%, 
            transparent 50%, 
            rgba(139, 0, 0, 0.05) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    &:hover {
        border-color: ${props => props.theme.colors.secondary};
        transform: translateY(-2px);
        box-shadow: ${props => props.theme.shadows.lg};
        
        &::before {
            opacity: 1;
        }
    }
`;

const StatIcon = styled.div`
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    border-radius: ${props => props.theme.borderRadius.full};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${props => props.theme.spacing.lg};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fonts.sizes['2xl']};
    position: relative;
    z-index: 1;
`;

const StatValue = styled.div`
    font-family: ${props => props.theme.fonts.heading};
    font-size: ${props => props.theme.fonts.sizes['3xl']};
    font-weight: ${props => props.theme.fonts.weights.bold};
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.sm};
    position: relative;
    z-index: 1;
`;

const StatLabel = styled.div`
    font-size: ${props => props.theme.fonts.sizes.md};
    color: ${props => props.theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: ${props => props.theme.spacing.sm};
    position: relative;
    z-index: 1;
`;

const StatChange = styled.div`
    font-size: ${props => props.theme.fonts.sizes.sm};
    color: ${props => props.positive ? props.theme.colors.success : 
                    props.negative ? props.theme.colors.error : 
                    props.theme.colors.textMuted};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.theme.spacing.xs};
    position: relative;
    z-index: 1;
`;

const StatCard = ({
    icon = Icons.Star,
    value,
    label,
    change,
    changeType = 'neutral', // 'positive', 'negative', 'neutral'
    ...props
}) => {
    const getChangeIcon = () => {
        if (changeType === 'positive') return Icons.ChevronUp;
        if (changeType === 'negative') return Icons.ChevronDown;
        return null;
    };

    const ChangeIcon = getChangeIcon();

    return React.createElement(StatCardContainer, props,
        React.createElement(StatIcon, null,
            React.createElement(icon, { size: 28 })
        ),
        React.createElement(StatValue, null, value),
        React.createElement(StatLabel, null, label),
        change && React.createElement(StatChange, {
            positive: changeType === 'positive',
            negative: changeType === 'negative'
        },
            ChangeIcon && React.createElement(ChangeIcon, { size: 12 }),
            change
        )
    );
};

// Add ChevronUp icon to Icons if not already present
if (!window.Icons.ChevronUp) {
    window.Icons.ChevronUp = ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-chevron-up',
            style: { fontSize: size, color },
            ...props
        })
    );
}

window.StatCard = StatCard;
