---
title: Datadog-Event Viewer Integration
integration_title: Event Viewer
kind: integration
---

<div id="int-overview">
<h3>Overview</h3>

Connect Event Viewer to Datadog in order to:
<ul>
<li> Track system and application events in Datadog.</li>
<li> Correlate system and application events with the rest of your application.</li>
</ul>
</div>

From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/win32_event_log.yaml.example">
Event Viewer YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/win32_event_log.py">
Event Viewer checks.d</a>

<h3>Configuration</h3>

Use the Windows Event Viewer GUI to list all the event logs you can capture with this integration.

To determine the exact values you can set your filters to, use the following PowerShell
command:

    Get-WmiObject -Class Win32_NTLogEvent

For instance, to see the latest event logged in the `Security` LogFile, use:

    Get-WmiObject -Class Win32_NTLogEvent -Filter "LogFile='Security'" | select -First 1

The values listed in the output of the command are the ones you can set in `win32_event_log.yaml`
to capture the same kind of events.

**Note**: the information given by the `Get-EventLog` PowerShell command or the Windows Event Viewer
GUI may slightly differ from `Get-WmiObject`, so we recommend you to double-check your filters' values
with `Get-WmiObject` if the integration does not capture the events you set up.
