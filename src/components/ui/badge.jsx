import React from "react";

export function Badge({ variant = "default", className, children, ...props }) {
  const variantClasses = {
    default: "bg-green-primary text-white",
    secondary: "bg-gray-800 text-gray-300",
  };

  return (
    <span 
      className={`px-2 py-1 text-xs rounded-md ${variantClasses[variant]} ${className}`} 
      {...props}
    >
      {children}
    </span>
  );
}
