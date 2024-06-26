"use client";

import Chart from "@/app/components/chart/page";
import { deleteRequestCall, getRequestCall } from "@/app/lib/APICalls";
import {
  CostBudgetItemPair,
  CostGroupPair,
  CostItem,
  CostItemPair,
  CostList,
  FullBudgetCostPair,
} from "@/app/lib/types";
import {
  Autocomplete,
  AutocompleteItem,
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
import { Key, useEffect, useState } from "react";

export default function ListInfoPage({
  params,
}: {
  params: { listid: string };
}) {
  const [isLoading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);
  const [costList, setCostList] = useState<CostList>();
  const [itemList, setItemList] = useState<[CostItemPair] | []>([]);
  const [costGroups, setCostGroups] = useState<[CostGroupPair] | []>([]);
  const [fullCostGroups, setFullCostGroups] = useState<
    [FullBudgetCostPair] | []
  >([]);
  const [fullCostItems, setFullCostItems] = useState<[CostBudgetItemPair] | []>(
    []
  );
  const [totalCost, setTotalCost] = useState(0);
  const [graph, setGraph] = useState<Key>("Pie");
  const [percentage, setPercentage] = useState(100);
  const router = useRouter();

  async function getList() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/" + params.listid
    );
    setCostList(req);
    if (req.budget != 0) {
      getFullCostGroups();
      getFullCostItems();
    }
    getCostGroups();
    getCostItems();
    setListLoading(false);
  }

  async function getCostGroups() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/countGroup/" + params.listid
    );
    setCostGroups(req);
  }

  async function getFullCostGroups() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/countTotalCost/budget/" +
        params.listid
    );
    let temp = 100;
    req.every(
      (c: FullBudgetCostPair) => (temp = temp - c.second.second.second)
    );
    setPercentage(100 - temp);
    setFullCostGroups(req);
  }

  async function getCostItems() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/countTotalItemsCost/" +
        params.listid
    );
    setItemList(req);
  }

  async function getFullCostItems() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/countTotalItemsCostBudget/" +
        params.listid
    );
    setFullCostItems(req);
  }

  async function getTotalCost() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/countTotalCost/" + params.listid
    );
    setTotalCost(req);
    setLoading(false);
  }

  function deleteList() {
    deleteRequestCall("http://localhost:8080/api/v1/costlist/" + params.listid);
    router.push("./");
  }

  useEffect(() => {
    getList();
    getTotalCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || listLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="mt-[2vh] mb-[2vh] flex justify-between ml-[5vh] mr-[5vh]">
        <div>
          <Link href="./">
            <Button color="danger">Back</Button>
          </Link>
        </div>
        <h1 className="ml-[45vh] text-4xl">{costList?.name}</h1>
        <div className="flex justify-around gap-4">
          <Link href={`/protected/costCalculator/${params.listid}/edit`}>
            <Button color="warning">Edit list</Button>
          </Link>
          <Link href={`/protected/costCalculator/${params.listid}/newgroup`}>
            <Button color="success">Add new group</Button>
          </Link>
          <Link href={`/protected/costCalculator/${params.listid}/newitem`}>
            <Button color="success">Add new item</Button>
          </Link>
          <Button onClick={() => deleteList()} color="danger">
            Delete list
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-around flex-wrap gap-y-[2vh] mb-[2vh]">
        <Card className="max-w-[400px] min-w-[45%] min-h-[60vh]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Items</p>
              <p className="text-md right-[2vh] absolute">Total Percentage</p>
              <p className="text-md right-[20vh] absolute">Cost</p>
              <p className="text-md right-[45vh] absolute">Group</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar>
              {itemList!.map((costGroup) => (
                <div
                  key={costGroup.first.id}
                  className="text-md flex flex-row min-w-[60vh] mb-1 justify-items-stretch hover:underline text-black"
                >
                  <Link
                    href={`/protected/costCalculator/${params.listid}/item/${costGroup.first.id}`}
                  >
                    <p className="justify-self-start text-black">
                      {costGroup.first.name}
                    </p>
                  </Link>
                  <p className="right-[7vh] absolute">{costGroup.second}%</p>
                  <p className="right-[18vh] absolute">
                    {costGroup.first.amount}€
                  </p>
                  <div className="left-[35vh] absolute">
                    <p>{costGroup.first.costGroup.name}</p>
                  </div>
                </div>
              ))}
            </ScrollShadow>
          </CardBody>
          <Divider />
          <CardFooter className="flex gap-3">
            {costList!.budget == 0 ? (
              <p className="text-md">No budget given</p>
            ) : (
              <>
                <p className="text-md">Total budget: {costList!.budget}€</p>
                <p className="text-md ml-[10vh]">
                  Over: {costList!.budget! - totalCost} - {100 - percentage}%
                </p>
              </>
            )}
            <p className="text-md right-[7vh] absolute">100%</p>
            <p className="text-md right-[18vh] absolute">{totalCost}€</p>
          </CardFooter>
        </Card>
        <Card className="max-w-[400px] min-w-[45%] min-h-[60vh]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Groups</p>
              <p className="text-md right-[2vh] absolute">Total Percentage</p>
              <p className="text-md right-[20vh] absolute">Cost</p>
              {costList!.budget == 0 ? (
                <p className="text-md"></p>
              ) : (
                <p className="text-md right-[28vh] absolute">
                  Budget Percentage
                </p>
              )}
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar>
              <div>
                {costList!.budget == 0 ? (
                  <>
                    {costGroups!.map((costGroup) => (
                      <div
                        key={costGroup.first.id}
                        className="flex flex-row min-w-[60vh] mb-1 justify-items-stretch hover:underline"
                      >
                        <Link
                          href={`/protected/costCalculator/${params.listid}/group/${costGroup.first.id}`}
                        >
                          <p className="justify-self-start">
                            {costGroup.first.name}
                          </p>
                        </Link>
                        <p className="right-[7vh] absolute">
                          {costGroup.second.second}%
                        </p>

                        <p className="right-[18vh] absolute">
                          {costGroup.second.first}€
                        </p>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {fullCostGroups!.map((costGroup) => (
                      <div
                        key={costGroup.first.id}
                        className="flex flex-row min-w-[60vh] mb-1 justify-items-stretch hover:underline"
                      >
                        <Link
                          href={`/protected/costCalculator/${params.listid}/group/${costGroup.first.id}`}
                        >
                          <p className="justify-self-start">
                            {costGroup.first.name}
                          </p>
                        </Link>
                        <p className="right-[7vh] absolute">
                          {costGroup.second.second.first}%
                        </p>
                        <p className="right-[18vh] absolute">
                          {costGroup.second.first}€
                        </p>
                        <p className="right-[35vh] absolute">
                          {costGroup.second.second.second}%
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </ScrollShadow>
          </CardBody>
          <Divider />
          <CardFooter className="flex gap-3">
            {costList!.budget == 0 ? (
              <p className="text-md">No budget given</p>
            ) : (
              <>
                <p className="text-md">Total budget: {costList!.budget}€</p>
                <p className="text-md text-md ml-[10vh]">
                  Over: {costList!.budget! - totalCost} - {100 - percentage}%
                </p>
              </>
            )}
            <p className="text-md right-[7vh] absolute">100%</p>
            <p className="text-md right-[18vh] absolute">{totalCost}€</p>
          </CardFooter>
        </Card>
        <Card className="max-w-[400px] min-w-[95%] min-h-[90vh]">
          <CardHeader className="flex gap-3 mb-4">
            <div className="flex flex-col">
              <p className="text-md mt-4">Graphs</p>
            </div>
            <div className="right-[2vh] mt-4 absolute">
              <Autocomplete
                variant="bordered"
                color="primary"
                label="Select a graph style"
                className="max-w-[40vh]"
                onSelectionChange={setGraph}
              >
                <AutocompleteItem key={"Bar"} value={"Bar"}>
                  Bar
                </AutocompleteItem>
                <AutocompleteItem key={"Doughnut"} value={"Doughnut"}>
                  Doughnut
                </AutocompleteItem>
                <AutocompleteItem key={"Pie"} value={"Pie"}>
                  Pie
                </AutocompleteItem>
                <AutocompleteItem key={"PolarArea"} value={"PolarArea"}>
                  PolarArea
                </AutocompleteItem>
              </Autocomplete>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-wrap justify-around gap-y-[8vh]">
              {costList!.budget == 0 ? (
                <>
                  <Chart
                    costGroups={costGroups}
                    costItems={itemList}
                    fullCostGroups={[]}
                    hasBudget={false}
                    isGroup={true}
                    type={graph as string}
                    totalLeft={0}
                  />
                  <Chart
                    costGroups={costGroups}
                    costItems={itemList}
                    fullCostGroups={[]}
                    hasBudget={false}
                    isGroup={false}
                    type={graph as string}
                    totalLeft={0}
                  />
                </>
              ) : (
                <>
                  <Chart
                    costGroups={costGroups}
                    costItems={itemList}
                    fullCostGroups={fullCostGroups}
                    hasBudget={false}
                    isGroup={true}
                    type={graph as string}
                    totalLeft={costList!.budget! - totalCost}
                  />
                  <Chart
                    costGroups={costGroups}
                    costItems={itemList}
                    fullCostGroups={fullCostGroups}
                    hasBudget={false}
                    isGroup={false}
                    type={graph as string}
                    totalLeft={costList!.budget! - totalCost}
                  />
                  <Chart
                    costGroups={costGroups}
                    costItems={itemList}
                    fullCostGroups={fullCostGroups}
                    hasBudget={true}
                    isGroup={true}
                    type={graph as string}
                    totalLeft={costList!.budget! - totalCost}
                  />
                  <Chart
                    costGroups={costGroups}
                    costItems={itemList}
                    fullCostGroups={fullCostGroups}
                    hasBudget={true}
                    isGroup={false}
                    type={graph as string}
                    totalLeft={costList!.budget! - totalCost}
                  />
                </>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
