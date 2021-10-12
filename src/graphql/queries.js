import { gql } from "@apollo/client";
import { USER_INFO } from "./fragments";
import { HIKE_DATA } from "./fragments";

export const PROFILE = gql`
  ${USER_INFO}
  query {
    profile {
      ...UserInfo
    }
  }
`;

export const ALL_USERS = gql`
  ${USER_INFO}
  query {
    allUsers {
      ...UserInfo
    }
  }
`;

export const PUBLIC_PROFILE = gql`
  query publicProfile($username: String!) {
    publicProfile(username: $username) {
      _id
      username
      name
      email
      images {
        url
        public_id
      }
      about
    }
  }
`;

export const HIKES_BY_USER = gql`
  query {
    hikesByUser {
      ...hikeData
    }
  }
  ${HIKE_DATA}
`;

export const HIKES_BY_OTHER_USER = gql`
  query hikesByOtherUser($username: String!) {
    hikesByOtherUser(username: $username) {
      ...hikeData
    }
  }
  ${HIKE_DATA}
`;

export const SINGLE_HIKE = gql`
  query singleHike($hikeId: String!) {
    singleHike(hikeId: $hikeId) {
      ...hikeData
    }
  }
  ${HIKE_DATA}
`;

export const GET_ALL_HIKES = gql`
  query allHikes($page: Int!) {
    allHikes(page: $page) {
      ...hikeData
    }
  }
  ${HIKE_DATA}
`;

export const TOTAL_HIKES = gql`
  query {
    totalHikes
  }
`;

export const SEARCH = gql`
  query search($query: String!) {
    search(query: $query) {
      ...hikeData
    }
  }
  ${HIKE_DATA}
`;
