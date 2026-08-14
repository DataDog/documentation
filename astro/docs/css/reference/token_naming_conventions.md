# Design token naming conventions

## Standard tokens (any new Astro-only token)

Token names describe appearance or role, never a specific component:

| Category | Prefix | Examples |
|---|---|---|
| Status indicators | `--color-{info,caution,warning,accent}[-emphasis]` | `--color-info`, `--color-warning-emphasis` |
| Panels (bordered boxes) | `--color-panel-*` | `--color-panel-bg`, `--color-panel-accent` |
| Surfaces (data layers) | `--color-surface-*` | `--color-surface-header`, `--color-surface-border` |
| Inline highlights | `--color-highlight-*` | `--color-highlight-bg`, `--color-highlight-text` |
| Named colors (badge pairs) | `--color-{name}[-tint]` | `--color-teal`, `--color-crimson-tint` |
| Spacing | `--space-{size}` | `--space-2xs`, `--space-xs`, `--space-sm` |
| Border radius | `--border-radius[-size]` | `--border-radius-sm`, `--border-radius-md` |

## Hugo legacy tokens

Hugo legacy tokens replicate exact values from the Hugo site, so the transition between frameworks is invisible to users. They use the prefix `--hugo-{area}-{property}`, where `area` is the Hugo component or layout region (e.g. `nav`, `footer`, `banner`) and `property` is the specific value (e.g. `height`, `bg`, `font-size`).

Examples: `--hugo-header-height`, `--hugo-nav-text`, `--hugo-footer-bg`, `--hugo-banner-z`

These tokens are defined in [src/styles/tokens/hugo.css](../../../src/styles/tokens/hugo.css) and are deprecated — replace them with standard tokens once Hugo is deprecated.