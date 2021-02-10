/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Menu } from 'antd';
// eslint-disable-next-line no-unused-vars
import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  icon: {
    position: 'relative',
    top: '4px',
  },
  title: {
    marginLeft: '10px',
    fontFamily: 'NunitoRegular',
    color: '#fff',
    fontWeight: '600',
  },
}));

// eslint-disable-next-line no-unused-vars
const SideBarMenu = (props) => {
  const classes = useStyles();
  const [activeButton, setActiveButton] = React.useState('0');
  const [logout, setLogout] = useState(false);

  // eslint-disable-next-line consistent-return
  async function activeButtonHighlight() {
    const { pathname } = window.location;
    // eslint-disable-next-line default-case
    switch (pathname) {
      case `/`:
        return '0';
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
          backgroundColor: '#004D6E',
          paddingTop: '10px',
          width: '100%',
        }}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="0">
          <a
            style={{ cursor: 'pointer' }}
            href="/"
            onClick={() => window.location.assign(`/`)}
          >
            <span className={classes.title}>Home</span>
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBarMenu;
