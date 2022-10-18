/*
 * @Descripttion: 头部组件
 * @Author: huangjitao
 * @Date: 2021-04-24 19:53:48
 * @Function: use of this file
 */

import styled from "@emotion/styled";
import { Row } from "components";
import { Button, Dropdown, Menu } from "antd";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { useAuth } from "context/AuthContext";
import { resetRoute } from "utils";
import { ProjectPopover } from "./ProjectPopover";
import { UserPopover } from "./UserPopover";

const HeaderComponent = () => {
  const { logout, user } = useAuth();
  return (
    <Header justifyContent="space-between">
      <HeaderLeft gap={true}>
        <LinkButton type="link" onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </LinkButton>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const LinkButton = styled(Button)`
  height: 100%;
  line-height: 100%;
`;
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

export default HeaderComponent;
