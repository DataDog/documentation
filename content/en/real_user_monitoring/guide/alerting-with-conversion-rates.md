---
title: Alerting With Conversion Rates

description: Guide for creating alerts on conversion rates.
further_reading:
- link: '/monitors/create/types/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM Monitors'
---

## Overview

Conversion rates are crucial in monitoring the success of a user workflow. This guide describes how to generate conversion rates in the [RUM funnel][1] visualization and create alerts that notify you when conversion rates dip below a given threshold.

## Create a funnel in the RUM Explorer

In Datadog, navigate to [Digital Experience > Product Analytics > Funnels][1].

{{< img src="real_user_monitoring/funnel_analysis/rum-funnel-creation-2.png" alt="The funnel creation page with key actions highlighted" style="width:100%;" >}}

In the **Define steps for measuring conversion** section, create some steps from your views and actions. You can click on the bar graphs to see a side panel with analytics about user conversions and dropoffs. To add a subsequent view or action in the funnel, click **+** and select from frequent next steps.

## Export the conversion rate graph

The funnel displays the overall conversion and dropoff rates, the number of converted or dropoff sessions, and the percentage of converted or dropoff sessions.  

Click the **Save to Dashboard** button and select an existing dashboard from the dropdown menu to export the graph to. Optionally, click **New Dashboard** to create a dashboard.

## Edit the conversion rate query

In a dashboard, you can edit the widget and access the query for the conversion rate under **Graph your data**.

{{< img src="real_user_monitoring/guide/alerting-with-conversion-rates/conversion-rate-formula.png" alt="Access the conversion rate query in the RUM Explorer" style="width:100%;" >}}

## Update the RUM monitor

In a separate tab, navigate to [**Monitors** > **New Monitor**][3] and select **Real User Monitoring**.

{{< img src="real_user_monitoring/guide/alerting-with-conversion-rates/copy-paste-query-into-rum-monitor.mp4" alt="Export the funnel widget into an existing dashboard or a new dashboard" video=true >}}

Copy and paste the queries from the dashboard into the RUM monitor's query editor and add a formula using `(a / b) * 100`.

## Advanced monitor configuration

With the applied query, you can customize alert conditions and set up notifications to ensure alerts notify the appropriate person or channel. For more information, see [Real User Monitoring Monitor][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/funnels
[2]: https://app.datadoghq.com/rum/explorer?viz=timeseries
[3]: https://app.datadoghq.com/monitors/create/rum
[4]: /monitors/types/real_user_monitoring/
