import { useState } from "react";
import CropList from "./CropList";
import CropForm from "./CropForm";

export default function Crop() {
    const [mode, setMode] = useState("list");
    const [editingCrop, setEditingCrop] = useState(null);

    const handleAdd = () => {
        setEditingCrop(null);
        setMode("add");
    };

    const handleEdit = (crop) => {
        setEditingCrop(crop);
        setMode("edit");
    };

    const handleBack = () => {
        setEditingCrop(null);
        setMode("list");
    };
    return (<>
        {mode === "list" && (
            <CropList onAdd={handleAdd} onEdit={handleEdit} />
        )}

        {(mode === "add" || mode === "edit") && (
            <CropForm
                mode={mode}
                cropData={editingCrop}
                onBack={handleBack}
            />
        )}
    </>
    );

}

