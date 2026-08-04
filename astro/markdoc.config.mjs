import {
  defineMarkdocConfig,
  component,
  nodes,
  Markdoc,
} from "@astrojs/markdoc/config";
import schema from "./markdoc.schema.mjs";
import { generateElementId } from "./src/lib/componentUtils/generateElementId.ts";

export default defineMarkdocConfig({
  // Custom Markdoc functions for cdocs conditionals. Markdoc's built-in
  // functions (equals, and, or, not) and the built-in `if`/`else`/`partial`
  // tags are already available, so only the cdocs-specific extras are declared
  // here. Unlike Hugo's cdocs-markdoc fork (which retained hidden content for
  // client-side toggling on a static site), vanilla Markdoc DROPS content whose
  // condition is false at transform time — exactly the SSR behavior we want.
  functions: {
    // includes($trait, ["a", "b"]) -> true when the trait value is in the list.
    includes: {
      transform(parameters) {
        const value = parameters[0];
        const list = parameters[1];
        return Array.isArray(list) ? list.includes(value) : false;
      },
    },
  },
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
    stepper: {
      render: component("./src/components/Stepper/Stepper.astro"),
      ...schema.tags.stepper,
      // Like `tabs`, the transform assembles the children server-side rather
      // than letting Stepper.astro eager-render its slot. Each `step` /
      // `stepper-finished` child is a registered component tag, so it renders
      // with proper CSS-module classes; here we just inject the shared
      // attributes (stepper id, index, position, level) each child needs.
      transform(node, config) {
        const stepperRender = config.tags.stepper.render;
        const stepRender = config.tags.step.render;
        const finishedRender = config.tags["stepper-finished"].render;

        const stepperId = generateElementId("stepper");
        const attributes = node.transformAttributes(config);
        const open = attributes.open ?? false;
        const level = attributes.level ?? "h3";

        const stepNodes = node.children.filter(
          (child) => child.type === "tag" && child.tag === "step",
        );
        const stepCount = stepNodes.length;

        const children = [];
        let stepIndex = 0;
        for (const child of node.children) {
          if (child.type !== "tag") continue;
          if (child.tag === "step") {
            const isLastStep = stepIndex === stepCount - 1;
            children.push(
              new Markdoc.Tag(
                stepRender,
                {
                  title: child.attributes.title ?? "",
                  stepperId,
                  stepIndex,
                  isLastStep,
                  open,
                  level,
                },
                child.transformChildren(config),
              ),
            );
            stepIndex++;
          } else if (child.tag === "stepper-finished") {
            children.push(
              new Markdoc.Tag(
                finishedRender,
                { stepperId },
                child.transformChildren(config),
              ),
            );
          }
        }

        return new Markdoc.Tag(
          stepperRender,
          { id: stepperId, open },
          children,
        );
      },
    },
    step: {
      // Rendered via the `stepper` transform; schema declares attributes only.
      render: component("./src/components/Stepper/Step.astro"),
      ...schema.tags.step,
    },
    "stepper-finished": {
      render: component("./src/components/Stepper/StepperFinished.astro"),
      ...schema.tags["stepper-finished"],
    },
    "region-selector": {
      render: component(
        "./src/components/RegionSelector/RegionSelectorIsland.astro",
      ),
      selfClosing: true,
    },
    "whats-next": {
      render: component("./src/components/WhatsNext/WhatsNext.astro"),
      ...schema.tags["whats-next"],
      // Markdoc groups consecutive next-link lines into a paragraph node,
      // which would render <ul><p><li>...</li></p></ul> — invalid HTML that
      // breaks :first-child / :last-child styling on whatsnext__item.
      // Unwrap any paragraph children so next-links become direct <ul> kids.
      transform(node, config) {
        const whatsNextRender = config.tags["whats-next"].render;
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
    "next-link": {
      render: component("./src/components/WhatsNext/NextLink.astro"),
      ...schema.tags["next-link"],
    },
    "collapse-content": {
      render: component(
        "./src/components/CollapseContent/CollapseContent.astro",
      ),
      ...schema.tags["collapse-content"],
    },
    ui: {
      render: component("./src/components/Ui/Ui.astro"),
      ...schema.tags.ui,
    },
    kbd: {
      render: component("./src/components/Kbd/Kbd.astro"),
      ...schema.tags.kbd,
    },
    sup: {
      render: component("./src/components/Sup/Sup.astro"),
      ...schema.tags.sup,
    },
    nbsp: {
      render: component("./src/components/Nbsp/Nbsp.astro"),
      ...schema.tags.nbsp,
    },
    "agent-only": {
      render: component("./src/components/AgentOnly/AgentOnly.astro"),
      ...schema.tags["agent-only"],
    },
  },
});
