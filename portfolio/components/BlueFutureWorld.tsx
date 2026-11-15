import Image from "next/image";

export default function BlueFutureWorld() {
  return (
    <div
      aria-hidden="true"
      data-scroll-world
      data-city-zone="hero"
      className="blue-future-world pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        data-world-layer
        className="blue-world-artwork absolute -inset-[8%] origin-center"
      >
        <Image
          src="/blue-future/blue-future-landscape.jpg"
          alt=""
          fill
          sizes="100vw"
          preload
          unoptimized
          className="blue-world-image"
        />
      </div>
      <div className="blue-world-haze absolute inset-0" />
      <div className="blue-world-atmosphere absolute inset-0" />
      <div className="blue-world-zone absolute inset-0 transition-[opacity,background] duration-700" />
    </div>
  );
}
