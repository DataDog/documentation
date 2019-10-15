---
title: Template Variables
kind: documentation
aliases:
    - /graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
    - /graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
further_reading:
- link: "graphing/dashboards/"
  tag: "Documentation"
  text: "Learn how to create Dashboards in Datadog"
- link: "graphing/dashboards/shared_graph"
  tag: "Documentation"
  text: "Share your Graphs outside of Datadog"
- link: "graphing/widgets"
  tag: "Documentation"
  text: "Discover all available Widgets for your Dashboard"
---

Template variables allow you to dynamically apply specific metric values to one or more widgets in each dashboard. 

## Add a Template Variable

To create your first template variable in the dashboard, click **Add Template Variables**. If there template variables are already defined, click on the *-pencil-* icon to open the template variable editor. Once in edit mode click on **Add Variable +** to add another template variable. 

{{< img src="graphing/dashboards/template_variables/edit_mode_template_variable.png" alt="Edit template variable" responsive="true" style="width:40%;">}}

A template variable is defined by:
* **Name**:
    The value of your template variable displayed in your graph query.
* **Tag or Attribute**:

    * Tag: If you follow [tagging best practices][1] (`key:value` format), the *Tag* is the `key` of your tag.
    * Attribute: Use a [facet or measure as the template variable](#template-variables-with-logs-and-apm-queries).
* **Default Value**:
    The default value for your template variable tag or attribute.

Once created, notice that you have statistics upon your template variables usage in your graphs. In the picture below, the template variable is not used in both graph of the dashboard:

{{< img src="graphing/dashboards/template_variables/stats_tv.png" alt="statistic TV" responsive="true" style="width:70%;">}}

Decide if you want to remove/add this template variable to all of your graph widgets with the respective **Remove From All** and **Add to All** buttons.

#### Template variables with logs and APM queries

Template variables work with log and APM query based widgets because metrics, logs, and APM share the same tags.
Additionally, you can define log or APM template variables based on [log][2] or APM facets. These template variables start with `@`.

{{< img src="graphing/dashboards/template_variables/log_template_variables.png" alt="log template variables" responsive="true" style="width:85%;">}}

**Note**: Using the `Add to all` button adds the template variable to all log/APM widgets.

#### Template variable presets

##### Creating a Preset of Template Variables

To the left of the template variables on a dashboard, there is a dropdown listed as “(Default Value)”. When you make a change to a template variable value, the value is not automatically saved to a preset. 
To save the current values of the template variables in a preset, click on the dropdown menu and click “Save Selections as preset”. From there, you will be prompted to enter a unique name for the preset. After saving, this preset will be listed in the dropdown menu. By clicking on this preset you can return to the template variables' previously saved values. 

##### Delete a Preset

To delete a preset, click on the dropdown again and click “Manage preset...”. From there, a popup with each of the saved presets will be displayed with the trash bin icon next to each for deletion. Click the trash bin icon to delete that preset.

##### Modify a Preset

To modify the “(Default Value)” preset, click on the pencil icon and update the template variable values. Then click “Done” to save. 

If any values in the other presets are changed, save the view as a new preset, and then delete the original preset. 

## Use Template Variables

### Widgets

Once you have defined a template variable, it appears in the options displayed in the `from`  field:

{{< img src="graphing/dashboards/template_variables/tv_in_graph.png" alt="Template variable in graphs" responsive="true" style="width:50%;">}}

After the graph is saved, the value of this template variable is the one selected on top of your dashboard:

{{< img src="graphing/dashboards/template_variables/selecting_template_variables.png" alt="Selecting template variables" responsive="true" style="width:75%;">}}

#### Note widget

Even if the note widget doesn't contain any graphs, you can display:

* The selected template variable with the `$<TEMPLATE_VARIABLE_KEY>` syntax.
* The selected template variable value in it with the `$<TEMPLATE_VARIABLE_KEY>.value` syntax.

For instance, with the following note widget configuration:

```
$env

$env.value
```

Selecting the `dev` value for the `$env` template variable outputs the following result:

{{< img src="graphing/dashboards/template_variables/template_variable_note_widget.png" alt="Note widget template variables" responsive="true" style="width:30%;">}}

### Events Overlay

[The event overlay][3] search allows you to correlate metrics and events. Use template variables to find events that share certain tags with the metrics in your dashboard. The event overlay search is applied through an individual graph.

Values from dashboard template variables can be directly captured by using the `$<TEMPLATE_VARIABLE_KEY>.value` syntax in the event search field.

**Note**: Dashboard template variables must be metric tags; event-supplied tags cannot be used as dashboard template variables.

#### Single Template variable

For example, to search for events in the event stream with the same region tag, use: `tags:region:$region.value`.

{{< img src="graphing/dashboards/template_variables/tv5.png" alt="tv5" responsive="true" style="width:75%;">}}

In the following example, the template variable resolves to `tags:region:ap-south-1`. After those events are brought up in the event search overlay, the timing of the events are marked by pink bars in the graphs to show the timing of events:

{{< img src="graphing/dashboards/template_variables/tv7.png" alt="tv7" responsive="true" style="width:85%;">}}

#### Multiple Template variables

Use multiple template variables in the search field to display all corresponding events tagged. The following example uses the query `tags:role:$role.value,env:$env.value`

{{< img src="graphing/dashboards/template_variables/tv8.png" alt="tv8" responsive="true" style="width:85%;">}}

#### Associating Template variables with other Tags

Use the `$<TEMPLATE_VARIABLE_KEY>.value` syntax to capture the resolved `key:value` from a given template variable and use it with other filters.

Find below an example that uses the `env` tags together with the `hosts` `tag` in the search term `tags:env:$env.value hosts:$host.value`

{{< img src="graphing/dashboards/template_variables/tv9.png" alt="tv9" responsive="true" style="width:85%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/#tags-best-practices
[2]: /logs/explorer/?tab=facets#setup
[3]: /graphing/event_stream
