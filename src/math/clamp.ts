/**
 * Clamps value between min and max and returns value.
 * @param value The value.
 * @param min The min value.
 * @param max The max value.
 */
export default function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
