import React from "react";
import RESTAURANTS from "../data/restaurants";

function Restaurant({ restaurantData }) {
  const { name, description, rating, price, img, link } = restaurantData;

  return (
    <div class="rec max-w-sm lg:max-w-full lg:flex m-3 shadow-lg">
      <div
        class="h-48 lg:h-auto lg:w-48 rounded-r-none flex-none bg-cover rounded text-center"
        style={{ backgroundImage: "url(" + img + ")" }}
      ></div>
      <div class="bg-white rounded p-4 flex flex-col justify-between leading-normal w-full">
        <div class="mb-8">
          <div class="text-gray-900 font-bold text-xl mb-2">{name}</div>
          <p class="text-gray-700 text-base">{description}</p>
          <div className="flex">
            <ul class="flex justify-right mt-5 mb-3 ">
              <span className="mr-3">Rating: </span>
              {[...Array(rating)].map((x, i) => (
                <li>
                  <i class="fas fa-star fa-sm text-yellow-500 mr-1"></i>
                </li>
              ))}
            </ul>
            <ul class="flex justify-right mt-5 mb-3 ">
              <span className="ml-3 mr-3">Cost: </span>
              {[...Array(price)].map((x, i) => (
                <li>
                  <i class="fas fa-dollar-sign fa-sm text-yellow-500 mr-1"></i>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Restaurants() {
  return (
    <div className="grid grid-cols-2">
      {RESTAURANTS.map((RESTAURANT) => {
        return <Restaurant key={RESTAURANT.id} restaurantData={RESTAURANT} />;
      })}
    </div>
  );
}

export default Restaurants;
