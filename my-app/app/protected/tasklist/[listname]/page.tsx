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

export default function tasklist({ params}: { params: { listname: string}}) {
  return (
    <>
      <div className="flex flex-wrap flex-row justify-around pt-8">
        <Link href="../"><Button color="danger">Back</Button></Link>
      </div>
      <div className="flex flex-wrap flex-row justify-around pt-8">
        <Card className="max-w-[60vh] min-h-[60vh] min-w-[60vh]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Low priority</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar className="h-[55vh]"></ScrollShadow>
          </CardBody>
          <Divider />
        </Card>
        <Card className="max-w-[60vh] min-h-[60vh] min-w-[60vh]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Medium priority</p>
              <p className="text-small text-default-500"></p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar className="h-[55vh]"></ScrollShadow>
          </CardBody>
          <Divider />
        </Card>
        <Card className="max-w-[60vh] min-h-[60vh] min-w-[60vh]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">High priority</p>
              <p className="text-small text-default-500"></p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ScrollShadow hideScrollBar className="h-[55vh]"></ScrollShadow>
          </CardBody>
          <Divider />
        </Card>
      </div>
      <div className="flex flex-wrap flex-row justify-around mt-4 mb-4">
        <Button className="min-w-[90vh]" color="success">
          Add new item
        </Button>
        <Button className="min-w-[90vh]" color="danger">
          Delete item
        </Button>
      </div>
    </>
  );
}
