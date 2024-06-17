'use client'

import { postRequestCall } from "@/app/lib/APICalls";
import { NewCostList } from "@/app/lib/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Input, Link, Textarea} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCostListPage() {
    const [nameInput, setNameInput] = useState("")
    const [description, setDescription] = useState("")
    const [budgetInput, setBudgetInput] = useState(0)
    const { user, isLoading, error } = useUser();
    const router = useRouter()

    async function addNewList() {
        const date = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var budget: number | undefined = undefined

        if (budgetInput !== 0 || !Number.isNaN(budgetInput)) {
            budget = budgetInput
        }

        const newCostList: NewCostList = {
            name: nameInput,
            date: date,
            desription: description,
            userEmail: user?.email!,
            budget: budget,
        }

        postRequestCall("http://localhost:8080/api/v1/costlist/", newCostList)
        router.push("/protected/costCalculator")
    }

  return (
    <>
      <div className="flex w-full flex-wrap justify-around gap-4 pt-10 pl-8 pr-8 pb-[40vh]">
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
