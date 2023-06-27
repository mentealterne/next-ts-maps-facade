import { Loader } from "@googlemaps/js-api-loader";
import {
  IMapServiceProvider,
  IMarker,
} from "@/app/services/mapeventemitter.service";

class GoogleMapService implements IMapServiceProvider<google.maps.Map> {
  private loader: Loader;
  private mapInstance: google.maps.Map | undefined;

  private markers: google.maps.Marker[] = [];

  private infoWindow: google.maps.InfoWindow | undefined;

  private selectedMarker: google.maps.Marker | undefined;

  constructor(apiKey: string) {
    this.loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
      id: "google-map-script",
      libraries: ["places"],
    });
  }

  public async loadMap(DOMElID: string): Promise<google.maps.Map> {
    const loaded = await this.loader.load();
    this.mapInstance = new loaded.maps.Map(
      document.getElementById(DOMElID) as HTMLElement,
      { center: { lat: 37.7749, lng: -122.4194 }, zoom: 12 }
    );
    return this.mapInstance;
  }

  public setCenter(location: { lat: number; lng: number }) {
    this.mapInstance?.setCenter(location);
  }

  public setZoom(zoom: number) {
    this.mapInstance?.setZoom(zoom);
  }

  public getZoom(): number | undefined {
    return this.mapInstance?.getZoom();
  }

  public onZoomChanged(callback: Function) {
    this.mapInstance?.addListener("zoom_changed", callback);
  }

  public getBounds(): any {
    return this.mapInstance?.getBounds();
  }

  public isMapLoaded(): boolean {
    return this.mapInstance !== undefined;
  }

  public addMarker(
    marker: IMarker,
    infoWindowContent: React.ReactNode,
    selectCallback: (marker: IMarker) => void
  ): void {
    const markerInst = new google.maps.Marker({
      position: { lat: marker.lat, lng: marker.lng },
      title: marker.title,
      icon: marker.icon,
    });
    this.markers.push(markerInst);

    markerInst.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent!.toString(),
      });
      if (this.infoWindow) this.infoWindow.close();
      this.infoWindow = infoWindow;
      infoWindow.open({
        anchor: markerInst,
        map: this.mapInstance,
      });
      selectCallback({ lat: marker.lat, lng: marker.lng, title: marker.title });
    });
    markerInst.setMap(this.mapInstance as google.maps.Map);
  }

  public clearMarkers(): void {
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
  }

  public closeInfoWindow() {
    this.infoWindow?.close();
  }
}

export default GoogleMapService;
