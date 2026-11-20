---
title: Collect Custom Windows Performance Counters over WMI

---

Datadog's WMI integration is a versatile approach to collecting relevant metrics from your Windows environments. As long as you're able to query a WMI object for a numerical value, you can configure your dd-agent's WMI check to run the same query and collect its results as a metric. See the [retrieving WMI metrics][1] guide.

But sometimes the default WMI counters aren't sufficient for specific use-cases --in those cases, you can create your own custom WMI counters for the `dd-agent` to query. Here's a simple example of a powershell script that would create a custom WMI counter:

```powershell
$ccdTypeName ='System.Diagnostics.CounterCreationData'
$CounterCollection = New-Object System.Diagnostics.CounterCreationDataCollection
$perfCounterVersion = 2
$perfCounterCategoryName = 'TestCounterCategory'
$CounterCollection.Add((New-Object $ccdTypeName "TestNameType", "TestNameDescription", NumberOfItems32))
[System.Diagnostics.PerformanceCounterCategory]::Create($perfCounterCategoryName, $perfCounterVersion, [Diagnostics.PerformanceCounterCategoryType]::SingleInstance, $CounterCollection);
```

That script will create a new performance counter, which will be available for querying once you re-sync your WMI counters thus:

`winmgmt /resyncperf`

You can verify that the new counter is available by querying it from powershell like so:

```powershell
PS C:\Users\estib> Get-WmiObject -List | where {$_.name -match "TestCounterCategory"} | select Name
```

Which ought to output something like the following:

```text
Name
----
Win32_PerfFormattedData_TestCounterCategory_TestCounterCategory
Win32_PerfRawData_TestCounterCategory_TestCounterCategory
```

You can further identify what numerical properties you have available to query from your custom counter with a query like the following:

```text
PS C:\Users\estib> Get-WmiObject -Query "select * from Win32_PerfFormattedData_TestCounterCategory_TestCounterCategory"
...
TestNameType       : 0
...
```

If then I wanted to collect that "TestNameType" value as a metric called "wmi.testnametype.count", I could add this to my wmi_check.yaml configuration:

```yaml
instances:
  - class: Win32_PerfFormattedData_TestCounterCategory_TestCounterCategory
    metrics:
      - [TestNameType, wmi.testnametype.count, gauge]
```

**Note**: If you are submitting performance counters in languages other than English, set up the ddagentuser account with the en-US language pack.


[1]: /integrations/guide/retrieving-wmi-metrics/
