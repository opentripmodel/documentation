import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
// import type * as Redocusaurus from 'redocusaurus';

const config: Config = {
  title: "Open Trip Model",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://www.opentripmodel.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "opentripmodel", // Usually your GitHub org/user name.
  projectName: "documentation", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
    // [
    //   'redocusaurus',
    //   {
    //     // Plugin Options for loading OpenAPI files
    //     specs: [
    //       // Pass it a path to a local OpenAPI YAML file
    //       {
    //         // Redocusaurus will automatically bundle your spec into a single file during the build
    //         spec: 'api/OTM_OAS.yaml',
    //         route: '/docs/api/',
    //       },
    //     ],
    //     // Theme Options for modifying how redoc renders them
    //     theme: {
    //       // Change with your site colors
    //       primaryColor: '#1890ff',
    //     },
    //   },
    // ] satisfies Redocusaurus.PresetEntry,
  ],
  

  themeConfig: {
    // Replace with your project's social card
    image: "img/logo-otm.png",
    navbar: {
      logo: {
        alt: "Open Trip Model",
        src: "img/logo-otm.png",
      },
      items: [
        {
          to: "/about",
          label: "About",
          position: "left",
        },
        {
          type: "docSidebar",
          sidebarId: "docSidebar",
          position: "left",
          label: "Documentation",
        },
        { to: "/blog", label: "Blog", position: "left" },
        { to: "/api", label: "API", position: "left" },
        {
          href: "https://sutc.semantic-treehouse.nl/",
          label: "STH",
          position: "right",
        },
        {
          href: "https://github.com/opentripmodel",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.sutc.nl/",
          label: "SUTC",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} SUTC`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;