import React, { FC, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LocationLatLng } from "../store/uiData/dataTypes";

type GoogleLatLng = google.maps.LatLng;

interface IAutocompleteProps {
  getMapAddress?: (
    street: string,
    town: string,
    postecode: string,
    locationLatLng?: LocationLatLng
  ) => void | undefined;
  addMarker: (
    location: GoogleLatLng,
    typedAddress: boolean
  ) => void | undefined;
}

const Autocomplete: FC<IAutocompleteProps> = ({ getMapAddress, addMarker }) => {
  const [location, setLocation] = useState<string>("");

  const handlechange = (value: string): void => {
    setLocation(value);
  };

  const handleSelect = (value: string): void => {
    geocodeByAddress(location)
      .then((results) => {
        getLatLng(results[0]).then((latLng) => {
          const locationLatLng = {
            lat: latLng.lat,
            lng: latLng.lng,
          };

          getMapAddress!("", "", "", locationLatLng);

          addMarker(new google.maps.LatLng(latLng.lat, latLng.lng), true);
        });

        const addressArr = results[0].formatted_address.split(", ");
        addressArr.pop();
        const firstAddressPart = addressArr[0];
        const firstMark = firstAddressPart.slice(0, 1);

        const re = new RegExp("[0-9]");
        const isDigid = re.test(firstMark);

        if (addressArr.length < 2 && isDigid === false) {
          getMapAddress!("", firstAddressPart, "");
        } else if (addressArr.length < 2 && isDigid === true) {
          const addressArray = addressArr[0].split(" ");
          const postecode = addressArray[0];
          const town = addressArray[1];
          getMapAddress!("", town, postecode);
        } else {
          const addressArray = addressArr[1].split(" ");
          const postecode = addressArray[0];
          const town = addressArray[1];
          getMapAddress!(firstAddressPart, town, postecode);
        }
      })
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Błąd Error", error));

    setLocation("");
  };

  return (
    <div className="autocomplete">
      <PlacesAutocomplete
        value={location}
        onChange={handlechange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              className="autocomplete__input"
              {...getInputProps({
                placeholder: "  wpisz adres",
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? { backgroundColor: "#18ca00", cursor: "pointer" }
                  : { backgroundColor: "white", cursor: "pointer" };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default Autocomplete;
