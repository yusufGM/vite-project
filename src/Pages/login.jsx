import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useUserStore from '../components/store/useUserStore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Login gagal");
        return;
      }

      const data = await res.json();

      setUser(data.token, data.user.username, data.user.id);

      console.log("Login berhasil:", {
        token: data.token,
        username: data.user.username,
        userId: data.user.id
      });

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert("Gagal login: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600"
            >
              {showPassword ? 'Sembunyikan' : 'Lihat'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-700">
          Belum punya akun?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Daftar sekarang
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
