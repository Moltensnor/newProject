import { Listbox, ListboxItem } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function PasswordMenu() {
  return (
    <Listbox>
      <ListboxItem key="new" href="../protected/passwords">All passwords</ListboxItem>
      <ListboxItem key="copy" href="../protected/addPassword">Add password</ListboxItem>
    </Listbox>
  );
}
