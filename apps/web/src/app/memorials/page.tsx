import {Metadata} from "next";
import Memorials from "@/features/components/Memorials";

export const metadata: Metadata = {
    title: "Memorials",
}

export default function MemorialsPage() {
    return <Memorials />
}