import styled from 'styled-components';
import Icon from '~/views/components/widgets/Icon';

const TestStyle = styled.div`
  color: red;
`;

export default function Home() {
  return (
    <div>
      <Icon name="download" color={'red'} />
      <TestStyle>Helloworld</TestStyle>
      <TestStyle>Helloworld</TestStyle>
      <TestStyle>Helloworld</TestStyle>
      <TestStyle>Helloworld</TestStyle>
      <TestStyle>Helloworld</TestStyle>
    </div>
  );
}
