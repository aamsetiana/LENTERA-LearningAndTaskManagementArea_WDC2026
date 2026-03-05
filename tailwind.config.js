// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        "lentera-warm": "#FF8B3D", // Warna Warm Orange Lentera
        "lentera-dark": "#2D1810", // Warna Dark Warm Lentera
        "lentera-light": "#FFF4ED", // Warna Light Warm Lentera
        "brand-blue": "#2563eb",
        "brand-dark": "#0f172a",
      },
      borderRadius: {
        bento: "2.5rem",
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in forwards',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        fadeInDown: 'fadeInDown 0.8s ease-out forwards',
        slideInLeft: 'slideInLeft 0.8s ease-out forwards',
        slideInRight: 'slideInRight 0.8s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
};
