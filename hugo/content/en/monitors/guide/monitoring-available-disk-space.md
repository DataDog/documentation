---
title: Monitoring Available Disk Space
description: "Step-by-step guide to create monitors for available disk space that alert when free disk space falls below a specified percentage threshold."
---



A common system metric to monitor is the available disk space on a given system or host. This guide helps you create a monitor that alerts you when free disk space for a host falls below 10% for any host reporting to Datadog.

To create the monitor for available disk space:

1. In the navigation menu, click {{< ui >}}Monitors{{< /ui >}}.
2. Click {{< ui >}}New Monitor{{< /ui >}}.
3. Select {{< ui >}}Metric{{< /ui >}} as the monitor type.
     1. In the {{< ui >}}Define the metric{{< /ui >}} section, use `system.disk.free` for the metric and select `host` for {{< ui >}}avg by{{< /ui >}}. This is Query a.
     2. Click {{< ui >}}Add Query{{< /ui >}}. For this metric, use `system.disk.total` for the metric and use `host` for {{< ui >}}avg by{{< /ui >}}. This is Query b.
     3. In the formula that appears, replace `a + b` with `a/b*100`.
     
         {{< img src="monitors/guide/monitoring_free_disk_space.png" alt="Query definition of system.disk.free and system.disk.total with formula a/b*100" style="width:80%;">}}
    

     4. Under {{< ui >}}Evaluation Details{{< /ui >}}, choose your desired evaluation interval.

         {{< img src="monitors/guide/monitoring_free_disk_space_alert_criteria.png" alt="Alert criteria configuration set to below threshold, with a value of 10." style="width:80%;">}}


5. Under {{< ui >}}Set alert conditions{{< /ui >}}, select {{< ui >}}below{{< /ui >}} from the threshold options and enter `10` in {{< ui >}}Alert threshold{{< /ui >}} field.
6. In {{< ui >}}Configure notifications & automations{{< /ui >}}, give your monitor a name, then specify the notification message. Include relevant details and a meaningful message template. For example:

     ```
       {{#is_alert}} Alert: Free disk space is below {{threshold}}% on {{host.name}}. {{/is_alert}}
       {{#is_warning}} Warning: Free disk space is below {{warn_threshold}}% on {{host.name}}. {{/is_warning}}
       Disk space available: {{value}}%
     ```

7. Click {{< ui >}}Create{{< /ui >}} to save the monitor.

[1]: https://app.datadoghq.com/monitors/
