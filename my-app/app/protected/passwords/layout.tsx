import PasswordMenu from "@/app/components/passwordMenu/page";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function PassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="w-1/6 absolute bg-jewel text-stark h-[77.2vh]">
        <PasswordMenu />
      </div>
      <div>{children}</div>
    </div>
  );
}
