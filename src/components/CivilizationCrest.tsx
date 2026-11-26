import React from 'react';
import type { CivilizationId, SpecialKind } from '../types/game';

interface CrestProps {
  civilization: CivilizationId;
  className?: string;
}

export const CivilizationCrest: React.FC<CrestProps> = ({ civilization, className = 'w-6 h-6' }) => {
  switch (civilization) {
    case 'mesopotamia':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M4 25H28V20H4V25Z"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 20H24.5V15H7.5V20Z"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 15H20.5V10H11.5V15Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M16 5.5L18 10H14L16 5.5Z" fill="currentColor" />
        </svg>
      );
    case 'egipto':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M3 25L12.5 9L22 25H3Z"
            fill="currentColor"
            fillOpacity="0.18"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 25L23 14L29 25H16.5Z"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="23.5" cy="7.5" r="2.6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 25H30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'america':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M4 26H28L25 21H7L4 26Z"
            fill="currentColor"
            fillOpacity="0.22"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 21H24.5L22 16H10L7.5 21Z"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M11 16H21L19.5 11H12.5L11 16Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <rect x="13" y="6.5" width="6" height="4.5" rx="0.8" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16" cy="4" r="1.4" fill="currentColor" />
        </svg>
      );
    case 'india':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <circle
            cx="16"
            cy="16"
            r="10.5"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M16 5.5V13M16 19V26.5M5.5 16H13M19 16H26.5M8.6 8.6L13.8 13.8M18.2 18.2L23.4 23.4M23.4 8.6L18.2 13.8M13.8 18.2L8.6 23.4"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'arabia':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect
            x="8"
            y="8"
            width="16"
            height="16"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <rect
            x="8"
            y="8"
            width="16"
            height="16"
            transform="rotate(45 16 16)"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="16" cy="16" r="2.2" fill="currentColor" />
        </svg>
      );
  }
};

export const SpecialCrest: React.FC<{ kind: SpecialKind; className?: string }> = ({
  kind,
  className = 'w-5 h-5',
}) => {
  switch (kind) {
    case 'puente':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M3 16H21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path
            d="M5 16C5 11.5 8 8.5 12 8.5C16 8.5 19 11.5 19 16"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M14 5L18 8.5L14 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};
