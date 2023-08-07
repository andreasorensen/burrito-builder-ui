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

/// Extension to allow ingredients to only be added twice. I know that alert boxes aren't super user friendly, I just wanted to finish on-time- irl, I'd display the message to the user by rendering a <p> tag conditionally.

  function addIngredient(ingredient) {
    const ingredientCount = ingredients.filter(item => item === ingredient).length;

    if (ingredientCount < 2) {    
      setIngredients(prevIngredients => [...prevIngredients, ingredient]);
    } else {
      alert('You may only add the same ingredient twice.')
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
