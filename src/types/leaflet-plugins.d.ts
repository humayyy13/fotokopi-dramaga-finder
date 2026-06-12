import type { Control, LatLng, Layer, Marker } from "leaflet";

type HeatPoint = [number, number, number?];

interface HeatLayerOptions {
  minOpacity?: number;
  maxZoom?: number;
  max?: number;
  radius?: number;
  blur?: number;
  gradient?: { [key: number]: string };
}

interface RoutingControlOptions {
  waypoints: LatLng[];
  routeWhileDragging?: boolean;
  showAlternatives?: boolean;
  fitSelectedRoutes?: boolean;
  show?: boolean;
  addWaypoints?: boolean;
  draggableWaypoints?: boolean;
  lineOptions?: {
    styles?: { color?: string; weight?: number; opacity?: number }[];
    extendToWaypoints?: boolean;
    missingRouteTolerance?: number;
  };
  createMarker?: (i: number, waypoint: any, n: number) => Marker | null;
  router?: any;
}

type RoutingControl = Control & {
  setWaypoints: (waypoints: LatLng[]) => void;
  getWaypoints: () => any[];
  getPlan: () => any;
};

declare module "leaflet-routing-machine" {

  namespace Routing {
    function control(options: RoutingControlOptions): RoutingControl;
  }

  export = Routing;
}

declare module "leaflet.heat" {
  function heatLayer(latlngs: HeatPoint[], options?: HeatLayerOptions): Layer;
}

declare module "leaflet" {
  namespace Routing {
    function control(options: RoutingControlOptions): RoutingControl;
  }

  function heatLayer(
    latlngs: HeatPoint[],
    options?: HeatLayerOptions
  ): Layer;
}
