---
description: Utiliza el Agente de Datadog para recopilar tus registros y enviarlos
  a Datadog
further_reading:
- link: agent/logs/agent_tags/
  tag: Documentación
  text: Etiquetas del agente añadidas automáticamente a los registros
- link: agent/logs/advanced_log_collection/#filter-logs
  tag: Documentación
  text: Filtrar registros enviados a Datadog
- link: agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
  tag: Documentación
  text: Eliminar datos sensibles de tus registros
- link: agent/logs/advanced_log_collection/#multi-line-aggregation
  tag: Documentación
  text: Agregación de registros de múltiples líneas
- link: agent/logs/advanced_log_collection/#tail-directories-using-wildcards
  tag: Documentación
  text: Seguir directorios utilizando comodines
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: Documentación
  text: Reglas de procesamiento globales
title: Recopilación de registros del Agente del host
---
La recopilación de registros requiere el Agente de Datadog v6.0 o superior. Las versiones anteriores del Agente no incluyen la interfaz `log collection`. Si no estás utilizando el Agente ya, sigue las [instrucciones de instalación del Agente][1].

Consulta [Observability Pipelines][2] si deseas enviar registros utilizando el colector o reenvío de otro proveedor, o si deseas preprocesar tus datos de registro en tu entorno antes de enviarlos.

## Activa la recopilación de registros {#activate-log-collection}

La recopilación de registros **no está habilitada** por defecto en el Agente de Datadog. Si estás ejecutando el Agente en un entorno de Kubernetes o Docker, consulta la documentación dedicada de [Recopilación de Registros de Kubernetes][3] o [Recopilación de Registros de Docker][4].

Para habilitar la recopilación de registros con un Agente que se ejecuta en tu host, cambia `logs_enabled: false` a `logs_enabled: true` en el [archivo de configuración principal][5] del Agente (`datadog.yaml`).

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="false" collapsible="true" >}}
logs_enabled: true
logs_config:
    auto_multi_line_detection: true
    force_use_http: true
{{< /code-block >}}

Consulta el [archivo de configuración config_template.yaml de ejemplo][6] para todas las opciones de configuración disponibles.

<div class="alert alert-info">A partir del Agente v6.19+/v7.19+, el transporte HTTPS es el transporte predeterminado utilizado. Para más detalles, consulta <a href="/agent/logs/log_transport/">Transporte del Agente</a>.</div>

Para enviar registros con **variables de entorno**, configure lo siguiente:

```
DD_LOGS_ENABLED=true
```

Después de activar la recopilación de registros, el Agente está listo para enviar registros a Datadog. A continuación, configura al Agente para indicar desde dónde recopilar registros.

## Recopilación de registros personalizada {#custom-log-collection}

El Agente de Datadog v6 puede recopilar registros y enviarlos a Datadog desde archivos, la red (TCP o UDP), journald y canales de Windows:

1. En el directorio `conf.d/` en la raíz de tu [directorio de configuración del Agente][5], crea una nueva carpeta `<CUSTOM_LOG_SOURCE>.d/` que sea accesible por el usuario de Datadog.
2. Crea un nuevo archivo `conf.yaml` en esta nueva carpeta.
3. Agrega un grupo de configuración de recopilación de registros personalizada con los parámetros a continuación.
4. [Reinicia tu Agente][8] para tener en cuenta esta nueva configuración.
5. Ejecuta el [subcomando de estado del Agente][9] y busca `<CUSTOM_LOG_SOURCE>` en la sección de comprobaciones.

Si hay errores de permisos, consulte [Problemas de permisos al hacer seguimiento de las últimas líneas de archivos de registro][10] para solucionar problemas.

A continuación se presentan ejemplos de configuración de recolección de registros personalizada:

{{< tabs >}}
{{% tab "Seguimiento de las últimas líneas de archivos" %}}

Para recolectar registros de tu `<APP_NAME>` aplicación almacenada en `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`, crea un archivo `<APP_NAME>.d/conf.yaml` en la raíz de tu [directorio de configuración del Agente][1] con el siguiente contenido:

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

En **Windows**, use la ruta `<DRIVE_LETTER>:\\<PATH_LOG_FILE>\\<LOG_FILE_NAME>.log` y verifique que el usuario `ddagentuser` tenga acceso de lectura al archivo de registro.

**Nota**: Una línea de registro debe terminar con un carácter de nueva línea, `\n` o `\r\n`, de lo contrario, el Agente espera indefinidamente y no envía la línea de registro.

[1]: /es/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "TCP/UDP" %}}

Para capturar la dirección IP del remitente e incluirla en la carga del mensaje de registro, agregue la siguiente configuración a su archivo `datadog.yaml`:

