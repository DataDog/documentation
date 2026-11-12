---
aliases:
- /es/observability_pipelines/guide/upgrade_worker_2_7/
description: Conozca las nuevas funciones, mejoras y correcciones para las versiones
  2.7 a 2.21 de Worker.
disable_toc: false
title: Guía de actualización de Worker
---
## Descripción general {#overview}

<div class="alert alert-info">
Datadog recomienda actualizar Observability Pipelines Worker (OPW) con cada versión menor y de parche, o, como mínimo, mensualmente. <br><br> Actualizar a la versión principal más reciente de OPW y mantenerla actualizada es la única forma admitida de obtener las nuevas funcionalidades, correcciones y actualizaciones de seguridad de OPW.
</div>

Esta guía explica cómo actualizar a una versión específica de Worker y las actualizaciones para esa versión.

## Versión 2.21.0 de Worker {#worker-version-2210}

Para actualizar a la versión 2.21.0 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.21.0][54].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.21.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.21.0`.

La versión 2.21.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features}

- Los destinos de Datadog Archives (Amazon S3, Google Cloud Storage y Azure Blob Storage) ahora admiten una opción `compression` configurable (`gzip` o `zstd`).
- El procesador Remap to OCSF ahora incluye:
    - El mapeo OCSF de AWS Config Rules.
    - La función de mapeo OCSF `concat_strings`, que une las representaciones de cadena de múltiples campos de origen o valores constantes.
- El destino Splunk HEC ahora admite una opción `endpoint_target` (`event` o `raw`) para determinar a qué punto de conexión de Splunk HEC se envían los eventos.

#### Mejoras {#enhancements}

- La fuente Splunk TCP ahora admite la configuración de TCP keepalive y el límite de conexión.
- Los registros y las trazas internos del Worker ahora incluyen el nombre de la canalización (`op_worker.pipeline_name:<pipeline_name>`), de acuerdo con la etiqueta ya presente en las métricas.
- Se ha mejorado el registro del Worker durante el apagado ordenado.
- Se ha mejorado la validación de los puntos de conexión de destino para verificar si hay URL incompletas o vacías.
- La función `parse_aws_vpc_flow_log` del procesador Custom Processor ahora reconoce todos los campos introducidos en las versiones 7 a 11 de Amazon VPC Flow Logs, incluidos:
    - Versión 7: Campos de metadatos de ECS
    - Versión 8: `reject_reason`
    - Versión 9: `resource_id`
    - Versión 10: `encryption_status`
    - Versión 11: Campos de etiqueta, interfaz y siguiente salto
- El procesador Enrichment Table ahora:
    - Mantiene las filas en su caché durante aproximadamente 30 minutos, independientemente de si la búsqueda fue positiva o negativa
    - Divide los eventos que genera en lotes según el tamaño de lote del remitente de la fuente

#### Correcciones {#fixes}

- Se corrigió la coincidencia glob que no distingue entre mayúsculas y minúsculas en consultas de búsqueda que contienen texto UTF-8, lo que causaba fallos y resultados incorrectos para entradas que no son ASCII.
- Se corrigieron las cargas de Azure Blob Storage mayores a 4 MiB al usar una cadena de conexión de clave de cuenta.
- Se corrigió un error irrecuperable del Worker que ocurría cuando un registro excedía el tamaño máximo de registro del búfer. El error ahora se registra y se refleja en las métricas de estado `buffer_discarded_events_total` y `buffer_discarded_bytes_total` (con `intentional="false"`).

## Versión 2.20.4 del Worker {#worker-version-2204}

Para actualizar a la versión 2.20.4 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.20.4][53].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.20.4`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.20.4`.

La versión 2.20.4 del Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-1}

- La fuente Splunk TCP aplicaba anteriormente una longitud máxima de trama fija de 10 000 bytes. El Worker rechazaba eventos más grandes y registraba advertencias. La fuente ya no limita la longitud de la trama de forma predeterminada. Para evitar un consumo de memoria ilimitado, utilice la variable de entorno `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` para establecer una longitud máxima de trama.




## Versión 2.20.3 del Worker {#worker-version-2203}

Para actualizar a la versión 2.20.3 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.20.3][52].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.20.3`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.20.3`.

La versión 2.20.3 del Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-2}

- Se corrigió el listener gRPC de la fuente OpenTelemetry para anunciar `h2` sobre ALPN cuando TLS está habilitado. Anteriormente, los clientes gRPC que se conectaban a través de TLS podían fallar al establecer una conexión.

## Versión 2.20.2 del Worker {#worker-version-2202}

Para actualizar a la versión 2.20.2 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.20.2][51].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.20.2`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.20.2`.

La versión 2.20.2 del Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-3}

- Se corrigió un problema por el cual los valores no finitos (NaN o Infinity) de gauge, delta de contador, delta-suma de histograma y los histogramas de conteo cero podían serializarse en cargas útiles de métricas OTLP con formato incorrecto. Estos valores ahora se descartan antes de la codificación OTLP.




## Versión 2.20.0 del Worker {#worker-version-2200}

Para actualizar a la versión 2.20.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.20.0][50].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.20.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.20.0`.

La versión 2.20.0 del Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-1}

- Las fuentes OpenTelemetry y Splunk HEC ahora admiten la recarga en caliente de certificados TLS, por lo que las rotaciones de certificados se aplican sin reiniciar el Worker.

#### Mejoras {#enhancements-1}

