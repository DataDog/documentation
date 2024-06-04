---
title: Sharing
kind: documentation
aliases:
    - /graphing/faq/is-there-a-way-to-share-graphs
    - /graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
    - /graphing/dashboards/shared_graph/
further_reading:
- link: "https://www.datadoghq.com/blog/dashboard-sharing/"
  tag: "Blog"
  text: "Share dashboards securely with anyone outside of your organization"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Create Dashboards in Datadog"
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Discover Widgets for your Dashboard"
---

## Overview

Shared visualizations allow you to display metric, trace, and log visualizations outside of Datadog. Share visualizations to enhance decision-making and problem-solving processes with team members. 

{{< whatsnext desc="How to share visualizations:" >}}
   {{< nextlink href="dashboards/sharing/public_dashboards" >}}<strong>Share dashboards</strong>: Generate a public link for users to access{{< /nextlink >}}
   {{< nextlink href="dashboards/sharing/graphs" >}}<strong>Share graphs</strong>: Generate an embed code{{< /nextlink >}}
   {{< nextlink href="dashboards/sharing/scheduled_reports" >}}<strong>Scheduled reports</strong>: Set a schedule to send email reports{{< /nextlink >}}
{{< /whatsnext >}}

## View all public dashboards and graphs

To see the complete list of publicly shared dashboards, navigate to [**Organization Settings > Public Sharing > Shared Dashboards**][1]. Click the **Shared Graphs** tab to view publicly shared graphs from your organization. To revoke access, see the [dashboard][2] and [graph][3] documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/public-sharing/shared-dashboards
[2]: /dashboards/sharing/public_dashboards/#revoke
[3]: /dashboards/sharing/graphs/#revoke
