const units = [
  { id: 0, unit: "szt." },
  { id: 2, unit: "opak." },
  { id: 3, unit: "l" },
  { id: 4, unit: "g" },
  { id: 5, unit: "kg" },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <AddItemForm />
      <ShoppingList />
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

function AddItemForm() {
  return (
    <form className="add_item">
      <input className="add_item__product" type="text" placeholder="Produkt" />
      <input className="add_item__quantity" type="text" placeholder="Ilość" />
      <select>
        {units.map((el) => (
          <option key={el.id}>{el.unit}</option>
        ))}
      </select>
      <button>Dodaj</button>
    </form>
  );
}

function ShoppingItem() {
  return (
    <li className="shopping-item">
      <button className="shopping-item__mark">✔️</button>
      <button>🛒</button>
      <span>Pomiodry: 2 szt.</span>
      <button>❌</button>
    </li>
  );
}

function ShoppingList() {
  return (
    <div className="shopping-list">
      <ul>
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
      </ul>
    </div>
  );
}
