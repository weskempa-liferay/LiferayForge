import React from 'react';
import styled from 'styled-components';

const CharacterCard = styled.div`
  background: linear-gradient(145deg, #2a1f1a, #3a2f2a);
  border: 3px solid #8B4513;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem;
  max-width: 320px;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(212, 175, 55, 0.2);
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
    background: 
      radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 0, 0, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 15px 35px rgba(0, 0, 0, 0.6),
      0 0 25px rgba(212, 175, 55, 0.2);
    border-color: #D4AF37;
  }
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
`;

const CharacterPortrait = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid #D4AF37;
    background: #1a0f0a;
    object-fit: cover;
    transition: all 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px solid transparent;
    border-radius: 50%;
    background: linear-gradient(45deg, #D4AF37, #CD853F, #D4AF37);
    background-clip: border-box;
    z-index: -1;
  }
`;

const CharacterRank = styled.div`
  font-size: 1.2rem;
  color: #D4AF37;
  text-shadow: 0 0 10px #D4AF37;
`;

const CardBody = styled.div`
  position: relative;
  z-index: 2;
`;

const CharacterName = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: #D4AF37;
  text-align: center;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const CharacterClass = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  color: #CD853F;
  text-align: center;
  margin-bottom: 1rem;
  font-style: italic;
`;

const CharacterDescription = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  color: #E8E3D3;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  text-align: center;
  opacity: 0.9;
`;

const CharacterStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(26, 15, 10, 0.5);
  border: 1px solid #8B4513;
  border-radius: 8px;
`;

const StatGroup = styled.div`
  text-align: center;
`;

const StatLabel = styled.span`
  display: block;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 0.8rem;
  color: #B8A888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.span`
  display: block;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.2rem;
  font-weight: 700;
  color: #D4AF37;
  text-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
`;

const CharacterAbilities = styled.div`
  margin-bottom: 1.5rem;
`;

const Ability = styled.div`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  color: #E8E3D3;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(139, 69, 19, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CardFooter = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
`;

const CharacterButton = styled.button`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #8B0000, #CD853F);
  color: #E8E3D3;
  border: 2px solid #D4AF37;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: linear-gradient(135deg, #A0001A, #D4AF37);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
    transform: translateY(-2px);
  }
`;

const CharacterCardPreview = () => {
  return (
    <CharacterCard>
      <CardHeader>
        <CharacterPortrait>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMmExZjFhIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjRDRBRjM3Ii8+CjxwYXRoIGQ9Ik0zMCA3MEMzMCA2NSA0MCA2MCA1MCA2MEM2MCA2MCA3MCA2NSA3MCA3MEg3MEg2MEg0MEgzMFoiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+" alt="Character Portrait" />
        </CharacterPortrait>
        <CharacterRank>⭐⭐⭐</CharacterRank>
      </CardHeader>
      
      <CardBody>
        <CharacterName>Aragorn the Brave</CharacterName>
        <CharacterClass>Human Ranger</CharacterClass>
        <CharacterDescription>
          A skilled ranger from the northern kingdoms, wielding both sword and bow with legendary precision.
        </CharacterDescription>
        
        <CharacterStats>
          <StatGroup>
            <StatLabel>Level</StatLabel>
            <StatValue>15</StatValue>
          </StatGroup>
          <StatGroup>
            <StatLabel>HP</StatLabel>
            <StatValue>120</StatValue>
          </StatGroup>
          <StatGroup>
            <StatLabel>MP</StatLabel>
            <StatValue>80</StatValue>
          </StatGroup>
        </CharacterStats>
        
        <CharacterAbilities>
          <Ability>🏹 Master Archer</Ability>
          <Ability>🗡️ Sword Mastery</Ability>
          <Ability>🌲 Forest Guardian</Ability>
        </CharacterAbilities>
      </CardBody>
      
      <CardFooter>
        <CharacterButton>View Details</CharacterButton>
      </CardFooter>
    </CharacterCard>
  );
};

export default CharacterCardPreview;