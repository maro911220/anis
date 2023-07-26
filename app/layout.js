import "./globals.css";
import Header from "./header";

// metadata
export const metadata = {
  title: "maro Anis",
  description: "ani api(jikan) study",
  keywords: ["ani"],
  metadataBase: new URL("https://maroanis.netlify.app"),
  openGraph: {
    title: "maro Anis",
    siteName: "maro Anis",
    url: "https://maroanis.netlify.app",
    description: "ani api(jikan) study",
    images: "/tumb.jpg",
    type: "website",
  },
};

// style
const bodyStyle = "overflow-y-scroll bg-white dark:bg-neutral-800";
const mainStyle =
  "pt-28 md:pt-20 max-w-screen-2xl m-auto flex gap-4 overflow-hidden";
const sectionStyle = "w-full flex-1 relative px-2 md:px-4";

// RootLayout
export default function RootLayout({ children }) {
  return (
    <html lang="en" className=" ">
      <body className={bodyStyle}>
        <Header />
        <main className={mainStyle}>
          <h1 className="hidden">Content</h1>
          <section className={sectionStyle}>{children}</section>
        </main>
      </body>
    </html>
  );
}
