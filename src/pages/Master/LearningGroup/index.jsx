import { useState } from "react";
import LearningGroupList from "./LeariningGroupList";
import LearningGroupForm from "./LeariningGroupForm";

export default function MasterLearningsGroup() {
  const [mode, setMode] = useState("list");
  const [editingGroup, setEditingGroup] = useState(null);

  const handleAdd = () => {
    setEditingGroup(null);
    setMode("add");
  };

  const handleEdit = (group) => {
    setEditingGroup(group);
    setMode("edit");
  };

  const handleBack = () => {
    setEditingGroup(null);
    setMode("list");
  };

  return (
    <>
      {mode === "list" && (
        <LearningGroupList onAdd={handleAdd} onEdit={handleEdit} />
      )}

      {(mode === "add" || mode === "edit") && (
        <LearningGroupForm
          mode={mode}
          groupData={editingGroup}
          onBack={handleBack}
        />
      )}
    </>
  );
}
