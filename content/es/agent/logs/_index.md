---
description: Utiliza el Datadog Agent para recopilar tus logs y enviarlos a Datadog
further_reading:
- link: agent/logs/advanced_log_collection/#filter-logs
  tag: Documentación
  text: Filtrar los logs enviados a Datalog
- link: agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
  tag: Documentación
  text: Limpiar datos confidenciales de tus logs
- link: agent/logs/advanced_log_collection/#multi-line-aggregation
  tag: Documentación
  text: Agregación de logs multilínea
- link: agent/logs/advanced_log_collection/#tail-directories-using-wildcards
  tag: Documentación
  text: Rastrear directorios utilizando comodines
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: Documentación
  text: Reglas generales de procesamiento
title: Recopilación de logs del Agent del host
---

Para recopilar logs con el Datadog Agent es necesario disponer de la versión 6.0 o posterior. Las versiones anteriores del Agent no incluyen la interfaz `log collection`. Si todavía no utilizas el Agent, sigue las [instrucciones de instalación del Agent][1].

Consulta [Observability Pipelines][2] si quieres enviar logs utilizando el Collector o Forwarder de otro proveedor, o si quieres procesar previamente los datos de los logs dentro de tu entorno antes del envío.

## Activar la recopilación de logs

La recopilación de logs **no está activada** por defecto en el Datadog Agent. Si estás ejecutando el Agent en un entorno Kubernetes o Docker, consulta la documentación sobre [recopilación de logs de Kubernetes][3] o [recopilación de logs de Docker][4] específica.

Para habilitar la recopilación de logs con un Agent ejecutándose en el host, cambia `logs_enabled: false` por `logs_enabled: true` en el [archivo principal de configuración ][5] (`datadog.yaml`) del Agent.

{{< agent-config type="log collection configuration" filename="datadog.yaml" collapsible="true">}}

A partir del Agent v6.19/v7.19 o posteriores, HTTPS es el transporte utilizado por defecto. Para obtener más detalles sobre cómo aplicar el transporte HTTPS/TCP, consulta la [documentación sobre transporte del Agent][6].

Para enviar logs con variables de entorno, configura lo siguiente:

* `DD_LOGS_ENABLED=true`

Después de activar la recopilación de logs, el Agent podrá reenviarlos a Datadog. A continuación, configura el Agent para indicarle desde dónde debe recopilar los logs.

## Recopilación de logs personalizada

El Datadog Agent v6 puede recopilar logs y reenviarlos a Datadog desde archivos, la red (TCP o UDP), journald y canales de Windows:

1. En el directorio `conf.d/` en la raíz del [directorio de configuración del Agent][5], crea una nueva carpeta `<CUSTOM_LOG_SOURCE>.d/` que sea accesible para el usuario de Datadog.
2. En ella, crea un archivo `conf.yaml` nuevo.
3. Añade un grupo de configuración de recopilación de logs personalizada con los parámetros que se detallan a continuación.
4. [Reinicia el Agent][7] para añadir esta nueva configuración.
5. Ejecuta el [subcomando de estado del Agent][8] y busca `<CUSTOM_LOG_SOURCE>` en la sección de checks.

Si se producen errores de permisos, consulta [Problemas de permisos para el rastreo de archivos de logs][9] para solucionar el problema.

A continuación, encontrarás ejemplos de una configuración de recopilación de logs personalizada:

{{< tabs >}}
{{% tab "Rastrear archivos" %}}

Para recopilar logs de tu aplicación `<APP_NAME>` almacenada en `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`, crea un archivo `<APP_NAME>.d/conf.yaml` en la raíz del [directorio de configuración del Agent][1] que incluya lo siguiente:

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

En **Windows**, utiliza la ruta `<DRIVE_LETTER>:\<PATH_LOG_FILE>\<LOG_FILE_NAME>.log` y verifica que el usuario `ddagentuser` tenga permiso de lectura y escritura en el archivo de log.

