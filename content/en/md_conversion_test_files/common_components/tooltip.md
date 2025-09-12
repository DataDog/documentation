---
title: Tooltip
---

## Expected .md output

The hidden contents of the tooltip are added as parenthetical text next to the display text of the tooltip, like this: Jen loves boba (a popular drink made of tea, milk, and tapioca pearls).

## Example inputs

### Custom tooltip

Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}} in action.

### Glossary tooltip

Define the retention query by adding any span tag. Choose to retain all spans with the defined tags, only service entry spans (selected by default), or only a {{< tooltip glossary="trace root span" >}}.