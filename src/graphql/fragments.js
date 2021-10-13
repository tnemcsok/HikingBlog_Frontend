import { gql } from "@apollo/client";

export const USER_INFO = gql`
  fragment UserInfo on User {
    _id
    name
    username
    email
    age
    gender
    images {
      url
      public_id
    }
    about
    createdAt
    updatedAt
  }
`;

export const HIKE_DATA = gql`
  fragment hikeData on Hike {
    _id
    title
    summary
    coverImage {
      url
      public_id
    }
    content
    country
    region
    images {
      url
      public_id
    }
    difficulty
    distance
    elevation
    duration
    postedBy {
      _id
      username
    }
  }
`;
