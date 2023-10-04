---
algolia:
  tags:
  - tráfico de red
aliases:
- /es/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
- /es/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
- /es/agent/network
- /es/agent/faq/network
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopilar tus logs
- link: /infrastructure/process
  tag: Documentación
  text: Recopilar tus procesos
- link: rastreo
  tag: Documentación
  text: Recopilar tus trazas
kind: guía
title: Tráfico de red
---

<div class="alert alert-warning">
El Agent siempre inicia el tráfico hacia Datadog. Nunca se inician sesiones desde Datadog hacia el Agent.
</div>

## Información general

Todo el tráfico del Agent se envía a través de SSL. El destino depende del servicio de Datadog y del sitio. Para ver los destinos basados en tu sitio, utiliza el selector `SITE` de la derecha.

## Destinos

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}

[Live Containers][3] y [Live process][4]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Monitorización de dispositivos de red][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflow-intake.`{{< region-param key="dd_site" code="true" >}}


[Orquestador][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}

 [Elaboración de perfiles][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring (RUM)][6]
: `rum.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}}<br>
`session-replay.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1" %}}
[Configuración remota][1]
: `config.`{{< region-param key="dd_site" code="true" >}}

[1]: /es/agent/remote_config
{{% /site-region %}}

[Localización privada de Synthetics][8]
: Worker v1.5.0 o superior `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} es el único endpoint a configurar.<br>
Resultados de los tests de API para worker a partir de la versión 0.1.6 `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Resultados de los tests de navegador para worker a partir de la versión 0.2.0 `intake-v2.synthetics.` {{< region-param key="dd_site" code="true" >}}<br>
Resultados de los tests de API para worker anterior a la versión 0.1.5 `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1" %}}
[Monitorización de bases de datos][2]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[2]: /es/database_monitoring/
{{% /site-region %}}

{{% site-region region="us" %}}
[Logs][1] y [logs HIPAA][2]
: TCP: `agent-intake.logs.datadoghq.com`<br>
HTTP: `agent-http-intake.logs.datadoghq.com`<br>
Otros: Consulta los [endpoints para los logs][3]

[Logs HIPAA legacy][2]
: `tcp-encrypted-intake.logs.datadoghq.com`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.com`<br>
`gcp-encrypted-intake.logs.datadoghq.com`<br>
`http-encrypted-intake.logs.datadoghq.com`

[1]: /es/logs/
[2]: /es/data_security/logs/#hipaa-enabled-customers
[3]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="eu" %}}
[Logs][1] y [logs HIPAA][2]
: TCP: `agent-intake.logs.datadoghq.eu`<br>
HTTP: `agent-http-intake.logs.datadoghq.eu`<br>
Otros: Consulta los [endpoints para los logs][3]

[Logs HIPAA legacy][2]
: `tcp-encrypted-intake.logs.datadoghq.eu`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.eu`<br>
`gcp-encrypted-intake.logs.datadoghq.eu`<br>
`http-encrypted-intake.logs.datadoghq.eu`

[1]: /es/logs/
[2]: /es/data_security/logs/#hipaa-enabled-customers
[3]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="us3" %}}
[Logs][1] y [logs HIPAA][2]
: HTTP: `agent-http-intake.logs.us3.datadoghq.com`<br>
Otros: Consulta los [endpoints para los logs][3]

[Logs HIPAA legacy][2]
: `lambda-tcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`http-encrypted-intake.logs.us3.datadoghq.com`

[1]: /es/logs/
[2]: /es/data_security/logs/#hipaa-enabled-customers
[3]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="us5" %}}
[Logs][1] y [logs HIPAA][2]
: HTTP: `agent-http-intake.logs.us5.datadoghq.com`<br>
Otros: Consulta los [endpoints para los logs][3]

[Logs HIPAA legacy][2]
: `lambda-tcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`http-encrypted-intake.logs.us5.datadoghq.com`

[1]: /es/logs/
[2]: /es/data_security/logs/#hipaa-enabled-customers
[3]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="ap1" %}}
[Logs][1] y [logs HIPAA][2]
: HTTP: `agent-http-intake.logs.ap1.datadoghq.com`<br>
Otros: Consulta los [endpoints para los logs][3]

[1]: /es/logs/
[2]: /es/data_security/logs/#hipaa-enabled-customers
[3]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="gov" %}}
[Logs][1] y [logs HIPAA][2]
: HTTP: `agent-http-intake.logs.ddog-gov.com`<br>
Otros: Consulta los [endpoints para los logs][3]

[Logs HIPAA legacy][2]
: `lambda-tcp-encrypted-intake.logs.ddog-gov.com`<br>
`gcp-encrypted-intake.logs.ddog-gov.com`<br>
`http-encrypted-intake.logs.ddog-gov.com`

