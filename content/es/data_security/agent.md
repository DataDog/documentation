---
aliases:
- /es/agent/security/
description: Medidas de seguridad del Datadog Agent
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revisar las principales categorías de datos enviados a Datadog
title: Seguridad de los datos en el Agent
---

<div class="alert alert-info">En esta página hablamos sobre la seguridad de los datos que se envían a Datadog. Si estás buscando productos y funciones para proteger las aplicaciones y las soluciones en la nube, consulta la sección <a href="/security/" target="_blank">Seguridad</a>.</div>

Es posible enviar datos al servicio Datadog utilizando un [Agent][1] instalado localmente o a través de nuestra [API HTTP][2]. Aunque para utilizar Datadog no es estrictamente necesario utilizar el Datadog Agent, la gran mayoría de los clientes aprovechan esta posibilidad. Este artículo describe las principales funciones y características de seguridad disponibles para garantizar la seguridad de tu entorno.

## Distribución del Agent

Los repositorios oficiales y los paquetes binarios del Agent están firmados. Para verificar el canal de distribución, comprueba la firma con una de las siguientes claves públicas:

- Paquetes DEB de Linux y metadatos del repositorio:
  - [D18886567EABAD8B2D2526900D826EB906462314][18]
  - [5F1E256061D813B125E156E8E6266D4AC0962C7D][15]
  - [D75CEA17048B9ACBF186794B32637D44F14F620E][4]
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE][3]
- Paquetes RPM de Linux y metadatos del repositorio:
  - [2416A37757B1BB0268B3634B52AFC5994F09D16B][17]
  - [7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3][16]
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915][5]
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3][6]
- MacOS PKG:
  - Huella digital del certificado de Apple `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

En Debian y Ubuntu, el paquete `datadog-agent` tiene una dependencia relativa del paquete de `datadog-signing-keys`, lo que hace que las claves anteriores sean de confianza para APT. Al mantener el paquete actualizado, te aseguras de que las últimas claves de firma están presentes en tu sistema.

### Windows MSI

Para verificar la firma de un archivo de instalación del Datadog Agent en Windows, canaliza la salida de `Get-AuthenticodeSignature` a través de `FormatList` (`fl`) y asegúrate de que:
- el estado es válido
- el certificado está firmado por `Datadog, Inc`
- el emisor es `DigiCert`

Por ejemplo, para verificar un archivo .msi denominado `ddagent-cli-7.49.1.msi`:
{{< code-block lang="powershell" >}}
Get-AuthenticodeSignature ddagent-cli-7.49.1.msi | fl
{{< /code-block >}}

Si la salida del comando es `A certificate chain could not be built to a trusted root authority`, la máquina puede necesitar una actualización de la CA raíz de DigiCert.

## Seguridad de la información

El Datadog Agent envía datos a Datadog a través de una conexión TCP cifrada TLS por defecto. A partir de la versión 6, el Agent puede configurarse para imponer una versión mínima de TLS al conectarse a Datadog. Si necesitas utilizar una criptografía sólida (p. ej., para cumplir con los requisitos PCI), debes utilizar el Agent v6 o v7 y establecer el parámetro `min_tls_version: 'tlsv1.2'` o `force_tls_12: true` para el Agent v6.39.0/v7.39.0 o versiones anteriores, en el archivo de configuración del Agent.

## Redes y proxy

Datadog es un producto SaaS: para enviar datos de monitorización es necesario establecer una conexión saliente desde tu red a la Internet pública. El Agent siempre inicia el tráfico a Datadog desde una conexión TCP cifrada TLS por defecto. Nunca se inician sesiones desde Datadog hacia el Agent. Para obtener más información sobre la configuración de cortafuegos para permitir la lista de dominios y puertos de Datadog necesarios, consulta la página [Red][7] del Agent. Además, si quieres monitorizar hosts sin una conexión directa a la Internet pública o con tráfico saliente restringido considera la posibilidad de enviar datos de monitorización desde un [proxy][8].

## Enmascarar logs del Agent

El Datadog Agent genera logs locales para facilitar la [resolución de problemas del Agent][9], si es necesario. Como medida de seguridad, estos logs locales se filtran en busca de algunas palabras clave y patrones específicos que podrían indicar una posible credencial (por ejemplo, clave de API, contraseña y palabras clave de token), que luego se enmascaran antes de escribirse en el disco.

## Servidor HTTPS local

El Agent v6 y v7 exponen una API HTTPS local para facilitar la comunicación entre un Agent en ejecución y las herramientas del Agent (por ejemplo, los comandos `datadog-agent`). Sólo se puede acceder al servidor de API desde la interfaz de red local (`localhost/127.0.0.1`) y la autenticación se realiza mediante un token que sólo puede leer el usuario con el que se ejecuta el Agent. La comunicación con la API HTTPS local está cifrada durante el transporte para protegerla de posibles interceptaciones en `localhost`.

## GUI del Agent

El Agent v6 y v7 viene con una interfaz gráfica de usuario (GUI) por defecto que se inicia en tu navegador web predeterminado. La GUI sólo se inicia si el usuario que la ejecuta tiene los permisos de usuario adecuados, incluyendo la capacidad de abrir el archivo de configuración del Agent. Sólo se puede acceder a la GUI desde la interfaz de red local (`localhost/127.0.0.1`). Además, las cookies del usuario deben estar habilitadas, ya que la GUI genera y guarda un token que se utiliza para autenticar todas las comunicaciones con el servidor de la GUI, así como para proteger contra ataques de falsificación de petición en sitios cruzados (CSRF). Si es necesario, también es posible desactivar por completo la GUI.

## Análisis de seguridad del Agent

El programa de gestión de vulnerabilidades de Datadog incluye evaluaciones periódicas de los componentes de soporte de infraestructura y de aplicaciones, incluyendo análisis activos de los servicios de soporte centrales. Los equipos de seguridad de Datadog realizan análisis periódicos para identificar vulnerabilidades de configuración y del software, y realizan un seguimiento de la corrección de los hallazgos de acuerdo con la política de gestión de vulnerabilidades de Datadog.

En lo que respecta específicamente a su Container Agent, Datadog realiza análisis estáticos periódicos de vulnerabilidades, tanto en sus versiones de disponibilidad general (GA) como en las versiones candidatas (RC). El Datadog Container Agent puede encontrarse en registros públicos, como se menciona en [Docker Agent][10], y además, el código fuente del Agent es de código abierto. Esto permite a los clientes realizar análisis de vulnerabilidades con sus herramientas preferidas a un ritmo que satisfaga sus necesidades únicas. Esto proporciona la visibilidad que requieren los clientes que acostumbran monitorizar el Agent en busca de vulnerabilidades potenciales.

Si crees que detectaste un error en la seguridad de Datadog, consulta [Informar de un problema][11]. Para enviar una consulta acerca de la vulnerabilidad de un producto específico como cliente existente, ponte en contacto con el [servicio de asistencia de Datadog][12] a través de tu proceso de asistencia estándar. Si envías un ticket de asistencia a través del sitio web de Datadog, configura el campo `Product type` como `Vulnerability Inquiry on Datadog Product`.

## Ejecución como usuario sin privilegios

Por defecto, el Agent se ejecuta como el usuario `dd-agent` en Linux y como la cuenta `ddagentuser` en [Windows][13]. Las excepciones son las siguientes:

- El `system-probe` se ejecuta como `root` en Linux y como `LOCAL_SYSTEM` en Windows.
- El `process-agent` se ejecuta como `LOCAL_SYSTEM` en Windows.
- El `security-agent` se ejecuta como `root` en Linux.

## Gestión de secretos

Si quieres evitar el almacenamiento de secretos en texto plano en los archivos de configuración del Agent, puedes aprovechar el paquete de [gestión de secretos][14]. Este paquete permite al Agent llamar a un ejecutable proporcionado por el usuario para gestionar la recuperación o descifrado de secretos, que luego son cargados en la memoria por el Agent. Puedes diseñar tu ejecutable de acuerdo con tu servicio de gestión de claves, tu método de autenticación y tu flujo de trabajo de integración continua preferidos.

Para obtener más información, consulta la documentación [Gestión de secretos][14].

## Recopilación de telemetría

{{< site-region region="gov" >}}

El Agent en sitios no gubernamentales recopila información del entorno, de rendimiento y de uso de funciones sobre el Datadog Agent. Cuando el Agent detecta un sitio gubernamental, o se utiliza el [proxy FIPS del Datadog Agent][1], el Agent desactiva automáticamente esta recopilación de telemetría. Cuando dicha detección es imposible (por ejemplo, si se está utilizando un proxy), se emite telemetría del Agent, pero se abandona inmediatamente en la entrada de Datadog.

Para evitar que se emitan estos datos en primer lugar, Datadog recomienda desactivar explícitamente la telemetría del Agent actualizando la configuración de `agent_telemetry` en el archivo de configuración del Agent, como se muestra en el siguiente ejemplo.

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "Variables de entorno" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}
[1]: https://docs.datadoghq.com/es/agent/configuration/fips-compliance?tab=hostorvm&site=gov
{{< /site-region >}}
{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Datadog puede recopilar información del entorno, del rendimiento y del uso de funciones del Datadog Agent. Esta puede incluir logs de diagnóstico y volcados de memoria del Datadog Agent con trazas (traces) de stack tecnológico ofuscadas para respaldar y seguir mejorando el Datadog Agent.

Puedes desactivar la recopilación de telemetría actualizando el parámetro `agent_telemetry` en el archivo de configuración del Agent, como se muestra en el siguiente ejemplo.
{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "Variables de entorno" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}

**Contenido de telemetría:**

Para ver el contenido de telemetría más reciente, ejecuta el siguiente comando:
```bash
agent diagnose show-metadata agent-telemetry
```

| Metadatos ([fuente][1]) |
| ---------------------- |
| Identificador de la máquina             |
| Nombre de la máquina           |
| Sistema operativo                     |
| Versión del sistema operativo             |
| Agent version          |

| Métricas ([fuente][2])                       | Descripción                                                                                                            |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Checks**                                  |                                                                                                                        |
| checks.execution_time                       | Tiempo de ejecución del check en milisegundos                                                                                 |
| pymem.inuse                                 | Número de bytes asignados por el intérprete de Python                                                                     |
| **Logs y métricas**                        |                                                                                                                        |
| dogstatsd.udp_packets_bytes                 | Bytes de paquetes UDP DogStatsD                                                                                            |
| dogstatsd.uds_packets_bytes                 | Bytes de paquetes UDS DogStatsD                                                                                            |
| logs.auto_multi_line_aggregator_flush       | Número de logs multilínea agregados por el Agent                                                                       |
| logs.bytes_missed                           | Número total de bytes perdidos antes de que pudieran ser consumidos por el Agent, por ejemplo, tras la rotación de logs                 |
| logs.bytes_sent                             | Número total de bytes enviados antes de la codificación, si corresponde                                                              |
| logs.decoded                                | Número total de logs decodificados                                                                                           |
| logs.dropped                                | Número total de logs abandonados                                                                                           |
| logs.encoded_bytes_sent                     | Número total de bytes enviados tras la codificación, si corresponde                                                               |
| logs.sender_latency                         | Latencia del remitente HTTP en milisegundos                                                                                    |
| logs.truncated                              | Número total de logs truncados por el Agent                                                                            |
| point.dropped                               | Número total de métricas abandonadas                                                                                        |
| point.sent                                  | Número total de métricas enviadas                                                                                           |
| transactions.input_count                    | Recuento de transacciones entrantes                                                                                             |
| transactions.requeued                       | Recuento de nuevas colocaciones en colas de transacciones                                                                                              |
| transactions.retries                        | Recuento de reintentos de transacciones                                                                                                |
| **Base de datos**                                |                                                                                                                        |
| oracle.activity_samples_count               | Número de filas obtenidas en la medición de la actividad de consulta (Número de muestras de actividad recopiladas)                              |
| oracle.activity_latency                     | Tiempo para recuperar la actividad de consulta en milisegundos                                                                        |
| oracle.statement_metrics                    | Tiempo para recuperar métricas de bases de datos en milisegundos                                                                      |
| oracle.statement_plan_errors                | Número de errores en la recuperación de planes de ejecución                                                                         |
| postgres.collect_activity_snapshot_ms       | Tiempo para obtener snapshots de actividad en milisegundos                                                                          |
| postgres.collect_relations_autodiscovery_ms | Tiempo para recuperar relaciones de Autodiscovery en milisegundos                                                               |
| postgres.collect_statement_samples_ms       | Tiempo para obtener muestras de sentencias en milisegundos                                                                          |
| postgres.collect_statement_samples_count    | Total de filas obtenidas para recopilar muestras de sentencias                                                                        |
| postgres.collect_stat_autodiscovery_ms      | Tiempo para recopilar estadísticas de Autodiscovery en milisegundos                                                                    |
| postgres.get_new_pg_stat_activity_ms        | Tiempo para obtener `pg_stat_activity` en milisegundos                                                                         |
| postgres.get_new_pg_stat_activity_count     | Total de filas obtenidas para la recopilación `pg_stat_activity`                                                                       |
| postgres.get_active_connections_ms          | Tiempo para obtener conexiones activas en milisegundos                                                                         |
| postgres.get_active_connections_count       | Total de filas obtenidas para ver las conexiones activas                                                                           |
| postgres.schema_tables_elapsed_ms           | Hora de recopilar tablas en el esquema Postgres                                                                              |
| postgres.schema_tables_count                | Total de tablas en el esquema Postgres                                                                                        |
| **API**                                     |                                                                                                                        |
| api_server.request_duration_seconds         | Rendimiento de la ejecución de comandos CLI (si se ejecutan)                                                                       |
| **Eventos**                                  |                                                                                                                        |
| agent_bsod                                  | Blue Screen of Death (BSOD) relacionado con el Agent, incluido el código BugCheck, cuatro argumentos asociados y el stack tecnológico de llamadas sin simbolizar del fallo |
| **Detección de servicios**                       |                                                                                                                        |
| service_discovery.discovered_services       | Número de servicios detectados por la función de detección de servicios del Agent                                                   |
| **Monitorización de la GPU**                          |                                                                                                                        |
| gpu.device_total                            | Número total de GPUs del sistema                                                                                     |

Sólo se emiten los métricas aplicables. Por ejemplo, si DBM no está activado, no se emite ninguna métrica relacionada con una base de datos.


[1]: https://github.com/DataDog/datadog-agent/blob/4dc6ed6eb069bdea7e93f2d267ac5086a98c968c/comp/core/agenttelemetry/impl/sender.go#L218-L221
[2]: https://github.com/DataDog/datadog-agent/blob/4dc6ed6eb069bdea7e93f2d267ac5086a98c968c/comp/core/agenttelemetry/impl/config.go#L156

{{< /site-region >}}

### Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: /es/api/
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[7]: /es/agent/faq/network/
[8]: /es/agent/configuration/proxy/
[9]: /es/agent/troubleshooting/
[10]: /es/containers/docker/?tab=standard
[11]: https://www.datadoghq.com/security/?tab=contact
[12]: https://www.datadoghq.com/support/
[13]: /es/agent/faq/windows-agent-ddagent-user/
[14]: /es/agent/configuration/secrets-management/
[15]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[16]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
[17]: https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
[18]: https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public