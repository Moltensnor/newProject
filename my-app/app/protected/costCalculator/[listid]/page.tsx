"use client";

import BarChart from "@/app/components/barChart/page";
import DoughnutChart from "@/app/components/doughnutChart/page";
import PieChart from "@/app/components/pieChart/page";
import PolarAreaChart from "@/app/components/polarAreaChart/page";
import { getRequestCall } from "@/app/lib/APICalls";
import { CostGroupPair, CostItem, CostList } from "@/app/lib/types";
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
import { useEffect, useState } from "react";

export default function ListInfoPage({
  params,
}: {
  params: { listid: string };
}) {
  const [isLoading, setLoading] = useState(true);
  const [costList, setCostList] = useState<CostList>();
  const [itemList, setItemList] = useState<[CostItem] | []>([]);
  const [costGroups, setCostGroups] = useState<[CostGroupPair] | []>([]);
  const [totalCost, setTotalCost] = useState(0);

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
      "http://localhost:8080/api/v1/costitem/list/" + params.listid
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
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar>
              {itemList!.map((costGroup) => (
                <div key={costGroup.id}>{costGroup.name}</div>
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
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Graphs</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <PolarAreaChart costGroups={costGroups} hasBudget={false}/>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
