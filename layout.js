import "./globals.css";

export const metadata = {
  title: "Keyeshieh May Sinuto | Aspiring Network Engineer",
  description:
    "Portfolio of Keyeshieh May Sinuto, an aspiring network engineer and BSIT Network Design & Management student.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
