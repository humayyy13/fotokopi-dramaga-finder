declare module "leaflet-routing-machine" {
  import * as L from "leaflet";

  namespace Routing {
    interface RoutingControlOptions {
      waypoints: L.LatLng[];
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
      createMarker?: (i: number, waypoint: any, n: number) => L.Marker | null;
      router?: any;
    }

    function control(options: RoutingControlOptions): L.Control & {
      setWaypoints: (waypoints: L.LatLng[]) => void;
      getWaypoints: () => any[];
      getPlan: () => any;
    };
  }

  export = Routing;
}

declare module "leaflet.heat" {
  import * as L from "leaflet";

  interface HeatLayerOptions {
    minOpacity?: number;
    maxZoom?: number;
    max?: number;
    radius?: number;
    blur?: number;
    gradient?: { [key: number]: string };
  }

  function heatLayer(
    latlngs: [number, number, number?][],
    options?: HeatLayerOptions
  ): L.Layer;
}

declare module "leaflet" {
  function heatLayer(
    latlngs: [number, number, number?][],
    options?: {
      minOpacity?: number;
      maxZoom?: number;
      max?: number;
      radius?: number;
      blur?: number;
      gradient?: { [key: number]: string };
    }
  ): L.Layer;
}
