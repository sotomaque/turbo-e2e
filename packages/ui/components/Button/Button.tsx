import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { Spinner } from '../Spinner';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
};

const buttonStyles = cva(
  [
    'inline-flex',
    'justify-center',
    'leading-5',
    'rounded-xl',
    'items-center',
    'font-semibold',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: ['bg-ebgreen-600', 'hover:bg-ebgreen-700', 'text-white'],
        secondary: [
          'bg-ebbeige-100',
          'text-ebgreen-600',
          'hover:bg-ebbeige-200',
          'hover:text-ebgreen-700',
        ],
        outlined: [
          'border',
          'border-ebgreen-600',
          'text-ebgreen-600',
          'hover:border-ebgreen-700',
          'hover:text-ebgreen-700',
        ],
        text: ['text-ebgreen-600', 'hover:text-ebgreen-700'],
      },
      size: {
        small: ['text-sm', 'py-2', 'px-3.5', 'h-9'],
        medium: ['text-sm', 'py-2.5', 'px-4', 'h-10'],
        large: ['text-base', 'py-2.5', 'px-4', 'h-11'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

export const Button: React.FC<Props> = ({
  children,
  iconLeft,
  iconRight,
  fullWidth = false,
  size,
  variant,
  href,
  onClick,
  className,
  disabled,
  isLoading,
  ...rest
}) => {
  const buttonClasses = buttonStyles({
    variant,
    size,
    className: `${className || ''} ${fullWidth ? 'w-full' : ''}`,
  });

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses}>
        {iconLeft && <span className="mr-2 h-5 w-5">{iconLeft}</span>}
        <span {...rest}>{children}</span>
        {iconRight && <span className="ml-2 h-5 w-5">{iconRight}</span>}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <Spinner size="small" />}
      {iconLeft && <span className="mr-2 h-5 w-5">{iconLeft}</span>}
      {!isLoading && <span>{children}</span>}
      {iconRight && <span className="ml-2 h-5 w-5">{iconRight}</span>}
    </button>
  );
};
