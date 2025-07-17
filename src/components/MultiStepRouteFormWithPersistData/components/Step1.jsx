import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Step1() {
  const { formData, updateForm } = useForm();
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      alert("Please fill all fields");
      return;
    }
    navigate("/step-2");
  };

  return (
    <form onSubmit={handleNext}>
      <h2>Step 1: Personal Info</h2>
      <label htmlFor="firstName">First Name:</label>
      <input
        id="firstName"
        value={formData.firstName}
        onChange={(e) => updateForm({ firstName: e.target.value })}
      />

      <br />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        value={formData.lastName}
        onChange={(e) => updateForm({ lastName: e.target.value })}
      />

      <br />
      <button type="submit">Next</button>
    </form>
  );
}
