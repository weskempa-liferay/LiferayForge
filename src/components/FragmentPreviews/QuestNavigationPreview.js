import React, { useState } from 'react';
import styled from 'styled-components';

const QuestNavigation = styled.nav`
  background: linear-gradient(135deg, #2a1f1a, #1a0f0a);
  border-bottom: 3px solid #8B4513;
  border-top: 1px solid #D4AF37;
  padding: 0;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(139, 0, 0, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const NavBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: ${props => props.theme.fonts.heading};
  color: #D4AF37;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  
  .brand-icon {
    font-size: 2rem;
    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    
    .brand-icon {
      font-size: 1.5rem;
    }
  }
`;

const NavToggle = styled.button`
  display: none;
  flex-direction: column;
  background: transparent;
  border: 2px solid #D4AF37;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavToggleBar = styled.span`
  width: 20px;
  height: 2px;
  background: #D4AF37;
  margin: 2px 0;
  transition: all 0.3s ease;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #2a1f1a, #1a0f0a);
    border: 2px solid #8B4513;
    border-top: none;
    border-radius: 0 0 12px 12px;
    flex-direction: column;
    gap: 0;
    padding: 1.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    
    ${props => props.$isOpen && `
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    `}
  }
`;

const NavSection = styled.div`
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const NavSectionTitle = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 0.9rem;
  font-weight: 600;
  color: #CD853F;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    border-bottom: 1px solid #8B4513;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #E8E3D3;
  text-decoration: none;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid transparent;
  cursor: pointer;
  
  &:hover {
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(139, 0, 0, 0.1));
    border-color: #D4AF37;
    color: #D4AF37;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
    transform: translateY(-2px);
  }
  
  .nav-link-icon {
    font-size: 1.1rem;
    filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.3));
  }
  
  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 1rem;
    background: rgba(42, 31, 26, 0.3);
    border: 1px solid #8B4513;
  }
`;

const NavBadge = styled.span`
  background: #8B0000;
  color: #E8E3D3;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  margin-left: auto;
  box-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
`;

const NavUser = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(42, 31, 26, 0.5);
  border: 1px solid #8B4513;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(42, 31, 26, 0.8);
    border-color: #D4AF37;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserAvatar = styled.div`
  position: relative;
  
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #D4AF37;
    background: #1a0f0a;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 0.9rem;
  font-weight: 600;
  color: #D4AF37;
  line-height: 1;
  margin-bottom: 0.2rem;
`;

const UserLevel = styled.div`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.8rem;
  color: #CD853F;
  line-height: 1;
`;

const QuestNavigationPreview = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <QuestNavigation>
      <NavContainer>
        <NavBrand>
          <span className="brand-icon">⚔️</span>
          <span>Guild Portal</span>
        </NavBrand>
        
        <NavToggle onClick={() => setIsOpen(!isOpen)}>
          <NavToggleBar />
          <NavToggleBar />
          <NavToggleBar />
        </NavToggle>
        
        <NavMenu $isOpen={isOpen}>
          <NavSection>
            <NavSectionTitle>🏰 Kingdoms</NavSectionTitle>
            <NavLinks>
              <NavLink>
                <span className="nav-link-icon">🏠</span>
                <span>Home</span>
              </NavLink>
              <NavLink>
                <span className="nav-link-icon">🗺️</span>
                <span>Explore</span>
              </NavLink>
              <NavLink>
                <span className="nav-link-icon">🏪</span>
                <span>Marketplace</span>
              </NavLink>
            </NavLinks>
          </NavSection>
          
          <NavSection>
            <NavSectionTitle>⚔️ Adventures</NavSectionTitle>
            <NavLinks>
              <NavLink>
                <span className="nav-link-icon">📜</span>
                <span>Quests</span>
                <NavBadge>3</NavBadge>
              </NavLink>
              <NavLink>
                <span className="nav-link-icon">👥</span>
                <span>Party</span>
              </NavLink>
              <NavLink>
                <span className="nav-link-icon">🏆</span>
                <span>Achievements</span>
              </NavLink>
            </NavLinks>
          </NavSection>
          
          <NavSection>
            <NavSectionTitle>🎒 Character</NavSectionTitle>
            <NavLinks>
              <NavLink>
                <span className="nav-link-icon">👤</span>
                <span>Profile</span>
              </NavLink>
              <NavLink>
                <span className="nav-link-icon">🎒</span>
                <span>Inventory</span>
              </NavLink>
              <NavLink>
                <span className="nav-link-icon">⚙️</span>
                <span>Settings</span>
              </NavLink>
            </NavLinks>
          </NavSection>
        </NavMenu>
        
        <NavUser>
          <UserAvatar>
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMmExZjFhIiByeD0iMjAiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0Q0QUYzNyIvPgo8cGF0aCBkPSJNMTIgMzBDMTIgMjYgMTYgMjQgMjAgMjRDMjQgMjQgMjggMjYgMjggMzBIMjhIMjRIMTZIMTJaIiBmaWxsPSIjRERERUUiLz4KPC9zdmc+" alt="User Avatar" />
          </UserAvatar>
          <UserInfo>
            <UserName>Adventurer</UserName>
            <UserLevel>Level 15</UserLevel>
          </UserInfo>
        </NavUser>
      </NavContainer>
    </QuestNavigation>
  );
};

export default QuestNavigationPreview;