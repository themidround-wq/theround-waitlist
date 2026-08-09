export function TopicCard() {
  return (
    <div className="w-full max-w-md justify-self-center lg:justify-self-end">
      <div className="rounded-[28px] border border-lime/20 bg-[#132014]/50 p-3 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between px-3 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
            Your topic
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            First spin
          </span>
        </div>

        <div className="mt-3 rounded-3xl bg-[#0c1a0f] p-4 lg:p-6">
          <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-lime">
            Labour &amp; delivery
          </span>
          <p className="mt-3 text-lg font-medium leading-tight text-cream lg:text-[26px]">
            Explain how you would recognise and manage postpartum
            haemorrhage.
          </p>

          <div className="mt-6 flex items-end justify-between lg:mt-10">
            <div>
              <p className="text-3xl font-black text-cream lg:text-4xl">
                01:30
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase leading-tight tracking-[0.12em] text-white/40">
                Quick
                <br />
                response
              </p>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 lg:h-16 lg:w-16">
              <span className="h-5 w-5 rounded-full bg-lime lg:h-6 lg:w-6" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
