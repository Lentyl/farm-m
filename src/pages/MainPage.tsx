import React, { FC, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import carrots from "../assets/img/carrots.jpg";
import vegetables from "../assets/img/vegetables.jpg";
import SearchProducts from "../components/SearchProduct";
import { updateUrl } from "../store/actions/loggedActions";
import { useDispatch } from "react-redux";
import potatoes_1980 from "../assets/img/potatoes-1980x1584.jpg";
import potatoes_1280 from "../assets/img/potatoes-1280x1024.jpg";
import potatoes_800 from "../assets/img/potatoes-800x640.jpg";
import potatoes_460 from "../assets/img/potatoes-460x536.jpg";

const MainPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUrl(window.location.pathname));
  }, []);

  return (
    <main className="main-page">
      <div className="main-page__search-container">
        <SearchProducts />
      </div>
      <div className="main-page__transition"></div>
      <div className="main-page__carusel-container">
        <Carousel className="main-page__carusel">
          <Carousel.Item className="main-page__carusel-item">
            <picture>
              <source media="(min-width:1280px)" srcSet={potatoes_1980} />
              <source media="(min-width:800px)" srcSet={potatoes_1280} />
              <source media="(min-width:460px)" srcSet={potatoes_800} />
              <source media="(min-width:0)" srcSet={potatoes_460} />
              <img
                className="main-page__carusel-img d-block w-100 "
                src={potatoes_1980}
                alt="Half face of a man with dark background"
              />
            </picture>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="main-page__carusel-item">
            <img
              className="main-page__carusel-img d-block w-100 "
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
              className="main-page__carusel-img d-block w-100 "
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
    </main>
  );
};

export default MainPage;
