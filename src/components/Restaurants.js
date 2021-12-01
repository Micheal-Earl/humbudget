import React, { Component } from "react";
import RESTAURANTS from "../data/restaurants";

class Restaurant extends Component {
  render() {
    const { name, description, rating, price, link } = this.props.restaurant;

    return (
      <div>
        <div className="rec rounded shadow-lg bg-white p-8 mt-5 mr-5 ml-5">
          <h3 className="h3">{name}</h3>
          <p className="relative">
            {description}
            <div>
              <div>
                <ul class="flex justify-right mt-5 mb-3 ">
                  <li>
                    <i class="fa-star fa-sm text-yellow-500 mr-1"></i>
                  </li>
                  <li>
                    <i class="fas fa-star fa-sm text-yellow-500 mr-1"></i>
                  </li>
                  <li>
                    <i class="fas fa-star fa-sm text-yellow-500 mr-1"></i>
                  </li>
                  <li>
                    <i class="fas fa-star fa-sm text-yellow-500 mr-1"></i>
                  </li>
                  <li>
                    <i class="fas fa-star fa-sm text-yellow-500 mr-1"></i>
                  </li>
                </ul>
              </div>
              <a href={link}>
                <button className="buttonLargeGreen">Website</button>
              </a>
            </div>
          </p>
        </div>
      </div>
    );
  }
}

class Restaurants extends Component {
  render() {
    return (
      <div>
        <div className="grid grid-cols-2 grid-rows-2 flex ">
          {RESTAURANTS.map((RESTAURANT) => {
            return (
              <div>
                <Restaurant key={RESTAURANT.id} restaurant={RESTAURANT} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Restaurants;
