import { useState } from "react";
import TaxList from "./TaxList";
import TaxForm from "./TaxForm";

export default function Tax() {
  const [mode, setMode] = useState("list");
  const [editingTax, setEditingTax] = useState(null);

  const handleAdd = () => {
    setEditingTax(null);
    setMode("add");
  };

  const handleEdit = (tax) => {
    setEditingTax(tax);
    setMode("edit");
  };

  const handleBack = () => {
    setEditingTax(null);
    setMode("list");
  };
  return (
    <>
      {mode === "list" && <TaxList onAdd={handleAdd} onEdit={handleEdit} />}

      {(mode === "add" || mode === "edit") && (
        <TaxForm mode={mode} taxData={editingTax} onBack={handleBack} />
      )}
    </>
  );
}
