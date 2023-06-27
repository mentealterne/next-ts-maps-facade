import mitt, { Handler } from "mitt";
import React, { ReactNode } from "react";

export interface IMapServiceProvider<T> {
  loadMap(DOMElId: string): Promise<T>;
  setCenter(location: { lat: number; lng: number }): void;

  setZoom(zoom: number): void;

  getZoom(): number | undefined;

  onZoomChanged(callback: Function): void;

  getBounds(): any;

  isMapLoaded(): boolean;

  addMarker(
    marker: IMarker,
    infoWindowContent: ReactNode,
    selectCallback: any
  ): void;

  clearMarkers(): void;

  closeInfoWindow(): void;
}

export interface IMarker {
  lat: number;
  lng: number;
  title: string;
  icon?: string;
}

class MapEventEmitterService<T> {
  private eventEmitter = mitt();
  private markers: IMarker[] = [];

  private currentCity: "Naples" | "San Francisco" = "San Francisco";

  private selectedMarker: any;

  public constructor(
    private readonly serviceProvider: IMapServiceProvider<T>
  ) {}

  public async initMap(DOMElId: string): Promise<T> {
    const mapLoaded = await this.serviceProvider.loadMap(DOMElId);
    this.eventEmitter.emit("mapLoaded", mapLoaded);

    return mapLoaded;
  }

  public onMapLoaded(callback: Handler) {
    this.eventEmitter.on("mapLoaded", callback);
  }

  public setCenter(location: { lat: number; lng: number }) {
    this.serviceProvider.setCenter(location);
    this.eventEmitter.emit("setCenter", location);
  }

  public setZoom(zoom: number) {
    this.serviceProvider.setZoom(zoom);
    this.eventEmitter.emit("setZoom", zoom);
  }

  public getZoom(): number | undefined {
    return this.serviceProvider.getZoom();
  }

  public onSetCenter(callback: Handler) {
    this.eventEmitter.on("setCenter", callback);
  }

  public onZoomChanged(callback: Handler) {
    this.serviceProvider.onZoomChanged(callback);
  }

  public getBounds() {
    return this.serviceProvider.getBounds();
  }

  public isMapLoaded() {
    return !!this.serviceProvider.isMapLoaded();
  }

  public addMarker(marker: IMarker, infoWindowContent?: ReactNode) {
    if (!this.markerExists(marker)) {
      this.serviceProvider.addMarker(
        marker,
        infoWindowContent,
        this.selectMarker.bind(this)
      );
      this.markers.push(marker);
      this.eventEmitter.emit("addMarker", marker);
    }
  }

  public onAddMarker(callback: Handler) {
    this.eventEmitter.off("addMarker", callback);
    return this.eventEmitter.on("addMarker", callback);
  }

  public get markersList() {
    return this.markers;
  }

  public setCity(city: "Naples" | "San Francisco") {
    this.currentCity = city;
    this.setCenter(
      city === "Naples"
        ? { lat: 40.851775, lng: 14.268124 }
        : { lat: 37.7749, lng: -122.4194 }
    );
    this.eventEmitter.emit("setCity", city);
  }

  public onSetCity(callback: Handler) {
    this.eventEmitter.on("setCity", callback);
  }

  public get currentCityName() {
    return this.currentCity;
  }

  public markerExists(marker: IMarker) {
    return this.markers.some(
      (m) => m.lat === marker.lat && m.lng === marker.lng
    );
  }

  public clearMarkers() {
    this.markers = [];
    this.selectedMarker = undefined;
    this.serviceProvider.clearMarkers();
    this.eventEmitter.emit("clearMarkers");
  }

  public selectMarker(marker: IMarker) {
    this.selectedMarker = marker;
    this.eventEmitter.emit("selectMarker", marker);
  }

  public get selectedMarkerInfo() {
    return this.selectedMarker;
  }

  public onSelectedMarker(callback: Handler) {
    this.eventEmitter.on("selectMarker", callback);
  }
  public onClearMarkers(callback: Handler) {
    this.eventEmitter.on("clearMarkers", callback);
  }

  public closeInfoWindow() {
    this.serviceProvider.closeInfoWindow();
  }
}

export default MapEventEmitterService;
