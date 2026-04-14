---
app_id: wmi
app_uuid: ddd1578f-d511-4d57-b5dd-33c0ea7c391e
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: !!int 115
    source_type_name: WMI
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/wmi_check/README.md
display_on_public_website: true
draft: false
git_integration_title: wmi_check
integration_id: wmi
integration_title: Check de WMI (legacy)
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: wmi_check
public_title: Check de WMI (legacy)
short_description: Recopila y grafica cualquier métrica de WMI.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Windows
  - Supported OS::Windows
  - Offering::Integración
  configuration: README.md#Configuración
  description: Recopila y grafica cualquier métrica de WMI.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Check de WMI (legacy)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Métrica de WMI][1]

## Información general

**Nota:** Datadog ya no mantiene ni recomienda el uso de esta integración. En su lugar, utiliza la [integración de contadores de rendimiento de Windows][2] en todos los casos, debido a su significativa menor sobrecarga y, por lo tanto, su mejor escalabilidad.

Obtén métricas de tus aplicaciones y servidores Windows con Windows Management Instrumentation (WMI) en tiempo real para:

- Visualizar su rendimiento.
- Correlacionar su actividad con el resto de tus aplicaciones.

## Configuración

### Instalación

Si sólo estás recopilando métricas estándar de Microsoft Windows y otras aplicaciones empaquetadas, no hay pasos de instalación. Si necesita definir nuevas métricas para recopilarlas de tu aplicación, tienes varias opciones:

1. Envía contadores de rendimiento mediante System.Diagnostics en .NET y, a continuación, accede a ellos con WMI.
2. Despliega un proveedor WMI basado en COM para tu aplicación. Por lo general, sólo lo harías si estás utilizando un lenguaje que no sea .NET.

Para obtener más información sobre el uso de System.Diagnostics, consulta [PerformanceCounter Class][3]). Después de añadir tu métrica, deberías poder encontrarla en WMI. Para navegar por los espacios de nombres WMI, puede que te sea útil utilizar el [Explorador de WMI][4]. Puedes encontrar la misma información con Powershell, utilizando [Get-WmiObject][5]. Además, revisa la información en [Recuperación de métricas de WMI][6].

Si asignas a la nueva métrica una categoría My_New_Metric, la ruta WMI es
`\\<ComputerName>\ROOT\CIMV2:Win32_PerfFormattedData_My_New_Metric`

Si la métrica no aparece en WMI, intenta ejecutar `winmgmt /resyncperf` para forzar al ordenador a volver a registrar las bibliotecas de rendimiento con WMI.

### Configuración

1. Haz clic en el botón **Install Integration** (Instalar integración) en el cuadro de la integración WMI.
2. Abre el gestor del Datadog Agent en el servidor Windows.
3. Edita la configuración `Wmi Check`.

```yaml
init_config:
instances:
  - class: Win32_OperatingSystem
    metrics:
      - [NumberOfProcesses, system.proc.count, gauge]
      - [NumberOfUsers, system.users.count, gauge]
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, proc.threads.count, gauge]
      - [VirtualBytes, proc.mem.virtual, gauge]
      - [PercentProcessorTime, proc.cpu_pct, gauge]
    tag_by: Name
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [IOReadBytesPerSec, proc.io.bytes_read, gauge]
    tag_by: Name
    tag_queries:
      - [IDProcess, Win32_Process, Handle, CommandLine]
```

<div class="alert alert-info">
Por defecto, la configuración utiliza la cláusula de filtro para limitar las métricas extraídos. Configura los filtros con valores válidos o elimínalos para recopilar métricas, como se muestra` arriba.
</div>

Las definiciones de métricas incluyen tres componentes:

- Propiedad de clase en WMI.
- Nombre de métrica, tal y como aparece en Datadog.
- Tipo de métrica.

El siguiente ejemplo de configuración rellena muchas más métricas en un servidor Windows 2012.
```yaml
init_config:

