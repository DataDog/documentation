---
title: Monitoring Available Disk Space
kind: documentation
---


A common system metric to monitor is the available disk space on a given system or host. This guide will help you create a monitor alerting you when free disk space for a host falls below 10% for any host reporting to Datadog.

To create the monitor for available disk space:

1. In the navigation menu, click **Monitors**.
2. Click **New Monitor**.
3. Select **Metric** as the monitor type.
4. Define the metric:
     1. In the **Define the metric** section, input `system.disk.free` and avg by `host` (Query a).
     2. Click **Add Query** and input `system.disk.total` and avg by `host` (Query b).
     3. In the formula that appears, replace the default `a + b` with `a/b*100`.
     
         {{< img src="monitors/guide/monitoring_free_disk_space.png" alt="Query definition of system.disk.free and system.disk.total with formula a/b*100" style="width:80%;">}}
    
         Alernatively, you can use the **Source** tab and define the query as `avg:system.disk.free{*} by {host} / avg:system.disk.total{*} by {host} * 100`

     4. You can choose to leave the default evaluation of 5 minutes, or choose a longer evaluation to avoid false alerts for temporary unavailable disk space.
5. Set alert conditions:
     1. Choose **below** from the threshold options.
     2. Enter `10` in the value field (Alerted when disk space falls below 10%)
6. Set notification options:
     1. In **Configure notifications & automations**, specify the notification message. Include relevant details and a meaningful message template:
     ```
       {{#is_alert}}Warning: Free disk space is below 20% on {{host.name}}. Free space: {{system.disk.free}} bytes, Total space: {{system.disk.total}} bytes.{{/is_alert}}
     ```

7. Set the rest of the notification options according to your preferences. Remember to save the monitor by clicking **Create** at the bottom of the page.
