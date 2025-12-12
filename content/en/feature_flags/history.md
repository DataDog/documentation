---
title: Flag History
description: "Track and manage the history of your feature flags"
further_reading:
- link: "/getting_started/feature_flags/"
  tag: "Documentation"
  text: "Getting Started with Feature Flags"
- link: "/feature_flags/"
  tag: "Documentation"
  text: "Learn about Feature Flags"
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

Flag History allows you to track changes and maintain an audit trail of your feature flags over time. Knowing who changed what can be useful for governance and troubleshooting unexpected behavior in your application. You can view the history of individual flags or access a global view of all flag changes across your organization.

## Individual flag history

When you view an individual feature flag, the **History** panel displays all changes made to that specific flag. 

- Use the **Environment** filter to view changes in a particular environment or all environments.
- Select **See Changes** to display a diff view of a specific change.

{{< img src="/feature_flags/flag_history.png" alt="History panel for a single feature flag" style="width:100%;" >}}

## Global flag history

Navigate to **Feature Flags > Global Flag History** to show all flag changes across your organization in a single view.

- Use the **Environment** filter to view changes in a particular environment or all environments.
- Use the **Feature Flag** filter to view changes for a specific flag.
- Use the date range filter to narrow results to a specific time period.
- Select **See Changes** to display a diff view of a specific change.

{{< img src="/feature_flags/flag_history_global.png" alt="Global flag history view" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
