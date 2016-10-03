/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

import Menu from './views/menu/index';
import { init, playSound } from './store/app/actions';
import Music from './components/music';
import Section from './components/section';
import loader from './hocomponents/loader';

type Props = {
  save: boolean,
  playSound: Function,
  navigator: Object,
  loadingSounds: boolean,
  musicOn: boolean
}

const App: Function = ({
  loadingSounds,
  musicOn,
  save,
  playSound,
  navigator
}: Props): React.Element<any> => (
  <Section>
    <Menu save={save} navigator={navigator} />
    <Music
      song="music"
      play={playSound}
      musicOn={musicOn}
      loading={loadingSounds}
    />
  </Section>
);

export default compose(
  connect(
    ({ app }): Object => ({
      loading: app.loadingSaves || app.loadingSounds,
      loadingSounds: app.loadingSounds,
      save: app.save,
      musicOn: app.settings.music,
    }),
    {
      init,
      playSound,
    }
  ),
  lifecycle({
    componentWillMount() {
      this.props.init();
    },
  }),
  loader('loading')
)(App);
