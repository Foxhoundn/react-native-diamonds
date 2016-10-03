/* @flow */
import React from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

const Music: Function = (): React.Element<any> => null;

export default compose(
  lifecycle({
    componentWillMount() {
      const { play, song } = this.props;

      play(song);
    },
    componentWillReceiveProps(nextProps) {
      const { play, song, musicOn } = this.props;

      if (musicOn !== nextProps.musicOn && nextProps.musicOn) {
        play(song);
      }
    }
  })
)(Music);
