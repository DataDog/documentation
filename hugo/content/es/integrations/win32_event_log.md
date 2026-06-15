---
app_id: event-viewer
app_uuid: 8a0f4809-8470-4f7c-a7e8-350ba64123aa
assets:
  dashboards:
    windows_event_log_overview: assets/dashboards/windows_event_log_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 47
    source_type_name: Visor de eventos
  logs:
    source: windows.events
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
- log collection
- windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/win32_event_log/README.md
display_on_public_website: true
draft: false
git_integration_title: win32_event_log
integration_id: event-viewer
integration_title: Log de eventos de Windows
integration_version: 5.2.1
is_public: true
manifest_version: 2.0.0
name: win32_event_log
public_title: Log de eventos de Windows
short_description: Envía eventos de Windows a tu flujo (stream) de eventos de Datadog.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Sistema operativo y sistema
  - Category::Recopilación de logs
  - Category::Windows
  - Offering::Integración
  configuration: README.md#Configuración
  description: Envía eventos de Windows a tu flujo de eventos de Datadog.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/agent/logs/advanced_log_collection/?tab=configurationfile
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitoring-windows-server-2012
  - resource_type: blog
    url: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
  - resource_type: blog
    url: https://www.datadoghq.com/blog/windows-server-monitoring
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-windows-event-logs-with-datadog/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-cloud-siem-windows-event-logs/
  support: README.md#Support
  title: Log de eventos de Windows
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Esta integración busca logs de eventos de Windows y los reenvía a Datadog.

Habilita esta integración para:

- Realizar un seguimiento del sistema y de los eventos de aplicaciones en Datadog.
- Correlaciona eventos del sistema y las aplicaciones con el resto de tu aplicación.

Para obtener más información, consulta la [documentación sobre la generación de logs de eventos de Windows][1].

## Configuración

### Instalación

