import { useState } from "react";
import StateList from "./StateList";
import StateForm from "./StateForm";

export default function State() {
    const [mode, setMode] = useState("list");
    const [editingState, setEditingState] = useState(null);

    const handleAdd = () => {
        setEditingState(null);
        setMode("add");
    };

    const handleEdit = (state) => {
        setEditingState(state);
        setMode("edit");
    };

    const handleBack = () => {
        setEditingState(null);
        setMode("list");
    };
    return (<>
        {mode === "list" && (
            <StateList onAdd={handleAdd} onEdit={handleEdit} />
        )}

        {(mode === "add" || mode === "edit") && (
            <StateForm
                mode={mode}
               countryData={editingState}
                onBack={handleBack}
            />
        )}
    </>
    );

}

