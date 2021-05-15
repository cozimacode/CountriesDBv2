import { gql } from "@apollo/client";

export const COUNTRIES = gql`
  {
    countries {
      name
      continent {
        name
      }
      capital
      currency
      languages {
        name
      }
    }
  }
`;
