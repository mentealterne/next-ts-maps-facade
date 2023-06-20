import { Loader } from '@googlemaps/js-api-loader';
import  { IMapServiceProvider } from '@/app/services/mapeventemitter.service'

class GoogleMapService implements IMapServiceProvider<google.maps.Map> {

  private loader: Loader

  constructor(apiKey: string) {
    this.loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      id: 'google-map-script',
      libraries: ['places'],
    })
  }

  public async loadMap(DOMElID: string): Promise<google.maps.Map> {
    const loaded = await this.loader.load()
    return  new loaded.maps.Map(document.getElementById(DOMElID) as HTMLElement, {center:{ lat: 37.7749, lng: -122.4194 }, zoom:12})
  }
}

export default GoogleMapService
