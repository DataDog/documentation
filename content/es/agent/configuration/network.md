---
algolia:
  tags:
  - tráfico de red
  - destinos
  - puertos
  - almacenamiento de datos en buffer
  - direcciones IP estáticas
aliases:
- /es/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
- /es/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
- /es/agent/network
- /es/agent/faq/network
- /es/agent/guide/network
further_reading:
- link: /getting_started/site
  tag: Documentación
  text: Más información sobre el sitio de Datadog
- link: /logs/
  tag: Documentación
  text: Recopilar logs
- link: /infrastructure/process
  tag: Documentación
  text: Recopilar procesos
- link: rastreo
  tag: Documentación
  text: Recopilar trazas (traces)
title: Tráfico de red
---

## Información general

<div class="alert alert-danger">
El Agent siempre inicia el tráfico hacia Datadog. Nunca se inician sesiones desde Datadog hacia el Agent.
</div>

Todo el tráfico del Agent se envía a través de SSL. El destino depende del sitio y servicio de Datadog. Para ver los destinos basados en tu [sitio de Datadog][11], haz clic en el selector `DATADOG SITE` de la derecha.

## Instalación

Añade los siguientes dominios a tu lista de inclusión para permitir la instalación del Agent:

- `install.datadoghq.com`
- `yum.datadoghq.com`
- `keys.datadoghq.com`
- `apt.datadoghq.com`

## Destinos

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}

[LLM Observabilty][23]
: `llmobs-intake.`{{< region-param key="dd_site" code="true" >}}

[Imágenes de contenedor][13]
: `contimage-intake.`{{< region-param key="dd_site" code="true" >}}

[Live Containers][3], [Live Process][4], [Monitorización de red en la nube][24], [Universal Service Monitoring][25]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Monitorización de dispositivos de red][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflow-intake.`{{< region-param key="dd_site" code="true" >}}

[Network Path][14]
: `netpath-intake.`{{< region-param key="dd_site" code="true" >}}

[Orquestador][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}<br>
`contlcycle-intake.`{{< region-param key="dd_site" code="true" >}}

[Generación de perfiles][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring (RUM)][6]
: {{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Localizaciones privadas de la monitorización Synthetic][8]
: Synthetics Worker v1.5.0 o posteriores: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} es el único endpoint que necesitas configurar.<br>
Resultados de la prueba de API para las versiones de Synthetics Worker superiores a la 0.1.6: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Resultados de la prueba del navegador para las versiones de Synthetics Worker superiores a la 0.2.0: `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Resultados de la prueba de API para las versiones de Synthetics Worker anteriores a la 0.1.5: `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1,ap2" %}}

[Configuración remota][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[Monitorización de base de datos][102]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[101]: /es/agent/remote_config
[102]: /es/database_monitoring/

{{% /site-region %}}

{{% site-region region="us" %}}
[Logs][200] y [logs de HIPAA][201]
: TCP: `agent-intake.logs.datadoghq.com`<br>
HTTP: `agent-http-intake.logs.datadoghq.com`<br>
Otros: consulta los [endpoints para logs][203]

[Logs heredados de HIPAA][201]
: `tcp-encrypted-intake.logs.datadoghq.com`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.com`<br>
`gcp-encrypted-intake.logs.datadoghq.com`<br>
`http-encrypted-intake.logs.datadoghq.com`

[200]: /es/logs/
[201]: /es/data_security/logs/#hipaa-enabled-customers
[203]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="eu" %}}
[Logs][200] y [logs de HIPAA][201]
: TCP: `agent-intake.logs.datadoghq.eu`<br>
HTTP: `agent-http-intake.logs.datadoghq.eu`<br>
Otros: consulta los [endpoints para logs][202]

