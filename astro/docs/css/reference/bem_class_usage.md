# BEM class usage

The example steps below assume you're creating a component, since that's the typical use case for BEM classes.

## Label the component in HTML

Use `classListFactory` to get the `cl` helper, then pass BEM names to it. `cl` applies both the hashed CSS module class and the plain static class, so both are present in the rendered HTML.

```astro
---
import styles from "./Alert.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";

const cl = classListFactory(styles);
---

<div class={cl("alert", `alert--${level}`)}>
  <strong class={cl("alert__label")}>{label}</strong>
  <slot />
</div>
```

The rendered HTML will include both the hashed class (e.g. `_alert_1a2b3`) and the plain BEM class (e.g. `alert--info`).

## Style the component in CSS

CSS module class names must use the **full BEM name including the block prefix**. This is what allows `cl()` to derive the module class automatically.

```css
/* Alert.module.css */

.alert { … }

.alert--info  { border-color: var(--color-info); }
.alert--warning { border-color: var(--color-warning); }

.alert__label { … }

.alert--info .alert__label { color: var(--color-info-emphasis); }
```