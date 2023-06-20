import mitt, { Handler } from 'mitt'

export interface IMapServiceProvider<T> {
  loadMap(DOMElId:string): Promise<T>;
}

 class MapEventEmitterService<T> {
private eventEmitter = mitt();

  constructor(private readonly serviceProvider: IMapServiceProvider<T>) {
  }

  public async loadMap(DOMElId:string) {
   const mapLoaded =  await this.serviceProvider.loadMap(DOMElId) ;
   this.eventEmitter.emit('mapLoaded', mapLoaded);
    return mapLoaded;
  }

  public onMapLoaded(callback: Handler) {
    this.eventEmitter.on('mapLoaded', callback )
  }
}

export default MapEventEmitterService;
