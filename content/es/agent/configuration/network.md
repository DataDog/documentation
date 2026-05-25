---
algolia:
  tags:
  - network traffic
  - destinations
  - ports
  - data buffering
  - static IP addresses
aliases:
- /es/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
- /es/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
- /es/agent/network
- /es/agent/faq/network
- /es/agent/guide/network
further_reading:
- link: /getting_started/site
  tag: Documentación
  text: Aprenda sobre el sitio de Datadog
- link: /logs/
  tag: Documentación
  text: Recolecte sus registros
- link: /infrastructure/process
  tag: Documentación
  text: Recolecte sus procesos
- link: tracing
  tag: Documentación
  text: Recolecte sus trazas
title: Tráfico de red
---
## Resumen {#overview}

<div class="alert alert-danger">
El tráfico siempre es iniciado por el agente a Datadog. No se inician sesiones desde Datadog al agente.
</div>

Todo el tráfico del agente se envía a través de SSL. El destino depende del servicio y sitio de Datadog. Para ver destinos basados en su [sitio de Datadog][11], haga clic en el selector {{< ui >}}DATADOG SITE{{< /ui >}} a la derecha.

## Instalación {#installation}

Agregue los siguientes dominios a su lista de inclusión para permitir la instalación del Agente:

- `install.datadoghq.com`
- `yum.datadoghq.com`
- `keys.datadoghq.com`
- `apt.datadoghq.com`
- `windows-agent.datadoghq.com`

## Destinos {#destinations}
<div class="alert alert-warning">
A partir de la versión 7.67.0, el agente convierte los sitios de Datadog en nombres de dominio completamente calificados (agregando un punto al final del dominio) para reducir el número de consultas DNS.
Por ejemplo, envía cargas útiles de APM a <code>trace.agent.datadoghq.com.</code>.<br>
Este comportamiento se puede desactivar en la versión 7.72.0 y posteriores configurando <code>convert_dd_site_fqdn.enabled</code> a <code>false</code> en la configuración, o con la variable de entorno <code>DD_CONVERT_DD_SITE_FQDN_ENABLED=false</code>.
</div>

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}

[Observabilidad LLM][23]
: `llmobs-intake.`{{< region-param key="dd_site" code="true" >}}

[Imágenes de Contenedores][13]
: `contimage-intake.`{{< region-param key="dd_site" code="true" >}}

