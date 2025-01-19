import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';

type Props = {
  images: {
    portrait: StaticImageData;
    landscape: StaticImageData;
  };
  alt: string;
  className: string;
}

export const DynamicImage = ({ images, alt, className }: Props) => {
  const [showLandscape, setShowLandscape] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      const maxEm = 60 * 16; // 960px
      const minEm = 35 * 16; // 560px

      if (width >= minEm && width <= maxEm) {
        setShowLandscape(true);
      } else {
        setShowLandscape(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <Image
      alt={alt}
      className={className}
      src={showLandscape ? images.landscape : images.portrait}
      sizes="(max-width: 560px) 100%, (max-width: 960px) 50vw, 33vw"
    />
  );
};