**Nota**: Una línea de logs debe terminar con un carácter de nueva línea, `\n` o `\r\n`, de lo contrario el Agent espera indefinidamente y no envía la línea de logs.

[1]: /es/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "TCP/UDP" %}}

Para recopilar logs de tu aplicación `<APP_NAME>`, que los transfiere a través del puerto TCP **10518**, crea un archivo `<APP_NAME>.d/conf.yaml` en la raíz del [directorio de configuración del Agent][1] que incluya lo siguiente:

```yaml
logs:
  - type: tcp
    port: 10518
    service: "<APP_NAME>"
    source: "<CUSTOM_SOURCE>"
```

Si utilizas Serilog, puedes usar `Serilog.Sinks.Network` para conectarte a través de UDP.

En versiones del Agent 7.31.0 y posteriores, la conexión TCP permanece abierta de forma indefinida, incluso en reposo.

**Notas**:
- El Agent admite cadenas sin procesar, JSON y el logs con el formato Syslog. Si envías logs por lotes, utiliza caracteres de salto de línea para separar tus logs.
- Una línea de logs debe terminar con un carácter de nueva línea, `\n` o `\r\n`, de lo contrario el Agent espera indefinidamente y no envía la línea de logs.

[1]: /es/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

Para recopilar logs de journald, crea un archivo `journald.d/conf.yaml` en la raíz del [directorio de configuración del Agent][1] que incluya lo siguiente:

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

Consulta la documentación sobre la [integración con journald][2] para obtener más información sobre la configuración de entornos contenedorizados y el filtrado de unidades.

[1]: /es/agent/configuration/agent-configuration-files/
[2]: /es/integrations/journald/
{{% /tab %}}
{{% tab "Eventos de Windows" %}}

Para enviar eventos de Windows como logs a Datadog, añade los canales a `conf.d/win32_event_log.d/conf.yaml` de forma manual o utiliza el administrador del Datadog.

Para consultar la lista de canales, ejecuta el siguiente comando en un PowerShell:

```text
Get-WinEvent -ListLog *
```

Para consultar los canales más activos, ejecuta el siguiente comando en un PowerShell:

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Luego, añade los canales al archivo de configuración `win32_event_log.d/conf.yaml`:

```yaml
logs:
  - type: windows_event
    channel_path: "<CHANNEL_1>"
    source: "<CHANNEL_1>"
    service: "<SERVICE>"
    sourcecategory: windowsevent

  - type: windows_event
    channel_path: "<CHANNEL_2>"
    source: "<CHANNEL_2>"
    service: "<SERVICE>"
    sourcecategory: windowsevent
```

Edita los parámetros `<CHANNEL_X>` con el nombre del canal de Windows desde el que quieres recopilar los eventos.
Establece el mismo nombre de canal en el parámetro `source` correspondiente para beneficiarte de la [configuración del pipeline de procesamiento automático de la integración][1].

Por último, [reinicia el Agent][2].

[1]: /es/logs/log_configuration/pipelines/#integration-pipelines
[2]: /es/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

Esta es una lista de todos los parámetros disponibles para la recopilación de logs:

