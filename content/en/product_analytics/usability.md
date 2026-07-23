---
title: Usability Issue Detection
description: Detect friction in real user sessions and surface a ranked list of usability issues from Product Analytics funnels.
disable_toc: false
further_reading:
- link: "/product_analytics/charts/funnel_analysis/"
  tag: "Documentation"
  text: "Funnel Analysis"
- link: "/real_user_monitoring/session_replay/browser/"
  tag: "Documentation"
  text: "Session Replay"
- link: "/account_management/rbac/permissions/"
  tag: "Documentation"
  text: "Role-based access control permissions"
algolia:
  tags: ['usability', 'usability issue detection', 'ux friction']
---

{{< callout url="https://www.datadoghq.com/product-preview/usability-issue-detection/" header="Join the Preview!">}}
Usability Issue Detection is in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

Usability Issue Detection reviews real user sessions, finds where users experience friction, and surfaces it as a ranked list of issues. Each issue includes a severity, a category, a session replay that shows the problem, and any related errors. An issue reflects user-visible friction, such as repeated attempts, abandonment, getting stuck, or straying from the intended path.

Detected issues fall into three categories:

Category | What it means | Example
---|---|---
System failure | An action should work but does not, so the user retries or leaves. | A user clicks **Sign Up**, but the button does not respond or show an error. The user clicks repeatedly, then abandons signup.
Slow performance | A user waits longer than expected, then acts again or leaves. | A report loads slowly with no loading indicator, so the user assumes it is broken and leaves before it finishes.
User confusion | A user clicks dead elements, hunts for the right control, or hits a disabled state with no explanation, then gives up. | A user repeatedly clicks a product image expecting a larger view, but the image is not interactive, so they leave the page.

## Prerequisites

- **Session Replay and Product Analytics**: Enable both [Session Replay][1] and [Product Analytics][2] for your application. Datadog analyzes session replays and product analytics events to find friction.
- **Permission**: To trigger an analysis, users need the `session_replay_analysis_write` permission. This permission is included in the Datadog Standard and Admin roles. Administrators can grant this permission to custom roles through [Role-based access control][3].

## Trigger an analysis

You start an analysis from a saved Product Analytics funnel, either from the funnel chart or from the Usability page.

### From a funnel

1. Build and save a [funnel chart][4].
1. Select {{< ui >}}Usability Issues{{< /ui >}} > {{< ui >}}Detect usability issues{{< /ui >}}.
1. In the {{< ui >}}Confirm sessions to be analyzed{{< /ui >}} dialog, choose the funnel step to analyze (for example, step 1 to step 2), then select {{< ui >}}Confirm and Start{{< /ui >}}.

{{< img src="product_analytics/usability/detect-usability-issues.png" alt="A saved funnel chart with the Usability Issues menu open and the Detect usability issues option selected" style="width:100%;" >}}

### From the Usability page

1. Select {{< ui >}}Usability Analysis{{< /ui >}}.
1. Choose a saved funnel in the {{< ui >}}Choose funnel to run usability analysis from{{< /ui >}} dialog.
1. Select the funnel step to analyze, then select {{< ui >}}Confirm and Start{{< /ui >}}.

{{< img src="product_analytics/usability/choose-funnel.png" alt="The Choose funnel to run usability analysis from dialog listing saved funnel charts" style="width:100%;" >}}

Both converted and dropped-off sessions are analyzed, because a user who hits friction can still convert. Datadog analyzes every session that matches the funnel criteria, and is not limited to a specific page or path.

An analysis takes a few minutes to complete. When it finishes, detected issues appear in two places:

- In the funnel side panel, which shows the top issues with a link to the rest.
- On the Usability page, under the {{< ui >}}Issues Found{{< /ui >}} tab.

## View issues

The Usability page lists every detected issue on the {{< ui >}}Issues Found{{< /ui >}} tab. Each issue is classified by severity and by category. Use the filters to narrow the list by view name, severity, category, status, or funnel, and sort by severity to focus on the most impactful issues first.

If you have not run an analysis, the Usability page shows an empty state where you can start your first analysis.

{{< img src="product_analytics/usability/issues-list.png" alt="The Issues Found tab on the Usability page showing detected issues with severity and category labels" style="width:100%;" >}}

### Issue details

Select an issue to open its details, which include:

- **Issue identification**
  - **Title and description**: A summary of the friction and its impact on the user.
  - **Category**: System failure, Slow performance, or User confusion.
  - **View name**: The page or view where the issue occurs.
- **Impact and priority**
  - **Severity**: The impact on the user's experience: High, Medium, or Low.
  - **Reach**: The number of affected users in the last 30 days. Datadog hides this field when it cannot calculate reach for an issue.
- **Investigation and management**
  - **Status**: The triage state of the issue: New, Reviewed, Resolved, or Ignored. Status appears in the top-right corner of the issue card.
  - **Session list and steps breakdown**: Example sessions tied to a [session replay][1] you can watch, with a step-by-step breakdown of what the user did.
  - **Related errors**: A linked error, when one is associated with the issue.

{{< img src="product_analytics/usability/issue-details.png" alt="An expanded issue showing the description, reach, an example session replay, and the steps breakdown" style="width:100%;" >}}

### Analysis history

The {{< ui >}}History{{< /ui >}} tab lists previous analysis runs, including the scope, the number of issues found, the status, the author, and when the run executed. From a run, you can:

- Rerun the analysis.
- Jump to the related funnel.
- View the issues for that run, filtered to the specific funnel.

### Data retention

Datadog retains detected issues for 15 months. If an analysis detects an issue that already exists, Datadog updates the issue's last-detected date instead of creating a duplicate.

Each issue is tied to the session replays that show it. Session replays have a [default retention period of 30 days][5]. After a replay expires, the issue remains viewable, but you can no longer watch that replay.

## Triage issues

Triage each issue to track what is new against what your team already handles. Set the status of an issue to one of the following:

- **New**: A newly detected issue that no one has reviewed.
- **Reviewed**: An issue your team has looked at.
- **Resolved**: An issue you have fixed.
- **Ignored**: An issue that is neither real nor actionable.

Keeping issue statuses current helps your team separate new friction from issues already in progress.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/session_replay/browser/
[2]: /product_analytics/
[3]: /account_management/rbac/permissions/
[4]: /product_analytics/charts/funnel_analysis/
[5]: /data_security/data_retention_periods/
