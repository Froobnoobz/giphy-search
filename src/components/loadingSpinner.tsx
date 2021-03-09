import * as React from 'react';
import LoopIcon from '@material-ui/icons/Loop';

const LoadingSpinner = (props) => {
  return (
    <>
      {props.loading && <h1 className="giphy-search__loading-placeholder"><LoopIcon /></h1>}
    </>
  );
}

export default LoadingSpinner;