---
title: Components
kind: documentation
disable_toc: false
further_reading:
- link: "/service_management/workflows/build/"
  tag: "Documentation"
  text: "Build Apps"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Join the Beta!">}}
Datadog App Builder is in private beta. Complete the form to request access.
{{< /callout >}}

App Builder provides many UI components that you can use when building your apps.

## Available UI components

### Button

Buttons have the following properties.

#### General

Label
: The text that displays on the button.<br>
**Value**: string<br>
_required_

#### Appearance

Intent
: Description<br>
**Values**: default, danger, success, warning<br>
_required_

Is Primary
: Designed to call user attention to the most important action(s) for a given page or workflow.<br>
**Values**: on, off<br>
_required_

Is Borderless
: Removes the border from any Button. On hover, it gets a background fill.<br>
**Values**: on, off<br>
_required_

Is Loading
: Shows a loading indicator.<br>
**Values**: on, off<br>
_optional_

Is Disabled
: Applies disabled styling and removes interactions.<br>
**Values**: on, off<br>
_optional_

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Values**: on, off<br>
_optional_

#### Events

Event
: **Value**: click

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, open url, download file

### Callout value

### Checkbox

### Container

### Date range picker

### JSON input

### Modal

### Number input

### Radio

### Search

### Select

### Table

### Text

### Text input

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
