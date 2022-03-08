---
title: Alerting
kind: documentation
disable_sidebar: true
aliases:
    - /guides/monitors/
    - /guides/monitoring/
    - /guides/alerting/
    - /guides/monitors/the-conditions
description: "Create monitors, notify your teams when it matters, and manage your monitors using the alerting platform"
further_reading:
    - link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
      tag: "Blog"
      text: "Monitoring 101: Alerting on what matters"
    - link: "/api/v1/monitors/"
      tag: "Documentation"
      text: "Datadog Monitors API"
---

## Overview

Monitoring all of your infrastructure in one place wouldn't be complete without the ability to know when critical changes are occurring. Datadog gives you the ability to create monitors that actively check metrics, integration availability, network endpoints, and more.

Configure monitors, notify your teams, and manage alerts at a glance on the Alerting platform.

**Note**: View and search for Monitors on your mobile device with the [Datadog Mobile App][5], available on the [Apple App Store][6] and [Google Play Store][7].

## Create monitors

{{< img src="/monitors/create.png" alt="Create a monitor" style="width:90%;">}}

[Configure Monitors][1]: Create monitors that look over metrics, events, logs, integration availability, network endpoints, and more.

## Notify your teams

{{< img src="/monitors/notify.png" alt="Notify when a monitor is alerting" style="width:90%;">}}

[Monitor Notifications][2]: Set up notifications when creating monitors to keep your team informed of issues. Route the notifications to the correct people, leverage template variables to include details, and attach snapshots when sending the alerts by email or Slack. Create [downtimes][3] to mute alerts during application maintenance.

## Manage monitors

{{< img src="/monitors/manage.png" alt="Manage all monitors alerts" style="width:90%;">}}

[Manage Monitors][4]: Edit, clone, delete, mute, and resolve monitors all in the same place. Focus on high priority alerts by using advanced faceted search. Explore monitor details and alerts over time in the Monitor Status page.

## View and search for monitors on mobile devices

[Mobile-Friendly Monitors on iOS and Android][8]: View, mute, and unmute monitors on any iOS or Android device with the [Datadog Mobile App][5], available on the [Apple App Store][6] and [Google Play Store][7]. Write queries in the search bar to filter monitors in real-time. Use [Monitor Saved Views][9] to access a collection of monitors in a few taps on mobile.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Monitors on Mobile App">}}

## Other sections

{{< whatsnext desc=" ">}}
    {{< nextlink href="/monitors/service_level_objectives" >}}<u>Service Level Objectives</u>: Create, edit, or view your service level objectives using metrics or existing Datadog monitors.{{< /nextlink >}}
    {{< nextlink href="/monitors/incident_management" >}}<u>Incident Management</u>: Declare and manage incidents.{{< /nextlink >}}
    {{< nextlink href="/monitors/guide" >}}<u>Guides</u>: Additional helpful articles about monitors and alerting.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/create
[2]: /monitors/notify
[3]: /monitors/notify/downtimes
[4]: /monitors/manage
[5]: /mobile
[6]: https://apps.apple.com/app/datadog/id1391380318
[7]: https://play.google.com/store/apps/details?id=com.datadog.app
[8]: /mobile/?tab=ios#monitors
[9]: /monitors/manage/search/#saved-view
