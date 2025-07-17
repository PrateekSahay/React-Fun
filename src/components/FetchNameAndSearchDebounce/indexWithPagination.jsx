import { useState, useEffect, useCallback } from "react";
import _debounce from "lodash/debounce";
import "./styles.css";

const USERS_PER_PAGE = 5;

const UserList = ({ userData }) => {
  if (!userData.length) return <p>No users found.</p>;

  return (
    <ul className="list-container" role="list">
      {userData.map((user) => (
        <li key={user.id} className="list-item">
          <span>{user.name}</span>
          <span>{user.email}</span>
        </li>
      ))}
    </ul>
  );
};

export default function App() {
  const [userData, setUserData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await resp.json();
      setUserData(data);
      setFilteredList(data);
      setCurrentPage(1);
    } catch (e) {
      console.error("API error", e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter + Sort
  const handleSearchAndSort = () => {
    let filtered = userData.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortOption) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "email-asc":
        filtered.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case "email-desc":
        filtered.sort((a, b) => b.email.localeCompare(a.email));
        break;
      default:
        break;
    }

    setFilteredList(filtered);
    setCurrentPage(1); // Reset to first page
  };

  const debouncedSearch = useCallback(
    _debounce(handleSearchAndSort, 300),
    [search, sortOption, userData]
  );

  useEffect(() => {
    debouncedSearch();
    return debouncedSearch.cancel;
  }, [search, sortOption, debouncedSearch]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    const end = start + USERS_PER_PAGE;
    setPaginatedUsers(filteredList.slice(start, end));
  }, [filteredList, currentPage]);

  const totalPages = Math.ceil(filteredList.length / USERS_PER_PAGE);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>API failed. Please try again later.</p>;

  return (
    <main>
      <h1>User Directory</h1>

      <section aria-label="Search and Sort Section">
        <div className="search-sort-controls">
          <div>
            <label htmlFor="search-input">Search Users:</label>
            <input
              id="search-input"
              type="text"
              placeholder="Enter user name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="sort-select">Sort By:</label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="email-asc">Email (A → Z)</option>
              <option value="email-desc">Email (Z → A)</option>
            </select>
          </div>
        </div>
      </section>

      <section aria-label="User List Section">
        <h2>Results:</h2>
        <UserList userData={paginatedUsers} />
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
