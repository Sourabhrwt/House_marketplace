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
import { IoReloadCircle } from "react-icons/io5";
import "../styles/offers.css";

const Offers = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const params = useParams();

  //fetch listings
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = collection(db, "listings");
        //query
        const q = query(
          listingRef,
          where("offer", "==", true),
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
  }, []);

  //loadmore pagination
  const fetchLoadMoreListing = async () => {
    try {
      const listingRef = collection(db, "listings");
      //query
      const q = query(
        listingRef,
        where("offer", "==", true),
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
    <Layout title="House Marketplace - offers">
      <div className="offers pt-3 container-fluid ">
        <h1>Best Offers</h1>
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
          <p>There are no current offers</p>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
        {lastFetchListing && (
          <button className="load-btn" onClick={fetchLoadMoreListing}>
            <IoReloadCircle /> Load more
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Offers;
