import { footerBrand, footerLinks, contacts, organizer } from "@/data/contact";

export default function Footer() {
  return (
    <footer className="bg-surf border-t border-bdr px-[18px] md:px-[44px] py-[42px_22px] mt-[44px]">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex justify-between items-start flex-wrap gap-7 pb-7 border-b border-bdr mb-7">
          <div className="fb">
            <h3 className="font-russo text-[19px] text-gold mb-1.5">
              {footerBrand.name}
            </h3>
            <p className="text-[13.5px] text-gr">{footerBrand.subtitle}</p>
            <p className="mt-2 text-[12.5px] text-gr">
              {footerBrand.description}
            </p>
          </div>
          <div className="fl">
            <h4 className="text-[10.5px] font-bold tracking-[3px] uppercase text-gr mb-3">
              Navigate
            </h4>
            <ul className="list-none flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14px] text-gl transition-colors duration-200 hover:text-or2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="fl">
            <h4 className="text-[10.5px] font-bold tracking-[3px] uppercase text-gr mb-3">
              Contact
            </h4>
            <ul className="list-none flex flex-col gap-2">
              {contacts.map((c) => (
                <li key={c.phone}>
                  <a
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className="text-[14px] text-gl transition-colors duration-200 hover:text-or2"
                  >
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center gap-[14px] flex-wrap">
          <p className="text-[12.5px] text-gd">
            &copy; 2026 Mumbai Premier Basketball League. All rights reserved.
          </p>
          <p className="text-[12.5px] text-gd">Organised by {organizer}</p>
        </div>
      </div>
    </footer>
  );
}