[Logs heredados de HIPAA][201]
: `tcp-encrypted-intake.logs.datadoghq.eu`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.eu`<br>
`gcp-encrypted-intake.logs.datadoghq.eu`<br>
`http-encrypted-intake.logs.datadoghq.eu`

[200]: /es/logs/
[201]: /es/data_security/logs/#hipaa-enabled-customers
[202]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="us3" %}}
[Logs][200] y [logs de HIPAA][201]
: HTTP: `agent-http-intake.logs.us3.datadoghq.com`<br>
Otros: consulta los [endpoints para logs][202]

[Logs heredados de HIPAA][201]
: `lambda-tcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`http-encrypted-intake.logs.us3.datadoghq.com`

[200]: /es/logs/
[201]: /es/data_security/logs/#hipaa-enabled-customers
[202]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="us5" %}}
[Logs][200] y [logs de HIPAA][201]
: HTTP: `agent-http-intake.logs.us5.datadoghq.com`<br>
Otros: consulta los [endpoints para logs][202]

[Logs heredados de HIPAA][201]
: `lambda-tcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`http-encrypted-intake.logs.us5.datadoghq.com`

[200]: /es/logs/
[201]: /es/data_security/logs/#hipaa-enabled-customers
[202]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="ap1" %}}
[Logs][200] y [Logs de HIPAA][201]
: HTTP: `agent-http-intake.logs.ap1.datadoghq.com`<br>
Otros: Consulta [endpoints de logs][202]

[200]: /es/logs/
[201]: /es/data_security/logs/#hipaa-enabled-customers
[202]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="ap2" %}}
[Logs][200] y [Logs de HIPAA][201]
: HTTP: `agent-http-intake.logs.ap2.datadoghq.com`<br>
Otros: Consulta [endpoints de logs][202]

[200]: /es/logs/
[201]: /es/data_security/logs/#hipaa-enabled-customers
[202]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="gov" %}}
[Logs][200] y [logs de HIPAA][201]
: HTTP: `agent-http-intake.logs.ddog-gov.com`<br>
Otros: consulta los [endpoints para logs][202]

[Logs heredados de HIPAA][201]
: `lambda-tcp-encrypted-intake.logs.ddog-gov.com`<br>
`gcp-encrypted-intake.logs.ddog-gov.com`<br>
`http-encrypted-intake.logs.ddog-gov.com`

[200]: /es/logs/
[201]: /es/data_security/logs/#hipaa-enabled-customers
[202]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

[Métricas][26], [Checks de servicio][27], [Eventos][28] y otros metadatos del Agent
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
Por ejemplo, el Agent v7.31.0 informa a `7-31-0-app.agent.`{{< region-param key="dd_site" code="true" >}}. Debes añadir `*.agent.`{{< region-param key="dd_site" code="true" >}} a tu lista de inclusión en tu(s) firewall(s).<br>
Desde la versión 6.1.0, el Agent también consulta la API de Datadog para proporcionar funciones no críticas (por ejemplo, mostrar la validez de la clave de la API configurada):<br>
Agent v7.18.0 o 6.18.0 y posteriores: `api.`{{< region-param key="dd_site" code="true" >}}<br>
Agent < v7.18.0 o 6.18.0: `app.`{{< region-param key="dd_site" code="true" >}}

[Flare del Agent][12]
: `<VERSION>-flare.agent.`{{< region-param key="dd_site" code="true" >}}<br>
Por ejemplo, la versión 7.31.0 del Agent envía datos de flare a `7-31-0-flare.agent.`{{< region-param key="dd_site" code="true" >}}. Debes añadir `*.agent.`{{< region-param key="dd_site" code="true" >}} a la lista de inclusión en tus firewalls.<br>

### Direcciones IP estáticas

Todos estos dominios son registros **CNAME** que apuntan a un conjunto de direcciones IP estáticas. Puedes encontrar estas direcciones en `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

La información se estructura como JSON siguiendo este esquema:

