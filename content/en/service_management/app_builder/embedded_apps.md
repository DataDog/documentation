---
title: Embedded Apps
kind: documentation
disable_toc: false
further_reading:
- link: "https://app.datadoghq.com/app-builder/action-catalog"
  tag: "App"
  text: "Actions Catalog"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

When you have Datadog App Builder apps embedded in your dashboards, you can take direct actions on your resources, and all of the relevant data and context is immediately available. Link your app with the dashboard's time frame and template variables to dynamically set the scope of the app's actions, which allows you to carry out actions in your environment at any needed scope.

## Add apps to your dashboard

Add a previously published app to your dashboard by dragging the **App** widget type out of the dashboard's widget tray:

{{< img src="/service_management/app_builder/embedded_apps/app_widget_select.png" alt="The dashboard widget tray with the App widget type highlighted" style="width:80%;">}}

The App Editor modal appears, allowing you to select an app and provide it with a title:

{{< img src="/service_management/app_builder/embedded_apps/app_editor.png" alt="The App Editor modal with an app selected and a widget title" style="width:80%;">}}

## Sync your app with dashboard template and time frame variables

You can link your app to template variables anywhere that supports template expressions in your queries or app elements. You can also link your app to the time frame that is selected on your dashboard.

When you change the value of a template variable or time frame on the dashboard, the linked app elements update automatically. For example, when you select an `instance_id` value using the template variable dropdown or directly from a graph, the `instance_id` value is added to the app's filter. This allows you to perform actions on that specific instance:

{{< img src="service_management/app_builder/embedded_apps/template_variables.mp4" alt="Selecting a template variable value from a graph" video="true">}}


### Template variable examples

To populate a select component with a list of all available template variables, add the following template expression to your select component's **Options** field:

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.map(tvar => tvar.name )}
{{< /code-block >}}

To list all of the available values of a specific template variable, use the following template expression:

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.availableValues}
{{< /code-block >}}

To get the selected value of a template variable, use the following template expressions:

- For a single-select template variable:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.value}
{{< /code-block >}}
- For a multi-select template variable:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.values}
{{< /code-block >}}

### Time frame examples

To get the time frame start value, use the following template expressions:

- For the numerical timestamp:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.start}
{{< /code-block >}}
- For a formatted date and time:
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.start).toLocaleString()}
{{< /code-block >}}

To get the time frame end value, use the following template expressions:

- For the numerical timestamp:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.end}
{{< /code-block >}}
- For a formatted date and time:
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.end).toLocaleString()}
{{< /code-block >}}

To add a button that sets the value of a date range picker component to the dashboard's time frame, perform the following steps:

1. Add a date range picker component to your app and name it "dateRangePicker0".
1. Add a button to your app.
1. Under **Events**, fill in the following values:
    - **Event**: click
    - **Reaction**: Set Component State
    - **Component**: dateRangePicker0
    - **State Function**: setValue
    - **Value**: `${global?.dashboard?.timeframe}`
1. Save and publish your app.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][1].

[1]: https://datadoghq.slack.com/
