import React from 'react';
import {connect} from 'react-redux';

import {Toolbar, ToolbarButton, Icon} from 'react-onsenui';

const SideMenu = ({navigator}) => {
  return (
    <Toolbar>
      <div className='left'>
      <ToolbarButton onClick={this.setState({isOpen: true})}>
      <Icon icon='ion-navicon, material:md-menu' />
      </ToolbarButton>
      </div>
      <div className='center'>Side menu</div>
      </Toolbar>
  );
};

const mapStateToProps = (state) => ({
  isOpen: false
});

export default connect(mapStateToProps)(SideMenu);
