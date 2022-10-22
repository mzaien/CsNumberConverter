import { Action, ActionPanel, List, showHUD, Detail } from "@raycast/api";
import { useEffect, useState } from "react";

interface DecimalNumber {
  decimalNumber: string;
}
function convert(number: string, type: string): string {
  // regex to identify if the number is a number and integer
  const realNumber = /^\d+$/;
  if (!realNumber.test(number)) {
    showHUD("Please enter a valid number");
    return " ";
  }
  switch (type) {
    case "Binary":
      return Number(number).toString(2);
    case "Octal":
      return Number(number).toString(8);
    case "Hexadecimal":
      return Number(number).toString(16);
    default:
      return number;
  }
}
export default function NumberConverter(props: { arguments: DecimalNumber }) {
  const items = ["Binary", "Octal", "Hexadecimal"];
  const { decimalNumber } = props.arguments;
  const [searchText, setSearchText] = useState("");
  const [filteredList, filterList] = useState(items);

  useEffect(() => {
    filterList(items.filter((item) => item.includes(searchText)));
  }, [searchText]);

  return (
    <List
      onSearchTextChange={setSearchText}
      navigationTitle="Search Conversion Type"
      searchBarPlaceholder="Convert decimal to..."
    >
      {filteredList.map((item) => (
        <List.Item
          key={item}
          title={item}
          actions={
            <ActionPanel>
              <Action.Push
                title="Choose conversion method"
                target={
                  <Detail
                    markdown={`${item} conversion is  ${convert(decimalNumber, item)}`}
                    actions={
                      <ActionPanel>
                        <Action.CopyToClipboard title="Copy to Clipboard" content={convert(decimalNumber, item)} />
                      </ActionPanel>
                    }
                  />
                }
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