- Se ha mejorado el rendimiento del procesador Split Array.
- La fuente HTTP/S Server ahora utiliza una coincidencia que no distingue entre mayúsculas y minúsculas para el campo del nombre del encabezado cuando configura tokens de autenticación.
- La fuente Splunk HEC ahora acepta una lista opcional de tokens para autenticar eventos.

#### Correcciones {#fixes-4}

- El procesador Add Fields ahora incrementa la métrica `component_errors_total` cuando no logra actualizar un evento.
- Se corrigió el problema de verificación del nombre de host del certificado TLS para destinos con un nombre de servidor configurado, de modo que el nombre del servidor se utilice para la verificación.

## Versión 2.19.0 de Worker {#worker-version-2190}

Para actualizar a la versión 2.19.0 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.19.0][49].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.19.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.19.0`.

La versión 2.19.0 de Worker le brinda acceso a lo siguiente:

#### Mejoras {#enhancements-2}

- Se ha añadido una opción TLS `server_name` a los destinos BYOC Logs, HTTP Client, Socket y Syslog, y a la fuente HTTP Client. Esta anula el SNI y el nombre de host del certificado utilizados para el protocolo de enlace TLS, lo cual es aplicable cuando la dirección a la que se establece la conexión no coincide con el nombre común o el nombre alternativo del sujeto del certificado.
- La fuente TCP de Splunk ahora admite la recarga en caliente de certificados TLS, por lo que las rotaciones de certificados se aplican sin reiniciar el Worker.
- El destino BYOC Logs ahora admite la recarga en caliente de archivos mTLS.
- El Worker ahora admite un límite configurable para el apagado controlado.
- El destino de Amazon S3 ahora admite el cifrado SSE-KMS utilizando las opciones `server_side_encryption` y `ssekms_key_id`.

#### Correcciones {#fixes-5}

- Se corrigió un problema en el procesador Reduce donde un campo de marca de tiempo cuyo nombre requiere comillas en una ruta (por ejemplo, `"created.at"` o `"event-time"`) hacía que su campo complementario `_end` se eliminara silenciosamente del evento reducido. El campo complementario ahora se coloca correctamente junto al campo base.
- Se corrigió un problema de recarga de configuración. Si una recarga cambiaba el tipo de un componente mientras mantenía el mismo nombre, como reemplazar una fuente llamada `X` con un procesador llamado `X`, cualquier procesador o destino descendente que aún lea desde `X` ahora se vuelve a conectar al nuevo componente.
- La fuente Syslog (modo TCP) se ha corregido para manejar un mensaje de longitud prefijada y excesiva dividido en múltiples lecturas.
- La fuente Logstash se ha corregido para enviar una confirmación solo cuando se reciben todos los eventos de un lote, en lugar de enviar una confirmación parcial.
- La fuente Logstash ahora rechaza un lote de eventos que llega antes de que se hayan recibido todos los eventos del lote actual, cerrando la conexión con un error de decodificación fatal en lugar de continuar.
- Se corrigió el códec Syslog que ignoraba silenciosamente las palabras clave de severidad de forma corta (`crit`, `emerg`, `err`, `info`, `warn`) y usaba `informational` de forma predeterminada. Ahora se aceptan tanto los nombres de severidad de forma corta como de forma completa.
- Se corrigió un problema en las funciones del procesador personalizado `parse_key_value`, `parse_cef`, `decode_mime_q` y `parse_ruby_hash` que tenían entradas con líneas de 65,535 bytes o más.

## Versión 2.18.0 de Worker {#worker-version-2180}

Para actualizar a la versión 2.18.0 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.18.0][48].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.18.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.18.0`.

La versión 2.18.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-2}

- El comando `run` ahora admite una opción `--log-format`, también configurable mediante la variable de entorno `DD_OP_LOG_FORMAT`, para seleccionar el formato de los propios registros `stdout` y `stderr` de Worker. El `text` predeterminado conserva la salida existente legible para las personas, y `json` emite registros JSON estructurados que se pueden seguir y procesar directamente sin reglas de parseo adicionales.
- El procesador Tag Cardinality Limit ahora admite una opción `tracking_mode`. `exact_fingerprint` rastrea los valores de las etiquetas exactamente usando huellas digitales de 64 bits, lo que utiliza menos memoria que el método anterior de almacenar valores sin procesar, y `probabilistic` usa un filtro de Bloom para un uso de memoria aún menor a cambio de un falso positivo ocasional. El modo probabilístico acepta un campo `false_positive_rate`, que tiene como valor predeterminado `0.001` (0.1%).
- La fuente WebSocket está disponible para ingerir registros desde un punto de conexión de WebSocket, con soporte para estrategias de autenticación `none`, `basic`, `bearer` y `custom`, así como TLS.
- Un nuevo procesador `generate_metrics` enruta las métricas a cualquier destino de métricas compatible. Datadog recomienda usarlo en lugar del procesador `generate_datadog_metrics` existente, aunque el uso de este último no se ve afectado.

#### Mejoras {#enhancements-3}

- Se ha añadido soporte mTLS al destino BYOC Logs.
- La opción `measure_cpu_usage` ahora está habilitada, por lo que `pipelines.component_cpu_usage_ns_total` siempre se emite para los siguientes procesadores de registros: Custom Processor, Sensitive Data Scanner, Grok Parser, Parse JSON, Parse XML, OCSF Mapper, Enrichment Table, Reduce, Dedupe, Split Array y Throttle; y los siguientes procesadores de métricas: Aggregate y Tag Cardinality Limit.
- Los errores de configuración de la canalización ahora incluyen el ID del componente que causó la falla. Esto facilita la identificación de qué fuente, procesador o destino necesita corrección. Para los procesadores compuestos por múltiples bloques, como el Custom Processor, Generate Metrics y OCSF Mapper, el error también identifica qué bloque individual falló, incluyendo su posición y, cuando el bloque tiene uno, su nombre.
- Las métricas de la canalización ahora están etiquetadas con el nombre de la canalización usando `pipeline_name:<NORMALIZED_PIPELINE_NAME>`.

