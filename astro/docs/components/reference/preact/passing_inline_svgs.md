# Passing inline SVGs into components

This example shows how to pass an inline SVG into a Preact component.

```ts
// In the Preact component:
export interface MyComponentSvgs {
  carrot: string;
}

interface Props {
  svgs: MyComponentSvgs;
  // ...other props
}
```

```astro
// In the .astro parent:
<MyComponent svgs={{ carrot: data.carrotSvg }} />
```