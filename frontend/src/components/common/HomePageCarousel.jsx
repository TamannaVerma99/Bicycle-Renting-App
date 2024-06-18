import Carousel from "react-bootstrap/Carousel";
import React from "react";
import img1 from "../../images/bicycle1.jpg";
import img2 from "../../images/bicycle2.jpg";
import img3 from "../../images/bicycle3.webp";
import img4 from "../../images/bicycle4.jpg";
import img5 from "../../images/bicycle5.webp";
import img6 from "../../images/bicycle6.jpeg";
import img7 from "../../images/bicycle7.jpeg";

import Cookies from "js-cookie";
import { Container } from "react-bootstrap";

const HomePageCarousel = () => {
  return (
    <Container>
      <Carousel fade style={{ width: "100%" }}>
        <Carousel.Item>
          <img
            className="d-block w-100 br-5 blur-image"
            src={img2}
            style={{ width: "100%", height: "450px" }}
            alt="First slide"
          />
          {/* <div className="carousel-gradient-overlay"></div> Add gradient overlay */}
          <Carousel.Caption>
            <h3 className="caption-title">
              {" "}
              <strong>Welcome to Bicycle Rental App</strong>
            </h3>
            <p className="caption-text">
              <strong>Join us to rent and add bicycles easily</strong>
            </p>
            <a href="/register" className="btn btn-success btn-get-started">
              <strong>Get Started</strong>
            </a>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 br-5 blur-image"
            src={img1}
            style={{ width: "100%", height: "450px" }}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 className="caption-title">
              <strong>Rent a Bicycle</strong>
            </h3>
            <p className="caption-text">
              <strong>Rent your favorite bicycle and hit the road!</strong>
            </p>
            {Cookies.get("user") ? (
              <a className="btn btn-success btn-get-started" href="/">
                <strong>Explore Now</strong>
              </a>
            ) : (
              <a className="btn btn-success btn-get-started disabled" href="/">
                <strong>Explore Now</strong>
              </a>
            )}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 br-5 blur-image"
            src={img7}
            style={{ width: "100%", height: "450px" }}
            alt="Third slide"
          />

          <Carousel.Caption>
            <div>
              <h3 className="caption-title">
                <strong>Add Bicycles to Share</strong>
              </h3>
              <p className="caption-text">
                <strong>
                  Contribute to our community by adding bicycles that others can
                  rent!
                </strong>
              </p>
              {Cookies.get("user") ? (
                <a
                  className="btn btn-success btn-get-started"
                  href="/add-bicycle"
                >
                  <strong>Add a Bicycle</strong>
                </a>
              ) : (
                <a
                  className="btn btn-success btn-get-started disabled"
                  href="/add-bicycle"
                >
                  <strong>Add a Bicycle</strong>
                </a>
              )}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default HomePageCarousel;
