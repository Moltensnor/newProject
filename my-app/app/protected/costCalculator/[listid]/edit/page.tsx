"use client";

import { getRequestCall, postRequestCall } from "@/app/lib/APICalls";
import { CostList, NewCostList } from "@/app/lib/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Input, Link, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCostListPage({
  params,
}: {
  params: { listid: string };
}) {
  const [nameInput, setNameInput] = useState("");
  const [description, setDescription] = useState("");
  const [budgetInput, setBudgetInput] = useState(0);
  const [costList, setCostList] = useState<CostList>();
  const [loading, setLoading] = useState(true);
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  async function addNewList() {
    const date = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var budget: number | undefined = undefined;

    if (budgetInput !== 0 || !Number.isNaN(budgetInput)) {
      budget = budgetInput;
    }

    const newCostList: CostList = {
      id: costList!.id,
      name: nameInput,
      date: date,
      desription: description,
      userEmail: user?.email!,
      budget: budget,
    };

    postRequestCall("http://localhost:8080/api/v1/costlist/", newCostList);
    router.push("/protected/costCalculator");
  }

  async function getListData() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/" + params.listid
    );
    setCostList(req);
    setNameInput(req.name)
    setBudgetInput(req.budget)
    setDescription(req.description)
    setLoading(false);
  }

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex w-full flex-wrap justify-around gap-4 pt-10 pl-8 pr-8 pb-[40vh]">
        <Input
          type="text"
          variant="bordered"
          label="name"
          isRequired
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <Input
          type="number"
          variant="bordered"
          label="budget"
          isRequired
          value={budgetInput as unknown as string}
          onChange={(e) => setBudgetInput(parseInt(e.target.value))}
        />
        <Textarea
          type="text"
          variant="bordered"
          label="description"
          placeholder="enter a description"
          disableAutosize
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-around">
        <Button className="min-w-[90vh]" color="danger">
          <Link href="./">Back</Link>
        </Button>
        <Button
          className="min-w-[90vh]"
          color="success"
          onClick={() => addNewList()}
        >
          Add
        </Button>
      </div>
    </>
  );
}
