'use client';

import { useState } from "react";
import Image from "next/image";

import moonImage from '../../images/destination/image-moon.webp';
import { destinations } from "./config";

const Destination = () => {
  const [selected, setSelected] = useState(0);
  const selectedDestination = destinations[selected];

  return (
    <>
      <h1 className="numbered-title">
        <span aria-hidden="true">01</span>
        Pick your destination
      </h1>
      <Image
        src={moonImage}
        alt="The moon"
        className="destination-image"
      />
      <div className="tab-list underline-indicators flex">
        {destinations.map((item, idx) => (
          <span
            role="tab"
            key={`destination-${idx}`}
            aria-selected={idx === selected}
            onClick={() => setSelected(idx)}
            className="uppercase ff-sans-cond text-accent bg-transparent letter-spacing-2"
          >
            {item.name}
          </span>
        ))}
      </div>

      <section className="destination-body">
        <h2 className="fs-800 uppercase ff-serif">
          {selectedDestination.name}
        </h2>
        <p>
          {selectedDestination.description}
        </p>
        <div className="destination-meta flex">
          <div>
            <h3 className="text-accent fs-200 uppercase">
              Avg. distance
            </h3>
            <p className="fs-500 ff-serif uppercase">
              {selectedDestination.distance}
            </p>
          </div>
          <div>
            <h3 className="text-accent fs-200 uppercase">
              Est. travel time
            </h3>
            <p className="fs-500 ff-serif uppercase">
              {selectedDestination.distance}
            </p>
          </div>
        </div>
      </section>
    </>
  )
};

export default Destination;
