import React, { FC, useRef, useState, useEffect } from "react";
import Autocomplete from "./Autocomplete";
import carrot from "../assets/svg/carrot.svg";
import { LocationLatLng } from "../store/uiData/dataTypes";

interface IMapProps {
  LocationLatLng?: LocationLatLng;
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
  getMapAddress?: (
    street: string,
    town: string,
    postecode: string,
    locationLatLng?: LocationLatLng
  ) => void | undefined;
}

interface IMarker {
  address: string;
  latitude: number;
  longitude: number;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleLeMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const Map: FC<IMapProps> = ({
  mapType,
  mapTypeControl = false,
  getMapAddress,
  LocationLatLng,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<GoogleLeMap>();
  const [marker, setMarker] = useState<IMarker>();
  const [markerCreated, setMarkerCreated] = useState<boolean>(false);
  const [markerG, setMarkerG] = useState<GoogleMarker>();

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };

  useEffect(startMap, [map]);

  const defaultMapStart = (): void => {
    const defaultAddress = new google.maps.LatLng(53, 20);
    initMap(8, defaultAddress);
  };

  const initEventListener = (): void => {
    if (map) {
      google.maps.event.addListener(map, "click", function (e) {
        if (mapTypeControl) {
          coordinateToAddress(e.latLng);
        }
      });
    }
  };
  useEffect(initEventListener, [map]);

  const coordinateToAddress = async (coordinate: GoogleLatLng) => {
    const geocoder = new google.maps.Geocoder();

    await geocoder.geocode(
      { location: coordinate },
      function (results, status) {
        if (status === "OK") {
          const addressArr = results[0].formatted_address.split(", ");

          const street = addressArr[0];
          const postecode = addressArr[1].slice(0, 6);
          const town = addressArr[1].slice(6);

          const locationLatLng: LocationLatLng = {
            lat: coordinate.lat(),
            lng: coordinate.lng(),
          };

          getMapAddress!(street, town, postecode, locationLatLng);

          setMarker({
            address: results[0].formatted_address,
            latitude: coordinate.lat(),
            longitude: coordinate.lng(),
          });
        }
      }
    );
  };

  const addSingleMarker = (): void => {
    if (marker) {
      addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
    }
  };
  useEffect(addSingleMarker, [marker]);

  const addMarker = (
    location: GoogleLatLng,
    typedAddress: boolean = false
  ): void => {
    if (markerCreated === false) {
      const marker: GoogleMarker = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: false,
        icon: getIconAttribute(),
      });

      setMarkerG(marker);
      setMarkerCreated(true);
      if (typedAddress) {
        map!.setCenter(location);
      }
    } else {
      markerG!.setPosition(location);
      map!.setCenter(location);

      if (typedAddress) {
        map!.setCenter(location);
      }
    }
  };

  const getIconAttribute = () => {
    return {
      url: carrot,
      scale: 1,
      size: new google.maps.Size(40, 60),
      scaledSize: new google.maps.Size(40, 60),
    };
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl: mapTypeControl,
          streetViewControl: false,
          zoomControl: true,
          mapTypeId: mapType,
        })
      );
    }

    if (mapTypeControl === false) {
      console.log("add single marker");
      const marker = {
        address: "Płońsk",
        latitude: LocationLatLng!.lat,
        longitude: LocationLatLng!.lng,
      };

      setMarker(marker);
    }
  };

  if (mapTypeControl) {
    return (
      <div className="map">
        <div ref={ref} className="map__container" />
        <Autocomplete getMapAddress={getMapAddress!} addMarker={addMarker} />
      </div>
    );
  } else {
    return (
      <div className="map">
        <div ref={ref} className="map__container" />
      </div>
    );
  }
};

export default Map;
