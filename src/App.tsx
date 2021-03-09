import * as React from 'react';
import GiphySearch from './components/giphySearch';

interface Props {
  name: string;
}

const App = (props: Props): React.ReactElement => {
  const { name } = props;
  return <GiphySearch></GiphySearch>
};

export default App;
