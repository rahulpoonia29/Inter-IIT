import "./globals.css";
import ReactQueryProvider from "./store/react-query";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ReactQueryProvider>
                <body className={` antialiased font-mono`}>{children}</body>
            </ReactQueryProvider>
        </html>
    );
}
