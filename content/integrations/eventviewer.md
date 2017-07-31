---
title: Datadog-Event Viewer Integration
integration_title: Event Viewer
kind: integration
---

## Overview

Connect Event Viewer to Datadog in order to:

* Track system and application events in Datadog.
* Correlate system and application events with the rest of your application.


## Configuration


Use the Windows Event Viewer GUI to list all the event logs you can capture with this integration.

To determine the exact values you can set your filters to, use the following PowerShell
command:

    Get-WmiObject -Class Win32_NTLogEvent

For instance, to see the latest event logged in the `Security` LogFile, use:

    Get-WmiObject -Class Win32_NTLogEvent -Filter "LogFile='Security'" | select -First 1

The values listed in the output of the command are the ones you can set in `win32_event_log.yaml` to capture the same kind of events.

**Note**: the information given by the `Get-EventLog` PowerShell command or the Windows Event Viewer
GUI may slightly differ from `Get-WmiObject`, so we recommend you to double-check your filters' values
with `Get-WmiObject` if the integration does not capture the events you set up.

**This integration requires a Datadog Agent version >= 3.2.4**

1. Configure one or more filters for the event log. A filter allows you to choose what log events you want to get into Datadog.

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

2. Restart the Agent using the Agent Manager (or restart the service)
{{< insert-example-links conf="win32_event_log" check="win32_event_log" >}}

## Validation

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
