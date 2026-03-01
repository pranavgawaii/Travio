"use client"

import Image from "next/image";
import * as React from "react";

import { normalizeRemoteImage } from "@shared/media";

export interface AvatarGroupProps {
    avatars: { src: string; alt?: string; label?: string }[];
    maxVisible?: number;
    size?: number;
    overlap?: number;
    customExtraCount?: number;
    extraCountClassName?: string;
}

const AvatarGroup = ({
    avatars,
    maxVisible = 5,
    size = 40,
    overlap = 14,
    customExtraCount,
    extraCountClassName,
}: AvatarGroupProps) => {
    const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);
    const visibleAvatars = avatars.slice(0, maxVisible);
    const extraCount = customExtraCount !== undefined ? customExtraCount : avatars.length - maxVisible;

    return (
        <div className="flex items-center">
            <div className="flex">
                {visibleAvatars.map((avatar, idx) => {
                    const isHovered = hoveredIdx === idx;
                    const resolvedSrc = normalizeRemoteImage(avatar.src, Math.max(size * 2, 96), 65);

                    return (
                        <div
                            key={`${avatar.src}-${idx}`}
                            className="group relative shrink-0 rounded-full border-2 border-white bg-white shadow-sm transition-transform duration-300"
                            style={{
                                width: size,
                                height: size,
                                marginLeft: idx === 0 ? 0 : -overlap,
                                zIndex: isHovered ? 100 : visibleAvatars.length - idx,
                                transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                            }}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        >
                            <div className="relative h-full w-full overflow-hidden rounded-full">
                                <Image
                                    src={resolvedSrc}
                                    alt={avatar.alt || `Avatar ${idx + 1}`}
                                    fill
                                    sizes={`${size}px`}
                                    className="object-cover"
                                    draggable={false}
                                />
                            </div>
                            {avatar.label && (
                                <div
                                    className="pointer-events-none absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100"
                                    style={{
                                        top: -size * 0.8,
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    {avatar.label}
                                    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900" />
                                </div>
                            )}
                        </div>
                    );
                })}
                {extraCount > 0 && (
                    <div
                        className={`flex shrink-0 items-center justify-center rounded-full border-2 border-white bg-slate-100 font-semibold text-slate-700 shadow-sm ${extraCountClassName || ""}`}
                        style={{
                            width: size,
                            height: size,
                            marginLeft: -overlap,
                            zIndex: 0,
                            fontSize: size * 0.35,
                        }}
                    >
                        +{extraCount}
                    </div>
                )}
            </div>
        </div>
    );
};

export { AvatarGroup };
