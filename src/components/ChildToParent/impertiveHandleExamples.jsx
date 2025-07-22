// App.jsx (or App.tsx)

import React, {
    useRef,
    useImperativeHandle,
    forwardRef,
    useState,
    useEffect,
  } from 'react';
  import './App.css'; // Optional for animation styles
  
  // ======================================================
  // 1. Resetting a Form Field from the Parent
  // ======================================================
  
  const ResettableInput = forwardRef((_, ref) => {
    const [value, setValue] = useState('');
  
    useImperativeHandle(ref, () => ({
      reset: () => setValue(''),
    }));
  
    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Resettable input"
      />
    );
  });
  
  // ======================================================
  // 2. Manually Triggering a Child Animation
  // ======================================================
  
  const AnimatedBox = forwardRef((_, ref) => {
    const boxRef = useRef();
  
    useImperativeHandle(ref, () => ({
      triggerAnimation: () => {
        boxRef.current.classList.remove('shake');
        void boxRef.current.offsetWidth; // Force reflow
        boxRef.current.classList.add('shake');
      },
    }));
  
    return <div ref={boxRef} className="box">I Shake!</div>;
  });
  
  // Add this to your CSS:
  // .box { width: 100px; height: 100px; background: coral; margin: 10px; }
  // .shake { animation: shake 0.5s; }
  // @keyframes shake {
  //   0% { transform: translateX(0); }
  //   25% { transform: translateX(-5px); }
  //   50% { transform: translateX(5px); }
  //   75% { transform: translateX(-5px); }
  //   100% { transform: translateX(0); }
  // }
  
  // ======================================================
  // 3. Showing Child Validation Status
  // ======================================================
  
  const ValidatedField = forwardRef((_, ref) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
  
    useImperativeHandle(ref, () => ({
      isValid: () => {
        if (value.trim() === '') {
          setError('Required field');
          return false;
        }
        setError('');
        return true;
      },
    }));
  
    return (
      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Validated field"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  });
  
  // ======================================================
  // 4. Focusing a Custom Input Field
  // ======================================================
  
  const FocusableInput = forwardRef((_, ref) => {
    const inputRef = useRef();
  
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));
  
    return (
      <input ref={inputRef} placeholder="Focusable input" />
    );
  });
  
  // ======================================================
  // Parent App Component
  // ======================================================
  
  export default function App() {
    const resetRef = useRef();
    const animateRef = useRef();
    const validateRef = useRef();
    const focusRef = useRef();
  
    const handleTriggerAll = () => {
      resetRef.current?.reset();
      animateRef.current?.triggerAnimation();
  
      const isValid = validateRef.current?.isValid();
      console.log('Validation result:', isValid);
  
      focusRef.current?.focus();
    };
  
    return (
      <div style={{ padding: 20 }}>
        <h2>useImperativeHandle Examples</h2>
  
        <ResettableInput ref={resetRef} />
        <br />
  
        <AnimatedBox ref={animateRef} />
        <br />
  
        <ValidatedField ref={validateRef} />
        <br />
  
        <FocusableInput ref={focusRef} />
        <br />
  
        <button onClick={handleTriggerAll}>Trigger All</button>
      </div>
    );
  }

/**
 * ✅ Summary: Why We Use `useImperativeHandle`
 * 
 * `useImperativeHandle` lets a child component expose specific methods
 * to the parent via a `ref`, while keeping the rest of the child’s implementation private.
 *
 * 🔄 Use Cases & Why useImperativeHandle is Ideal:
 * 
 * 1. Reset input field
 *    - Why: Encapsulates reset logic within the input component itself.
 *    - Alternative: Using a prop or context would break encapsulation and re-render unnecessarily.
 * 
 * 2. Trigger animation in child
 *    - Why: Keeps DOM access and animation logic inside the child.
 *    - Alternative: Exposing DOM nodes defeats React abstraction.
 * 
 * 3. Validate form field and send result to parent
 *    - Why: Parent calls a method like `validate()` and gets a result.
 *    - Alternative: Lifting validation state to parent would lead to prop drilling and tight coupling.
 * 
 * 4. Focus a custom input field
 *    - Why: Imperative DOM method (`.focus()`) needs to be accessed from parent.
 *    - Alternative: Can’t be done cleanly with just props/state.
 *
 * 🔁 Alternatives like prop/state/context can be:
 *    - ❌ Verbose (lots of prop drilling)
 *    - ❌ Leak internal logic (breaks encapsulation)
 *    - ❌ Cause unnecessary re-renders
 *
 * ✅ `useImperativeHandle` is clean, controlled, and React-native.
 */


