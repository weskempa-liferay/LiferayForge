const { useState } = React;
const styled = window.styled.default;

const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 500px;
`;

const SearchInput = styled.input`
    width: 100%;
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
    padding-left: ${props => props.theme.spacing['3xl']};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fonts.sizes.md};
    font-family: ${props => props.theme.fonts.body};
    transition: all 0.3s ease;
    
    &::placeholder {
        color: ${props => props.theme.colors.textMuted};
        font-style: italic;
    }
    
    &:focus {
        border-color: ${props => props.theme.colors.secondary};
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        background: ${props => props.theme.colors.surfaceLight};
    }
    
    &:hover:not(:focus) {
        border-color: ${props => props.theme.colors.accent};
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    left: ${props => props.theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.textMuted};
    font-size: ${props => props.theme.fonts.sizes.lg};
    transition: color 0.3s ease;
    
    ${SearchInput}:focus + & {
        color: ${props => props.theme.colors.secondary};
    }
`;

const SearchButton = styled.button`
    position: absolute;
    right: ${props => props.theme.spacing.sm};
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    color: ${props => props.theme.colors.text};
    border: none;
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.fonts.sizes.sm};
    transition: all 0.3s ease;
    
    &:hover {
        background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
        box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
    }
    
    &:active {
        transform: translateY(-50%) scale(0.95);
    }
`;

const SearchResults = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-top: none;
    border-radius: 0 0 ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg};
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: ${props => props.theme.shadows.lg};
    
    ${props => !props.show && `
        display: none;
    `}
`;

const SearchResultItem = styled.div`
    padding: ${props => props.theme.spacing.md};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
    
    &:hover {
        background: rgba(212, 175, 55, 0.05);
        color: ${props => props.theme.colors.secondary};
    }
    
    &:last-child {
        border-bottom: none;
    }
`;

const ResultIcon = styled.div`
    color: ${props => props.theme.colors.accent};
    flex-shrink: 0;
`;

const ResultText = styled.div`
    flex: 1;
    
    .title {
        font-weight: ${props => props.theme.fonts.weights.medium};
        margin-bottom: ${props => props.theme.spacing.xs};
    }
    
    .description {
        font-size: ${props => props.theme.fonts.sizes.sm};
        color: ${props => props.theme.colors.textMuted};
    }
`;

const SearchBar = ({
    placeholder = "Search the realm...",
    onSearch,
    results = [],
    showResults = false,
    onResultClick,
    ...props
}) => {
    const [query, setQuery] = useState('');
    const [showResultsState, setShowResultsState] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowResultsState(value.length > 0 && results.length > 0);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleSearch = () => {
        if (onSearch && query.trim()) {
            onSearch(query.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleResultClick = (result) => {
        if (onResultClick) {
            onResultClick(result);
        }
        setQuery('');
        setShowResultsState(false);
    };

    return React.createElement(SearchContainer, props,
        React.createElement(SearchInput, {
            type: 'text',
            placeholder,
            value: query,
            onChange: handleInputChange,
            onKeyPress: handleKeyPress
        }),
        React.createElement(SearchIcon, null,
            React.createElement(Icons.Search, { size: 18 })
        ),
        React.createElement(SearchButton, { onClick: handleSearch },
            React.createElement(Icons.Search, { size: 14 })
        ),
        React.createElement(SearchResults, { show: showResults || showResultsState },
            results.map((result, index) =>
                React.createElement(SearchResultItem, {
                    key: index,
                    onClick: () => handleResultClick(result)
                },
                    React.createElement(ResultIcon, null,
                        React.createElement(result.icon || Icons.Book, { size: 20 })
                    ),
                    React.createElement(ResultText, null,
                        React.createElement('div', { className: 'title' }, result.title),
                        result.description && React.createElement('div', { className: 'description' }, result.description)
                    )
                )
            )
        )
    );
};

window.SearchBar = SearchBar;
