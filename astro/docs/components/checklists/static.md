# Static components

When you create or update a static component, read this checklist ahead of time so it can inform your design, then check it off once your design has been implemented.

## Checklist

### Architecture

- The component is written in vanilla Astro unless there is a pressing reason to use something else. 

### Testing

- The component is rendered to an HTML string with `preact-render-to-string` or equivalent, with assertions based on the output.

- If the component has a variety of possible permutations, a representative sample of these permutations is tested.