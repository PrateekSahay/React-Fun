import { useState, useEffect, useCallback } from "react";
import "./styles.css";
import _debounce from "lodash/debounce";

const UserList = ({ userData }) => {
  if (!userData.length) return <p>No users found.</p>;

  return (
    <ul className="list-container">
      {userData.map((user) => (
        <li key={user.id} className="list-item">
          <span>{user.name}</span> <span>{user.email}</span>
        </li>
      ))}
    </ul>
  );
};

export default function App() {
  const [userData, setUserData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await resp.json();
      setUserData(data);
      setFilteredList(data);
    } catch (e) {
      console.error("API error", e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = userData.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const debouncedSearch = useCallback(_debounce(handleSearch, 300), [userData]);

  useEffect(() => {
    debouncedSearch();
    // cleanup debounce on unmount
    return debouncedSearch.cancel;
  }, [search, debouncedSearch]);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) return <span>Loading users...</span>;
  if (error) return <span>API failed. Please try again later.</span>;

  return (
    <main>
      <h1>User Directory</h1>

      <section aria-label="Search Section">
        <label htmlFor="search-input">Search Users:</label>
        <input
          id="search-input"
          type="text"
          placeholder="Enter user name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section aria-label="User List Section">
        <h2>Results:</h2>
        <UserList userData={filteredList} />
      </section>
    </main>
  );
}
