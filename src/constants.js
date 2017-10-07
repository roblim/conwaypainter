const CONSTANTS = {
  HEX_IN_ANGLE: (Math.PI * 2) / 6,
  HEX_START_ANGLE: (Math.PI / 6),
  TWO_PI: Math.PI * 2,
  RUN: 'RUN',
  RING: 'RING',
  DEFAULT: 'DEFAULT',
  INSPECT: 'INSPECT',
  NEIGHBORS: [
    [0, -1],
    [1, -1],
    [1, 0],
    [0, 1],
    [-1, 1],
    [-1, 0]
  ]
};

export default CONSTANTS;
