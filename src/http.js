export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error("an error occured, try again later");
  }

  return responseData.places;
}
export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to load user places");
  }

  return responseData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: { "Content-Type": "application/json" },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error("User data was not sent...");
  }

  return responseData.message;
}
