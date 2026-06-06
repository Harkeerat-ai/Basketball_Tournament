import { infoCards } from "@/data/tournament";

export default function InfoCards() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(248px,1fr))] gap-[18px] mb-[60px]">
      {infoCards.map((card) => (
        <div
          key={card.label}
          className="bg-surf border border-bdr rounded-[13px] p-[28px_24px] transition-all duration-300 hover:border-bdOr hover:-translate-y-1"
        >
          <div className="text-[26px] mb-[14px]">{card.icon}</div>
          <div className="text-[11px] font-bold tracking-[3px] uppercase text-or2 mb-[7px]">
            {card.label}
          </div>
          <div className="font-russo text-[21px] text-white mb-[5px] leading-[1.2]">
            {card.value}
          </div>
          <div className="text-[13.5px] text-gr">{card.note}</div>
        </div>
      ))}
    </div>
  );
}
