---
title: Version History for Dashboards
disable_toc: false
further_reading:
- link: "/dashboards/"
  tag: "documentation"
  text: "Dashboards Overview"
- link: "/account_management/audit_trail/"
  tag: "documentation"
  text: "Audit Trail Overview"
- link: "https://www.datadoghq.com/blog/dashboards-notebooks-version-history/"
  tag: "blog"
  text: "Track changes to Datadog dashboards and notebooks with version history"
---

## Overview
Version History automatically tracks changes made to your dashboards and saves previous versions so you can see exactly what was changed and by whom. You can view previous versions, restore your dashboard to any saved version, or clone a version to create a new dashboard.

## Prerequisites
All dashboards retain 30 days worth of version history by default. In order to see any previous versions, an edit must be made within the last 30 days. 

With [Audit Trail][1] enabled, the version history is extended from 30 days to 90 days. After enabling Audit Trail, you are able to see any edits made between 30 to 90 days ago on all existing dashboards. 

## View versions
From an individual dashboard, click **Configure** on the top right of the page and select **Version History**. If there are no edits within the retention period, Version History is disabled.

{{< img src="/dashboards/guide/version_history/configure_actions_version_history.png" alt="Disabled version history option in the dashboard Configure Actions menu" style="width:50%;" >}}

In the Version History side panel, for each version you can see:
- Which Datadog user made the change
- The date and time of the change
- A summary of the change and a detailed change description of the version to its predecessor

## Preview a version
From the Version History side panel, click on a version to preview what your dashboard would look like if you choose to restore to that version. Click on any version to scroll to the location of the change and highlight any widgets or cells that were changed.

**Note**: Clicking on a version to preview it does not save any changes or impact what other users see until you actively choose to restore to that version.

## Restore a version
There are two ways you can restore your dashboard to a previous version.

{{< img src="/dashboards/guide/version_history/dashboard_version_history_options.png" alt="Your image description" style="width:100%;" >}}

- From the Version History side panel, after you choose the version to restore, click the kebab menu to the right of a user profile and select **Restore this version**.
- When the Version History side panel opens up, a button appears at the top of the page to **Restore this version**.

Restoring a version updates the dashboard to that version for all users and a new entry is added to the version history showing the restore. This does not overwrite the history of your changes, so you are still able preview and restore to any versions within your retention period. 

## Clone a version
If you do not want to change your current dashboard but you'd like to create a copy of a previous version, you can create a clone from any version in your version history. From the Version History side panel after you choose the version you want to make a copy of, click the kebab menu to the right of a user profile and select **Clone**.

## Version History retention

|                          | Retention Period    |
| -----------------------  | ------- |
| Audit Trail **Disabled** | 30 days |
| Audit Trail **Enabled**  | 90 days |


[1]: /account_management/audit_trail/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}