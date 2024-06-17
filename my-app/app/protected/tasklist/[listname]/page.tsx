"use client";

import PriorityCard from "@/app/components/priorityCard/page";
import { deleteRequestCall } from "@/app/lib/APICalls";
import { Task, TaskList } from "@/app/lib/types";
import {
  Button,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Tasklist({ params }: { params: { listname: string } }) {
  const [tasklist, setTaskList] = useState<TaskList>();
  const [tasks, setTasks] = useState<[Task]>();
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + Buffer.from("admin:password").toString("base64")
  );

  async function deleteList() {
    await deleteRequestCall("http://localhost:8080/api/v1/todolist/" + params.listname)
    router.push("/protected/tasklist")
  }

  async function getTaskList() {
    const req = await fetch(
      "http://localhost:8080/api/v1/todolist/" + params.listname,
      {
        cache: "no-store",
        method: "GET",
        headers: headers,
      }
    );
    const res = await req.json();

    setTaskList(res);
    getTasksSorted(res);
  }

  async function getTasksSorted(list: TaskList) {
    const req = await fetch(
      "http://localhost:8080/api/v1/todoitem/list/" + list.id + "/sorted",
      {
        cache: "no-store",
        method: "GET",
        headers: headers,
      }
    );

    const res = await req.json();
    setTasks(res);
    setLoading(false);
  }

  useEffect(() => {
    getTaskList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-wrap flex-row pt-8 ml-8">
        <Link href="./">
          <Button color="danger">Back</Button>
        </Link>
        <div className="place-self-center pl-[78vh] pr-[81vh] text-5xl">{tasklist?.name}</div>
        <Button className="" color="danger" onClick={() => deleteList()}>Delete</Button>
      </div>
      <div className="flex flex-wrap flex-row justify-around pt-8">
        <PriorityCard priority="Low" tasks={tasks} />
        <PriorityCard priority="Medium" tasks={tasks} />
        <PriorityCard priority="High" tasks={tasks} />
      </div>
      <div className="flex flex-wrap flex-row justify-around mt-4 mb-4">
        <Button
          className="min-w-[90vh]"
          color="success"
          onClick={() => router.push(params.listname + "/new")}
        >
          Add new item
        </Button>
      </div>
    </>
  );
}
