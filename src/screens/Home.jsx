import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Foot from "../components/Foot";

import Card from "../components/Card";
import Carousal from "../components/Carousal";

const Home = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch(process.env.REACT_APP_FOOD_DATA_RESPONSE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
   
    setFoodItem(response[0]);
    setFoodCategory(response[1]);
  };

  useEffect(() => {
    return () => {
      loadData();
    };
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousal />
      </div>
      <div className="container">
        {foodCategory ? 
          foodCategory.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                
                  {foodItem ? (
                    foodItem
                      .filter((item) => item.CategoryName === data.CategoryName)
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card foodItem = {filterItems} options={filterItems.options[0]} />
                          </div>
                        );
                      })
                  ) : (
                    <div>"No data found"</div>
                  )
                  }
                
              </div>
            );
          })
         : (
          <div>No data Present</div>
        )}
      </div>
      <div>
        <Foot />
      </div>
    </div>
  );
};

export default Home;
