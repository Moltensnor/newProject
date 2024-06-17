'use client'

import { getRequestCall, postRequestCall } from "@/app/lib/APICalls";
import { CostList, NewCostGroup } from "@/app/lib/types";
import { Autocomplete, Button, Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ColorPicker from 'react-pick-color';

export default function NewGroupPage({
  params,
}: {
  params: { listid: string };
}) {
  const [nameInput, setNameInput] = useState("");
  const [budgetInput, setBudgetInput] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [costList, setCostList] = useState<CostList>();
  const [color, setColor] = useState('#fff');
  const router = useRouter()

  async function getList() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/" + params.listid
    );
    setCostList(req);
    setLoading(false);
  }

  async function addNewGroup() {
    var budget: number | undefined = undefined;

    if (budgetInput !== 0 || !Number.isNaN(budgetInput)) {
      budget = budgetInput;
    }

    const newGroup: NewCostGroup = {
      name: nameInput,
      hexcode: color,
      budget: budget, 
      costList: costList!,
    };

    postRequestCall("http://localhost:8080/api/v1/costgroup/", newGroup)
    router.push("/protected/costCalculator/" + params.listid)
  }

  useEffect(() => {
    getList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex w-full flex-wrap justify-around gap-4 pt-10 pl-8 pr-8 pb-[16vh]">
        <Input
          type="text"
          variant="bordered"
          label="name"
          isRequired
          onChange={(e) => setNameInput(e.target.value)}
        />
        <Input
          type="number"
          variant="bordered"
          label="budget"
          isRequired
          onChange={(e) => setBudgetInput(parseInt(e.target.value))}
        />
        <ColorPicker color={color} onChange={color => setColor(color.hex)} />
      </div>
      <div className="flex justify-around">
        <Button className="min-w-[90vh]" color="danger">
          <Link href="./">Back</Link>
        </Button>
        <Button
          className="min-w-[90vh]"
          color="success"
          onClick={() => addNewGroup()}
        >
          Add
        </Button>
      </div>
    </>
  );
}
