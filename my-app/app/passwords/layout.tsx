import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function PassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <body>{children}</body>
  );
}
