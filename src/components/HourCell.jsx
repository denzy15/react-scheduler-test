import styled from "styled-components";

const HourCell = styled.td`
  background-color: ${(props) =>
    props.isSelected ? "#b3b7ff" : props.hasTask ? "#ebecff" : "#fff"};
  cursor: pointer;
  border: 1px solid #e6e6e6;
  height: 40px;
  box-sizing: border-box;
  border-left: none;
`;

export default HourCell;
