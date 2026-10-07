---
description: Utilice el Datadog Agent para recopilar sus registros y enviarlos a Datadog
further_reading:
- link: agent/logs/agent_tags/
  tag: Documentación
  text: Etiquetas del Agent añadidas automáticamente a los registros
- link: agent/logs/advanced_log_collection/#filter-logs
  tag: Documentación
  text: Filtrar los registros enviados a Datadog
- link: agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
  tag: Documentación
  text: Eliminar datos confidenciales de sus registros
- link: agent/logs/advanced_log_collection/#multi-line-aggregation
  tag: Documentación
  text: Agregación de registros multilínea
- link: agent/logs/advanced_log_collection/#tail-directories-using-wildcards
  tag: Documentación
  text: Realice el seguimiento de las últimas líneas en directorios mediante el uso
    de comodines.
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: Documentación
  text: Reglas de procesamiento global
title: Recopilación de registros del Agent de host
---
La recopilación de registros requiere Datadog Agent v6.0+. Las versiones anteriores del Agent no incluyen la interfaz `log collection`. Si aún no utiliza el Agent, siga las [instrucciones de instalación del Agent][1].

Consulte [Observability Pipelines][2] si desea enviar registros utilizando el recopilador o reenviador de otro proveedor, o si desea preprocesar sus datos de registro dentro de su entorno antes de enviarlos.

## Activar la recopilación de registros {#activate-log-collection}

La recopilación de registros **no está habilitada** de forma predeterminada en el Datadog Agent. Si está ejecutando el Agent en un entorno de Kubernetes o Docker, consulte la documentación dedicada de [Recopilación de registros de Kubernetes][3] o [Recopilación de registros de Docker][4].

Para habilitar la recopilación de registros con un Agent ejecutándose en su host, cambie `logs_enabled: false` a `logs_enabled: true` en el [archivo de configuración principal][5] del Agent (`datadog.yaml`).

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="false" collapsible="true" >}}
logs_enabled: true
logs_config:
    auto_multi_line_detection: true
    force_use_http: true
{{< /code-block >}}

Para conocer todas las opciones de configuración disponibles, consulte los [ejemplos de archivos de configuración del Agent][6] para su sistema operativo.

<div class="alert alert-info">A partir del Agent v6.19+/v7.19+, el transporte HTTPS es el transporte predeterminado utilizado. Para obtener más detalles, consulte <a href="/agent/logs/log_transport/">transporte del Agent</a>.</div>

Para enviar registros con **variables de entorno**, configure lo siguiente:

```
DD_LOGS_ENABLED=true
```

Después de activar la recopilación de registros, el Agent está listo para reenviar registros a Datadog. A continuación, configure el Agent indicando de dónde recopilar los registros.

## Recopilación de registros personalizados {#custom-log-collection}

El Datadog Agent v6 puede recopilar registros y reenviarlos a Datadog desde archivos, la red (TCP o UDP), journald y canales de Windows:

1. En el directorio `conf.d/` en la raíz de su [directorio de configuración del Agent][5], cree una nueva carpeta `<CUSTOM_LOG_SOURCE>.d/` a la que pueda acceder el usuario de Datadog.
2. Cree un nuevo archivo `conf.yaml` en esta nueva carpeta.
3. Agregue un grupo de configuración de recopilación de registros personalizados con los parámetros a continuación.
4. [Reinicie el Agent][8] para tener en cuenta esta nueva configuración.
5. Ejecute el [subcomando de estado del Agent][9] y busque `<CUSTOM_LOG_SOURCE>` en la sección Checks.

Si hay errores de permisos, consulte [Problemas de permisos al seguimiento de las últimas líneas de archivos de registro][10] para solucionar el problema.

Para implementar la configuración de recopilación de registros personalizados en varios Agentes a la vez sin editar archivos en cada host, consulte [Configurar registros personalizados][15] con Fleet Automation.

A continuación, se muestran ejemplos de configuración de recopilación de registros personalizados:

{{< tabs >}}
{{% tab "Seguimiento de las últimas líneas de archivos" %}}

Para recopilar registros de su `<APP_NAME>` aplicación almacenados en `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`, cree un archivo `<APP_NAME>.d/conf.yaml` en la raíz de su [directorio de configuración del Agent][1] con el siguiente contenido:

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

En **Windows**, utilice la ruta `<DRIVE_LETTER>:\\<PATH_LOG_FILE>\\<LOG_FILE_NAME>.log` y verifique que el usuario `ddagentuser` tenga acceso de lectura al archivo de registro.

**Nota**: Una línea de registro debe terminar con un carácter de nueva línea, `\n` o `\r\n`; de lo contrario, el Agente espera indefinidamente y no envía la línea de registro.

[1]: /es/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "TCP/UDP" %}}

Para capturar la dirección IP del remitente e incluirla en la carga útil del mensaje de registro, agregue la siguiente configuración a su archivo `datadog.yaml`:

