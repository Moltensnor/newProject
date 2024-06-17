"use client";

import { CostList, TaskList } from "@/app/lib/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";

export default function TasklistHomePage() {
  const [loading, setLoading] = useState(true);
  const [costLists, setCostLists] = useState<[CostList]>();
  const { user, isLoading, error } = useUser();
  const router = useRouter()

  const onSelectionChange = (taskListId: Key) => {
    router.push("./costCalculator/" + taskListId)
  }

  async function getData() {
    const headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + Buffer.from(process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD).toString("base64")
    );

    const req = await fetch("http://localhost:8080/api/v1/costlist/", {
      cache: "no-store",
      method: "GET",
      headers: headers,
    });
    const res = await req.json();
    console.log(res);
    setCostLists(res);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap justify-around gap-4 pt-10">
        <Autocomplete
          variant="bordered"
          color="primary"
          label="Select a cost list"
          className="max-w-[140vh]"
          onSelectionChange={onSelectionChange}
        >
          {costLists!.map((tasklist) => (
            <AutocompleteItem key={tasklist.id} value={tasklist.id}>
              {tasklist.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <div className="flex flex-wrap flex-row justify-around pt-[50vh] pb-8">
        <Link href="/protected/costCalculator/new">
          <Button color="success">add new list</Button>
        </Link>
      </div>
    </>
  );
}