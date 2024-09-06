import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import SessionProvider from "./components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HookWrap",
  description: "Unlock the power of AI to create compelling and engaging hooks for your social media content. Our AI-driven tool crafts hooks that resonate with your audience, making your posts feel as authentic as those written by a human. Boost your engagement, attract more followers, and watch your social media presence soar with expertly designed hooks tailored to captivate and convert.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider>
      <StoreProvider>
        {children}
        </StoreProvider>
       </SessionProvider>
        </body>
    </html>
  );
}
