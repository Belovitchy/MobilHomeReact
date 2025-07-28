import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router";
import { useOwner } from "../context/ownerContext";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { owner } = useOwner();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <>
      {owner !== null ? (
        <>
          <div className="sm:flex hidden">
            <section className="bg-[var(--color-cards)] w-[200px] min-h-full flex flex-col justify-between border-r-2 border-[var(--color-primary)]">
              <div className="flex flex-col gap-4">
                <article className="h-24 bg-[var(--color-primary)] text-[var(--color-cards)]  flex flex-col items-center">
                  <h2 className="font-extrabold">Hello! {owner?.name}</h2>
                </article>
                <article className="  p-4 ">
                  <ul className="flex flex-col gap-6">
                    <Link
                      className={`p-4 rounded-lg transition-colors duration-300 ${
                        isActive("/dashboard")
                          ? "bg-[var(--color-primary)]/90 text-[var(--color-cards)]"
                          : "hover:bg-[var(--color-primary)] hover:text-[var(--color-cards)]"
                      }`}
                      to="/dashboard"
                    >
                      Home
                    </Link>
                    <Link
                      className={`p-4 rounded-lg transition-colors duration-300 ${
                        isActive("/dashboard/mobilhomes")
                          ? "bg-[var(--color-primary)]/90 text-[var(--color-cards)]"
                          : "hover:bg-[var(--color-primary)] hover:text-[var(--color-cards)]"
                      }`}
                      to="/dashboard/mobilhomes"
                    >
                      Mobilhomes
                    </Link>
                    <Link
                      className={`p-4 rounded-lg transition-colors duration-300 ${
                        isActive("/dashboard/invoices")
                          ? "bg-[var(--color-primary)]/90 text-[var(--color-cards)]"
                          : "hover:bg-[var(--color-primary)] hover:text-[var(--color-cards)]"
                      }`}
                      to="/dashboard/invoices"
                    >
                      Factures
                    </Link>

                    <Link
                      className={`p-4 rounded-lg transition-colors duration-300 ${
                        isActive("/dashboard/managers")
                          ? "bg-[var(--color-primary)]/90 text-[var(--color-cards)]"
                          : "hover:bg-[var(--color-primary)] hover:text-[var(--color-cards)]"
                      }`}
                      to="/dashboard/managers"
                    >
                      Gérants
                    </Link>
                    {owner.isAdmin ? (
                      <Link
                        className={`p-4 rounded-lg transition-colors duration-300 ${
                          isActive("/dashboard/admin")
                            ? "bg-[var(--color-primary)]/90 text-[var(--color-cards)]"
                            : "hover:bg-[var(--color-primary)] hover:text-[var(--color-cards)]"
                        }`}
                        to="dashboard/admin"
                      >
                        Administration
                      </Link>
                    ) : null}
                  </ul>
                </article>
              </div>

              <Link
                className="m-4 p-4 rounded-lg transition-colors duration-300 hover:bg-[var(--color-primary)] hover:text-[var(--color-cards)] "
                to="/"
              >
                Déconnection
              </Link>
            </section>
          </div>
          {!isOpen ? (
            <button
              type="button"
              className="absolute sm:hidden w-14 h-14 border-2 border-[var(--color-primary)] rounded-full bg-[var(--color-cards)] items-center justify-center flex"
              onClick={() => setIsOpen(true)}
            >
              <GiHamburgerMenu className="  w-10 h-10  " />
            </button>
          ) : (
            <section className="absolute top-0 left-0  bg-[var(--color-cards)] z-50 flex flex-col gap-4 border-2 border-[var(--color-primary)] rounded-lg p-4">
              <Link onClick={() => setIsOpen(false)} to="/dashboard">
                Home
              </Link>
              <Link onClick={() => setIsOpen(false)} to="/dashboard/mobilhomes">
                Mobilhomes
              </Link>
              <Link onClick={() => setIsOpen(false)} to="/dashboard/invoices">
                Factures
              </Link>
              <Link onClick={() => setIsOpen(false)} to="/dashboard/managers">
                Gérants
              </Link>

              <Link onClick={() => setIsOpen(false)} to="/">
                Déconnection
              </Link>
            </section>
          )}
        </>
      ) : null}
    </>
  );
}

export default SideBar;
