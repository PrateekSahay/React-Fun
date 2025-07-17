// ====================
// 🧠 FRONTEND DESIGN PATTERNS SUMMARY
// ====================

// 1️⃣ Container-Presenter (Smart-Dumb) Pattern
// ✅ Separate logic from UI

function UserContainer() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetch("/api/users").then(res => res.json()).then(setUsers);
    }, []);
  
    return <UserList users={users} />;
  }
  
  function UserList({ users }) {
    return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
  }
  
  // 2️⃣ Higher-Order Component (HOC)
  // ✅ Wrap a component to add logic
  
  function withAuth(Component) {
    return function AuthWrapper(props) {
      const isLoggedIn = Boolean(localStorage.getItem("token"));
      if (!isLoggedIn) return <p>Please login</p>;
      return <Component {...props} />;
    };
  }
  
  // Usage:
  // export default withAuth(Dashboard);
  
  // 3️⃣ Render Props
  // ✅ Share logic via a render function
  
  function MouseTracker({ children }) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const move = (e) => setPos({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    }, []);
  
    return children(pos);
  }
  
  // Usage:
  // <MouseTracker>{(pos) => <p>{pos.x}, {pos.y}</p>}</MouseTracker>
  
  // 4️⃣ Custom Hook
  // ✅ Reuse logic via a function
  
  function useCounter(initial = 0) {
    const [count, setCount] = useState(initial);
    return {
      count,
      increment: () => setCount(c => c + 1),
      decrement: () => setCount(c => c - 1),
    };
  }
  
  // Usage:
  // const { count, increment } = useCounter();
  
  // 5️⃣ Strategy Pattern
  // ✅ Switch behavior dynamically
  
  const formatters = {
    currency: (v) => `₹${v}`,
    percent: (v) => `${v}%`,
  };
  
  function PriceDisplay({ value, formatType }) {
    const format = formatters[formatType] || ((v) => v);
    return <p>{format(value)}</p>;
  }
  
  // 6️⃣ Observer Pattern
  // ✅ Event subscription / pub-sub
  
  class EventEmitter {
    events = {};
    on(event, cb) {
      (this.events[event] ||= []).push(cb);
    }
    emit(event, data) {
      this.events[event]?.forEach(cb => cb(data));
    }
  }
  
  const bus = new EventEmitter();
  bus.on("login", (user) => console.log("User:", user));
  bus.emit("login", { name: "Alice" });
  
  // 7️⃣ Singleton Pattern
  // ✅ One shared instance
  
  class Logger {
    static instance;
    constructor() {
      if (Logger.instance) return Logger.instance;
      Logger.instance = this;
    }
    log(msg) {
      console.log(`[LOG]: ${msg}`);
    }
  }
  
  const logger1 = new Logger();
  const logger2 = new Logger();
  // logger1 === logger2 ✅
  
  // 8️⃣ Factory Pattern
  // ✅ Create component/object based on input
  
  function ButtonFactory({ type }) {
    switch (type) {
      case "primary": return <button className="btn-primary">Click</button>;
      case "danger": return <button className="btn-danger">Delete</button>;
      default: return <button>Default</button>;
    }
  }
  
  // Usage:
  // <ButtonFactory type="primary" />
  
  // 9️⃣ Command Pattern
  // ✅ Encapsulate action + undo
  
  class Command {
    constructor(execute, undo) {
      this.execute = execute;
      this.undo = undo;
    }
  }
  
  let count = 0;
  const increment = new Command(
    () => { count++; },
    () => { count--; }
  );
  
  // increment.execute();
  // increment.undo();
  