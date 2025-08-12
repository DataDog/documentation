---
title: Version History for Synthetic Monitoring

further_reading:
    - link: '/getting_started/synthetics/'
      tag: 'Documentation'
      text: 'Getting Started with Synthetic Monitoring'
    - link: "/account_management/audit_trail/"
      tag: "documentation"
      text: "Audit Trail Overview"
---

## Overview

Version History automatically tracks changes made to your Synthetic Monitoring tests and saves previous versions so you can see exactly what was changed and by whom. You can restore your test to any saved version, or clone a version to create a new Synthetic Monitoring test.

Version History allows you to:

- **Troubleshoot failing tests**: Determine whether a recent change introduced the failure. 
- **Collaborate with teammates**: See who made changes and what was updated.  
- **Roll back tests**: Restore a previous version after a deployment rollback or incorrect update.  
- **Clone tests**: Create a new test based on a previous version, without changing the current test. 

## Prerequisites

All Synthetic Monitoring tests retain 30 days worth of version history by default. In order to see any previous versions, an edit must be made within the last 30 days. 

With [Audit Trail][1] enabled, the version history is extended from 30 days to 90 days. After enabling Audit Trail, you are able to see any edits made between 30 to 90 days ago on all existing Synthetic tests. 

## View versions

From an individual Synthetic Monitoring test, click the settings menu on the top right of the page and select Version History. If there are no edits within the retention period, Version History is disabled.

{{< img src="/synthetics/guide/version_history/synthetics_version_history.png" alt="Synthetic Monitoring Version history menu" style="width:70%;" >}}

The Version History side panel shows changes in chronological order. Each entry displays the fields that were modified, the values before and after, the user who made the change, and timestamp. Use the context menu to restore or clone a previous version of a test.

## Restore a version

From the Version History side panel, after you choose the version to restore, click the kebab menu to the right of a user profile and select "Restore this test version".

Restoring a version updates the test and creates a new version history entry documenting the restore action, displaying any steps that were added or removed to the test. Your existing change history remains intact, allowing you to restore any version within the retention period.

{{< img src="/synthetics/guide/version_history/synthetics_restore_version.png" alt="Synthetic Monitoring Version history menu" style="width:60%;" >}}

## Clone a version

To create a new test based on a previous version without modifying your current test, you can clone any version from your history. In the Version History side panel, select the desired version, click the kebab menu next to the user profile, and choose "Clone to a new test."

## Version History retention
|                          | Retention Period    |
| -----------------------  | ------- |
| Audit Trail **Disabled** | 30 days |
| Audit Trail **Enabled**  | 90 days |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/audit_trail/