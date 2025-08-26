---
title: Consistent Color Palette
description: ""
further_reading:
- link: "dashboards/guide/compatible_semantic_tags"
  tag: "Documentation"
  text: "Compatible Semantic Tags"
- link: "dashboards/guide/widget_colors"
  tag: "Documentation"
  text: "Selecting the right colors for your graphs"
---

## Overview

The Consistent palette allows you to assign the same color consistently to a series of tag groups, making it easier to correlate data across charts. The palette does not track which colors are used and this can lead to issues with duplicate colors in one graph.

Use this guide to learn more about what you can do to resolve duplicated colors in widgets and graphs.

## Duplicate tag colors

When using the Consistent color palette, different tags can appear with duplicate colors because the palette does not track which colors have already been assigned.

This is a known tradeoff when using this palette (stability across timeframes vs. uniqueness within this individual snapshot). It promises that a specific tag value will always have the same color across the app.

The algorithm is based on string hashing, where the list of tags associated with a shape gets mapped to the color space of available (in the 16 - 20 range) colors (a curated set that was chosen to ensure support for accessibility needs relative to other UI colors, color contrast between color pairs, and dark mode compatibility).  The palette draws from a limited palette of 16 to 20 colors, not infinite.

So it looks at the consistency of the color across various graphs,rather than distinct color in the individual graph.

A downside is that this approach is slow to maintain manually, especially if you need to apply this treatment to multiple widgets. It also may require lots of manual updating if the number of groupbys goes down over time. This cost can be mitigated with scripting and/or allowing a widget to be defined using a script rather than fixed JSON, for example:

[JSON config]

## Resolution

The palette has a limited selection of colors it can assign to your data. If the number of groups is small and relatively unchanging (n < 15, something stable like the number of countries in the world, or datacenters at DD), you can create a formula per series, and assign a unique color per group with the color override feature. For more information, see [Color overrides][1].

Datadog recommends using a higher cardinality palette (like Datadog16) for graphs that have many series where reducing the frequency of color reuse is important.



## Further reading

[1]: https://docs.datadoghq.com/dashboards/guide/widget_colors/#color-overrides