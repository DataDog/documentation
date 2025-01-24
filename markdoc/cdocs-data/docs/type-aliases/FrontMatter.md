[**cdocs-data**](../README.md)

***

[cdocs-data](../README.md) / Frontmatter

# Type Alias: Frontmatter

> **Frontmatter**: `object`

Defined in: src/schemas/frontmatter.ts:142

The front matter of a document required by the integration
(additional keys are allowed in the front matter YAML,
but are ignored by the integration).

## Type declaration

### content\_filters?

> `optional` **content\_filters**: `object`[]

### title

> **title**: `string`

## Example

```ts
{
 *   title: "Decorative Painting Tips",
 *   content_filters: [
 *     {
 *       label: "Color",
 *       trait_id: "color",
 *       option_group_id: "color_options"
 *     },
 *     {
 *       label: "Finish",
 *       trait_id: "finish",
 *       option_group_id: "paint_finish_options"
 *     },
 *     {
 *       label: "Paint color",
 *       trait_id: "paint_color",
 *       option_group_id: "<FINISH>_<COLOR>_paint_options"
 *     }
 *   ]
 * }
```
