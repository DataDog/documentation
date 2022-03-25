---
title: RUM Dashboards
kind: documentation
further_reading:
    - link: '/real_user_monitoring/explorer'
      tag: 'Documentation'
      text: 'Explore your views within Datadog'
---

When you create a RUM application dashboards are created within Datadog to analyze all the [data collected][1]. RUM dashboards can be found in the dashboards list and have the Datadog logo:

{{< img src="real_user_monitoring/dashboards/rum_dashboard_in_dashlist.png" alt="RUM Dashboard in dash list" >}}

You can also access these dashboards through your [RUM application page][2]. Click on the **Dashboard** links associated with your application:

{{< img src="real_user_monitoring/dashboards/rum_applications.mp4" alt="RUM applications" video=true >}}

{{< whatsnext desc="The following dashboards are available:" >}}
  {{< nextlink href="/real_user_monitoring/dashboards/performance_overview_dashboard" >}}<u>Performance Overview</u>: get a global idea about your website’s performance and demographics. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/resources_dashboard" >}}<u>Resources</u>: understand which resources are the slowest and investigate third party resources. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/errors_dashboard" >}}<u>Errors</u>: analyze errors appearing in users’ console by browser and device type. {{< /nextlink >}}
{{< /whatsnext >}}

## Dashboard interactions

You can customize your dashboards as you would with [any other one][3], or directly explore the underlying data in [your RUM explorer][1].

### Template variables

RUM dashboards are generated for all your applications with a set of default template variables automatically created. Use the template variables on top of it to start filtering RUM dashboards. For instance, use the `applicationId` template variable to filter down to a specific application.

{{< img src="real_user_monitoring/dashboards/template_variables.mp4" alt="Template variable" video=true style="width:50%;" >}}

### View RUM events

To explore all the individual events, click on any graph and select _View RUM events_ to be redirected to the RUM Explorer with the currently selected filters.

{{< img src="real_user_monitoring/dashboards/view_rum_events.mp4" alt="View RUM events" video=true style="width:80%;" >}}

### Customize dashboards

Clone your RUM dashboards and customize them to fit your needs. You can add widgets and modify the template variables:

{{< img src="real_user_monitoring/dashboards/clone_dashboard.png" alt="Clone Dashboard" style="width:50%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/rum/list
[3]: /dashboards/
