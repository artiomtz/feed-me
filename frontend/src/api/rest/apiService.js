export const getIngredients = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.text();
      const ingredients = data.split("\n").map((line) => line.trim());
      return ingredients;
    } else {
      console.error("Error while fetching ingredients.");
      return [];
    }
  } catch (error) {
    console.error("Error while connecting to CDN.");
    return [];
  }
};

export const pingServer = async () => {
  try {
    const response = await fetch(SERVER_TEST_URL, {
      method: "POST",
      body: JSON.stringify("Test"),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();

    if (data && data.POST === "ok") {
      return true;
    } else {
      console.error("A server error has occurred.");
      return false;
    }
  } catch (error) {
    console.error("Error while trying to connect to the server.");
    return false;
  }
};