| Parámetro        | Obligatorio | Descripción                                                                                                                                                                                                                                                                                                                                              |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Sí      | Tipo de origen de entrada del log. Los valores válidos son: `tcp`, `udp`, `file`, `windows_event`, `docker` o `journald`.                                                                                                                                                                                                                                          |
| `port`           | Sí      | Si `type` es **tcp** o **udp**, define el puerto en el que se realiza la escucha de los logs.                                                                                                                                                                                                                                                                                     |
| `path`           | Sí      | Si `type` es **archivo** o **journald**, configura la ruta de archivo para la recopilación de logs.                                                                                                                                                                                                                                                                             |
| `channel_path`   | Sí      | Si `type` es **windows_event**, establece una lista de los canales de eventos de Windows para la recopilación de logs.                                                                                                                                                                                                                                                                     |
| `service`        | Sí      | El nombre del servicio que posee el log. Si has instrumentado tu servicio con [Datadog APM [10], este debe ser el mismo nombre de servicio. Consulta las instrucciones de [etiquetado unificado de servicios][11] al configurar `service` en diferentes tipos de datos.                                                                                                          |
| `source`         | Sí      | Atributo que define qué integración está enviando los logs. Si los logs no proceden de una integración existente, este campo puede incluir un nombre de origen personalizado. Sin embargo, se recomienda hacer coincidir este valor con el espacio de nombres de cualquier [métrica personalizada][12] relacionada que estés recopilando. Por ejemplo: `myapp` de `myapp.request.count`. |
| `include_units`  | No       | Si `type` es **journald**, es la lista de unidades journald específicas que se deben incluir.                                                                                                                                                                                                                                                                               |
| `exclude_paths`  | No       | Si `type` es **archivo**, y `path` contiene un carácter comodín, es la lista con el archivo o archivos coincidentes que hay que excluir de la recopilación de logs. Disponible a partir de la versión 6.18 del Agent.                                                                                                                                                                            |
| `exclude_units`  | No       | Si `type` es **journald**, es la lista de unidades journald específicas que se deben excluir.                                                                                                                                                                                                                                                                               |
| `sourcecategory` | No       | Atributo que se utiliza para definir la categoría a la que pertenece un atributo de origen. Por ejemplo: `source:postgres, sourcecategory:database` o `source: apache, sourcecategory: http_web_access`.                                                                                                                                                                                                                              |
| `start_position` | No       | Consulta [Posición inicial](#start-position) para obtener más información.|
| `encoding`       | No       | Si `type` es **archivo**, establece qué codificación debe utilizar el Agent para leer el archivo. Utiliza `utf-16-le` para UTF-16 little-endian, `utf-16-be` para UTF-16 big-endian o `shift-jis` para Shift JIS. Si se establece cualquier otro valor, el Agent leerá el archivo como UTF-8.  _Se añadieron `utf-16-le` y `utf-16be` en las versiones 6.23/7.23 del Agent, y `shift-jis` en las versiones 6.34/7.34 del Agent_                                                                                      |
| `tags`           | No       | Una lista de etiquetas (tags) añadida a cada log recopilado ([más información sobre etiquetado][13]).                                                                                                                                                                                                                                                                             |

### Posición inicial

El parámetro `start_position` es compatible con los tipos de rastreadores **file** y **journald**. El parámetro `start_position` es siempre `beginning` cuando se rastrea un contenedor.

Compatibilidad:
- **File**: Agent v6.19/7.19 o posteriores
- **Journald**: Agent v6.38/7.38 o posteriores

Si `type` es **file**:
- Define la posición desde la que el Agent debe comenzar a leer el archivo.
- Los valores válidos son `beginning`, `end`, `forceBeginning` y `forceEnd` (por defecto: `end`).
- La posición `beginning` no admite rutas con comodines.

Si `type` es **journald**:
- Define la posición desde la que el Agent debe comenzar a leer el registro.
- Los valores válidos son `beginning`, `end`, `forceBeginning` y `forceEnd` (por defecto: `end`).

#### Prioridad

Tanto para el tipo de rastreador file como journald, si se especifica una posición `end` o `beginning`, pero se almacena un desplazamiento, este tiene prioridad. El uso de `forceBeginning` o `forceEnd` obliga al Agent a utilizar el valor especificado, aunque haya un desplazamiento almacenado.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/observability_pipelines/
[3]: /es/agent/kubernetes/log/
[4]: /es/agent/docker/log/
[5]: /es/agent/configuration/agent-configuration-files/
[6]: /es/agent/logs/log_transport/
[7]: /es/agent/configuration/agent-commands/#restart-the-agent
[8]: /es/agent/configuration/agent-commands/#agent-status-and-information
[9]: /es/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files'
[10]: /es/tracing/
[11]: /es/getting_started/tagging/unified_service_tagging
[12]: /es/metrics/custom_metrics/#overview
[13]: /es/getting_started/tagging/