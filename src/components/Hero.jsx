import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [currentIndex, setcurrentIndex] = useState(1);
  const [hahsClicked, sethahsClicked] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  const totalVideos = 4;
  const currentVdRef = useRef(null);
  const nextVdRef = useRef(null);

  const handleVdLoaded = () => {
    setLoadedCount(prev => prev + 1);
  };

  useEffect(() => {
    if (loadedCount === totalVideos -1) setisLoading(false);
  }, [loadedCount]);

  const upComingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMinVdClick = () => {
    sethahsClicked(true);
    setcurrentIndex(upComingVideoIndex);
  };

  const getVdSrc = (index) => `/videos/hero-${index}.mp4`;

  useGSAP(() => {
    if (hahsClicked) {
      gsap.set('#next-video', { visibility: 'visible' });
      gsap.to('#next-video', {
        transformOrigin: 'center center',
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => nextVdRef.current?.play(),
      });

      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    }
  }, { dependencies: [currentIndex], revertOnUpdate: true });

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
    });

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'power1.inOut',
      scrollTrigger: {
        start: 'center center',
        trigger: '#video-frame',
        end: 'bottom center',
        scrub: true,
      },
    });
  });

  return (
    <div id="hero" className="relative h-dvh overflow-x-hidden w-screen">
      {isLoading && (
        <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
          <div className='three-body'>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div id='video-frame' className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMinVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={currentVdRef}
                loop
                src={getVdSrc(upComingVideoIndex)}
                muted
                id='current-video'
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVdLoaded}
              />
            </div>
          </div>

          <video
            ref={nextVdRef}
            src={getVdSrc(currentIndex)}
            loop
            muted
            id='next-video'
            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
            onLoadedData={handleVdLoaded}
          />

          <video
            src={getVdSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            loop
            autoPlay
            muted
            className='absolute left-0 top-0 size-full object-cover object-center'
            onLoadedData={handleVdLoaded}
          />
        </div>

        <h1 className='special-font hero-heading absolute bottom-5 right-5 text-blue-75 z-50'>
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className='special-font hero-heading text-blue-100'>
              redefi<b>n</b>e
            </h1>
            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
              Enter the Metagme Layer <br />Unleash the Play Economy
            </p>

            <Button
              id='watch-trailer'
              title='Watch Trailer'
              leftIcon={<TiLocationArrow />}
              containerClass='!bg-yellow-300 flex-center gap-1'
            />
          </div>
        </div>
      </div>

      <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>
        G<b>a</b>ming
      </h1>
    </div>
  );
}
