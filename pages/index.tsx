import styled from 'styled-components';

const TestStyle = styled.div`
  color: red;
`;

export default function Home() {
  return (
    <div>
      <TestStyle>Helloworld</TestStyle>
      <TestStyle>Helloworld</TestStyle>
      <TestStyle>Helloworld</TestStyle>
      <TestStyle>Helloworld</TestStyle>
      <TestStyle>Helloworld</TestStyle>
    </div>
  );
}
