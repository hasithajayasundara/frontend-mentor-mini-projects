'use client';

import { useState } from "react";

import { technology } from "./config";
import { DynamicImage } from "@/components/dynamic-image";

const Technology = () => {
  const [selected, setSelected] = useState(0);
  const selectedTechnology = technology[selected];

  return (
    <>
      <h1 className="numbered-title">
        <span aria-hidden="true">03</span>Space launch 101
      </h1>
      <DynamicImage
        images={selectedTechnology.images}
        alt={selectedTechnology.name}
        className="technology-image"
      />
      <div className="tab-list numbered-indicators flex">
        {technology.map((item, idx) => (
          <span
            role="tab"
            key={`technology-${idx}`}
            aria-selected={idx === selected}
            onClick={() => setSelected(idx)}
            className="uppercase ff-sans-cond text-accent bg-transparent letter-spacing-2"
          >
            <span className="sr-only">{item.name}</span>
            {idx}
          </span>
        ))}
      </div>

      <section className="technology-body">
        <h2 className="fs-800 uppercase ff-serif">
          {selectedTechnology.name}
        </h2>
        <p className="technology-description">
          {selectedTechnology.description}
        </p>
      </section>
    </>
  )
};

export default Technology;
