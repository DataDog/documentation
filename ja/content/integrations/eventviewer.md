---
description: Send Windows events to your Datadog event stream.
integration_title: Event Viewer
kind: integration
placeholder: true
title: Datadog-Event Viewer Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

Connect Event Viewer to Datadog in order to:

* Track system and application events in Datadog.
* Correlate system and application events with the rest of your application.

## Setup
### Configuration

Use the Windows Event Viewer GUI to list all the event logs you can capture with this integration.

To determine the exact values you can set your filters to, use the following PowerShell
command:

    Get-WmiObject -Class Win32_NTLogEvent

For instance, to see the latest event logged in the `Security` LogFile, use:

    Get-WmiObject -Class Win32_NTLogEvent -Filter "LogFile='Security'" | select -First 1

The values listed in the output of the command are the ones you can set in `win32_event_log.yaml` to capture the same kind of events.

<div class="alert alert-info">
The information given by the  <code> Get-EventLog</code> PowerShell command or the Windows Event ViewerGUI may slightly differ from <code>Get-WmiObject</code>.<br>
Please double-check your filters' values with <code>Get-WmiObject</code> if the integration doesn't capture the events you set up.
</div>

**This integration requires a Datadog Agent version >= 3.2.4**

1 - Configure one or more filters for the event log. A filter allows you to choose what log events you want to get into Datadog.

You can filters on the following properties:

* type: Warning, Error, Information
* log_file: Application, System, Setup, Security
* source_name: Any available source name
* user: Any valid user name

For each filter, you will add an instance in the configuration file at `conf.d/win32_event_log.yaml`.

Here are some example filters you could use:
{{< highlight yaml>}}
instances:
    # The following will capture errors and warnings from SQL Server which
    # puts all events under the MSSQLSERVER source and tag them with #sqlserver.
    -   tags:
            - sqlserver
        type:
            - Warning
            - Error
        log_file:
            - Application
        source_name:
            - MSSQLSERVER

    # This instance will capture all system errors and tag them with #system.
    -   tags:
            - system
        type:
            - Error
        log_file:
            - System
{{< /highlight >}}

2 - Restart the Agent using the Agent Manager (or restart the service)
{{< insert-example-links conf="win32_event_log" check="win32_event_log" >}}

### Validation

Check the info page in the Agent Manager and verify that the integration check has passed. It should display a section similar to the following:

{{< highlight shell>}}
Checks
======

  [...]

  win32_event_log
  ---------------
      - instance #0 [OK]
      - Collected 0 metrics, 2 events & 1 service check
{{< /highlight >}}
