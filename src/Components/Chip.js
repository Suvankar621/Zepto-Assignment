import React, { useState, useRef, useEffect } from 'react';

const Chip = () => {
    const [inputValue, setInputValue] = useState('');
    const [chips, setChips] = useState([]);
    const [filteredItems, setFilteredItems] = useState([
      { name: 'Nick Giannopoulos', email: 'nick@gmail.com' },
      { name: 'John Doe', email: 'John Doe@gmail.com' },
      { name: 'Jane Smith', email: 'Jane Smith@gmail.com' },
    ]);
    const [showItems, setShowItems] = useState(false);
    const inputRef = useRef(null);
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
  
      if (value.trim() === '') {
        setFilteredItems([]);
      } else {
        const filtered = filteredItems.filter(
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
  
    const handleBlur = () => {
      setShowItems(true);
    };
  
    const handleChipClick = (item) => {
      const newChips = [...chips, { id: Date.now(), label: item.name }];
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
  
      const newFilteredItems = [...filteredItems, { name: label, email: `${label}@example.com` }];
      setFilteredItems(newFilteredItems);
  
      inputRef.current.focus();
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
        const lastChip = chips[chips.length - 1];
        handleChipRemove(lastChip.id, lastChip.label);
      }
    };
  
    useEffect(() => {
      document.addEventListener('click', handleBlur);
  
      return () => {
        document.removeEventListener('click', handleBlur);
      };
    }, []);
  
    return (
      <div>
        <div>
          {chips.map((chip) => (
            <div key={chip.id} className="chip">
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
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Type to filter"
        />
        {showItems && (
          <div>
            {filteredItems.map((item) => (
              <div key={item.name} onClick={() => handleChipClick(item)}>
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default Chip
