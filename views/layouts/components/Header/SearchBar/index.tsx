import { useState } from 'react';
import Icons from '~/src/assets/icons';
import { Wrapper } from './styled';

const SearchBar = () => {
  const [color, setColor] = useState('white');

  return (
    <Wrapper color={color}>
      <Icons.DOWNLOAD color={color === 'white' ? 'red' : 'white'} />

      <input
        onFocus={() => {
          setColor('red');
        }}
        onBlur={() => setColor('white')}
      />
    </Wrapper>
  );
};

export default SearchBar;
