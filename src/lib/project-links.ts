import { slug } from "github-slugger";

export const getProjectSlug = (title: string) => slug(title);
export const getProjectHref = (title: string) => "/projects/" + getProjectSlug(title);
