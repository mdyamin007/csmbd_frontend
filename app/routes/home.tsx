import Main from "~/components/main/main.component";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | CSMBD Content Management" },
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
    </main>
  );
}
