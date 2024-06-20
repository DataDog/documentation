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
  text: Supervisar directorios mediante comodines
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: Documentación
  text: Reglas generales de procesamiento
title: Recopilación de logs del Agent del host
---

Para recopilar logs con el Datadog Agent es necesario disponer de la versión 6.0 o una posterior. Las versiones anteriores del Agent no incluyen la interfaz `log collection`. Si todavía no utilizas el Agent, sigue las [instrucciones de instalación][1].

## Activar la recopilación de logs

La recopilación de logs se encuentra **deshabilitada** de forma predeterminada en el Datadog Agent. Si ejecutas el Agent en un entorno de Kubernetes o Docker, consulta la documentación sobre la [recopilación de logs con Kubernetes][2] o la [recopilación de logs con Docker][3].

Para habilitar la recopilación de logs con un Agent que se está ejecutando en tu host, cambia `logs_enabled: false` a `logs_enabled: true` en el [archivo de configuración principal][4] del Agent (`datadog.yaml`).

{{< agent-config type="log collection configuration" filename="datadog.yaml" collapsible="true">}}

A partir de las versiones 6.19/7.19 del Agent, se utiliza de forma predeterminada el transporte HTTPS. Para obtener más información sobre cómo forzar el transporte HTTPS/TCP, consulta la [documentación de transporte del Agent][5].

Para enviar logs con variables de entorno, configura lo siguiente:

* `DD_LOGS_ENABLED=true`

Después de que actives la recopilación de logs, el Agent podrá reenviarlos a Datadog. A continuación, configura el Agent para indicarle desde dónde debe recopilar los logs.

## Recopilación de logs personalizada

El Datadog Agent v6 puede recopilar logs y reenviarlos a Datadog desde archivos, la red (TCP o UDP), journald y canales de Windows:

1. En el directorio `conf.d/` de la raíz del [directorio de configuración del Agent][4], crea una carpeta `<CUSTOM_LOG_SOURCE>.d/` nueva a la que pueda acceder un usuario de Datadog.
2. En ella, crea un archivo `conf.yaml` nuevo.
3. Añade un grupo de configuración de recopilación de logs personalizada con los parámetros que se detallan a continuación.
4. [Reinicia el Agent][6] para que aplique esta configuración nueva.
5. Ejecuta el [subcomando de estado del Agent][7] y busca `<CUSTOM_LOG_SOURCE>` en la sección Checks.

Para solucionar posibles errores relacionados con permisos, consulta la sección sobre los [problemas de permisos al supervisar los archivos de log][12].

A continuación, encontrarás ejemplos de una configuración de recopilación de logs personalizada:

{{< tabs >}}
{{% tab "Supervisar archivos" %}}

Para recopilar logs de tu aplicación `<APP_NAME>` almacenada en `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`, crea un archivo `<APP_NAME>.d/conf.yaml` en la raíz del [directorio de configuración del Agent][1] que incluya lo siguiente:

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

En **Windows**, utiliza la ruta `<DRIVE_LETTER>:\<PATH_LOG_FILE>\<LOG_FILE_NAME>.log` y verifica que el usuario `ddagentuser` tenga permiso de lectura y escritura en el archivo de log.

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

En versiones del Agent posteriores a la 7.31.0, la conexión TCP permanece abierta de forma indefinida, incluso en reposo.

**Nota**: El Agent es compatible con logs de cadenas sin formato, JSON y Syslog con formato. Si envías logs en bloque, utiliza saltos de línea para separarlos.

[1]: /es/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

Para recopilar logs de journald, crea un archivo `journald.d/conf.yaml` en la raíz del [directorio de configuración del Agent][1] que incluya lo siguiente:

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

Consulta la documentación sobre la [integración con journald][2] para obtener más detalles sobre la configuración de entornos contenedorizados y saber más sobre el filtrado de unidades.

[1]: /es/agent/configuration/agent-configuration-files/
[2]: /es/integrations/journald/
{{% /tab %}}
{{% tab "Eventos de Windows" %}}

Para enviar eventos de Windows como logs a Datadog, añade los canales a `conf.d/win32_event_log.d/conf.yaml` de forma manual o utiliza el Datadog Agent Manager.

Para consultar tu lista de canales, ejecuta el siguiente comando en un PowerShell:

```text
Get-WinEvent -ListLog *
```

