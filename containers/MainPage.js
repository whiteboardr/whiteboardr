import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import NavBar from '../components/NavBar';
import AddImage from './AddImage';
import LoginDialog from './LoginDialog';
import ChannelComments from '../containers/ChannelComments';
import ChannelList from '../containers/ChannelList';

import {Splitter, SplitterSide, SplitterContent, Page} from 'react-onsenui';

const MainPage = ({ logged_in, actions, navigator }) => {
  let content;
  if (!logged_in) {
    actions.checkLogin();
    content = (<LoginDialog />);
  } else {
    content = (
      <Splitter>
        <SplitterSide
          side='left'
          width={200}
          collapse={true}
          isSwipeable={true}
          isOpen={false}
        >
          <Page>
            <ChannelList navigator={navigator} />
          </Page>
        </SplitterSide>
        <SplitterContent>
          <div>
            <AddImage navigator={navigator} />
            <ChannelComments navigator={navigator} />
          </div>
        </SplitterContent>
      </Splitter>
    );
  }
  return (
    <Page renderToolbar={() => <NavBar title='Whiteboardr' navigator={navigator} />}>
      {content}
    </Page>
  );
};

const mapStateToProps = (state) => ({
  logged_in: state.settings.logged_in
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
