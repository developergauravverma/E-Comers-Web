import React from "react";
import Layout from "../Components/Layout/Layout";
import { useCard } from "../Context/CardContext";
import { useAuth } from "../Context/AuthContext";

const CartPage = () => {
  const [card, setCard] = useCard();
  const [auth] = useAuth();

  const deleteCartItem = (e) => {
    const productId = e.target.getAttribute("data-productid");
    let cartItem = [...card];
    const itemIndex = cartItem.findIndex((x) => x.Id === parseInt(productId));
    cartItem.splice(itemIndex, 1);
    setCard(cartItem);
    localStorage.setItem("cart", JSON.stringify(cartItem));
  };

  const totalPrice = () => {
    try {
      let total = 0;
      card?.map((value, index) => {
        return (total += value.Price);
      });
      return total.toLocaleString("en-In", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(`error in total price : ${error}`);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {card?.length > 0
                ? `You Have ${card.length} item in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {card?.map((value, index) => (
              <div className="row" key={index}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8080/${value.PhotoPath.replace(
                      "\\",
                      "/"
                    )}`}
                    className="img img-thumbnail"
                    alt="default"
                    style={{
                      height: "15rem",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-3">
                      <h6>Name:</h6>
                    </div>
                    <div className="col-md-9">
                      <h6>{value.ProductName}</h6>
                    </div>
                    <div className="col-md-3">
                      <h6>Description:</h6>
                    </div>
                    <div className="col-md-9">
                      <h6>{value.Description}</h6>
                    </div>
                    <div className="col-md-3">
                      <h6>Price:</h6>
                    </div>
                    <div className="col-md-9">
                      <h6>{value.Price}</h6>
                    </div>
                    <div className="col-md-12 text-center">
                      <button
                        className="btn btn-danger"
                        onClick={deleteCartItem}
                        data-productid={value.Id}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
