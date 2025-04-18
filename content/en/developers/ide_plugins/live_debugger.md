---
title: Live Debugger
type: documentation
products:
- name: JetBrains IDEs
  url: /developers/ide_plugins/idea/
  icon: ide
further_reading:
- link: "/dynamic_instrumentation/"
  tag: "Documentation"
  text: "Learn more about Dynamic Instrumentation"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about Source Code Integration."
---
{{< product-availability >}}

## Overview
The Live Debugger enables you to add temporary log statements to your runtime code to collect information for debugging. The log statements (also referred to as "log probes") are added dynamically, so there is no need to redeploy your code, allowing you to quickly resolve issues in a running system. You can edit or delete log probes at any time, and they automatically expire after 60 minutes.

## Live Debugger tab
The **Live Debugger** in the Datadog tool window shows the defined log probes and the log output from these probes:

{{< img src="/developers/ide_plugins/idea/live_debugger/tool-window-tab.png" alt="The Live Debugger tab" style="width:100%;" >}}

The tree on the left shows all log probes created by the current user. Select a log probe to display the details for that probe, including log messages emitted during the past 24 hours. At the top-right of the panel, **View logs in Datadog** opens the [Log Explorer][2] in Datadog to show log events for the selected probe.

To navigate to the source code location for a probe, right-click and select **Jump to Source**.

## Source editor
In the source editor, an icon is shown in the gutter for any line that has a log probe defined:

{{< img src="/developers/ide_plugins/idea/live_debugger/gutter-icon.png" alt="Gutter icon in the source editor" style="width:100%;" >}}

Click the icon to open the Datadog tool window and select the log probe. Right-click the icon for options to enable, disable, edit, and delete the log probe. These actions are described in later sections.

## Managing log probes

### Add a log probe
To add a log probe, right-click on a line of code in the source editor and select **Add a Log to a Live Service**. A dialog appears where you can enter the service name, the environment, and the log message you would like to have emitted at runtime:

{{< img src="/developers/ide_plugins/idea/live_debugger/new-log-probe.png" alt="Add a new log probe" style="width:75%;" >}}

The log message field accepts a log template that contains descriptive text and variable references—see the [Dynamic Instrumentation expression language][3] documentation for details. The log message is generated using the runtime state immediately *prior* to the line of code being executed.  

Log probes expire automatically after 60 minutes.

#### Local and remote versions
Notice that the remote code may be a different version compared to the source code in the IDE. The New Log Probe dialog displays the version of the code that is deployed remotely, if possible, so that you can see exactly where the log probe will be placed. This requires that your application or service is [tagged with Git information][4].

<div class="alert alert-info"><b>Tip</b>: Checking out this revision locally shows you the same code in your IDE that is running remotely, which simplifies the live debugging experience. However, this is not required as the Datadog plugin maps local line numbers for log probes to remote line numbers based on Git commit information.</div>

### Edit a log probe
To modify the log message for a probe, right-click the log probe and select **Edit**:

{{< img src="/developers/ide_plugins/idea/live_debugger/edit-log-probe.png" alt="Edit a log probe" style="width:75%;" >}}

The service and environment cannot be changed by editing the log probe, only the log message. Changing the service or environment requires deleting the probe and creating a new one.

**Note**: Applying changes to the log probe also extends the expiration time to 60 minutes.

### Delete a log probe
You can delete log probes by right-clicking the icon in the gutter of the source editor, or the entry in the tool window, and selecting **Delete** from the context menu.

### Enable and disable a log probe
You can enable or disable log probes by right-clicking and selecting the appropriate context menu item. The icon changes to indicate the current state of the log probe:

| Icon         | Description       |
|--------------|-------------------|
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeActive.svg.png" alt="Active icon" width="24px" >}}      | **Active**: Log events will be generated when the line of code is about to be executed.|
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeDisabled.svg.png" alt="Inactive icon" width="24px" >}}  | **Disabled**: The log probe is inactive, either because it automatically expired or the user disabled it manually. |
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeError.svg.png" alt="Error icon" width="24px" >}}        | **Error**: The log probe is not generating log events due to an error. |
| {{< img src="/developers/ide_plugins/idea/live_debugger/probeWarning.svg.png" alt="Warning icon" width="24px" >}}    | **Warning**: The log probe may not be generating log events. |

Disabling then re-enabling a log probe extends the expiry time of the probe to 60 minutes.

## Prerequisites
The Live Debugger feature supports Java and Python and is subject to the same setup requirements as [Dynamic Instrumentation][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dynamic_instrumentation/
[2]: /logs/explorer/
[3]: /dynamic_instrumentation/expression-language/
[4]: /integrations/guide/source-code-integration/?tab=java#tag-your-telemetry-with-git-information
