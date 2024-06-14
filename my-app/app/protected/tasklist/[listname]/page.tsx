"use client";

import PriorityCard from "@/app/components/priorityCard/page";
import { Task, TaskList } from "@/app/lib/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  ScrollShadow,
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
  }, []);

  if (isLoading) return <div>Loading...</div>;

  console.log(tasks!.filter((t) => t!.importance.importanceLevels == 2));
  return (
    <>
      <div className="flex flex-wrap flex-row pt-8 ml-8">
        <Link href="./">
          <Button color="danger">Back</Button>
        </Link>
        <div>{tasklist?.name}</div>
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
        <Button className="min-w-[90vh]" color="danger">
          Delete item
        </Button>
      </div>
    </>
  );
}
