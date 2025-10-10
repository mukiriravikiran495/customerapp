declare module 'lottie-react-native' {
  import * as React from 'react';
    import { Animated, StyleProp, ViewStyle } from 'react-native';

  export interface LottieViewProps {
    source: number | string | object;
    autoPlay?: boolean;
    loop?: boolean;
    style?: StyleProp<ViewStyle>;
    speed?: number;
    progress?: Animated.Value;
    onAnimationFinish?: () => void;
  }

  export default class LottieView extends React.Component<LottieViewProps> {}
}
