---
title: Template Variables
kind: documentation
aliases:
    - /graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
    - /graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
    - /graphing/dashboards/template_variables/
further_reading:
- link: "graphing/dashboards/"
  tag: "Documentation"
  text: "Create Dashboards in Datadog"
- link: "graphing/dashboards/shared_graph"
  tag: "Documentation"
  text: "Share your Graphs outside of Datadog"
- link: "graphing/widgets"
  tag: "Documentation"
  text: "Discover Widgets for your Dashboard"
---

Template variables allow you to dynamically filter one or more widgets in a dashboard.

## Create

To create your first template variable in the dashboard, click **Add Template Variables**. If template variables are already defined, click on the *pencil* icon to open the template variable editor. Once in edit mode, click on **Add Variable +** to add a template variable.

A template variable is defined by:

* **Name**: A unique name for the template variable. This name is used to filter content on your dashboard.
* **Tag or Attribute**:
    * Tag: If you follow the recommended [tagging format][1] (`<KEY>:<VALUE>`), the *Tag* is the `<KEY>`.
    * Attribute: Use a [facet or measure as the template variable](#logs-and-apm-queries).
* **Default Value**:
    The default value for your template variable tag or attribute.

After creating a template variable, Datadog displays the number of sources using the variable. In the example below, the template variable is used in one out of two graphs:

{{< img src="graphing/dashboards/template_variables/stats_tv.png" alt="statistic TV"  style="width:85%;">}}

[Use the template variables](#use) in individual widgets or click the **Add to All** option. To remove a template variable from all widgets, click the **Remove From All** option.

### Logs and APM queries

Template variables work with log and APM widgets because metrics, logs, and APM share the same tags.
Additionally, you can define log or APM template variables based on [log][2] or APM facets. These variables start with `@`, for example: `@http.status_code`.

**Note**: Using **Add to all** for this type of template variable adds the variable to all log and APM widgets.

### Saved views

#### Create

{{< img src="graphing/dashboards/template_variables/default_view.png" alt="Default Saved View"  style="width:85%;">}}

To the left of the template variables on a dashboard, there is a dropdown listed as *(Default Value)*. When you make a change to a template variable value, the value is not automatically saved to a view.
To save the current values of the template variables in a view, click on the dropdown menu and click *Save selections as view*. From there, you are prompted to enter a unique name for the view. After saving, this view is listed in the dropdown menu. Click on this view to retrieve the previously saved values for the template variables.

#### Delete

To delete a view, click on the saved views dropdown and choose *Manage views...*. From there, a popup with your saved views is displayed with a trash bin icon next to each view. Click the appropriate trash bin icon to delete a view.

{{< img src="graphing/dashboards/template_variables/manage_views.png" alt="Manage View Popup"  style="width:75%;">}}

#### Modify

To modify the *(Default Value)* view, click on the pencil icon and update the template variable values. Then click *Done* to save. If any values in the other views are changed, save the values as a new view, and then delete the original view.

## Use

Template variables are used in widgets and event overlays.

### Widgets

When creating or editing a widget, existing template variables display as options in the `from` field. For example, if you create the template variable `env`, the option `$env` is available.

After the widget is saved, the value of the template variable is the one selected from the top of your dashboard:

{{< img src="graphing/dashboards/template_variables/selecting_template_variables.png" alt="Selecting template variables"  style="width:75%;">}}

#### Text

For text based widgets, you can display a template variable name and value with `$<TEMPLATE_VARIABLE_NAME>` or display just the value with `$<TEMPLATE_VARIABLE_NAME>.value`. For example, with a template variable named `env` and a selected value of `dev`:

* `$env` displays `env:dev`
* `$env.value` displays `dev`

### Events overlay

Use the [events overlay][3] search with template variables to find events that share certain tags with the metrics in your dashboard. The event overlay search is applied through an individual graph.

Values from dashboard template variables can be directly captured by using the `$<TEMPLATE_VARIABLE_KEY>.value` syntax in the event search field.

**Note**: Dashboard template variables must be metric tags, not event tags.

#### Dashboard

From your dashboard, search the event stream with template variables using the format:

```text
tags:<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

For example, searching for `tags:region:$region.value` with a value of `us-east1` for the `region` template variable displays events tagged with `region:us-east1`. Additionally, the timing of the events are marked by pink bars in the graphs.

{{< img src="graphing/dashboards/template_variables/search_dashboard.png" alt="Search dashboard"  style="width:85%;">}}

Use commas to search using multiple template variables, for example: `tags:role:$role.value,env:$env.value`

**Note**: Once you hit *enter* to search, `$region.value` updates to the value in the template variable drop-down.

#### Widgets

From your widgets, overlay the timing of the events using template variables with the format:

```text
tags:$<TEMPLATE_VARIABLE_NAME>
```

For example, enter `tags:$region` in the event overlays search box. This searches for events with the value in the `region` template variable drop-down:

{{< img src="graphing/dashboards/template_variables/search_widget.png" alt="Search widget"  style="width:85%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/#defining-tags
[2]: /logs/explorer/?tab=facets#setup
[3]: /graphing/dashboards/timeboard/#events
