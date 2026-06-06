import { registrationRequirements, processSteps } from "@/data/tournament";
import { contacts, organizer, registrationFormUrl } from "@/data/contact";

export default function RegistrationSection() {
  return (
    <section id="teams" className="scroll-mt-[80px]">
      <div className="max-w-[1000px] mx-auto px-[18px] md:px-[44px] py-[60px_90px]">
        <div className="bg-gradient-to-br from-or to-[#b53000] rounded-[22px] p-[64px_24px] md:p-[64px] mb-[60px] text-center relative overflow-hidden">
          <div
            className="absolute text-[220px] opacity-[0.055] top-[-20px] right-[-10px] leading-none pointer-events-none select-none"
            aria-hidden="true"
          >
            🏀
          </div>
          <h2 className="font-russo text-[clamp(30px,5vw,52px)] text-white mb-4 relative">
            REGISTER YOUR TEAM
          </h2>
          <p className="text-[18px] text-white/88 mb-[34px] max-w-[500px] mx-auto relative">
            Join the Mumbai Premier Basketball League 2026. Only 16 spots
            available — secure yours now.
          </p>
          <a
            href={registrationFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-[54px] py-[18px] bg-white text-or font-russo text-[18px] rounded-[12px] transition-all duration-[220ms] relative cursor-pointer hover:-translate-y-[3px] hover:shadow-[0_14px_44px_rgba(0,0,0,0.35)]"
          >
            Fill Registration Form &rarr;
          </a>
        </div>

        <p className="section-eyebrow">Requirements</p>
        <h2 className="section-heading mb-[30px]">
          WHAT YOU<br />NEED
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px] mb-[50px]">
          {registrationRequirements.map((req) => (
            <div
              key={req.title}
              className="bg-surf border border-bdr rounded-[13px] p-[28px] transition-all duration-300 hover:border-bdOr"
            >
              <div className="text-[30px] mb-[14px]">{req.icon}</div>
              <div className="text-[17px] font-bold text-white mb-[9px]">
                {req.title}
              </div>
              <div className="text-[14px] text-gl leading-[1.6]">
                {req.description}
              </div>
            </div>
          ))}
        </div>

        <div className="h-[1px] bg-bdr my-[60px]" />

        <p className="section-eyebrow">Process</p>
        <h2 className="section-heading mb-[30px]">
          HOW TO<br />REGISTER
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(218px,1fr))] gap-[18px] mb-[50px]">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="p-[26px] bg-surf border border-bdr rounded-[13px] relative overflow-hidden"
            >
              <div className="font-russo text-[52px] text-or opacity-12 absolute top-[10px] right-[14px] leading-none pointer-events-none select-none">
                {step.number}
              </div>
              <div className="text-[30px] mb-[14px] relative">{step.icon}</div>
              <div className="text-[17px] font-bold text-white mb-[9px] relative">
                {step.title}
              </div>
              <div className="text-[14px] text-gl leading-[1.6] relative">
                {step.description}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-[60px]">
          <a
            href={registrationFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-[54px] py-[18px] bg-or text-white font-bold text-[18px] tracking-[1.5px] uppercase rounded-[8px] transition-all duration-200 hover:bg-or2 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(232,69,0,0.42)]"
          >
            Register Now &mdash; ₹3,000
          </a>
          <p className="mt-[14px] text-[13.5px] text-gr">
            Only 16 spots available &middot; First come, first serve
          </p>
        </div>

        <div className="mt-[60px] p-[40px] bg-surf border border-bdr rounded-[18px]">
          <p className="text-[11px] font-bold tracking-[3px] uppercase text-or2 border-l-[3px] border-or pl-[14px] mb-6">
            Contact for Registration
          </p>
          <div className="flex gap-6 flex-wrap mt-[22px]">
            {contacts.map((c) => (
              <div
                key={c.phone}
                className="bg-surf2 border border-bdr rounded-[11px] p-[20px_28px] transition-all duration-300 hover:border-bdOr"
              >
                <div className="font-russo text-[24px] tracking-[.5px] text-white">
                  {c.phone}
                </div>
                <div className="text-[11px] text-gr uppercase tracking-[2px] mt-1">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[22px] text-[14px] text-gr flex items-center gap-[9px]">
            <span aria-hidden="true">🏛️</span>
            <span>
              Organised by{" "}
              <strong className="text-ow font-bold">{organizer}</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
