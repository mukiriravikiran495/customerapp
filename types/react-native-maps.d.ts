declare module 'react-native-maps' {
  import * as React from 'react';
    import { ViewProps } from 'react-native';

  export interface MapViewProps extends ViewProps {
    style?: any;
    region?: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
    initialRegion?: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
    provider?: any;
    showsUserLocation?: boolean;
    zoomEnabled?: boolean;
    scrollEnabled?: boolean;
    onRegionChange?: (region: any) => void;
    onRegionChangeComplete?: (region: any) => void;
    [key: string]: any;
  }

  export default class MapView extends React.Component<MapViewProps> {}
  export class Marker extends React.Component<any> {}
  export class Callout extends React.Component<any> {}
}