#### Correcciones {#fixes-6}

- Se corrigió un problema que ocurría cuando una canalización de solo registros (usando sintaxis de búsqueda heredada) ejecutaba una consulta de búsqueda que el nuevo analizador no podía manejar. El analizador ahora emite una advertencia y no ejecuta la consulta no válida.
- Se corrigió un problema que afectaba a las consultas que comienzan con un carácter escapado (solo para canalizaciones que ejecutan la nueva sintaxis de búsqueda).
- La telemetría interna (métricas y registros) emitida desde tareas en segundo plano ahora hereda correctamente las etiquetas del componente propietario (`component_id`, `component_kind`, `component_type`). Anteriormente, varios componentes generaban tareas en segundo plano sin propagar sus etiquetas, por lo que algunos eventos internos de esas tareas carecían de sus etiquetas de componente. Las emisiones afectadas incluyen:
  - Fuente de archivos de Datadog: listing-error, download-error, send-error, event-acknowledged, event-errored y event-rejected, además de métricas de estado de sus tareas de coordinador de listado, descargador por archivo y controlador de confirmación
  - Destino de Microsoft Sentinel: tarea de regeneración de token de Azure OAuth
  - Fuente TCP de Splunk: tarea del servidor.

---

## Versión 2.17.0 de Worker {#worker-version-2170}

Para actualizar a la versión 2.17.0 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.17.0][46].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.17.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.17.0`.

<div class="alert alert-warning"><strong>Cambio incompatible:</strong> El procesador Generate Metrics ahora emite el nombre del campo sin procesar como la clave de etiqueta para <code>group_by</code> entradas que contienen caracteres fuera de <code>[a-zA-Z0-9_@]</code>, tales como <code>http.status_code</code> y <code>kube-cronjob</code>. Anteriormente, el procesador agregaba un guion bajo final (<code>_</code>) a las claves de etiqueta que contenían esos caracteres. Por ejemplo, la clave de etiqueta <code>http.status_code</code> se convirtió en <code>http.status_code_</code> porque la clave contenía un punto (<code>.</code>).<br><br>Después de actualizar a Worker 2.17, actualice cualquier tablero, monitor, alerta o cuaderno que utilice claves de etiqueta con el guion bajo final para usar esas claves de etiqueta sin el guion bajo. Los puntos de datos históricos siguen siendo consultables bajo la clave de etiqueta antigua. Pipelines cuyas <code>group_by</code> entradas que solo usan nombres que coinciden con <code>[a-zA-Z0-9_@]+</code> no se ven afectadas.</div>

La versión 2.17.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-3}

- Para Custom Processor:
    - Los literales de cadena VRL ahora admiten `\u{HEX}` secuencias de escape Unicode. Cualquier valor escalar Unicode válido puede expresarse, como `"hello\u{1F30E}world"`. Las secuencias no válidas, como llaves vacías, dígitos que no son hexadecimales, puntos de código suplentes o valores superiores a U+10FFFF, se informan como errores en tiempo de compilación.
    - La función `parse_regex` ahora acepta patrones de regex dinámicos (variables y expresiones en tiempo de ejecución), de manera consistente con `parse_regex_all`. Cuando el patrón es un literal, la información del tipo de retorno permanece precisa según los grupos de captura con nombre.

#### Mejoras {#enhancements-4}

- Se ha mejorado el rendimiento del procesador Generate Metrics para reducir la sobrecarga de CPU al usar etiquetas de `group_by`.
- Para el procesador personalizado, se ha mejorado el rendimiento de `parse_regex_all` mediante la reutilización de la regex compilada en todas las invocaciones.

#### Correcciones {#fixes-7}

- Las métricas HTTP emitidas por la sincronización en segundo plano del procesador Quota ahora tienen las etiquetas de componente correctas (`component_kind:transform`, `component_type:quota`, `component_id:quota_global_state`).
- El procesador Enrichment Table que utiliza Reference Tables ahora omite el envío de lotes de eventos vacíos, lo que evita errores fatales con los búferes de disco.
- El procesador Generate Metrics ahora utiliza un ID de componente estático para que las métricas asociadas compartan el mismo `component_id` entre los Workers y los reinicios.
- Se ha solucionado un problema con el parseo de consultas de filtro que contienen espacios en blanco dentro de paréntesis, como `service:( web OR api )`.
- Live Capture ahora funciona correctamente para fuentes con múltiples puertos de salida con nombre, como la fuente OpenTelemetry.
- Se ha corregido un problema en el que podía ocurrir un bloqueo del Worker si una fuente o un procesador enviaba un lote de eventos vacío al siguiente componente.
- Para Custom Processor:
    - Se han corregido los mensajes de error y los diagnósticos de variables no utilizadas. El procesador ahora informa cada error no controlado en una sola compilación.
    - Ahora puede usar el caso `SCREAMING_SNAKE` en funciones como `pascalcase` y `camelcase`.
    - Las funciones `encode_proto` y `parse_proto` ahora admiten mapas proto cuyas claves son números enteros o booleanos, no solo cadenas.

---

## Versión 2.16.1 del Worker {#worker-version-2161}

Para actualizar a la versión 2.16.1 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.16.1][45].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.16.1`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.16.1`.

La versión 2.16.1 del Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-8}

- El Worker ya no falla al obtener configuraciones en centros de datos que no son US1.

---

## Versión 2.16.0 del Worker {#worker-version-2160}

Para actualizar a la versión 2.16.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.16.0][44].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.16.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.16.0`.

