// lets say there is a parent component. it has a button.
//  And there is a child component which only has a data.
//  On click of parent component button child component data should be rendered in the parent component.
//  How to do this in react ?
// Child component does not have any button

import React, { useRef, useState } from 'react';
import Child from './Child';

function Parent() {
  const childRef = useRef(); // Ref to access child methods
  const [childData, setChildData] = useState(null);

  const handleFetchChildData = () => {
    if (childRef.current?.getData) {
      const data = childRef.current.getData(); // Call child method
      setChildData(data); // Store it in state
    }
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <button onClick={handleFetchChildData}>Get Data from Child</button>

      {childData && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Received from child:</strong>
          <pre>{JSON.stringify(childData, null, 2)}</pre>
        </div>
      )}

      <Child ref={childRef} />
    </div>
  );
}

export default Parent;

import React, { useImperativeHandle, forwardRef } from 'react';

const Child = forwardRef((props, ref) => {
  const internalData = {
    name: 'John Doe',
    age: 28,
    message: 'Hello from Child!'
  };

  useImperativeHandle(ref, () => ({
    getData: () => {
      return internalData; // Exposed method
    }
  }), []); // No dependencies; the handle never changes

  return (
    <div>
      <h3>Child Component</h3>
      {/* No button needed here */}
    </div>
  );
});

