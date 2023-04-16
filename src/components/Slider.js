import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { ImLocation2 } from "react-icons/im";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import '../styles/slider.css'

// config;

function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const userPic =
  //   "https://openclipart.org/download/247319/abstract-user-flat-3.svg";

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div style={{ width: "100%" }}>
        {listings === null ? (
          <Spinner />
        ) : (
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwipe"
          >
            {listings.map(({ data, id }) => (
              <SwiperSlide
                key={id}
                onClick={() => {
                  navigate(`/category/${data.type}/${id}`);
                }}
              >
                <img
                  src={data.imgUrls[0]}
                  alt={data.name}
                  className="slider-img"
                />
                <h4 className=" text-light p-4 m-0 ">
                  {/* <img alt="user pic" src={userPic} height={35} width={35} /> */}
                  <ImLocation2 size={20} className="ms-2" /> Recently Added :{" "}
                  <br />
                  <span className="ms-4 mt-2"> {data.name}</span>
                  <span className="ms-2">
                    | Price ( $ {data.regularPrice} )
                  </span>
                </h4>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}

export default Slider;
