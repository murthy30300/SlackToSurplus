import React, { useState } from "react";
import axios from "axios";

const RecipieGenerator = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [recipe, setRecipe] = useState("");
  const [error, setError] = useState("");

  const handleAddItem = () => {
    if (currentItem.trim()) {
      setItems([...items, currentItem.trim()]);
      setCurrentItem("");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleGenerateRecipe = async () => {
    if (items.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }
    setError("");
    setRecipe("");

    try {
      const response = await axios.post("http://localhost:1987/openai/recipes/generate", items, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRecipe(response.data);
    } catch (err) {
      setError(err.response?.data || "Failed to generate recipe.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Recipe Generator</h1>
      <div>
        <input
          type="text"
          value={currentItem}
          onChange={(e) => setCurrentItem(e.target.value)}
          placeholder="Enter an ingredient"
          style={{ marginRight: "10px", padding: "5px", width: "70%" }}
        />
        <button onClick={handleAddItem} style={{ padding: "5px 10px" }}>
          Add
        </button>
      </div>
      <ul style={{ marginTop: "10px" }}>
        {items.map((item, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center" }}>
            {item}
            <button
              onClick={() => handleRemoveItem(index)}
              style={{
                marginLeft: "10px",
                padding: "2px 5px",
                color: "red",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleGenerateRecipe}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Generate Recipe
      </button>
      {error && (
        <div style={{ marginTop: "10px", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      {recipe && (
        <div style={{ marginTop: "20px", backgroundColor: "#f9f9f9", padding: "10px", borderRadius: "5px" }}>
          <h2>Generated Recipe</h2>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
};

export default RecipieGenerator;
