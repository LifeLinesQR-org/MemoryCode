import { ToggleTheme } from '@/shared/components/ui'

export default function AuthLayout({
   children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen">
            <div className="fixed left-4 top-4 z-50">
                <ToggleTheme />
            </div>
            <div className="flex min-h-screen items-center justify-center px-4">
                {children}
            </div>
        </div>
    )
}