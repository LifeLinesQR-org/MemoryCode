import {Metadata} from "next";
import EditMemorial from "@/features/memorial/components/EditMemorial";

export const metadata: Metadata = {
    title: "Edit Memorial",
}

export default function EditMemorialPage() {
    return <EditMemorial />
}