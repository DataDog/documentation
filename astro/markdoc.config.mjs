import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
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
  },
});
