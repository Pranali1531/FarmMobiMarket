import { useState } from "react";
import UnitList from "./UnitList";
import UnitForm from "./UnitForm";

export default function Unit() {
    const [mode, setMode] = useState("list");
    const [editingUnit, setEditingUnit] = useState(null);

    const handleAdd = () => {
        setEditingUnit(null);
        setMode("add");
    };

    const handleEdit = (unit) => {
        setEditingUnit(unit);
        setMode("edit");
    };

    const handleBack = () => {
        setEditingUnit(null);
        setMode("list");
    };
    return (<>
        {mode === "list" && (
            <UnitList onAdd={handleAdd} onEdit={handleEdit} />
        )}

        {(mode === "add" || mode === "edit") && (
            <UnitForm
                mode={mode}
                cropData={editingUnit}
                onBack={handleBack}
            />
        )}
    </>
    );

}

