---
title: Correlate metrics and events using dashboard template variables
kind: faq
customnav: graphingnav
---

Dashboard template variables allows you to dynamically explore metrics across different sets of tags by using variables instead of specific tags. The event overlay search can be helpful to correlate metrics to events and you can use dashboard template variables to find events that share certain tags with the metrics on your dashboard. The event overlay search can be [applied through an individual graph](/graphing/faq/how-do-i-overlay-events-onto-my-dashboards), but you can also use it across an entire dashboard.

Values from dashboard template variables can be directly captured by using the $variable.value syntax in the event search field. For example, if you have set up an "env" template variable, $env resolves to be the key:value pair from the tag and $env.value allows you to directly access that tag's value.

To get started, first set up your dashboard template variables by clicking the gear and selecting **Edit Template Variables**.

{{< img src="graphing/faq/tv1.png" alt="tv1" responsive="true" popup="true">}}

Select which template variables you want to add and set the variable name, the default being the same name as the tag. (Note: dashboard template variables must be metric tags, event-supplied tags cannot be used as dashboard template variables)

{{< img src="graphing/faq/tv2.png" alt="tv2" responsive="true" popup="true">}}

Now the available template variables are shown on top, with the default set to all (*) and selecting a different value for the variable filters the metrics by that tag.

{{< img src="graphing/faq/tv4.png" alt="tv4" responsive="true" popup="true">}}

To directly capture the value of the template variables, use the following syntax: $variable.value. For example, to search for events in the event stream with the same region tag, use: tags:region:$region.value.

{{< img src="graphing/faq/tv5.png" alt="tv5" responsive="true" popup="true">}}

In the following example, the template variable resolves to tags:region:ap-south-1. After those events are brought up in the event search overlay, the timing of the events are marked by pink bars in the graphs to show the timing of events:

{{< img src="graphing/faq/tv7.png" alt="tv7" responsive="true" popup="true">}}


You can also use multiple template variables in the search field and the event overlay search displays all events tagged with the same values from the template variables. The following example uses the query tags:role:$role.value,env:$env.value

{{< img src="graphing/faq/tv8.png" alt="tv8" responsive="true" popup="true">}}


Since the $variable.value syntax captures the resolved key value from the template variable, it can be used with other filters, such as hosts:. Here is an example that uses the tags field together with the hosts: field in the search term tags:env:$env.value hosts:$host.value

{{< img src="graphing/faq/tv9.png" alt="tv9" responsive="true" popup="true">}}
