---
title: Issue Correlation with Error Tracking 
description: Understand how errors are grouped into issues.
further_reading:
- link: '/monitors/types/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking Monitors'
- link: '/error_tracking/issue_states/'
  tag: 'Documentation'
  text: 'Issue States in Error Tracking'
---
{{< callout url="https://www.datadoghq.com/product-preview/error-tracking-issue-correlation/">}}
Issue Correlation with Error Tracking is currently in Preview, but you can easily request access! Use this form to submit your request. Once approved, you can automatically map related issues across services, helping you trace problems to their true origin.
{{< /callout >}} 
## Overview 

{{< img src="error_tracking/issue-correlation-overview.png" alt="The view of the correlated issues tab in the context of the Error Tracking Explorer" style="width:100%;" >}}

You use Error Tracking to simplify debugging by grouping thousands of similar errors into a single issue. Use issue correlation to determine the cause of the issue, the impact it has on other services, and if the error is a result of a downstream dependency. 

Issue correlation also helps reduce noise from the issue list by identifying the most critical issues. This allows you to alert the right team and reach a quicker resolution. 

## Identify correlated issues
To identify which issues across your services are correlated, navigate to the Error Tracking page at [**Error > Issues**][1].

{{< img src="error_tracking/issue-correlation-et-page.png" alt="The issues list in the Error Tracking Explorer" style="width:70%;" >}}

Select an issue to open the issue's details side panel.

{{< img src="error_tracking/issue-correlation-side-panel.png" alt="The details of an issue in the Error Tracking Explorer" style="width:70%;" >}}

Open the `Correlated issues` tab to see the issue correlation map.

{{< img src="error_tracking/issue-correlation-correlation-tab.png" alt="The details of an issue in the Error Tracking Explorer focusing on the issue correlation tab" style="width:70%;" >}}

The issue correlation map shows the following information about a given issue:
- **Root cause**: the services that are likely to be causing the issue
- **Current issue**: the issue selected along with whether it is assigned to a team
- **Impact**: the resources, users, and sessions that are impacted


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://app.datadoghq.com/error-tracking
