import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useOwner } from "../context/ownerContext";

function Accueil() {
  const { setOwner, setIsConnected, isConnected } = useOwner();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      console.log(data.owner);
      localStorage.setItem("token", data.token);
      setOwner(data.owner);
      setIsConnected(true);
      navigate("/dashboard");
    } else {
      alert("Email ou mot de passe incorrect");
    }
  };

  function handleLogout() {
    localStorage.removeItem("token");
    setOwner(null);
    setIsConnected(false);
    navigate("/");
  }

  return (
    <>
      {!isConnected ? (
        <form
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[340px] bg-[var(--color-cards)]  mx-auto p-4 border-2 border-[var(--color-primary)] rounded-2xl flex flex-col gap-8 mt-16"
          onSubmit={(e) => handleLogin(e)}
        >
          <h1 className="text-2xl font-bold m-auto">Identification</h1>
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="email">Email:</label>
            <input
              className="bg-[var(--color-background)] w-[200px] p-2 rounded-lg"
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="password">Password:</label>
            <div className="relative">
              <input
                className="bg-[var(--color-background)] pr-10 w-[200px] rounded-lg p-2"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
              />
              <button
                className="absolute inset-y-0 right-2 flex items-center text-[var(--color-primary)]"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button
            className="border-[var(--color-primary)] border-2 p-2 rounded-full mb-6 w-40 mx-auto hover:bg-[var(--color-primary)] hover:text-[var(--color-cards)] transition-colors duration-300"
            type="submit"
          >
            Valider
          </button>
        </form>
      ) : (
        <form
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2  w-[340px] bg-[var(--color-cards)] cards mx-auto p-4 border-2 border-[var(--color-primary)] rounded-2xl flex flex-col gap-8 mt-16"
          onSubmit={() => handleLogout()}
        >
          <h1 className="text-2xl font-bold m-auto">Se déconnecter</h1>

          <button
            className="border-[var(--color-primary)] border-2 p-2 rounded-full mb-6 w-40 mx-auto hover:bg-[var(--color-primary)] hover:text-[var(--color-cards)] transition-colors duration-300"
            type="submit"
          >
            Valider
          </button>
        </form>
      )}
    </>
  );
}

export default Accueil;
