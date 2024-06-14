"use client";

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
    const res = await req.json()

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
    )

    const res = await req.json()
    setTasks(res);
    setLoading(false);
  }

  useEffect(() => {
    getTaskList();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  console.log(tasks!.filter((t) => t!.importance.importanceLevels == 2))
  return (
    <>
      <div className="flex flex-wrap flex-row pt-8 ml-8">
        <Link href="./">
          <Button color="danger">Back</Button>
        </Link>
        <div>{tasklist?.name}</div>
      </div>
      <div className="flex flex-wrap flex-row justify-around pt-8">
        <Card className="max-w-[60vh] min-h-[60vh] min-w-[60vh]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Low priority</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar className="h-[55vh]">
              {tasks!.filter((t) => t!.importance.importanceLevels == 1).map((e: Task) => (
                <div key={e!.id}>
                  {e!.name}
                </div>
              ))}
            </ScrollShadow>
          </CardBody>
          <Divider />
        </Card>
        <Card className="max-w-[60vh] min-h-[60vh] min-w-[60vh]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Medium priority</p>
              <p className="text-small text-default-500"></p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar className="h-[55vh]">
            {tasks!.filter((t) => t!.importance.importanceLevels == 2).map((e: Task) => (
                <div key={e!.id}>
                  {e!.name}
                </div>
              ))}
            </ScrollShadow>
          </CardBody>
          <Divider />
        </Card>
        <Card className="max-w-[60vh] min-h-[60vh] min-w-[60vh]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">High priority</p>
              <p className="text-small text-default-500"></p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar className="h-[55vh]">
            {tasks!.filter((t) => t!.importance.importanceLevels == 3).map((e: Task) => (
                <div key={e!.id}>
                  {e!.name}
                </div>
              ))}
            </ScrollShadow>
          </CardBody>
          <Divider />
        </Card>
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
