import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Button from "../base/button";

export default function PostImageCarousel({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  return (
    <div className='carousel relative  w-full' ref={emblaRef}>
      <div className='flex'>
        {images.map((image) => (
          <div key={image} className='carousel-item'>
            <Image
              className='card-img-top w-full  object-cover'
              src={image}
              width={500}
              height={300}
              alt={image}
              loading='lazy'
            />
          </div>
        ))}
      </div>
      {emblaApi?.canScrollPrev() && (
        <Button className='glass absolute top-1/2 left-2 -translate-y-1/2' onPress={() => emblaApi.scrollPrev()}>
          <MdArrowBackIos />
        </Button>
      )}
      {emblaApi?.canScrollNext() && (
        <Button className='glass absolute top-1/2 right-2 -translate-y-1/2' onPress={() => emblaApi.scrollNext()}>
          <MdArrowForwardIos />
        </Button>
      )}
    </div>
  );
}
