import React from 'react';
import styled from 'styled-components';

const HeroBanner = styled.section`
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a0f0a 0%, #2a1a0f 50%, #1a0f0a 100%);
  border: 3px solid #8B4513;
  border-radius: 12px;
  overflow: hidden;
  margin: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(139, 0, 0, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  position: relative;
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 3rem 2rem;
`;

const HeroOrnament = styled.div`
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  margin: 0 auto;
  position: relative;
  
  &::before,
  &::after {
    content: '◆';
    position: absolute;
    top: -8px;
    color: #D4AF37;
    font-size: 16px;
  }
  
  &::before {
    left: -20px;
  }
  
  &::after {
    right: -20px;
  }
  
  &.top {
    margin-bottom: 2rem;
  }
  
  &.bottom {
    margin-top: 2rem;
  }
`;

const HeroTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3.5rem;
  font-weight: 700;
  color: #D4AF37;
  margin-bottom: 1rem;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.05em;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.25rem;
  color: #E8E3D3;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FantasyButton = styled.a`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &.primary {
    background: linear-gradient(135deg, #8B0000, #CD853F);
    color: #E8E3D3;
    border-color: #D4AF37;
    
    &:hover {
      background: linear-gradient(135deg, #A0001A, #D4AF37);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: transparent;
    color: #D4AF37;
    border-color: #D4AF37;
    
    &:hover {
      background: #D4AF37;
      color: #1a0f0a;
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
      transform: translateY(-2px);
    }
  }
  
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const HeroBannerPreview = () => {
  return (
    <HeroBanner>
      <HeroContent>
        <HeroOrnament className="top" />
        <HeroTitle>Welcome to the Realm</HeroTitle>
        <HeroSubtitle>
          Embark on an epic journey through digital landscapes
        </HeroSubtitle>
        <HeroActions>
          <FantasyButton className="primary">Begin Quest</FantasyButton>
          <FantasyButton className="secondary">Learn More</FantasyButton>
        </HeroActions>
        <HeroOrnament className="bottom" />
      </HeroContent>
    </HeroBanner>
  );
};

export default HeroBannerPreview;