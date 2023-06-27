"use client";

import Map from "@/app/components/map";
import { MapProvider } from "@/app/hooks/map.context";
import GoogleMapService from "@/app/services/googlemap.service";
import { GOOGLE_MAPS_API_KEY } from "@/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [service, setService] = useState<GoogleMapService | null>(null);

  useEffect(() => {
    if (!service) setService(new GoogleMapService(GOOGLE_MAPS_API_KEY!));
  }, []);

  if (!service) return null;
  return (
    <MapProvider<google.maps.Map> mapDOMID={"map"} mapService={service}>
      <Map />
    </MapProvider>
  );
}
