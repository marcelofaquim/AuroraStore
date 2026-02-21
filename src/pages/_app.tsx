import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <div className="bg-white text-gray-800">
            <Component {...pageProps} />
            </div>
        </SessionProvider>
    );
}