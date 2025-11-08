import React, { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCornes from "./RoundedCornes";
import Button from "./Button";

export default function Story() {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const element = frameRef.current;
    if (!element) return;

    const { clientX, clientY } = e;
    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (!element) return;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  return (
    <section className="min-h-dvh w-screen bg-black" id="story">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase text-white">
          the multiversal ip world
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="the story of a hidden realm"
            containerClass="text-white mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="object-contain"
                  src="/img/entrance.webp"
                  alt="entrance"
                />
              </div>
            </div>
            <RoundedCornes />
          </div>
        </div>
        <div className="-mt-80 flex w-full md:-mt-64 justify-center md:me-44 md:justify-end">
            <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>
            <Button id='realm-button' title='discover prologue' containerClass='mt-4  bg-white' />
            </div>
        </div>
      </div>
    </section>
  );
}
