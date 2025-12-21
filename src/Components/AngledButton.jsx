const AngledButton = ({ text, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        btn btn-primary
        btn-angled
        px-10 py-4
        font-bold uppercase tracking-wide
        text-white
        hover:opacity-90
        transition-all duration-300
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default AngledButton;
