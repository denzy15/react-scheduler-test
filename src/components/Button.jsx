import styled from "styled-components";

const Button = styled.button`
  background: none;
  color: #ff3131;
  border: none;
  font-size: ${(props) => (props.big ? "2.5rem" : "1.25rem")};
  cursor: pointer;
`;

export default Button;
