import React from 'react';
import { avatarUrl } from '../config/assets';

interface ProfileAvatarProps {
  className?: string;
  imageClassName?: string;
}

export default function ProfileAvatar({
  className = 'w-20 h-20',
  imageClassName = 'object-[center_32%]',
}: ProfileAvatarProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-primary/30 bg-surface-container-high shrink-0 shadow-lg shadow-primary/10 ${className}`}
    >
      <img
        src={avatarUrl}
        alt="Rishabh Kharbanda — Senior Marketing Analyst"
        className={`w-full h-full object-cover ${imageClassName}`}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />
    </div>
  );
}
