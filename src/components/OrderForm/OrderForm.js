import { useState } from "react";

function OrderForm({ onNewOrder }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || ingredients.length === 0) return;

    const newOrder = {
      name,
      ingredients
    };

    fetch("http://localhost:3001/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOrder)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      onNewOrder(data);
      clearInputs();
    })
    .catch(error => {
      console.error("Error posting new order:", error);
    });
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  }

  function addIngredient(ingredient) {
    if (!ingredients.includes(ingredient)) {
      setIngredients(prevIngredients => [...prevIngredients, ingredient]);
    }
  }

  const possibleIngredients = [
    "beans", "steak", "carnitas", "sofritas", "lettuce", "queso fresco", 
    "pico de gallo", "hot sauce", "guacamole", "jalapenos", "cilantro", "sour cream"
  ];
  
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        type="button"
        key={ingredient}
        name={ingredient}
        onClick={() => addIngredient(ingredient)}
      >
        {ingredient}
      </button>
    );
  });

  const isSubmitDisabled = !name || ingredients.length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button type="submit" disabled={isSubmitDisabled}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
