"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CircularProgress } from "@nextui-org/react";
import { Password } from "@/app/lib/types";
import { getPasswords } from "@/app/lib/getPasswords";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const [passwords, setPasswords] = useState<Iterable<Password> | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  const { user, isLoading, error } = useUser();

  const getPasswords = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/getPasswords/" + user?.nickname,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (response) {
        const { passwords } = await response.json();
        if (passwords) setPasswords(passwords);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  if (isLoading) return <CircularProgress aria-label="Loading..." />;
  if (error) return <div>{error.message}</div>;
  if (loading) return <CircularProgress aria-label="Loading..." />;

  if (user) {
    return (
      <Select
        items={passwords}
        label="Favorite Animal"
        placeholder="Select an animal"
        className="max-w-xs"
      >
        {(password: Password) => (
          <SelectItem key={password.id}>{password.name}</SelectItem>
        )}
      </Select>
    );
  }
}
