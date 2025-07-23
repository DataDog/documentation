---
title: Live Debugger
type: documentation
further_reading:
- link: "/tracing/live_debugger/"
  tag: "Documentation"
  text: "Learn more about Live Debugger"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about Source Code Integration."
---

## Overview
The Live Debugger enables you to add logpoints—auto-expiring, non-breaking breakpoints—to your runtime code to collect information for debugging. The logpoints are added dynamically, so there is no need to redeploy your code, allowing you to resolve issues in a running system. You can edit or delete logpoints at any time, and they automatically expire after 48 hours.

## Live Debugger tab
The **Live Debugger** in the Datadog tool window shows the defined logpoints and their related output:

{{< img src="/developers/ide_plugins/idea/live_debugger/tool-window-tab.png" alt="The Live Debugger tab" style="width:100%;" >}}

The panel has three sections: 

* [All available logpoints](#logpoints-tree)
* [Status and events](#logpoint-status-and-events) for the selected logpoint
* [Runtime data](#logpoint-event-data) for the selected logpoint event

### Logpoints tree
The logpoints tree on the left section shows the available logpoints, with these filters:

* `Only my logpoints` - Show only logpoints created by the current user
* `Only the current repositories` - Show only logpoints for the repositories associated with the current project
* `Only enabled logpoints` - Show only logpoints that are enabled

Select any logpoint to display its status and recently generated events, or to [enable, disable](#enable-and-disable-a-logpoint), [edit](#edit-a-logpoint) or [delete](#delete-a-logpoint) it. To navigate to the source code location for a logpoint, double-click it or right-click and select **Jump to Source**.

### Logpoint status and events
The central section displays the status and recent event information for the selected logpoint. Select an event to view the generated log message, the captured variables, and the runtime stacktrace for the event. The list shows up to 50 events from within the past 24 hours.

At the top-right of the panel, **View logs in Datadog** opens the [Log Explorer][2] in Datadog to explore all log events for the selected logpoint. 

### Logpoint event data
The right section displays data for the selected logpoint event, including captured variables and the stacktrace for the event. This runtime context is invaluable for understanding issues and reasoning about the source code.

The **Captures** tab shows a tree view of variable values captured at runtime for the logpoint. Nested values are captured up to the depth limit defined in the logpoint. The data is fully searchable and you can copy selected items to the clipboard.

The **Stacktrace** tab shows the runtime path execution leading up to the logpoint. Double-click any frame in the stack trace to open the corresponding source file location.

## Source editor
In the source editor, an icon is shown in the gutter for any line that has a logpoint defined:

{{< img src="/developers/ide_plugins/idea/live_debugger/gutter-icon.png" alt="Gutter icon in the source editor" style="width:100%;" >}}

Click the icon to open the Datadog tool window and show the selected logpoint. Right-click the icon for options to [enable, disable](#enable-and-disable-a-logpoint), [edit](#edit-a-logpoint), and [delete](#delete-a-logpoint) the logpoint.

## Managing logpoints

### Add a logpoint
To add a logpoint, right-click on a line of code in the source editor and select **Add a Log to a Live Service**. A dialog appears where you can enter the service name, the environment, a template for the log message to be emitted at runtime, the variable capture depth, and a logpoint condition expression (optional):

{{< img src="/developers/ide_plugins/idea/live_debugger/new-logpoint.png" alt="Add a new log probe" style="width:75%;" >}}

The log message field accepts a log template that contains descriptive text and variable references—see the [Dynamic Instrumentation expression language][3] documentation for details. The log message is generated using the runtime state immediately *prior* to the line of code being executed. Generated log messages automatically pass through the Dynamic Instrumentation [Sensitive Data Scanner][5].

When a condition is defined, log events are generated only when the condition evaluates to true. Use conditions to capture events based on runtime state (for example, a particular transaction or product identifier).

The *Capture variables depth* controls how deeply hierarchical data structures are traversed when capturing runtime values. Higher values provide more useful information but require more capacity.

Logpoints expire automatically after 48 hours. Logpoint events are rate-limited to 1 execution per second.

#### Local and remote versions
Notice that the remote code may be a different version compared to the source code in the IDE. The **New Logpoint** dialog displays the version of the code that is deployed remotely, if it can be detected, so that you can see exactly where the logpoint is being placed. This requires that your application or service is [tagged with Git information][4].

<div class="alert alert-info"><b>Tip</b>: Checking out this revision locally shows you the same code in your IDE that is running remotely, which simplifies the live debugging experience. However, this is not required as the Datadog plugin maps local line numbers for logpoints to remote line numbers based on Git commit information.</div>

### Edit a logpoint
To modify the log message for a logpoint, right-click the logpoint and select **Edit**:

{{< img src="/developers/ide_plugins/idea/live_debugger/edit-logpoint.png" alt="Edit a log probe" style="width:75%;" >}}

You can update the log message, the logpoint condition, and the capture depth. Changing the service or environment requires deleting the logpoint and creating a new one.

Applying changes to the logpoint also extends the expiration time to 48 hours.

### Delete a logpoint
You can delete logpoints by right-clicking the icon in the gutter of the source editor, or the entry in the tool window, and selecting **Delete** from the context menu.

Deleting a logpoint does not delete the events already generated by the logpoint.

### Enable and disable a logpoint
You can enable or disable logpoints by right-clicking and selecting the appropriate context menu item. The icon changes to indicate the current state of the logpoint:

| Icon         | Description       |
|--------------|-------------------|
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeActive.svg.png" alt="Active icon" width="24px" >}}      | **Active**: Log events will be generated when the line of code is about to be executed.|
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeDisabled.svg.png" alt="Inactive icon" width="24px" >}}  | **Disabled**: The logpoint is inactive, either because it automatically expired or the user disabled it manually. |
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeError.svg.png" alt="Error icon" width="24px" >}}        | **Error**: The logpoint is not generating log events due to an error. |
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeWarning.svg.png" alt="Warning icon" width="24px" >}}    | **Warning**: The logpoint may not be generating log events. |

Disabling then re-enabling a logpoint extends its expiry time to 48 hours.

## Prerequisites
The Live Debugger feature in the IDE supports Java and Python and is subject to the same setup requirements as [Live Debugger][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/live_debugger/#getting-started
[2]: /logs/explorer/
[3]: /dynamic_instrumentation/expression-language/
[4]: /integrations/guide/source-code-integration/?tab=java#tag-your-telemetry-with-git-information
[5]: /tracing/dynamic_instrumentation/sensitive-data-scrubbing/
