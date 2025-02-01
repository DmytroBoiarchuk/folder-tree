import { useState } from "react";
import { FolderTreeProps, getIcon } from "../../App.tsx";
import classes from "./TreeNode.module.scss";
import * as React from "react";

interface TreeNodeProps {
  nodeContent: FolderTreeProps;
  CustomIcon: React.ComponentType;
}

const TreeNode = ({ nodeContent, CustomIcon }: TreeNodeProps) => {
  const [nodeIsOpened, setNodeIsOpened] = useState<boolean>(false);
  const toggleFolder = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setNodeIsOpened((prevState) => !prevState);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.nodeHeader}>
        <CustomIcon />
        <button className={classes.node} onClick={toggleFolder}>
          {nodeContent.name}
        </button>
      </div>
      {nodeIsOpened && (
        <div className={classes.nodeChildren}>
          {nodeContent.subitems?.map((node) => (
            <TreeNode
              key={node.name}
              nodeContent={node}
              CustomIcon={getIcon(node)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
