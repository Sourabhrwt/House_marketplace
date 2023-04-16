import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

const Category = () => {
  const [listing, setListing] = useState("");
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  //fetch listings
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = collection(db, "listings");
        //query
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        //execute query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListing(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Unable to Fetch data");
      }
    };
    //func call
    fetchListing();
  }, [params.categoryName]);

  //loadmore pagination
  const fetchLoadMoreListing = async () => {
    try {
      const listingRef = collection(db, "listings");
      //query
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(10)
      );
      //execute query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Unable to Fetch data");
    }
  };

  return (
    <Layout>
      <div className="mt-3 container-fluid ">
        <h1>
          {params.categoryName === "rent"
            ? "Places for Rent"
            : "Places for Sale"}
        </h1>
        {loading ? (
          <Spinner />
        ) : listing && listing.length > 0 ? (
          <>
            <div>
              {listing.map((list) => (
                <ListingItem listing={list.data} id={list.id} key={list.id} />
              ))}
            </div>
          </>
        ) : (
          <p>No Listing for {params.categoryName}</p>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
        {lastFetchListing && (
          <button className="btn btn-primary" onClick={fetchLoadMoreListing}>
            Load more
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Category;
