import { Task } from "@/app/lib/types";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";

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
            <p className="text-small right-12 absolute">Weight</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <ScrollShadow hideScrollBar className="h-[55vh]">
            {props
              .tasks!.filter(
                (t: Task) => t!.importance.importanceLevels == importanceLevel
              )
              .map((e: Task) => (
                <div key={e!.id} className="flex flex-row min-w-[60vh] mb-1 justify-items-stretch">
                    <p className="text-md justify-self-start">{e!.name}</p>
                    <p className="text-md right-16 absolute">{e!.importance.weight}</p>
                </div>
              ))}
          </ScrollShadow>
        </CardBody>
        <Divider />
      </Card>
    </>
  );
}
