"use client";

import Chart from "@/app/components/chart/page";
import { getRequestCall } from "@/app/lib/APICalls";
import {
  CostGroupPair,
  CostItem,
  CostItemPair,
  CostList,
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
import { Key, useEffect, useState } from "react";

export default function ListInfoPage({
  params,
}: {
  params: { listid: string };
}) {
  const [isLoading, setLoading] = useState(true);
  const [costList, setCostList] = useState<CostList>();
  const [itemList, setItemList] = useState<[CostItemPair] | []>([]);
  const [costGroups, setCostGroups] = useState<[CostGroupPair] | []>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [graph, setGraph] = useState<Key>("Pie");

  function handleSelectionChange(e: Key) {
    setGraph(e);
  }

  async function getList() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/" + params.listid
    );
    setCostList(req);
    setLoading(false);
  }

  async function getCostGroups() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/countGroup/" + params.listid
    );
    setCostGroups(req);
  }

  async function getCostItems() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/countTotalItemsCost/" +
        params.listid
    );
    setItemList(req);
  }

  async function getTotalCost() {
    const req = await getRequestCall(
      "http://localhost:8080/api/v1/costlist/countTotalCost/" + params.listid
    );
    setTotalCost(req);
  }

  useEffect(() => {
    getCostItems();
    getCostGroups();
    getTotalCost();
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="mt-[2vh] mb-[2vh] flex justify-between ml-[5vh] mr-[5vh]">
        <div>
          <Button color="danger">Back</Button>
        </div>
        {costList?.name}
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
          <Button color="danger">Delete list</Button>
        </div>
      </div>
      <div className="flex flex-row justify-around flex-wrap gap-y-[2vh] mb-[2vh]">
        <Card className="max-w-[400px] min-w-[45%] min-h-[60vh]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Items</p>
              <p className="text-md right-[2vh] absolute">Total Percentage</p>
              <p className="text-md right-[20vh] absolute">Cost</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar>
              {itemList!.map((costGroup) => (
                <div
                  key={costGroup.first.id}
                  className="flex flex-row min-w-[60vh] mb-1 justify-items-stretch"
                >
                  <p className="justify-self-start">{costGroup.first.name}</p>
                  <p className="right-[7vh] absolute">{costGroup.second}%</p>
                  <p className="right-[18vh] absolute">
                    {costGroup.first.amount}€
                  </p>
                </div>
              ))}
            </ScrollShadow>
          </CardBody>
        </Card>
        <Card className="max-w-[400px] min-w-[45%] min-h-[60vh]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Groups</p>
              <p className="text-md right-[2vh] absolute">Total Percentage</p>
              <p className="text-md right-[20vh] absolute">Cost</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar>
              <div>
                {costGroups!.map((costGroup) => (
                  <div
                    key={costGroup.first.id}
                    className="flex flex-row min-w-[60vh] mb-1 justify-items-stretch"
                  >
                    <p className="justify-self-start">{costGroup.first.name}</p>
                    <p className="right-[7vh] absolute">
                      {costGroup.second.second}%
                    </p>
                    <p className="right-[18vh] absolute">
                      {costGroup.second.first}€
                    </p>
                  </div>
                ))}
              </div>
            </ScrollShadow>
          </CardBody>
          <Divider />
          <CardFooter className="flex gap-3">
            {costList!.budget == 0 ? (
              <p className="text-md">No budget given</p>
            ) : (
              <p className="text-md">Total budget: {costList!.budget}€</p>
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
            <div className="flex flex-flow justify-around">
              <Chart
                costGroups={costGroups}
                costItems={itemList}
                hasBudget={false}
                isGroup={true}
                type={graph as string}
              />
              <Chart
                costGroups={costGroups}
                costItems={itemList}
                hasBudget={false}
                isGroup={false}
                type={graph as string}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
