import { FunctionComponent, useState } from "react";
import { useMap } from "@/app/hooks/map.context";
import ReactDOMServer from "react-dom/server";
import InfoWindow from "@/app/components/InfoWindow";
import { IMarker } from "@/app/services/mapeventemitter.service";

const Controls: FunctionComponent = () => {
  const mapServiceProvider = useMap();
  const [currentCity, setCurrentCity] = useState<string>(
    mapServiceProvider.currentCityName
  );
  const [zoom, setZoom] = useState<number>(12);
  const naplesCoords = [
    { lat: 40.8522, lng: 14.2681, title: "Castel dell'Ovo" },
    { lat: 40.853, lng: 14.2689, title: "Piazza del Plebiscito" },
    { lat: 40.8471, lng: 14.2598, title: "Palazzo Reale di Napoli" },
    { lat: 40.8517, lng: 14.2687, title: "Teatro di San Carlo" },
    { lat: 40.8473, lng: 14.2626, title: "Galleria Umberto I" },
    { lat: 40.8313, lng: 14.2445, title: "Castel Sant'Elmo" },
    { lat: 40.8486, lng: 14.2629, title: "Maschio Angioino (Castel Nuovo)" },
    { lat: 40.8354, lng: 14.2502, title: "Certosa di San Martino" },
    {
      lat: 40.8334,
      lng: 14.2506,
      title: "Museo Archeologico Nazionale di Napoli",
    },
    { lat: 40.8317, lng: 14.2583, title: "Cimitero delle Fontanelle" },
  ];

  const sanFranciscoCoords = [
    { lat: 37.7749, lng: -122.4194, title: "Golden Gate Bridge" },
    { lat: 37.7748, lng: -122.4192, title: "Alcatraz Island" },
    { lat: 37.7749, lng: -122.4313, title: "Fisherman's Wharf" },
    { lat: 37.7749, lng: -122.4084, title: "Lombard Street" },
    { lat: 37.7752, lng: -122.4193, title: "Ghirardelli Square" },
    { lat: 37.8087, lng: -122.4098, title: "Coit Tower" },
    { lat: 37.8199, lng: -122.4783, title: "Golden Gate Park" },
    { lat: 37.8113, lng: -122.2654, title: "Sausalito" },
    { lat: 37.7552, lng: -122.4191, title: "Palace of Fine Arts" },
    { lat: 37.7694, lng: -122.4862, title: "Land's End" },
  ];

  const randomPlace = () => {
    const arr = currentCity === "Naples" ? naplesCoords : sanFranciscoCoords;
    return {
      ...arr[Math.floor(Math.random() * naplesCoords.length)],
      icon: "/donut.png",
    };
  };

  const setZoomLevel = (level: number) => {
    mapServiceProvider.setZoom(level);
    setZoom(level);
  };

  mapServiceProvider.onSetCity((city) => {
    setCurrentCity(city as string);
  });

  return (
    <div className={"flex flex-row gap-10 mt-8"}>
      <Button
        onClick={() =>
          mapServiceProvider.setCity(
            currentCity === "Naples" ? "San Francisco" : "Naples"
          )
        }
      >
        {" "}
        Go to {currentCity === "Naples" ? "San Francisco" : "Naples"}
      </Button>

      <div className={"flex flex-row gap-4"}>
        <Button onClick={() => setZoomLevel(zoom + 1)}>+</Button>
        <Button onClick={() => setZoomLevel(zoom - 1)}> - </Button>
      </div>
      <Button
        onClick={() => {
          const randomPlaceObj: IMarker = randomPlace();
          mapServiceProvider.addMarker(
            randomPlaceObj,
            ReactDOMServer.renderToString(
              <InfoWindow textContent={randomPlaceObj.title} />
            )
          );
        }}
      >
        Add Marker
      </Button>
      <Button onClick={() => mapServiceProvider.clearMarkers()}>
        Clear Markers
      </Button>

      <Button onClick={() => mapServiceProvider.closeInfoWindow()}>
        Close popup
      </Button>
    </div>
  );
};

export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={"bg-violet-600 text-white px-4 py-2 text-center"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Controls;
