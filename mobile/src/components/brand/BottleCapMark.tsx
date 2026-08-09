import Svg, { Circle, Path } from 'react-native-svg';

type BottleCapMarkProps = {
  size?: number;
  color?: string;
  showRim?: boolean;
};

function createBottleCapPath() {
  const cx = 110;
  const cy = 110;

  // Real crown caps typically read better with shallow, frequent crimps.
  const flutes = 21;
  const samples = flutes * 8;

  const baseRadius = 99;
  const crimpDepth = 7;

  let path = '';

  for (let i = 0; i <= samples; i++) {
    const angle = (i / samples) * Math.PI * 2;

    // Smooth sinusoidal edge rather than gear-like teeth.
    const radius =
      baseRadius + crimpDepth * Math.cos(flutes * angle);

    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    path +=
      i === 0
        ? `M ${x.toFixed(2)} ${y.toFixed(2)}`
        : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }

  return `${path} Z`;
}

const bottleCapPath = createBottleCapPath();

export function BottleCapMark({
  size = 32,
  color = '#41B39E',
  showRim = false,
}: BottleCapMarkProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
    >
      <Path
        d={bottleCapPath}
        fill={color}
      />

      {showRim && (
        <Circle
          cx="110"
          cy="110"
          r="73"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.35}
          strokeWidth="5"
        />
      )}
    </Svg>
  );
}