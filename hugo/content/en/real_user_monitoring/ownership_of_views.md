---
title: Ownership of Views
description: A guide on how to use view-based ownership in Real User Monitoring to filter event data for views your team owns.
further_reading:
- link: '/monitors/create/types/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM'
- link: "https://www.datadoghq.com/blog/simplify-micro-frontend-observability-with-datadog-rum/"
  tag: "Blog"
  text: "Simplify micro-frontend observability with Datadog RUM"
---

## Overview

Ownership of views lets you see only the RUM metrics and events for the parts of your application that your team is responsible for. After you've set up ownership of views, every RUM event and metric attached to those views is **tagged** with your team's name. You can turn this filter on or off using the {{< ui >}}My Teams{{< /ui >}} toggle on the {{< ui >}}Summary{{< /ui >}}, {{< ui >}}Optimization{{< /ui >}}, and {{< ui >}}Session Explorer{{< /ui >}} pages.

{{< img src="/real_user_monitoring/ownership_of_views/ownership-sessions-explorer-1.png" alt="View of Sessions Explorer, where you can filter user sessions based on the teams assigned in Team Ownership, making it easy to find replays relevant to your team." >}}

By default, the toggle is enabled, which filters metrics and event data to show only the one coming from views your team owns. If you belong to multiple teams, you can enable or disable specific team filters. The teams that own a view are also listed in the top-right corner of all event side panels.

## Ownership rules

There are two types of rules to configure ownership of views:

1. <b>Exact rules</b>, which map one-to-one with a view name 
2. <b> Prefix rules</b>, which capture all views that contain the prefix in their name

{{< img src="/real_user_monitoring/ownership_of_views/ownership-rule-type.png" alt="Side panel displaying the two different types of rules to define ownership of views." >}}

Every must also have at least one <b>team</b> and one <b>scope</b> defined. Two scope types are supported:
- For the <b>current RUM application</b> across all services
- For a <b>specific service</b> across all applications


## Setup

<div class="alert alert-info">To use this feature, your organization must have teams enabled and configured. </div>

To configure team ownership for your application's views:

1. In Datadog, navigate to the [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][1] page and select your application.
2. In the left navigation menu, select {{< ui >}}Ownership{{< /ui >}}.
3. For each view, click {{< ui >}}Missing Ownership{{< /ui >}} and create a rule for the view. 
4. Click on the {{< ui >}}All Rules{{< /ui >}} tab to review all created rules and their associated views.

After you associate a view with a team, Datadog automatically attributes new event data to that team.

<div class="alert alert-danger">If you change a team and view mapping, any past metrics or events are not retroactively tagged with the new team.</div>

{{< img src="/real_user_monitoring/ownership_of_views/ownership-application-management-2.png" alt="View of the Team Ownership page, where you can assign different pages of your application to specific teams." >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