instances:
  # Fetch the number of processes and users.
  - class: Win32_OperatingSystem
    metrics:
      - [NumberOfProcesses, system.proc.count, gauge]
      - [NumberOfUsers, system.users.count, gauge]

# Paging info
  - class: Win32_PerfFormattedData_PerfOS_Memory
    metrics:
      - [PageFaultsPersec, system.mem.page.faults, gauge]
      - [PageReadsPersec, system.mem.page.reads, gauge]
      - [PagesInputPersec, system.mem.page.input, gauge]
      - [AvailableMBytes, system.mem.avail, gauge]
      - [CommitLimit, system.mem.limit, gauge]
      # Cache bytes metric for disk info
      - [CacheBytes, system.mem.fs_cache, gauge]

# Paging file
  - class: Win32_PerfFormattedData_PerfOS_PagingFile
    metrics:
      - [PercentUsage, system.mem.page.pct, gauge]
    tag_by: Name
  # Fetch the number of processes
  - class: Win32_PerfFormattedData_PerfOS_System
    metrics:
      - [ProcessorQueueLength, system.proc.queue, gauge]

  - class: Win32_PerfFormattedData_PerfOS_Processor
    metrics:
      - [PercentProcessorTime, system.cpu.pct, gauge]
      - [PercentPrivilegedTime, system.cpu.priv.pct, gauge]
      - [PercentDPCTime, system.cpu.dpc.pct, gauge]
      - [PercentInterruptTime, system.cpu.interrupt.pct, gauge]
      - [DPCsQueuedPersec, system.cpu.dpc.queue, gauge]
    tag_by: Name

# Context switches
  - class: Win32_PerfFormattedData_PerfProc_Thread
    metrics:
      - [ContextSwitchesPersec, system.proc.context_switches, gauge]
    filters:
      - Name: _total/_total

# Disk info
  - class: Win32_PerfFormattedData_PerfDisk_LogicalDisk
    metrics:
      - [PercentFreeSpace, system.disk.free.pct, gauge]
      - [PercentIdleTime, system.disk.idle, gauge]
      - [AvgDisksecPerRead, system.disk.read_sec, gauge]
      - [AvgDisksecPerWrite, system.disk.write_sec, gauge]
      - [DiskWritesPersec, system.disk.writes, gauge]
      - [DiskReadsPersec, system.disk.reads, gauge]
      - [AvgDiskQueueLength, system.disk.queue, gauge]
    tag_by: Name

  - class: Win32_PerfFormattedData_Tcpip_TCPv4
    metrics:
      - [SegmentsRetransmittedPersec, system.net.tcp.retrans_seg, gauge]
    tag_by: Name
