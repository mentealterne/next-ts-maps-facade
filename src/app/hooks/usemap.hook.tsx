/*
import { useEffect, useState } from 'react'
import MapEventEmitterService from '@/app/services/mapeventemitter.service'
import GoogleMapService from '@/app/services/googlemap.service'

export const useMap = <T>() => {
  const [mapObjRef, setMapObjRef] = useState<T>()

  useEffect(() => {
    const initializeMap = async () => {
      const googleMapServiceProvider = new GoogleMapService('ciao')
     const mapService = new MapEventEmitterService<google.maps.Map>( googleMapServiceProvider)
      const map = await mapService.loadMap('map')
      setMapObjRef(map as T)
    }
  }, [])
}
*/
"use client"


import React, { createContext, ReactNode, RefObject, useContext, useEffect, useRef, useState } from 'react'
import MapEventEmitterService, { IMapServiceProvider } from '@/app/services/mapeventemitter.service'
import GoogleMapService from '@/app/services/googlemap.service'
import { GOOGLE_MAPS_API_KEY } from '@/constants'

interface IContextProps {
  mapRef: any
  serviceProvider: any

}
export const MapContext = createContext<IContextProps>({ mapRef:undefined, serviceProvider:undefined })

interface IProps<T> {
  children:ReactNode

  mapDOMID: string

  mapService: IMapServiceProvider<T>
}
export const MapProvider = <T extends unknown> (props:IProps<T>) => {
  const [mapRef, setMapRef] = useState<React.RefObject<T>>(useRef<T>(null));
  const googleMapServiceProvider = new GoogleMapService(GOOGLE_MAPS_API_KEY!);

  const serviceProvider = new MapEventEmitterService<T>(googleMapServiceProvider as unknown as IMapServiceProvider<T>);

  useEffect(() => {
    const initializeMap = async () => {

      const map = await serviceProvider.loadMap(props.mapDOMID);
      setMapRef(() => (map as unknown) as React.RefObject<T>);
    };
    initializeMap();
  }, []);

  if(!mapRef) return null;

  return (
    <MapContext.Provider value={{ mapRef, serviceProvider }}>
      {props.children}
    </MapContext.Provider>
  );
}

export const useMap = () => {
  const { mapRef, serviceProvider } = useContext(MapContext)
  return { mapRef, serviceProvider }
}
