const Icons = {
    // Fantasy themed icons using Font Awesome
    Sword: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-sword',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Shield: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-shield-alt',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Dragon: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-dragon',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Dice: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-dice-d20',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Scroll: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-scroll',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Crown: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-crown',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Map: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-map',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Book: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-book-open',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Star: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-star',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Users: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-users',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Search: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-search',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Menu: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-bars',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Close: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-times',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    ChevronDown: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-chevron-down',
            style: { fontSize: size, color },
            ...props
        })
    ),
    
    Home: ({ size = 16, color = 'currentColor', ...props }) => (
        React.createElement('i', {
            className: 'fas fa-home',
            style: { fontSize: size, color },
            ...props
        })
    )
};

window.Icons = Icons;
