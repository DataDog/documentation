---
title: Monitors
kind: documentation
disable_sidebar: true
aliases:
  - /guides/monitors/
  - /guides/monitoring/
  - /guides/alerting/
  - /guides/monitors/the-conditions
  - /monitoring
description: "Create monitors, configure notifications and automations, and manage your monitors using the alerting platform"
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Alerting"
    tag: "Release Notes"
    text: "Check out the latest Datadog Alerting releases! (App login required)."
  - link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
    tag: "Blog"
    text: "Monitoring 101: Alerting on what matters"
  - link: "/api/v1/monitors/"
    tag: "Documentation"
    text: "Datadog Monitors API"
  - link: "https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/"
    tag: "Blog"
    text: "Detect failed quality checks with GitHub Deployment Protection Rules and Datadog"
  - link: "https://dtdg.co/fe"
    tag: "Foundation Enablement"
    text: "Join an interactive session on creating effective monitors"
  - link: "https://www.datadoghq.com/blog/aws-recommended-monitors/"
    tag: "Blog"
    text: "Enable preconfigured alerts with recommended monitors for AWS"
cascade:
    algolia:
        rank: 70
        tags: ["alerts", "alerting", "monitoring"]

---

## Overview

Monitoring all of your infrastructure in one place wouldn't be complete without the ability to know when critical changes are occurring. Datadog gives you the ability to create monitors that actively check metrics, integration availability, network endpoints, and more.

Configure monitors, configure notifications and automations, and manage alerts at a glance on the Alerting platform.

**Note**: View and search for Monitors on your mobile device with the [Datadog Mobile App][1], available on the [Apple App Store][2] and [Google Play Store][3].

## Create monitors

To create a monitor in Datadog:

1. Navigate to [**Monitors** > **New Monitor**][4].
1. Select a monitor type corresponding to the kind of telemetry you want to alert on. See [Monitor Types][5] for the full list.
1. [Configure Monitors][6]: Alert over metrics, events, logs, integration availability, network endpoints, and more.

{{< img src="/monitors/create.png" alt="Create a monitor" style="width:90%;">}}

To create a monitor programmatically, see the [Datadog API][7] or [community maintained libraries][8].

## Configure notifications and automations

{{< img src="/monitors/notify.png" alt="Notify when a monitor is alerting" style="width:90%;">}}

Set up [Monitor Notifications][11] when creating monitors to keep your team informed of issues. Route the notifications to the correct people,  include [workflow automations][17], [cases][18], and [Datadog team handles][19], leverage template variables to include details, and attach snapshots when sending the alerts by email or Slack. Create [downtimes][12] to mute alerts during application maintenance.

## Manage monitors

{{< img src="/monitors/manage.png" alt="Manage all monitors alerts" style="width:90%;">}}

[Manage Monitors][13] by editing, cloning, deleting, muting, and resolving monitors all in the same place. Focus on high priority alerts by using advanced faceted search. Explore monitor details and alerts over time on the [Monitors List page][9].

## Export and import monitors

To export a monitor:

1. From the [**Manage Monitors**][9] page, click the monitor you want to export.
1. You should see the Monitor Status page.
1. Click the settings cog (top right) and select **Export** from the menu.

To import a monitor:

1. Navigate to [**Monitors** > **New Monitor**][4].
1. Click [**Import from JSON**][10] at the top of the page.
1. Add your JSON monitor definition and click **Save**.

## Control monitor tags with tag policies

[Monitor tag policies][14] enforce data validation on tags and tag values on your Datadog monitors. Add one of the following rules to prevent monitors with unexpected tags from being created.
- Require tags with mandatory values
- Require tags only
- Optional tags with mandatory values

## View and search for monitors on mobile devices

[Mobile-Friendly Monitors on iOS and Android][15]: View, mute, and unmute monitors on any iOS or Android device with the [Datadog Mobile App][1], available on the [Apple App Store][2] and [Google Play Store][3]. Write queries in the search bar to filter monitors in real-time. Use [Monitor Saved Views][16] to access a collection of monitors in a few taps on mobile.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Monitors on Mobile App">}}

## Other sections

{{< whatsnext desc=" ">}}
    {{< nextlink href="/service_management/service_level_objectives" >}}<u>Service Level Objectives</u>: Create, edit, or view your service level objectives using metrics or existing Datadog monitors.{{< /nextlink >}}
    {{< nextlink href="/monitors/incident_management" >}}<u>Incident Management</u>: Declare and manage incidents.{{< /nextlink >}}
    {{< nextlink href="/monitors/guide" >}}<u>Guides</u>: Additional helpful articles about monitors and alerting.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/monitors/create
[5]: /monitors/types/
[6]: /monitors/configuration
[7]: /api/latest/monitors/
[8]: /developers/community/libraries/#managing-monitors
[9]: https://app.datadoghq.com/monitors/manage
[10]: https://app.datadoghq.com/monitors/create/import
[11]: /monitors/notify
[12]: /monitors/downtimes
[13]: /monitors/manage
[14]: /monitors/settings/
[15]: /service_management/mobile/?tab=ios#monitors
[16]: /monitors/manage/search/#saved-view
[17]: /monitors/notify/#workflows
[18]: /monitors/notify/#notifications
[19]: /monitors/notify/#teams