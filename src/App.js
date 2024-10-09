import { useState } from "react";

const units = [
  { id: 0, unit: "szt." },
  { id: 2, unit: "opak." },
  { id: 3, unit: "l" },
  { id: 4, unit: "g" },
  { id: 5, unit: "kg" },
];

export default function App() {
  const [shoppingItems, setShoppinhItems] = useState([]);

  function handleAddItems(shoppingItem) {
    setShoppinhItems((shoppingItems) => [...shoppingItems, shoppingItem]);
  }

  function handleDelateItem(id) {
    setShoppinhItems((shoppingItems) =>
      shoppingItems.filter((item) => item.id !== id)
    );
  }

  function handleToggleItem(id) {
    setShoppinhItems((shoppingItems) =>
      shoppingItems.map((shoppingItem) =>
        shoppingItem.id === id
          ? { ...shoppingItem, basket: !shoppingItem.basket }
          : shoppingItem
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <AddItemForm onAddShoppingItem={handleAddItems} />
      <ShoppingList
        shoppingItems={shoppingItems}
        onDelateShoppingItem={handleDelateItem}
        onToggleShoppingItem={handleToggleItem}
      />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <img className="logo__img" src="/koszyk.png" alt="logo1" />
      <h1 className="logo__heading-primary">Lista zakupów</h1>
      <img className="logo__img" src="/lista.png" alt="logo2" />
    </div>
  );
}

function AddItemForm({ onAddShoppingItem }) {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("szt.");

  function handleSubmit(e) {
    e.preventDefault();
    if (!product || !quantity) return;

    const id = crypto.randomUUID();
    const newShoppingItem = { id, product, quantity, unit, basket: false };
    setProduct("");
    setQuantity("");
    setUnit("szt.");
    onAddShoppingItem(newShoppingItem);
  }

  return (
    <form className="add_item" onSubmit={handleSubmit}>
      <input
        className="add_item__product"
        type="text"
        placeholder="Produkt"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <input
        className="add_item__quantity"
        type="text"
        placeholder="Ilość"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        {units.map((el) => (
          <option key={el.id}>{el.unit}</option>
        ))}
      </select>
      <button>Dodaj</button>
    </form>
  );
}

function ShoppingList({
  shoppingItems,
  onDelateShoppingItem,
  onToggleShoppingItem,
}) {
  return (
    <div className="shopping-list">
      <ul>
        {shoppingItems.map((shoppingItem) => (
          <ShoppingItem
            shoppingItem={shoppingItem}
            key={shoppingItem.id}
            onDelateShoppingItem={onDelateShoppingItem}
            onToggleShoppingItem={onToggleShoppingItem}
          />
        ))}
      </ul>
    </div>
  );
}

function ShoppingItem({
  shoppingItem,
  onDelateShoppingItem,
  onToggleShoppingItem,
}) {
  return (
    <li className="shopping-item">
      <button onClick={() => onToggleShoppingItem(shoppingItem.id)}>
        <span className="shopping-item__mark">
          {shoppingItem.basket ? "✔️" : "🛒"}
        </span>
      </button>
      <span
        style={shoppingItem.basket ? { textDecoration: "line-through" } : {}}
      >{`${shoppingItem.product}: ${shoppingItem.quantity} ${shoppingItem.unit}`}</span>
      <button onClick={() => onDelateShoppingItem(shoppingItem.id)}>
        <span className="shopping-item__close">❌</span>
      </button>
    </li>
  );
}
