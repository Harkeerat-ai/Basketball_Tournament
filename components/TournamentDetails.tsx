import { entryFee, eventDetails, formatSteps, rules } from "@/data/tournament";
import { registrationFormUrl } from "@/data/contact";

export default function TournamentDetails() {
  return (
    <section id="tournament" className="scroll-mt-[80px]">
      <div className="max-w-[1100px] mx-auto px-[18px] md:px-[44px] py-[60px_90px]">
        <p className="section-eyebrow">Event Details</p>
        <h2 className="section-heading mb-10">
          KNOW<br />THE GAME
        </h2>

        <div className="bg-gradient-to-br from-[rgba(232,69,0,0.1)] to-[rgba(255,184,0,0.05)] border border-bdOr rounded-[18px] p-[40px] grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[44px] items-center mb-[52px]">
          <div>
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-or2 border-l-[3px] border-or pl-[14px] mb-6">
              Entry Fee
            </p>
            <div className="font-russo text-[76px] leading-[1] text-white mb-1">
              <span className="text-or2">₹</span>
              {entryFee.amount.toLocaleString()}
            </div>
            <div className="text-[13px] font-bold tracking-[2.5px] uppercase text-gr">
              {entryFee.label}
            </div>
          </div>
          <div>
            <div className="text-[16.5px] text-gl leading-[1.65]">
              Payment must be made in advance on or before<br />
              <strong className="text-gold font-bold">{entryFee.deadline}</strong>.
              <div className="mt-[14px] text-[13px] text-gr p-[10px_14px] bg-white/3 rounded-[7px] border-l-2 border-bdOr">
                {entryFee.note}
              </div>
            </div>
            <div className="mt-[22px]">
              <a
                href={registrationFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-[34px] py-[14px] bg-or text-white font-bold text-[16px] tracking-[1.5px] uppercase rounded-[8px] transition-all duration-200 hover:bg-or2 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(232,69,0,0.42)]"
              >
                Register &amp; Pay &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[44px] mb-[52px]">
          <div>
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-or2 border-l-[3px] border-or pl-[14px] mb-6">
              Event Details
            </p>
            <ul className="list-none">
              {eventDetails.map((d) => (
                <li
                  key={d.key}
                  className="flex gap-[18px] py-[18px] border-b border-bdr items-start"
                >
                  <span className="text-[11px] font-bold tracking-[2px] uppercase text-gr min-w-[96px] pt-[2px]">
                    {d.key}
                  </span>
                  <span className="text-[17px] font-semibold text-ow leading-[1.35]">
                    {d.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-or2 border-l-[3px] border-or pl-[14px] mb-6">
              Tournament Format
            </p>
            <div className="bg-surf border border-bdr rounded-[13px] p-[28px]">
              {formatSteps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-[18px] items-start py-[16px] border-b border-bdr last:border-b-0"
                >
                  <div className="w-[36px] h-[36px] bg-[rgba(232,69,0,0.13)] border border-bdOr rounded-full flex items-center justify-center font-russo text-[15px] text-or2 flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="text-[16.5px] font-bold text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-[13.5px] text-gl">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[11px] font-bold tracking-[3px] uppercase text-or2 border-l-[3px] border-or pl-[14px] mb-6">
          Tournament Rules
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[15px]">
          {rules.map((rule, i) => (
            <div
              key={i}
              className="bg-surf border border-bdr rounded-[11px] p-[20px] flex gap-[14px] items-start"
            >
              <span className="text-[19px] flex-shrink-0 mt-[1px]">
                {rule.icon}
              </span>
              <span className="text-[14px] text-gl leading-[1.55]">
                {rule.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
