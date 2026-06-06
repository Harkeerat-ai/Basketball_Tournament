import { prizeTiers, entryFee } from "@/data/tournament";
import { registrationFormUrl } from "@/data/contact";

export default function PrizePool() {
  return (
    <div className="bg-gradient-to-br from-[rgba(232,69,0,0.08)] to-[rgba(255,184,0,0.05)] border border-bdGo rounded-[18px] p-[42px] flex gap-[44px] items-center flex-wrap">
      {prizeTiers.map((tier) => (
        <div key={tier.position} className="text-center flex-1 min-w-[150px]">
          <div className="text-[50px] mb-2">{tier.icon}</div>
          <div className="text-[11.5px] font-bold tracking-[3px] uppercase text-gold mb-1">
            {tier.position}
          </div>
          <div className="font-russo text-[38px] text-white mb-1">
            {tier.amount}
          </div>
          <div className="text-[13px] text-gr uppercase tracking-[1px]">
            {tier.description}
          </div>
        </div>
      ))}
      <div className="hidden md:block w-[1px] h-[80px] bg-bdGo" />
      <div className="flex-[2] text-left min-w-[240px]">
        <div className="text-[11.5px] font-bold tracking-[3px] uppercase text-gold mb-1">
          Entry Fee
        </div>
        <div className="font-russo text-[44px] leading-[1] text-white mt-2 mb-2">
          ₹{entryFee.amount.toLocaleString()}
          <span className="text-[17px] text-gr"> per team</span>
        </div>
        <p className="text-[14px] text-gl mb-[18px]">
          Pay before <strong className="text-gold">{entryFee.deadline}</strong>{" "}
          to confirm your spot
        </p>
        <a
          href={registrationFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-[34px] py-[14px] bg-or text-white font-bold text-[16px] tracking-[1.5px] uppercase rounded-[8px] transition-all duration-200 hover:bg-or2 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(232,69,0,0.42)]"
        >
          Register Your Team &rarr;
        </a>
      </div>
    </div>
  );
}
