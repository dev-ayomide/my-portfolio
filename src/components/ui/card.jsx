export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-primary)',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={`p-6 pb-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }) {
  return (
    <h3
      className={`text-xl font-bold font-display ${className}`}
      style={{ color: 'var(--accent-primary)' }}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className = '', children, ...props }) {
  return (
    <p
      className={`mt-1 text-sm ${className}`}
      style={{ color: 'var(--text-secondary)' }}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`p-6 pt-3 ${className}`} {...props}>
      {children}
    </div>
  );
}
