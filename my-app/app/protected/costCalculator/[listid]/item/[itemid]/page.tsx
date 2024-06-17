"use client";

import { getRequestCall, postRequestCall } from "@/app/lib/APICalls";
import { CostGroup, CostItem, CostList, NewCostItem } from "@/app/lib/types";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";

export default function NewItemPage({
  params,
}: {
  params: { listid: string; itemid: string };
}) {
  const [nameInput, setNameInput] = useState("");
  const [budgetInput, setBudgetInput] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [groupsLoading, setGroupsLoading] = useState(true);
  const [costList, setCostList] = useState<CostList>();
  const [costGroups, setCostGroups] = useState<[CostGroup]>();
  const [costGroup, setCostGroup] = useState<CostGroup>();
  const [description, setDescription] = useState("");
  const [costItem, setCostItem] = useState<CostItem>();
  const router = useRouter();
  const listId = params.listid;

  async function getList() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/" + listId
    );
    setCostList(req);
    setLoading(false);
  }

  async function getGroups() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costgroup/list/" + listId
    );
    setCostGroups(req);
    setGroupsLoading(false);
  }

  function selectCostGroup(id: Key) {
    const selectedCostGroup = costGroups?.filter((c) => c.id == id);
    setCostGroup(selectedCostGroup![0]);
  }

  async function getItem() {
    const req: CostItem = await getRequestCall(
      "http://localhost:8080/api/v1/costitem/item/" + params.itemid
    );
    setCostItem(req);
    setNameInput(req.name);
    setBudgetInput(req.amount);
    setDescription(req.description);
    setCostGroup(req.costGroup);
  }

  async function addNewGroup() {
    var budget: number | undefined = undefined;

    if (budgetInput !== 0 || !Number.isNaN(budgetInput)) {
      budget = budgetInput;
    }

    const newGroup: CostItem = {
      id: costItem!.id,
      name: nameInput,
      description: description,
      amount: budget!,
      costGroup: costGroup!,
      costList: costList!,
    };

    console.log(newGroup);

    postRequestCall("http://localhost:8080/api/v1/costitem/", newGroup);
    router.push("/protected/costCalculator/" + listId);
  }

  useEffect(() => {
    getItem();
    getGroups();
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || groupsLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex w-full flex-wrap justify-around gap-4 pt-10 pl-8 pr-8 pb-[16vh]">
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
          label="amount"
          isRequired
          value={budgetInput as unknown as string}
          onChange={(e) => setBudgetInput(parseInt(e.target.value))}
        />
        <Autocomplete
          isRequired
          label="Select cost group"
          defaultItems={costGroups}
          placeholder="Select a cost group"
          className="max-w-xs"
          onSelectionChange={selectCostGroup}
        >
          {(costGroup) => (
            <AutocompleteItem key={costGroup.id}>
              {costGroup.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Textarea
          type="text"
          variant="bordered"
          label="description"
          placeholder="enter a description"
          disableAutosize
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-around">
        <Link href="../">
          <Button className="min-w-[90vh]" color="danger">
            Back
          </Button>
        </Link>
        <Button
          className="min-w-[90vh]"
          color="success"
          onClick={() => addNewGroup()}
        >
          Edit
        </Button>
      </div>
    </>
  );
}