[1]: /es/logs/
[2]: /es/data_security/logs/#hipaa-enabled-customers
[3]: /es/logs/log_collection/#logging-endpoints
{{% /site-region %}}

Cualquier otro dato del Agent
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
Por ejemplo, el Agent v7.31.0 informa a `7-31-0-app.agent.`{{< region-param key="dd_site" code="true" >}}. Por lo tanto, debes añadir `*.agent.`{{< region-param key="dd_site" code="true" >}} a tu lista de inclusión en tu(s) firewall(s).<br>
Desde la versión 6.1.0, el Agent también consulta la API de Datadog para proporcionar funcionalidades no críticas (por ejemplo, mostrar la validez de la clave de API configurada):<br>
**Agent >= 7.18.0/6.18.0** `api.`{{< region-param key="dd_site" code="true" >}}<br>
**Agent < 7.18.0/6.18.0** `app.`{{< region-param key="dd_site" code="true" >}}

Todos estos dominios son registros **CNAME** que apuntan a un conjunto de direcciones IP estáticas. Puedes encontrar estas direcciones en `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

La información se estructura como JSON siguiendo este esquema:

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
    "api": {...},                          // <-- same for non-critical Agent functionality (querying information from API)
    "apm": {...},                          // <-- same structure as "agents" but IPs used for the APM Agent data
    "logs": {...},                         // <-- same for the logs Agent data
    "process": {...},                      // <-- same for the process Agent data
    "orchestrator": {...},                 // <-- same for the process Agent data
    "synthetics": {...},                   // <-- not used for Agent traffic (Datadog source IPs of bots for synthetic tests)
    "synthetics-private-locations": {...}, // <-- not used for Agent traffic (Datadog intake IPs for synthetics private locations)
    "webhooks": {...}                      // <-- not used for Agent traffic (Datadog source IPs delivering webhooks)
}
{{< /code-block >}}

Cada sección tiene un endpoint específico. Por ejemplo:

- `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json` para las IPs utilizadas para recibir datos de logs a través de TCP.
- `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json` para las IPs utilizadas para recibir datos de APM.

### Inclusión

Añade todos los `ip-ranges` a tu lista de inclusión. Aunque solo un subconjunto esté activo en un momento dado, con el paso del tiempo se producen variaciones en el conjunto debido al funcionamiento y mantenimiento regulares de la red.

## Puertos abiertos

<div class="alert alert-warning">
Todo el tráfico saliente se envía a través de SSL por TCP / UDP.
<br><br>
Utiliza una regla de cortafuegos, o una restricción de red similar, para asegurarte de que el Agent solo es accesible para tus aplicaciones o fuentes de red de confianza. Si se accede a él desde una fuente no fiable, los agentes maliciosos pueden realizar diversas acciones invasivas, entre las que se incluyen escribir trazas y métricas en tu cuenta de Datadog u obtener información sobre tu configuración y servicios.
</div>

Abre los siguientes puertos para beneficiarte de todas las funcionalidades del **Agent**:
{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

#### Salida

{{% site-region region="us" %}}

443/tcp
: Puerto para la mayoría de los datos del Agent (Métricas, APM, Live Processes/Contenedores)

123/udp
: Puerto para el NTP ([consulta más información sobre la importancia del NTP])[1]).<br>
Consulta los [objetivos NTP predeterminados][2].

10516/tcp
: Puerto para recopilar logs a través de TCP.<br>
Consulta los [endpoints para los logs][3] para obtener información sobre otros tipos de conexión.

10255/tcp
: Puerto para [Kubelet HTTP de Kubernetes][4]

10250/tcp
: Puerto para [Kubelet HTTPs de Kubernetes][4]

[1]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /es/integrations/ntp/#overview
[3]: /es/logs/log_collection/#logging-endpoints
[4]: /es/agent/basic_agent_usage/kubernetes/

{{% /site-region %}}

{{% site-region region="eu" %}}

443/tcp
: Puerto para la mayoría de los datos del Agent (métricas, APM, Live Processes/contenedores)

123/udp
: Puerto para NTP ([más información sobre la importancia del NTP])[1]).<br>
Consulta los [objetivos del NTP predeterminados][2].

443/tcp
: Puerto para recopilar logs a través de TCP.<br>
Consulta los [endpoints para los logs][3] para obtener información sobre otros tipos de conexión.

10255/tcp
: Puerto para [Kubelet HTTP de Kubernetes][4]

10250/tcp
: Puerto para [Kubelet HTTPs de Kubernetes][4]

[1]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /es/integrations/ntp/#overview
[3]: /es/logs/log_collection/#logging-endpoints
[4]: /es/agent/basic_agent_usage/kubernetes/

{{% /site-region %}}

{{% site-region region="us3,us5,gov" %}}

443/tcp
: Puerto para la mayoría de los datos del Agent (métricas, APM, Live Processes/contenedores)

123/udp
: Puerto para NTP ([más información sobre la importancia del NTP])[1]).<br>
Consulta los [objetivos del NTP predeterminados][2].

10255/tcp
: Puerto para [Kubelet HTTP de Kubernetes][4]

10250/tcp
: Puerto para [Kubelet HTTPs de Kubernetes][4]

[1]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /es/integrations/ntp/#overview
[3]: /es/logs/log_collection/#logging-endpoints
[4]: /es/agent/basic_agent_usage/kubernetes/

{{% /site-region %}}

#### Entrada

Se utiliza únicamente para los servicios del Agent que se comunican entre sí localmente dentro del host.

5000/tcp
: Puerto para el [servidor go_expvar][1]

5001/tcp
: Puerto al que escucha la API IPC

5002/tcp
: Puerto para la [GUI del navegador del Agent][2]

5012/tcp
: Puerto para el [servidor go_expvar][1] de APM

6062/tcp
: Puerto para los endpoints de depuración del Agent de proceso.

6162/tcp
: Puerto para configurar los parámetros de tiempo de ejecución del Agent de proceso.

8125/udp
: Puerto para DogStatsD a menos que `dogstatsd_non_local_traffic` esté configurado como true. Este puerto está disponible en localhost: `127.0.0.1`, `::1`y `fe80::1`.

8126/tcp
: Puerto para el [receptor de APM][3]

[1]: /es/integrations/go_expvar/
[2]: /es/agent/basic_agent_usage/#gui
[3]: /es/tracing/
{{% /tab %}}
{{% tab "Agent v5 y v4" %}}

#### Salida

443/tcp
: Puerto para la mayoría de los datos del Agent (métricas, APM, Live Processes/contenedores)

123/udp
: Puerto para NTP ([más información sobre la importancia del NTP])[1]).<br>
Consulta los [objetivos del NTP predeterminados][2].

#### Entrada

6062/tcp
: Puerto para los endpoints de depuración del Agent de proceso.

6162/tcp
: Puerto para configurar los parámetros de tiempo de ejecución del Agent de proceso.

8125/udp
: Puerto para DogStatsD a menos que `dogstatsd_non_local_traffic` esté configurado como true. Este puerto está disponible en localhost: `127.0.0.1`, `::1`y `fe80::1`.

8126/tcp
: Puerto para el [receptor de APM][3]

17123/tcp
: Forwarder del Agent, utilizado para almacenar en el buffer el tráfico en caso de que se produzcan divisiones de red entre el Agent y Datadog.

17124/tcp
: Adaptador de grafito opcional

[1]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /es/integrations/ntp/#overview
[3]: /es/tracing/
{{% /tab %}}
{{< /tabs >}}

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

<div class="alert alert-warning">Si modificas aquí el valor del puerto DogStatsD o del puerto del receptor de APM, también deberás cambiar la configuración de la biblioteca de rastreo de APM para el puerto correspondiente. Consulta la información sobre cómo configurar puertos en los <a href="/tracing/trace_collection/library_config/">documentos de configuración de bibliotecas disponibles en tu idioma</a>.</div>

## Utilizar proxies

Para obtener una guía de configuración detallada sobre la configuración del proxy, consulta la página: [Configuración del proxy del Agent][9].

## Almacenamiento de datos en búfer

Si la red deja de estar disponible, el Agent almacena las métricas en la memoria.
El uso máximo de la memoria para almacenar las métricas se define en el parámetro de configuración `forwarder_retry_queue_payloads_max_size`. Cuando se alcanza este límite, las métricas se eliminan.

La versión 7.27.0 (o posterior) del Agent almacena las métricas en disco cuando se alcanza el límite de la memoria. Activa esta función configurando `forwarder_storage_max_size_in_bytes` como un valor positivo que indique el tamaño máximo de espacio de almacenamiento, en bytes, que el Agent puede utilizar para almacenar las métricas en disco.

Las métricas se almacenan en la carpeta definida por el parámetro `forwarder_storage_path`. Por defecto, en los sistemas Unix es`/opt/datadog-agent/run/transactions_to_retry` y en Windows, `C:\ProgramData\Datadog\run\transactions_to_retry`.

Para evitar quedarse sin espacio de almacenamiento, el Agent almacena las métricas en disco solo si el espacio de almacenamiento total utilizado es inferior al 95  por ciento. Este límite se define mediante el parámetro `forwarder_storage_max_disk_ratio`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/
[2]: /es/database_monitoring/
[3]: /es/infrastructure/livecontainers/
[4]: /es/infrastructure/process/
[5]: /es/infrastructure/livecontainers/#kubernetes-resources-1
[6]: /es/real_user_monitoring/
[7]: /es/profiler/
[8]: /es/synthetics/private_locations
[9]: /es/agent/proxy/
[10]: /es/network_monitoring/devices