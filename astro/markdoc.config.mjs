import { defineMarkdocConfig, component, nodes, Markdoc } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    fence: {
      render: component('./src/components/CodeBlock/CodeBlock.astro'),
      attributes: {
        ...nodes.fence.attributes,
        content: { type: String, render: true },
        language: { type: String, render: true },
        filename: { type: String, render: true },
        wrap: { type: Boolean, default: false, render: true },
        collapsible: { type: Boolean, default: false, render: true },
        disable_copy: { type: Boolean, default: false, render: true },
      },
    },
  },
  tags: {
    alert: {
      render: component('./src/components/Alert/Alert.astro'),
      attributes: {
        type: {
          type: String,
          default: 'info',
        },
      },
    },
    tabs: {
      render: component('./src/components/Tabs/Tabs.astro'),
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
        const groupId = `tabs-${crypto.randomUUID().slice(0, 8)}`;
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
          { ...node.transformAttributes(config), labels, panelIds },
          panels,
        );
      },
    },
    tab: {
      // Consumed by the `tabs` transform; this schema only declares the
      // attribute shape for validation.
      attributes: {
        label: {
          type: String,
          required: true,
        },
      },
    },
    apiMethodBadge: {
      render: component('./src/components/ApiMethodBadge/ApiMethodBadge.astro'),
      selfClosing: true,
      attributes: {
        method: {
          type: String,
          required: true,
        },
      },
    },
    apiStatusAlert: {
      render: component('./src/components/ApiStatusAlert/ApiStatusAlert.astro'),
      attributes: {
        type: {
          type: String,
          required: true,
        },
        newerVersionUrl: {
          type: String,
        },
        message: {
          type: String,
        },
      },
    },
    schemaTable: {
      render: component('./src/components/ApiSchemaTable/ApiSchemaTableIsland.astro'),
      selfClosing: true,
      attributes: {
        fields: {
          type: String,
          required: true,
        },
        title: {
          type: String,
        },
        showExpandAll: {
          type: Boolean,
          default: true,
        },
      },
    },
    regionSelector: {
      render: component('./src/components/RegionSelector/RegionSelectorIsland.astro'),
      selfClosing: true,
    },
    apiResponse: {
      render: component('./src/components/ApiResponse/ApiResponseIsland.astro'),
      selfClosing: true,
      attributes: {
        responses: {
          type: String,
          required: true,
        },
      },
    },
    apiCodeExample: {
      render: component('./src/components/ApiCodeExample/ApiCodeExampleIsland.astro'),
      selfClosing: true,
      attributes: {
        examples: {
          type: String,
          required: true,
        },
      },
    },
    apiEndpoint: {
      render: component('./src/components/ApiEndpoint/ApiEndpoint.astro'),
      attributes: {
        data: {
          type: String,
          required: true,
        },
      },
    },
    placeholder: {
      render: component('./src/components/Placeholder/Placeholder.astro'),
      selfClosing: true,
      attributes: {
        name: {
          type: String,
          required: true,
        },
        class: {
          type: String,
        },
      },
    },
  },
});
