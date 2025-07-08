import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function randomRoomId() {
  return Math.random().toString(36).substring(2, 8);
}

const HomePage = () => {
  const [joinId, setJoinId] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    const id = randomRoomId();
    navigate(`/room/${id}`);
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (joinId.trim()) {
      navigate(`/room/${joinId.trim()}`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', textAlign: 'center' }}>
      <h1>TimeTogether</h1>
      <button onClick={handleCreate} style={{ margin: '16px', padding: '12px 24px', fontSize: 18 }}>
        Create Room
      </button>
      <form onSubmit={handleJoin} style={{ marginTop: 32 }}>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={joinId}
          onChange={e => setJoinId(e.target.value)}
          style={{ padding: 10, fontSize: 16, width: '70%' }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: '10px 18px', fontSize: 16 }}>
          Join Room
        </button>
      </form>
    </div>
  );
};

export default HomePage;
