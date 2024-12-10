import React, { useState } from 'react';
import './BillSplitter.css';

const BillSplitter = () => {
  const [billItems, setBillItems] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [people] = useState(['Vivek', 'Vineeth', 'Vishal', 'Manideep', 'Prajwal']);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [selectAll, setSelectAll] = useState(false);

  const handleToggle = (person) => {
    if (selectedPeople.includes(person)) {
      setSelectedPeople(selectedPeople.filter((p) => p !== person));
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople([...people]);
    }
    setSelectAll(!selectAll);
  };

  const handleAddOrUpdateItem = () => {
    if (Number(amount) <= 0 || selectedPeople.length === 0) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const newItem = {
      description,
      amount: Number(amount),
      participants: [...selectedPeople],
    };

    if (editingIndex === -1) {
      setBillItems([...billItems, newItem]);
    } else {
      const updatedItems = [...billItems];
      updatedItems[editingIndex] = newItem;
      setBillItems(updatedItems);
      setEditingIndex(-1);
    }

    setDescription('');
    setAmount('');
    setSelectedPeople([]);
    setSelectAll(false);
  };

  const handleEdit = (index) => {
    const item = billItems[index];
    setDescription(item.description);
    setAmount(String(item.amount));
    setSelectedPeople(item.participants);
    setEditingIndex(index);
    setSelectAll(item.participants.length === people.length);
  };

  const handleDelete = (index) => {
    const updatedItems = billItems.filter((_, i) => i !== index);
    setBillItems(updatedItems);
  };

  const calculateTotals = () => {
    const totals = {};

    people.forEach((person) => {
      totals[person] = 0;
    });

    billItems.forEach((item) => {
      const share = item.amount / item.participants.length;
      item.participants.forEach((participant) => {
        totals[participant] += share;
      });
    });

    return totals;
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Allow only numeric values and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="bill-splitter">
      <h1 className="header">Bill Splitter</h1>

      {/* Add or Edit Item */}
      <div className="form-card">
        <h2>{editingIndex === -1 ? 'Add Bill Item' : 'Edit Bill Item'}</h2>
        <label>Description:</label>
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Amount:</label>
        <input
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <div className="participants">
          <h3>
            SELECT:
            <button onClick={handleSelectAll} className="btn-select-all">
              {selectAll ? 'Unselect All' : 'Select All'}
            </button>
          </h3>
          {people.map((person) => (
            <div key={person} className="participant">
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleToggle(person)}
                  checked={selectedPeople.includes(person)}
                />
                {person}
              </label>
            </div>
          ))}
        </div>
        <button onClick={handleAddOrUpdateItem} className="btn-primary">
          {editingIndex === -1 ? 'Add Item' : 'Update Item'}
        </button>
      </div>

      {/* Display Items */}
      <div className="items-list">
        <h2>Bill Items</h2>
        {billItems.length > 0 ? (
          <ul>
            {billItems.map((item, index) => (
              <li key={index} className="item-card">
                <strong>{item.description}</strong>: ${item.amount.toFixed(2)}
                <br />
                Participants: {item.participants.join(', ')}
                <div className="item-buttons">
                  <button onClick={() => handleEdit(index)} className="btn-secondary">Edit</button>
                  <button onClick={() => handleDelete(index)} className="btn-danger">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items added yet.</p>
        )}
      </div>

      {/* Totals */}
      <div className="totals">
        <h2>Totals</h2>
        <ul>
          {Object.entries(calculateTotals()).map(([person, total]) => (
            <li key={person}>
              {person} owes: ${total.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BillSplitter;
