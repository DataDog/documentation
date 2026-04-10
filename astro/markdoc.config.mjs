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
  },
});
