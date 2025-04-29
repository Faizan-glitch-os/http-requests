import { useEffect, useState } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    setIsFetching(true);

    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:3000/placess");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error("an error occured, try again later");
        }

        setAvailablePlaces(responseData.places);
      } catch (error) {
        setIsError({ message: "Please try again later" });
      }

      setIsFetching(false);
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
