import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  function handleLogin() {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/cart");
  }

  return (
    <div className="w-96 p-10 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login Page</h1>

      <button
        onClick={handleLogin}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Log In
      </button>
    </div>
  );
}
