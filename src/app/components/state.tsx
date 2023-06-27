import { FunctionComponent, useEffect, useState } from "react";
import { useMap } from "@/app/hooks/map.context";
import { IMarker } from "@/app/services/mapeventemitter.service";

interface IState {
  city: string;
  zoom: number | undefined;
  bounds?: string;
  markers: IMarker[];

  selectedMarker?: IMarker;
}
const State: FunctionComponent = () => {
  const [state, setState] = useState<IState | undefined>();
  const mapServiceProvider = useMap();

  useEffect(() => {
    if (!mapServiceProvider.isMapLoaded()) return;
    setState({
      city: mapServiceProvider.currentCityName,
      zoom: mapServiceProvider.getZoom(),
      bounds: JSON.stringify(mapServiceProvider.getBounds()),
      markers: mapServiceProvider.markersList,
    });
  }, [mapServiceProvider.isMapLoaded()]);

  mapServiceProvider.onZoomChanged(() => {
    setState({ ...(state as IState), zoom: mapServiceProvider.getZoom() });
  });

  mapServiceProvider.onSetCity((city) => {
    setState({ ...(state as IState), city: city as string });
  });

  mapServiceProvider.onAddMarker((marker) => {
    // @ts-ignore

    setState({ ...(state as IState), markers: mapServiceProvider.markersList });
  });

  mapServiceProvider.onSelectedMarker((marker) => {
    setState({
      ...(state as IState),
      selectedMarker: mapServiceProvider.selectedMarkerInfo,
    });
  });

  mapServiceProvider.onClearMarkers(() => {
    setState({ ...(state as IState), markers: [], selectedMarker: undefined });
  });
  return (
    <ul className={"text-gray-700"}>
      <li>City: {state?.city}</li>
      <li>Zoom level: {state?.zoom}</li>
      <li>Bounds: {state?.bounds}</li>
      <li>Markers: {JSON.stringify(state?.markers)}</li>
      <li>Selected marker: {JSON.stringify(state?.selectedMarker)}</li>
    </ul>
  );
};

export default State;
