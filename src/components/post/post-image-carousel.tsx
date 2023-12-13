"use client";

import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import Button from "../base/button";

export default function PostImageCarousel({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className='embla'>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='backface-hidden flex -ml-4 touch-pan-y'>
          {images.map((image, idx) => (
            <Image
              key={idx}
              priority={true}
              src={image}
              width='0'
              height='0'
              sizes='100vh'
              className='w-full h-auto relative pl-4'
              alt={image}
            />
          ))}
        </div>
      </div>
      <Button
        className={twMerge("glass absolute top-1/2 left-2 -translate-y-1/2", prevBtnDisabled && "btn-disabled")}
        onPress={scrollPrev}
      >
        <MdArrowBackIos />
      </Button>
      <Button
        className={twMerge("glass absolute top-1/2 right-2 -translate-y-1/2", nextBtnDisabled && "btn-disabled")}
        onPress={scrollNext}
      >
        <MdArrowForwardIos />
      </Button>
    </div>
  );
}