```yaml
 logs_config:
   use_sourcehost_tag: true
```
Para recopilar registros de su `<APP_NAME>` aplicación que reenvía sus registros al puerto TCP **10518**, cree un archivo `<APP_NAME>.d/conf.yaml` en la raíz de su [directorio de configuración del Agent][1] con el siguiente contenido:

```yaml
logs:
  - type: tcp
    port: 10518
    service: "<APP_NAME>"
    source: "<CUSTOM_SOURCE>"
```

Si está utilizando Serilog, `Serilog.Sinks.Network` es una opción para conectarse con UDP.

En la versión 7.31.0+ del Agent, la conexión TCP permanece abierta indefinidamente incluso cuando está inactiva.

**Notas**:
- El Agent admite registros con formato de cadena sin procesar, JSON y Syslog. Si está enviando registros por lotes, utilice caracteres de salto de línea para separar sus registros.
- Una línea de registro debe terminar con un carácter de nueva línea, `\n` o `\r\n`; de lo contrario, el Agent espera indefinidamente y no envía la línea de registro.

[1]: /es/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

Para recopilar registros de journald, cree un archivo `journald.d/conf.yaml` en la raíz de su [directorio de configuración del Agent][1] con el siguiente contenido:

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

Consulte la documentación de la [integración de journald][2] para obtener más detalles sobre la configuración para entornos en contenedores y el filtrado de unidades.

[1]: /es/agent/configuration/agent-configuration-files/
[2]: /es/integrations/journald/
{{% /tab %}}
{{% tab "Eventos de Windows" %}}

Para enviar eventos de Windows como logs a Datadog, agregue los canales a `conf.d/win32_event_log.d/conf.yaml` manualmente o utilice el Datadog Agent Manager.

Para ver su lista de canales, ejecute el siguiente comando en PowerShell:

```text
Get-WinEvent -ListLog *
```

Para ver los canales más activos, ejecute el siguiente comando en PowerShell:

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Luego, agregue los canales a su archivo de configuración `win32_event_log.d/conf.yaml`:

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

Edite los parámetros de `<CHANNEL_X>` con el nombre del canal de Windows del cual desea recopilar eventos.
Establezca el parámetro `source` correspondiente con el mismo nombre de canal para beneficiarse de la [configuración de la canalización de procesamiento automático de la integración][1].

Finalmente, [reinicie el Agent][2].

[1]: /es/logs/log_configuration/pipelines/#integration-pipelines
[2]: /es/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Ubicación privada de Windows" %}}
Siga los pasos en estas secciones para enviar registros de Ubicación privada de Windows a Datadog:

### Configure el Agent {#configure-the-agent}

1. Habilite la recopilación de registro del Agent configurando `logs_enabled: true` en el archivo de configuración del Agent.
2. Navegue a `C:\ProgramData\Datadog\conf.d` y cree una carpeta llamada `synthetics_worker.d`.
3. Dentro de la carpeta `synthetics_worker.d`, cree un archivo llamado `conf.yaml` usando el siguiente ejemplo como plantilla:

```yaml
logs:
  - type: file
    path: "C:\\Program Files\\Datadog-Synthetics\\Synthetics\\private-location-service.out.log"
    service: <YOUR_SERVICE>
    source: synthetics
    tags: # Defined per user preference
      - env:<YOUR_ENV>
      - private_location:<YOUR_PRIVATE_LOCATION>
```

### Verifique el usuario que ejecuta el Agent {#verify-the-user-running-the-agent}

Dado que la carpeta de instalación de la Ubicación privada está restringida al acceso de administrador, el Datadog Agent necesita permiso para acceder al archivo de registro. Siga estos pasos para verificar el usuario que ejecuta el Datadog Agent:

1. Presione la tecla Windows y `R`, y busque {{< ui >}}Run{{< /ui >}}.
2. Busque el Datadog Agent, haga clic derecho en él y seleccione {{< ui >}}Properties{{< /ui >}}.
3. En la pestaña {{< ui >}}Log On{{< /ui >}}, verifique la cuenta (la predeterminada es `ddagentuser`).
4. Cierre la ventana.

### Otorgue permiso al usuario que ejecuta el Agent {#grant-permission-to-the-user-running-the-agent}

1. Vaya a `C:\Program Files` y busque la carpeta `synthetics_worker.d`.
2. Haga clic derecho en la carpeta `synthetics_worker.d` y seleccione {{< ui >}}Properties{{< /ui >}}.
3. Vaya a la pestaña {{< ui >}}Security{{< /ui >}}.
4. Haga clic en {{< ui >}}Edit{{< /ui >}} y agregue `ddagentuser`.
5. Otorgue los permisos necesarios.
6. Reinicie el Datadog Agent a través de la pantalla de Servicios o la línea de comandos para aplicar los cambios y comenzar a enviar registros a Datadog.
{{% /tab %}}
{{< /tabs >}}