[Contenedores en Vivo][3], [Live Processes][4], [Cloud Network Monitoring][24], [Universal Service Monitoring][25]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Network Device Monitoring][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflow-intake.`{{< region-param key="dd_site" code="true" >}}

[Network Path][14]
: `netpath-intake.`{{< region-param key="dd_site" code="true" >}}<br>
En la versión 7.75+ del agente, Network Path contacta servicios externos a través de HTTPS para resolver la IP pública del host de origen. Esto es opcional y Network Path funciona sin ello, pero si su red restringe el tráfico saliente y desea la resolución de la IP pública de origen, agregue lo siguiente a su lista de inclusión: `icanhazip.com`, `ipinfo.io`, `checkip.amazonaws.com`, `api.ipify.org`, `whatismyip.akamai.com`. Consulte [Network Path Setup][33] para más detalles.

[Orchestrator][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}<br>
`contlcycle-intake.`{{< region-param key="dd_site" code="true" >}}

[Profiling][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring (RUM)][6]
: {{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Cloud Security Vulnerabilities][29]
: `sbom-intake.`{{< region-param key="dd_site" code="true" >}}

[Synthetic Monitoring Private Locations][8]
: Trabajador Sintético v1.5.0 o posterior: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} es el único punto de conexión que necesita configurar.<br>
Resultados de pruebas de API para el Trabajador Sintético > v0.1.6: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Resultados de pruebas de navegador para el Trabajador Sintético > v0.2.0: `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Resultados de pruebas de API para el Trabajador Sintético < v0.1.5: `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1,ap2" %}}

[Remote Configuration][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][102]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[101]: /es/remote_configuration
[102]: /es/database_monitoring/

{{% /site-region %}}

{{% logs-tcp-disclaimer %}}

[Logs][30] & [HIPAA Logs][31]
: (Obsoleto) TCP: {{< region-param key=tcp_endpoint code="true" >}}<br>
HTTP: {{< region-param key=agent_http_endpoint code="true" >}}<br>
Otro: Ver [logs endpoints][32]

[HIPAA Logs Legacy][31] (Deprecated, TCP not supported)
: {{< region-param key=hipaa_logs_legacy code="true" >}}

[Metrics][26], [Service Checks][27], [Events][28], y otros metadatos del Agente
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
Por ejemplo, el Agente v7.31.0 reporta a `7-31-0-app.agent.`{{< region-param key="dd_site" code="true" >}}. Debe agregar `*.agent.`{{< region-param key="dd_site" code="true" >}} a su lista de inclusión en su(s) firewall(s).<br>
Desde la versión 6.1.0, el Agente también consulta la API de Datadog para proporcionar funcionalidades no críticas (por ejemplo, mostrar la validez de la clave de API configurada):<br>
Agente v7.18.0 o 6.18.0 y versiones posteriores: `api.`{{< region-param key="dd_site" code="true" >}}<br>
Agente < v7.18.0 o 6.18.0: `app.`{{< region-param key="dd_site" code="true" >}}

[Agent flare][12]
: `<VERSION>-flare.agent.`{{< region-param key="dd_site" code="true" >}}<br>
Por ejemplo, el Agente v7.31.0 envía datos de Agent flare a `7-31-0-flare.agent.`{{< region-param key="dd_site" code="true" >}}. Debe agregar `*.agent.`{{< region-param key="dd_site" code="true" >}} a su lista de inclusión en su(s) firewall(s).<br>

### Direcciones IP estáticas {#static-ip-addresses}

Todos estos dominios son registros **CNAME** que apuntan a un conjunto de direcciones IP estáticas. Estas direcciones se pueden encontrar en `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

La información está estructurada como JSON siguiendo este esquema:

{{< code-block lang="text" disable_copy="true" >}}
{
    "version": 1,                          // <-- incremented every time this information is changed
    "modified": "YYYY-MM-DD-HH-MM-SS",     // <-- timestamp of the last modification
    "agents": {                            // <-- the IPs used by the Agent to submit metrics to Datadog
        "prefixes_ipv4": [                 // <-- list of IPv4 CIDR blocks
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [                 // <-- list of IPv6 CIDR blocks
            ...
        ]
    },
    "api": {...},                          // <-- the IPs used by the Agent for non-critical functionality (querying information from API)
    "apm": {...},                          // <-- the IPs used by the Agent to submit APM data to Datadog
    "logs": {...},                         // <-- the IPs used by the Agent to submit logs to Datadog
    "process": {...},                      // <-- the IPs used by the Agent to submit process data to Datadog
    "orchestrator": {...},                 // <-- the IPs used by the Agent to submit container data to Datadog
    "remote-configuration": {...},         // <-- the IPs used by the Agent to retrieve its dynamic configuration
    "synthetics": {...},                   // <-- the source IPs used by Synthetic workers (not used by the Agent)
    "synthetics-private-locations": {...}, // <-- the IPs used by Synthetics Private Locations workers to submit data to Datadog (not used by the Agent)
    "webhooks": {...}                      // <-- the source IPs used by Datadog to connect to 3rd party infrastructure over HTTP (not used by the Agent)
}
{{< /code-block >}}

Cada sección tiene un endpoint dedicado, por ejemplo:

- `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json` para las IPs utilizadas para recibir datos de registros a través de TCP.
- `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json` para las IPs utilizadas para recibir datos de APM.

### Inclusión {#inclusion}

Agregue todos los `ip-ranges` a su lista de inclusión. Aunque solo un subconjunto está activo en un momento dado, hay variaciones a lo largo del tiempo dentro de todo el conjunto debido a la operación y mantenimiento regular de la red.

## Puertos abiertos {#open-ports}

<div class="alert alert-danger">
Todo el tráfico saliente se envía a través de SSL mediante TCP o UDP.
<br><br>
Asegúrese de que el Agente solo sea accesible por sus aplicaciones o fuentes de red de confianza utilizando una regla de firewall o una restricción de red similar. El acceso no confiable puede permitir que actores maliciosos realicen varias acciones invasivas, incluyendo, pero no limitándose a, escribir trazas y métricas en su cuenta de Datadog, o obtener información sobre su configuración y servicios.
</div>

Abra los siguientes puertos para beneficiarse de todas las funcionalidades del **Agente**:

#### Saliente {#outbound}

{{% site-region region="us,eu" %}}

| Producto/Funcionalidad                                                                                                                                                    | Puerto                                           | Protocolo         | Descripción                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agente<br>APM<br>Contenedores<br>Live Processes<br>[Metrics]<br>Cloud Network Monitoring<br>Universal Service Monitoring| 443| TCP| La mayoría de los datos del Agente utilizan el puerto 443.|
| [Custom Agent Autoscaling][22]| 8443| TCP|                                                                                                                                                                                             |
| Recolección de registros                                                                                                                                                           | {{< region-param key=web_integrations_port >}} | (Obsoleto) TCP | Registro a través de TCP. <br>**Nota**: La recolección de registros por TCP **no está soportada**. Datadog **no proporciona garantías de entrega o confiabilidad** al usar TCP, y los datos de registro pueden perderse sin previo aviso. Para una ingestión confiable, utilice el punto de conexión HTTP, un Agente oficial de Datadog o una integración de reenvío en su lugar. Para otros tipos de conexión, consulte [logs endpoints][21]. |
| NTP                                                                                                                                                                      | 123                                            | UDP              | Network Time Protocol (NTP). Consulte [objetivos NTP predeterminados][20].<br>Para información sobre la solución de problemas de NTP, consulte [problemas de NTP][19].                                                                |

[19]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /es/integrations/ntp/#overview
[21]: /es/logs/log_collection/#logging-endpoints
[22]: /es/containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="us3,us5,gov,gov2,ap1,ap2" %}}

