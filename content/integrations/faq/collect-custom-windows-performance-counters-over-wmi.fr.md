---
title: Collecte des compteurs de performance Windows custom sur WMI
kind: faq
---

L'intégration de WMI de Datadog est une approche très polyvalente pour collecter des métriques pertinentes à partir de vos environnements Windows. Tant que vous êtes en mesure d'interroger un objet WMI pour une valeur numérique, vous pouvez configurer le check WMI de votre agent pour exécuter la même requête et collecter ses résultats sous forme de métrique [En apprendre plus sur les métriques WMI](/integrations/faq/how-to-retrieve-wmi-metrics).

But sometimes the default WMI counters aren't sufficient for specific use-cases --in those cases, you can create your own custom WMI counters for the `dd-agent` to query. Here's a simple example of a powershell script that would create a custom WMI counter:
```
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
```
PS C:\Users\estib> Get-WmiObject -List | where {$_.name -match "TestCounterCategory"} | select Name
```

Which ought to output something like the following:
```
Name
----
Win32_PerfFormattedData_TestCounterCategory_TestCounterCategory
Win32_PerfRawData_TestCounterCategory_TestCounterCategory
```

You can further identify what numerical properties you have available to query from your custom counter with a query like the following:
```
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

