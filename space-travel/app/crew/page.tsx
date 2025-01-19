'use client';

import Image from "next/image";
import { useState } from "react";

import { crew } from "./config";

const Crew = () => {
  const [selected, setSelected] = useState(0);
  const selectedCrewMember = crew[selected];

  return (
    <>
      <h1 className="numbered-title">
        <span aria-hidden="true">02</span> Meet your crew
      </h1>
      <div className="dot-indicators flex">
        {crew.map((item, idx) => (
          <span
            role="tab"
            key={`role-${idx}`} aria-selected={selected === idx}
            onClick={() => setSelected(idx)}
          >
            <span className="sr-only">{item.role}</span>
          </span>
        ))}
      </div>
      <section className="crew-body flow">
        <div>
          <h2 className="fs-600 ff-serif uppercase">{selectedCrewMember.role}</h2>
          <p className="fs-700 uppercase ff-serif">{selectedCrewMember.name}</p>
        </div>
        <p>
          {selectedCrewMember.bio}
        </p>
      </section>
      <Image
        src={selectedCrewMember.images.webp}
        alt="Douglas Hurley"
        className="crew-image"
      />
    </>
  )
};

export default Crew;
