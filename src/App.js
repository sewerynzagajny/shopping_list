import { useState } from "react";
import { useEffect } from "react";

const units = [
  { id: 0, unit: "szt." },
  { id: 2, unit: "opak." },
  { id: 3, unit: "l" },
  { id: 4, unit: "g" },
  { id: 5, unit: "kg" },
];

const filtring = [
  { id: 0, value: "main", description: "Pokaż całą listę" },
  { id: 1, value: "add", description: "Poza koszykiem" },
  { id: 2, value: "bascet", description: "W koszyku" },
];

function Button({ onClick, children, style }) {
  return (
    <button style={style} onClick={onClick} className="button">
      {children}
    </button>
  );
}

export default function App() {
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("shoppingItems"));
    if (savedItems) setShoppingItems(savedItems);
  }, []);

  useEffect(() => {
    if (shoppingItems.length > 0) {
      localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
    } else {
      localStorage.removeItem("shoppingItems");
    }
  }, [shoppingItems]);

  function handleAddItems(shoppingItem) {
    setShoppingItems((shoppingItems) => [...shoppingItems, shoppingItem]);
  }

  function handleDelateItem(id) {
    setShoppingItems((shoppingItems) =>
      shoppingItems.filter((item) => item.id !== id)
    );
  }

  function handleToggleItem(id) {
    setShoppingItems((shoppingItems) =>
      shoppingItems.map((shoppingItem) =>
        shoppingItem.id === id
          ? { ...shoppingItem, basket: !shoppingItem.basket }
          : shoppingItem
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Nowa lista spowoduje usunięcie aktualnej!"
    );
    if (confirmed) setShoppingItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <AddItemForm onAddShoppingItem={handleAddItems} />
      <ShoppingList
        shoppingItems={shoppingItems}
        onDelateShoppingItem={handleDelateItem}
        onToggleShoppingItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats shoppingItems={shoppingItems} />
      <Footer />
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
    if (!product) return;

    const id = crypto.randomUUID();
    const newShoppingItem = quantity
      ? { id, product, quantity, unit, basket: false }
      : { id, product, basket: false };
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
      <Button style={{ width: "18%" }}>Dodaj</Button>
    </form>
  );
}

function ShoppingList({
  shoppingItems,
  onDelateShoppingItem,
  onToggleShoppingItem,
  onClearList,
}) {
  const [filterBy, setFilterBy] = useState("main");
  let filtredShoppingItems;
  if (filterBy === "main") filtredShoppingItems = shoppingItems;
  if (filterBy === "add")
    filtredShoppingItems = shoppingItems.filter(
      (shoppingItem) => !shoppingItem.basket
    );
  if (filterBy === "bascet")
    filtredShoppingItems = shoppingItems.filter(
      (shoppingItem) => shoppingItem.basket
    );
  return (
    <div className="shopping-items">
      {" "}
      <div className="shopping-items__shopping-list">
        <ul>
          {filtredShoppingItems.map((shoppingItem) => (
            <ShoppingItem
              shoppingItem={shoppingItem}
              key={shoppingItem.id}
              onDelateShoppingItem={onDelateShoppingItem}
              onToggleShoppingItem={onToggleShoppingItem}
            />
          ))}
        </ul>
      </div>
      <div className="shopping-items__action">
        <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          {filtring.map((el) => (
            <option key={el.id} value={el.value}>
              {el.description}
            </option>
          ))}
        </select>
        <Button onClick={onClearList}>Nowa lista</Button>
      </div>
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
      >
        {shoppingItem.quantity
          ? `${shoppingItem.product}: ${shoppingItem.quantity} ${shoppingItem.unit}`
          : `${shoppingItem.product}`}
      </span>
      <button onClick={() => onDelateShoppingItem(shoppingItem.id)}>
        <span className="shopping-item__close">❌</span>
      </button>
    </li>
  );
}

function Stats({ shoppingItems }) {
  if (!shoppingItems.length)
    return (
      <div className="stats">
        <span>Dodaj produkty do listy zakupów 📋</span>
      </div>
    );
  const numShoppingItems = shoppingItems.length;
  const numInBasket = shoppingItems.filter(
    (shoppingItem) => shoppingItem.basket
  ).length;
  const percentage =
    numShoppingItems > 0
      ? Math.round((numInBasket / numShoppingItems) * 100)
      : 0;
  let productStr,
    markStr = "";
  if (numShoppingItems === 1) productStr = "produkt";
  if (numShoppingItems > 1 && numShoppingItems < 5) productStr = "produkty";
  if (numShoppingItems >= 5) productStr = "produktów";

  if (numInBasket === 0 || numInBasket > 4) markStr = "odznaczonych";
  if (numInBasket === 1) markStr = "odznaczony";
  if (numInBasket > 1 && numInBasket < 5) markStr = "odznaczone";

  return (
    <div className="stats">
      <span>
        {percentage === 100
          ? "Masz wszystko z listy 💪"
          : `Masz ${numShoppingItems} ${productStr}, z czego ${numInBasket} ${markStr} (${percentage}%) 🛍️`}
      </span>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p className="copyright">
        Copyright &copy; <span>{new Date().getFullYear()}</span> by Seweryn
        Zagajny. All rights reserved.
      </p>
    </footer>
  );
}
