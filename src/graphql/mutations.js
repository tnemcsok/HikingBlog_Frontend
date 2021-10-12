import { gql } from "@apollo/client";
import { USER_INFO } from "./fragments";
import { HIKE_DATA } from "./fragments";

export const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;

export const USER_UPDATE = gql`
  ${USER_INFO}
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      ...UserInfo
    }
  }
`;

export const HIKE_CREATE = gql`
  mutation hikeCreate($input: HikeCreateInput!) {
    hikeCreate(input: $input) {
      ...hikeData
    }
  }
  ${HIKE_DATA}
`;

export const HIKE_UPDATE = gql`
  mutation hikeUpdate($input: HikeUpdateInput!) {
    hikeUpdate(input: $input) {
      ...hikeData
    }
  }
  ${HIKE_DATA}
`;

export const HIKE_DELETE = gql`
  mutation hikeDelete($hikeId: String!) {
    hikeDelete(hikeId: $hikeId) {
      ...hikeData
    }
  }
  ${HIKE_DATA}
`;
