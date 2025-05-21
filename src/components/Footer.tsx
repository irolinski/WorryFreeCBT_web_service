const Footer = () => {
  type LinkObj = { name: string; link: string };

  const footerLinks: LinkObj[] = [
    { name: "Download now!", link: "#welcome" },
    { name: "Contact us", link: "#contact" },
    { name: "Privacy ", link: "/privacy" },
  ];

  return (
    <div className="footer">
      <div className="footer-links-container">
        {footerLinks.map((link: LinkObj, indexNum: number) => (
          <a className="footer-link" href={link.link} key={indexNum}>
            {link.name}
          </a>
        ))}
      </div>
      <div className="footer-brand">
        <h3>WorryFree, 2025</h3>
      </div>
    </div>
  );
};

export default Footer;
