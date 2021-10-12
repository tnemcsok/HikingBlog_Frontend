import { useQuery, useSubscription, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-toastify";
import HikeCard from "../components/HikeCard";
import HikePagination from "../components/HikePagination";
import { GET_ALL_HIKES } from "../graphql/queries";
import { TOTAL_HIKES } from "../graphql/queries";
import { HIKE_ADDED } from "../graphql/subscriptions";
import { HIKE_DELETED } from "../graphql/subscriptions";
import { HIKE_UPDATED } from "../graphql/subscriptions";

const Home = () => {
  // State
  const [page, setPage] = useState(1);

  // Queries
  const { data, loading } = useQuery(GET_ALL_HIKES, {
    variables: { page },
  });

  const { data: hikeCount } = useQuery(TOTAL_HIKES);

  const [fetchHikes, { data: hikes }] = useLazyQuery(GET_ALL_HIKES);

  // Subscription > hike added

  const { data: newHike } = useSubscription(HIKE_ADDED, {
    onSubscriptionData: async ({
      client: { cache },
      subscriptionData: { data },
    }) => {
      // Read query from cache
      const { allHikes } = cache.readQuery({
        query: GET_ALL_HIKES,
        variables: { page },
      });

      // Rrite back to cache
      cache.writeQuery({
        query: GET_ALL_HIKES,
        variables: { page },
        data: {
          allHikes: [data.hikeAdded, ...allHikes],
        },
      });

      // Refetch all hikes to update ui
      fetchHikes({
        variables: { page },
        refetchQueries: [{ query: GET_ALL_HIKES, variables: { page } }],
      });

      // Show toast notification
      toast.success("New hike!");
    },
  });

  // Subscription > hike updated

  const { data: updatedHike } = useSubscription(HIKE_UPDATED, {
    onSubscriptionData: () => {
      toast.success("Hike updated!");
    },
  });

  // Subscription > hike deleted

  const { data: deletedHike } = useSubscription(HIKE_DELETED, {
    onSubscriptionData: async ({
      client: { cache },
      subscriptionData: { data },
    }) => {
      // Read query from cache
      const { allHikes } = cache.readQuery({
        query: GET_ALL_HIKES,
        variables: { page },
      });

      let filteredHikes = allHikes.filter(
        (p) => p._id !== data.hikeDeleted._id
      );

      // Write back to cache
      cache.writeQuery({
        query: GET_ALL_HIKES,
        variables: { page },
        data: {
          allHikes: filteredHikes,
        },
      });

      // Refetch all hikes to update ui
      fetchHikes({
        variables: { page },
        refetchQueries: [{ query: GET_ALL_HIKES, variables: { page } }],
      });
      // show toast notification
      toast.success("Hike deleted!");
    },
  });

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row mb-3">
        {data &&
          data.allHikes.map((hike) => (
            <div className="col-md-4 pt-5" key={hike._id}>
              <HikeCard hike={hike} />
            </div>
          ))}
      </div>
      <HikePagination page={page} setPage={setPage} hikeCount={hikeCount} />
    </div>
  );
};

export default Home;
