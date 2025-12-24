import { useState } from "react";
import CountryList from "./CountryList";
import CountryForm from "./CountryForm";

export default function Country() {
    const [mode, setMode] = useState("list");
    const [editingCountry, setEditingCountry] = useState(null);

    const handleAdd = () => {
        setEditingCountry(null);
        setMode("add");
    };

    const handleEdit = (country) => {
        setEditingCountry(country);
        setMode("edit");
    };

    const handleBack = () => {
        setEditingCountry(null);
        setMode("list");
    };
    return (<>
        {mode === "list" && (
            <CountryList onAdd={handleAdd} onEdit={handleEdit} />
        )}

        {(mode === "add" || mode === "edit") && (
            <CountryForm
                mode={mode}
               countryData={editingCountry}
                onBack={handleBack}
            />
        )}
    </>
    );

}

