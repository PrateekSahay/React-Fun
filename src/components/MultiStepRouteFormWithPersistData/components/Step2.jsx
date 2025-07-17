import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Step2() {
  const { formData, updateForm } = useForm();
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.age) {
      alert("Please fill all fields");
      return;
    }
    navigate("/review");
  };

  return (
    <form onSubmit={handleNext}>
      <h2>Step 2: Contact Info</h2>

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => updateForm({ email: e.target.value })}
      />

      <br />

      <label htmlFor="age">Age:</label>
      <input
        id="age"
        type="number"
        value={formData.age}
        onChange={(e) => updateForm({ age: e.target.value })}
      />

      <br />

      <button type="button" onClick={() => navigate("/step-1")}>
        Back
      </button>
      <button type="submit">Next</button>
    </form>
  );
}
