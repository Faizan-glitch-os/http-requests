import { useEffect, useState } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import fetchAvailablePlaces from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState();

  useEffect(() => {
    setIsFetching(true);

    async function fetchPlaces() {
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const sortedPlaces = sortPlacesByDistance(
              places,
              position.coords.latitude,
              position.coords.longitude
            );

            setAvailablePlaces(sortedPlaces);
            setIsFetching(false);
          },
          (error) => {
            setIsError({ message: "Location access is need to fetch places" });
          }
        );
      } catch (error) {
        setIsError({ message: "Please try again later" });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (isError) {
    return <Error title="Error Occured" message={isError.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Currently loading data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
