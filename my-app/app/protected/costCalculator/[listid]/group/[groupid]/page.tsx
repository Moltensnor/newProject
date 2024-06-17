"use client";

import { getRequestCall, postRequestCall } from "@/app/lib/APICalls";
import { CostGroup, CostItem, CostList, NewCostGroup } from "@/app/lib/types";
import {
  Autocomplete,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  ScrollShadow,
  Textarea,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ColorPicker from "react-pick-color";

export default function NewGroupPage({
  params,
}: {
  params: { listid: string; groupid: string };
}) {
  const [nameInput, setNameInput] = useState("");
  const [budgetInput, setBudgetInput] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [costList, setCostList] = useState<CostList>();
  const [costGroup, setCostGroup] = useState<CostGroup>();
  const [color, setColor] = useState("#fff");
  const [itemList, setItemList] = useState<[CostItem]>();
  const [itemLoading, setItemLoading] = useState(true);
  const router = useRouter();

  async function getList() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/" + params.listid
    );
    setCostList(req);
    setLoading(false);
  }

  async function getGroupData() {
    const req: CostGroup = await getRequestCall(
      "http://localhost:8080/api/v1/costgroup/group/" + params.groupid
    );
    setCostGroup(req);
    setNameInput(req.name);
    setBudgetInput(req.budget!);
    setColor(req.hexcode);
  }

  async function getCostItems() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costitem/group/" + params.groupid
    );
    setItemList(req);
    setItemLoading(false);
  }

  async function addNewGroup() {
    var budget: number | undefined = undefined;

    if (budgetInput !== 0 || !Number.isNaN(budgetInput)) {
      budget = budgetInput;
    }

    const newGroup: CostGroup = {
      id: costGroup!.id,
      name: nameInput,
      hexcode: color,
      budget: budget,
      costList: costList!,
    };

    postRequestCall("http://localhost:8080/api/v1/costgroup/", newGroup);
    router.push("/protected/costCalculator/" + params.listid);
  }

  useEffect(() => {
    getCostItems();
    getGroupData();
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || itemLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex w-full flex-wrap justify-around gap-4 pt-10 pl-8 pr-8 pb-[2vh]">
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
          value={budgetInput as unknown as string}
          onChange={(e) => setBudgetInput(parseInt(e.target.value))}
        />
        <ColorPicker color={color} onChange={(color) => setColor(color.hex)} />
      </div>
      <div className="flex justify-around pb-[2vh]">
        <Card className="max-w-[400px] min-w-[60%] min-h-[60vh]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Items</p>
              <p className="text-md right-[20vh] absolute">Amount</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar>
              {itemList!.map((costGroup) => (
                <div
                  key={costGroup.id}
                  className="text-md flex flex-row min-w-[60vh] mb-1 justify-items-stretch hover:underline"
                >
                  <Link
                    href={`/protected/costCalculator/${params.listid}/item/${costGroup.id}`}
                  >
                    <p className="justify-self-start">{costGroup.name}</p>
                  </Link>
                  <p className="text-md right-[22vh] absolute">{costGroup.amount}€</p>
                </div>
              ))}
            </ScrollShadow>
          </CardBody>
        </Card>
      </div>
      <div className="flex justify-around pb-[2vh]">
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