```yaml
 logs_config:
   use_sourcehost_tag: true
```
Para recolectar registros de tu `<APP_NAME>` aplicación que envía sus registros al puerto TCP **10518**, crea un archivo `<APP_NAME>.d/conf.yaml` en la raíz de tu [directorio de configuración del Agente][1] con el siguiente contenido:

```yaml
logs:
  - type: tcp
    port: 10518
    service: "<APP_NAME>"
    source: "<CUSTOM_SOURCE>"
```

Si estás utilizando Serilog, `Serilog.Sinks.Network` es una opción para conectarse con UDP.

En la versión 7.31.0+ del Agente, la conexión TCP permanece abierta indefinidamente incluso cuando está inactiva.

**Notas**:
- El Agente admite registros en formato de cadena sin procesar, JSON y Syslog. Si estás enviando registros en lotes, utiliza caracteres de salto de línea para separar tus registros.
- Una línea de registro debe terminar con un carácter de nueva línea, `\n` o `\r\n`, de lo contrario, el Agente espera indefinidamente y no envía la línea de registro.

[1]: /es/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

Para recopilar registros de journald, crea un archivo `journald.d/conf.yaml` en la raíz de tu [directorio de configuración del Agente][1] con el siguiente contenido:

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

Consulta la documentación de la [integración de journald][2] para obtener más detalles sobre la configuración para entornos en contenedores y filtrado de unidades.

[1]: /es/agent/configuration/agent-configuration-files/
[2]: /es/integrations/journald/
{{% /tab %}}
{{% tab "Eventos de Windows" %}}

Para enviar eventos de Windows como registros a Datadog, agrega los canales a `conf.d/win32_event_log.d/conf.yaml` manualmente o usa el Datadog Agent Manager.

Para ver tu lista de canales, ejecuta el siguiente comando en PowerShell:

```text
Get-WinEvent -ListLog *
```

Para ver los canales más activos, ejecuta el siguiente comando en PowerShell:

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Luego, agrega los canales a tu archivo de configuración `win32_event_log.d/conf.yaml`:

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

Edita los parámetros `<CHANNEL_X>` con el nombre del canal de Windows del que deseas recopilar eventos.
Establece el parámetro correspondiente `source` al mismo nombre de canal para beneficiarte de la [configuración de la canalización de procesamiento automático de integración][1].

Finalmente, [reinicia el Agente][2].

[1]: /es/logs/log_configuration/pipelines/#integration-pipelines
[2]: /es/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Ubicación Privada de Windows" %}}
Sigue los pasos en estas secciones para enviar registros de Ubicación Privada de Windows a Datadog:

### Configura el Agente {#configure-the-agent}

1. Habilita la recopilación de registros del Agente configurando `logs_enabled: true` en el archivo de configuración del Agente.
2. Navega a `C:\ProgramData\Datadog\conf.d` y crea una carpeta llamada `synthetics_worker.d`.
3. Dentro de la carpeta `synthetics_worker.d`, crea un archivo llamado `conf.yaml` utilizando el siguiente ejemplo como plantilla:

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

### Verifica el usuario que está ejecutando el Agente {#verify-the-user-running-the-agent}

Dado que la carpeta de instalación de la Ubicación Privada está restringida al acceso de administradores, el Agente de Datadog necesita permiso para acceder al archivo de registro. Sigue estos pasos para verificar el usuario que está ejecutando el Agente de Datadog:

1. Presiona la tecla de Windows y `R`, y busca {{< ui >}}Run{{< /ui >}}.
2. Encuentra el Agente de Datadog, haz clic derecho sobre él y selecciona {{< ui >}}Properties{{< /ui >}}.
3. En la pestaña {{< ui >}}Log On{{< /ui >}}, verifica la cuenta (el predeterminado es `ddagentuser`).
4. Cierra la ventana.

### Concede permiso al usuario que está ejecutando el Agente {#grant-permission-to-the-user-running-the-agent}

1. Ve a `C:\Program Files` y encuentra la carpeta `synthetics_worker.d`.
2. Haz clic derecho en la carpeta `synthetics_worker.d` y selecciona {{< ui >}}Properties{{< /ui >}}.
3. Ve a la pestaña {{< ui >}}Security{{< /ui >}}.
4. Haz clic en {{< ui >}}Edit{{< /ui >}} y agrega `ddagentuser`.
5. Concede los permisos necesarios.
6. Reinicia el Agente de Datadog a través de la pantalla de Servicios o la línea de comandos para aplicar los cambios y comenzar a enviar registros a Datadog.
{{% /tab %}}
{{< /tabs >}}

Lista de todos los parámetros disponibles para la recopilación de registros:

