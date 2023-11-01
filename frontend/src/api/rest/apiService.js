export const getIngredients = async () => {
  try {
    const response = await fetch(CDN_INGREDIENTS);
    if (response.ok) {
      const data = await response.text();
      const ingredients = data.split("\n").map((line) => line.trim());
      console.log(ingredients);
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
