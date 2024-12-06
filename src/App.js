import React, { useState } from 'react';

const BillSplitter = () => {
  const [billItems, setBillItems] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [people] = useState(['Vivek', 'Vineeth', 'Vishal', 'Manideep', 'Prajwal']);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [selectAll, setSelectAll] = useState(false);

  // Handle toggling participant selection
  const handleToggle = (person) => {
    if (selectedPeople.includes(person)) {
      setSelectedPeople(selectedPeople.filter((p) => p !== person));
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  // Handle "Select All" toggle
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople([...people]);
    }
    setSelectAll(!selectAll);
  };

  const handleAddOrUpdateItem = () => {
    if (amount <= 0 || selectedPeople.length === 0) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const newItem = {
      description,
      amount,
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
    setAmount(0);
    setSelectedPeople([]);
    setSelectAll(false);
  };

  const handleEdit = (index) => {
    const item = billItems[index];
    setDescription(item.description);
    setAmount(item.amount);
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

  return (
    <div className="bill-splitter">
      <h2>Bill Splitter</h2>

      {/* Add or Edit Item */}
      <div>
        <h3>{editingIndex === -1 ? 'Add Bill Item' : 'Edit Bill Item'}</h3>
        <div>
          <label>Description: </label>
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Amount: </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>
            Select Participants: 
            <button onClick={handleSelectAll} style={{ marginLeft: '10px' }}>
              {selectAll ? 'Unselect All' : 'Select All'}
            </button>
          </h4>
          {people.map((person) => (
            <div key={person}>
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
        <button onClick={handleAddOrUpdateItem}>
          {editingIndex === -1 ? 'Add Item' : 'Update Item'}
        </button>
      </div>

      {/* Display Items with Edit/Delete Options */}
      <div>
        <h3>Bill Items</h3>
        {billItems.length > 0 ? (
          <ul>
            {billItems.map((item, index) => (
              <li key={index}>
                <strong>{item.description}</strong>: ${item.amount}
                <br />
                Participants: {item.participants.join(', ')}
                <br />
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items added yet.</p>
        )}
      </div>

      {/* Calculate Totals */}
      <div>
        <h3>Totals</h3>
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
