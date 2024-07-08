---
title: Retrieving WMI metrics

aliases:
  - /integrations/faq/how-to-retrieve-wmi-metrics
---

## What is WMI?

In the Windows world, operating systems and applications metrics are exposed using the Windows Management Instrumentation. The Datadog Agent for Windows comes with a WMI Integration out of the box, so you can monitor the information that matters to you.

Data in WMI is grouped into classes. There are several hundreds classes that come by default, and each additional role and feature brings its own. Some Applications can also add classes such as Microsoft SQL Server, Microsoft Exchange along with various third party apps.

Microsoft Powershell is considered the standard way to interact with a Windows system programmatically, and it comes with the tools to manage WMI.

To list all classes available on a computer, run:

```text
PS C:\> Get-WmiObject -List

NameSpace: ROOT\cimv2

Name Methods Properties
---- ------- ----------
__SystemClass {} {}
__thisNAMESPACE {} {SECURITY_DESCRIPTOR}
__Provider {} {Name}
__Win32Provider {} {ClientLoadableCLSID, CLSID, Concurrency, DefaultMachineNam...
__IndicationRelated {} {}

[...]
```

To count how many classes are available, run:

```text
PS C:\> (Get-WmiObject -List).count
931
```

You can find classes about a specific topic by using the `where` statement. To display classes that hold processes information, run:

```text
PS C:\> Get-WmiObject -List | where {$_.name -match "process"} | select Name

Name
----
Win32_ProcessTrace
Win32_ProcessStartTrace
Win32_ProcessStopTrace
CIM_Process
Win32_Process
CIM_Processor
Win32_Processor
Win32_PerfFormattedData_PerfOS_Processor
Win32_PerfFormattedData_PerfProc_Process
[...]
```

To browse the data exposed by a class, you can use a syntax similar to SQL called [WQL][1].

Many performance related metrics are reported by the PerfMon tool, and are called `Win32_PerfFormattedData_`. In this example, look at the processes information so you can query the `Win32_PerfFormattedData_PerfProc_Process` class:

```text
PS C:\> Get-WmiObject -Query "select * from Win32_PerfFormattedData_PerfProc_Process where Name = 'Powershell'"

__GENUS                 : 2
__CLASS                 : Win32_PerfFormattedData_PerfProc_Process
__SUPERCLASS            : Win32_PerfFormattedData
__DYNASTY               : CIM_StatisticalInformation
__RELPATH               : Win32_PerfFormattedData_PerfProc_Process.Name="powershell"
__PROPERTY_COUNT        : 36
__DERIVATION            : {Win32_PerfFormattedData, Win32_Perf, CIM_StatisticalInformation}
__SERVER                : DATADOG-9A675BB
__NAMESPACE             : root\cimv2
__PATH                  : \\DATADOG-9A675BB\root\cimv2:Win32_PerfFormattedData_PerfProc_Process.Name="powershell"
Caption                 :
CreatingProcessID       : 2560
Description             :
ElapsedTime             : 3333
Frequency_Object        :
Frequency_PerfTime      :
Frequency_Sys100NS      :
HandleCount             : 655
IDProcess               : 4024
IODataBytesPersec       : 0
IODataOperationsPersec  : 0
IOOtherBytesPersec      : 0
IOOtherOperationsPersec : 0
IOReadBytesPersec       : 0
IOReadOperationsPersec  : 0
IOWriteBytesPersec      : 0
IOWriteOperationsPersec : 0
Name                    : powershell
PageFaultsPersec        : 0
PageFileBytes           : 39415808
PageFileBytesPeak       : 43970560
PercentPrivilegedTime   : 0
PercentProcessorTime    : 0
PercentUserTime         : 0
PoolNonpagedBytes       : 7132
PoolPagedBytes          : 206292
PriorityBase            : 8
PrivateBytes            : 39415808
ThreadCount             : 7
Timestamp_Object        :
Timestamp_PerfTime      :
Timestamp_Sys100NS      :
VirtualBytes            : 162775040
VirtualBytesPeak        : 170778624
WorkingSet              : 41054208
WorkingSetPeak          : 45273088
```

This command returns details about the Powershell process. It includes a lot of information including memory usage and I/O operations.