La versión 2.16.0 del Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-4}

- Destino [Databricks Zerobus][47]: envíe datos de registro a tablas de Databricks Unity Catalog utilizando el servicio de ingesta Zerobus. El destino de Databricks admite autenticación OAuth 2.0, obtención automática de esquemas de Unity Catalog y codificación por lotes de protobuf.
- La fuente Splunk HEC ahora admite el enriquecimiento de eventos de registro entrantes utilizando el decodificador VRL.
- El destino de Amazon S3 ahora admite codificación por lotes de Apache Parquet con definiciones de esquema flexibles y compresión configurable (Snappy, ZSTD, GZIP, LZ4 o ninguna).
- Para Custom Processor:
    - La función `encode_proto` ahora acepta un argumento `allow_lossy_string_coercion`.
    - La codificación Protobuf ahora fuerza tipos escalares compatibles al tipo de campo de destino: se aceptan enteros y cadenas para campos `bool`, y se aceptan enteros para campos `float` o `double`.

#### Mejoras {#enhancements-5}

- Se ha añadido soporte para mTLS a las siguientes fuentes: Fluent, Logstash, OpenTelemetry (registros y métricas), Splunk HEC, Splunk TCP, HTTP/S Server, Socket y Syslog.
- Los eventos de Live Capture ahora incluyen el UUID del Worker que envió el evento.
- El búfer del procesador Reference Tables ahora emite las métricas gauge `buffer_size_events` y `buffer_size_bytes` para reemplazar las métricas obsoletas `buffer_events` y `buffer_byte_size`. Las métricas obsoletas todavía se envían por compatibilidad con versiones anteriores.
- El destino Datadog Logs ahora admite anulaciones del punto de conexión de registros de cada sitio mediante el campo `logs-sites` del archivo bootstrap o la variable de entorno `DD_OP_LOGS_<SITE>`, como `DD_OP_LOGS_US1`. Las variables de entorno tienen prioridad sobre el archivo de arranque.
- Las fuentes ahora registran estas métricas de distribución:
    - `source_send_latency_seconds`: El tiempo que le toma a la fuente enviar un fragmento de eventos al siguiente componente.
    - `source_send_batch_latency_seconds`: El tiempo que le toma a la fuente enviar un lote, el cual puede contener múltiples fragmentos de eventos, al siguiente componente.

#### Correcciones {#fixes-9}

- Se corrigió una condición de carrera en el procesador Reference Tables para evitar la pérdida de eventos almacenados en búfer durante el apagado de un Worker.
- Live Capture se actualizó para mejorar el manejo del tráfico en ráfagas y las métricas del procesador Generate Metrics.
- El Worker ya no registra `Root metadata expired` o `potential freeze attack` al iniciar después de actualizar los metadatos de raíz de confianza de Remote Config incrustados.
- La fuente Splunk HEC ahora emite `authentication_failed` como `error_type` en los registros de errores y métricas cuando la autenticación falla debido a un encabezado de autorización faltante o no válido.
- Se corrigió el cálculo del punto de conexión de verificación de estado del destino de Datadog Logs para preservar los prefijos de sitio, como `us3.`, `us5.`, `ap1.`, al derivar la URL de la API de los puntos de conexión de ingesta.
- Se corrigió un problema en el que un destino con un búfer de disco configurado se bloqueaba durante `batch.timeout_sec` antes de recargarse de forma ordenada. Esta corrección también resuelve casos en los que el Worker ignoraba SIGINT durante un bloqueo del pipeline.
- Se corrigió Custom Processor para que una palabra clave `else` o `else if` pueda estar en una línea nueva después de la llave de cierre (`}`) de un bloque `if`.

---

## Versión 2.15.1 del Worker {#worker-version-2151}

Para actualizar a la versión 2.15.1 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.15.1][43].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.15.1`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.15.1`.

La versión 2.15.1 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-5}

- El Custom Processor ahora admite las funciones `to_entries` y `from_entries` para convertir entre objetos y arreglos de pares clave-valor (estilo jq).

#### Mejoras {#enhancements-6}

- El destino Datadog Metrics ahora utiliza compresión zstd para los puntos de conexión de la Datadog API v2 y de sketches, lo que reduce el uso de CPU, memoria y ancho de banda.
- La función `flatten` del Custom Processor ahora acepta un argumento opcional `except` para excluir claves específicas del aplanamiento.

#### Correcciones {#fixes-10}

- Se corrigió una regresión de rendimiento en el seguimiento de métricas de búfer.
- Se ha corregido la fuente del Datadog Agent para preservar la etiqueta `device` de los recursos de Datadog API v2.

---

## Versión 2.15.0 del Worker {#worker-version-2150}

