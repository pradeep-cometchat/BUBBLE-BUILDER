/**
 * Material Symbols Outlined icon component.
 * Requires the Google Material Symbols font loaded in index.html.
 */
const M = ({ icon, className = '', size = 22, filled = false }) => (
  <span
    className={`material-symbols-outlined select-none leading-none ${className}`}
    style={{
      fontSize: size,
      fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
    }}
  >
    {icon}
  </span>
);

export default M;
