import * as runtime from "react/jsx-runtime";
import Callout from "~/components/ui/callout";
import { YouTubeEmbed } from "@next/third-parties/google";
import CustomImage from "./custom-image";
import CustomLink from "./custom-link";

const sharedComponents = {
  h1: (props: React.ComponentProps<"h2">) => <h2 {...props} />,
  CustomImage,
  CustomLink,
  YouTubeEmbed,
  Callout,
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
};

export default MDXContent;