Para actualizar a la versión 2.15.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.15.0][40].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.15.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.15.0`.

La versión 2.15.0 del Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-6}

- Se han añadido nuevas asignaciones OCSF para los siguientes tipos de registro:
    - AWS GuardDuty para todos los tipos de hallazgos (por ejemplo, EKS Audit, EC2, Lambda, IAM, DNS) en una única asignación llamada `AWS GuardDuty`.
    - Infoblox NIOS: DNS Activity, DHCP Activity, audit (Authentication and API Activity), y port y syslog Base Event (Infoblox DNS Query, Infoblox DHCP, Infoblox Audit Authentication, Infoblox Audit API, Infoblox Port).
    - Registros de Zscaler ZPA App Connector Status al esquema OCSF versión 1.3.0 (Authentication, clase 3002) con los perfiles `datetime` y `host`.
    - Registros de Zscaler ZPA User Activity al esquema OCSF versión 1.3.0 (Network Activity, clase 4001) con los perfiles `datetime`, `host`, `network_proxy` y `security_control`.
    - Registros de AWS WAF Web ACL. Transforma los eventos de registro de WAF en OCSF HTTP Activity (clase 4002) con los perfiles `cloud` y `security_control`.
    - Registros de Zscaler ZPA User Status al esquema OCSF versión 1.3.0 (Authentication, clase 3002) con los perfiles `datetime` y `host`.
- La fuente de OpenTelemetry ahora admite canalizaciones de métricas.
- El destino de Elasticsearch ya está disponible para canalizaciones de métricas.
- La función `parse_yaml` ya está disponible para el Custom Processor. Esta función analiza YAML de acuerdo con la [especificación YAML 1.1][41].
- La opción de archivo de Enrichment Table ahora admite una opción `field` que acepta una ruta de campo de evento o un secreto de metadatos como fuente de la clave de búsqueda. Se admite texto sin formato por compatibilidad con versiones anteriores.
    - Ejemplo de ruta de evento explícita:
        - Sintaxis simplificada de Observability Pipelines: `field: {event: "message"}`
        - Sintaxis VRL para el Custom Processor: `field: {vrl: ".message"}`
    - Ejemplo de referencia de secreto de metadatos: `field: {secret: "splunk_hec_token"}`
    - Cadena sin formato (por motivos de compatibilidad con versiones anteriores):
        - Sintaxis simplificada de Observability Pipelines: `field: "message"`
        - Sintaxis VRL para el Custom Processor: `field: ".message"`

#### Mejoras {#enhancements-7}

- La fuente de Amazon S3 ahora acepta datos comprimidos.
- El destino de Elasticsearch se ha actualizado con nuevas opciones: `auto_routing`, `compression`, `id_key`, `pipeline`, `request_retry_partial`, `sync_fields` y `tls`.
- Ahora se admite el mapeo de campos de origen de matriz de objetos a destinos de matriz de objetos OCSF.
- El destino de Datadog Metrics ahora utiliza de forma predeterminada el punto de conexión de series v2 de Datadog (`/api/v2/series`).
- La opción GeoIP del procesador Enrichment Table ahora incluye un campo de red que contiene la red CIDR asociada con el resultado de la búsqueda. El campo de red está disponible para todos los tipos de base de datos (City, ISP/ASN, Connection-Type, Anonymous-IP).
- El Custom Processor ahora tiene una función `encode_csv` que codifica una matriz de valores en una cadena con formato CSV. Esta es la inversa de la función `parse_csv` y admite un delimitador opcional de un solo byte (el valor predeterminado es `,`).
- Los nombres de campo ahora admiten `.`, como `foo."bar.baz"`.

#### Correcciones {#fixes-11}

- Se mejoró la precisión del seguimiento de la métrica de utilización del búfer.
- Para el Custom Processor, se corrigieron los tipos de parámetros incorrectos para `floor`, `md5`, `parse_key_value`, `precision` y `seahash`.

---

## Versión 2.14.1 del Worker {#worker-version-2141}

Para actualizar a la versión 2.14.1 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.14.1][42].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.14.1`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.14.1`.

La versión 2.14.1 del Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-12}

- Se corrigió la forma en que se maneja una ruta vacía en un campo de procesador. Por ejemplo, cómo el procesador Parse JSON maneja el `Field to parse JSON on` con el valor `.`.

---

## Versión 2.14.0 del Worker {#worker-version-2140}

Para actualizar a la versión 2.14.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.14.0][38].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.14.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.14.0`.

La versión 2.14.0 del Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-7}

- Se han agregado asignaciones OCSF para eventos de Palo Alto Networks Threat.
- La fuente Database se ha actualizado con cambios relacionados con el tiempo de espera.
- Se agregaron las métricas internas de `component_latency_seconds` histograma y `component_latency_mean_seconds` gauge. Las métricas se basan en el tiempo que un evento pasa en un solo procesador, incluido el búfer del procesador.

#### Mejoras {#enhancements-8}

- El reporte de errores de Enrichment Table ahora utiliza métricas de Reference Tables para reducir la cantidad de registros similares.
- El destino Splunk HEC ahora admite la extracción de campos de índice de los eventos.
- El asignador OCSF ahora tiene una opción para conservar los campos no coincidentes.
- Para el procesador Enrichment Table, se ha aumentado el tiempo de retención en la caché local de las entradas que no se encuentran en una Reference Table. El tiempo de retención es ahora de 30 minutos, en lugar de 10 minutos.
- Se han mejorado las comprobaciones de validación de SQL de Database Source.
- La biblioteca de Sensitive Data Scanner ahora cuenta con reglas de escaneo predeterminadas nuevas y actualizadas para PII, credenciales y datos financieros. También se han corregido errores menores.
- El comando `observability-pipelines-worker top` tiene nuevos atajos de teclado para desplazarse, ordenar y filtrar.
- El destino Datadog Logs se ha actualizado para usar compresión `zstd` de forma predeterminada en lugar de no usar compresión.
- La variable de entorno para la dirección de la fuente Datadog Agent ahora es configurable.