Lista de todos los parámetros disponibles para la recopilación de registros:

| Parámetro        | Requerido | Descripción                                                                                                                                                                                                                                                                                                                                              |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Sí      | El tipo de fuente de entrada de registro. Los valores válidos son: `tcp`, `udp`, `file`, `windows_event`, `docker` o `journald`.                                                                                                                                                                                                                                          |
| `port`           | Sí      | Si `type` es **tcp** o **udp**, establezca el puerto para escuchar los registros.                                                                                                                                                                                                                                                                                     |
| `path`           | Sí      | Si `type` es **file** o **journald**, establezca la ruta del archivo para recopilar registros.                                                                                                                                                                                                                                                                             |
| `channel_path`   | Sí      | Si `type` es **windows_event**, enumere los canales de eventos de Windows para recopilar registros.                                                                                                                                                                                                                                                                     |
| `service`        | Sí      | El nombre del servicio al que pertenece el registro. Si instrumentó su servicio con [Datadog APM][11], este debe ser el mismo nombre de servicio. Consulte las instrucciones de [unified service tagging][12] al configurar `service` en varios tipos de datos.                                                                                                          |
| `source`         | Sí      | El atributo que define qué integración está enviando los registros. Si los registros no provienen de una integración existente, este campo puede incluir un nombre de fuente personalizado. Sin embargo, se recomienda que haga coincidir este valor con el espacio de nombres de cualquier [métricas personalizadas][13] relacionadas que esté recopilando, por ejemplo: `myapp` de `myapp.request.count`. |
| `include_units`  | No       | Si `type` es **journald**, lista las unidades específicas de journald a incluir.                                                                                                                                                                                                                                                                               |
| `exclude_paths`  | Si | `type` es **file**, y `path` contiene un carácter comodín, liste el archivo o los archivos coincidentes a excluir de la recopilación de registros. Esto está disponible para la versión del Agent >= 6.18.                                                                                                                                                                            |
| `exclude_units`  | No       | Si `type` es **journald**, lista las unidades específicas de journald a excluir.                                                                                                                                                                                                                                                                               |
| `sourcecategory` | No       | El atributo utilizado para definir la categoría a la que pertenece un atributo de fuente, por ejemplo: `source:postgres, sourcecategory:database` o `source: apache, sourcecategory: http_web_access`.                                                                                                                                                                                                                              |
| `start_position` | No       | Consulte [Posición inicial](#start-position) para obtener más información.|
| `encoding`       | No       | Si `type` es **file**, establezca la codificación para que el Agent lea el archivo. Establézcalo en `utf-16-le` para UTF-16 little-endian, `utf-16-be` para UTF-16 big-endian o `shift-jis` para Shift JIS. Si se establece en cualquier otro valor, el Agent lee el archivo como UTF-8. _Se agregó `utf-16-le` y `utf-16be` en Agent v6.23/v7.23, `shift-jis` en Agent v6.34/v7.34_                                                                                      |
| `tags`           | No       | Una lista de etiquetas agregadas a cada registro recopilado ([obtenga más información sobre el etiquetado][14]).                                                                                                                                                                                                                                                                             |

### Posición inicial {#start-position}

El parámetro `start_position` es compatible con los tipos de tailer **file** y **journald**. El `start_position` siempre es `beginning` al realizar el seguimiento de un contenedor.

Soporte:
- **File**: Agent 6.19+/7.19+
- **Journald**: Agent 6.38+/7.38+

Si `type` es **file**:
- Establezca la posición para que el Agent comience a leer el file.
- Los valores válidos son `beginning`, `end`, `forceBeginning` y `forceEnd` (predeterminado: `end`).
- La posición `beginning` no admite rutas con comodines.

Si `type` es **journald**:
- Establezca la posición para que el Agent comience a leer el journal.
- Los valores válidos son `beginning`, `end`, `forceBeginning` y `forceEnd` (predeterminado: `end`).

#### Precedencia {#precedence}

Para ambos tipos de tailer, file y journald, si se especifica una posición `end` o `beginning`, pero se almacena un desplazamiento, el desplazamiento tiene precedencia. El uso de `forceBeginning` o `forceEnd` obliga al Agent a utilizar el valor especificado, incluso si hay un desplazamiento almacenado.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/observability_pipelines/
[3]: /es/containers/kubernetes/log/
[4]: /es/containers/docker/log/
[5]: /es/agent/configuration/agent-configuration-files/
[6]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example
[7]: /es/agent/logs/log_transport/
[8]: /es/agent/configuration/agent-commands/#restart-the-agent
[9]: /es/agent/configuration/agent-commands/#agent-status-and-information
[10]: /es/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files
[11]: /es/tracing/
[12]: /es/getting_started/tagging/unified_service_tagging
[13]: /es/metrics/custom_metrics/#overview
[14]: /es/getting_started/tagging/
[15]: /es/agent/fleet_automation/configure_logs/