---
title: Regression Detection
description: Learn how a resolved error gets automatically re-opened through regression detection.
further_reading:
  - link: '/error_tracking/issue_states/'
    tag: 'Documentation'
    text: 'Issue States in Error Tracking'
---

## Overview

A regression refers to the unintended reappearance of a bug or issue that was previously fixed. In Datadog, resolved issues are automatically re-opened through regression detection so that you can see all the context of the issues without duplicating information.

## Automatic re-opening through regression detection

If a **RESOLVED** error recurs in a newer version of the code, or the error occurs again in code without versions, Error Tracking triggers a regression. The issue moves to the **FOR REVIEW** state, and is tagged with a **Regression** tag:

{{< img src="error_tracking/regression-detection.png" alt="The details of regression in Error Tracking" style="width:90%;" >}}

Regressions take into account the versions of your service where the error is known to occur, and only trigger on new versions after an issue is marked as **RESOLVED**. Configure your services with version tags (see instructions for [APM][1], [RUM][2], and [Logs][3]) to ensure that issues automatically resolve only if the same errors occur on newer versions of your services.

If you don't have version tags set up, issues are tagged with **Regression** when an error occurs on an issue marked as **RESOLVED**.

You can also set up [monitors][4] to alert you when regressions occur.

## Updating the issue status

The issue status appears anywhere the issue can be viewed, such as in the issues list or on the details panel for a given issue. To manually update the status of an issue, click the status and choose a different one in the dropdown menu.

{{< img src="error_tracking/updating-issue-status.png" alt="The Activity Timeline in the Error Tracking Issue" style="width:100%;" >}}

## Issue history
View a history of your issue activity with the **Activity Timeline**. On the details panel of any Error Tracking issue, view the Activity Timeline by clicking the **Activity** tab. 

{{< img src="error_tracking/issue-status-history.png" alt="The Activity Timeline in the Error Tracking Issue" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/deployment_tracking
[2]: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /getting_started/tagging/unified_service_tagging/
[4]: /monitors/types/error_tracking/
