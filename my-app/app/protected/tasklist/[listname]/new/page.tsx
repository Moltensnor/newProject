"use client";

import { Importance, NewImportance, NewTask, TaskList } from "@/app/lib/types";
import { Button, Input, Link, Radio, RadioGroup } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewListItem({
  params,
}: {
  params: { listname: string };
}) {
  const [itemName, setItemName] = useState("");
  const [desc, setDesc] = useState("");
  const [importance, setImportance] = useState<Importance>();
  const [radioValue, setRadioValue] = useState("Medium");
  const [weight, setWeight] = useState("");
  const [taskList, setTaskList] = useState<TaskList>();
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  var imp: Importance = {
    id: 202,
    weight: 1,
    importanceLevels: 2,
  }

  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + Buffer.from("admin:password").toString("base64")
  );
  const postHeader = headers;
  postHeader.append("Content-Type", "application/json");

  async function addNewItem() {
    await getImportanceIfExists();
    await getTaskList();

    var taskListItem: NewTask = {
      name: itemName,
      description: desc,
      importance: imp,
      todoList: taskList!,
    };

    console.log(taskListItem);

    const req = await fetch("http://localhost:8080/api/v1/todoitem/", {
      method: "POST",
      headers: postHeader,
      body: JSON.stringify(taskListItem),
    });

    // console.log(req)

    router.push("./");
  }

  async function getImportanceIfExists() {
    var weightNumber = parseInt(weight, 10);

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
      createImportance(weightNumber, importanceNumber);
    } else {
      const res = await req.json();
      console.log(imp)
      setImportance(imp);
      imp = res
      console.log(importance);
      setLoading(false);
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

    const req = await fetch("http://localhost:8080/api/v1/importance/", {
      method: "POST",
      headers: postHeader,
      body: JSON.stringify(newImportance),
    });
    const res = await req.json();
    imp = res
    setImportance(res);
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
    setLoading(false);
  }

  useEffect(() => {
    getTaskList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex w-full flex-wrap justify-around gap-4 pt-10 pl-8 pr-8 pb-[50vh]">
        <Input
          type="text"
          variant="bordered"
          label="name"
          isRequired
          onChange={(e) => setItemName(e.target.value)}
        />
        <Input
          type="text"
          variant="bordered"
          label="description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <Input
          type="text"
          variant="bordered"
          label="Weight"
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
      <div className="flex justify-around">
        <Button className="min-w-[90vh]" color="danger">
          <Link href="./">Back</Link>
        </Button>
        <Button
          className="min-w-[90vh]"
          color="success"
          onClick={() => addNewItem()}
        >
          Add
        </Button>
      </div>
    </>
  );
}
