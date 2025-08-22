const { useState } = React;
const styled = window.styled.default;

const GalleryContainer = styled.div`
    width: 100%;
`;

const GalleryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.xl};
`;

const ImageCard = styled.div`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
        border-color: ${props => props.theme.colors.secondary};
        box-shadow: ${props => props.theme.shadows.lg};
        transform: translateY(-4px);
    }
`;

const ImagePlaceholder = styled.div`
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, 
        ${props => props.theme.colors.background} 0%, 
        ${props => props.theme.colors.surface} 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.textMuted};
    font-size: ${props => props.theme.fonts.sizes['3xl']};
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 0, 0, 0.05) 0%, transparent 50%);
    }
    
    i {
        position: relative;
        z-index: 1;
    }
`;

const ImageInfo = styled.div`
    padding: ${props => props.theme.spacing.md};
    
    h4 {
        font-size: ${props => props.theme.fonts.sizes.md};
        margin-bottom: ${props => props.theme.spacing.sm};
        color: ${props => props.theme.colors.secondary};
    }
    
    p {
        font-size: ${props => props.theme.fonts.sizes.sm};
        color: ${props => props.theme.colors.textMuted};
        margin: 0;
    }
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: ${props => props.theme.spacing.xl};
    
    ${props => !props.show && `
        display: none;
    `}
`;

const ModalContent = styled.div`
    background: ${props => props.theme.colors.surface};
    border: 3px solid ${props => props.theme.colors.secondary};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing.xl};
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: ${props => props.theme.spacing.md};
    right: ${props => props.theme.spacing.md};
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    border: none;
    border-radius: ${props => props.theme.borderRadius.full};
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: ${props => props.theme.colors.primaryHover};
        box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
    }
`;

const ModalImagePlaceholder = styled.div`
    width: 100%;
    height: 400px;
    background: linear-gradient(135deg, 
        ${props => props.theme.colors.background} 0%, 
        ${props => props.theme.colors.surface} 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.textMuted};
    font-size: ${props => props.theme.fonts.sizes['4xl']};
    border-radius: ${props => props.theme.borderRadius.md};
    margin-bottom: ${props => props.theme.spacing.lg};
`;

const ModalInfo = styled.div`
    h3 {
        font-size: ${props => props.theme.fonts.sizes['2xl']};
        margin-bottom: ${props => props.theme.spacing.md};
        color: ${props => props.theme.colors.secondary};
    }
    
    p {
        color: ${props => props.theme.colors.text};
        line-height: 1.6;
        margin-bottom: ${props => props.theme.spacing.md};
    }
`;

const GalleryFilters = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.xl};
    flex-wrap: wrap;
`;

const FilterButton = styled.button`
    background: ${props => props.active ? 
        `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})` :
        'transparent'};
    color: ${props => props.active ? props.theme.colors.text : props.theme.colors.textMuted};
    border: 2px solid ${props => props.active ? props.theme.colors.secondary : props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.full};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fonts.sizes.sm};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
    
    &:hover {
        border-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.secondary};
    }
`;

const ImageGallery = ({
    images = [],
    categories = ['All'],
    ...props
}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    // Sample gallery data since we can't use real images
    const defaultImages = [
        {
            id: 1,
            title: 'Ancient Dragon Lair',
            description: 'A mystical cavern filled with treasures and ancient magic.',
            category: 'Locations',
            icon: 'dragon'
        },
        {
            id: 2,
            title: 'Legendary Sword',
            description: 'Forged in the fires of Mount Doom, this blade glows with inner light.',
            category: 'Items',
            icon: 'sword'
        },
        {
            id: 3,
            title: 'Elven Forest',
            description: 'A enchanted woodland where time moves differently.',
            category: 'Locations',
            icon: 'map'
        },
        {
            id: 4,
            title: 'Wizard\'s Spellbook',
            description: 'Contains the most powerful spells known to mortalkind.',
            category: 'Items',
            icon: 'book-open'
        },
        {
            id: 5,
            title: 'Royal Crown',
            description: 'The crown of the ancient kingdom, said to grant wisdom.',
            category: 'Items',
            icon: 'crown'
        },
        {
            id: 6,
            title: 'Mystic Portal',
            description: 'A gateway to other realms and dimensions.',
            category: 'Locations',
            icon: 'scroll'
        }
    ];

    const galleryImages = images.length > 0 ? images : defaultImages;
    const allCategories = ['All', ...new Set(galleryImages.map(img => img.category))];

    const filteredImages = activeFilter === 'All' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === activeFilter);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const getIconComponent = (iconName) => {
        const iconMap = {
            dragon: Icons.Dragon,
            sword: Icons.Sword,
            map: Icons.Map,
            'book-open': Icons.Book,
            crown: Icons.Crown,
            scroll: Icons.Scroll
        };
        return iconMap[iconName] || Icons.Star;
    };

    return React.createElement(GalleryContainer, props,
        React.createElement(GalleryFilters, null,
            allCategories.map(category =>
                React.createElement(FilterButton, {
                    key: category,
                    active: activeFilter === category,
                    onClick: () => setActiveFilter(category)
                }, category)
            )
        ),
        
        React.createElement(GalleryGrid, null,
            filteredImages.map(image => {
                const IconComponent = getIconComponent(image.icon);
                return React.createElement(ImageCard, {
                    key: image.id,
                    onClick: () => openModal(image)
                },
                    React.createElement(ImagePlaceholder, null,
                        React.createElement(IconComponent, { size: 48 })
                    ),
                    React.createElement(ImageInfo, null,
                        React.createElement('h4', null, image.title),
                        React.createElement('p', null, image.description)
                    )
                );
            })
        ),
        
        React.createElement(Modal, { show: !!selectedImage },
            selectedImage && React.createElement(ModalContent, null,
                React.createElement(CloseButton, { onClick: closeModal },
                    React.createElement(Icons.Close, { size: 20 })
                ),
                React.createElement(ModalImagePlaceholder, null,
                    React.createElement(getIconComponent(selectedImage.icon), { size: 80 })
                ),
                React.createElement(ModalInfo, null,
                    React.createElement('h3', null, selectedImage.title),
                    React.createElement('p', null, selectedImage.description),
                    React.createElement('p', null, 
                        React.createElement('strong', null, 'Category: '), 
                        selectedImage.category
                    )
                )
            )
        )
    );
};

window.ImageGallery = ImageGallery;