{{< code-block lang="text" disable_copy="true" >}}
{
    "version": 1, // <-- se incrementa cada vez que se modifica esta información
    "modified": "YYYY-MM-DD-HH-MM-SS", // <-- fecha y hora de la última modificación
    "agents": { // <-- las IP utilizadas por el Agent para enviar métricas a Datadog
        "prefixes_ipv4": [ // <-- lista de bloques CIDR IPv4
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [ // <-- lista de bloques CIDR IPv6
            ...
        ]
    },
    "api": {...}, // <-- las IP utilizadas por el Agent para funciones no críticas (consulta de información desde la API).
    "apm": {...}, // <-- las IP utilizadas por el Agent para enviar datos de APM a Datadog
    "logs": {...}, // <-- las IP utilizadas por el Agent para enviar los logs a Datadog
    "process": {...}, // <-- las IP utilizadas por el Agent para enviar datos de proceso a Datadog
    "orchestrator": {...}, // <-- las IP utilizadas por el Agent para enviar datos del contenedor a Datadog
    "remote-configuration": {...}, // <-- las IP utilizadas por el Agent para recuperar su configuración dinámica
    "synthetics": {...}, // <-- las IP de source (fuente) utilizadas por los trabajadores de Synthetic (no utilizadas por el Agent)
    "synthetics-private-locations": {...}, // <-- las IP utilizadas por los trabajadores de Synthetics Private Locations para enviar datos a Datadog (no utilizadas por el Agent)
    "webhooks": {...}                      // <-- las IP de source (fuente) utilizadas por Datadog para conectarse a infraestructuras de terceros a través de HTTP (no utilizadas por el Agent)
}
{{< /code-block >}}

Cada sección tiene un endpoint específico. Por ejemplo:

- `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json` para las IPs utilizadas para recibir datos de logs a través de TCP.
- `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json` para las IPs utilizadas para recibir datos de APM.

### Inclusión

Añade todos los `ip-ranges` a tu lista de inclusión. Aunque solo un subconjunto esté activo en un momento dado, con el paso del tiempo se producen variaciones en el conjunto debido al funcionamiento y mantenimiento regulares de la red.

## Puertos abiertos

<div class="alert alert-danger">
Todo el tráfico saliente se envía a través de SSL por TCP o UDP.
<br><br>
Utiliza una regla de cortafuegos, o una restricción de red similar, para asegurarte de que el Agent solo es accesible para tus aplicaciones o fuentes de red de confianza. Si se accede a él desde una fuente no fiable, los agentes maliciosos pueden realizar diversas acciones invasivas, entre las que se incluyen escribir trazas y métricas en tu cuenta de Datadog u obtener información sobre tu configuración y servicios.
</div>

Abre los siguientes puertos para beneficiarte de todas las funcionalidades del **Agent**:

#### Salida

{{% site-region region="us" %}}

| Producto/Función | Puerto | Protocolo | Descripción |
| ------  | ---- | ------- | ----------- |
| Agent<br>APM<br>Contenedores<br>Procesos activos<br>Métricas<br>Monitorización de redes en la nube<br>Universal Service Monitoring | 443 | TCP | La mayoría de los datos del Agent utilizan el puerto 443. |
| [Autoescala personalizada del Agent][22] | 8443 | TCP |  |
| Recopilación de logs | 10516 | TCP | Registro a través de TCP. Consulta [endpoints de logs][21] para otros tipos de connection (conexión). |
| NTP | 123 | UDP | Protocolo de tiempo de red (NTP). Consulta [Destinos NTP predeterminados][20].<br>Para obtener información sobre la solución de problemas NTP, consulta [Problemas NTP][19]. |

[19]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /es/integrations/ntp/#overview
[21]: /es/logs/log_collection/#logging-endpoints
[22]: /es/containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="eu" %}}

| Producto/Función | Puerto | Protocolo | Descripción |
| ------  | ---- | ------- | ----------- |
| Agent<br>APM<br>Contenedores<br>Procesos activos<br>Métricas<br>Monitorización de redes en la nube<br>Universal Service Monitoring | 443 | TCP | La mayoría de los datos del Agent utilizan el puerto 443. |
| [Autoescala personalizada del Agent][22] | 8443 | TCP |  |
| Recopilación de logs | 443 | TCP | Registro a través de TCP. Consulta [endpoints de logs][21] para otros tipos de connection (conexión). |
| NTP | 123 | UDP | Protocolo de tiempo de red (NTP). Consulta [Destinos NTP predeterminados][20].<br>Para obtener información sobre la solución de problemas NTP, consulta [Problemas NTP][19]. |

