---
title: Embedded Apps
kind: documentation
disable_toc: false
further_reading:
- link: "/service_management/workflows/actions_catalog/"
  tag: "Documentation"
  text: "Actions Catalog"
---

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Join the Beta!">}}
Datadog App Builder is in private beta. Complete the form to request access.
{{< /callout >}}

With Datadog App Builder apps embedded into your dashboards, you can take direct actions on your vital resources with all of the relevant data and context immediately available. Link your app with the dashboard's timeframe and template variables to dynamically set the scope of the app's actions, allowing you to carry out actions in your environment at any needed scope.

## Add apps to your dashboard

Add a previously published app to your dashboard by dragging the **App** widget type out of the dashboard's widget tray:

{{< img src="/service_management/app_builder/embedded_apps/app_widget_select.png" alt="The dashboard widget tray with the App widget type highlighted" style="width:80%;">}}

The App Editor modal appears, allowing you to select an app and provide it with a title:

{{< img src="/service_management/app_builder/embedded_apps/app_editor.png" alt="The App Editor modal with an app selected and a widget title" style="width:80%;">}}

## Sync your app with dashboard template variables

You can link your app to template variables anywhere that supports template expressions in your queries or app elements. Use the following code snippet as an example, ensuring to replace the `<TEMPLATE_VARIABLE_NAME>` and `<DEFAULT_VALUE>` with the template variable name and default value, respectively. Paste the snippet into your template expression.

**Note**: If you want to leave an element (such as a search field) blank by default, you can set the default value as an empty string `""` or `undefined`.

{{< code-block lang="json" disable_copy="false" collapsible="false" >}}
${self.options?.find(o => o.includes(dashboard.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.value)) || '<DEFAULT_VALUE>'}
{{< /code-block >}}

### Scope your app dynamically

App elements that are linked with dashboard template variables update in tandem with the values of the template variables on the dashboard, so you can focus your app's activities wherever needed. For example, selecting a particular `instance_id` value through the template variable dropdown or directly from a graph adds the `instance_id` value to the app's filter as well, so you can immediately take any needed actions on that instance:

{{< img src="service_management/app_builder/embedded_apps/template_variables.mp4" alt="Selecting a template variable value from a graph" video="true">}}

{{< partial name="whats-next/whats-next.html" >}}