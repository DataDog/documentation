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
**Value**: expression or string<br>
_required_

#### Appearance

Intent
: Controls the color of the button, with colors representing the purpose of the button.<br>
**Values**: default, danger, success, warning<br>
_required_

Is Primary
: Designed to call user attention to the most important action(s) for a given page or workflow.<br>
**Values**: on, off<br>
_required_

Is Borderless
: Removes the border from any button. On hover, it gets a background fill.<br>
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

#### Inspect data

Displays property and value pairs in JSON format.



### Callout value

Callout values have the following properties.

#### General

Label
: The text that displays at the top of the callout element.<br>
**Value**: expression or string<br>

Value
: The value that the callout highlights.<br>
**Value**: expression or string<br>

Unit
: The unit associated with the value.<br>
**Value**: expression or string

#### Style

Style
: The visual style of the element.<br>
**Values**: default, success, warning, danger, blue, purple, pink, orange, yellow, red, green, gray, vivid blue, vivid purple, vivid pink, vivid orange, vivid yellow, vivid red, vivid green

Size
: Responsively sizes the metric so that it is proportional to the sizing of the value.<br>
**Values**: sm, md, lg, xl

#### Appearance

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

#### Inspect data

Displays property and value pairs in JSON format.



### Checkbox

#### General

Label
: The text that displays at the top of the checkbox element.<br>
**Value**: expression or string

Options
: The list of checkboxes that a user can select from. Minimum number of options is 1.<br>
**Value**: expression<br>
**Example**:<br>
: {{< code-block lang="json" disable_copy="true">}}${[
    {
        "label": "Staging",
        "value": "staging"
    },
    {
        "label": "Production",
        "value": "production"
    }
]}{{< /code-block >}}

#### Appearance

Is Multiline
: Determines whether the checkbox text should wrap onto a new line or be truncated by an ellipsis.<br>
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
: **Value**: Change<br>

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file

#### Inspect data

Displays property and value pairs in JSON format.



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
