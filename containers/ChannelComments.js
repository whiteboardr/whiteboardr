import React from 'react';
import {connect} from 'react-redux';

import {List} from 'react-onsenui';
import {Comment} from './Comment';

const ChannelComments = ({comments, navigator}) => {
  if (!Object.keys(comments).length) {
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
  comments: state.comments
});

export default connect(mapStateToProps)(ChannelComments);
