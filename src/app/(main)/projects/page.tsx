import { ProjectList, projects } from "~/components/project";
import CategoryFilter from "~/components/project/category-filter";
import SearchInput from "~/components/search-input";
import config from "~/config";
import { getSEOTags } from "~/lib/seo";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: `All Projects - ${config.appName}`,
  description:
    "Explore a digital garden of my projects, where I showcase insights on shipping exceptional products, advancing as a developer, and thriving in the tech industry",
  canonicalUrlRelative: "/projects",
  keywords: ["JavaScript", "TypeScript", "React", "Testing", "Career", "Software Development"],
});

const ProjectsPage = ({ 
  searchParams 
}: { 
  searchParams: { search: string | undefined; category: string | undefined } 
}) => {
  const searchTerm = decodeURIComponent(searchParams.search || "");
  const selectedCategory = searchParams.category || "all";

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || project.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="!mt-8">
      <div className="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-left text-xl font-medium"> All Projects </h1>
        <SearchInput projects={true} />
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-muted-foreground">Filter by Category</h3>
          <CategoryFilter />
        </div>
        
        <ProjectList projects={filteredProjects} metadata={false} />
      </div>
    </div>
  );
};

export default ProjectsPage;
