import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ImExit } from "react-icons/im";

function PopAddOwner({ onClose }: { onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  async function postAddOwner(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const name = formData.get("name") as string;
    const isAdmin = formData.get("isAdmin") === "true";
    console.log("isadmin:", isAdmin);
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/owner/admin/owner`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          isAdmin: isAdmin,
        }),
      },
    );
    if (response.ok) {
      alert("Propriétaire ajouté avec succès");
    }
    onClose();
  }

  return (
    <form
      onSubmit={(e) => postAddOwner(e)}
      className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[340px] bg-[var(--color-cards)]  mx-auto  border-2 border-[var(--color-primary)] rounded-2xl flex flex-col gap-4 p-4"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-auto flex items-center mb-4">
          Ajouter propriétaire
        </h1>
        <ImExit
          onClick={() => onClose()}
          className="text-2xl hover:cursor-pointer"
        />
      </div>
      <label htmlFor="name">Nom:</label>
      <input
        className="bg-[var(--color-background)] w-full p-2 rounded-lg mx-auto"
        type="text"
        id="name"
        name="name"
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        className="bg-[var(--color-background)] w-full p-2 rounded-lg mx-auto"
        type="email"
        id="email"
        name="email"
        required
      />
      <label htmlFor="password">Mot de passe:</label>
      <div className="relative">
        <input
          className="bg-[var(--color-background)] pr-10 w-full rounded-lg p-2"
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
      <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
      <div className="relative">
        <input
          className="bg-[var(--color-background)] pr-10 w-full rounded-lg p-2"
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
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
      <label htmlFor="isAdmin">Status:</label>
      <select
        className="bg-[var(--color-background)] w-full p-2 rounded-lg mx-auto"
        id="isAdmin"
        name="isAdmin"
        defaultValue={"false"}
        required
      >
        <option value="true">Administrateur</option>
        <option value="false">Propriétaire</option>
      </select>

      <button
        type="submit"
        className="w-40 mx-auto bg-[var(--color-cards)] text-[var(--color-primary)] border-2 border-[var(--color-primary)] px-4 py-2 rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-cards)] transition-colors duration-300 my-8 hover:cursor-pointer"
      >
        Valider
      </button>
    </form>
  );
}

export default PopAddOwner;
