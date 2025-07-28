import type { TypeOwner } from "../types/TypeFiles";

function OwnerCard({ owner }: { owner: TypeOwner }) {
  return (
    <article key={owner.id} className="bg-[var(--color-cards)] p-4 rounded-lg">
      <h1>{owner.name}</h1>
      <h2>{owner.email}</h2>
      <h2>{owner.isAdmin ? "Administrateur" : "Propriétaire"}</h2>
    </article>
  );
}

export default OwnerCard;
