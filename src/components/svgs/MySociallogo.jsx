const MySocialLogo = (props) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    {/* Chat bubble shape */}
    <path
      d="M12 2C6.48 2 2 6.02 2 11c0 2.04.78 3.92 2.08 5.46L3 22l5.79-2.1C9.49 20.62 10.73 21 12 21c5.52 0 10-4.02 10-9S17.52 2 12 2z"
      className="fill-current text-primary"
    />
    {/* Two connected people icons */}
    <circle cx="9" cy="11" r="1.5" className="fill-neutral-content" />
    <circle cx="15" cy="11" r="1.5" className="fill-neutral-content" />
    <path
      d="M9 14c-1.5 0-2.5.75-3 1.5.5.75 1.5 1.5 3 1.5s2.5-.75 3-1.5c-.5-.75-1.5-1.5-3-1.5zm6 0c-1.5 0-2.5.75-3 1.5.5.75 1.5 1.5 3 1.5s2.5-.75 3-1.5c-.5-.75-1.5-1.5-3-1.5z"
      className="fill-neutral-content"
    />
  </svg>
);

export default MySocialLogo;
