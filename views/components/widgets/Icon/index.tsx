import { FC } from 'react';
import IconComponent, { IconName } from '~/public/images/icons';

type IconProps = {
  name: IconName;
  color?: string;
};

const Icon: FC<IconProps> = ({ color, name, ...rest }) => {
  const SVGComponent = IconComponent[name];

  return <SVGComponent fill={color} {...rest} />;
};

export default Icon;
