import React from 'react';
import {connect} from 'react-redux';

import {Splitter, SplitterSide, Page, ListItem, List} from 'react-onsenui';

const SideMenu = ({navigator}) => {
  return (
    <Splitter>
      <SplitterSide
        side='left'
        width={200}
        collapse={true}
        isSwipeable={true}
        isOpen={false}
        // onClose={this.hide}
        // onOpen={this.show}
      >
        <Page>
          <List
            dataSource={['Profile', 'Followers', 'Settings']}
            renderRow={(title) => (
              <ListItem key={title} tappable>{title}</ListItem>
            )}
          />
        </Page>
      </SplitterSide>
    </Splitter>
  );
};
const mapStateToProps = (state) => ({
  // isOpen: state.isOpen
});

export default connect(mapStateToProps)(SideMenu);