```
#### Opciones de configuración

_Esta función está disponible a partir de la versión 5.3 del Agent_

Cada consulta WMI tiene 2 opciones obligatorias, `class` y `metrics`, y seis opciones opcionales, `host`, `namespace`, `filters`, `provider`, `tag_by`, `constant_tags` y `tag_queries`.

- `class` es el nombre de la clase WMI, por ejemplo `Win32_OperatingSystem` o `Win32_PerfFormattedData_PerfProc_Process`. Puedes encontrar muchos de los nombres de clases estándar en los [documentos de MSDN][7]. Las clases `Win32_FormattedData_*` proporcionan muchos contadores de rendimiento útiles de forma predeterminada.

- `metrics` es una lista de las métricas que quieres capturar, donde cada elemento de la
  lista es un conjunto de `[<WMI_PROPERTY_NAME>, <METRIC_NAME>, <METRIC_TYPE>]`:

  - `<WMI_PROPERTY_NAME>` es algo como `NumberOfUsers` o `ThreadCount`. Las propiedades estándar también están disponibles en los documentos de MSDN de cada clase.
  - `<METRIC_NAME>` es el nombre que quieres que aparezca en Datadog.
  - `<METRIC_TYPE>` es una de las opciones estándar para todos los checks del Agent, como gauge, rate, histogram o counter.

- `host` es el objetivo opcional de la consulta WMI, `localhost` se asume por defecto. Si defines esta opción, asegúrate de que la gestión remota está habilitada en el host de destino. Para obtener más información, consulta [Configuración de la gestión remota en el Administrador de servidores][8].

- `namespace` es el espacio de nombres WMI opcional al que conectarse (por defecto `cimv2`).

- `filters` es una lista de filtros que podrías querer en la consulta WMI. Por ejemplo, para una clase WMI basada en procesos, es posible que quieras métricas sólo de algunos de los procesos que se ejecutan en tu máquina, en cuyo caso podrías añadir un filtro para cada nombre de proceso. También puedes utilizar el carácter '%' como comodín.

- `provider` es el proveedor WMI opcional (por defecto es `32` en el Datadog Agent de 32 bits o `64` bits). Se utiliza para solicitar datos WMI al proveedor no predeterminado. Las opciones disponibles son: `32` o `64`.
  Consulta [MSDN][9] para obtener más información.

- `tag_by` opcionalmente te permite etiquetar cada métrica con una propiedad de la clase WMI que estás utilizando. Esto sólo es útil cuando tienes varios valores para tu consulta WMI.

- `tags` opcionalmente te permite etiquetar cada métrica con un conjunto de valores fijos.

- `tag_queries` opcionalmente te permite especificar una lista de consultas, para etiquetar métricas con una propiedad de la clase de destino. Cada elemento de la lista es un conjunto de `[<LINK_SOURCE_PROPERTY>, <TARGET_CLASS>, <LINK_TARGET_CLASS_PROPERTY>, <TARGET_PROPERTY>]` donde:

  - `<LINK_SOURCE_PROPERTY>` contiene el valor del vínculo
  - `<TARGET_CLASS>` es la clase a la cual vincular
  - `<LINK_TARGET_CLASS_PROPERTY>` es la propiedad de la clase de destino a la cual vincular
  - `<TARGET_PROPERTY>` contiene el valor con el cual etiquetar

  Se traduce en una consulta WMI:
  `SELECT '<TARGET_PROPERTY>' FROM '<TARGET_CLASS>' WHERE '<LINK_TARGET_CLASS_PROPERTY>' = '<LINK_SOURCE_PROPERTY>'`

##### Ejemplo

La configuración `[IDProcess, Win32_Process, Handle, CommandLine]` etiqueta cada proceso con su línea de comandos. Cualquier número de instancia se elimina de los valores tag_by, por ejemplo: `name:process#1` => `name:process. NB`. El Agent debe ejecutarse bajo una cuenta de **Administrador** para que esto funcione, ya que la propiedad `CommandLine` no es accesible para no administradores.

### Validación

Ejecuta el [subcomando de estado del Agent][10] y busca `wmi_check` en la sección **Checks**.

## Datos recopilados

### Métricas

Todas las métricas recopiladas por el check de WMI se reenvían a Datadog como [métricas personalizadas][11], lo que puede afectar a tu [facturación][12].

### Eventos

El check de WMI no incluye eventos.

### Checks de servicio

El check de WMI no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][13].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/wmi_check/images/wmimetric.png
[2]: https://docs.datadoghq.com/integrations/windows_performance_counters/
[3]: https://docs.microsoft.com/en-us/dotnet/api/system.diagnostics.performancecounter
[4]: https://github.com/vinaypamnani/wmie2/releases
[5]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-wmiobject
[6]: https://docs.datadoghq.com/integrations/guide/retrieving-wmi-metrics/
[7]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa394084.aspx
[8]: https://technet.microsoft.com/en-us/library/Hh921475.aspx
[9]: https://msdn.microsoft.com/en-us/library/aa393067.aspx
[10]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[11]: https://docs.datadoghq.com/developers/metrics/custom_metrics/
[12]: https://docs.datadoghq.com/account_management/billing/custom_metrics/
[13]: https://docs.datadoghq.com/help/

