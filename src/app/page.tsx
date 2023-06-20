import Image from 'next/image'
import Map from '@/app/components/map'
import { MapProvider } from '@/app/hooks/usemap.hook'
import GoogleMapService from '@/app/services/googlemap.service'
import { GOOGLE_MAPS_API_KEY } from '@/constants'

export default function Home() {
  return (
    <MapProvider<google.maps.Map> mapDOMID={'map'} mapService={new GoogleMapService(GOOGLE_MAPS_API_KEY!)}>
  <Map />
  </MapProvider>
  )
}
