import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    fence: {
      render: component('./src/components/CodeBlockIsland.astro'),
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
      render: component('./src/components/Alert.astro'),
      attributes: {
        type: {
          type: String,
          default: 'info',
        },
      },
    },
    counter: {
      render: component('./src/components/CounterIsland.astro'),
      attributes: {
        initialCount: {
          type: Number,
          default: 0,
        },
      },
    },
    tabs: {
      render: component('./src/components/TabsIsland.astro'),
    },
    tab: {
      render: component('./src/components/Tab.astro'),
      attributes: {
        label: {
          type: String,
          required: true,
        },
      },
    },
    httpMethodBadge: {
      render: component('./src/components/HttpMethodBadge.astro'),
      selfClosing: true,
      attributes: {
        method: {
          type: String,
          required: true,
        },
      },
    },
    apiStatusAlert: {
      render: component('./src/components/ApiStatusAlert.astro'),
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
      render: component('./src/components/SchemaTableIsland.astro'),
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
      render: component('./src/components/RegionSelectorIsland.astro'),
      selfClosing: true,
      attributes: {
        regions: {
          type: String,
          required: true,
        },
        defaultRegion: {
          type: String,
        },
      },
    },
    apiResponse: {
      render: component('./src/components/ApiResponseIsland.astro'),
      selfClosing: true,
      attributes: {
        responses: {
          type: String,
          required: true,
        },
      },
    },
    apiCodeExample: {
      render: component('./src/components/ApiCodeExampleIsland.astro'),
      selfClosing: true,
      attributes: {
        examples: {
          type: String,
          required: true,
        },
      },
    },
    apiEndpoint: {
      render: component('./src/components/ApiEndpoint.astro'),
      attributes: {
        data: {
          type: String,
          required: true,
        },
      },
    },
  },
});
