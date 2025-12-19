import { useState } from "react";
import LearningSubGroupForm from "./LearningSubGroupForm";
import LearningSubGroupList from "./LearningSubGroupList";

export default function MasterLearningVideo() {
  const [mode, setMode] = useState("list");  
  const [editingUser, setEditingUser] = useState(null);

  const handleAdd = () => {
    setEditingUser(null);
    setMode("add");
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setMode("edit");
  };

  const handleBack = () => {
    setEditingUser(null);
    setMode("list");
  };

  return (
    <>
      {mode === "list" && (
        <LearningSubGroupList onAdd={handleAdd} onEdit={handleEdit} />
      )}

      {(mode === "add" || mode === "edit") && (
        <LearningSubGroupForm
          mode={mode}
          subGroupData={editingUser}
          onBack={handleBack}
        />
      )}
    </>
  );
}
