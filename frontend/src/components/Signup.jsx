import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const  Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError("Passwords don't match");
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password1, password2 }),
      });
      const data = await response.json();
      if (!response.ok) {
        const pElements = Object.entries(data).map(([key, value]) => (
          <p key={key}>
            {key}: {value[0]}
          </p>
        ));
        setError(data ? pElements : 'Unknown error');
      } else {
        setUsername('');
        setPassword1('');
        setPassword2('');
        setEmail('');
        navigate('/login');
      }
    } catch (error) {
      setError('Error registering user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        Password:
        <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} required />
      </div>
      <div>
        Repeat password:
        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
      </div>
      {error}
      <button type="submit">Register</button>
    </form>
  );
};

export default  Signup;

