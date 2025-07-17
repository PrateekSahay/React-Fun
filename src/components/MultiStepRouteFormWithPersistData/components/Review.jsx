import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Review() {
  const { formData } = useForm();
  const navigate = useNavigate();

  const handleSubmit = () => {
    alert("Form submitted: " + JSON.stringify(formData, null, 2));
    navigate("/step-1"); // reset or navigate to thank you
  };

  return (
    <section>
      <h2>Review Your Info</h2>
      <ul>
        <li>
          <strong>First Name:</strong> {formData.firstName}
        </li>
        <li>
          <strong>Last Name:</strong> {formData.lastName}
        </li>
        <li>
          <strong>Email:</strong> {formData.email}
        </li>
        <li>
          <strong>Age:</strong> {formData.age}
        </li>
      </ul>

      <button onClick={() => navigate("/step-2")}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </section>
  );
}
