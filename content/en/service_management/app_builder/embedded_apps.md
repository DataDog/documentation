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

{{< callout url="" btn_hidden="true" header="Try the Beta!">}}
App Builder is in beta. Access it from the <a href="https://app.datadoghq.com/app-builder/">App Builder</a> page in Datadog.
{{< /callout >}}

When you have Datadog App Builder apps embedded in your dashboards, you can take direct actions on your resources, and all of the relevant data and context is immediately available. Link your app with the dashboard's time frame and template variables to dynamically set the scope of the app's actions, which allows you to carry out actions in your environment at any needed scope.

## Add apps to your dashboard

Add a previously published app to your dashboard by dragging the **App** widget type out of the dashboard's widget tray:

{{< img src="/service_management/app_builder/embedded_apps/app_widget_select.png" alt="The dashboard widget tray with the App widget type highlighted" style="width:80%;">}}

The App Editor modal appears, allowing you to select an app and provide it with a title:

{{< img src="/service_management/app_builder/embedded_apps/app_editor.png" alt="The App Editor modal with an app selected and a widget title" style="width:80%;">}}

## Sync your app with dashboard template and time frame variables

You can link your app to template variables anywhere that supports template expressions in your queries or app elements. Use the following code snippet as an example, replacing `<TEMPLATE_VARIABLE_NAME>` and `<DEFAULT_VALUE>` with the template variable name and default value, respectively. Paste the snippet into your template expression.

**Note**: If you want to leave an element (such as a search field) blank by default, you can set the default value to an empty string (`""`) or `undefined`.

{{< code-block lang="json" disable_copy="false" collapsible="false" >}}
${self.options?.find(o => o.value.includes(global.dashboard.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.value)) || 'DEFAULT_VALUE'}
{{< /code-block >}}

You can also link your app to the time frame that is selected on your dashboard. Paste the following code snippet into your template expression:

{{< code-block lang="json" disable_copy="false" collapsible="false" >}}
${global.dashboard.timeframe}
{{< /code-block >}}

You can also access specific values of `timeframe`, such as `start` and `end`, using dot notation (for example,`${global.dashboard.timeframe.start}`).

### Scope your app dynamically

App elements that are linked with dashboard template variables or time frame update in tandem with the values of the template variables or time frame on the dashboard. For example, selecting a particular `instance_id` value through the template variable dropdown or directly from a graph adds the `instance_id` value to the app's filter as well, so that you can take any necessary actions on that instance:

{{< img src="service_management/app_builder/embedded_apps/template_variables.mp4" alt="Selecting a template variable value from a graph" video="true">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][1].

[1]: https://datadoghq.slack.com/
