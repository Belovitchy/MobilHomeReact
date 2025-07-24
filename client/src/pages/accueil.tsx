import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useOwner } from "../context/ownerContext";

function Accueil() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setOwner, owner } = useOwner();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password",
    ) as HTMLInputElement;
    const email = emailInput.value;
    const password = passwordInput.value;
    //fetch to owner route
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/owner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setOwner(data);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (owner) {
      console.log("owner", owner);
    }
  }, [owner]);

  return (
    <>
      <form
        className="bg-[var(--color-cards)] cards m-4 p-4 border-2 border-[var(--color-primary)] rounded-2xl flex flex-col gap-4"
        onSubmit={(e) => handleLogin(e)}
      >
        <h1 className="text-2xl font-bold m-auto">Identification</h1>
        <label htmlFor="email">Email:</label>
        <input
          className="bg-[var(--color-background)]"
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password:</label>
        <div className="relative">
          <input
            className="bg-[var(--color-background)] pr-10 w-full"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
          />
          <button
            className="absolute inset-y-0 right-2 flex items-center text-white"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <button
          className="border-[var(--color-primary)] border-2 p-2 rounded-full"
          type="submit"
        >
          Connecter
        </button>
      </form>
    </>
  );
}

export default Accueil;
