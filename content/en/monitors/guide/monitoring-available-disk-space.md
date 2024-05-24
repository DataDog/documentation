# Monitoring available Disk Space

A common system metric to monitor is the available disk space on a given system or host. This guide will help you create a monitor alerting you when free disk space for a host falls below 10% for any host reporting to Datadog.

## Step by step guide

### 1: Create a Metric Monitor

1. In the left-hand navigation menu, click on **Monitors**.
2. Click on the **New Monitor** button.
3. Select **Metric** as the monitor type.

### Step 2: Configure the Monitor

1. **Define the metric**:
   - In the **Define the metric** section, input `system.disk.free` and avg by `host` (Query a)
   - Then click on **Add Query** and input `system.disk.total` and avg by `host` (Query b)
   - A formula appears, the default is `a + b`, replace it with `a/b*100`
   
   {{< img src="monitors/guide/monitoring_free_disk_space.png" alt="Query definition of system.disk.free and system.disk.total with formula a/b*100" style="width:80%;">}}

   - Alernatively, you can use the **Source** tab and define the query as `avg:system.disk.free{*} by {host} / avg:system.disk.total{*} by {host} * 100`
   - You can choose to leave the default evaluation of 5 minutes, or choose a longer evaluation to avoid false alerts for temporary unavailable disk space.

2. **Set alert conditions**:
   - Choose **below** from the threshold options.
   - Enter `10` in the value field (Alerted when disk space falls below 10%)

### Step 3: Set Notification Options

- Under **Configure notifications & automations**, specify the notification message. Include relevant details and a meaningful message template:
     ```
     {{#is_alert}}Warning: Free disk space is below 20% on {{host.name}}. Free space: {{system.disk.free}} bytes, Total space: {{system.disk.total}} bytes.{{/is_alert}}
     ```

- Set the rest of the notification options according to your preferences.

Don't forget to save the monitor by clicking **Create** at the bottom of the page.
