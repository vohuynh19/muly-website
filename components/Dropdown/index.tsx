import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FC } from "react";
import { ItemType } from "antd/es/menu/hooks/useItems";

type Props = {
  placeholder?: string;
  items?: ItemType[];
};

const HOCDropdown: FC<Props> = ({ items, placeholder }) => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Space>
        {placeholder}
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

export default HOCDropdown;
