import React, { FC, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import SearchProducts from "../components/SearchProduct";
import { updateUrl } from "../store/actions/loggedActions";
import { useDispatch } from "react-redux";
import potatoes_1980 from "../assets/img/potatoes-1980x1584.jpg";
import potatoes_1280 from "../assets/img/potatoes-1280x1024.jpg";
import potatoes_800 from "../assets/img/potatoes-800x640.jpg";
import potatoes_460 from "../assets/img/potatoes-460x600.jpg";
import carrots_460 from "../assets/img/carrots-460x600.jpg";
import carrots from "../assets/img/carrots.jpg";
import vegetables_460 from "../assets/img/vegetables-460x600.jpg";
import vegetables from "../assets/img/vegetables.jpg";

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
              <source media="(min-width:480px)" srcSet={potatoes_800} />
              <source media="(min-width:0)" srcSet={potatoes_460} />
              <img
                className="main-page__carusel-img d-block w-100 "
                src={potatoes_1980}
                alt="Mnóstwo kartofli z wbitą w nie szpachla do nabierania."
              />
            </picture>
            <Carousel.Caption className="main-page__carusel-header-container">
              <h3 className="main-page__carusel-header">20% taniej</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="main-page__carusel-item">
            <picture>
              <source media="(min-width:1280px)" srcSet={carrots} />
              <source media="(min-width:800px)" srcSet={carrots} />
              <source media="(min-width:480px)" srcSet={carrots} />
              <source media="(min-width:0)" srcSet={carrots_460} />
              <img
                className="main-page__carusel-img d-block w-100 "
                src={carrots}
                alt="pęczek marchewki leżący na podłodze i inne warzywa w miskach papryczki ogórki"
              />
            </picture>
            <Carousel.Caption className="main-page__carusel-header-container">
              <h3 className="main-page__carusel-header">ścinamy ceny 30%</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="main-page__carusel-item">
            <picture>
              <source media="(min-width:1280px)" srcSet={vegetables} />
              <source media="(min-width:800px)" srcSet={vegetables} />
              <source media="(min-width:480px)" srcSet={vegetables} />
              <source media="(min-width:0)" srcSet={vegetables_460} />
              <img
                className="main-page__carusel-img d-block w-100 "
                src={vegetables}
                alt="potatoes with shovel between them."
              />
            </picture>
            <Carousel.Caption className="main-page__carusel-header-container">
              <h3 className="main-page__carusel-header">
                brukselka 40% taniej
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </main>
  );
};

export default MainPage;