#### Correcciones {#fixes-13}

- Se corrigió un error con el estado de error persistente cuando Remote Configuration se sondea correctamente.
- Se corrigieron las métricas de utilización del búfer para registrar correctamente el nivel de utilización real.
- Se corrigió una condición de carrera en el apagado del Worker entre el cierre del búfer de memoria y las operaciones de envío en curso que potencialmente podrían causar la pérdida de eventos.
- El procesador Generate Metrics ahora maneja correctamente las métricas de histograma agregado y resumen agregado.
- Live Capture ahora admite eventos secundarios en el procesador de matriz dividida.
- Se redujeron el tamaño del búfer y la frecuencia de las solicitudes de Reference Tables para evitar errores de falta de memoria (OOM) y de límite de solicitudes.
- El procesador Reference Tables ahora rechaza las claves de búsqueda vacías o en blanco y admite claves enteras.

---

## Versión 2.13.2 de Worker {#worker-version-2132}

Para actualizar a la versión 2.13.2 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.13.2][39].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.13.2`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.13.2`.

La versión 2.13.2 de Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-14}

- Se corrigieron las consultas `exists` y `missing` para que coincidan con los objetos.

---

## Versión 2.13.1 de Worker {#worker-version-2131}

Para actualizar a la versión 2.13.1 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.13.1][22].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.13.1`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.13.1`.

La versión 2.13.1 de Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-15}

- Todos los procesadores se actualizaron para gestionar sin fallas las consultas de filtro con una sintaxis incorrecta.

---

## Versión 2.13.0 de Worker {#worker-version-2130}

Para actualizar a la versión 2.13.0 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.13.0][23].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.13.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.13.0`.

La versión 2.13.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-8}

- [Custom Processor][24] para métricas: utilice VRL para transformar eventos de métricas.
- [Secrets Management][31]: Observability Pipelines puede recuperar secretos mediante Datadog Secrets Management.
- [Live Capture][25] está disponible para pipelines de métricas.
- El procesador [Enrichment Tables][28] puede utilizar conjuntos de datos de Reference Tables.

#### Mejoras {#enhancements-9}

- Los [búferes de disco][18] se han actualizado para descartar registros cuando el búfer está lleno.
- El procesador Dedupe se ha actualizado con un tamaño de caché configurable.
- La fuente del Datadog Agent se ha actualizado con tiempos de espera de solicitud configurables.
- Los búferes de las fuentes se han actualizado para registrar el nivel de utilización del búfer con estas métricas:
    - `source_buffer_max_byte_size`
    - `source_buffer_max_event_size`
    - `source_buffer_utilization`
    - `source_buffer_utilization_level`
- Los búferes del procesador se han actualizado para registrar el nivel de utilización de los búferes con estas métricas:
    - `transform_buffer_max_byte_size`
    - `transform_buffer_max_event_size`
    - `transform_buffer_utilization`
    - `transform_buffer_utilization_level`
- La implementación de TLS se ha actualizado para almacenar credenciales en formato PEM compatible con FIPS.

#### Correcciones {#fixes-16}

- Se ha actualizado Live Capture y se han corregido errores.
- Se ha corregido el error de Search Syntax al manejar segmentos con guiones.
- La fuente syslog en modo UDP emite las métricas estándar `component_received`, al igual que lo hace con el modo TCP:
    - `component_received_events_total`
    - `component_received_event_bytes_total`
    - `component_received_bytes_total`

---

## Versión 2.12.0 de Worker {#worker-version-2120}

Para actualizar a la versión 2.12.0 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.12.0][27].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.12.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.12.0`.

La versión 2.12.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-9}

- [Destino HTTP][29] para pipelines de métricas: enruta las métricas a un punto de conexión de un cliente HTTP.
- [MySQL Source][30]: Envía registros de una base de datos MySQL a Observability Pipelines.

#### Mejoras {#enhancements-10}

- La fuente y el destino HTTP Client se han actualizado para que pueda establecer una estrategia de autorización personalizada.
- El procesador de filtro de métricas se actualizó para filtrar métricas en `kind` y `value`.
- Los grupos de procesadores que enrutan y procesan solo eventos específicos se han actualizado para reducir la sobrecarga de procesamiento.
- La fuente del Datadog Agent se ha actualizado para admitir tiempos de espera, lo que incrementa las métricas `component_timed_out_events_total` y `component_timed_out_requests_total`.

#### Correcciones {#fixes-17}

- El destino de Amazon S3 se ha actualizado para garantizar que el campo `message` sea siempre una cadena, codificándolo en JSON si es necesario.
- Se ha corregido un error del Worker para garantizar que los registros del Worker se informen correctamente.
- El `hostname` se cambia de nombre a `host` al enviar registros a Datadog Archives.
- Para las fuentes de métricas, los Workers se han actualizado para usar su propia copia de la clave de Datadog para la autenticación, ignorando cualquier clave enviada por el Datadog Agent para evitar el uso de claves obsoletas.
- El Worker usa la configuración de proxy definida mediante variables de entorno (por ejemplo, la variable de entorno `DD_PROXY_HTTPS`) o en el archivo de arranque cuando publica eventos en Live Capture.

---

## Versión 2.11.0 de Worker {#worker-version-2110}

Para actualizar a la versión 2.11.0 del Worker:

