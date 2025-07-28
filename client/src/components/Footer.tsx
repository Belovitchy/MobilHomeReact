function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-[var(--color-cards)] p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Mobilhome. All rights reserved.</p>
      <p>
        <a
          href="/privacy-policy"
          className="text-[var(--color-secondary)] hover:underline"
        >
          Privacy Policy
        </a>
      </p>
    </footer>
  );
}

export default Footer;
