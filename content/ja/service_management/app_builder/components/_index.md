---
title: Components
kind: documentation
disable_toc: true
further_reading:
- link: /service_management/app_builder/tables/
  tag: Documentation
  text: Tables
- link: /service_management/app_builder/build/
  tag: Documentation
  text: Build Apps
- link: /service_management/app_builder/expressions/
  tag: Documentation
  text: JavaScript Expressions

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

This page provides a list of UI components that you can use when creating apps in App Builder.

Many component properties allow you to select from provided values. If you want to use an expression for a property's value, click **&lt;/&gt;** next to the property to use the code editor. For more information on using JavaScript in App Builder, see [JavaScript Expressions][7].
<br><br>

{{% collapse-content title="Button" level="h3" %}}
Button components have the following properties.

### General

Label
: The text that displays on the button.<br>
**Value**: string or expression

### Appearance

Intent
: Controls the color of the button, with colors representing the purpose of the button.<br>
**Provided values**: default, danger, success, warning

Is Primary
: Designed to call user attention to the most important action(s) for a given page or workflow.<br>
**Provided values**: on, off

Is Borderless
: Removes the border from any button. On hover, it gets a background fill.<br>
**Provided values**: on, off

Is Loading
: Shows a loading indicator.<br>
**Provided values**: on, off

Is Disabled
: Applies disabled styling and removes interactions.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Value**: click

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, open url, download file

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}} 


{{% collapse-content title="Callout value" level="h3" %}}
Callout value components have the following properties.

### General

Label
: The text that displays at the top of the component.<br>
**Value**: string or expression

Value
: The value that the callout highlights.<br>
**Value**: string or expression

Unit
: The unit associated with the value.<br>
**Value**: string or expression

### Style

Style
: The visual style of the component.<br>
**Provided values**: default, success, warning, danger, blue, purple, pink, orange, yellow, red, green, gray, vivid blue, vivid purple, vivid pink, vivid orange, vivid yellow, vivid red, vivid green

Size
: Responsively sizes the metric so that it is proportional to the sizing of the value.<br>
**Provided values**: sm, md, lg, xl

### Appearance

Is Loading
: Shows a loading indicator.<br>
**Provided values**: on, off

Is Disabled
: Applies disabled styling and removes interactions.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [EC2 Instance Manager][3] app blueprint.
{{% /collapse-content %}}



{{% collapse-content title="Checkbox" level="h3" %}}
Checkbox components have the following properties.

### General

Label
: The text that displays at the top of the component.<br>
**Value**: string or expression

Options
: The list of checkboxes that a user can select from. The format is an array of objects where each object consists of a `label` and `value` key-value pair. The minimum number of options is 1.<br>
**Value**: expression<br>
**Example**:<br>
: ```json
  ${[
    {
        "label": "Staging",
        "value": "staging"
    },
    {
        "label": "Production",
        "value": "production"
    }
  ]}
  ```

### Appearance

Is Multiline
: Determines whether the checkbox text should wrap onto a new line or be truncated by an ellipsis.<br>
**Provided values**: on, off

Is Disabled
: Applies disabled styling and removes interactions.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Value**: change<br>

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}}



{{% collapse-content title="Container" level="h3" %}}
Container components have the following properties.

### Appearance

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}}



{{% collapse-content title="Date range picker" level="h3" %}}
Date range picker components have the following properties.

### General

Default timeframe
: The default timeframe that the date picker displays.<br>
**Provided values**: past 5 minutes, past 30 minutes, past 1 hour, past 4 hours, past 1 day

### Appearance

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Value**: change

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}}



{{% collapse-content title="JSON input" level="h3" %}}
JSON input components have the following properties.

### General

Label
: The text that displays at the top of the component.

Default value
: The default JSON value that the component displays.

### Appearance

Is Read Only
: Determines whether the component is read only.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Value**: change

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.
{{% /collapse-content %}}



{{% collapse-content title="Modal" level="h3" %}}
Modal components have the following properties.

### General

Title
: The title of the modal.<br>
**Value**: string or expression

### Appearance

Size
: The scale of the modal.<br>
**Provided values**: sm, md, lg

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Values**: toggleOpen, close, open

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}}



{{% collapse-content title="Number input" level="h3" %}}
Number input components have the following properties.

Label
: The text that displays at the top of the component.<br>
**Value**: string or expression

Default value
: The default value that the app populates in the input box.<br>
**Value**: number or expression that evaluates to a number

Placeholder text
: The text that displays when no value is entered.<br>
**Value**: string or expression

### Validation

Min
: The minimum value the number input accepts.<br>
**Value**: number or expression that evaluates to a number

Max
: The maximum value the number input accepts.<br>
**Value**: number or expression that evaluates to a number

### Appearance

Is Disabled
: Applies disabled styling and removes interactions.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Value**: change

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [ECS Task Manager][4] app blueprint.
{{% /collapse-content %}}




{{% collapse-content title="Radio" level="h3" %}}
Radio components have the following properties.

### General

Label
: The text that displays at the top of the component.<br>
**Value**: string or expression

Options
: The list of radio button options that a user can select from. The format is an array of objects where each object consists of a `label` and `value` key-value pair.<br>
**Value**: expression<br>
**Example**:<br>
: ```json
  ${[
    {
        "label": "Staging",
        "value": "staging"
    },
    {
        "label": "Production",
        "value": "production"
    }
  ]}
  ```

