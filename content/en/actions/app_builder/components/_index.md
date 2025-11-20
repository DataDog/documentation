---
title: Components
description: Comprehensive reference for App Builder UI components including buttons, forms, tables, charts, and interactive elements.
disable_toc: true
aliases:
    - /service_management/app_builder/components
further_reading:
- link: "/service_management/app_builder/tables/"
  tag: "Documentation"
  text: "Tables"
- link: "/service_management/app_builder/build/"
  tag: "Documentation"
  text: "Build Apps"
- link: "/service_management/app_builder/expressions/"
  tag: "Documentation"
  text: "JavaScript Expressions"
- link: "https://learn.datadoghq.com/courses/app-builder-integration"
  tag: "Learning Center"
  text: "Build Self-Serve Apps with App Builder for Third-Party Integrations"

---

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
: **Values**: custom, set component state, trigger query, open modal, close modal, open url, download file, set state variable value

State Function
: fetch<br>
**Example**: See [events][9].

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
:     ```json
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
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Function
: fetch<br>
**Example**: See [events][9].

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



{{% collapse-content title="Custom chart" level="h3" %}}
Custom chart components have the following properties.

### General

Vega Specification
: A string representing a valid Vega-Lite or Vega JSON specification.

### Appearance

Is Loading
: Shows a loading indicator.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Inspect data

Displays property and value pairs in JSON format.

### Example

For an example showing how to use this component, see [Custom charts][10].

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

State Function
: fetch<br>
**Example**: See [events][9].

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}}


{{% collapse-content title="File input" level="h3" %}}
File input components have the following properties.

### General

Accepted File Types
: Determines which file types the file input component accepts.<br>
**Values**: .csv, .json

### Appearance

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Value**: change

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Function
: fetch<br>
**Example**: See [events][9].

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

{{% /collapse-content %}}


{{% collapse-content title="Integration logo" level="h3" %}}
Integration logo components have the following properties.

### General

Integration Id
: Specifies which integration logo icon to display.<br>
**Value**: string or expression<br>
**Examples**: datadog, amazon-s3, postgres, okta

### Appearance

Horizontal Alignment
: Controls the horizontal positioning of the logo within the component.<br>
**Provided values**: align left, align center, align right

Vertical Alignment
: Controls the vertical positioning of the logo within the component.<br>
**Provided values**: align top, align center, align bottom

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

Is Loading
: Shows a loading indicator.<br>
**Provided values**: on, off

### Inspect data

Displays property and value pairs in JSON format.

{{% /collapse-content %}}


{{% collapse-content title="Form" level="h3" %}}
Form components have the following properties.

### General

Title
: The title of the form.<br>
**Value**: string or expression

Default value
: The default value that the app populates in the form. To populate a specific field, you can use JSON notation, such as `{"org":"frontend"}` to populate the `org` field with the value `frontend`.<br>
**Value**: string or expression

### Fields

Each item represents a field in the form. Fields each have one of the following types: `textInput`, `select`, `textArea`, or `text`.

Fields have some or all of the following properties depending on their field type:

Field name
: The unique identifier for a field. You can use this identifier to reference the field in an expression.<br>
**Value**: string or expression

Label
: The label that displays above the field.<br>
**Value**: string or expression

Content
: The content that displays in a `text` field.<br>
**Value**: string or expression

Options
: The options available in a `select` field. Options must be an array of objects, with a `const` key for the option value and an optional `title` key for the option label.<br>**Value**: Each object's `label` and `value` can be a string or expression.<br>
You can populate each object using the GUI (default), or toggle **Raw** to use raw JSON input to provide the entire array of objects.

Placeholder text
: The text that displays in a `textInput` or `textArea` field when no value is entered.<br>
**Value**: string or expression

Is Disabled
: Applies disabled styling and removes interactions.<br>
**Provided values**: on, off

Is Visible
: Determines whether the field is visible in the form.<br>
**Provided values**: on, off

Is Required
: Determines whether the field is required in order to submit the form.<br>
**Provided values**: on, off

### Appearance

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

Is Disabled
: Applies disabled styling and removes interactions.<br>
**Provided values**: on, off

### Events

Event
: **Value**: submit, change, validate

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Function
: setValue<br>
**Example**: `form0.setValue({name: 'node-group-1'})` sets the value of the `form0` component to `{name: 'node-group-1'}`.

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

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
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Function
: fetch<br>
**Example**: See [events][9].

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
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**Example**: See [events][9].
: setIsOpen<br>
**Example**: `modal0.setIsOpen(true)` sets the state of `modal0` to open.

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
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**Example**: See [events][9].
: setValue<br>
**Example**: `numberInput0.setValue(3)` sets the value of the `numberInput0` component to `3`.

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
:    ```json
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
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**Example**: See [events][9].
: setValue<br>
**Example**: `radioButtons0.setValue("production")` sets the value of the `radioButtons0` component to `"production"`.

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.
{{% /collapse-content %}}



{{% collapse-content title="React renderer" level="h3" %}}
React renderer components have the following properties.

### General

React Component Definition
: The code that is executed to create a React component.<br>

Component Input Props
: The props that are passed to the React component and can be accessed in the props object of the component.

Initial Component State
: Sets the initial state values for your component. This state is used when the component first renders or if no state has been set yet. The component can access this data via <code>props.state</code>.<br>

### Appearance

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events
Event
: **Values**: set component state, callback function

Function Name
: **Value**: <code>props.customFunctionName</code>

