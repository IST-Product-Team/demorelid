import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { makeStyles } from '@material-ui/core/styles';

import path from '../../../pathnameCONFIG';

const useStyles = makeStyles((theme) => ({
  icon: {
    position: 'relative',
    top: '4px',
  },
  title: {
    marginLeft: '10px',
    fontFamily: 'Overpass',
    color: '#fff',
    fontWeight: '600',
  },
}));

const SideBarMenu = (props) => {
  const classes = useStyles();
  const [activeButton, setActiveButton] = React.useState('0');

  async function activeButtonHighlight() {
    const { pathname } = window.location;
    switch (pathname) {
      case path.portal:
        return '0';
      case path.codeScreen:
        return '1';

      default:
        return '';
    }
  }

  useEffect(() => {
    activeButtonHighlight().then((value) => {
      setActiveButton(value);
    });
  }, []);

  return (
    <div>
      <Menu
        defaultSelectedKeys={[activeButton]}
        selectedKeys={[activeButton]}
        style={{
          backgroundColor: '#EA5121',
          paddingTop: '10px',
          width: '100%',
        }}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="0">
          <a
            style={{ cursor: 'pointer' }}
            href={path.portal}
            onClick={() => window.location.assign(path.portal)}
          >
            <span className={classes.title}>MFA Setting</span>
          </a>
        </Menu.Item>
        <Menu.Item key="1">
          <a
            style={{ cursor: 'pointer' }}
            href={path.codeScreen}
            onClick={() => window.location.assign(path.codeScreen)}
          >
            <span className={classes.title}>codeactivation</span>
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBarMenu;
