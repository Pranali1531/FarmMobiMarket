import { useState } from "react";
import LGALocationList from "./LGALocationList";
import LGALocationForm from "./LGALocationForm";

export default function LGALocation() {
    const [mode, setMode] = useState("list");
    const [editingLGALocation, setEditingLGALocation] = useState(null);

    const handleAdd = () => {
        setEditingLGALocation(null);
        setMode("add");
    };

    const handleEdit = (state) => {
        setEditingLGALocation(state);
        setMode("edit");
    };

    const handleBack = () => {
        setEditingLGALocation(null);
        setMode("list");
    };
    return (<>
        {mode === "list" && (
            <LGALocationList onAdd={handleAdd} onEdit={handleEdit} />
        )}

        {(mode === "add" || mode === "edit") && (
            <LGALocationForm
                mode={mode}
               lgaLocationData={editingLGALocation}
                onBack={handleBack}
            />
        )}
    </>
    );

}

