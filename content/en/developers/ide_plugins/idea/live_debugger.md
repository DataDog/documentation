---
further_reading:
- link: /dynamic_instrumentation/
  tag: Documentation
  text: Learn more about Dynamic Instrumentation
title: Live Debugger
type: documentation
---
## Overview
The Live Debugger enables you to add temporary log statements to your runtime code to collect information for debugging. The log statements (also referred to as "log probes") are added dynamically, so there is no need to redeploy your code, allowing you to quickly resolve issues in a running system. The log probes can be edited or deleted at any time, and automatically expire after 60 minutes.

## Live Debugger Tab
A tab in the Datadog Tool Window shows the defined log probes and the log output from these probes:

{{< img src="/developers/ide_plugins/idea/live_debugger/tool-window-tab.png" alt="The Live Debugger tab" style="width:100%;" >}}

The tree on the left-side shows all log probes created by the current user.  When a log probe is selected, the details for that probe, including log messages emitted during the past 24 hours, will be displayed on the right-side of the tab. At the top-right of the panel, the `View logs in Datadog` link will open the [Log Explorer][2] in Datadog to show log events for the selected probe.

You can navigate to the source code location for a probe, simply right-click and select `Jump to Source`. 

## Source Editor
In the source editor, an icon is shown in the gutter for any line that has a log probe defined:

{{< img src="/developers/ide_plugins/idea/live_debugger/gutter-icon.png" alt="Gutter icon in the source editor" style="width:100%;" >}}

Clicking on this icon will open the Datadog Tool Window and select the log probe.  Right-clicking the icon provides items to enable, disable, edit and delete the log probe. These actions are described in later sections.

## Managing Log Probes

### Add a Log Probe
To add a log probe, right-click on a line of code in the source editor and select `Add a Log to a Live Service`. A dialog appears where you can enter the service name, the environment and the log message you would like to have emitted at runtime:

{{< img src="/developers/ide_plugins/idea/live_debugger/new-log-probe.png" alt="Add a new log probe" style="width:100%;" >}}

The log message field accepts a log template that contains descriptive text and variable references—refer to the [Dynamic Instrumentation expression language][3] documentation for details. The log message will be generated using the runtime state immediately PRIOR to the line of code being executed.  

Log probes expire automatically after 60 minutes.

#### Local and Remote Versions
Notice that the remote code may be a different version compared to the source code in the IDE.  In the New Log Probe dialog, the plugin will display the version of the code that is deployed remotely, if possible, so that you can see exactly where the log probe will be placed.

<div class="alert alert-info">Tip: checking out this revision locally will show you the same code in your IDE that is running remotely, which simplifies the live debugging experience.  However this is not required as the Datadog plugin will map local line numbers for Log probes to remote line numbers based on Git commit information.</div>

### Edit a Log Probe
The log message for a probe can be modified, simply right-click on the log probe and select the `Edit` menu item:

{{< img src="/developers/ide_plugins/idea/live_debugger/edit-log-probe.png" alt="Edit a log probe" style="width:100%;" >}}

The service and environment cannot be changed by editing the log probe, only the log message.  Changing the service or environment requires deleting the probe and creating a new one.

Note that applying changes to the log probe also extends the expiration time to 60 minutes.

### Delete a Log Probe
Log probes can be deleted by right-clicking on the icon in the gutter of the source editor, or the entry in the Tool Window, and selecting `Delete` from the context menu.

### Enabling & Disabling Probes
Log probes can be enabled or disabled by right-clicking and selecting the appropriate context menu item.  The icon changes to indicate the current state of the log probe:

| Icon         | Description       |
|--------------|-------------------|
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeActive.svg.png" alt="Active icon" >}}      | Active: the log probe is active and log events will be generated when the line of code is about to be executed.|
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeDisabled.svg.png" alt="Inactive icon" >}}  | Disabled: the log probe is inactive, either because it automatically expired or the user disabled the it manually. |
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeError.svg.png" alt="Error icon" >}}        | Error: the log probe has an error and is not generating log events. |
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeWarning.svg.png" alt="Warning icon" >}}    | Warning: the log probe has a warning and may not be generating log events. |

Disabling then re-enabling a log probe will extend the expiry time of the probe to 60 minutes.

## Prerequisites
The Live Debugger feature supports Java and Python  and is subject to the same setup requirements as [Dynamic Instrumentation][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dynamic_instrumentation/
[2]: /logs/explorer/
[3]: /dynamic_instrumentation/expression-language/
