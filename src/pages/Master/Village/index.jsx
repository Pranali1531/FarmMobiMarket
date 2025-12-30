import { useState } from "react";
import VillageList from "./VillageList";
import VillageForm from "./VillageForm";

export default function Village() {
    const [mode, setMode] = useState("list");
    const [editingVillage, setEditingVillage] = useState(null);

    const handleAdd = () => {
        setEditingVillage(null);
        setMode("add");
    };

    const handleEdit = (unit) => {
        setEditingVillage(unit);
        setMode("edit");
    };

    const handleBack = () => {
        setEditingVillage(null);
        setMode("list");
    };
    return (<>
        {mode === "list" && (
            <VillageList onAdd={handleAdd} onEdit={handleEdit} />
        )}

        {(mode === "add" || mode === "edit") && (
            <VillageForm
                mode={mode}
                villageData={editingVillage}
                onBack={handleBack}
            />
        )}
    </>
    );

}

