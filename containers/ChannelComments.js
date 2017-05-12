import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { List } from 'react-onsenui';
import Comment from './Comment';
import * as actions from '../actions';

const ChannelComments = ({ comments, channel_id, navigator }) => {
  if (Object.keys(comments).length === 0) {
    return null;
  }
  return (
    <List
      dataSource={Object.keys(comments).map((key) => comments[key])}
      renderRow={(comment) =>
        <Comment
          key={comment.id}
          navigator={navigator}
          {...comment}
        />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  comments: state.comments.data,
  channel_id: state.comments.channel_id
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelComments);
