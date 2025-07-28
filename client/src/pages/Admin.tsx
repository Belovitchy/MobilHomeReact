import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router";
import OwnerCard from "../components/OwnerCard";
import PopAddOwner from "../components/PopAddOwner";
import { useOwner } from "../context/ownerContext";
import type { TypeOwner } from "../types/TypeFiles";

function Admin() {
  const { owner } = useOwner();
  const [allOwners, setAllOwners] = useState<TypeOwner[]>([]);
  const [popAddOwner, setPopAddOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!owner?.isAdmin) {
      navigate("/");
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/admin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllOwners(data);
      });
  }, [owner, navigate]);
  return (
    <>
      {popAddOwner ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopAddOwner onClose={() => setPopAddOwner(false)} />
        </div>
      ) : null}
      <h1 className="flex flex-row items-center justify-center gap-6  text-2xl bg-[var(--color-cards)] text-[var(--color-primary)] p-4 rounded-lg w-full text-center border-2 border-[var(--color-primary)]">
        Gestion des comptes{" "}
        <div className="w-10 h-10 bg-[var(--color-cards)] rounded-lg border-2 border-[var(--color-primary)] flex items-center justify-center">
          <FaPlus
            className="rounded-lg w-10/12 h-10/12 hover:text-[var(--color-cards)] hover:cursor-pointer hover:bg-[var(--color-primary)]"
            onClick={() => setPopAddOwner(true)}
          />
        </div>
      </h1>

      <section className="compte flex flex-wrap gap-4 my-4">
        {allOwners.map((owner) => (
          <OwnerCard key={owner.id} owner={owner} />
        ))}
      </section>
    </>
  );
}
export default Admin;
