import {Metadata} from "next";
import Memorials from "@/features/memorial/components/Memorials";

export const metadata: Metadata = {
    title: "Memory Archive",
}

export default function MemorialsPage() {
    return <Memorials />
}