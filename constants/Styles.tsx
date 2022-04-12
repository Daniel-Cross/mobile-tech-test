import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: white;
`;

export const Title = styled.Text`
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "20px")};
  font-weight: 700;
  padding: 12px;
`;

export const Body = styled.Text`
  font-size: 16px;
  padding: 5px 12px 10px 12px;
`;
