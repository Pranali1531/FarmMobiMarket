import { useState } from "react";
import DiseasePestList from "./DiseasePestList";
import DiseasePestForm from "./DiseasePestForm";

export default function DiseasePest() {
    const [mode, setMode] = useState("list");
    const [editingDiseasePest, setEditingeditingDiseasePest] = useState(null);

    const handleAdd = () => {
        setEditingeditingDiseasePest(null);
        setMode("add");
    };

    const handleEdit = (designation) => {
        setEditingeditingDiseasePest(designation);
        setMode("edit");
    };

    const handleBack = () => {
        setEditingeditingDiseasePest(null);
        setMode("list");
    };
    return (<>
        {mode === "list" && (
            <DiseasePestList onAdd={handleAdd} onEdit={handleEdit} />
        )}

        {(mode === "add" || mode === "edit") && (
            <DiseasePestForm
                mode={mode}
               diseasePestData={editingDiseasePest}
                onBack={handleBack}
            />
        )}
    </>
    );

}

