import { useState } from "react";
import VarietyList from "./VarietyList";
import VarietyForm from "./VarietyForm";

export default function Variety() {
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
    return (<>
        {mode === "list" && (
            <VarietyList onAdd={handleAdd} onEdit={handleEdit} />
        )}

        {(mode === "add" || mode === "edit") && (
            <VarietyForm
                mode={mode}
                cropData={editingGroup}
                onBack={handleBack}
            />
        )}
    </>
    );

}

