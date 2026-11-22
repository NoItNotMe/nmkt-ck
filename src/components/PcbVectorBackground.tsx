export function PcbVectorBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#071B3B]"
    >
      {/* Subtle blueprint blue depth gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 45%, #0F3570 0%, #092452 55%, #05142E 100%)',
        }}
      />

      {/* Crisp blue PCB vector traces, pads, IC footprints, and vias */}
      <svg
        viewBox="0 0 1440 760"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-85"
      >
        <defs>
          <pattern
            id="pcb-micro-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              stroke="#3B82F6"
              strokeOpacity="0.09"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="1" fill="#60A5FA" fillOpacity="0.18" />
          </pattern>
        </defs>

        <rect width="1440" height="760" fill="url(#pcb-micro-grid)" />

        {/* Left bus routing */}
        <g stroke="#3B82F6" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 110 H 150 L 200 160 H 330" />
          <path d="M 0 130 H 140 L 195 185 H 310" />
          <path d="M 0 150 H 130 L 190 210 H 295" />
          <path d="M 0 320 H 110 L 160 270 H 270 L 310 310 H 380" />
          <path d="M 0 342 H 122 L 172 292 H 262 L 302 332 H 360" />
          <path d="M 0 560 H 170 L 235 495 H 355" />
          <path d="M 0 584 H 182 L 247 519 H 370" />
          <path d="M 70 760 V 645 L 130 585 V 430" />
          <path d="M 94 760 V 655 L 154 595 V 455" />
        </g>

        {/* Right bus routing */}
        <g stroke="#3B82F6" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 1440 120 H 1290 L 1235 175 H 1100" />
          <path d="M 1440 142 H 1300 L 1245 197 H 1120" />
          <path d="M 1440 310 H 1315 L 1260 255 H 1140 L 1095 300 H 1040" />
          <path d="M 1440 332 H 1325 L 1270 277 H 1152 L 1107 322 H 1060" />
          <path d="M 1440 530 H 1265 L 1205 470 H 1085" />
          <path d="M 1440 554 H 1252 L 1192 494 H 1065" />
          <path d="M 1350 760 V 630 L 1290 570 V 420" />
          <path d="M 1326 760 V 642 L 1266 582 V 440" />
        </g>

        {/* Top & bottom subtle interconnecting traces */}
        <g stroke="#60A5FA" strokeOpacity="0.28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 410 0 V 72 L 450 112 H 580" />
          <path d="M 432 0 V 62 L 472 102 H 560" />
          <path d="M 1030 0 V 72 L 990 112 H 860" />
          <path d="M 1008 0 V 62 L 968 102 H 880" />
          <path d="M 380 760 V 685 L 430 635 H 550" />
          <path d="M 1060 760 V 685 L 1010 635 H 890" />
        </g>

        {/* Left IC package footprint */}
        <g stroke="#60A5FA" strokeOpacity="0.45" strokeWidth="1.5">
          <rect x="128" y="348" width="96" height="96" rx="6" fill="#0B2A5B" fillOpacity="0.65" />
          <rect x="142" y="362" width="68" height="68" rx="3" strokeOpacity="0.3" />
          <circle cx="152" cy="372" r="3" fill="#60A5FA" fillOpacity="0.55" />
          {/* IC pins */}
          <path d="M 114 366 H 128 M 114 382 H 128 M 114 398 H 128 M 114 414 H 128 M 114 430 H 128" />
          <path d="M 224 366 H 238 M 224 382 H 238 M 224 398 H 238 M 224 414 H 238 M 224 430 H 238" />
          <path d="M 146 334 V 348 M 162 334 V 348 M 178 334 V 348 M 194 334 V 348 M 210 334 V 348" />
          <path d="M 146 444 V 458 M 162 444 V 458 M 178 444 V 458 M 194 444 V 458 M 210 444 V 458" />
        </g>

        {/* Right IC package footprint */}
        <g stroke="#60A5FA" strokeOpacity="0.45" strokeWidth="1.5">
          <rect x="1216" y="340" width="96" height="96" rx="6" fill="#0B2A5B" fillOpacity="0.65" />
          <rect x="1230" y="354" width="68" height="68" rx="3" strokeOpacity="0.3" />
          <circle cx="1240" cy="364" r="3" fill="#60A5FA" fillOpacity="0.55" />
          <path d="M 1202 358 H 1216 M 1202 374 H 1216 M 1202 390 H 1216 M 1202 406 H 1216 M 1202 422 H 1216" />
          <path d="M 1312 358 H 1326 M 1312 374 H 1326 M 1312 390 H 1326 M 1312 406 H 1326 M 1312 422 H 1326" />
          <path d="M 1234 326 V 340 M 1250 326 V 340 M 1266 326 V 340 M 1282 326 V 340 M 1298 326 V 340" />
          <path d="M 1234 436 V 450 M 1250 436 V 450 M 1266 436 V 450 M 1282 436 V 450 M 1298 436 V 450" />
        </g>

        {/* Solder pads & copper vias */}
        <g stroke="#93C5FD" strokeOpacity="0.7" strokeWidth="2" fill="#071B3B">
          <circle cx="330" cy="160" r="5.5" />
          <circle cx="310" cy="185" r="4.5" />
          <circle cx="295" cy="210" r="5.5" />
          <circle cx="380" cy="310" r="5.5" />
          <circle cx="360" cy="332" r="4.5" />
          <circle cx="355" cy="495" r="5.5" />
          <circle cx="370" cy="519" r="4.5" />
          <circle cx="130" cy="430" r="5" />
          <circle cx="154" cy="455" r="4.5" />

          <circle cx="1100" cy="175" r="5.5" />
          <circle cx="1120" cy="197" r="4.5" />
          <circle cx="1040" cy="300" r="5.5" />
          <circle cx="1060" cy="322" r="4.5" />
          <circle cx="1085" cy="470" r="5.5" />
          <circle cx="1065" cy="494" r="4.5" />
          <circle cx="1290" cy="420" r="5" />
          <circle cx="1266" cy="440" r="4.5" />

          <circle cx="580" cy="112" r="4.5" />
          <circle cx="560" cy="102" r="4" />
          <circle cx="860" cy="112" r="4.5" />
          <circle cx="880" cy="102" r="4" />
          <circle cx="550" cy="635" r="4.5" />
          <circle cx="890" cy="635" r="4.5" />
        </g>

        {/* Corner mounting fiducials */}
        <g stroke="#60A5FA" strokeOpacity="0.4" strokeWidth="1.5">
          <circle cx="48" cy="48" r="10" />
          <circle cx="48" cy="48" r="4" fill="#60A5FA" fillOpacity="0.25" />
          <circle cx="1392" cy="48" r="10" />
          <circle cx="1392" cy="48" r="4" fill="#60A5FA" fillOpacity="0.25" />
          <circle cx="48" cy="712" r="10" />
          <circle cx="48" cy="712" r="4" fill="#60A5FA" fillOpacity="0.25" />
          <circle cx="1392" cy="712" r="10" />
          <circle cx="1392" cy="712" r="4" fill="#60A5FA" fillOpacity="0.25" />
        </g>
      </svg>

      {/* Center legibility scrim so white text remains crisp over traces */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 64% 62% at 50% 50%, rgba(7, 27, 59, 0.72) 0%, rgba(7, 27, 59, 0.25) 70%, transparent 100%)',
        }}
      />
    </div>
  );
}
