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
import { unknown } from 'zod'

interface IContextProps {
  mapServiceProvider: any

}
export const MapContext = createContext<IContextProps>({ mapServiceProvider:undefined })

interface IProps<T> {
  children:ReactNode

  mapDOMID: string

  mapService: IMapServiceProvider<T>
}
export const MapProvider = <T extends unknown> (props:IProps<T>) => {
  const [mapRef, setMapRef] = useState<React.RefObject<T>>(useRef<T>(null));

  const mapServiceProvider = new MapEventEmitterService<T>(props.mapService as unknown as IMapServiceProvider<T>);

  useEffect(() => {
    const initializeMap = async () => {

      const map = await mapServiceProvider.initMap(props.mapDOMID);
      setMapRef(() => (map as unknown) as React.RefObject<T>);
    };
    initializeMap();
  }, []);

  if(!mapRef) return null;

  return (
    <MapContext.Provider value={{ mapServiceProvider }}>
      {props.children}
    </MapContext.Provider>
  );
}

export const useMap = <T extends unknown > (): MapEventEmitterService<T> => {
  const { mapServiceProvider } = useContext(MapContext)
  return mapServiceProvider
}
