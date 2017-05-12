import React from 'react';
import { connect } from 'react-redux';

import {
  Page,
  ProgressCircular
} from 'react-onsenui';

import NavBar from '../components/NavBar';
import ImageFile from '../components/ImageFile';

const CommentPage = ({
  navigator,
  title,
  text,
  user,
  image_url,
  channel,
  isFetching,
  isInvalid
}) => {
  let content;

  if (isInvalid) {
    content = <div>Unable to fetch!</div>;
  } else if (isFetching) {
    content = <ProgressCircular indeterminate />;
  } else {
    content = (
      <div>
        <div>
          {title}
        </div>

        <div>
          <ImageFile url={image_url} />
        </div>
      </div>
    );
  }
  return (
    <Page renderToolbar={() => <NavBar backButton={true} title={`Image taken ${title}`} navigator={navigator} />}>
      <div>
        {content}
      </div>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  ...state.comments[state.selectedComment]
});

export default connect(
  mapStateToProps
)(CommentPage);
