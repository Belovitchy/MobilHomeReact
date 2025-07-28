import { ImExit } from "react-icons/im";

function PopModifMail({ id, onClose }: { id: number; onClose: () => void }) {
  async function postModifMail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const confirmEmail = formData.get("confirmEmail") as string;
    console.log("Email:", email);
    console.log("Confirm Email:", confirmEmail);
    if (email !== confirmEmail) {
      alert("Les emails ne correspondent pas");
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/owner/email/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify({
          email: email,
        }),
      },
    );
    if (response.ok) {
      alert("Email modifié avec succès");
    }
    onClose();
  }
  return (
    <form
      onSubmit={(e) => postModifMail(e)}
      className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[340px] bg-[var(--color-cards)]  mx-auto  border-2 border-[var(--color-primary)] rounded-2xl flex flex-col gap-4 p-4"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-auto mb-4">Nouveau mail</h1>
        <ImExit
          onClick={() => onClose()}
          className="text-2xl hover:cursor-pointer"
        />
      </div>
      <input
        className="bg-[var(--color-background)] w-[200px] p-2 rounded-lg mx-auto"
        type="email"
        id="email"
        name="email"
        required
      />
      <h3>Confirmer</h3>
      <input
        className="bg-[var(--color-background)] w-[200px] p-2 rounded-lg mx-auto"
        type="email"
        id="confirmEmail"
        name="confirmEmail"
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

export default PopModifMail;
