---
aliases:
- /es/agent/security/
description: Medidas de seguridad del Datadog Agent
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revise las categorías principales de datos enviados a Datadog
title: Seguridad de los datos del Agent
---
<div class="alert alert-info">Esta página trata sobre la seguridad de los datos enviados a Datadog. Si busca productos y funciones de seguridad de la nube y de aplicaciones, consulte la sección <a href="/security/" target="_blank">Security</a>.</div>

Puede enviar datos al servicio de Datadog mediante un [Agent][1] instalado localmente o a través de nuestra [HTTP API][2]. Aunque el uso de Datadog no requiere estrictamente el uso del Datadog Agent, la gran mayoría de los clientes aprovechan el Agent. Este artículo describe las principales capacidades y funciones de seguridad disponibles para garantizar que su entorno sea seguro.

## Distribución del Agent {#agent-distribution}

Los repositorios oficiales y los paquetes binarios del Agent están firmados. Verifique el canal de distribución comprobando la firma con una de las siguientes claves públicas:

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
- PKG de MacOS:
  - Huella digital del certificado de Apple `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

En Debian y Ubuntu, el paquete `datadog-agent` tiene una dependencia opcional del paquete `datadog-signing-keys`, lo que hace que las claves anteriores sean confiables para APT. Mantener el paquete actualizado garantiza que las claves de firma más recientes estén presentes en su sistema.

### MSI de Windows {#windows-msi}

Para verificar la firma de un archivo instalador del Datadog Agent en Windows, dirija la salida de `Get-AuthenticodeSignature` a través de `FormatList` (`fl`) y asegúrese de que:
- el estado sea válido
- el certificado esté firmado por `Datadog, Inc`
- el emisor sea `DigiCert`

Por ejemplo, para verificar un archivo .msi llamado `ddagent-cli-7.49.1.msi`:
{{< code-block lang="powershell" >}}
Get-AuthenticodeSignature ddagent-cli-7.49.1.msi | fl
{{< /code-block >}}

Si la salida del comando es `A certificate chain could not be built to a trusted root authority`, es posible que la máquina necesite una actualización de la CA raíz de DigiCert.

## Seguridad de la información {#information-security}

El Datadog Agent envía datos a Datadog a través de una conexión TCP cifrada con TLS de forma predeterminada. A partir de la versión 6, el Agent puede configurarse para aplicar una versión mínima de TLS al conectarse a Datadog. Si requiere el uso de criptografía fuerte, por ejemplo, para cumplir con los requisitos de PCI, debe usar el Agent v6/7 y establecer la configuración `min_tls_version: 'tlsv1.2'`, o `force_tls_12: true` para el Agent < 6.39.0/7.39.0, en el archivo de configuración del Agent.

## Redes y proxy {#networking-and-proxying}

Datadog es un producto SaaS: necesita establecer una conexión saliente desde su red a la internet pública para enviar datos de monitoreo. El tráfico siempre es iniciado por el Agent hacia Datadog desde una conexión TCP cifrada con TLS de forma predeterminada. Nunca se inician sesiones desde Datadog hacia el Agent. Consulte la página [Network][7] del Agent para obtener más información sobre cómo configurar firewalls para incluir en la lista de permitidos los dominios y puertos de Datadog requeridos. Además, si desea hacer un seguimiento de hosts sin conectividad directa a la internet pública, o con tráfico saliente restringido, considere enviar datos de seguimiento desde un [proxy][8].

## Ofuscación de registros del Agent {#agent-logs-obfuscation}

El Datadog Agent genera registros locales para respaldar la [solución de problemas del Agent][9] según sea necesario. Como medida de precaución de seguridad, estos registros locales se filtran para detectar palabras clave y patrones específicos que podrían indicar la presencia de una credencial potencial (por ejemplo, clave de API, contraseña y token), las cuales luego se ofuscan antes de escribirse en el disco.

## Servidor HTTPS local {#local-https-server}

El Agent v6/7 expone una API HTTPS local para facilitar la comunicación entre un Agent en ejecución y las herramientas del Agent (por ejemplo, los comandos `datadog-agent`). El servidor de la API solo puede ser accedido desde la interfaz de red local (`localhost/127.0.0.1`), y la autenticación se aplica a través de un token que solo puede ser leído por el usuario con el que se ejecuta el Agent. La comunicación con la API HTTPS local está cifrada en el transporte para proteger contra la interceptación en `localhost`.

## GUI del Agent {#agent-gui}

El Agent v6/7 viene incluido con una Interfaz Gráfica de Usuario (GUI) de forma predeterminada, la cual se inicia en su navegador web predeterminado. La GUI se inicia solo si el usuario que la inicia tiene los permisos de usuario correctos, incluida la capacidad de abrir el archivo de configuración del Agent. La GUI solo puede ser accedida desde la interfaz de red local (`localhost/127.0.0.1`). Finalmente, las cookies del usuario deben estar habilitadas, ya que la GUI genera y guarda un token utilizado para autenticar todas las comunicaciones con el servidor de la GUI, además de proteger contra ataques de Falsificación de Petición en Sitios Cruzados (CSRF). La GUI también puede desactivarse por completo si es necesario.

## Escaneos de seguridad del Agent {#agent-security-scans}

El programa de Vulnerability Management de Datadog incluye evaluaciones periódicas de la infraestructura de soporte y los componentes de la aplicación, incluidos escaneos activos de los servicios de soporte principales. Los equipos de Datadog Security realizan escaneos periódicos para identificar vulnerabilidades de configuración y software, y realizan un seguimiento de la corrección de los hallazgos de acuerdo con la política de Vulnerability Management de Datadog.

Con respecto a su Container Agent específicamente, Datadog realiza análisis estáticos de vulnerabilidad periódicos tanto en sus versiones de disponibilidad general (GA) como en las versiones candidatas (RC). El Datadog Container Agent se puede encontrar en registros públicos como se menciona en [Docker Agent][10], y además, el código fuente del Datadog Agent es de código abierto. Esto permite a los clientes realizar escaneos de vulnerabilidades con sus herramientas preferidas según una cadencia que satisfaga sus necesidades únicas. Esto proporciona la visibilidad necesaria para los clientes inclinados a hacer un seguimiento del Datadog Agent en busca de posibles vulnerabilidades.

Si cree que ha descubierto un error en la seguridad de Datadog, consulte [Reportar un problema][11]. 
Para verificar el estado de una CVE específica, consulte la [página de vulnerabilidades de artefactos públicos][19]. Para obtener información adicional, comuníquese con el [Soporte de Datadog][12] a través de su proceso de soporte estándar. Al enviar un ticket de soporte a través del sitio web de Datadog, establezca el campo {{< ui >}}Product type{{< /ui >}} en {{< ui >}}Vulnerability Inquiry on Datadog Product{{< /ui >}}.

## Ejecución como usuario sin privilegios {#running-as-an-unprivileged-user}

De forma predeterminada, el Agent se ejecuta como el usuario `dd-agent` en Linux y como la cuenta `ddagentuser` en [Windows][13]. Las excepciones son las siguientes:

- El `system-probe` se ejecuta como `root` en Linux y como `LOCAL_SYSTEM` en Windows.
- El `process-agent` se ejecuta como `LOCAL_SYSTEM` en Windows.
- El `security-agent` se ejecuta como `root` en Linux.

## Gestión de secretos {#secrets-management}

Si tiene el requisito de evitar el almacenamiento de secretos en texto plano en los archivos de configuración del Agent, puede aprovechar el paquete de [gestión de secretos][14]. Este paquete permite que el Agent llame a un ejecutable proporcionado por el usuario para manejar la recuperación o el descifrado de secretos, los cuales son cargados posteriormente en la memoria por el Agent. Puede diseñar su ejecutable de acuerdo con su servicio de gestión de claves, método de autenticación y flujo de trabajo de integración continua preferidos.

Para obtener más información, consulte la documentación de [Gestión de secretos][14].

## Recopilación de telemetría {#telemetry-collection}

{{< site-region region="gov,gov2" >}}

El Agent en sitios que no son gubernamentales recopila información sobre el entorno, el rendimiento y el uso de funciones del Datadog Agent. Cuando el Agent detecta un sitio gubernamental, o se utiliza el [Datadog Agent FIPS Proxy][1], el Agent deshabilita automáticamente esta recopilación de telemetría. Cuando dicha detección es imposible (por ejemplo, si se está utilizando un proxy), la telemetría del Agent se emite, pero se descarta inmediatamente en la ingesta de Datadog.

Para evitar que estos datos se emitan en primer lugar, Datadog recomienda deshabilitar la telemetría del Datadog Agent explícitamente actualizando el ajuste `agent_telemetry` en el archivo de configuración del Datadog Agent, como se muestra en el ejemplo a continuación.

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
{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Datadog puede recopilar información sobre el entorno, el rendimiento y el uso de funciones del Datadog Agent. Esto puede incluir registros de diagnóstico y volcados de memoria del Datadog Agent con seguimientos de pila ofuscados para brindar soporte y mejorar aún más el Datadog Agent.

Puede deshabilitar esta recopilación de telemetría actualizando el ajuste `agent_telemetry` en el archivo de configuración del Datadog Agent, como se muestra en el ejemplo a continuación.
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

Para visualizar el contenido de telemetría más reciente, ejecute el siguiente comando:

```bash
agent diagnose show-metadata agent-telemetry
```

| Metadatos ([source][1]) |
| ---------------------- |
| ID de la máquina             |
| Nombre de la máquina           |
| OS                     |
| OS version             |
| Agent version          |

| Métricas ([source][2])                       | Descripción                                                                                                            |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Comprobaciones**                                  |                                                                                                                        |
| checks.execution_time                       | Tiempo de ejecución de la verificación en milisegundos                                                                                 |
| pymem.inuse                                 | Número de bytes asignados por el intérprete de Python                                                                    |
| **Registros y métricas**                        |                                                                                                                        |
| dogstatsd.udp_packets_bytes                 | Bytes de paquetes UDP de DogStatsD                                                                                            |
| dogstatsd.uds_packets_bytes                 | Bytes de paquetes UDS de DogStatsD                                                                                            |
| dogstatsd_client.bytes_sent                 | Total de bytes enviados por clientes de DogStatsD                                                                                  |
| dogstatsd_client.bytes_dropped              | Total de bytes descartados por clientes de DogStatsD                                                                               |
| dogstatsd_client.bytes_dropped_queue        | Total de bytes descartados porque la cola del remitente del cliente de DogStatsD está llena                                                    |
| dogstatsd_client.bytes_dropped_writer       | Total de bytes descartados porque el escritor del cliente de DogStatsD no puede enviarlos                                                 |
| logs.auto_multi_line_aggregator_flush       | Número de registros multilínea agregados por el Agent                                                                       |
| logs.auto_multi_line_default_total_lines    | Total de líneas de registro procesadas por el agregador de detección para fuentes que dependen de la detección multilínea automática predeterminada           |
| logs.auto_multi_line_default_would_combine  | Número de líneas que se combinarían si la detección multilínea automática estuviera habilitada de forma predeterminada                              |
| logs.auto_multi_line_default_would_truncate | Número de líneas en grupos que se truncarían si la detección multilínea automática estuviera habilitada de forma predeterminada                   |
| logs.bytes_missed                           | Número total de bytes perdidos antes de que pudieran ser consumidos por el Agent, por ejemplo, después de la rotación de registros                 |
| logs.bytes_sent                             | Número total de bytes enviados antes de la codificación, si corresponde                                                              |
| logs.decoded                                | Número total de registros decodificados                                                                                           |
| logs.dropped                                | Número total de registros descartados                                                                                           |
| logs.encoded_bytes_sent                     | Número total de bytes enviados después de la codificación, si corresponde                                                               |
| logs.http_connectivity_check                | Número de checks de conectividad HTTP, etiquetados por estado (éxito o error)                                               |
| logs.http_connectivity_failure              | Número de fallas en verificaciones de conectividad HTTP, etiquetadas por causa raíz (dns, tls, timeout, connection, http_status, other)    |
| logs.http_connectivity_retry_attempt        | Número de reintentos en checks de conectividad HTTP, etiquetados por estado (éxito o error)                                       |
| logs.restart_attempt                        | Número de intentos de reinicio del Agent de registros, etiquetados por estado y transporte de destino                                             |
| logs.sender_latency                         | Latencia del remitente HTTP en milisegundos                                                                                    |
| logs.truncated                              | Número total de registros truncados por el Agent                                                                            |
| logs_destination.destination_workers        | Número máximo de conexiones HTTP activas por destino de registro                                                          |
| point.dropped                               | Número total de métricas descartadas                                                                                        |
| point.sent                                  | Número total de métricas enviadas                                                                                           |
| transactions.input_count                    | Número de transacciones entrantes                                                                                             |
| transactions.input_bytes                    | Tamaño de la carga útil de la transacción entrante en bytes                                                                             |
| transactions.success                        | Número de transacciones exitosas                                                                                           |
| transactions.success_bytes                  | Tamaño de la carga útil de la transacción exitosa en bytes                                                                          |
| transactions.requeued                       | Número de reencolamientos de transacciones                                                                                              |
| transactions.retries                        | Número de reintentos de transacciones                                                                                                |
| **Base de datos**                                |                                                                                                                        |
| oracle.activity_samples_count               | Número de filas obtenidas al medir la actividad de consultas (Número de muestras de actividad recopiladas)                              |
| oracle.activity_latency                     | Tiempo para recuperar la actividad de consultas en milisegundos                                                                        |
| oracle.statement_metrics                    | Tiempo para recuperar las métricas de la base de datos en milisegundos                                                                      |
| oracle.statement_plan_errors                | Número de errores al recuperar los planes de ejecución                                                                         |
| postgres.collect_activity_snapshot_ms       | Tiempo para obtener la instantánea de actividad en milisegundos                                                                          |
| postgres.collect_relations_autodiscovery_ms | Tiempo para recopilar relaciones de Autodiscovery en milisegundos                                                               |
| postgres.collect_statement_samples_ms       | Tiempo para obtener muestras de sentencias en milisegundos                                                                          |
| postgres.collect_statement_samples_count    | Total de filas obtenidas para recopilar muestras de sentencias                                                                        |
| postgres.collect_stat_autodiscovery_ms      | Tiempo para recopilar estadísticas de Autodiscovery en milisegundos                                                                    |
| postgres.get_new_pg_stat_activity_ms        | Tiempo para obtener `pg_stat_activity` en milisegundos                                                                         |
| postgres.get_new_pg_stat_activity_count     | Total de filas obtenidas para recopilar `pg_stat_activity`                                                                       |
| postgres.get_active_connections_ms          | Tiempo para obtener conexiones activas en milisegundos                                                                         |
| postgres.get_active_connections_count       | Total de filas obtenidas para conseguir conexiones activas                                                                           |
| postgres.schema_tables_elapsed_ms           | Tiempo para recopilar tablas en el esquema de Postgres                                                                              |
| postgres.schema_tables_count                | Total de tablas en el esquema de Postgres                                                                                        |
| **API**                                     |                                                                                                                        |
| api_server.request_duration_seconds         | Rendimiento de ejecución de comandos CLI (si se ejecutan)                                                                       |
| **Eventos**                                  |                                                                                                                        |
| agent_bsod                                  | Datos de la pantalla azul de la muerte (BSOD) relacionados con el Agent, incluyendo el código BugCheck, cuatro argumentos asociados y la pila de llamadas de bloqueo sin simbolizar |
| **Service Discovery**                       |                                                                                                                        |
| service_discovery.discovered_services       | Número de servicios detectados por la función de Service Discovery del Agent                                                   |
| **Autodiscovery**                          |                                                                                                                        |
| autodiscovery.discovery_queue_depth         | Número de servicios actualmente en la cola de descubrimiento de integraciones del Agent                                                |
| autodiscovery.discovery_results             | Recuento de los intentos de descubrimiento de integraciones del Agent, etiquetados por resultado (éxito o error)                             |
| **GPU Monitoring**                          |                                                                                                                        |
| gpu.device_total                            | Número total de GPUs en el sistema                                                                                     |
| **APM**                                     |                                                                                                                        |
| trace.enabled                               | Si el proceso trace-agent se está ejecutando.                                                                            |
| trace.working                               | Si el proceso trace-agent está recibiendo y enviando trazas.                                                       |
| **Synthetic Monitoring**                              |                                                                                                                        |
| synthetics_agent.checks_received            | Número de pruebas recibidas                                                                                               |
| synthetics_agent.checks_processed           | Número de pruebas ejecutadas                                                                                               |
| synthetics_agent.error_test_config          | Número de errores de configuración de prueba                                                                                           |
| synthetics_agent.traceroute_error           | Número de errores de traceroute                                                                                            |
| synthetics_agent.evp_send_result_failure    | Número de errores al enviar resultados                                                                                  |
| **Cluster Agent**                           |                                                                                                                        |
| admission_webhooks.mutation_attempts        | Número de intentos de mutación de webhooks de admisión                                                                          |
| admission_webhooks.library_injection_attempts | Número de intentos de inyección de biblioteca                                                                                 |
| admission_webhooks.library_injection_errors | Número de errores de inyección de biblioteca                                                                                     |
| admission_webhooks.patcher_errors           | Número de errores del parcheador de webhooks de admisión                                                                             |
| admission_webhooks.rc_provider_configs      | Número de configuraciones del proveedor de configuración remota                                                                        |
| admission_webhooks.rc_provider_configs_invalid | Número de configuraciones no válidas del proveedor de configuración remota                                                             |
| admission_webhooks.image_resolution_attempts | Número de intentos de resolución de imagen                                                                                   |
| autodiscovery.errors                        | Número de errores de Autodiscovery                                                                                         |
| autodiscovery.watched_resources             | Número de recursos observados por Autodiscovery                                                                              |
| cluster_checks.configs_dispatched           | Número de configuraciones de verificación de clúster enviadas                                                                      |
| cluster_checks.configs_dangling             | Número de configuraciones de verificación de clúster huérfanas                                                                        |
| cluster_checks.configs_info                 | Nombres de las comprobaciones de clúster enviadas                                                                             |
| cluster_checks.unscheduled_check            | Número de comprobaciones de clúster no programadas                                                                                   |
| instrumentation_controller.resources        | Número de `DatadogInstrumentation` recursos rastreados por el controlador                                                 |
| instrumentation_controller.reconciliations  | Número de intentos de reconciliación de la sección `DatadogInstrumentation`, etiquetados por sección y estado                       |
| language_detection_patcher.patches          | Número de parches del parcheador de detección de idioma                                                                           |
| tagger.stored_entities                      | Número de entidades almacenadas en el Tagger                                                                                |
| workloadmeta.stored_entities                | Número de entidades almacenadas en WorkloadMeta                                                                              |
| workloadmeta.pull_errors                    | Número de errores de extracción de WorkloadMeta                                                                                     |
| appsec_injector.watched_changes             | Número de cambios detectados por el inyector de AppSec para los recursos observados                                                |
| appsec_injector.sidecar_mutations           | Número de resultados de admisión de sidecar del inyector de AppSec (mutación y eliminación de pod)                                       |
| agent_performance.containers_restarts       | Número de reinicios de contenedor para los pods del Cluster Agent y del Cluster Checks Runner                                      |
| agent_performance.containers_terminated     | Número de terminaciones de contenedor para los pods del Cluster Agent y del Cluster Checks Runner, etiquetadas por motivo                |
| agent_performance.memory_usage              | Uso total de memoria del tiempo de ejecución del contenedor, en bytes, para los pods del Cluster Agent y del Cluster Checks Runner                   |
| agent_performance.memory_limit              | Límites totales de memoria del tiempo de ejecución del contenedor, en bytes, para los pods del Cluster Agent y del Cluster Checks Runner                  |
| agent_performance.cpu_usage                 | Uso total de CPU del tiempo de ejecución del contenedor, en núcleos de CPU, para los pods del Cluster Agent y del Cluster Checks Runner                  |
| **eBPF**                                    |                                                                                                                        |
| ebpf.core_load_success                      | Número de cargas exitosas de un programa eBPF CO-RE                                                                    |
| ebpf.core_load_error                        | Número de errores al cargar un programa eBPF CO-RE                                                                         |
| ebpf.core_remoteconfig_success              | Número de descargas exitosas de datos BTF (BPF Type Format) desde la configuración remota                                 |
| ebpf.core_remoteconfig_error                | Número de errores al descargar datos BTF desde la configuración remota                                                        |

Solo se emiten las métricas aplicables. Por ejemplo, si DBM no está habilitado, no se emite ninguna de las métricas relacionadas con la base de datos.


[1]: https://github.com/DataDog/datadog-agent/blob/4dc6ed6eb069bdea7e93f2d267ac5086a98c968c/comp/core/agenttelemetry/impl/sender.go#L218-L221
[2]: https://github.com/search?q=repo%3ADataDog%2Fdatadog-agent+content%3A%2Fvar+defaultProfiles%2F+path%3Acomp%2Fcore%2Fagenttelemetry%2Fimpl%2Fconfig.go+content%3A%2Fprofiles%3A%2F+content%3A%2F-+name%3A+checks%2F+content%3A%2Fmetric%3A%2F+content%3A%2Fexclude%3A%2F&type=code

{{< /site-region >}}

### Lecturas Adicionales {#further-reading}

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
[19]: /es/data_security/guide/public_artifact_vulnerabilities/