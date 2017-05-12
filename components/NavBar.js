import React from 'react';

import {
  Toolbar,
  ToolbarButton,
  Icon,
  BackButton
} from 'react-onsenui';

const NavApp = ({title, navigator, backButton}) => (
  <Toolbar>
    <div className='left'>
      <ToolbarButton>
        <Icon icon='ion-navicon, material:md-menu' />
      </ToolbarButton>
    </div>
    <div className='left'>
      {backButton ? <BackButton onClick={() => navigator.popPage()}>Back</BackButton> : null}
    </div>
    <div className='center'>{title}</div>
  </Toolbar>
);

export default NavApp;