For those who can run third-party applications on their machine the tool WMI Explorer is great for browsing the information exposed by WMI. It's available here https://www.ks-soft.net/hostmon.eng/wmi/, it's a self-contained .exe file so you don't have to install it, and it's virus-free https://www.virustotal.com/en/file/df8e909491da38556a6c9a50abf42b3b906127e0d4b35d0198ef491139d1622c/analysis/.

## Leveraging WMI in Datadog

After understanding a little bit about how WMI works, you can get this data into Datadog. Open the Datadog Agent Manager and click on the WMI Check integration in the left panel.

Start with a simple example: monitoring the number of processes on the machine:

```yaml
init_config:

# Each WMI query has 2 required options, `class` and `metrics`
# `class` is the name of the WMI class, for example Win32_OperatingSystem
# `metrics` is a list of metrics you want to capture, with each item in the
# list being a set of [WMI property name, metric name, metric type].

instances:

  # Fetch the number of processes
  - class: Win32_OperatingSystem
    metrics:
      - [NumberOfProcesses, system.proc.count, gauge]
```

Save the configuration, enable the integration and restart then go to 'Logs and Status -> Agent Status'. Under the 'Checks' section you should see the following:

```text
wmi_check Instance #0 OK Collected 1 metrics, 0 events and 1 service check
```

Monitor the Windows Powershell process you were looking at earlier:

```yaml
init_config:

#   Fetch metrics for a single running application
instances:
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]

  # `filters` is a list of filters on the WMI query you may want. For example,
  # for a process-based WMI class you may want metrics for only certain
  # processes running on your machine, so you could add a filter for each
  # process name. See below for an example of this case.
    filters:
      - Name: powershell
```

In your Metrics Explorer you should find 2 metrics called powershell.threads.count and powershell.mem.virtual. But what happens if you have 2 Powershell consoles opened? You may find the following error in the 'Checks section':

```text
wmi_check
  Instance #0
    ERROR
  Error
    Exception("WMI query returned multiple rows but no `tag_by` value was given. metrics=[['ThreadCount',
    'powershell.threads.count', 'gauge'], ['VirtualBytes', 'powershell.mem.virtual', 'gauge']]",)
  Collected 0 metrics, 0 events and 1 service check
```

This is because the Agent cannot report on 2 different metrics that have the same set of name and tags. To be able to differentiate between the 2 you can use the `tag_by: Instance_Property_Name statement` to use the value of an instance's property as an additional tag:

```yaml
init_config:

instances:

#   Fetch metrics for each instance of a running application
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]
    filters:
      - Name: powershell
# `tag_by` optionally lets you tag each metric with a property from the
# WMI class you're using. This is only useful when you have multiple
# values for your WMI query. The examples below show how you can tag your
# process metrics with the process name (giving a tag of "name:app_name").
    tag_by: Name
# Note that bellow works on Window >= 2008, as process names are appended a `#XYZ` where `XYZ` is an incremental number
# If running on Windows 2003, use a different uniq value like `tag_by: IDProcess`
```

Which gives you 2 metrics per Powershell console opened:

```text
wmi_check
  Instance #0
    OK
  Collected 4 metrics, 0 events and 1 service check
```

If the information that you would like to use as a tag is not part of the class you're getting the data from, you have the possibility to use the tag_queries list to link data from different tables.

Say you want to report on PoolNonPagedBytes from Win32_PerfFormattedData_PerfProc_Process and you want to addCreationDate from Win32_Process as a tag. These 2 classes expose the PID with different names: IDProcess inWin32_PerfFormattedData_PerfProc_Process and Handle in Win32_Process. So the former is the link source property and the later the target property:

```yaml
# `tag_queries` optionally lets you specify a list of queries, to tag metrics
# with a target class property. Each item in the list is a set of
# [link source property, target class, link target class property, target property]
# where:
#
# - 'link source property' contains the link value
# - 'target class' is the class to link to
# - 'link target class property' is the target class property to link to
# - 'target property' contains the value to tag with
#
# It translates to a WMI query:
# SELECT 'target property' FROM 'target class'
#                 WHERE 'link target class property' = 'link source property'
#
# Note: setting this causes any instance number to be removed from tag_by values
# i.e. name:process#1 => name:process

init_config:

instances:

#   Fetch metrics for a single running application
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]
    filters:
      - Name: powershell
    tag_by: Name

    tag_queries:
      - [IDProcess, Win32_Process, Handle, CreationDate]
```

[1]: https://msdn.microsoft.com/en-us/library/aa392902
