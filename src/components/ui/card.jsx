import React from "react";

export function Card({ className, children, ...props }) {
  return (
    <div 
      className={`bg-gray-900 rounded-lg border border-gray-800 shadow-md overflow-hidden ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={`p-6 pb-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={`text-xl font-bold text-green-light ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={`text-gray-400 mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={`p-6 pt-3 ${className}`} {...props}>
      {children}
    </div>
  );
}
