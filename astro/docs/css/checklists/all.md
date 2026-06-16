# CSS architecture

When you create or update CSS, read this checklist ahead of time so it can inform your design, then check it off once your design has been implemented. 

Query the user if you recommend another approach in any case.

## Checklist

### Modularity

- Where possible, BEM classes are used on any meaningful chunks of HTML. See [BEM class usage](../reference/bem_class_usage.md).

### Tokenized design

- Fonts, white space, colors, and so on are controlled by top-level design tokens that can be changed at runtime to support dark mode etc.

- Design token names are not tied to a particular element, with the exception of very high-level layout tokens. For example, colors should just be colors, like `--color-text-muted` (good example). They should not be associated with a specific component, such as `--color-breadcrumb` (bad example). See [token naming conventions](../reference/token_naming_conventions.md).

- All new design tokens are necessary; for each new design token, there was no existing design token that could have been used instead.

- Every token defined in `:root` has a corresponding dark mode override in `[data-theme='dark']` if the value would look wrong on a dark background.

### Global styles

- Global styles are limited as much as possible to allow components to be viewed and tested in isolation. Use global styles when avoiding them would result in significant bloat of the component CSS. For example, the default font for the site makes sense as a global style.

- Global styles assume the component will only have access to the `body` tag that encloses it.