Reaction
: **Values**: close modal, custom, download file, open modal, open side panel, close side panel, set component state, set state variable value, toast notification, trigger action

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Relationships

Displays data dependencies between React renderer and components in the app.

### Example

For an example showing how to use this component, see [React renderer][11].

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
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**Example**: See [events][9].
: setValue<br>
**Example**: `search0.setValue("search query")` sets the value of the `search0` component to `"search query"`.

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
:     ```json
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
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**Example**: See [events][9].
: setValue<br>
**Example**: `select0.setValue("staging")` sets the value of the `select0` component to `"staging"`.

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}}


{{% collapse-content title="Tab" level="h3" %}}

Tab components have the following properties.

### Tabs

A list of tab views. Use the **+ (plus)** to add additional views.


### Style

Style
: The coloring style used for the tab component.<br>
**Provided values**: Default, purple, pink, orange, red, green

Alignment
: The way the tabs are aligned within the tab component.<br>
**Provided values**: Horizontal (→), vertical (↓)

Impact
: Controls whether the selected tab's background is fully colored or only a small band at the bottom is colored.<br>
**Provided values**: High, low


### Appearance

Hide Tabs
: Controls whether the tab markers are displayed.<br>
**Provided values**: on, off

Hide Body
: Controls whether the body of the tabs are displayed.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Value**: change

Reaction
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**Example**: See [events][9].
: setTabIndex<br>
**Example**: `tab0.setTabIndex(0)` sets the value of the `tab0` component to the first tab.

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

{{% /collapse-content %}}

{{% collapse-content title="Table" level="h3" %}}

Table components have the following properties.

### General

Title
: A title for the table. Select **Markdown** for custom formatting.<br>
**Value**: string

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

Copyable
: Determines whether the user can click to copy the contents of the column.<br>
**Provided values**: on, off

Filterable
: Determines whether a filter option is available for the column.<br>
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

### Sorting

Select the column and direction for default table sorting.
Column
: The column to sort by.<br>
**Value**: column name

Direction
: The direction to sort.<br>
**Provided values**: ascending, descending

### Row actions

Adding a row action adds an **Actions** column to the table, which contains user-defined action buttons. Rows can have multiple actions. Actions have the following properties:

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

Reactions
: The reactions the button triggers. A button can have multiple reactions.<br>
**Provided values**: download file, open modal, close modal, open side panel, close side panel, open URL, set component state, set state variable value, toast notification, trigger action, custom<br>
Some reaction types have additional properties.

State Function
: fetch<br>
**Example**: See [events][9].

### Appearance

Scrollable
: Determines what ways the table is scrollable in.<br>
**Provided values**: both, vertical

Is Loading
: Shows a loading indicator.<br>
**Provided values**: on, off

Has text wrapping
: Determines whether cell text wraps.<br>
**Provided values**: on, off

Has subrows
: Enables subrows for each row. Include the `subRows` property in the data source.<br>
**Provided values**: on, off

Is searchable
: Determines whether to add a search bar to the table. <br>
**Provided values**: on, off

Show sort options
: Adds a **Sort** button to the table that gives users sorting options.<br>
**Provided values**: on, off

Show column options
: Adds a **Columns** button to the table for displaying, hiding, or reorganizing table columns.<br>
**Provided values**: on, off

Has date range filter
: Adds a date range filter to the table.<br>
**Provided values**: on, off

Is Visible
: Determines whether the component is visible to the end-user. In edit mode, all components remain visible.<br>
**Provided values**: on, off

### Events

Event
: **Values**: pageChange, tableRowClick

Reaction
: **Values**: download file, open modal, close modal, open side panel, close side panel, set component state, set state variable value, toast notification, trigger action, custom

State Functions
: fetch<br>
**Example**: See [events][9].
: setSelectedRow<br>
**Examples**: <ul><li>`table0.setSelectedRow(0)` sets the `selectedRow` property of `table0` to the first row.</li><li>`table0.setSelectedRow(null)` clears the `selectedRow` property.</li></ul>
: setPageIndex<br>
**Example**: `table0.setPageIndex(0)` sets the `pageIndex` property of `table0` to the first page.

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

### Relationships

Displays data dependencies between table data and components in the app.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}}


{{% collapse-content title="Text area" level="h3" %}}
Text area components have the following properties.

Label
: The text that displays at the top of the component.<br>
**Value**: string or expression

Default value
: The value that is selected when the text area loads.<br>
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
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**Example**: See [events][9].
: setValue<br>
**Example**: `textArea0.setValue("text")` sets the value of the `textArea0` component to `"text"`.

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.
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
: **Values**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**Example**: See [events][9].
: setValue<br>
**Example**: `textInput0.setValue("text")` sets the value of the `textInput0` component to `"text"`.

For more information on events, see [Events][1].

### Inspect data

Displays property and value pairs in JSON format.

### Example

To view this component in context, see the [Metrics Explorer & Monitors Builder][2] app blueprint.
{{% /collapse-content %}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][5].


[1]: /service_management/app_builder/events
[2]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=datadog_metrics_and_monitors&viewMode=preview
[3]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ec2_instance_manager&viewMode=preview
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ecs_task_manager&viewMode=preview
[5]: https://chat.datadoghq.com/
[6]: /service_management/app_builder/components/tables/
[7]: /service_management/app_builder/expressions
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /service_management/app_builder/events/#state-functions
[10]: /service_management/app_builder/components/custom_charts/
[11]: /actions/app_builder/components/react_renderer/