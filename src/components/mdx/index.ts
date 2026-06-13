// The component map injected into MDX via <Content components={mdxComponents} />.
// Authors use <Callout>, <MermaidDiagram>, etc. with no per-file imports.
import Callout from './Callout.astro';
import YouTubeEmbed from './YouTubeEmbed.astro';
import MermaidDiagram from './MermaidDiagram.astro';
import CodeBlock from './CodeBlock.astro';
import GitHubRepo from './GitHubRepo.astro';
import ProjectCard from './ProjectCard.astro';
import ArticleCard from './ArticleCard.astro';
import NewsletterSignup from './NewsletterSignup.astro';

export const mdxComponents = {
  Callout,
  YouTubeEmbed,
  MermaidDiagram,
  CodeBlock,
  GitHubRepo,
  ProjectCard,
  ArticleCard,
  NewsletterSignup,
};

export {
  Callout,
  YouTubeEmbed,
  MermaidDiagram,
  CodeBlock,
  GitHubRepo,
  ProjectCard,
  ArticleCard,
  NewsletterSignup,
};
