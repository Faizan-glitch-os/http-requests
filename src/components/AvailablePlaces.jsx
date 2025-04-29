import { useEffect, useState } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);

    async function fetchPlaces() {
      const response = await fetch("http://localhost:3000/places");
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);

      setAvailablePlaces(responseData.places);

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

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