Default value
: The value that is selected when the radio loads.<br>
**Value**: string or expression

### Appearance

Is Disabled
: Applies disabled styling and removes interactions.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Value**: change

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.
{{% /collapse-content %}}



{{% collapse-content title="Search" level="h3" %}}
Search components have the following properties.

### General

Default value
: The default value that the app populates in the search box.<br>
**Value**: string or expression

Placeholder text
: The text that displays when no value is entered.<br>
**Value**: string or expression

### Appearance

Size
: The scale of the search component.<br>
**Provided values**: sm, md, lg

Is Loading
: Shows a loading indicator.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Values**: change, submit

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [EC2 Instance Manager][3] app blueprint.
{{% /collapse-content %}}



{{% collapse-content title="Select" level="h3" %}}
Select components have the following properties.

### General

Label
: The text that displays at the top of the component.<br>
**Value**: string or expression

Placeholder text
: The text that displays when no value is entered.<br>
**Value**: string or expression

Options
: The list of select options that a user can select from. The format is an array of objects where each object consists of a `label` and `value` key-value pair. <br>
**Value**: expression<br>
**Example**:<br>
: ```json
  ${[
    {
        "label": "Staging",
        "value": "staging"
    },
    {
        "label": "Production",
        "value": "production"
    }
  ]}
  ```

Default value
: The value that is selected when the select loads.<br>
**Value**: string or expression

Is Multiselect
: Determines whether the user can select more than one option at a time.<br>
**Provided values**: on, off

### Appearance

Is Disabled
: Applies disabled styling and removes interactions.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Value**: change

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}}



{{% collapse-content title="Table" level="h3" %}}
Table components have the following properties.

### General

Data source
: The array of objects to display in a table.<br>
**Values**: query, demo data, components

### Columns

Each column of data from the data source is represented here and has the following properties:

Label
: The text that displays at the top of the column.<br>
**Value**: string or expression

Data path
: JSON path to access values nested within objects and arrays of a given column.<br>
**Value**: string or expression

Formatting
: The type of format that the column takes on.<br>
**Provided values**: string, link, status pill, date / time, markdown, tags, percent bar, number, score bar, avatar

Sortable
: Determines whether the user can sort by the column.<br>
**Provided values**: on, off

Some columns have additional properties based on their **Formatting** property.

### Pagination

Has summary
: Determines whether to display a pagination summary directly above the table.<br>
**Provided values**: on, off

Page size
: Number of rows per page to display.<br>
**Value**: number or expression that evaluates to a number

Total count
: Total number of rows to display in the table.<br>
**Value**: number or expression that evaluates to a number

Type
: Determines the type of pagination.<br>
**Provided values**: client side, server side

### Row actions

Adding a row action adds an **Actions** column to the table, which contains user-defined action buttons. These buttons have the following properties:

Label
: The text that displays on the action button.<br>
**Value**: string or expression

Primary
: Designed to call user attention to the most important action(s) for a given page or workflow.<br>
**Provided values**: on, off

Borderless
: Removes the border from any button. On hover, it gets a background fill.<br>
**Provided values**: on, off

Disabled
: Applies disabled styling and removes interactions.<br>
**Provided values**: on, off

Level
: Controls the color of the button according to its intent.<br>
**Provided values**: default, danger, success, warning

Reaction
: The reaction type the button triggers.
**Values**: custom, set component state, trigger query, open modal, close modal, open url, download file

### Appearance

Is Loading
: Shows a loading indicator.<br>
**Provided values**: on, off

Has text wrapping
: Determines whether cell text wraps.<br>
**Provided values**: on, off<br>

Scrollable
: Determines what ways the table is scrollable in.<br>
**Provided values**: both, vertical

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Values**: pageChange, tableRowClick

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.

For examples showing how to use advanced features of tables, see [Tables][6].

{{% /collapse-content %}}



{{% collapse-content title="Text" level="h3" %}}
Text components have the following properties.

### General

Content
: The content that the component displays.<br>
**Value**: string or expression

Content type
: Determines how to render the text. When **Markdown** is selected, the text component supports [basic Markdown syntax][8], including images that you host elsewhere.<br>
**Provided values**: plain text, Markdown

### Appearance

Text alignment
: Determines the horizontal alignment of the text within the component.<br>
**Provided values**: align left, align center, align right

Vertical alignment
: Determines the vertical alignment of the text within the component.<br>
**Provided values**: align top, align center, align bottom

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}}



{{% collapse-content title="Text input" level="h3" %}}
Text input components have the following properties.

Label
: The text that displays at the top of the component.<br>
**Value**: string or expression

Default value
: The value that is selected when the text input loads.<br>
**Value**: string or expression

Placeholder text
: The text that displays when no value is entered.<br>
**Value**: string or expression

### Appearance

Is Disabled
: Applies disabled styling and removes interactions.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Values**: change, submit

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][5].


[1]: /service_management/app_builder/build/#events
[2]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=datadog_metrics_and_monitors&viewMode=preview
[3]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ec2_instance_manager&viewMode=preview
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ecs_task_manager&viewMode=preview
[5]: https://datadoghq.slack.com/
[6]: /service_management/app_builder/components/tables/
[7]: /service_management/app_builder/expressions
[8]: https://www.markdownguide.org/basic-syntax/
