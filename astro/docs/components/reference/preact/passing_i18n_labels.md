## Passing i18n strings into Preact components

This example shows how to pass an i18n string into a Preact component.

```ts
// In the Preact component:
export interface MyComponentLabels {
  trigger: string;
  pricing: string;
  hype: string;
}

interface Props {
  labels: MyComponentLabels;
  // ...other props
}
```

```astro
// In the .astro parent:
<MyComponent
  labels={{ trigger: header.product.label, pricing: i18n("view_pricing"), hype: i18n("product_hype") }}
/>