Para consultar los canales más activos, ejecuta el siguiente comando en un PowerShell:

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Luego, añade los canales a tu archivo de configuración `win32_event_log.d/conf.yaml`:

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
| `type`           | Sí      | El tipo de origen de entrada del log. Los valores válidos son: `tcp`, `udp`, `file`, `windows_event`, `docker` o `journald`.                                                                                                                                                                                                                                          |
| `port`           | Sí      | Si `type` es **tcp** o **udp**, define el puerto en el que se realiza la escucha de los logs.                                                                                                                                                                                                                                                                                     |
| `path`           | Sí      | Si `type` es **file** o **journald**, configura la ruta de archivo para la recopilación de logs.                                                                                                                                                                                                                                                                             |
| `channel_path`   | Sí      | Si `type` es **windows_event**, establece una lista de los canales de eventos de Windows para la recopilación de logs.                                                                                                                                                                                                                                                                     |
| `service`        | Sí      | El nombre del servicio al que pertenece el log. Si has instrumentado tu servicio con [Datadog APM][8], este parámetro debe llevar el nombre del servicio. Verifica las instrucciones de [etiquetado de servicio unificado][9] cuando configures `service` en varios tipos de datos.                                                                                                          |
| `source`         | Sí      | El atributo que define qué integración envía los logs. Si los logs no vienen de una integración existente, el campo puede incluir un nombre de origen personalizado. Sin embargo, se recomienda que sea el espacio de nombres de alguna [métrica personalizada][10] relacionada que vayas a recopilar; por ejemplo, `myapp` para `myapp.request.count`. |
| `include_units`  | No       | Si `type` es **journald**, se trata de la lista de unidades journald que se deben incluir.                                                                                                                                                                                                                                                                               |
| `exclude_paths`  | No       | Si `type` es **file**, y `path` contiene un carácter comodín, es la lista con el archivo o los archivos que hay que excluir de la recopilación de logs. Disponible a partir de la versión 6.18 del Agent.                                                                                                                                                                            |
| `exclude_units`  | No       | Si `type` es **journald**, se trata de la lista de unidades journald que se deben excluir.                                                                                                                                                                                                                                                                               |
| `sourcecategory` | No       | El atributo que se utiliza para definir la categoría a la que pertenece un atributo de origen. Por ejemplo: `source:postgres, sourcecategory:database` o `source: apache, sourcecategory: http_web_access`.                                                                                                                                                                                                                              |
| `start_position` | No       | Si `type` es **file**, establece la posición para que el Agent comience a leer el archivo. Los valores válidos son `beginning` y `end` (por defecto: `end`). Si `path` contiene un carácter comodín, `beginning` no es compatible. _Se añadió en las versiones 6.19/7.19 del Agent_ <br/><br/>Si `type` es **journald**, establece la posición para que el Agent comience a leer el diario. Los valores válidos son `beginning`, `end`, `forceBeginning` y `forceEnd` (por defecto: `end`). Con las opciones de `force`, el Agent ignora el cursor almacenado en disco y siempre lee desde el principio o el final del diario cuando se inicia. _Se añadió en la versión 7.38 del Agent_                                                                                                          |
| `encoding`       | No       | Si `type` es **file**, establece qué codificación debe utilizar el Agent para leer el archivo. Utiliza `utf-16-le` para UTF-16 little-endian, `utf-16-be` para UTF-16 big-endian o `shift-jis` para Shift JIS. Si se establece cualquier otro valor, el Agent leerá el archivo como UTF-8.  _Se añadieron `utf-16-le` y `utf-16be` en las versiones 6.23/7.23 del Agent, y `shift-jis` en las versiones 6.34/7.34 del Agent_                                                                                      |
| `tags`           | No       | Una lista de las etiquetas que se añaden a todos los logs recopilados ([más información sobre el etiquetado][11]).                                                                                                                                                                                                                                                                             |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/kubernetes/log/
[3]: /es/agent/docker/log/
[4]: /es/agent/configuration/agent-configuration-files/
[5]: /es/agent/logs/log_transport/
[6]: /es/agent/configuration/agent-commands/#restart-the-agent
[7]: /es/agent/configuration/agent-commands/#agent-status-and-information
[8]: /es/tracing/
[9]: /es/getting_started/tagging/unified_service_tagging
[10]: /es/metrics/custom_metrics/#overview
[11]: /es/getting_started/tagging/
[12]: /es/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files