"use client";

import {
  deleteRequestCall,
  getRequestCall,
  postRequestCall,
} from "@/app/lib/APICalls";
import { Importance, NewImportance, Task, TaskList } from "@/app/lib/types";
import { Button, Input, Link, Radio, RadioGroup } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemInfoPage({
  params,
}: {
  params: { listname: string; itemname: string };
}) {
  const [itemName, setItemName] = useState("");
  const [desc, setDesc] = useState("");
  const [radioValue, setRadioValue] = useState("Medium");
  const [weight, setWeight] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [listId, setListId] = useState<number>();
  const [itemId, setItemId] = useState<string>();
  const [task, setTask] = useState<Task>();
  const [list, setList] = useState<TaskList>();
  const router = useRouter();

  async function editItem() {
    const imp: Importance = await getImportanceIfExists();
    const newTask: Task = {
      ...task,
      id: itemId!,
      name: itemName,
      description: desc,
      importance: imp,
      todoList: list!,
      complete: task!.complete,
    };
    await postRequestCall("http://localhost:8080/api/v1/todoitem/", newTask);
    router.push(`/protected/tasklist/${listId}`);
  }

  async function getImportanceIfExists() {
    var weightNumber = parseInt(weight, 10);

    const headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + Buffer.from("admin:password").toString("base64")
    );

    if (Number.isNaN(weightNumber)) {
      weightNumber = 1;
    }
    var importanceNumber: number = 2;

    switch (radioValue) {
      case "Low":
        importanceNumber = 1;
        break;
      case "Medium":
        importanceNumber = 2;
        break;
      case "High":
        importanceNumber = 3;
        break;
    }

    const req = await fetch(
      "http://localhost:8080/api/v1/importance/" +
        weightNumber +
        "/" +
        importanceNumber,
      {
        cache: "no-store",
        method: "GET",
        headers: headers,
      }
    );

    if (req.status == 400) {
      console.log("Adding new importance");
      return createImportance(weightNumber, importanceNumber);
    } else {
      const res = await req.json();
      setLoading(false);
      return res;
    }
  }

  async function createImportance(
    weightNumber: number,
    importanceNumber: number
  ) {
    const newImportance: NewImportance = {
      weight: weightNumber,
      importanceLevels: importanceNumber,
    };

    const req = await postRequestCall(
      "http://localhost:8080/api/v1/importance/",
      newImportance
    );
    return req;
  }

  async function deleteItem() {
    deleteRequestCall("http://localhost:8080/api/v1/todoitem/item/" + itemId);
    router.push(`/protected/tasklist/${listId}`);
  }

  async function markAsDone(done: boolean) {
    var completeTask = {
      ...task,
      complete: done,
    };
    console.log(completeTask);
    postRequestCall("http://localhost:8080/api/v1/todoitem/", completeTask);
    router.push(`/protected/tasklist/${listId}`);
  }

  async function getData() {
    const taskList: TaskList = await getRequestCall(
      "http://localhost:8080/api/v1/todolist/" + params.listname
    );
    const taskItem: Task = await getRequestCall(
      "http://localhost:8080/api/v1/todoitem/item/" + params.itemname
    );

    setItemName(taskItem!.name);
    setDesc(taskItem!.description);
    setWeight(String(taskItem!.importance.weight));
    setListId(taskItem!.todoList.id);
    setItemId(taskItem!.id);
    setTask(taskItem);
    setList(taskList);
    switch (taskItem!.importance.importanceLevels) {
      case 1:
        setRadioValue("Low");
        break;
      case 2:
        setRadioValue("Medium");
        break;
      case 3:
        setRadioValue("High");
        break;
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex w-full flex-wrap justify-around gap-4 pt-10 pl-8 pr-8 pb-[10vh]">
        <Input
          type="text"
          variant="bordered"
          label="name"
          value={itemName}
          isRequired
          onChange={(e) => setItemName(e.target.value)}
        />
        <Input
          type="text"
          variant="bordered"
          label="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Input
          type="text"
          variant="bordered"
          label="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <RadioGroup
          label="Select the importance"
          orientation="horizontal"
          value={radioValue}
          onChange={(e) => setRadioValue(e.target.value)}
        >
          <Radio color="success" value="Low">
            Low
          </Radio>
          <Radio color="warning" value="Medium">
            Medium
          </Radio>
          <Radio color="danger" value="High">
            High
          </Radio>
        </RadioGroup>
      </div>
      <div className="pb-[20vh] flex justify-around">
        <Button
          className="min-w-[90vh]"
          color="danger"
          onClick={() => deleteItem()}
        >
          Delete
        </Button>
        {task!.complete ? (
          <Button className="min-w-[90vh]" onClick={() => markAsDone(false)}>
            Mark as not completed
          </Button>
        ) : (
          <Button
            className="min-w-[90vh]"
            color="success"
            onClick={() => markAsDone(true)}
          >
            Mark as completed
          </Button>
        )}
      </div>
      <div className="flex justify-around pb-4">
        <Button className="min-w-[90vh]" color="danger">
          <Link href="./">Back</Link>
        </Button>
        <Button
          className="min-w-[90vh]"
          color="success"
          onClick={() => editItem()}
        >
          Edit
        </Button>
      </div>
    </>
  );
}
