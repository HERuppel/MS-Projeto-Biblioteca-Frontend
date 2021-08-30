import React from 'react';

import LottieView from 'react-lottie';

import bookLoading from '../../assets/bookLoading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  },
};

const LottieLoading = (): JSX.Element => (
    <LottieView
      options={{...defaultOptions, animationData: bookLoading }}
      height={'50%'}
      width={'50%'}
      style={{ alignSelf: 'center' }}
    />
);

export default LottieLoading;