[19]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /es/integrations/ntp/#overview
[21]: /es/logs/log_collection/#logging-endpoints
[22]: /es/containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="us3,us5,gov,ap1,ap2" %}}

| Producto/Función | Puerto | Protocolo | Descripción |
| ------  | ---- | ------- | ----------- |
| Agent<br>APM<br>Contenedores<br>Procesos activos<br>Métricas<br>Monitorización de redes en la nube<br>Universal Service Monitoring | 443 | TCP | La mayoría de los datos del Agent utilizan el puerto 443. |
| NTP | 123 | UDP | Protocolo de tiempo de red (NTP). Consulta [Destinos NTP predeterminados][20].<br>Para obtener información sobre la solución de problemas NTP, consulta [Problemas NTP][19]. |

[19]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /es/integrations/ntp/#overview

{{% /site-region %}}

#### Entrada

Solo se utiliza para los servicios del Agent que se comunican entre sí de manera local dentro del host.

| Producto/Función | Puerto | Protocolo | Descripción |
| ------  | ---- | ------- | ----------- |
| [GUI de navegador del Agent][16] | 5002 | TCP |  |
| Receptor de APM | 8126 | TCP | Incluye el rastreo y el generador de perfiles. |
| [DogStatsD][18] | 8125 | UDP | Puerto para DogStatsD a menos que `dogstatsd_non_local_traffic` esté configurado como true. Este puerto está disponible en IPv4 localhost: `127.0.0.1`. |
| servidor de go_expvar (APM) | 5012 | TCP | Para obtener más información, consulta [la documentación de integración de go_expar][15]. |
| servidor de integración de go_expvar | 5000 | TCP | Para obtener más información, consulta [la documentación de integración de go_expar][15]. |
| API DE LA IPC | 5001 | TCP | Puerto utilizado para la comunicación entre procesos (IPC). |
| Depuración del Agent del proceso | 6062 | TCP | Endpoints de depuración para el Agent del proceso. |
| Tiempo de ejecución del Agent del proceso | 6162 | TCP | Parámetros de configuración del tiempo de ejecución para el Agent del proceso. |

## Configurar puertos

Si necesitas cambiar un puerto de entrada, porque el puerto predeterminado ya lo utiliza un servicio existente en tu red, edita el archivo de configuración `datadog.yaml`. Puedes encontrar la mayoría de los puertos en la sección **Configuración avanzada** del archivo:

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param expvar_port - integer - optional - default: 5000
## @env DD_EXPVAR_PORT - integer - optional - default: 5000
## El puerto para el servidor go_expvar.
#
# expvar_port: 5000

## @param cmd_port - integer - optional - default: 5001
## @env DD_CMD_PORT - integer - optional - default: 5001
## El puerto en el que escucha la API IPC.
#
# cmd_port: 5001

## @param GUI_port - integer - optional
## @env DD_GUI_PORT - integer - optional
## El puerto al que sirve la GUI del navegador.
## El parámetro 'GUI_port: -1' desactiva completamente la GUI
## De forma predeterminada es:
##  * Windows y macOS : `5002`
##  * Linux: `-1`
##
#
# GUI_port: <GUI_PORT>

{{< /code-block >}}

El receptor de APM y los puertos DogStatsD se encuentran en las secciones **Trace Collection Configuration** (Configuración de la recopilación de trazas) y **DogStatsD Configuration** (Configuración de DogStatsD) en el archivo de configuración `datadog.yaml`, respectivamente:

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param dogstatsd_port - integer - optional - default: 8125
## @env DD_DOGSTATSD_PORT - integer - optional - default: 8125
## Anula el puerto DogStatsD del Agent.
## Nota: Asegúrate de que tu cliente realiza el envío al mismo puerto UDP.
#
# dogstatsd_port: 8125

