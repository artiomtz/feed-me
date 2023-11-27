import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: SERVER_URL,
  cache: new InMemoryCache(),
});

const GET_POSSIBLE_RECIPES = gql`
  query PossibleRecipes($ingredients: [String]!, $similarityThreshold: Float) {
    possibleRecipes(
      ingredients: $ingredients
      similarityThreshold: $similarityThreshold
    ) {
      title
      ingredients
      instructions
      imageName
    }
  }
`;

export async function fetchPossibleRecipes(ingredients, similarityThreshold) {
  try {
    const { data } = await client.query({
      query: GET_POSSIBLE_RECIPES,
      variables: { ingredients, similarityThreshold },
    });
    return data.possibleRecipes;
  } catch (error) {
    console.error("Error fetching possible recipes.");
    return [];
  }
}
