---
title: Collapse content
draft: true
---

## Overview

This page contains examples of the collapse content component.

## Test cases

- The expanded section is open on initial load and its content is visible.
- The collapsed sections are closed on initial load and their content is hidden.
- Clicking a collapsed section expands it and reveals its content.
- Clicking an expanded section collapses it and hides its content.
- Each heading level (h1-h5) renders the correct heading tag.
- The rich content section shows nested components (code block, alert) when expanded.
- Keyboard navigation (Enter/Space on the summary) toggles sections.

## Examples

### Expanded by default

{% collapse-content title="Expanded section (h4)" level="h4" expanded=true id="collapse-expanded-h4" %}
This section is expanded by default. Click the title to collapse it.
{% /collapse-content %}

### Collapsed by default

{% collapse-content title="Collapsed section (h4)" level="h4" expanded=false id="collapse-collapsed-h4" %}
This section is collapsed by default. Click the title to expand it.
{% /collapse-content %}

### Heading level h1

{% collapse-content title="H1 collapse" level="h1" expanded=false id="collapse-h1" %}
This collapsible section uses an h1 heading level.
{% /collapse-content %}

### Heading level h2

{% collapse-content title="H2 collapse" level="h2" expanded=false id="collapse-h2" %}
This collapsible section uses an h2 heading level.
{% /collapse-content %}

### Heading level h3

{% collapse-content title="H3 collapse" level="h3" expanded=false id="collapse-h3" %}
This collapsible section uses an h3 heading level.
{% /collapse-content %}

### Heading level h5

{% collapse-content title="H5 collapse" level="h5" expanded=false id="collapse-h5" %}
This collapsible section uses an h5 heading level.
{% /collapse-content %}

### With rich content inside

{% collapse-content title="Configuration example" level="h4" expanded=false id="collapse-rich" %}
To configure the Agent, update the following settings:

```yaml {% filename="datadog.yaml" collapsible=false disable_copy=false wrap=false %}
api_key: YOUR_API_KEY
logs_enabled: true
```

{% alert level="info" %}
Restart the Agent after making configuration changes.
{% /alert %}
{% /collapse-content %}
