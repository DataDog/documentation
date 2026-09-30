---
aliases:
- /es/integrations/faq/how-to-retrieve-wmi-metrics
title: Recuperación de métricas de WMI
---

## ¿Qué es WMI?

En el mundo Windows, las métricas de los sistemas operativos y de las aplicaciones se exponen mediante la instrumentación de administración de Windows. El Datadog Agent para Windows viene con una integración predefinida de WMI, para que puedas monitorizar la información que te importa.

Los datos en WMI se agrupan en clases. Hay varios cientos de clases que vienen en forma predeterminada y cada rol y función adicional trae la suya propia. Algunas aplicaciones también pueden añadir clases como el servidor SQL de Microsoft, Microsoft Exchange junto con distintas aplicaciones de terceros.

Microsoft Powershell se considera la forma estándar de interactuar con un sistema Windows mediante programación y viene con las herramientas para administrar WMI.

Para enumerar todas las clases disponibles en un ordenador, ejecuta:

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

Para contar cuántas clases están disponibles, ejecuta:

```text
PS C:\> (Get-WmiObject -List).count
931
```

Puedes encontrar clases sobre un tema específico utilizando la sentencia `where`. Para mostrar las clases que contienen información de procesos, ejecuta:

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

Para navegar por los datos expuestos por una clase, puedes utilizar una sintaxis similar a SQL llamada [WQL][1].

La herramienta PerfMon informa de muchas métricas relacionadas con el rendimiento, que se denominan `Win32_PerfFormattedData_`. En este ejemplo, mira la información de procesos para que puedas consultar la clase `Win32_PerfFormattedData_PerfProc_Process`:

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

Este comando devuelve detalles sobre el proceso de Powershell. Incluye mucha información, como el uso de memoria y las operaciones de E/S.

Para aquellos que pueden ejecutar aplicaciones de terceros en su máquina la herramienta WMI Explorer es excelente para navegar por la información expuesta por WMI. Está disponible aquí https://www.ks-soft.net/hostmon.eng/wmi/, es un archivo .exe autocontenido por lo que no es necesario instalarlo y está libre de virus https://www.virustotal.com/en/file/df8e909491da38556a6c9a50abf42b3b906127e0d4b35d0198ef491139d1622c/analysis/.

## Aprovechamiento de WMI en Datadog

Después de comprender un poco cómo funciona WMI, puedes obtener estos datos en Datadog. Abre el Administrador del Datadog Agent y haz clic en la integración de check de WMI en el panel izquierdo.

Comienza con un ejemplo sencillo: monitorización del número de procesos en la máquina:

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

Guarda la configuración, activa la integración, reinicia y a continuación, ve a 'Logs y estado -> Estado del Agent'. En la sección 'Checks' deberías ver lo siguiente:

```text
wmi_check Instance #0 OK Collected 1 metrics, 0 events and 1 service check
```

Monitoriza el proceso de Windows Powershell que estabas viendo antes:

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

En tu explorador de métricas deberías encontrar dos métricas llamadas powershell.threads.count y powershell.mem.virtual. Pero, ¿qué ocurre si tienes dos consolas de Powershell abiertas? Puede que encuentres el siguiente error en la 'sección de checks':

```text
wmi_check
  Instance #0
    ERROR
  Error
    Exception("WMI query returned multiple rows but no `tag_by` value was given. metrics=[['ThreadCount',
    'powershell.threads.count', 'gauge'], ['VirtualBytes', 'powershell.mem.virtual', 'gauge']]",)
  Collected 0 metrics, 0 events and 1 service check
```

Esto se debe a que el Agent no puede informar sobre dos métricas diferentes que tengan el mismo conjunto de nombre y etiquetas (tags). Para poder diferenciar entre ambas se puede utilizar el `tag_by: Instance_Property_Name statement` para usar el valor de la propiedad de una instancia como una etiqueta (tag) adicional:

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

Lo que te da dos métricas por cada consola de Powershell abierta:

```text
wmi_check
  Instance #0
    OK
  Collected 4 metrics, 0 events and 1 service check
```

Si la información que deseas utilizar como etiqueta (tag) no forma parte de la clase de la que obtienes los datos, tienes la posibilidad de utilizar la lista de tag_queries para vincular datos de diferentes tablas.

Digamos que deseas informar sobre PoolNonPagedBytes de Win32_PerfFormattedData_PerfProc_Process y deseas addCreationDate de Win32_Process como etiqueta (tag). Estas dos clases exponen el PID con diferentes nombres: IDProcess en Win32_PerfFormattedData_PerfProc_Process y Handle en Win32_Process. Por tanto, la primera es la propiedad de origen del enlace y la segunda la propiedad de destino:

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