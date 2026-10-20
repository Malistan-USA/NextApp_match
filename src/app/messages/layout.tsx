import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-12 gap-5">
            <aside className="col-span-3 rounded-lg border p-4">
                Sidebar
            </aside>

            <main className="col-span-9 rounded-lg border p-6">
                {children}
            </main>
        </div>
    );
}