import * as React from "react";
import { Carousel } from "react-bootstrap";
import potatoes from "../assets/img/potatoes.jpg";
import carrots from "../assets/img/carrots.jpg";
import vegetables from "../assets/img/vegetables.jpg";

const mainPage: React.FC = () => {
  return (
    <div className="main-page">
      <div className="main-page__transition"></div>
      <div className="main-page__carusel-container">
        <Carousel className="main-page__carusel">
          <Carousel.Item className="main-page__carusel-item">
            <img
              className="d-block w-100 main-page__carusel-img"
              src={potatoes}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="main-page__carusel-item">
            <img
              className="d-block w-100 main-page__carusel-img"
              src={carrots}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="main-page__carusel-item">
            <img
              className="d-block w-100 main-page__carusel-img"
              src={vegetables}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default mainPage;
