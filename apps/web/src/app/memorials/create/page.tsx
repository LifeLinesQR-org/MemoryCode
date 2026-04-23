import {Metadata} from "next";
import CreateMemorial from "@/features/memorial/components/CreateMemorial";

export const metadata: Metadata = {
    title: "Create Memorial",
}

export default function CreateMemorialPage() {
    return <CreateMemorial />
}