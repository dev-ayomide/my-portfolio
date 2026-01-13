export function Badge({ variant = 'default', className = '', children, ...props }) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          background: 'var(--bg-tertiary)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-primary)',
        };
      case 'accent':
        return {
          background: 'rgba(16, 185, 129, 0.1)',
          color: 'var(--accent-primary)',
          border: '1px solid transparent',
        };
      case 'electric':
        return {
          background: 'rgba(6, 182, 212, 0.1)',
          color: '#06b6d4',
          border: '1px solid transparent',
        };
      default:
        return {
          background: 'var(--accent-primary)',
          color: 'white',
          border: '1px solid transparent',
        };
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-lg transition-all duration-300 ${className}`}
      style={getVariantStyles()}
      {...props}
    >
      {children}
    </span>
  );
}
