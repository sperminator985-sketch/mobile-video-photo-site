type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const POSITION: Record<Corner, string> = {
  'top-left': 'top-0 left-0 -scale-x-100',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0 -scale-x-100',
  'bottom-right': 'bottom-0 right-0',
};

interface RoseCornerProps {
  corner: Corner;
  variant?: 'pink' | 'white';
}

const RoseCorner = ({ corner, variant = 'pink' }: RoseCornerProps) => (
  <img
    src={`/assets/roses-corner-${variant}.webp`}
    alt=""
    aria-hidden="true"
    className={`hidden md:block absolute z-0 ${POSITION[corner]} w-[150px] lg:w-[190px] h-auto mix-blend-multiply opacity-90 pointer-events-none select-none`}
  />
);

export default RoseCorner;
