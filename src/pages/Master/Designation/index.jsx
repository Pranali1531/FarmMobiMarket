import { useState } from "react";
import DesignationList from "./DesignationList";
import DesignationForm from "./DesignationForm";

export default function Designation() {
    const [mode, setMode] = useState("list");
    const [editingDesignation, setEditingDesignation] = useState(null);

    const handleAdd = () => {
        setEditingDesignation(null);
        setMode("add");
    };

    const handleEdit = (designation) => {
        setEditingDesignation(designation);
        setMode("edit");
    };

    const handleBack = () => {
        setEditingDesignation(null);
        setMode("list");
    };
    return (<>
        {mode === "list" && (
            <DesignationList onAdd={handleAdd} onEdit={handleEdit} />
        )}

        {(mode === "add" || mode === "edit") && (
            <DesignationForm
                mode={mode}
               designationData={editingDesignation}
                onBack={handleBack}
            />
        )}
    </>
    );

}

