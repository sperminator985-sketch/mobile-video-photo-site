const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container py-14">
        <div className="pt-0 text-sm text-accent-foreground/70">
          <p>© {new Date().getFullYear()} Айсберг-видео.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
