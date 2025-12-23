import { useState } from "react";
import DepartmentList from "./DepartmentList";
import DepartmentForm from "./DepartmentForm";

export default function Department() {
    const [mode, setMode] = useState("list");
    const [editingDepartment, setEditingDepartment] = useState(null);

    const handleAdd = () => {
        setEditingDepartment(null);
        setMode("add");
    };

    const handleEdit = (unit) => {
        setEditingDepartment(unit);
        setMode("edit");
    };

    const handleBack = () => {
        setEditingDepartment(null);
        setMode("list");
    };
    return (<>
        {mode === "list" && (
            <DepartmentList onAdd={handleAdd} onEdit={handleEdit} />
        )}

        {(mode === "add" || mode === "edit") && (
            <DepartmentForm
                mode={mode}
                deptData={editingDepartment}
                onBack={handleBack}
            />
        )}
    </>
    );

}

