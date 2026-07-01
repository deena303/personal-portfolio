import { useMemo, memo } from 'react';
import './SmoothMarquee.css';

/**
 * SmoothMarquee
 * Pure CSS @keyframes marquee — GPU compositor thread, zero JS during scroll.
 * Technique: duplicate the logos array → animate translateX(0 → -50%) → seamless loop.
 */
const SmoothMarquee = memo(({
  logos = [],
  duration = 22,        // seconds for one complete loop
  size = 42,            // icon size in px
  gap = 42,             // gap on each side of an icon (px)
  fadeColor = '#ff2d2d',
}) => {
  // Memoize the duplicated array — never changes, zero re-renders during animation
  const doubled = useMemo(() => [...logos, ...logos], [logos]);

  const cssVars = useMemo(() => ({
    '--marquee-duration': `${duration}s`,
    '--marquee-size': `${size}px`,
    '--marquee-gap': `${gap}px`,
    '--marquee-fade-color': fadeColor,
  }), [duration, size, gap, fadeColor]);

  return (
    <div className="smooth-marquee" style={cssVars} aria-label="Technology Stack" role="region">
      <div className="smooth-marquee__track">
        {doubled.map((logo, i) => (
          <span
            key={i}
            className="smooth-marquee__item"
            title={logo.title}
            aria-label={logo.title}
          >
            {logo.node}
          </span>
        ))}
      </div>
    </div>
  );
});

SmoothMarquee.displayName = 'SmoothMarquee';

export default SmoothMarquee;