| Producto/Funcionalidad                                                                                               | Puerto | Protocolo | Descripción                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------- | ---- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Agente<br>APM<br>Contenedores<br>Live Processes<br>[Metrics]<br>Cloud Network Monitoring<br>Universal Service Monitoring| 443| TCP| La mayoría de los datos del Agente utilizan el puerto 443.|
| NTP                                                                                                                 | 123  | UDP      | Network Time Protocol (NTP). Vea [objetivos NTP predeterminados][20].<br>Para información sobre la solución de problemas de NTP, consulte [problemas de NTP][19]. |

[19]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /es/integrations/ntp/#overview

{{% /site-region %}}

#### Entrante {#inbound}

Utilizado para servicios del Agent que se comunican entre sí localmente dentro del servidor solamente.

| Producto/Funcionalidad        | Puerto | Protocolo | Descripción                                                                                                                    |
| ---------------------------- | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Interfaz gráfica del navegador del Agent][16]      | 5002 | TCP      |                                                                                                                                |
| Receptor APM                 | 8126 | TCP      | Incluye traza y el Perfilador.                                                                                             |
| [DogStatsD][18]              | 8125 | UDP      | Puerto para DogStatsD a menos que `dogstatsd_non_local_traffic` esté configurado como verdadero. Este puerto está disponible en localhost IPv4: `127.0.0.1`. |
| servidor go_expvar (APM)       | 5012 | TCP      | Para más información, consulte [la documentación de integración de go_expar][15].                                                        |
| servidor de integración go_expvar | 5000 | TCP      | Para más información, consulte [la documentación de integración de go_expar][15].                                                        |
| API IPC                      | 5001 | TCP      | Puerto utilizado para la Comunicación entre Procesos (IPC).                                                                               |
| Depuración del Agent de Proceso          | 6062 | TCP      | Puntos de conexión de depuración para el Agent de Proceso.                                                                                         |
| Tiempo de ejecución del Agent de Proceso        | 6162 | TCP      | Configuraciones de tiempo de ejecución para el Agent de Proceso.                                                                          |

## Configurar puertos {#configure-ports}

Si necesita cambiar un puerto de entrada porque el puerto predeterminado ya está en uso por un servicio existente en su red, edite el archivo de configuración `datadog.yaml`. Puede encontrar la mayoría de los puertos en la sección **Configuración Avanzada** del archivo:

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param expvar_port - integer - optional - default: 5000
## @env DD_EXPVAR_PORT - integer - optional - default: 5000
## The port for the go_expvar server.
#
# expvar_port: 5000

## @param cmd_port - integer - optional - default: 5001
## @env DD_CMD_PORT - integer - optional - default: 5001
## The port on which the IPC api listens.
#
# cmd_port: 5001

