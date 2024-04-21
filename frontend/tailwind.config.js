/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                shade1: "#F8F9FA",
                shade2: "#E9ECEF",
                shade3: "#DEE2E6",
                shade4: "#CED4DA",
                shade5: "#ADB5BD",
                shade6: "#6C757D",
                shade7: "#495057",
                shade8: "#343A40",
                shade9: "#212529",
            },
        },
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
        },
    },
    plugins: [],
};

