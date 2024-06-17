import { Task } from "@/app/lib/types";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import Link from "next/link";

export default function PriorityCard(props: any) {
  var importanceLevel = 0;

  switch (props.priority) {
    case "Low":
      importanceLevel = 1;
      break;
    case "Medium":
      importanceLevel = 2;
      break;
    case "High":
      importanceLevel = 3;
      break;
  }

  return (
    <>
      <Card className="max-w-[60vh] min-h-[60vh] min-w-[60vh]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-row">
            <p className="text-md mr-[35vh]">{props.priority} priority</p>
            <p className="text-small right-28 absolute">Weight</p>
            <p className="text-small right-6 absolute">Completed</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <ScrollShadow hideScrollBar className="h-[55vh]">
            <div>
              {props
                .tasks!.filter(
                  (t: Task) => t!.importance.importanceLevels == importanceLevel
                )
                .map((e: Task) => (
                  <Link
                    key={e!.id}
                    href={`/protected/tasklist/${e!.todoList.id}/${e!.id}`}
                    className="hover:underline"
                  >
                    <div className="flex flex-row min-w-[60vh] mb-1 justify-items-stretch">
                      <p className="text-md justify-self-start">{e!.name}</p>
                      <p className="text-md right-32 absolute">
                        {e!.importance.weight}
                      </p>
                      {e!.complete ? (
                        <p className="right-12 absolute text-green-500">Yes</p>
                      ) : (
                        <p className="right-[3.10rem] absolute text-red-500">
                          No
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </ScrollShadow>
        </CardBody>
        <Divider />
      </Card>
    </>
  );
}
