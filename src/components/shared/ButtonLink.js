import styled from 'styled-components';
import { Link } from 'gatsby';

const ButtonLink = styled(Link).attrs(({ isInverted }) => ({
  className: `button ${isInverted ? 'is-inverted' : ''} is-info`,
}))`
  /* display: inline-block;
  padding: 12px 16px 10px;
  font-size: 18px;
  font-size: 1rem;
  line-height: 1.25;
  background-color: #fff;
  border-radius: 0.25rem;
  text-decoration: none;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-align: center;
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.primary};
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primaryInvert};
  } */
`;

export default ButtonLink;
