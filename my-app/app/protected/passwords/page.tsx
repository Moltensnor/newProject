'use client'

import SearchBox from "@/app/components/searchBar/searchBar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CircularProgress } from "@nextui-org/react";

export default function PassHomePage() {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <SearchBox/>
    </>
  );
}
