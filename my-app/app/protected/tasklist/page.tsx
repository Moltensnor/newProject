"use client";

import { TaskList } from "@/app/lib/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function TasklistHomePage() {
  const [loading, setLoading] = useState(true);
  const [taskLists, setTaskLists] = useState<[TaskList]>([
    { id: -1, name: "", userEmail: "", date: "", description: "" },
  ]);
  const { user, isLoading, error } = useUser();

  async function getData() {
    const headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + Buffer.from("admin:password").toString("base64")
    );
    const req = await fetch("http://localhost:8080/api/v1/todolist/", {
      cache: "no-store",
      method: "GET",
      headers: headers,
    });
    const res = await req.json();
    console.log(res);
    setTaskLists(res);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap justify-around gap-4 pt-10">
      <Autocomplete variant="bordered" color="primary" label="Select a tasklist" className="max-w-[140vh]">
        {taskLists.map((tasklist) => (
          <AutocompleteItem key={tasklist.id} value={tasklist.id}>
            {tasklist.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
