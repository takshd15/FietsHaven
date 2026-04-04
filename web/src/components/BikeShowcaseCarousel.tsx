import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef, useState, type TouchEvent } from "react";

export const gallerySlides = [
  { src: "/bike.jpeg", alt: "Electric bike" },
  { src: "/key-chain.jpeg", alt: "Smart key remote" },
  { src: "/phone-holder.jpeg", alt: "Ride essentials" },
  { src: "/logo.jpeg", alt: "Fiets Haven logo" },
] as const;

type BikeShowcaseCarouselProps = {
  productLabel: string;
  /** `compact` = home cards; `pdp` = product page gallery */
  variant?: "compact" | "pdp";
};

export function BikeShowcaseCarousel({
  productLabel,
  variant = "compact",
}: BikeShowcaseCarouselProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const slides = gallerySlides;
  const len = slides.length;
  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + len) % len);
  }, [len]);
  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % len);
  }, [len]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (dx > 48) goPrev();
    else if (dx < -48) goNext();
  };

  const current = slides[index];
  const isLogo = index === len - 1;

  const isPdp = variant === "pdp";

  return (
    <div
      className={
        isPdp
          ? "relative w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/90"
          : "relative w-full overflow-hidden rounded-md bg-white ring-1 ring-gray-200/90"
      }
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={
          isPdp
            ? "relative mx-auto aspect-square w-full min-h-[260px] sm:min-h-[320px] lg:min-h-[360px]"
            : "relative mx-auto aspect-[4/3] max-h-[min(52vw,200px)] w-full sm:max-h-[220px] lg:max-h-[240px]"
        }
        role="region"
        aria-roledescription="carousel"
        aria-label={`${productLabel} photo gallery`}
      >
        <div
          key={index}
          className={
            isPdp
              ? "absolute inset-0 flex items-center justify-center p-6 sm:p-8 lg:p-10"
              : "absolute inset-0 flex items-center justify-center p-2 sm:p-3"
          }
        >
          <img
            src={current.src}
            alt={`${productLabel} — ${current.alt}`}
            className={`max-h-full max-w-full object-contain object-center ${
              isLogo ? (isPdp ? "max-h-[78%] max-w-[88%]" : "max-h-[72%] max-w-[85%]") : ""
            }`}
            draggable={false}
          />
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1 sm:px-2 lg:px-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              goPrev();
            }}
            className={
              isPdp
                ? "pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-gray-800 shadow-md backdrop-blur-sm transition-colors hover:bg-white sm:h-11 sm:w-11"
                : "pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-gray-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-white sm:h-10 sm:w-10"
            }
            aria-label="Previous image"
          >
            <ChevronLeft
              className={isPdp ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5 sm:h-6 sm:w-6"}
              strokeWidth={2}
            />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              goNext();
            }}
            className={
              isPdp
                ? "pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-gray-800 shadow-md backdrop-blur-sm transition-colors hover:bg-white sm:h-11 sm:w-11"
                : "pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-gray-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-white sm:h-10 sm:w-10"
            }
            aria-label="Next image"
          >
            <ChevronRight
              className={isPdp ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5 sm:h-6 sm:w-6"}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>

      <div
        className={
          isPdp
            ? "flex justify-center gap-2 border-t border-gray-100 py-3 sm:py-3.5"
            : "flex justify-center gap-1.5 border-t border-gray-100 py-2"
        }
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all ${
              isPdp ? "h-2" : "h-1.5"
            } ${
              i === index
                ? isPdp
                  ? "w-6 bg-gray-900"
                  : "w-5 bg-gray-900"
                : isPdp
                  ? "w-2 bg-gray-300 hover:bg-gray-400"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to image ${i + 1} of ${len}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