El check de logs de eventos de Windows está incluido en el paquete del [Datadog Agent [2]. No se requiere ninguna instalación adicional. 

### Configuración

Los logs de eventos de Windows se pueden recopilar mediante uno o ambos de los siguientes métodos.

- Como [eventos de Datadog][3]
- Como [logs de Datadog][4]

Ambos métodos se configuran en `win32_event_log.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][5]. Para conocer todas las opciones de configuración disponibles, consulta el [win32_event_log.d/conf.yaml de ejemplo][6]. Para ver una opción rápida para el envío de logs de eventos de seguridad, consulta [Enviar logs de seguridad predeterminados](#send-default-security-Logs).

Esta integración también viene con un dashboard de [información general de logs de eventos de Windows][7] predefinido disponible en la aplicación.

#### Listar canales de eventos de Windows

En primer lugar, identifica los canales de logs de eventos de Windows que quieres monitorizar. 

Dependiendo del método de recopilación, el nombre del canal puede utilizarse para los siguientes parámetros de configuración:

- Logs de Datadog: `channel_path`
- Eventos de Datadog: `path`
- Eventos de Datadog (legacy): `log_file`

##### PowerShell

Para ver una lista de canales, ejecuta el siguiente comando en PowerShell:

```powershell
Get-WinEvent -ListLog *
```

Para ver los canales más activos, ejecuta el siguiente comando en PowerShell:

```powershell
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Este comando muestra los canales en el formato `LogMode MaximumSizeInBytes RecordCount LogName`. 

Ejemplo de respuesta:

```text
LogMode  MaximumSizeInBytes RecordCount LogName 
Circular          134217728      249896 Security
Circular            5242880        2932 <CHANNEL_2>
```

El valor en la columna `LogName` es el nombre del canal. En el ejemplo anterior, el nombre del canal es `Security`.

##### Visor de eventos de Windows

Para encontrar el nombre del canal de un log de eventos en el Visor de eventos de Windows, abre la ventana Event Log Properties (Propiedades de logs de eventos) y consulta el campo `Full Name`. En el siguiente ejemplo, el nombre del canal es `Microsoft-Windows-Windows Defender/Operational`.

![Log de eventos de Windows][8]

{{< tabs >}}

{{% tab "Logs" %}}

#### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La recopilación de logs se encuentra deshabilitada por defecto en el Datadog Agent. Para recopilar logs de eventos de Windows como logs de Datadog, [habilita la recopilación de logs][1] configurando `logs_enabled: true` en tu archivo `datadog.yaml`.

Para recopilar logs de eventos de Windows como logs de Datadog, configura canales en la sección `logs:` de tu archivo de configuración `win32_event_log.d/conf.yaml`. Este ejemplo muestra entradas para los canales `Security` y `<CHANNEL_2>`:

```yaml
logs:
  - type: windows_event
    channel_path: Security
    source: windows.events
    service: Windows

  - type: windows_event
    channel_path: "<CHANNEL_2>"
    source: windows.events
    service: myservice
```

Configura el parámetro `source` correspondiente en `windows.events` para aprovechar el [pipeline de procesamiento automático de la integración][2].

[1]: https://docs.datadoghq.com/es/agent/logs/#activate-log-collection
[2]: https://docs.datadoghq.com/es/logs/processing/pipelines/#integration-pipelines
{{% /tab %}}
{{% tab "Eventos" %}}

#### Recopilación de eventos mediante el uso de la API de logs de eventos (recomendado)

El Datadog Agent se puede configurar para recopilar logs de eventos de Windows como eventos de Datadog utilizando la API de logs de eventos. Datadog recomienda utilizar la API de logs de eventos, ya que muestra un mejor rendimiento que el método legacy que se indica a continuación. Ten en cuenta que cada método tiene su propia sintaxis de configuración para los canales y para los filtros. Para obtener más información, consulta [Filtrado de eventos(?tab=events#filtering-events).

Para recopilar logs de eventos de Windows como eventos de Datadog, configura canales en la sección `instances:` de tu archivo de configuración `win32_event_log.d/conf.yaml`.

</br>Configura `legacy_mode: false` en cada instancia. Si se configura `legacy_mode: false`, es necesario configurar `path` en el archivo `\win32_event_log.d\conf.yaml`.

</br>Este ejemplo muestra entradas para los canales `Security` y `<CHANNEL_2>`:

  ```yaml
  init_config:
  instances:
    - # Event Log API 
      path: Security
      legacy_mode: false
      filters: {}

    - path: "<CHANNEL_2>" 
      legacy_mode: false
      filters: {}
  ```

Las versiones 7.49 y posteriores del Agent permiten configurar `legacy_mode` en la sección compartida `init_config`. Esto establece el valor predeterminado de todas las instancias y ya no es necesario configurar `legacy_mode` individualmente para cada instancia. Sin embargo, puedes seguir configurándolo para cada instancia.

  ```yaml
  init_config:
      legacy_mode: false
  instances:
    - # Event Log API
      path: Security
      filters: {}

    - path: "<CHANNEL_2>"
      filters: {}
  ```

#### Recopilación de eventos mediante el uso del modo legacy (obsoleto)

El método legacy utiliza WMI (Windows Management Instrumentation) y quedó obsoleto en la versión 7.20 del Agent.

Para recopilar logs de eventos de Windows como eventos de Datadog, configura canales en la sección `instances:` de tu archivo de configuración `win32_event_log.d/conf.yaml`.

</br>Para utilizar el modo legacy, configura `legacy_mode` como `true`. Luego, define al menos uno de los siguientes filtros: `source_name`, `event_id`, `message_filters`, `log_file` o `type`.

  </br> Este ejemplo muestra entradas para los canales `Security` y `<CHANNEL_2>`:

  ```yaml
  init_config:
  instances:
    - # WMI (default)
      legacy_mode: true
      log_file:
        - Security

    - legacy_mode: true
      log_file:
        - "<CHANNEL_2>"
  ```

Para obtener más información, consulta [Agregar archivos de logs de eventos a la clase WMI `Win32_NTLogEvent`][1].

[1]: https://docs.datadoghq.com/es/integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class/
{{% /tab %}}
{{< /tabs >}}

Edita los parámetros de `<CHANNEL_2>` con el nombre del canal Windows del que quieres recopilar eventos.

Por último, [reinicia el Agent][9].

**Nota**: Para el canal de logs de seguridad, añade tu usuario del Datadog Agent al grupo de usuarios `Event Log Readers`.

### Filtrado de eventos

Configura uno o varios filtros para logs de eventos. Un filtro te permite elegir los eventos de logs que quieres en Datadog.

{{< tabs >}}

{{% tab "Logs" %}}

Para filtrar logs de eventos, puedes utilizar la opción `query` y también la opción regex `log_processing_rules`. Datadog recomienda utilizar la opción de expresión regular `query`, que es más rápida con altas tasas de generación de logs de eventos de Windows y requiere menos CPU y memoria que los filtros `log_processing_rules`. Cuando se utilizan los filtros `log_processing_rules`, el Agent se ve obligado a procesar y formatear cada evento, incluso si va a ser excluido por el regex `log_processing_rules`. Cuando se utiliza la opción `query`, estos eventos no se informan al Agent.

Puedes utilizar la opción `query` para filtrar eventos con [consultas XPATH o XML estructuradas][1]. La opción `query` puede reducir el número de eventos procesados por `log_processing_rules` y mejorar el rendimiento. Existe un límite de expresión en la sintaxis de las consultas XPath y XML. Para realizar un filtrado adicional, utiliza los filtros `log_processing_rules`.

Datadog recomienda crear y probar la consulta en el editor de filtros del Visor de eventos, hasta que los eventos que se muestran en el Visor de eventos coincidan con lo que quieres que recopile el Agent.

![Filtrar log actual][2]

A continuación, copia y pega la consulta en la configuración del Agent. 

```yaml
  # recopilar eventos Críticos, de Advertencia y de Error
  - type: windows_event
    channel_path: Application
    source: windows.events
    service: Windows       
    query: '*[System[(Level=1 or Level=2 or Level=3)]]'

  - type: windows_event
    channel_path: Application
    source: windows.events
    service: Windows       
    query: |
      <QueryList>
        <Query Id="0" Path="Application">
          <Select Path="Application">*[System[(Level=1 or Level=2 or Level=3)]]</Select>
        </Query>
      </QueryList>
```

![Consulta XML][3]

Además de la opción `query`, los eventos se pueden filtrar aún más utilizando reglas de procesamiento de logs.

Algunos ejemplos de filtros son los siguientes:

```yaml
  - type: windows_event
    channel_path: Security
    source: windows.events
    service: Windows       
    log_processing_rules:
    - type: include_at_match
      name: relevant_security_events
      pattern: '"EventID":(?:{"value":)?"(1102|4624|4625|4634|4648|4728|4732|4735|4737|4740|4755|4756)"'

  - type: windows_event
    channel_path: Security
    source: windows.events
    service: Windows       
    log_processing_rules:
    - type: exclude_at_match
      name: relevant_security_events
      pattern: '"EventID":(?:{"value":)?"(1102|4624)"'

  - type: windows_event
    channel_path: System
    source: windows.events
    service: Windows       
    log_processing_rules:
    - type: include_at_match
      name: system_errors_and_warnings
      pattern: '"level":"((?i)warning|error)"'

  - type: windows_event
    channel_path: Application
    source: windows.events
    service: Windows       
    log_processing_rules:
    - type: include_at_match
      name: application_errors_and_warnings
      pattern: '"level":"((?i)warning|error)"'
```

El siguiente es un ejemplo de patrón de expresión regular para la recopilación de logs de eventos de Windows únicamente de un determinado EventID:

```yaml
logs:
  - type: windows_event
    channel_path: Security
    source: windows.event
    service: Windows
    log_processing_rules:
      - type: include_at_match
        name: include_x01
        pattern: '"EventID":(?:{"value":)?"(101|201|301)"'
```

**Nota**: El patrón puede variar en función del formato de los logs. El [subcomando `stream-logs` del Agent][4] se puede utilizar para ver este formato.

Para ver más ejemplos de filtrado de logs, consulta la [documentación sobre la recopilación avanzada de logs][5].

#### Eventos legacy
_Se aplica a la versión 7.41 o anteriores Agent_

Los EventID de proveedores legacy tienen un atributo `Qualifiers` que cambia el formato del log, como se ve en el [Esquema de eventos de Windows][6]. Estos eventos tienen el siguiente formato XML, visible en el Visor de eventos de Windows:
```xml
<EventID Qualifiers="16384">3</EventID>
```

Se debe utilizar la siguiente expresión regular para hacer coincidir estos EventID:
```yaml
logs:
  - type: windows_event
    channel_path: Security
    source: windows.event
    service: Windows
    log_processing_rules:
      - type: include_at_match
        name: include_legacy_x01
        pattern: '"EventID":(?:{"value":)?"(101|201|301)"'
```

Las versiones 7.41 o posteriores del Agent normalizan el campo EventID. Esto elimina la necesidad de la subcadena, `(?:{"value":)?`, del patrón legacy ya que ya no es aplicable. Se puede utilizar un patrón de expresión regular más corto a partir de las versiones 7.41 o posteriores, como se ve a continuación:

```yaml
logs:
  - type: windows_event
    channel_path: Security
    source: windows.event
    service: Windows
    log_processing_rules:
      - type: include_at_match
        name: include_x01
        pattern: '"EventID":"(101|201|301)"'
```

[1]: https://learn.microsoft.com/en-us/windows/win32/wes/consuming-events
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/win32_event_log/images/filter-event-viewer.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-core/master/win32_event_log/images/xml-query-event-viewer.png
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/
[5]: https://docs.datadoghq.com/es/agent/logs/advanced_log_collection/?tab=configurationfile#filter-logs
[6]: https://learn.microsoft.com/en-us/windows/win32/wes/eventschema-systempropertiestype-complextype
{{% /tab %}}
{{% tab "Eventos" %}}

Utiliza la GUI del Visor de eventos de Windows para listar todos los logs de eventos disponibles para su captura con esta integración.

Para determinar los valores exactos, configura tus filtros para utilizar el siguiente comando de PowerShell:

```text
Get-WmiObject -Class Win32_NTLogEvent
```

Por ejemplo, para ver el último evento registrado en el archivo de log `Security`, utiliza lo siguiente:

```text
Get-WmiObject -Class Win32_NTLogEvent -Filter "LogFile='Security'" | select -First 1
```

Los valores que aparecen en el resultado del comando pueden configurarse en `win32_event_log.d/conf.yaml` para capturar el mismo tipo de eventos.

<div class="alert alert-info">
La información proporcionada por el comando PowerShell <code>Get-EventLog</code> o la GUI del Visor de eventos de Windows puede diferir ligeramente de <code>Get-WmiObject</code>.<br> Vuelve a comprobar los valores de tus filtros con <code>Get-WmiObject</code> si la integración no captura los eventos configurados.
</div>

#### Filtrado de eventos mediante el uso de la API de logs de eventos (recomendado)

La opción de configuración que utiliza la API de logs de eventos incluye los siguientes filtros:

  - `path`: `Application`, `System`, `Setup`, `Security`
  - `type`: `Critical`, `Error`, `Warning`, `Information`, `Success Audit`, `Failure Audit`
  - `source`: Cualquier nombre de fuente disponible
  - `id`: event_id: ID de EventLog de Windows

  Para ver todas las opciones de filtrado disponibles, consulta el [win32_event_log.d/conf.yaml de ejemplo][1].

  Este filtro de ejemplo utiliza el método de la API de logs de eventos.

  ```yaml
  instances:
    - legacy_mode: false
      path: System
      filters:
        source:
        - Microsoft-Windows-Ntfs
        - Service Control Manager
        type:
        - Error
        - Warning
        - Information
        - Success Audit
        - Failure Audit
        id:
        - 7036
  ```

Puedes utilizar la [opción`query`][2] para filtrar eventos con [consultas XPATH o XML estructuradas][3]. Datadog recomienda crear la consulta en el editor de filtros del Visor de eventos hasta que los eventos que se muestran en el Visor de eventos coincidan con lo que quieres que recopile el Datadog Agent. La opción `filters` se ignora cuando se utiliza la opción `query`.

  ```yaml
  init_config:
  instances:
    # recopilar eventos Críticos, de Advertencia y de Error
    - path: Application
      legacy_mode: false
      query: '*[System[(Level=1 or Level=2 or Level=3)]]'

    - path: Application
      legacy_mode: false
      query: |
        <QueryList>
          <Query Id="0" Path="Application">
            <Select Path="Application">*[System[(Level=1 or Level=2 or Level=3)]]</Select>
          </Query>
        </QueryList>
 ```

#### Filtrado de eventos mediante el modo legacy (obsoleto)

La opción de configuración que utiliza el modo legacy incluye los siguientes filtros:

  - `log_file`: `Application`, `System`, `Setup`, `Security`
  - `type`: `Critical`, `Error`, `Warning`, `Information`, `Audit Success`, `Audit Failure`
  - `source_name`: Cualquier nombre de fuente disponible
  - `event_id`: ID de EventLog de Windows

  Este filtro de ejemplo utiliza el método del modo legacy.

  ```yaml
  instances:
    # Legacy
    # The following captures errors and warnings from SQL Server which
    # puts all events under the MSSQLSERVER source and tag them with #sqlserver.
    - tags:
        - sqlserver
      type:
        - Warning
        - Error
      log_file:
        - Application
      source_name:
        - MSSQLSERVER

    # This instance captures all system errors and tags them with #system.
    - tags:
        - system
      type:
        - Error
      log_file:
        - System
  ```
El método legacy no admite la opción `query`. Sólo el método de la API de logs de eventos (parámetro `legacy_mode: false`) y el Rastreador de logs admiten la opción `query`.

[1]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
[2]: https://github.com/DataDog/integrations-core/blob/10296a69722b75098ed0b45ce55f0309a1800afd/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example#L74-L89
[3]: https://learn.microsoft.com/en-us/windows/win32/wes/consuming-events
{{% /tab %}}
{{< /tabs >}}

Cuando hayas terminado de configurar los filtros, [reinicia el Agent][9] utilizando el Gestor del Agent o reinicia el servicio.

### Validación

{{< tabs >}}
{{% tab "Logs" %}}

Consulta la página de información en el Gestor del Datadog Agent o ejecuta el [subcomando de `status` del Agent][1] y busca `win32_event_log` en la sección Logs del Agent. 

Debería mostrar una sección similar a la siguiente:

```shell
Logs Agent
==========

  [...]

  win32_event_log
  ---------------
    - Type: windows_event
      ChannelPath: System
      Status: OK
```

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{% tab "Eventos" %}}

Consulta la página de información en el Gestor del Datadog Agent o ejecuta el [subcomando de `status` del Agent][1] y busca `win32_event_log` en la sección Checks. 

Debería mostrar una sección similar a la siguiente:

```shell
Checks
======

  [...]

  win32_event_log
  ---------------
      - instance #0 [OK]
      - Collected 0 metrics, 2 events & 1 service check
```

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

## Enviar logs de seguridad por defecto

A partir del Agent v7.54, puedes enviar automáticamente eventos de seguridad a Datadog como logs, utilizando el indicador `dd_security_events`. Estos logs se pueden utilizar con [Cloud SIEM de Datadog][10] para detectar automáticamente amenazas y actividades sospechosas en tiempo real. Estos eventos de seguridad predeterminados son compatibles con las reglas de detección predefinidas de Datadog para crear señales de seguridad cuando un usuario borra logs de seguridad, desactiva el cortafuegos de Windows, cambia la contraseña del Directory Services Restore Mode (DSRM) y más.

1. [Habilita la recopilación de logs][11] en tu archivo `datadog.yaml`. Se encuentra deshabilitada por defecto en el Datadog Agent.

   ```yaml
   logs_enabled: true
   ```

2. En el archivo de configuración de la integración, (`win32_event_log.d/conf.yaml`), configura el indicador `dd_security_events` como `low` o `high` para iniciar el envío de eventos de seguridad a Datadog.

   ```yaml
   init_config:
     legacy_mode: false
   instances:
     - dd_security_events: high
   ```

   - `low`: envía sólo los eventos de seguridad más importantes y críticos, incluyendo Logs de auditoría autorizados (1102), Ataque de Replay detectado (4649) y Política de auditoría del sistema cambiada (4719). Para ver una lista completa de eventos recopilados en el parámetro `low`, [consulta aquí][12].
   - `high`: envía un mayor volumen de eventos de seguridad, incluyendo Política de recuperación de datos encriptados modificada (4714), Política de dominio modificada (4739) y Grupo de seguridad desactivado eliminado (4764). Para ver una lista completa de eventos recopilados con el parámetro `high`, [consulta aquí][13].

Los equipos pueden cambiar los ID de eventos asociados a los parámetros `low` o `high` editando estos perfiles. 


3. [Reinicia el Agent][9].


## Datos recopilados

### Métricas

El check de logs de eventos de Windows no incluye métricas.

### Eventos

Todos los eventos de Windows se reenvían a Datadog.

### Checks de servicio

El check de logs de eventos de Windows no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][14] mediante una [Flare del Agent][15].

### Las reglas para el procesamiento de logs no funcionan

Si estás utilizando reglas para el procesamiento de logs, comprueba que los logs sin procesar coinciden con el patrón de expresión regular que has configurado. En la configuración a continuación, los niveles de logs deben ser `warning` o `error`. Cualquier otro valor queda excluido.

```yaml
    - type: windows_event
      channel_path: System
      source: windows.events
      service: Windows       
      log_processing_rules:
      - type: include_at_match
        name: system_errors_and_warnings
        pattern: '"level":"((?i)warning|error)"'
```

Para solucionar problemas de las reglas para el procesamiento de logs:
1. Elimina o comenta la estrofa `log_processing_rules`.
2. Reinicia el Agent.
3. Envía un log de test que incluya los valores que intentas capturar. Si el log aparece en Datadog, probablemente haya un problema con tu expresión regular. Compara tu expresión regular con el archivo de log para asegurarte de que estás capturando las frases correctas.

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Recopilación avanzada de logs][16]
- [Monitorización de Windows Server 2012][17]
- [Recopilación de métricas de Windows Server 2012][18]
- [Monitorización de Windows Server 2012 con Datadog][19]
- [Monitorización de logs de eventos de Windows con Datadog][20]
- [Monitorización de logs de eventos de Windows con Datadog Cloud SIEM][21]


[1]: https://docs.microsoft.com/en-us/windows/win32/eventlog/event-logging
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[3]: https://docs.datadoghq.com/es/service_management/events/
[4]: https://docs.datadoghq.com/es/logs/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
[7]: https://app.datadoghq.com/integrations?integrationId=event-viewer
[8]: https://raw.githubusercontent.com/DataDog/integrations-core/master/win32_event_log/images/windows-defender-operational-event-log-properties.png
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/es/security/cloud_siem/
[11]: https://docs.datadoghq.com/es/agent/logs/#activate-log-collection
[12]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/win32_event_log.d/profiles/dd_security_events_low.yaml.example
[13]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/win32_event_log.d/profiles/dd_security_events_high.yaml.example
[14]: https://docs.datadoghq.com/es/help/
[15]: https://docs.datadoghq.com/es/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[16]: https://docs.datadoghq.com/es/agent/logs/advanced_log_collection/?tab=configurationfile
[17]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[18]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[19]: https://www.datadoghq.com/blog/windows-server-monitoring
[20]: https://www.datadoghq.com/blog/monitor-windows-event-logs-with-datadog/
[21]: https://www.datadoghq.com/blog/datadog-cloud-siem-windows-event-logs/