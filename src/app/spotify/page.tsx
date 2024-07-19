'use client';
import React from 'react';
import NowPlaying from '@/app/api/spotify/NowPlaying';
import { SparklesCore } from "@/components/ui/sparkles"
import { Vortex } from "@/components/ui/vortex"

const AboutPage: React.FC = () => {
    return (
        <div className='bg-black h-screen w-full overflow-hidden'>
            <div className='flex justify-center items-center h-full'>
                <div className="w-full absolute inset-0 h-screen z-[1]">
                    {/* <SparklesCore
                        id="tsparticlesfullpage"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        className="w-full h-full"
                        particleColor="#ff9043"
                    /> */}
                    <Vortex
                    backgroundColor="black"
                    rangeY={800}
                    particleCount={500}
                    baseHue={20}
                    className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
                  ></Vortex>
                </div>
                <div className='z-[2] flex flex-col px-4 md:px-10 w-full'>
                    <NowPlaying />
                    
                   
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
