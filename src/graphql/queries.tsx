import gql from "graphql-tag";

export const GET_NUTRITION_LIST = gql`
  query nutritionList {
    nutritionList {
      id
      dessert
      nutritionInfo {
        carb
        protein
        calories
        fat
      }
    }
  }
`;