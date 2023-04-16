import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import "../styles/listing.css";
import {
  FaBed,
  FaBath,
  FaParking,
  FaHouseDamage,
  FaArrowCircleRight,
} from "react-icons/fa";
// import SwipeCore, { EffectCoverflow, Pagination } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";

// config
// SwipeCore.use([EffectCoverflow, Pagination]);

const Listing = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); //eslint-disable-line
  const params = useParams();
  const auth = getAuth(); //eslint-disable-line

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout title={listing.name}>
      <div className="row listing-container">
        <div className="col-md-8 listing-container-col1">
          {listing.imgUrls === undefined ? (
            <Spinner />
          ) : (
            <div className="mySwipe">
              {listing.imgUrls.map((url, index) => (
                <div key={index}>
                  <img src={listing.imgUrls[index]} alt={listing.name} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-4 listing-container-col2">
          <h3>{listing.name}</h3>
          <h6>
            Price :{" "}
            {listing.offer ? listing.discountPrice : listing.regularPrice} / RS
          </h6>
          <p>Property For : {listing.type === "rent" ? "Rent" : "Sale"}</p>
          <p>
            {listing.offer && (
              <span>
                {listing.regularPrice - listing.discountPrice} Discount
              </span>
            )}
          </p>
          <p>
            <FaBed size={20} /> &nbsp;
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </p>
          <p>
            <FaBath size={20} /> &nbsp;
            {listing.bathrooms > 1
              ? `${listing.bathrooms} bathrooms`
              : "1 Bathroom"}
          </p>
          <p>
            <FaParking size={20} /> &nbsp;
            {listing.parking ? `Parking spot` : "no spot for parking"}
          </p>
          <p>
            <FaHouseDamage size={20} /> &nbsp;
            {listing.furnished ? `furnished house` : "not furnished"}
          </p>
          <Link
            className="btn btn-success"
            to={`/contact/${listing.useRef}?listingName=${listing.name}`}
          >
            Contact Landlord <FaArrowCircleRight size={20} />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Listing;
