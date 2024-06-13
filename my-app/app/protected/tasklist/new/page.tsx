'use client'

import { NewTaskList } from "@/app/lib/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewListPage() {
    const [nameInput, setNameInput] = useState("")
    const [descInput, setDescInput] = useState("")
    const { user, isLoading, error } = useUser();
    const router = useRouter()

  async function addNewList() {
    const headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + Buffer.from("admin:password").toString("base64")
    );
    headers.append("Content-Type", "application/json")

    const date = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const taskList: NewTaskList = {
        name: nameInput,
        description: descInput,
        date: date,
        userEmail: user?.email!
    }

    const req = await fetch("http://localhost:8080/api/v1/todolist/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(taskList)
    });

    // const res = await req.json()

    console.log(req)

    router.push("./")
  }

  return (
    <>
      <div className="flex w-full flex-wrap justify-around gap-4 pt-10 pl-8 pr-8 pb-[50vh]">
        <Input type="text" variant="bordered" label="name" isRequired onChange={(e) => setNameInput(e.target.value)} />
        <Input type="text" variant="bordered" label="description" onChange={(e) => setDescInput(e.target.value)} />
      </div>
      <div className="flex justify-around">
        <Button className="min-w-[90vh]" color="danger">
          <Link href="./">Back</Link>
        </Button>
        <Button className="min-w-[90vh]" color="success" onClick={() => addNewList()}>Add</Button>
      </div>
    </>
  );
}
