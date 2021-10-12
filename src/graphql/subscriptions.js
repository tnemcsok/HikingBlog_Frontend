import { gql } from "@apollo/client";
import { HIKE_DATA } from "./fragments";

export const HIKE_ADDED = gql`
  subscription {
    hikeAdded {
      ...hikeData
    }
  }
  ${HIKE_DATA}
`;

export const HIKE_UPDATED = gql`
  subscription {
    hikeUpdated {
      ...hikeData
    }
  }
  ${HIKE_DATA}
`;

export const HIKE_DELETED = gql`
  subscription {
    hikeDeleted {
      ...hikeData
    }
  }
  ${HIKE_DATA}
`;
