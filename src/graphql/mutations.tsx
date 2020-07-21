import gql from "graphql-tag";

export const ADD = gql`
  mutation Add(
    $input: DessertInput!) {
    add(input: $input)
  }
`;
export const DELETE = gql`
  mutation Delete($input: [ID]!) {
    delete(input: $input)
  }
`;
