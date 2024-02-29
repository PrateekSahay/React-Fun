import { useEffect } from "react";

const Oxygen = (props) => {
  console.log({ props });

  useEffect(() => {
    if (props.isOutOfRange) {
      alert("Your param is out of range");
    }
  }, [props.isOutOfRange]);

  return <div>Oxygen</div>;
};

export default Oxygen;
