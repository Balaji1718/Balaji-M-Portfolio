import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Balaji M | Software Developer Portfolio" },
      {
        name: "description",
        content: "A portfolio of software development projects, technical skills, experience, and certifications.",
      },
      { property: "og:title", content: "Balaji M | Software Developer Portfolio" },
      {
        property: "og:description",
        content: "A portfolio of software development projects, technical skills, experience, and certifications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
