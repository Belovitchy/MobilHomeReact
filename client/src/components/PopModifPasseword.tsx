import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ImExit } from "react-icons/im";
import { useOwner } from "../context/ownerContext";

function PopModifPasseword({
  id,
  onClose,
}: { id: number; onClose: () => void }) {
  const { owner } = useOwner();
  const [showPassword, setShowPassword] = useState(false);
  async function postModifPasseword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const token = localStorage.getItem("token") || "";
    const email = owner?.email || "";
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/owner/password/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      },
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      alert("Mot de passe modifié avec succès");
      onClose();
    } else {
      alert("Erreur lors de la modification du mot de passe");
    }
  }

  return (
    <form
      onSubmit={(e) => postModifPasseword(e)}
      className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[340px] bg-[var(--color-cards)]  mx-auto  border-2 border-[var(--color-primary)] rounded-2xl flex flex-col gap-4 p-4"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-auto flex items-center mb-4">
          Saisir le nouveau <br /> mot de passe
        </h1>
        <ImExit
          onClick={() => onClose()}
          className="text-2xl hover:cursor-pointer"
        />
      </div>
      <input
        className="bg-[var(--color-background)] w-[200px] p-2 rounded-lg mx-auto"
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        required
      />

      <div className="flex flex-row justify-between">
        <h3>Confirmer</h3>
        <button
          className="hover:cursor-pointer flex items-center text-[var(--color-primary)]"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      <input
        className="bg-[var(--color-background)] w-[200px] p-2 rounded-lg mx-auto"
        type={showPassword ? "text" : "password"}
        id="confirmPassword"
        name="confirmPassword"
        required
      />

      <button
        type="submit"
        className="w-40 mx-auto bg-[var(--color-cards)] text-[var(--color-primary)] border-2 border-[var(--color-primary)] px-4 py-2 rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-cards)] transition-colors duration-300 my-8 hover:cursor-pointer"
      >
        Valider
      </button>
    </form>
  );
}

export default PopModifPasseword;