- Docker: ejecute el comando `docker pull` para la [imagen 2.11.0][1].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: ejecute el comando `apt-get install observability-pipelines-worker=2.11.0`.
- RPM: ejecute el comando `sudo yum install observability-pipelines-worker-2.11.0`.

<div class="alert alert-info">Para las canalizaciones que ejecutan Worker 2.10 o versiones anteriores:<br>- Después de actualizar a Worker 2.11, sus consultas de filtro de procesador continúan ejecutando la sintaxis de búsqueda heredada.<br>- Debe actualizar manualmente sus consultas de filtro a la nueva Search Syntax.<br>- Luego, habilite el interruptor <b>New Search Syntax</b> en la interfaz de usuario, o establezca <code>use_legacy_search_syntax</code> a <code>false</code> usando la API o Terraform.<br><br>Consulte <a href="https://docs.datadoghq.com/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/">Actualice sus consultas de filtro a la nueva Search Syntax</a> para obtener más información.</a></div>

La versión 2.11.0 le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-10}

- Se han agregado más de 100 reglas listas para usar para el procesador Sensitive Data Scanner. Estas reglas ocultan información de identificación personal (PII) e información de claves de acceso.
- La [Search Syntax][3] actualizada que le permite:
    - Desreferenciar matrices
    - Realizar búsquedas que no distinguen entre mayúsculas y minúsculas dentro de los mensajes de registro
    - Dirigir de forma determinista las búsquedas a atributos de registro sin usar el símbolo `@`

---

## Versión 2.10.0 de Worker {#worker-version-2100}

Para actualizar a la versión 2.10.0 de Worker:

- Docker: ejecute el comando `docker pull` para la [imagen 2.10.0][4].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: ejecute el comando `apt-get install observability-pipelines-worker=2.10.0`.
- RPM: ejecute el comando `sudo yum install observability-pipelines-worker-2.10.0`.

La versión 2.10.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-11}

- [Destino de Kafka][5]: envíe registros desde Observability Pipelines a sus tópicos de Kafka.
- Funciones nuevas y actualizadas de [Custom Processor][6]:
    - La función `pop` elimina el último elemento de una matriz.
    - Las funciones criptográficas `encrypt_ip` y `decrypt_ip` para el cifrado de direcciones IP.
        - Estas funciones utilizan la especificación IPCrypt y admiten direcciones IPv4 e IPv6 con dos modos de cifrado:
            - aes128 (IPCrypt determinista, clave de 16 bytes)
            - pfx (IPCryptPfx, clave de 32 bytes).
            - Ambos algoritmos conservan el formato (la salida es una dirección IP válida) y son deterministas.
    - La función `xxhash` implementa los algoritmos de hash `xxh32`, `xxh64`, `xxh3_64` y `xxh3_128`.
    - La función `parse_aws_alb_log` se ha actualizado con un parámetro `strict_mode` opcional.
        - Cuando `strict_mode` se establece en `false`, el analizador ignora cualquier campo nuevo o adicional en los registros de AWS ALB, en lugar de fallar.
        - El valor predeterminado es `true` para preservar el comportamiento actual.
    - [Canalizaciones de métricas][32]:
        - [Fuente de Datadog Agent][33]: Envíe métricas desde Datadog Agent a Observability Pipelines para su procesamiento.
        - [Procesador de filtros][35]: Filtre las métricas que desea procesar.
        - [Procesador de etiquetas][36]: Incluya o excluya etiquetas específicas en sus métricas.
        - [Destino de métricas de Datadog][34]: Envíe sus métricas procesadas a Datadog.

#### Mejoras {#enhancements-11}

- Se ha mejorado el rendimiento de Custom Processor.
- Los Workers se han actualizado para usar su propia copia de la clave de Datadog para la autenticación, ignorando cualquier clave enviada por el Datadog Agent para evitar el uso de claves obsoletas.
- Se ha mejorado la notificación de errores al validar el esquema JSON en funciones personalizadas que utilizan la función `validate_json_schema`.

#### Correcciones {#fixes-18}

- Se ha corregido la lógica de filtrado a nivel de grupo para excluir los registros correctos.

---

## Versión 2.9.1 de Worker {#worker-version-291}

Para actualizar a la versión 2.9.1 de Worker:

- Docker: ejecute el comando `docker pull` para descargar la [imagen 2.9.1][7].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: ejecute el comando `apt-get install observability-pipelines-worker=2.9.1`.
- RPM: ejecute el comando `sudo yum install observability-pipelines-worker-2.9.1`.

La versión 2.9.1 de Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-19}

- El destino de Microsoft Sentinel se ha limitado a tamaños de lote de 1 MB al leer registros mediante Azure Logs Ingestion API. El tamaño límite se determinó según la [documentación de Azure][8].

---

## Versión 2.9.0 de Worker {#worker-version-290}

Para actualizar a la versión 2.9.0 de Worker:

- Docker: ejecute el comando `docker pull` para descargar la [imagen 2.9.0][9].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: ejecute el comando `apt-get install observability-pipelines-worker=2.9.0`.
- RPM: ejecute el comando `sudo yum install observability-pipelines-worker-2.9.0`.

La versión 2.9.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-12}

- [Fuente de OpenTelemetry Collector][10]: Recopile registros de su OpenTelemetry Collector en Observability Pipelines.
- [Destino de Datadog BYOC Logs][11]: Envíe registros al destino de Datadog BYOC Logs.
- [Destino de Google Pub/Sub][12]: Envíe registros desde Observability Pipelines al sistema de mensajería de Google Pub/Sub.
- La función personalizada `haversine` para calcular la distancia de haversine y el rumbo.

