import React, { useState } from 'react';

const BillSplitter = () => {
  const [billItems, setBillItems] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState('');
  const [people] = useState(['Vivek', 'Vineeth', 'Vishal', 'Manideep', 'Prajwal']);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleToggle = (person) => {
    if (selectedPeople.includes(person)) {
      setSelectedPeople(selectedPeople.filter((p) => p !== person));
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  const handleAddOrUpdateItem = () => {
    if (amount <= 0 || selectedPeople.length === 0 || !payer) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const newItem = {
      description,
      amount,
      payer,
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
    setPayer('');
    setSelectedPeople([]);
  };

  const handleEdit = (index) => {
    const item = billItems[index];
    setDescription(item.description);
    setAmount(item.amount);
    setPayer(item.payer);
    setSelectedPeople(item.participants);
    setEditingIndex(index);
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
        if (participant !== item.payer) {
          totals[participant] += share;
        }
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
          <label>Paid By: </label>
          <select
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
            style={{ padding: '5px', margin: '5px 0' }}
          >
            <option value="">Select Payer</option>
            {people.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4>Select Participants:</h4>
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
                <strong>{item.description}</strong>: ${item.amount} (Paid by {item.payer})
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
