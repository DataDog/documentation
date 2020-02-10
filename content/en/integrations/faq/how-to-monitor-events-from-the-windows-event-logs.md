---
title: How to monitor events from the Windows Event Logs ?
kind: faq
---

With the Windows version of the Datadog Agent, it is possible to post events to your [Event Stream][1] based on logs from the Windows Event Log.

To do so, open the Datadog Agent Manager. On the left pane, navigate to the Windows Event Log section.

The following defines filters that are matched against incoming events:

```yaml
# init_config:
#
# instances:
#   Each Event Log instance lets you define the type of events you want to
#   match and how to tag those events. You can use the following filters:
#
#   -
#     log_file:
#       - Application, System, Setup, Security
#     source_name:
#       - Any available source name
#     type:
#       - Warning, Error, Information...
#     user:
#       - Any valid user name
#     event_id:
#       - The Event ID can be found through http://www.eventid.net/ and viewed in the window event viewer.
#     message_filters:
#       - A list of message filters, using % as a wildcard.
```

The most common way to visualize Event Logs in Windows is to use the Windows Event Viewer. Though it is a convenient GUI tool, its main purpose is to alter the details of a log entry to make it more user-friendly and readable, which does not necessarily help when setting up filters.

As the Agent pulls log information from a WMI class, use a Powershell commandlet to filter event logs and look into their internal structure. In this example, you want to monitor events with ID 4776 from the security log, which represent a successful authentication on the system.

First, retrieve the last 100 entries from the security log*:

```text
$logs = Get-WmiObject -class Win32_NTLogEvent -filter "(logfile='Security')" | select -First 100
```

Now, display the first event with an ID of 4776:

```text
$logs | where  { $_.EventCode -eq 4776} | select -First 1 | format-list

Category         : 14336
CategoryString   : Credential Validation
EventCode        : 4776
EventIdentifier  : 4776
TypeEvent        :
InsertionStrings : {MICROSOFT_AUTHENTICATION_PACKAGE_V1_0, vagrant, WIN-5OU1M45KDAQ, 0x0}
LogFile          : Security
Message          : The computer attempted to validate the credentials for an account.

                   Authentication Package:    MICROSOFT_AUTHENTICATION_PACKAGE_V1_0
                   Logon Account:    vagrant
                   Source Workstation:    WIN-5OU1M45KDAQ
                   Error Code:    0x0
RecordNumber     : 6342
SourceName       : Microsoft-Windows-Security-Auditing
TimeGenerated    : 20150522184549.469748-000
TimeWritten      : 20150522184549.469748-000
Type             : Audit Success
UserName         :
```

Note how the `Type` here is Audit Success, whereas this information is labeled as "Keyword" in the Event Viewer.

Based on this information, you can create the following YAML file:

```yaml
init_config:

instances:
 ########################
-
  log_file:
    - Security
  type:
    - Audit Success
  event_id:
    - 4776
  source_name:
    - Microsoft-Windows-Security-Auditing
  tags:
    - SecurityAudit
######################
```

Save the configuration, enable the integration and [restart the Agent][2]. Now disconnect from the Windows machine and reconnect.

You should see an event appear on your [Event Stream][1] on the Datadog website.

*Note that the -Get-WmiObject command outlined does not locate all of the event logs by default. If this command does not return any results when you input the Event Log filename you wish to monitor, you have to add it to the registry. For more on how to add it to the registry, [check out this article][3].

** For convenience, reference [the YAML example][4] file to use as a template.

[1]: /events
[2]: /agent/guide/agent-commands/#start-stop-restart-the-agent
[3]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[4]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
