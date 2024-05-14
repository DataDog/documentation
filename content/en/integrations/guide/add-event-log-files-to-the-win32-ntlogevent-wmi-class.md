---
title: Add event log files to the Win32_NTLogEvent WMI class
kind: guide
aliases:
  - /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
---

Not all event logs are are in the Win32_NTLogEvent WMI class. Since the Event Viewer integration can only pick up events in this class, modify the Windows Registry to add event logs outside of the scope of this class.

The first step is to confirm whether or not the logfile can be accessed through the Win32_NTLogEvent using the following WMI query in Powershell. (This is the same query the Agent runs to collect these events)

```text
$ Get-WmiObject -Query "Select EventCode,SourceName,TimeGenerated,Type,InsertionStrings,Message,Logfile from Win32_NTLogEvent WHERE ( LogFile = '<LogFileName>' )" | select -First 1
```

If there are no results, the log file cannot be accessed and you need to add it through the Windows Registry.

Locate the event logs you want to monitor in the Event Viewer. Locate the log file and click "properties" under the "Actions" section to find the Log path and Full Name. For example, here is how to set up monitoring the "Operational" event Log file located in the Microsoft/Windows/TaskScheduler folder:
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_1.png" alt="The windows event viewer showing a file selected named File and the option to edit string. The Value data: field is highlighted and shows the log path" >}}

Open the Windows Registry. (search for regedit.exe, the default name of the registry editor). Inside the registry editor, locate the EventLog folder in the following path:

```text
\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog\
```

Create a new key with the name of the event log you're wanting to monitor. Using the syntax of path-to-folder/LogFileName (as in the Full Name found in the Event Viewer).
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_2.png" alt="The EventLog folder expanded and right-clicked to show its sub-menu. New is selected in the submenu, and opens a new submenu. Key is highlighted with a red box" >}}

{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_3.png" alt="The EventLog folder expanded to show Microsoft-Windows-TaskScheduler/Operational highlighted in a red box" >}}

After creating the key, add three values to this key. First, add the path to the log file as a String Value (REG_SZ) named "File":
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_4.png" alt="The windows event viewer showing a file selected named file and the option to edit string. The Value data: field is highlighted and shows the log path" >}}

Next, add the Full Name of the Log file as a String Value (REG_SZ) named "Primary Module":
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_5.png" alt="The windows event viewer showing a file selected named Primary Module and the option to edit string. The Value data: field is highlighted and shows the full name" >}}

Finally, add the path to the Windows Event Log Api DLL (wevtapi.dll), which should be at `%SystemRoot%\system32\wevtapi.dll` as an Expandable String Value with the name "DisplayNameFile":
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_6.png" alt="The windows event viewer showing a file selected named DisplayNameFile and the option to edit string. The Value data: field is highlighted" >}}

The changes should be immediate. To confirm that the event log is accesible through the Win32_NTLogEvent WMI class, try the above query again. Then you can resume adding events to the Event Viewer integration config file.

Note: if there still aren't events when running the query, check the event viewer to confirm that there are any events in the log file. Also, make sure that the event log isn't disabled and that there are recent events available.
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_7.png" alt="The windows event viewer showing a list of actions on the right. The enable log action is highlighted with a note to enable log here" >}}

