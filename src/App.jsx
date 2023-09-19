import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading, error } = useAuth();

  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? <Dashboard /> : <Auth />} </>}
    </div>
  );
}

export default App;