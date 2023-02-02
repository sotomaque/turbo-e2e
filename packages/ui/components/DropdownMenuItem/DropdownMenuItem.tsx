type Props = {
  iconLeft?: React.ReactNode;
  label: string | React.ReactNode;
  onClick: () => void;
};

export const DropdownMenuItem: React.FC<Props> = ({
  iconLeft,
  label,
  onClick,
  ...rest
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm"
      data-test-id="dropdown-menu-item"
      {...rest}
    >
      {iconLeft ? <span className="h-5 w-5">{iconLeft}</span> : null}
      {label}
    </button>
  );
};
