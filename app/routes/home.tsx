import Main from "~/main/main";
import type { Route } from "./+types/home";
import { ModeToggle } from "~/components/mode-toggle";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CSMBD Content Management" },
    {
      name: "description",
      content: "Welcome to CSMBD Content Management System",
    },
  ];
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Main />
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
    </main>
  );
}
