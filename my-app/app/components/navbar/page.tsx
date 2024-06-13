"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CircularProgress } from "@nextui-org/react";

export default function Navbar() {
  const router = useRouter();
  const { user, isLoading, error} = useUser();

  if (isLoading) return <CircularProgress aria-label="Loading..." />;
  if (error) return <div>{error.message}</div>;

  console.log(user)
  
  if (user) {
    return (
      <div className="flex bg-void flex-row sticky w-screen gap-x-20 content-between opacity-100 min-h-[10vh]">
        {/*Logo*/}
        <div className="text-stark ml-8 mt-4 h-16 text-6xl col-span-2 w-4/12">
          Project
        </div>
        {/*Main redirects*/}
        <div className="flex justify-self-end text-stark mt-8 h-20 text-4xl -right-0 w-4/12">
          <Link href={"../protected/passwords"}>Passwords</Link>
          <Link href={"../protected/tasklist"}>Tasklist</Link>
        </div>
        {/*Login*/}
        <div className="flex justify-self-end text-stark pt-6 h-20 text-4xl -right-0 w-2/12 gap-x-12">
          <div className="rounded-full bg-jewel pl-4 pr-4 pt-2">
            <Link href={"../api/auth/logout"}>Logout</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-24 bg-void flex-row sticky w-screen gap-x-20 content-between opacity-100">
      {/*Logo*/}
      <div className="text-stark ml-8 mt-4 h-16 text-6xl col-span-2 w-4/12">
        Project
      </div>
      {/*Main redirects*/}
      <div className="flex justify-self-end text-stark mt-8 h-20 text-4xl -right-0 w-4/12">
        <Link href={"../api/auth/login"}>Passwords</Link>
        <Link href={"../protected/tasklist"}>Tasklist</Link>
      </div>
      {/*Login*/}
      <div className="flex justify-self-end text-stark pt-6 h-20 text-4xl -right-0 w-2/12 gap-x-12">
        <div className="pt-2">
          <Link href={"../api/auth/login"}>Login</Link>
        </div>
        <div className="rounded-full bg-jewel pl-4 pr-4 pt-2">
          <Link href={"../api/auth/login"}>Register</Link>
        </div>
      </div>
    </div>
  );
}