#### Mejoras {#enhancements-12}

- Los registros internos de Observability Pipelines Worker se han actualizado para ocultar parcialmente la clave de Datadog API (solo los primeros 28 caracteres), para ayudar a investigar problemas relacionados con la clave de API.
- Se ha mejorado el tiempo de entrega de Remote Configuration.
- Las funciones personalizadas `parse_cef` y `parse_syslog` tienen un parseo mejorado.

---

## Versión de Worker 2.8.1 {#worker-version-281}

Para actualizar a la versión 2.8.1 de Worker:

- Docker: ejecute el comando `docker pull` para descargar la [imagen 2.8.1][13].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.8.1`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.8.1`.

La versión 2.8.1 de Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-20}

- Se ha corregido la estrategia de autorización de la fuente HTTP Client.

---

## Versión 2.8.0 de Worker {#worker-version-280}

Para actualizar a la versión 2.8.0 de Worker:

- Docker: Ejecute el comando `docker pull` para descargar la [imagen 2.8.0][14].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.8.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.8.0`.

La versión 2.8.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-13}

- Todas las fuentes y destinos se han actualizado para admitir variables de entorno personalizadas.

#### Mejoras {#enhancements-13}

- La [estrategia de indexación][21] del destino Elasticsearch se ha actualizado para incluir flujos de datos.
- El destino HTTP Client admite sintaxis de plantilla.

#### Correcciones {#fixes-21}

- Se ha corregido la habilitación de TLS de la fuente HTTP Server.
- Se han corregido las métricas de estado de Worker.
- Se ha corregido la autenticación básica de OpenSearch.

---

## Versión 2.7.0 de Worker {#worker-version-270}

Para actualizar a la versión 2.7.0 de Worker:

- Docker: Ejecute el comando `docker pull` para descargar la [imagen 2.7.0][15].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.7.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.7.0`.

La versión 2.7.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-14}

- [El destino HTTP Client][16]: Envíe registros a un cliente HTTP, como una plataforma de registro o un SIEM.
- [Processor Groups][17]: Organice sus procesadores en grupos lógicos para ayudarle a administrarlos.
- Los destinos disponen de opciones de almacenamiento en búfer en [disco y memoria][18].

#### Mejoras {#enhancements-14}

- La función personalizada `decode_lz4` se ha actualizado para admitir la descompresión de datos de trama `lz4`.
- Los campos de prefijo de los destinos de archivo de Azure Blob Storage y Google Cloud Storage admiten sintaxis de plantilla.
- El destino de Splunk HEC tiene una variable de entorno personalizada.
- El procesador de muestra tiene un [parámetro `group_by`][20] opcional.

#### Correcciones {#fixes-22}

- La compresión predeterminada del destino Datadog Logs se ha actualizado a `zstd`, lo que coincide con la compresión predeterminada de Datadog Agent.
- Se han corregido los destinos de Amazon S3, Google Cloud Storage y Azure Blob Storage para resolver correctamente las marcas de tiempo de los registros.
- Se ha mejorado el rendimiento del asignador OCSF personalizado.
- El procesador de filtros tiene habilitada la lógica de indicadores para pasar eventos al siguiente procesador.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.11
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/observability-pipelines-worker#observability-pipelines-worker
[3]: /es/observability_pipelines/search_syntax/logs/
[4]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.10
[5]: /es/observability_pipelines/destinations/kafka/
[6]: /es/observability_pipelines/processors/custom_processor/#custom-functions
[7]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.9.1
[8]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api
[9]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.9.0
[10]: /es/observability_pipelines/sources/opentelemetry/
[11]: /es/observability_pipelines/destinations/datadog_byoc_logs/
[12]: /es/observability_pipelines/destinations/google_pubsub/
[13]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.1
[14]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.0
[15]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.7.0
[16]: /es/observability_pipelines/destinations/http_client/
[17]: /es/observability_pipelines/processors/#processor-groups
[18]: /es/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers
[20]: /es/observability_pipelines/processors/sample/#group-by-example
[21]: /es/observability_pipelines/destinations/elasticsearch/#set-up-the-destination
[22]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.1
[23]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.0
[24]: /es/observability_pipelines/processors/custom_processor
[25]: /es/observability_pipelines/configuration/live_capture/
[27]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.12.0
[28]: /es/observability_pipelines/processors/enrichment_table/
[29]: /es/observability_pipelines/destinations/http_client/
[30]: /es/observability_pipelines/sources/mysql/
[31]: /es/observability_pipelines/configuration/secrets_management
[32]: /es/observability_pipelines/configuration/set_up_pipelines/?tab=metrics#set-up-a-pipeline-in-the-ui
[33]: /es/observability_pipelines/sources/datadog_agent/?tab=metrics
[34]: /es/observability_pipelines/destinations/datadog_metrics/?tab=secretsmanagement
[35]: /es/observability_pipelines/processors/filter/?tab=metrics
[36]: /es/observability_pipelines/processors/tag_allow_block_list/
[37]: /es/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management#upgrade-the-worker-4
[38]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.14.0
[39]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.2
[40]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.15.0
[41]: https://yaml.org/spec/1.1/
[42]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.14.1
[43]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.15.1
[44]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.16.0
[45]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.16.1
[46]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.17.0
[47]: /es/observability_pipelines/destinations/databricks/
[48]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.18.0
[49]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.19.0
[50]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.0
[51]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.2
[52]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.3
[53]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.4
[54]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.21.0