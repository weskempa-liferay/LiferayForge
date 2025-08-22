import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
    min-height: 100vh;
    background: ${props => props.theme.colors.background};
`;

const Header = styled.header`
    background: linear-gradient(135deg, ${props => props.theme.colors.surface}, ${props => props.theme.colors.surfaceLight});
    border-bottom: 3px solid ${props => props.theme.colors.border};
    padding: ${props => props.theme.spacing.lg} 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: ${props => props.theme.shadows.lg};
`;

const HeaderContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.lg};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.h1`
    font-family: ${props => props.theme.fonts.heading};
    font-size: ${props => props.theme.fonts.sizes['3xl']};
    color: ${props => props.theme.colors.secondary};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    margin: 0;
    
    &::before {
        content: '⚔️';
        margin-right: ${props => props.theme.spacing.sm};
    }
`;

const MainContent = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.lg};
`;

const WelcomeSection = styled.section`
    text-align: center;
    background: linear-gradient(135deg, ${props => props.theme.colors.surface}, ${props => props.theme.colors.surfaceLight});
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing['3xl']} ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing['2xl']};
    box-shadow: ${props => props.theme.shadows.xl};
`;

const WelcomeTitle = styled.h2`
    font-size: ${props => props.theme.fonts.sizes['4xl']};
    margin-bottom: ${props => props.theme.spacing.lg};
    color: ${props => props.theme.colors.secondary};
`;

const WelcomeText = styled.p`
    font-size: ${props => props.theme.fonts.sizes.lg};
    color: ${props => props.theme.colors.textMuted};
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto ${props => props.theme.spacing.lg};
`;

const TabNavigation = styled.div`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.xl};
`;

const TabList = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.sm};
    justify-content: center;
    flex-wrap: wrap;
`;

const TabButton = styled.button`
    background: ${props => props.active ? 
        `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})` :
        'transparent'};
    color: ${props => props.active ? props.theme.colors.text : props.theme.colors.textMuted};
    border: 2px solid ${props => props.active ? props.theme.colors.secondary : props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fonts.weights.medium};
    font-size: ${props => props.theme.fonts.sizes.md};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
        background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
        color: ${props => props.theme.colors.text};
        border-color: ${props => props.theme.colors.secondary};
        box-shadow: ${props => props.theme.shadows.glow};
    }
`;

const ContentSection = styled.section`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing.xl};
    box-shadow: ${props => props.theme.shadows.lg};
`;

const App = () => {
    const [activeTab, setActiveTab] = useState('components');

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AppContainer>
                <Header>
                    <HeaderContent>
                        <Logo>D&D Component Library</Logo>
                    </HeaderContent>
                </Header>
                
                <MainContent>
                    <WelcomeSection>
                        <WelcomeTitle>Welcome to the Realm of Components</WelcomeTitle>
                        <WelcomeText>
                            A mystical collection of React components and Liferay fragments, forged in the fires of 
                            fantasy and tempered with the wisdom of the ancients. Each component bears the mark of 
                            legendary craftsmanship, ready to serve your digital kingdom.
                        </WelcomeText>
                    </WelcomeSection>

                    <TabNavigation>
                        <TabList>
                            <TabButton 
                                active={activeTab === 'components'}
                                onClick={() => setActiveTab('components')}
                            >
                                ⚔️ Component Library
                            </TabButton>
                            <TabButton 
                                active={activeTab === 'fragments'}
                                onClick={() => setActiveTab('fragments')}
                            >
                                📜 Fragment Collections
                            </TabButton>
                        </TabList>
                    </TabNavigation>

                    <ContentSection>
                        {activeTab === 'components' && (
                            <div>
                                <h3>Component Library</h3>
                                <p>
                                    Discover a comprehensive collection of React components designed with a 
                                    fantasy aesthetic. Each component is crafted with attention to detail 
                                    and follows modern React best practices.
                                </p>
                                <ul>
                                    <li>Layout Components (Header, Footer, Navigation)</li>
                                    <li>Interactive Elements (Buttons, Forms)</li>
                                    <li>Content Display (Cards, Media galleries)</li>
                                    <li>Utility Components (Icons, Loading states)</li>
                                </ul>
                            </div>
                        )}
                        
                        {activeTab === 'fragments' && (
                            <div>
                                <h3>Liferay Fragment Collections</h3>
                                <p>
                                    Explore pre-built Liferay fragments that bring the D&D aesthetic to 
                                    your Liferay DXP portal. These fragments are ready for integration 
                                    and customization.
                                </p>
                                <ul>
                                    <li>Basic Fragments (Text, Images, Layouts)</li>
                                    <li>Content Display Fragments (Articles, Cards)</li>
                                    <li>Navigation Fragments (Menus, Breadcrumbs)</li>
                                </ul>
                            </div>
                        )}
                    </ContentSection>
                </MainContent>
            </AppContainer>
        </ThemeProvider>
    );
};

export default App;