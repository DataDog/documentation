---
title: Template Variables
description: Use template variables to dynamically filter dashboard widgets by tags, attributes, and facets for flexible data exploration.
aliases:
    - /graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
    - /graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
    - /graphing/dashboards/template_variables/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-executive-dashboards"
  tag: "Blog"
  text: "Design effective executive dashboards with Datadog"
- link: "https://www.datadoghq.com/blog/zendesk-cost-optimization"
  tag: "Blog"
  text: "Optimizing Datadog at scale: Cost-efficient observability at Zendesk"
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

Template variables allow you to dynamically filter or group widgets in a dashboard. You can build saved views from your template variable selections to organize and navigate your visualizations through the dropdown selections.

A template variable is defined by:

* **Tag or Attribute**:
    * Tag: If you follow the recommended [tagging format][1] (`<KEY>:<VALUE>`), the *Tag* is the `<KEY>`.
    * Attribute: Use a [facet or measure as the template variable](#logs-apm-and-rum-queries).
* **Name**: A unique name for the template variable that appears in queries on the dashboard. Template variables are automatically named after the selected tag or attribute.
* **Default Value**: The tag or attribute value that appears automatically when the dashboard is loaded. Defaults to `*`.
* **Available Values**: The tag or attribute values available for selection in the dropdown menu. Defaults to `(all)`. The list of available values always includes `*`, which queries all values of the tag or attribute.

### Template variable values
Template variable values (values available using the template variable dropdown menus) are populated based on the sources that widgets in the dashboard are using. For example, if your dashboard has widgets querying logs, only values from logs are shown. If your dashboard has widgets querying logs, metrics, and RUM, values from logs, metrics, and RUM are shown.

For most sources, template variable values are relevant to your dashboard's global time frame. For example:
- If your dashboard's time frame is set to the last 15 minutes, only template variable values from the last 15 minutes are shown. 
- If your dashboard time frame is set to last August 15th from 12:00 a.m. to 11:59 p.m., only values from that timeframe are shown.

| Data Source                                     | Data query period   |
|--------------------------------------           |---------------------|
| Metrics                                         | Now - 48 hours      |
| Cloud cost                                      | Now - 48 hours      |
| All other sources                               | Dashboard time frame |

**Note**: If you do not see the tag or attribute you're looking for, it may be because that data hasn't been reported to Datadog recently. In addition, all data queried for template variables are subject to the data retention policy. For more information, see [Historical Data][4].

## Dashboard Layouts
To prevent variables from crowding the header, the dashboard displays a small subset for convenience. You can click on the **+ N** button to quickly examine the additional N variables present on your dashboard. 

{{< img src="/dashboards/template_variables/show_additional_template_variable.png" alt="Create saved views by selecting save selections as view" style="width:100%;" >}}

If you need to see all variables at once as you scroll, click on the "Expand template variables" button. 

{{< img src="/dashboards/template_variables/expand_template_variable_layout.png" alt="Create saved views by selecting save selections as view" style="width:100%;" >}}

## Add a template variable
To add a template variable in a dashboard:
1. Click **Add Variable** (or **+** if there are existing template variables)
2. Select from a list of recommended template variables or search for the specific tag you have in mind.
4. Select the widgets to apply this template variable.
6. Click the "Save" button to save your changes.

{{< img src="/dashboards/template_variables/add_template_variable.png" alt="Create saved views by selecting save selections as view" style="width:100%;" >}}

### Further Configuration 
When the template variable side panel is open, you can:
* Apply (or remove) this variable to selected widgets (note the **Select All** or **Deselect All** options)
* Switch between filtering and grouping
* Change the display name of the variable (displayed in the header and widget query)
* Select a default dropdown value
* Preview the dropdown values and further configure them with a search query

{{< img src="/dashboards/template_variables/edit_sidepanel.png" alt="Create saved views by selecting save selections as view" style="width:100%;" >}}

## Edit an existing template variable
Simply hover over the template variable on the dashboard header and click Edit. This will present the template variable side panel [mentioned above](#further-configuration) where you can customize the variable or apply the variable to more widgets. 

{{< img src="/dashboards/template_variables/hover_template_variable.png" alt="Create saved views by selecting save selections as view" style="width:100%;" >}}

## Saved views

### Create

1. Click on the **Saved Views** dropdown menu to the left of the template variables in your dashboard. When you update a template variable value, the value does not automatically save to a view.
1. To save your current template variables' values in a view, select **Save selections as view** from the **Saved Views** dropdown menu.
1. Enter a unique name for the view with an optional description.
1. Click **Save**.

{{< img src="/dashboards/template_variables/saved_view_create.png" alt="Create saved views by selecting save selections as view" style="width:100%;" >}}

Your saved view appears in the dropdown menu. Click on the view to retrieve your previously saved template variable values.

### Delete

1. Click on the saved views dropdown menu and hover over the desired saved view.
1. Click **Delete View**.

### Modify

The **Default view** can only be edited by changing the default values of the template variables. To edit the Default View:
1. Hover over the templates.
1. Click **Edit** when the button appears.
1. Click **Done** to save.

To modify template variables values for other saved views:
1. Select the desired saved view from the dropdown menu.
1. Edit the template variables to have the new desired models.
1. Open the dropdown menu again.
1. Click **Save Changes**.

{{< img src="/dashboards/template_variables/saved_views_update_template_variable.png" alt="Modify the template variables of your saved views" style="width:100%;" >}}

To edit the title and description:
1. Hover over the desired saved view from the dropdown menu.
1. Click **Edit**.
1. Modify the title or description.
1. Click **Save**.

## Usage

Template variables are used in widgets and event overlays.

### Logs, APM, and RUM queries

Template variables work with log, APM, and RUM widgets because they share the same tags. You can define log, APM, and RUM template variables based on facets. These variables start with `@`, for example: `@http.status_code`.

On log, APM, and RUM widgets, you can use wildcards in the middle of a value (for example, `eng*@example.com`) or use multiple wildcards in a value (for example, `*prod*`).

**Note**: Using **Add to all** for this type of template variable adds the variable to all log, APM, and RUM widgets.

### Widgets

When creating or editing a widget, existing filter template variables display as options in the `from` field, and existing group by template variables display as options following the `by` field. For example, if you configure the `environment` template variable, the `$environment` option is available as a dynamic variable in the widget.

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
[4]: /dashboards/faq/historical-data/
