import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { Splitter, SplitterSide, SplitterContent, Page, List, ListItem } from 'react-onsenui';
import NavBar from '../components/NavBar';
import AddImage from './AddImage';
import LoginDialog from './LoginDialog';
import ChannelComments from '../containers/ChannelComments';

const MainPage = ({ logged_in, actions, navigator }) => {
  let content;
  if (!logged_in) {
    actions.checkLogin();
    content = (<LoginDialog />);
  } else {
    content = (
      <div>
        <AddImage navigator={navigator} />
        <ChannelComments navigator={navigator} />
      </div>
    );
  }
  return (
    <Splitter>
      <SplitterSide
        style={{
          boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
        }}
          side='left'
          width={200}
          collapse={false}
          isSwipeable={true}
          isOpen={this.state.isOpen}
          onClose={this.setState({isOpen: false})}
          onOpen={this.setState({isOpen: true})}
      >
          <Page>
            <List
              dataSource={['Profile', 'Followers', 'Settings']}
            >
              <ListItem tappable>Test</ListItem>
            </List>
          </Page>
      </SplitterSide>
      <SplitterContent>
        <Page renderToolbar={() => <NavBar title='Whiteboarder' navigator={navigator} />}>
      {content}
        </Page>
      </SplitterContent>
    </Splitter>
  );
};

const mapStateToProps = (state) => ({
  logged_in: state.settings.logged_in,
  isOpen: false
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
