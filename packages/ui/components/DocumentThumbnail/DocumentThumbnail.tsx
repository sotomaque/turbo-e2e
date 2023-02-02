import React from 'react';

type Props = {
  src: string;
  className?: string;
};

export const DocumentThumbnail: React.FC<Props> = ({ src, className = '' }) => {
  if (src?.length > 0) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={className} src={src} alt="Document thumbnail" />;
  }
  return (
    <svg
      className={`min-h-64 cursor-pointer border-b border-gray-100 bg-white text-gray-300 ${className}`}
      preserveAspectRatio="none"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <path
        vectorEffect="non-scaling-stroke"
        strokeWidth={1}
        d="M0 0l200 200M0 200L200 0"
      />
    </svg>
  );
};
