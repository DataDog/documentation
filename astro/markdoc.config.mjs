import { defineMarkdocConfig, component, nodes, Markdoc } from '@astrojs/markdoc/config';
import schema from './markdoc.schema.mjs';
import { generateElementId } from './src/utils/generateElementId.ts';

export default defineMarkdocConfig({
  nodes: {
    fence: {
      render: component('./src/components/CodeBlock/CodeBlock.astro'),
      attributes: {
        ...nodes.fence.attributes,
        ...schema.nodes.fence.attributes,
      },
    },
  },
  tags: {
    alert: {
      render: component('./src/components/Alert/Alert.astro'),
      ...schema.tags.alert,
    },
    tabs: {
      render: component('./src/components/Tabs/Tabs.astro'),
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
        const groupId = generateElementId('tabs');
        const labels = [];
        const panelIds = [];
        const panels = [];

        for (const child of node.children) {
          if (child.type !== 'tag' || child.tag !== 'tab') continue;
          const label = child.attributes.label ?? '';
          const panelId = `${groupId}-panel-${panels.length}`;
          const isActive = panels.length === 0;
          labels.push(label);
          panelIds.push(panelId);
          panels.push(
            new Markdoc.Tag(
              'div',
              {
                id: panelId,
                role: 'tabpanel',
                class: isActive ? 'tabs__panel tabs__panel--active' : 'tabs__panel',
                hidden: !isActive,
              },
              child.transformChildren(config),
            ),
          );
        }

        return new Markdoc.Tag(
          tabsRender,
          { ...node.transformAttributes(config), id: groupId, labels, panelIds },
          panels,
        );
      },
    },
    tab: {
      // Consumed by the `tabs` transform; this schema only declares the
      // attribute shape for validation.
      ...schema.tags.tab,
    },
    apiMethodBadge: {
      render: component('./src/components/ApiMethodBadge/ApiMethodBadge.astro'),
      selfClosing: true,
      ...schema.tags.apiMethodBadge,
    },
    apiStatusAlert: {
      render: component('./src/components/ApiStatusAlert/ApiStatusAlert.astro'),
      ...schema.tags.apiStatusAlert,
    },
    schemaTable: {
      render: component('./src/components/ApiSchemaTable/ApiSchemaTableIsland.astro'),
      selfClosing: true,
      ...schema.tags.schemaTable,
    },
    regionSelector: {
      render: component('./src/components/RegionSelector/RegionSelectorIsland.astro'),
      selfClosing: true,
    },
    apiResponse: {
      render: component('./src/components/ApiResponse/ApiResponseIsland.astro'),
      selfClosing: true,
      ...schema.tags.apiResponse,
    },
    apiCodeExample: {
      render: component('./src/components/ApiCodeExample/ApiCodeExampleIsland.astro'),
      selfClosing: true,
      ...schema.tags.apiCodeExample,
    },
    apiEndpoint: {
      render: component('./src/components/ApiEndpoint/ApiEndpoint.astro'),
      ...schema.tags.apiEndpoint,
    },
    placeholder: {
      render: component('./src/components/Placeholder/Placeholder.astro'),
      selfClosing: true,
      ...schema.tags.placeholder,
    },
    searchBar: {
      render: component('./src/components/SearchBar/SearchBarIsland.astro'),
      selfClosing: true,
    },
  },
});
