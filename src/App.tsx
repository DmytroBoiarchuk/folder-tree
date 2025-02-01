import "./App.css";
import { useQuery } from "@tanstack/react-query";
import TreeNode from "./components/TreeNode/TreeNode.tsx";
import { FaFileAlt } from "react-icons/fa";
import { RiFolder4Line } from "react-icons/ri";
import { AiOutlineFolder } from "react-icons/ai";
import * as React from "react";

export interface FolderTreeProps {
  name: string;
  subitems?: FolderTreeProps[];
}

// define which icon should be rendered for passed node
export const getIcon = (node: FolderTreeProps): React.ComponentType => {
  // case for nested folders
  if (node.subitems?.some((node) => node.subitems)) return RiFolder4Line;

  // case for files
  if (node.name.includes(".")) return FaFileAlt;

  //
  return AiOutlineFolder;
};

// mock fetch function
const fetchJsonData = async (): Promise<FolderTreeProps[]> => {
  const response = await fetch("src/data.json");
  if (!response.ok) {
    throw new Error(`Status: ${response.status}`);
  }
  return response.json();
};

function App(): JSX.Element {
  const { data , isLoading, error, isError } = useQuery<FolderTreeProps[]>({
    queryKey: ["Tree"],
    queryFn: fetchJsonData,
    retry: false,
  });

  if(isLoading) return <div>Loading...</div>;
  if(isError) return <div>{`Failed to fetch data: ${error}`}</div>;

  return (
    <>
      {data?.map((node) => (
        <TreeNode
          key={node.name}
          nodeContent={node}
          CustomIcon={getIcon(node)}
        />
      ))}
    </>
  );
}

export default App;
