import { useState } from "react";
import VarietyList from "./VarietyList";
import VarietyForm from "./VarietyForm";

export default function Variety() {
    const [mode, setMode] = useState("list");
    const [editingVariety, setEditingVariety] = useState(null);

    const handleAdd = () => {
        setEditingVariety(null);
        setMode("add");
    };

    const handleEdit = (variety) => {
        setEditingVariety(variety);
        setMode("edit");
    };

    const handleBack = () => {
        setEditingVariety(null);
        setMode("list");
    };
    return (<>
        {mode === "list" && (
            <VarietyList onAdd={handleAdd} onEdit={handleEdit} />
        )}

        {(mode === "add" || mode === "edit") && (
            <VarietyForm
                mode={mode}
                varietyData={editingVariety}
                onBack={handleBack}
            />
        )}
    </>
    );

}

