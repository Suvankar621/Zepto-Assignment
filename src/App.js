import React, { useState, useRef } from 'react';
import "./App.css"

const initialItems = [
  { name: 'Nick Giannopoulos', email: 'nick@gmail.com', image: 'logo192.png' },
  { name: 'John Doe', email: 'John Doe@gmail.com', image: 'logo192.png' },
  { name: 'Jane Smith', email: 'Jane Smith@gmail.com', image: 'logo192.png' },
  { name: 'Nifck Giannopoulos', email: 'nick@gmail.com', image: 'logo192.png' },
  { name: 'Jogan Doe', email: 'John Doe@gmail.com', image: 'logo192.png' },
  { name: 'Jakne Smith', email: 'Jane Smith@gmail.com', image: 'logo192.png' },
];

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItems, setShowItems] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setFilteredItems([]);
    } else {
      const filtered = initialItems.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const handleInputClick = () => {
    setShowItems(true);
  };

  const handleChipClick = (item) => {
    const newChips = [...chips, { id: Date.now(), label: `${item.name}`, image: item.image }];
    setChips(newChips);

    const newFilteredItems = filteredItems.filter((filteredItem) => filteredItem.name !== item.name);
    setFilteredItems(newFilteredItems);

    setInputValue('');
    setShowItems(false);
    inputRef.current.focus();
  };

  const handleChipRemove = (id, label) => {
    const newChips = chips.filter((chip) => chip.id !== id);
    setChips(newChips);

    const removedItem = initialItems.find((item) => item.name === label);
    if (removedItem) {
      const newFilteredItems = [...filteredItems, removedItem];
      setFilteredItems(newFilteredItems);
    }

    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip.id, lastChip.label);
    }
  };

  return (
    <>
      <div className='App'>
        <div className='items'>
          {chips.map((chip) => (
            <div key={chip.id} className="chip">
              <img className='image' src={chip.image} alt={chip.label} />
              {chip.label}
              <span className="remove" onClick={() => handleChipRemove(chip.id, chip.label)}>
                X
              </span>
            </div>
          ))}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          placeholder="Type to filter"
        />
      </div>

      {showItems && (
        <div className='listitems'>
          {filteredItems.map((item) => (
            <div key={item.name} onClick={() => handleChipClick(item)} className='listitemsComponent'>
              <img className='image' src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p id='em'>{item.email}</p>
             
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default App;
