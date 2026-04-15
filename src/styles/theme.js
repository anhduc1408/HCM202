// Theme configuration for Triết 2 - Kinh tế chính trị Mác - Lênin website
export const theme = {
  colors: {
    primary: '#9F1239', // Rose 800 - Deep Crimson
    primaryLight: '#E11D48', // Rose 600
    primaryDark: '#881337', // Rose 900
    secondary: '#B45309', // Amber 700 - Deep Gold
    secondaryLight: '#D97706', // Amber 600
    accent: '#0F172A', // Slate 900
    accentLight: '#FBBF24', // Amber 400
    success: '#059669', // Emerald 600
    info: '#2563EB', // Blue 600
    warning: '#EA580C', // Orange 600
    
    // Background colors
    bgPrimary: '#FAFAF9', // Warm White
    bgSecondary: '#F5F5F4', // Slightly darker warm white
    bgDark: '#1C1917', // Stone 900
    bgGradientStart: '#881337', // Deep Crimson
    bgGradientEnd: '#9F1239',
    
    // Text colors
    textPrimary: '#1C1917',
    textSecondary: '#57534E',
    textLight: '#A8A29E',
    textWhite: '#FFFFFF',
    
    // Card and border
    cardBg: '#ffffff',
    border: '#e2e8f0',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  
  fonts: {
    heading: "'Playfair Display', 'Times New Roman', serif",
    body: "'Inter', 'Segoe UI', sans-serif",
    accent: "'Roboto Mono', monospace",
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6 -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
};

export default theme;
