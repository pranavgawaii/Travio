"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { normalizeRemoteImage } from "@shared/media";
import { cn } from "@shared/utils";

type Direction = "left" | "right";

type PhotoItem = {
    id: number;
    direction: Direction;
    src: string;
    label: string;
};

const BASE_PHOTOS: PhotoItem[] = [
    {
        id: 1,
        direction: "left",
        src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
        label: "Paris",
    },
    {
        id: 2,
        direction: "right",
        src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
        label: "Santorini",
    },
    {
        id: 3,
        direction: "left",
        src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
        label: "Goa Beach",
    },
    {
        id: 4,
        direction: "right",
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
        label: "Swiss Alps",
    },
    {
        id: 5,
        direction: "left",
        src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
        label: "Bali Jungle",
    },
    {
        id: 6,
        direction: "right",
        src: "https://images.unsplash.com/photo-1512100356956-c12872638f59?auto=format&fit=crop&w=600&q=80",
        label: "Maldives",
    },
    {
        id: 7,
        direction: "left",
        src: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=600&q=80",
        label: "Iceland",
    },
];

const ROTATIONS: Record<Direction, string[]> = {
    left: ["-2deg", "-3deg", "-1.5deg", "-2.5deg"],
    right: ["2deg", "3deg", "1.5deg", "2.5deg"],
};

export const PhotoGallery = () => {
    const [isReady, setIsReady] = useState(false);
    const marqueePhotos = useMemo(() => [...BASE_PHOTOS, ...BASE_PHOTOS], []);

    useEffect(() => {
        const timer = window.setTimeout(() => setIsReady(true), 150);
        return () => window.clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full overflow-hidden border-0 pb-24 pt-16">
            <div className="absolute inset-0 top-[50px] -z-10 hidden h-[400px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5 [mask-image:radial-gradient(ellipse_100%_50%_at_50%_0%,#000_80%,transparent_120%)] max-md:hidden"></div>

            <h3 className="z-20 mx-auto max-w-5xl justify-center py-4 text-center text-4xl font-bold tracking-tighter text-slate-800 md:text-6xl" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Built for every type of trip
                <br />
                <span className="mt-3 block text-3xl text-[#0066FF] opacity-90 md:text-5xl">From weekend getaways to month-long expeditions.</span>
            </h3>

            <div className="relative mt-12 flex h-[320px] w-full items-center overflow-hidden">
                <div className={cn("gallery-marquee flex gap-6 pr-6", isReady && "gallery-marquee-ready")}>
                    {marqueePhotos.map((photo, index) => (
                        <div key={`${photo.id}-${index}`} className="flex-none">
                            <Photo
                                width={240}
                                height={240}
                                src={photo.src}
                                alt={photo.label}
                                direction={photo.direction}
                                rotation={ROTATIONS[photo.direction][index % ROTATIONS[photo.direction].length]}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const Photo = ({
    src,
    alt,
    className,
    direction,
    rotation,
    width,
    height,
}: {
    src: string;
    alt: string;
    className?: string;
    direction?: Direction;
    rotation: string;
    width: number;
    height: number;
}) => {
    const tiltDirection = direction === "left" ? "1.5deg" : "-1.5deg";

    return (
        <div
            style={{
                width,
                height,
            }}
            className={cn(
                "group relative shrink-0 cursor-pointer rounded-xl border border-slate-100 bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:z-20 hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
                className,
            )}
        >
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image
                    className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    src={alt === 'Maldives' ? src : normalizeRemoteImage(src, 400, 65)}
                    alt={alt}
                    draggable={false}
                    sizes="240px"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white opacity-0 drop-shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                        {alt}
                    </span>
                </div>
            </div>
        </div>
    );
};
