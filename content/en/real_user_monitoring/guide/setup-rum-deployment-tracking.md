---
title: Getting Started with RUM Deployment Tracking
kind: guide
beta: true
private: true
description: Learn how to set up RUM to capture new releases, track your deployments, and analyze the performance in Datadog
aliases:
- /real_user_monitoring/guide/getting-started-rum-deployment-tracking/
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the RUM Explorer'
- link: "/tracing/version_tracking"
  tag: "Documentation"
  text: "Use Version tags within Datadog APM to monitor deployments"
---

## Overview
As teams iterate quickly and deploy code, it can be difficult to track down the exact change that caused a spike in errors or slower page load times. RUM Deployment Tracking will enable you to identify when a recent deployment or release is causing performance issues within your application and help you identify the source of the problem. 

## Setup
You can use the `version` tag to monitor deployments and service behavior in support of your software deployment strategy. To get started with RUM Deployment tracking you will need to add RUM versions to your application.

### Browser RUM
{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Initialize Datadog Browser SDK
datadogRum.init({
  ...
  version: '1.0.0',
  ...
});
```

{{% /tab %}}
{{% tab "CDN async" %}}

```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  DD_RUM.onReady(function() {
    DD_RUM.init({
      ...
      version: '1.0.0',
      ...
    })
  })
</script>
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      ...
      version: '1.0.0',
      ...
    })
</script>
```
{{% /tab %}}
{{< /tabs >}}

### Mobile RUM

#### Android RUM

The version tag is captured automatically from the application’s manifest

#### iOS RUM

The version tag is captured automatically from the application’s app’s `info.plist`

## Analyze your Deployment Performance in RUM

{{< tabs >}}
{{% tab "Browser RUM" %}}

### Using version tags on the Application Overview page

An application configured with version tags has a Deployment Tracking section on the Application Overview page. The Deployment Tracking section shows all versions of the application and services that were active during the selected time interval. 

You will see:
- P75 Loading Time by Version
- Total User Sessions by Version
- Error Rate by Version

In the table below these widgets, you will see:
- The version names deployed for the application and its services over the timeframe.
- Number of user session for that version
- Average errors per view
- P75 Loading Time
- P75 for Core Web Vitals

These widgets can be exported to dashboards and monitors.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-rum-app-overview-deployment-tracking.png" alt="Browser Deployment Tracking in RUM Application Overview" style="width:100%;">}}


### Deployment Comparison

Click on any version row in the List of Versions table to open a version comparison page, allowing you to compare two versions of the same service. By default, the selected version will be compared to all previous versions but you can change it to compare any two versions within the past 30 days.


Similar to the graphs on the Application Overview page, User Sessions, Core Web Vitals, and Errors graphs show an overview of a deployment rollout or spikes in error rates. On this page, the graphs highlight the selected versions for comparison and leave all other versions in gray for additional context.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-comparison.png" alt="Browser Deployment Tracking Comparison" style="width:75%;">}}

The Issues tab, lists differences in errors detected for each the two versions, highlighting:
- Error Count by Version 
- % of Views with Errors by Version 
- Error Tracking issues

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-comparison-error.png" alt="Browser Deployment Tracking Comparison Errors" style="width:75%;">}}

### Explore the RUM Deployment Tracking Powerpacks
You can quickly add deployment tracking for your RUM services to dashboards using the powerpacks menu on a dashboard and searching for the “Deployment Version Tracking” powerpack. You can then iterate and add any other widget to your dashboards to help your teams release new features safely.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-powerpack.png" alt="Browser Deployment Tracking Powerpack" style="width:75%;">}}

{{% /tab %}}
{{% tab "Mobile RUM" %}}

### Using version tags on the Application Overview page

An application configured with version tags has a Deployment Tracking section on the Application Overview page. The Deployment Tracking section shows all versions of the application and services that were active during the selected time interval. 

You will see:
- Average Application Start Time by Version
- Total User Sessions by Version
- Error Rate by Version

In the table below these widgets, you will see:
- The version names deployed for the application and its services over the timeframe.
- Number of app launches for that version
- Error Rate
- Crash Rate
- P90 Application Start Time

These widgets can be exported to dashboards and monitors.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-rum-app-overview-deployment-tracking.png" alt="Mobile Deployment Tracking in RUM Application Overview" style="width:100%;">}}

### Deployment Comparison

Click on any version row in the List of Versions table to open a version comparison page, allowing you to compare two versions of the same service. By default, the selected version will be compared to all previous versions but you can change it to compare any two versions within the past 30 days.

Similar to the graphs on the Application Overview page, User Sessions, Mobile Vitals, and Errors graphs show an overview of a deployment rollout or spikes in error rates. On this page, the graphs highlight the selected versions for comparison and leave all other versions in gray for additional context.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-comparison.png" alt="Mobile Deployment Tracking Comparison" style="width:75%;">}}

The Issues tab, lists differences in errors detected for each the two versions, highlighting:
- Error Count by Version 
- % of Views with Errors by Version 
- Error Tracking issues

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-comparison-error.png" alt="Mobile Deployment Tracking Comparison Errors" style="width:75%;">}}

### Explore the RUM Deployment Tracking Powerpacks
You can quickly add deployment tracking for your RUM services to dashboards using the powerpacks menu on a dashboard and searching for the “Deployment Version Tracking” powerpack. You can then iterate and add any other widget to your dashboards to help your teams release new features safely.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-powerpack.png" alt="Browser Deployment Tracking Powerpack" style="width:75%;">}}


{{% /tab %}}
{{< /tabs >}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}