| Parámetro        | Requerido | Descripción                                                                                                                                                                                                                                                                                                                                              |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Sí      | El tipo de fuente de entrada de registro. Los valores válidos son: `tcp`, `udp`, `file`, `windows_event`, `docker` o `journald`.                                                                                                                                                                                                                                          |
| `port`           | Sí      | Si `type` es **tcp** o **udp**, configura el puerto para escuchar los registros.                                                                                                                                                                                                                                                                                     |
| `path`           | Sí      | Si `type` es **file** o **journald**, configura la ruta del archivo para recopilar registros.                                                                                                                                                                                                                                                                             |
| `channel_path`   | Sí      | Si `type` es **windows_event**, enumera los canales de eventos de Windows para recopilar registros.                                                                                                                                                                                                                                                                     |
| `service`        | Sí      | El nombre del servicio que posee el registro. Si instrumentaste tu servicio con [Datadog APM][11], este debe ser el mismo nombre del servicio. Consulta las instrucciones de [unified service tagging][12] al configurar `service` en múltiples tipos de datos.                                                                                                          |
| `source`         | Sí      | El atributo que define qué integración está enviando los registros. Si los registros no provienen de una integración existente, entonces este campo puede incluir un nombre de fuente personalizado. Sin embargo, se recomienda que haga coincidir este valor con el espacio de nombres de cualquiera de las [métricas personalizadas] relacionadas que esté recopilando, por ejemplo: `myapp` de `myapp.request.count`. |
| `include_units`  | No       | Si `type` es **journald**, lista de las unidades específicas de journald a incluir.                                                                                                                                                                                                                                                                               |
| `exclude_paths`  | No       | Si `type` es **file**, y `path` contiene un carácter comodín, liste el archivo o los archivos coincidentes a excluir de la recopilación de registros. Esto está disponible para la versión del Agente >= 6.18.                                                                                                                                                                            |
| `exclude_units`  | No       | Si `type` es **journald**, lista de las unidades específicas de journald a excluir.                                                                                                                                                                                                                                                                               |
| `sourcecategory` | No       | El atributo utilizado para definir la categoría a la que pertenece un atributo de fuente, por ejemplo: `source:postgres, sourcecategory:database` o `source: apache, sourcecategory: http_web_access`.                                                                                                                                                                                                                              |
| `start_position` | No       | Vea [Posición de inicio](#start-position) para más información.|
| `encoding`       | No       | Si `type` es **archivo**, configure la codificación para que el Agente lea el archivo. Establézcalo en `utf-16-le` para UTF-16 little-endian, `utf-16-be` para UTF-16 big-endian, o `shift-jis` para Shift JIS. Si se establece en cualquier otro valor, el Agente lee el archivo como UTF-8.  _Agregado `utf-16-le` y `utf-16be` en la versión 6.23/v7.23 del Agente, `shift-jis` en la versión 6.34/v7.34 del Agente_                                                                                      |
| `tags`           | No       | Una lista de etiquetas añadidas a cada registro recopilado ([aprenda más sobre etiquetado][14]).                                                                                                                                                                                                                                                                             |

### Posición de inicio {#start-position}

El parámetro `start_position` es compatible con **archivo** y **tipos de seguimiento de las últimas líneas de journald**. El `start_position` siempre es `beginning` al realizar el seguimiento de las últimas líneas de un contenedor.

Soporte:
- **Archivo**: Agente 6.19+/7.19+
- **Journald**: Agente 6.38+/7.38+

Si `type` es **archivo**:
- Establezca la posición para que el Agente comience a leer el archivo.
- Los valores válidos son `beginning`, `end`, `forceBeginning` y `forceEnd` (predeterminado: `end`).
- La posición `beginning` no admite rutas con comodines.

Si `type` es **journald**:
- Establezca la posición para que el Agente comience a leer el journald.
- Los valores válidos son `beginning`, `end`, `forceBeginning` y `forceEnd` (predeterminado: `end`).

#### Precedencia {#precedence}

Para ambos tipos de seguimiento de las últimas líneas, de archivo y de journald, si se especifica una posición `end` o `beginning`, pero se almacena un desplazamiento, éste tiene prioridad. Usar `forceBeginning` o `forceEnd` obliga al Agente a usar el valor especificado incluso si hay un desplazamiento almacenado.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/observability_pipelines/
[3]: /es/containers/kubernetes/log/
[4]: /es/containers/docker/log/
[5]: /es/agent/configuration/agent-configuration-files/
[6]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[7]: /es/agent/logs/log_transport/
[8]: /es/agent/configuration/agent-commands/#restart-the-agent
[9]: /es/agent/configuration/agent-commands/#agent-status-and-information
[10]: /es/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files
[11]: /es/tracing/
[12]: /es/getting_started/tagging/unified_service_tagging
[13]: /es/metrics/custom_metrics/#overview
[14]: /es/getting_started/tagging/