## @param GUI_port - integer - optional
## @env DD_GUI_PORT - integer - optional
## The port for the browser GUI to be served.
## Setting 'GUI_port: -1' turns off the GUI completely
## Default is:
##  * Windows & macOS : `5002`
##  * Linux: `-1`
##
#
# GUI_port: <GUI_PORT>

{{< /code-block >}}

El receptor APM y los puertos de DogStatsD se encuentran en las secciones **Configuración de Recolección de Trazas** y **Configuración de DogStatsD** del archivo de configuración `datadog.yaml`, respectivamente:

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param dogstatsd_port - integer - optional - default: 8125
## @env DD_DOGSTATSD_PORT - integer - optional - default: 8125
## Override the Agent DogStatsD port.
## Note: Make sure your client is sending to the same UDP port.
#
# dogstatsd_port: 8125

[...]

## @param receiver_port - integer - optional - default: 8126
## @env DD_APM_RECEIVER_PORT - integer - optional - default: 8126
## The port that the trace receiver should listen on.
## Set to 0 to disable the HTTP receiver.
#
# receiver_port: 8126
{{< /code-block >}}

<div class="alert alert-danger">Si cambia el valor del puerto de DogStatsD o del puerto del receptor APM aquí, también debe cambiar la configuración del SDK de Datadog para el puerto correspondiente. Consulte la información sobre la configuración de puertos en la <a href="/tracing/trace_collection/library_config/">documentación de Configuración de la Biblioteca para su lenguaje</a>.</div>

## Usando proxies {#using-proxies}

Para una guía de configuración detallada sobre la configuración de proxies, consulte [Agent Proxy Configuration][9].

## Almacenamiento de datos {#data-buffering}

Si la red se vuelve no disponible, el Agent almacena las métricas en memoria.
El uso máximo de memoria para almacenar las métricas está definido por la configuración `forwarder_retry_queue_payloads_max_size`. Cuando se alcanza este límite, las métricas se descartan.

El Agent v7.27.0 o posterior almacena las métricas en disco cuando se alcanza el límite de memoria. Habilite esta capacidad configurando `forwarder_storage_max_size_in_bytes` a un valor positivo que indique la cantidad máxima de espacio de almacenamiento, en bytes, que el Agent puede usar para almacenar las métricas en disco.

Las métricas se almacenan en la carpeta definida por la configuración `forwarder_storage_path`, que por defecto es `/opt/datadog-agent/run/transactions_to_retry` en sistemas Unix, y `C:\ProgramData\Datadog\run\transactions_to_retry` en Windows.

Para evitar quedarse sin espacio de almacenamiento, el Agent almacena las métricas en disco solo si el espacio total de almacenamiento utilizado es inferior al 80 por ciento. Este límite está definido por la configuración `forwarder_storage_max_disk_ratio`.

## Instalando el Datadog Operator {#installing-the-datadog-operator}

Si está instalando el Datadog Operator en un entorno de Kubernetes con conectividad limitada, necesita permitir los siguientes puntos de conexión para el puerto TCP 443, según su registro:

- `registry.datadoghq.com` (Datadog Container Registry)
  - `us-docker.pkg.dev/datadog-prod/public-images` (puede recibir redirecciones de `registry.datadoghq.com`)
- `gcr.io/datadoghq` (GCR EE. UU.)
- `eu.gcr.io/datadoghq` (GCR Europa)
- `asia.gcr.io/datadoghq` (GCR Asia)
- `datadoghq.azurecr.io` (Azure)
- `public.ecr.aws/datadog` (AWS)
- `docker.io/datadog` (DockerHub)


## Lectura adicional {#further-reading}

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
[18]: /es/extend/dogstatsd/
[19]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /es/integrations/ntp/#overview
[21]: /es/logs/log_collection/#logging-endpoints
[22]: /es/containers/guide/cluster_agent_autoscaling_metrics
[23]: /es/llm_observability/
[24]: /es/network_monitoring/cloud_network_monitoring/
[25]: /es/universal_service_monitoring/
[26]: /es/metrics/
[27]: /es/extend/service_checks/
[28]: /es/events/
[29]: /es/security/cloud_security_management/vulnerabilities/
[30]: /es/logs/
[31]: /es/data_security/logs/#hipaa-enabled-customers
[32]: /es/logs/log_collection/#logging-endpoints
[33]: /es/network_monitoring/network_path/setup/#source-public-ip-resolution