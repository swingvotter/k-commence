import brand from "../assets/brand/brand";

export default function Patners() {
  return (
    <section className=" p-2 w-screen overflow-hidden border mt-30 mb-30">
      {/* Patners section */}
      <div id="Partners">
        <h1 className="text-3xl font-black">
          <span className="text-red-500">Partner</span> with us
        </h1>
        <p className="text-slate-500 text-[14px]">Entrusted patnership</p>
      </div>

      <div className=" relative w-full">
        <div className="flex gap-8 animate-marquee">
          {/* Duplicate the brands array */}
          {brand.concat(brand).map((br, i) => (
            <div key={i} className="flex-shrink-0">
              <img src={br} alt="partners brand" className="h-10 w-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            width: max-content;
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
    </section>
  );
}
