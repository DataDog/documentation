---
title: Error Tracking
type: documentation
further_reading:
- link: "/tracing/error_tracking/"
  tag: "Documentation"
  text: "Learn more about Error Tracking"
---

## Overview
Error Tracking helps you find and fix runtime errors from production, without leaving your IDE.

## Source editor
Errors are highlighted in the source editor with a distinctive icon in the gutter, for lines that appear in error stack frames (in other words, lines of code that are on the execution path to an observed runtime error).

{{< img src="/developers/ide_plugins/idea/error_tracking/editor.png" alt="Error Tracking in the source editor" style="width:100%;" >}}

Click the icon to select an error and display it in the Datadog tool-window.

## Error Tracking tab
Use the Error Tracking tab in the tool-window to filter, sort and inspect errors, view stack traces, navigate to relevant locations in your source code, attempt fixes with your local agent, or navigate to the Datadog web UI to continue your investigations.

{{< img src="/developers/ide_plugins/idea/error_tracking/toolwindow.png" alt="The Error Tracking toolwindow" style="width:100%;" >}}

### Sorting and filtering
Set filters to focus on errors that are relevant to you:

* **Issue type** - the source of issues (backend, browser, mobile or all issues).
* **Team** - show issues for a specific team (or subset of teams)
* **Assignee** -  show issues for a specific user (or subset of users)
* **Status** - show issues for a specific status, or any subset of statuses.  from For Review, Reviewed, Resolved, Ignored, Excluded
* **Repo** - show issues linked to the repo for the current project
* **Service** - show issues tagged with selected services
* **Environment** - show issues tagged with selected environments
* **Time frame** - show issues that fall within the selected time frame

Errors can be sorted by:

* **Relevance** (highest to lowest) - a score based on recency, number of occurrences, and other factors
* **Recency** (newest to oldest)
* **Count** (highest to lowest)

### Issue list
Errors are displayed in a list on the left-side of the tool-window, with the type, service, filename, error count and assignee listed.

{{< img src="/developers/ide_plugins/idea/error_tracking/errorlist.png" alt="Error Tracking list" style="width:60%;" >}}

Select an issue to display its details on the right-side of the toolwindow.

### Issue details
The issue details pane shows detailed information about the selected error, including the error description, the service, the count, first and last-seen information, and a stack trace.

{{< img src="/developers/ide_plugins/idea/error_tracking/details.png" alt="Error Tracking details" style="width:100%;" >}}

Click the “View in Datadog” link to open the selected issue in the Datadog Web UI.

Click on a file and line link in the stack trace to navigate to that location in your code.

### Fix With AI
When a local agent is detected (Claude Code, Gemini or Codex), a “Fix with Local Agent” button will appear. Click this to open a new terminal, launch the local agent, and supply a custom prompt from Datadog requesting the agent to fix the error.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}