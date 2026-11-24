---
title: Alerts
description: Get notified when a Product Analytics funnel metric crosses a threshold.
further_reading:
- link: "/product_analytics/charts/funnel_analysis/"
  tag: "Documentation"
  text: "Funnel"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor notifications"
---

## Overview

Product Analytics alerts notify you when a key business metric, such as checkout conversion rate, crosses a threshold. Create an alert directly from a [funnel][1], set a threshold, and choose who to notify.

<!-- TODO: Add hero image. -->

## Create an alert

You can create an alert from any funnel in Product Analytics or on a dashboard.

1. Open the funnel you want to alert on.
2. Click the bell icon.
3. Choose a direction, {{< ui >}}above{{< /ui >}} or {{< ui >}}below{{< /ui >}}, and enter the threshold value.
4. Use the evaluation preview to compare your threshold with recent values. See [Choose a threshold](#choose-a-threshold).
5. Review the notification message and add recipients.
6. Click {{< ui >}}Create{{< /ui >}}.

<!-- TODO: Add image of the alert creation panel, showing the direction, threshold, evaluation preview, and notification message fields. -->

### What the alert stores

When you create an alert, Datadog saves a copy of the funnel's configuration with the alert:

- The steps and their order
- Global filters and per-step filters
- The conversion metric (conversion count, conversion rate, or time to convert), the counting method, and the step target
- The conversion window (the {{< ui >}}Converted within{{< /ui >}} setting)
- The chart's timeframe, which becomes the alert's evaluation window

The alert owns this definition, not the chart, so one funnel can back several alerts on different metrics. For example, a checkout funnel can have one alert on end-to-end conversion rate and another on time to convert. Each alert evaluates independently.

## Evaluation window and frequency

Each time Datadog evaluates the alert, it calculates the metric over a period of the same length as the funnel's timeframe, ending at the time of evaluation. For example, if the funnel shows the past week, each evaluation looks at the most recent seven days of data.

How often Datadog evaluates the alert depends on the length of the timeframe:

| Funnel timeframe                | Evaluation frequency |
|---------------------------------|----------------------|
| Less than 24 hours              | Every minute         |
| 24 hours to less than 48 hours  | Every 10 minutes     |
| 48 hours or more                | Every 30 minutes     |

For example, if the funnel shows the past week, Datadog evaluates the alert every 30 minutes. When the metric crosses the threshold, the alert enters the {{< ui >}}Alert{{< /ui >}} state and Datadog sends a notification.

## Choose a threshold

If the threshold is too close to normal performance, the alert fires often and your team learns to ignore it. If it's too far away, the alert never fires.

The evaluation preview samples the metric over recent history using the alert's evaluation window and draws your threshold across those values. Adjust the threshold so it sits outside the funnel's normal range, including typical weekday and weekend variation, but still catches drops that need immediate attention.

<!-- TODO: Add image of the evaluation preview, showing recent metric values with the threshold drawn across them. -->

## Customize the notification

Datadog generates a default notification message for each alert. Edit the message to add the details your team needs, and add recipients with `@` notation. Alerts support all [notification channels][2] available to Datadog monitors, including Slack, email, PagerDuty, and webhooks.

To reduce repeat notifications, set a re-notification limit:

- {{< ui >}}Notify only once{{< /ui >}}
- {{< ui >}}At most once per hour{{< /ui >}}
- {{< ui >}}At most once per day{{< /ui >}}

## Manage alerts

To view all Product Analytics alerts in your organization, go to [{{< ui >}}Product Analytics > Settings > Alerts{{< /ui >}}][3]. The list shows each alert's name, metric, status, and last modified date. Select an alert to open its details panel.

From the details panel, you can:

- **Edit** the direction, threshold, and notification message. You can't change the funnel definition. To track a different funnel configuration, delete the alert and create another one.
- **Mute** the alert to stop notifications without deleting it, for example during a planned release or a known outage.
- **Delete** the alert.

To see the active alerts on a saved funnel or dashboard widget, open it and click the bell icon.

<!-- TODO: Add image of the Alerts list page, showing each alert's name, metric, status, and last modified date. -->

### Edit a funnel that has alerts

Each alert keeps its own copy of the funnel definition, so editing a chart never changes what an alert evaluates without your knowledge.

When you save a funnel change that affects its definition, Datadog asks what to do with the alerts linked to it. Changes that affect the definition include:

- Adding, removing, reordering, or changing the filters on a step
- Changing a global filter
- Changing the conversion window
- Changing the timeframe length (the timeframe is the evaluation window)

Choose one of the following options:

- **Unlink**: The alert stays active and keeps evaluating its stored definition, but it's no longer linked to the chart.
- **Delete**: Datadog deletes the alert.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /product_analytics/charts/funnel_analysis/
[2]: /monitors/notify/
[3]: https://app.datadoghq.com/product-analytics/settings/alerts
