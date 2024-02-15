---
title: Template Variables
kind: documentation
aliases:
    - /graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
    - /graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
    - /graphing/dashboards/template_variables/
further_reading:
- link: "https://www.datadoghq.com/blog/template-variable-associated-values/"
  tag: "Blog"
  text: "Use associated template variables to refine your dashboards"
- link: "https://www.datadoghq.com/blog/dynamic-template-variable-syntax-dashboards/"
  tag: "Blog"
  text: "Speed up dashboard workflows with dynamic template variable syntax"
- link: "https://www.datadoghq.com/blog/template-variable-available-values/"
  tag: "Blog"
  text: "Filter dashboards faster with template variable available values"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Create Dashboards in Datadog"
- link: "/dashboards/sharing/"
  tag: "Documentation"
  text: "Share your Graphs outside of Datadog"
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Discover Widgets for your Dashboard"
---

## Overview

Template variables allow you to dynamically filter one or more widgets in a dashboard. You can build saved views from your template variable selections to organize and navigate your visualizations through the dropdown selections. 

A template variable is defined by:

* **Tag or Attribute**:
    * Tag: If you follow the recommended [tagging format][1] (`<KEY>:<VALUE>`), the *Tag* is the `<KEY>`.
    * Attribute: Use a [facet or measure as the template variable](#logs-apm-and-rum-queries).
* **Name**: A unique name for the template variable that appears in queries on the dashboard. Template variables are automatically named after the selected tag or attribute.
* **Default Value**: The tag or attribute value that appears automatically when the dashboard is loaded. Defaults to `*`.
* **Available Values**: The tag or attribute values available for selection in the dropdown menu. Defaults to `(all)`. The list of available values always includes `*`, which queries all values of the tag or attribute.

## Add a template variable

To add a template variable in a dashboard:
1. Click **Add Variables**. 
1. If template variables are already defined, hover over the dashboard header and click the **Edit** button to enter edit mode.
1. In edit mode, click the **+ (plus)** icon to create a new template variable.
1. (Optional) After selecting a tag, click the **+ Configure Dropdown Values** button to rename the variable and set default or available values.
  {{< img src="dashboards/template_variables/add_template_variable_configure_dropdown_values.png" alt="Add Variable popover showing the Configure Dropdown Values button" style="width:80%;" >}}

## Edit a template variable

To edit a template variable in a dashboard:
1. Click the **Edit** button in the dashboard header.
1. In edit mode, click on a template variable and make changes in the popover.
1. To rearrange variables in the header, hover over a variable, then click and drag the drag icon handle.
  {{< img src="dashboards/template_variables/edit_template_variable_drag.png" alt="Template variable edit mode popover showing the drag icon allowing you to rearrange the order" style="width:100%;" >}}

## Apply a template variable to widgets

To add a template variable to widget queries:
1. Click the **Edit** button in the dashboard header.
1. In edit mode, click on a template variable to open its popover.
1. Click **Select Widgets** to enter widget selection mode.
1. The banner displays the number of sources using the variable. In the example below, the template variable `env` is used in 20 graphs on the dashboard:
  {{< img src="dashboards/template_variables/apply_template_variable_to_widgets.png" alt="Example dashboard displaying confirmation to apply 'env' template variable to 20 widgets" style="width:100%;" >}}
1. Click on individual widgets to preview the graph with the template variable interpolated.
1. To add or remove from all widgets in a group, toggle the checkbox on the right corner of the group.
1. To add or remove from all widgets on the dashboard, click **Select All** or **Deselect All** in the selection banner.
1. Click **Save** or **X** in the banner to exit widget selection mode.

## Saved views

### Create

Click on the **Saved Views** dropdown menu to the left of the template variables in your dashboard. When you update a template variable value, the value does not automatically save to a view.

{{< img src="dashboards/template_variables/saved_views_dropdown_options.png" alt="Saved views dropdown options to set selected template variables as the default view or a saved view" style="width:90%;" >}}

To save your current template variables' values in a view, select **Save selections as view** from the **Saved Views** dropdown menu. Enter a unique name for the view and click **Save**. 

Your saved view appears in the dropdown menu. Click on the view to retrieve your previously saved template variable values.

### Delete

To delete a view, click on the saved views dropdown menu and choose **Manage views...**. From there, a popup with your saved views is displayed with a trash bin icon next to each view. Click the appropriate trash bin icon to delete a view.

### Modify

To modify the **Default view**, click on the pencil icon and update the template variable values. Then click **Done** to save. If any values in the other views are changed, save the values as a new view, and then delete the original view.

## Usage

Template variables are used in widgets and event overlays. 

### Logs, APM, and RUM queries

Template variables work with log, APM, and RUM widgets because they share the same tags. You can define log, APM, and RUM template variables based on facets. These variables start with `@`, for example: `@http.status_code`.

On log, APM, and RUM widgets, you can use wildcards in the middle of a value (for example, `eng*@example.com`) or use multiple wildcards in a value (for example, `*prod*`).

**Note**: Using **Add to all** for this type of template variable adds the variable to all log, APM, and RUM widgets.

### Widgets

When creating or editing a widget, existing template variables display as options in the `from` field. For example, if you configure the `environment` template variable, the `$environment` option is available as a dynamic variable in the widget. 

{{< img src="dashboards/template_variables/dynamic_template_variable.png" alt="Template variable can be set dynamically in widgets" style="width:100%;">}}

Selecting **production** for the `environment` value dynamically scopes widgets with the `$environment` variable to the production environment.

When you change the value of a template variable, the dashboard URL updates to reflect the template variable value with the format `&tpl_var_<TEMPLATE_VARIABLE_NAME>=<TEMPLATE_VARIABLE_VALUE>`. For example, a dashboard with the template variable `$env` changed to `prod` would have the URL parameter `&tpl_var_env=prod`.

To include the value in the query, append it with the syntax `$<TEMPLATE_VARIABLE_NAME>.value`. For example, with a template variable named `service`, use `env:staging-$service.value`.

Hover over the template variable fields to see at a quick glance, the widgets that use that variable highlighted on the dashboard.

#### Associated template variables

When selecting a template variable value, associated values are displayed at the top of the selector. Associated values are calculated from other template variable values selected on the page, and seamlessly identify the related values without any configuration.

#### Text

For text-based widgets, you can display a template variable's tag/attribute and value with `$<TEMPLATE_VARIABLE_NAME>`, its key with `$<TEMPLATE_VARIABLE_NAME>.key`, or its value with `$<TEMPLATE_VARIABLE_NAME>.value`. This can come after any non-alphanumeric character, and can be followed by whitespace or any of the following characters: `#`, `$`, `%`, `=`, `;`, `"`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `*`, `+`, `|`, and `?`.

**Note**: The wildcard syntax is not supported following a template variable.

For example, with a template variable named `env`, with tag/attribute `environment`, and with a selected value of `dev`:
* `$env` displays `environment:dev`
* `$env.key` displays `environment`
* `$env.value` displays `dev`
* `$env*` looks for the exact value `dev*` NOT `dev{dynamic-wildcard-value}`

### Events overlay

Use the events overlay search with template variables to find events that share certain tags with the metrics in your dashboard. The event overlay search is applied through an individual graph.

Values from dashboard template variables can be directly captured by using the `$<TEMPLATE_VARIABLE_KEY>.value` syntax in the event search field.

**Note**: Dashboard template variables must be metric tags, not event tags.

#### Dashboard

From your dashboard, search events with template variables using the format:

```text
<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

For example, searching for `region:$region.value` with a value of `us-east1` for the `region` template variable displays events tagged with `region:us-east1`. Additionally, the timing of the events are marked by pink bars in the graphs.

Use commas to search using multiple template variables, for example: `role:$role.value,env:$env.value`

**Note**: Once you press *enter* to search, `$region.value` updates to the value in the template variable dropdown menu.

#### Widgets

From your widgets, overlay the timing of the events using template variables with the format:

```text
$<TEMPLATE_VARIABLE_NAME>
```

For example, enter `$region` in the event overlays search box. This searches for events with the value in the `region` template variable dropdown menu.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/#define-tags
[2]: /logs/explorer/facets/
[3]: /real_user_monitoring/explorer/?tab=facets#setup-facets-measures
