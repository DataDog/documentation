import {
  defineMarkdocConfig,
  component,
  nodes,
  Markdoc,
} from "@astrojs/markdoc/config";
import schema from "./markdoc.schema.mjs";
import { generateElementId } from "./src/lib/componentUtils/generateElementId.ts";

export default defineMarkdocConfig({
  nodes: {
    fence: {
      render: component("./src/components/CodeBlock/CodeBlock.astro"),
      attributes: {
        ...nodes.fence.attributes,
        ...schema.nodes.fence.attributes,
      },
    },
  },
  tags: {
    alert: {
      render: component("./src/components/Alert/Alert.astro"),
      ...schema.tags.alert,
    },
    tabs: {
      render: component("./src/components/Tabs/Tabs.astro"),
      ...schema.tags.tabs,
      // Build labels + panel wrappers here instead of letting Tabs
      // do it by eager-rendering its slot. Calling Astro.slots.render()
      // and then extracting innerHTML with cheerio silently drops the
      // hydration-script prefix Astro emits on first island — leaving
      // <astro-island> custom elements unregistered in the prod build.
      //
      // The @astrojs/markdoc integration only resolves component imports
      // for tags that appear in the .mdoc AST. A wrapper component used
      // only by this transform wouldn't qualify, so emit panels as plain
      // divs and match them via :global(.tabs__panel) in Tabs.module.css.
      transform(node, config) {
        const tabsRender = config.tags.tabs.render;
        const groupId = generateElementId("tabs");
        const labels = [];
        const panelIds = [];
        const panels = [];

        for (const child of node.children) {
          if (child.type !== "tag" || child.tag !== "tab") continue;
          const label = child.attributes.label ?? "";
          const panelId = `${groupId}-panel-${panels.length}`;
          const isActive = panels.length === 0;
          labels.push(label);
          panelIds.push(panelId);
          panels.push(
            new Markdoc.Tag(
              "div",
              {
                id: panelId,
                role: "tabpanel",
                class: isActive
                  ? "tabs__panel tabs__panel--active"
                  : "tabs__panel",
                hidden: !isActive,
              },
              child.transformChildren(config),
            ),
          );
        }

        return new Markdoc.Tag(
          tabsRender,
          {
            ...node.transformAttributes(config),
            id: groupId,
            labels,
            panelIds,
          },
          panels,
        );
      },
    },
    tab: {
      // Consumed by the `tabs` transform; this schema only declares the
      // attribute shape for validation.
      ...schema.tags.tab,
    },
    regionSelector: {
      render: component(
        "./src/components/RegionSelector/RegionSelectorIsland.astro",
      ),
      selfClosing: true,
    },
    whatsNext: {
      render: component("./src/components/WhatsNext/WhatsNext.astro"),
      ...schema.tags.whatsNext,
      // Markdoc groups consecutive nextLink lines into a paragraph node,
      // which would render <ul><p><li>...</li></p></ul> — invalid HTML that
      // breaks :first-child / :last-child styling on whatsnext__item.
      // Unwrap any paragraph children so nextLinks become direct <ul> kids.
      transform(node, config) {
        const whatsNextRender = config.tags.whatsNext.render;
        const children = node
          .transformChildren(config)
          .flatMap((child) =>
            child instanceof Markdoc.Tag && child.name === "p"
              ? child.children
              : [child],
          );
        return new Markdoc.Tag(
          whatsNextRender,
          node.transformAttributes(config),
          children,
        );
      },
    },
    nextLink: {
      render: component("./src/components/WhatsNext/NextLink.astro"),
      ...schema.tags.nextLink,
    },
  },
});
