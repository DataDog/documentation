---
title: View-Based Ownership
description: A guide on how to use View-Based Ownership in Real User Monitoring to filter event data for views your team owns.
further_reading:
- link: '/monitors/create/types/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM'
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!">}}
  View-Based Ownership is in Preview.
{{< /callout >}}

## Overview

View-based ownership helps you filter event data to the views your team owns. You can control this filtering with a toggle on the Summary, Optimization, and Session Explorer pages. 

{{< img src="/real_user_monitoring/guide/ownership/ownership-sessions-explorer.png" alt="View of Sessions Explorer, where you can filter user sessions based on the teams assigned in Team Ownership, making it easy to find replays relevant to your team." >}}

By default, the toggle is enabled, which filters metrics and event data to show only the views your team owns. If you belong to multiple teams, you can enable or disable specific team filters. The teams that own a view are also listed in the top-right corner of all event side panels.

## Setup

<div class="alert alert-info">To use this feature, your organization must have teams enabled and configured. </div>

To configure team ownership for your application's views:

1. In Datadog, navigate to the **Digital Experience > Manage Applications** page and select your application.
2. In the left navigation menu, select "Team Ownership".
3. For each selected view, click "Edit Teams" and select one or more teams. This attributes each view in your application to those teams.

After you associate a view with a team, Datadog automatically attributes new event data to that team.

{{< img src="/real_user_monitoring/guide/ownership/ownership-application-management.png" alt="View of the Team Ownership page, where you can assign different pages of your application to specific teams." >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

