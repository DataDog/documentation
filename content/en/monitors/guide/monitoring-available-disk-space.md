---
title: Monitoring Available Disk Space
---



A common system metric to monitor is the available disk space on a given system or host. This guide helps you create a monitor that alerts you when free disk space for a host falls below 10% for any host reporting to Datadog.

To create the monitor for available disk space:

1. In the navigation menu, click **Monitors**.
2. Click **New Monitor**.
3. Select **Metric** as the monitor type.
     1. In the **Define the metric** section, use `system.disk.free` for the metric and select `host` for **avg by**. This is Query a.
     2. Click **Add Query**. For this metric, use `system.disk.total` for the metric and use `host` for **avg by**. This is Query b.
     3. In the formula that appears, replace `a + b` with `a/b*100`.
     
         {{< img src="monitors/guide/monitoring_free_disk_space.png" alt="Query definition of system.disk.free and system.disk.total with formula a/b*100" style="width:80%;">}}
    

     4. Under **Evaluation Details**, choose your desired evaluation interval.
5. Under **Set alert conditions**, select **below** from the threshold options and enter `10` in **Alert threshold** field.
6. In **Configure notifications & automations**, give your monitor a name, then specify the notification message. Include relevant details and a meaningful message template. For example:

     ```
       {{#is_alert}}Warning: Free disk space is below 10% on {{host.name}}. Free space: {{system.disk.free}} bytes, Total space: {{system.disk.total}} bytes.{{/is_alert}}
     ```

7. Click **Create** to save the monitor.

[1]: https://app.datadoghq.com/monitors/