[...]

## @param receiver_port - integer - optional - default: 8126
## @env DD_APM_RECEIVER_PORT - integer - optional - default: 8126
## El puerto en el que debe escuchar el receptor de trazas.
## Configurar con el valor 0 para desactivar el receptor HTTP.
#
# receiver_port: 8126
{{< /code-block >}}

<div class="alert alert-danger">Si modificas aquí el valor del puerto DogStatsD o del puerto del receptor de APM, también deberás cambiar la configuración de la librería de rastreo de APM para el puerto correspondiente. Consulta la información sobre cómo configurar puertos en los <a href="/tracing/trace_collection/library_config/">documentos de configuración de librerías disponibles en tu idioma</a>.</div>

## Utilizar proxies

Para obtener una guía de configuración detallada sobre la configuración del proxy, consulta la página: [Configuración del proxy del Agent][9].

## Almacenamiento de datos en búfer

Si la red deja de estar disponible, el Agent almacena las métricas en la memoria.
El uso máximo de la memoria para almacenar las métricas se define en el parámetro de configuración `forwarder_retry_queue_payloads_max_size`. Cuando se alcanza este límite, las métricas se eliminan.

La versión 7.27.0 (o posterior) del Agent almacena las métricas en disco cuando se alcanza el límite de la memoria. Habilita esta función al establecer `forwarder_storage_max_size_in_bytes` como un valor positivo que indique el tamaño máximo de espacio de almacenamiento, en bytes, que el Agent puede utilizar para almacenar las métricas en disco.

Las métricas se almacenan en la carpeta que define el parámetro `forwarder_storage_path`. Por defecto, en los sistemas Unix es`/opt/datadog-agent/run/transactions_to_retry` y en Windows `C:\ProgramData\Datadog\run\transactions_to_retry`.

Para evitar que se agote el espacio de almacenamiento, el Agent almacena las métricas en el disco sólo si el espacio de almacenamiento total utilizado es inferior al 80 %. Este límite se define mediante la configuración de `forwarder_storage_max_disk_ratio`.

## Instalación del Datadog Operator

Si estás instalando el Datadog Operator en un entorno Kubernetes con conectividad limitada, debes permitir los siguientes endpoints para el puerto TCP 443, en función de tu ubicación:

- `gcr.io/datadoghq` (GCR US)
- `eu.gcr.io/datadoghq` (IGC Europa)
- `asia.gcr.io/datadoghq` (IGC Asia)
- `datadoghq.azurecr.io` (Azure)
- `public.ecr.aws/datadog` (AWS)
- `docker.io/datadog` (DockerHub)


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/
[2]: /es/database_monitoring/
[3]: /es/infrastructure/livecontainers/
[4]: /es/infrastructure/process/
[5]: /es/infrastructure/containers/#kubernetes-orchestrator-explorer
[6]: /es/real_user_monitoring/
[7]: /es/profiler/
[8]: /es/synthetics/private_locations
[9]: /es/agent/configuration/proxy/
[10]: /es/network_monitoring/devices
[11]: /es/getting_started/site/
[12]: /es/agent/troubleshooting/send_a_flare
[13]: /es/infrastructure/containers/container_images
[14]: /es/network_monitoring/network_path/
[15]: /es/integrations/go_expvar/
[16]: /es/agent/basic_agent_usage/#gui
[17]: /es/tracing/
[18]: /es/developers/dogstatsd/
[19]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /es/integrations/ntp/#overview
[21]: /es/logs/log_collection/#logging-endpoints
[22]: /es/containers/guide/cluster_agent_autoscaling_metrics
[23]: /es/llm_observability/
[24]: /es/network_monitoring/cloud_network_monitoring/
[25]: /es/universal_service_monitoring/
[26]: /es/metrics/
[27]: /es/developers/service_checks/
[28]: /es/events/
