// ===============================
// 🔁 Object-Oriented Programming (OOP) in React
// ===============================

// 🧱 1. Encapsulation
// ✅ Keep internal state and logic private inside components

function Counter() {
    const [count, setCount] = useState(0);
    const increment = () => setCount(c => c + 1);
    return <button onClick={increment}>{count}</button>;
  }
  
  // count and increment are encapsulated inside Counter
  
  // 🧱 2. Abstraction
  // ✅ Expose only necessary APIs from custom hooks
  
  function useCounter(initial = 0) {
    const [count, setCount] = useState(initial);
    return {
      value: count,
      increment: () => setCount(c => c + 1),
      reset: () => setCount(initial),
    };
  }
  
  // Usage
  function MyComponent() {
    const { value, increment, reset } = useCounter(5);
    return (
      <>
        <button onClick={increment}>{value}</button>
        <button onClick={reset}>Reset</button>
      </>
    );
  }
  
  // 🧱 3. Inheritance (via Composition in React)
  // ✅ Compose reusable components instead of class inheritance
//   🧱 Composition
// ✅ What is it?
// Composing UIs by nesting components and passing components as children or props (also called children-as-props or slot pattern).
  
  function Card({ children }) {
    return <div className="card">{children}</div>;
  }
  
  function ProductCard({ name, price }) {
    return (
      <Card>
        <h2>{name}</h2>
        <p>{price}</p>
      </Card>
    );
  }
  
  // 🧱 4. Polymorphism
  // ✅ Modify behavior dynamically via props (strategy pattern)
  
  function Button({ variant = 'primary', ...props }) {
    const className = variant === 'danger' ? 'btn-danger' : 'btn-primary';
    return <button className={className} {...props} />;
  }
  
  // <Button variant="primary" />
  // <Button variant="danger" />
  
  // 🧱 5. Class-based OOP (less common in React now)
  
  class CounterClass extends React.Component {
    state = { count: 0 };
  
    increment = () => this.setState(({ count }) => ({ count: count + 1 }));
  
    render() {
      return <button onClick={this.increment}>{this.state.count}</button>;
    }
  }
  
  // ✅ Class components support state, lifecycle, and methods
  // ❌ Less flexible than functional components + hooks
  
  // ===============================
  // 🧠 Summary
  // ===============================
  
  // ✔ Use Encapsulation (state/logic inside components)
  // ✔ Use Abstraction (custom hooks exposing clean APIs)
  // ✔ Use Composition instead of inheritance (Card, Layouts)
  // ✔ Use Polymorphism with props or strategy pattern
  // ✔ Class-based OOP is supported but less common now
  
  // ✅ React is function-first, but OOP principles still apply.
  