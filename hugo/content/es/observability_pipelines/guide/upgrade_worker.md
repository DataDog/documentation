---
aliases:
- /es/observability_pipelines/guide/upgrade_worker_2_7/
description: Conozca las nuevas funciones, mejoras y correcciones para las versiones
  2.7 a 2.26 de Worker.
disable_toc: false
title: Guía de actualización de Worker
---
## Descripción general {#overview}

<div class="alert alert-info">
Datadog recomienda actualizar Observability Pipelines Worker (OPW) con cada versión menor y de parche, o, como mínimo, mensualmente. <br><br> Actualizar a la versión principal más reciente de OPW y mantenerla actualizada es la única forma admitida de obtener las nuevas funcionalidades, correcciones y actualizaciones de seguridad de OPW.
</div>

Esta guía explica cómo actualizar a una versión específica de Worker y las actualizaciones para esa versión.

## Versión 2.26.2 del Worker {#worker-version-2262}

Para actualizar a la versión 2.26.2 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.26.2][73].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.26.2`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.26.2`.

La versión 2.26.2 del Worker le brinda acceso a lo siguiente:

#### Mejoras {#enhancements}

- Reducción del uso de red para la telemetría interna de Worker.

## Versión 2.26.1 del Worker {#worker-version-2261}

Para actualizar a la versión 2.26.1 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.26.1][71].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.26.1`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.26.1`.

La versión 2.26.1 del Worker le brinda acceso a lo siguiente:

#### Security {#security}

- Ahora, el Worker oculta los secretos en los errores de carga de la canalización que reporta a Datadog. Secretos
  referenciados en la configuración de la canalización no aparecen en los errores de implementación en Observability Pipelines
  UI.

#### Nuevas funciones {#new-features}

- El Custom Processor ahora incluye las funciones `log10` y `pow`. Por ejemplo, `10 * log10!(<mw>)` convierte milivatios a dBm y `pow!(10, <dbm> / 10)` convierte dBm a milivatios.

#### Mejoras {#enhancements-1}

- Los destinos ahora incluyen el número de intento en sus registros de reintento. Las fallas de reintentos continuos
  se registran como errores cada 10 intentos.
- La métrica `pipelines.stopped_total` ya está disponible. Indica la cantidad de veces que la instancia de Worker se ha detenido e incluye la etiqueta `reason` para identificar qué provocó el apagado.

#### Correcciones {#fixes}

- Live Capture ahora:
    - Limita cada solicitud de publicación a aproximadamente 4 MB de eventos capturados.
    - Continúa capturando cuando la ingesta rechaza un lote y descarta el lote rechazado con una advertencia.
      La captura solo falla si no se publica ningún lote.
    - Incluye el motivo del estado HTTP y la respuesta de la ingesta en los errores de publicación.
- El destino Datadog BYOC Logs ahora maneja eventos de registro que son demasiado grandes para una sola
  solicitud de las siguientes maneras:
    - Acorta el campo `message` para que el registro quepa dentro del límite de carga útil y añade
      `...TRUNCATED...`. El límite predeterminado es 5 MB. Para cambiarlo, establezca
      `DD_OP_DESTINATION_CLOUDPREM_MAX_PAYLOAD_BYTES`.
    - Los registros truncados se etiquetan con `truncated:single_line` y se incluyen en la
      métrica `datadog_logs_events_truncated_total`.
    - Descarta los registros que no tienen un campo de cadena `message` o cuyos otros campos por sí solos exceden el límite.
- El Worker ahora:
    - Mantiene su telemetría interna ejecutándose durante 5 segundos después de que se detienen las canalizaciones, por lo que las métricas de apagado
      como `pipelines.stopped_total` se envían a Datadog.
    - Mantiene las canalizaciones en ejecución cuando el archivo de configuración en su directorio de datos cambia, como
      cuando Kubernetes vuelve a aplicar la propiedad del volumen después de reiniciar un nodo.
    - Informa el error de la fuente fallida cuando el Worker detiene todas las fuentes porque una fuente falló o sufrió un fallo inesperado.
    - Ya no se bloquea con el error `Replacing unknown sink from fanout` cuando una recarga de configuración reutiliza un ID de componente para un tipo diferente de componente, o cuando una recarga fallida restaura un componente eliminado.
- Las fuentes habilitadas para TLS con `tls.verify_certificate: true` ya no provocan que falle la negociación TLS con clientes que reanudan una sesión TLS anterior. Anteriormente, el Worker rechazaba estas conexiones con un error `session id context uninitialized`.
- Para Custom Processor:
    - El registro de depuración `Event mapping aborted.` ahora incluye el motivo de la interrupción en su campo de error.
    - Las rutas de campo con índices de matriz fuera del rango `isize` devuelven un error en lugar de pasar silenciosamente a un índice diferente por desbordamiento.

## Versión 2.26.0 del Worker {#worker-version-2260}

Para actualizar a la versión 2.26.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.26.0][69].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.26.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.26.0`.

<div class="alert alert-warning"><strong>Cambios incompatibles:</strong> Worker 2.26.0 incluye los siguientes cambios incompatibles:<ul>
<li><strong>Procesadores Generate Metrics con campos de agrupación indexados</strong>: Las claves de etiqueta usan el último nombre de campo seguido de los índices finales de la matriz: <code>items[0]</code> produce <code>items_0</code>, <code>items[-1]</code> produce <code>items_-1</code>, y <code>http.items[2].status[4]</code> produce <code>status_4</code>. Actualice los paneles, monitores, alertas, cuadernos y otras consultas para usar las nuevas claves. Los puntos de datos históricos siguen estando disponibles bajo las claves antiguas.</li>
<li><strong>Histogramas recibidos sin una suma</strong>, como los de las fuentes de OpenTelemetry y Prometheus: Para estos histogramas, el destino de Prometheus omite la <code>_sum</code> serie. Actualice las consultas de Prometheus que calculan promedios para manejar una suma faltante. El destino Datadog Metrics estima la suma y el promedio a partir de los buckets del histograma. Las consultas de cuantiles de histograma no se ven afectadas.</li>
<li><strong>Scripts de Custom Processor que llaman a <code>to_unix_timestamp</code> con <code>unit: "nanoseconds"</code></strong>: Antes de actualizar, cambie estas llamadas a <code>to_unix_timestamp!(ts, unit: "nanoseconds")</code>. Con esta forma, una conversión fuera de rango detiene el procesamiento y descarta el evento. Para usar un valor de respaldo en su lugar, cambie las llamadas a <code>to_unix_timestamp(ts, unit: "nanoseconds") ?? 0</code> después de actualizar, porque esta forma no se compila en versiones anteriores de Worker. Las llamadas que usan otras unidades no se ven afectadas.</li>
</ul></div>

La versión 2.26.0 de Worker le brinda acceso a lo siguiente:

#### Security {#security-1}

- El destino Databricks (Zerobus) ahora verifica los certificados y los nombres de servidor para las solicitudes de esquema de OAuth y Unity Catalog.

#### Nuevas funciones {#new-features-1}

- El [procesador Spike Protection][70] ya está disponible.
- El Custom Processor ahora incluye una función `range` que crea un arreglo de enteros desde un inicio inclusivo hasta un final exclusivo, con un paso opcional.
- La fuente Datadog Agent ahora acepta el formato v3 de ingesta de series de métricas utilizado por Datadog Agent 7.81.0 y versiones posteriores.

#### Mejoras {#enhancements-2}

- El Custom Processor ahora:
    - Admite cambiar el tipo de una métrica entre contador y gauge asignando un valor a `.type`. El valor de la métrica se conserva.
    - Acepta `critical` así como `crit` en su función `to_syslog_severity`.
    - Utiliza menos memoria y tiene un mejor rendimiento al asignar objetos y arreglos.
    - Admite sus funciones de hash y cifrado, incluyendo `sha1`, `sha2`, `sha3`, `md5`, `hmac`, `xxhash`, `seahash`, `crc`, `encrypt`, `decrypt`, `encrypt_ip` y `decrypt_ip`.
    - Maneja líneas de comentarios consecutivas dentro de un bloque cuando los comentarios posteriores contienen caracteres que no son ASCII o comillas.
- El destino Datadog Metrics ahora utiliza la API de ingesta de métricas v3.
- El Worker ahora:
    - Agrega los conteos de eventos descartados agrupados en ventanas de 10 minutos y admite hasta 30,000 valores `group` distintos por Worker. Los conteos que exceden ese límite se siguen reportando, sin la etiqueta `group`.
    - Recopila métricas `pipelines.host.*` cada 5 segundos.
    - Conserva los valores de contador de la primera captura y las observaciones de histograma en su telemetría interna.
    - Informa `pipelines.component_cpu_usage_ns_total` para cada procesador, incluida la agregación después de los procesadores Generate Metrics.
    - Informa los eventos del ciclo de vida del búfer de disco en sus registros y el contador `pipelines.topology_disk_buffer_lifecycle_events_total`. El valor de la etiqueta `event` es `removed`, `replacement_unreferenced` o `unreferenced`.
- Los destinos basados en HTTP ahora aceptan caracteres UTF-8 en las rutas y consultas de puntos de conexión que no usan plantillas. Los nombres de servidor deben seguir siendo ASCII. Las plantillas de URI de destino de HTTP Client y OpenTelemetry todavía requieren ASCII.
- Las fuentes que utilizan marcos delimitados por caracteres o por nuevas líneas ahora informan los marcos descartados de gran tamaño como errores. Incrementan `pipelines.component_errors_total` con `error_code:decoder_frame_too_long`.

#### Correcciones {#fixes-1}

- El Worker ahora:
    - Inicializa la configuración de la canalización en sitios comerciales de Datadog fuera de US1.
    - Las solicitudes de configuración agotan su tiempo de espera después de 30 segundos, incluida la lectura de la respuesta, y se vuelven a intentar en la siguiente consulta periódica. El tiempo de espera para establecer la conexión es de 10 segundos.
    - Envía las credenciales de proxy configuradas para las solicitudes HTTP a los puntos de conexión de AWS a través de un proxy de reenvío HTTP. Las conexiones de proxy HTTPS permanecen sin cambios.
    - Envía un lote de destino completo inmediatamente cuando un evento llena el siguiente lote por sí mismo. Esto se aplica a los destinos de Databricks (Zerobus), Elasticsearch y New Relic.
- El procesador Generate Metrics ahora reenvía las métricas de distribución que llegan con más de 10 segundos de retraso cuando la agregación de métricas está habilitada, como ocurre de forma predeterminada. Los contadores tardíos todavía se descartan.
- El destino de Datadog Metrics ahora utiliza sumas de histograma exactas cuando están disponibles y son válidas.
- La fuente de Google Pub/Sub ahora:
    - Utiliza las autoridades de certificación del sistema de manera consistente con otros componentes.
    - Se cierra rápidamente mientras se conecta, reintenta o espera en una transmisión con confirmación habilitada.
    - Respeta la verificación TLS configurada, el nombre del servidor, el protocolo de aplicación y la configuración del proxy.
- La fuente de WebSocket ahora rechaza una respuesta de establecimiento de conexión que especifica un subprotocolo no solicitado.
- Las consultas de búsqueda ahora:
    - Ignoran prefijos, términos y frases de texto completo que no contienen palabras.
    - Coinciden con frases de manera consistente cuando otra frase ya ha coincidido con el mismo campo.
    - Coinciden con frases cuando una coincidencia parcial fallida se superpone con la coincidencia real.
    - Manejan consultas de rango con corchetes mixtos, incluido un límite superior inclusivo cuando se especifica.

#### Se eliminaron las métricas {#removed-metrics}

Se eliminan las siguientes métricas de estado del Worker. Actualice los paneles y monitores para usar los reemplazos:

- `pipelines.buffer_max_byte_size` → `pipelines.buffer_max_size_bytes`
- `pipelines.buffer_max_event_size` → `pipelines.buffer_max_size_events`
- `pipelines.source_buffer_max_byte_size` → `pipelines.source_buffer_max_size_bytes`
- `pipelines.source_buffer_max_event_size` → `pipelines.source_buffer_max_size_events`
- `pipelines.transform_buffer_max_byte_size` → `pipelines.transform_buffer_max_size_bytes`
- `pipelines.transform_buffer_max_event_size` → `pipelines.transform_buffer_max_size_events`
- `pipelines.internal_metrics_cardinality_total` → `pipelines.internal_metrics_cardinality`, un gauge del número actual de métricas

## Versión 2.25.2 del Worker {#worker-version-2252}

Para actualizar a la versión 2.25.2 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.25.2][67].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.25.2`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.25.2`.

La versión 2.25.2 del Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-2}

- Se corrigió una regresión introducida en el Worker 2.25.1 que podía impedir que los Workers en sitios comerciales de Datadog fuera de US1 cargaran sus canalizaciones después del inicio, lo que causaba errores `RC client wasn't initialized, will retry` repetidos.

## Versión 2.25.1 del Worker {#worker-version-2251}

Para actualizar a la versión 2.25.1 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.25.1][66].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.25.1`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.25.1`.

La versión 2.25.1 del Worker le brinda acceso a lo siguiente:

#### Security {#security-2}

- El destino de Microsoft Sentinel ahora verifica los certificados del servidor y los nombres de servidor para las solicitudes de token de Azure OAuth y las solicitudes de ingesta de registros.

#### Correcciones {#fixes-3}

- El destino de Microsoft Sentinel ahora:
    - Divide los lotes en varias solicitudes según sea necesario, de modo que cada solicitud se mantenga por debajo del límite de tamaño de solicitud de 1 MB de Azure.
    - Actualiza su token de Azure OAuth 60 segundos antes de que expire. Si una actualización falla, registra un error y vuelve a intentarlo cada 2 segundos hasta que la actualización tenga éxito, luego regresa a ese horario.
    - Agota el tiempo de espera de las solicitudes de token de Azure OAuth después de 30 segundos y las vuelve a intentar como cualquier otra actualización fallida.
- La etiqueta `rc_version` en las métricas de los componentes de la canalización y el campo `op_component.rc_version` en los registros de los componentes ahora informan la versión de configuración más reciente que ejecuta cada componente, incluidos los componentes que una actualización de la canalización no cambió.

## Versión 2.25.0 del Worker {#worker-version-2250}

Para actualizar a la versión 2.25.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.25.0][62].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.25.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.25.0`.

La versión 2.25.0 del Worker le brinda acceso a lo siguiente:

#### Security {#security-3}

- Se actualizó el almacén de certificados raíz de Mozilla incluido en el Worker. El almacén ya no incluye `emSign ECC Root CA - G3`, que se eliminó después del [compromiso del certificado intermedio de eMudhra][61], ni otras raíces en las que Mozilla ha dejado de confiar. Como resultado:
    - Los componentes que utilizan el almacén raíz integrado ya no confían en las cadenas de certificados a través de los intermediarios emSign que no son de confianza.
    - Las conexiones TLS a servidores cuyas cadenas de certificados terminan en una raíz eliminada fallan en la validación.
- Los mensajes de error que el Worker informa a Datadog cuando un componente falla ahora pasan por las mismas reglas de ocultamiento de datos confidenciales que los registros del Worker.

#### Nuevas funciones {#new-features-2}

- El [destino de Azure Data Explorer][68] ya está disponible.
- [Log Anomaly Detection][72] ya está disponible.

#### Mejoras {#enhancements-3}

- Los registros del procesador Grok Parser ahora incluyen:
    - Un campo `rule` que identifica la fuente de la regla.
    - Un campo `rule_kind` que indica si el tipo de regla es `custom` o `library`.

  Los registros de error de compilación de reglas ya no incluyen un campo `source` separado. Si filtra por `source`, filtre por `rule` en su lugar.
- El destino Datadog BYOC Logs ahora presenta un certificado de cliente mTLS rotado en la siguiente solicitud después de detectar la rotación. Anteriormente, el destino seguía usando el certificado antiguo hasta que las conexiones existentes alcanzaban su antigüedad máxima, lo que podía tomar hasta una hora. Las conexiones aún se restablecen al menos una vez por hora.
- La variable de entorno `DD_OP_REDUCE_WINDOW_SECS` ahora está disponible para establecer cuánto tiempo los procesadores Reduce agregan eventos antes de emitir un grupo.
- El procesador Sample ahora limita la memoria para rastrear grupos de muestreo a 128 MiB. Cuando alcanza el límite, elimina los grupos usados menos recientemente.
- El Worker ha mejorado el rendimiento de ingesta de registros.

#### Correcciones {#fixes-4}

- Cuando una fuente o destino falla, el Worker ahora registra el error subyacente, como `Address already in use`, en lugar de solo `the task completed with an error`. Si se produce un panic en un componente, los registros también incluyen el mensaje del panic.
- La fuente de Google Pub/Sub ahora se reconecta inmediatamente, sin registrar un error, cuando el servidor restablece una extracción en streaming.
- La fuente de Google Pub/Sub ahora confía en cada certificado en el archivo de CA configurado, no solo en el último.
- La fuente de OpenTelemetry ahora responde a las solicitudes gRPC para servicios no compatibles con el estado gRPC `UNIMPLEMENTED` en lugar de HTTP 404. Estas solicitudes ya no generan registros de error ni incrementan la métrica `component_errors_total`.
- El Worker ahora rastrea los registros internos descartados bajo carga alta en `component_discarded_events_total` con `intentional:false`. Esto afecta solo a los componentes internos (`component_id:_*`), no a los datos de la canalización.

## Versión 2.24.1 del Worker {#worker-version-2241}

Para actualizar a la versión 2.24.1 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.24.1][60].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.24.1`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.24.1`.

La versión 2.24.1 del Worker le brinda acceso a lo siguiente:

#### Security {#security-4}

- Se actualizó `rustls-webpki` a la versión 0.103.16. El Worker ahora rechaza cadenas de certificados que incluyan cualquiera de las [autoridades de certificación (CA) intermedias de eMudhra cuyas claves privadas fueron reportadas como comprometidas][61]. El Worker rechaza estas cadenas incluso cuando la CA raíz emisora es de confianza.

  Esta protección se aplica solo a los componentes que utilizan rustls. Los siguientes componentes utilizan el almacén de confianza de CA del sistema en su lugar:
    - Componentes que utilizan OpenSSL
    - La búsqueda de cuenta de AWS del destino de Amazon Security Lake
    - La fuente de Google Cloud Pub/Sub

  Para proteger los componentes que utilizan el almacén de confianza de CA del sistema:
    - **Imagen de contenedor**: No se requiere ninguna acción a menos que monte su propio paquete de CA o configure `SSL_CERT_FILE`. La imagen de contenedor del Worker desconfía de `emSign ECC Root CA - G3`.
    - **Paquetes APT y RPM**: Desconfíe de `emSign ECC Root CA - G3` hasta que su distribución proporcione un paquete `ca-certificates` actualizado. En distribuciones más antiguas, desconfíe también de `AAA Certificate Services`, que Debian y Ubuntu distribuyen como `Comodo_AAA_Services_root`.

#### Correcciones {#fixes-5}

- Se corrigió un problema en el que las consultas de búsqueda descartaban silenciosamente operandos en grupos `OR` que combinaban valores exactos con otros operandos, como comodines, rangos u otros atributos. Anteriormente, consultas como `@url:(nope OR aa* OR dummy/api/v1/check_run)` podían omitir eventos coincidentes debido al comodín.
- El Worker ahora trata los metacaracteres de regex (`.`, `+`, `^`, `$`, `(`, `[`, `|`) en los patrones de comodines de las consultas de búsqueda como caracteres literales. Por ejemplo, `@url:dummy\/api.v1*` ya no coincide con `dummy/api/v1/check_run`.

## Versión 2.24.0 del Worker {#worker-version-2240}

Para actualizar a la versión 2.24.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.24.0][59].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.24.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.24.0`.

La versión 2.24.0 del Worker le brinda acceso a lo siguiente:

#### Security {#security-5}

- El destino Datadog BYOC Logs ya no reenvía la clave de API de Datadog del Worker a BYOC Logs.

#### Mejoras {#enhancements-4}

- El procesador Enrichment Table:
    - Informa la métrica `enrichment_distinct_lookup_keys_total`, que es una estimación de las claves de búsqueda distintas sumadas en ventanas de 1 segundo.
    - Tiene un rendimiento mejorado durante los llenados de caché grandes.
    - Recarga los valores de la tabla cada 30 segundos. Si una recarga falla, el procesador sigue usando la última tabla válida hasta que una recarga tenga éxito.
    - Almacena en caché hasta 1 millón de filas de Reference Table localmente durante 1 hora, lo que mejora el manejo de tablas grandes.
    - Agrega una etiqueta `outcome` a su métrica de claves recuperadas para identificar intentos de búsqueda fallidos.
    - Tiene un tamaño de búfer predeterminado de 20,000 eventos o 100 MiB, y un máximo de 100,000 eventos.
- La opción de agregación de métricas del procesador Generate Metrics ahora está habilitada de forma predeterminada, por lo que las métricas generadas se agregan a menos que deshabilite la opción.
- El Worker ahora utiliza `aws-lc-rs` como proveedor de criptografía para conexiones TLS basadas en rustls. Los conjuntos de cifrado TLS negociados para algunas conexiones, como Databricks Zerobus, podrían diferir de versiones anteriores. Las conexiones TLS basadas en OpenSSL no se ven afectadas.
- El Custom Processor tiene un rendimiento mejorado, lo que incluye búsquedas de campos más eficientes y funciones de cadena más eficientes.
- El Worker ha mejorado el rendimiento durante el inicio de la configuración.
- La métrica `pipelines.quota_fill` ahora tiene una etiqueta `quota_name`. El Worker mantiene la etiqueta heredada `name` para compatibilidad con versiones anteriores.

#### Correcciones {#fixes-6}

- Las reglas de biblioteca del procesador Sensitive Data Scanner ahora utilizan grupos de captura de patrones para preservar el contexto no confidencial alrededor del valor capturado. Anteriormente, el Worker ignoraba los grupos de captura. Por ejemplo, la regla de dirección IPv4 ahora censura `172.16.0.1:80` como `<REDACTION TEXT>:80` en lugar de `<REDACTION TEXT>80`.
- Los procesadores Grok Parser, Parse JSON y Parse XML ahora registran una advertencia en lugar de un error cuando un campo no se puede analizar. El mensaje de error del procesador Parse JSON también nombra el campo que no se pudo analizar, en lugar de la palabra genérica `source`.
- Se solucionó un problema en el que volver a cargar componentes específicos después de actualizaciones de configuración podía hacer que se reiniciaran innecesariamente durante actualizaciones de configuración posteriores, restableciendo su estado.
- La fuente OpenTelemetry ahora conserva los nombres de eventos de registro OTLP nativos.
- La fuente Prometheus ahora identifica las métricas que terminan en `_total` como contadores.
- Se solucionó un problema con el filtro `keyvalue` en las funciones `parse_grok` y `parse_groks` del Custom Processor. El filtro ya no provoca un panic al procesar valores `NaN` sin comillas, como `ratio=NaN`.
## Versión 2.23.2 del Worker {#worker-version-2232}

Para actualizar a la versión 2.23.2 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.23.2][58].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.23.2`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.23.2`.

La versión 2.23.2 del Worker le brinda acceso a lo siguiente:

#### Mejoras {#enhancements-5}

- El destino de Datadog Logs ahora trunca los eventos de registro mayores a 900 KB. Anteriormente, los eventos de registro mayores al límite de tamaño de lote se descartaban en lugar de truncarse.

#### Correcciones {#fixes-7}

- Se corrigieron las imágenes de Docker para que el binario del conector genérico de secretos (`sgc`) sea ejecutable por el usuario de servicio `observability-pipelines-worker`.

## Versión 2.23.1 del Worker {#worker-version-2231}

Para actualizar a la versión 2.23.1 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.23.1][57].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.23.1`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.23.1`.

La versión 2.23.1 del Worker le brinda acceso a lo siguiente:

#### Security {#security-6}

- Se actualizó el binario del conector genérico de secretos (`sgc`) incluido a la versión que se distribuye con Datadog Agent 7.84.1, lo cual soluciona la CVE-2026-56854.

## Versión 2.23.0 del Worker {#worker-version-2230}

Para actualizar a la versión 2.23.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.23.0][56].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.23.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.23.0`.

<div class="alert alert-warning"><strong>Cambio importante:</strong> Este cambio afecta solo a los scripts de Custom Processor que utilizan las <code>contains_all</code>, <code>encode_key_value</code>, <code>encode_logfmt</code>, <code>ip_cidr_contains</code>, <code>join</code>, <code>parse_groks</code>, o <code>tally</code> funciones.<br><br>Estas funciones ahora verifican los tipos de elementos de sus argumentos de matriz cuando se compila el script. Pasar una matriz con el tipo de elemento incorrecto, como <code>join([1, 2, 3])</code>, ahora es un error de compilación en lugar de un error de tiempo de ejecución. Cuando el Worker puede confirmar que los elementos son del tipo correcto, el <code>!</code> sufijo ya no es necesario y activa una advertencia. Por ejemplo, use <code>join(["sources", "transforms", "sinks"], separator: ", ")</code> en lugar de <code>join!(["sources", "transforms", "sinks"], separator: ", ")</code>.</div>

La versión 2.23.0 del Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-3}

- El procesador Enrichment Table ahora admite archivos CSV y Reference Tables en canalizaciones de métricas.
- El procesador Custom Processor ahora admite la instrucción `break` para salir anticipadamente de un bucle `for_each`.

#### Mejoras {#enhancements-6}

- La fuente OpenTelemetry ahora limita las solicitudes simultáneas a 100 y el tiempo de procesamiento de solicitudes a 30 segundos de forma predeterminada. Los límites se aplican tanto a los puntos finales HTTP como gRPC. Las solicitudes que no se pueden manejar a tiempo reciben una respuesta reintentable. Utilice las variables de entorno `DD_OP_SOURCE_OTEL_MAX_CONCURRENT_REQUESTS` y `DD_OP_SOURCE_OTEL_REQUEST_TIMEOUT_SECS` para anular estos límites.
- El destino Databricks Zerobus ahora identifica al Worker en su encabezado `User-Agent`.
- Para Custom Processor:
    - Se ha mejorado el rendimiento general del procesador.
    - La función `for_each` ahora itera sobre colecciones directamente, lo que mejora el rendimiento y reduce el uso de memoria.
    - Las funciones `md5`, `sha1`, `sha2` y `sha3` ahora se ejecutan más rápido.

#### Correcciones {#fixes-8}

- Las rutas de los archivos de configuración, como los certificados TLS, las tablas de enriquecimiento y los archivos de credenciales de GCP, ahora se resuelven con respecto al `data_dir` establecido en `bootstrap.yaml`. Anteriormente, si `data_dir` se configuraba solo en `bootstrap.yaml` y no con la variable de entorno `DD_OP_DATA_DIR`, el Worker buscaba estos archivos en el directorio de datos predeterminado y rechazaba archivos válidos como faltantes.
- Las fuentes ahora incluyen la `peer_addr` remota en los registros de error de reconocimiento TCP y en los registros de error de conexión TLS.
- La función `uuid_v7` del Custom Processor ahora conserva la marca de tiempo proporcionada con precisión de milisegundos.

## Versión 2.22.0 del Worker {#worker-version-2220}

Para actualizar a la versión 2.22.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.22.0][55].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.22.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.22.0`.

<div class="alert alert-warning"><strong>Cambio importante:</strong> Este cambio afecta solo a los registros que contienen un <code>attributes</code> objeto de nivel superior y se envían a los destinos de Datadog Archives (Amazon S3, Google Cloud Storage y Azure Blob Storage). El cambio es particularmente relevante para los registros de la fuente OpenTelemetry, que comúnmente incluyen un <code>attributes</code> objeto de nivel superior.<br><br>Los destinos de Datadog Archives almacenan los atributos de registro no <a href="/logs/log_configuration/attributes_naming_convention/#reserved-attributes">reservados</a> dentro de un <code>attributes</code> objeto. A partir del Worker 2.22.0, si un registro ya tiene un <code>attributes</code> objeto, los destinos de Datadog Archives reutilizan ese objeto en lugar de anidarlo un nivel más profundo. Si utiliza consultas con la sintaxis <code>@attributes.&lt;field_name&gt;</code> en registros rehidratados desde un archivo de Observability Pipelines, utilice <code>@&lt;field_name&gt;</code> en su lugar.</div>

La versión 2.22.0 del Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-4}

- El procesador Aggregate ahora admite la agregación por tiempo de evento, que utiliza marcas de tiempo de métricas en lugar del tiempo de procesamiento. Un período de gracia configurable incluye las métricas que llegan tarde en su ventana de tiempo de evento.

#### Mejoras {#enhancements-7}

- El procesador Generate Metrics para canalizaciones de registros ahora tiene una opción para habilitar la agregación de métricas. Cuando la opción está habilitada, las métricas generadas se agrupan por marca de tiempo de evento en cubos de 1 segundo. Esto evita que la ingesta de métricas de Datadog descarte las métricas generadas dentro del mismo segundo debido al comportamiento de "último punto gana".
- Los errores de análisis de configuración para una fuente, procesador o destino ahora incluyen el ID y el tipo del componente, y el campo que causa el error cuando se puede determinar.
- Los errores de búsqueda en Reference Table causados por una solicitud HTTP fallida, como un tiempo de espera agotado, un error de DNS o un restablecimiento de conexión, ahora informan la causa subyacente en lugar de un mensaje `error sending request` genérico.
- El destino Datadog BYOC Logs ahora admite un límite de tamaño de carga útil HTTP configurable con la variable de entorno `DD_OP_DESTINATION_CLOUDPREM_MAX_PAYLOAD_BYTES`.
- Las siguientes fuentes ahora tienen habilitado TCP keepalive de forma predeterminada con un tiempo de espera de inactividad de 60 segundos, lo que ayuda a detectar conexiones interrumpidas cuando los clientes se desconectan sin enviar paquetes FIN o RST:
    - Datadog Agent
    - Fluentd y Fluent Bit
    - Logstash
    - OpenTelemetry (HTTP)
    - Socket (modo TCP)
    - Splunk HEC
    - Syslog (modo TCP)
- El procesador Enrichment Table (CSV o archivo) ya no copia la tabla completa para cada lote de eventos, lo que reduce el uso de memoria y CPU para tablas de enriquecimiento grandes.

#### Correcciones {#fixes-9}

- El destino Syslog ya no apaga el Worker cuando el campo `timestamp` de un registro no es un valor de marca de tiempo, como una cadena JSON. Estos registros ahora utilizan la hora UTC actual en el encabezado syslog.
- El decodificador de tramas `chunked_gelf` ahora limita a 128 MiB la carga útil almacenada en búfer entre mensajes incompletos. Anteriormente, un remitente no autenticado podía agotar la memoria enviando fragmentos de mensajes que nunca completaba, especialmente con la fuente Socket en modo UDP.
- La fuente Logstash ahora rechaza tramas más grandes que el máximo configurado en lugar de almacenarlas en búfer indefinidamente. Anteriormente, un remitente podía declarar una trama extremadamente grande y obligar a la fuente a mantener sus bytes en la memoria hasta que se agotara la memoria.
- La fuente Splunk TCP ahora trunca las tramas que exceden el límite `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` en lugar de descartar los eventos. Esto coincide con el comportamiento `TRUNCATE` de Splunk.
- Se corrigió un problema en el decodificador de tramas `chunked_gelf` que causaba que la fuente se apagara cuando llegaba un mensaje de un byte y el registro de nivel de seguimiento estaba habilitado para el decodificador. El decodificador ahora rechaza estos mensajes, al igual que hace con otras cargas útiles mal formadas.
- Se corrigió un problema por el que el componente que informaba sobre el uso del búfer interno seguía activo después de que el búfer dejara de existir, lo que hacía que siguiera publicando métricas obsoletas del búfer anterior bajo el mismo `buffer_id` que su reemplazo. Las métricas de un búfer que se eliminó, en lugar de reemplazarse, ahora también caducan según `expire_metrics_secs`; antes, la publicación continua de esos valores impedía que caducaran.
- Se corrigieron los siguientes problemas con los límites del decodificador de tramas `chunked_gelf`:
    - `pending_messages_limit` se aplicaba a cada fragmento en lugar de solo a los mensajes nuevos. Después de alcanzar el límite, se rechazaban los fragmentos de mensajes que ya estaban pendientes, por lo que esos mensajes nunca podían completarse.
    - Descartar un mensaje por exceder `max_length` dejaba su tarea de tiempo de espera en ejecución, por lo que `pending_messages_limit` limitaba la cantidad de mensajes pendientes pero no la cantidad de tareas de tiempo de espera activas.
- La configuración del punto de conexión FIPS ahora se aplica a los clientes STS AssumeRole. Cuando `AWS_USE_FIPS_ENDPOINT=true` está configurado, el Worker utiliza puntos de conexión FIPS, como `sts-fips.<region>.amazonaws.com`, para las operaciones de STS, así como para el cliente de servicio principal.
- Cuando una carga útil de solicitud comprimida no se puede descomprimir, el modo gRPC de la fuente OpenTelemetry ahora incluye el error subyacente en lugar del mensaje genérico `reached impossible error during decompressor finalization`.

#### Se eliminaron las métricas {#removed-metrics-1}

- Se eliminaron las métricas gauge en desuso `pipelines.buffer_byte_size` y `pipelines.buffer_events`. Use `pipelines.buffer_size_bytes` y `pipelines.buffer_size_events` en su lugar.

## Versión 2.21.0 de Worker {#worker-version-2210}

Para actualizar a la versión 2.21.0 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.21.0][54].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.21.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.21.0`.

La versión 2.21.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-5}

- Para canalizaciones de métricas:
    - La [fuente de Prometheus][63] ya está disponible.
    - El [destino de Prometheus][64] ya está disponible.
    - El [destino de OpenTelemetry][65] ya está disponible.
- Los destinos de Datadog Archives (Amazon S3, Google Cloud Storage y Azure Blob Storage) ahora admiten una opción `compression` configurable (`gzip` o `zstd`).
- El procesador Remap to OCSF ahora incluye:
    - El mapeo OCSF de AWS Config Rules.
    - La función de mapeo OCSF `concat_strings`, que une las representaciones de cadena de múltiples campos de origen o valores constantes.
- El destino Splunk HEC ahora admite una opción `endpoint_target` (`event` o `raw`) para determinar a qué punto de conexión de Splunk HEC se envían los eventos.

#### Mejoras {#enhancements-8}

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

#### Correcciones {#fixes-10}

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

#### Correcciones {#fixes-11}

- La fuente Splunk TCP aplicaba anteriormente una longitud máxima de trama fija de 10 000 bytes. El Worker rechazaba eventos más grandes y registraba advertencias. La fuente ya no limita la longitud de la trama de forma predeterminada. Para evitar un consumo de memoria ilimitado, utilice la variable de entorno `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` para establecer una longitud máxima de trama.




## Versión 2.20.3 del Worker {#worker-version-2203}

Para actualizar a la versión 2.20.3 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.20.3][52].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.20.3`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.20.3`.

La versión 2.20.3 del Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-12}

- Se corrigió el listener gRPC de la fuente OpenTelemetry para anunciar `h2` sobre ALPN cuando TLS está habilitado. Anteriormente, los clientes gRPC que se conectaban a través de TLS podían fallar al establecer una conexión.

## Versión 2.20.2 del Worker {#worker-version-2202}

Para actualizar a la versión 2.20.2 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.20.2][51].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.20.2`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.20.2`.

La versión 2.20.2 del Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-13}

- Se corrigió un problema por el cual los valores no finitos (NaN o Infinity) de gauge, delta de contador, delta-suma de histograma y los histogramas de conteo cero podían serializarse en cargas útiles de métricas OTLP con formato incorrecto. Estos valores ahora se descartan antes de la codificación OTLP.

## Versión 2.20.0 del Worker {#worker-version-2200}

Para actualizar a la versión 2.20.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.20.0][50].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.20.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.20.0`.

La versión 2.20.0 del Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-6}

- Las fuentes OpenTelemetry y Splunk HEC ahora admiten la recarga en caliente de certificados TLS, por lo que las rotaciones de certificados se aplican sin reiniciar el Worker.

#### Mejoras {#enhancements-9}

- Se ha mejorado el rendimiento del procesador Split Array.
- La fuente HTTP/S Server ahora utiliza una coincidencia que no distingue entre mayúsculas y minúsculas para el campo del nombre del encabezado cuando configura tokens de autenticación.
- La fuente Splunk HEC ahora acepta una lista opcional de tokens para autenticar eventos.

#### Correcciones {#fixes-14}

- El procesador Add Fields ahora incrementa la métrica `component_errors_total` cuando no logra actualizar un evento.
- Se corrigió el problema de verificación del nombre de host del certificado TLS para destinos con un nombre de servidor configurado, de modo que el nombre del servidor se utilice para la verificación.

## Versión 2.19.0 de Worker {#worker-version-2190}

Para actualizar a la versión 2.19.0 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.19.0][49].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.19.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.19.0`.

La versión 2.19.0 de Worker le brinda acceso a lo siguiente:

#### Mejoras {#enhancements-10}

- Se ha añadido una opción TLS `server_name` a los destinos BYOC Logs, HTTP Client, Socket y Syslog, y a la fuente HTTP Client. Esta anula el SNI y el nombre de host del certificado utilizados para el protocolo de enlace TLS, lo cual es aplicable cuando la dirección a la que se establece la conexión no coincide con el nombre común o el nombre alternativo del sujeto del certificado.
- La fuente TCP de Splunk ahora admite la recarga en caliente de certificados TLS, por lo que las rotaciones de certificados se aplican sin reiniciar el Worker.
- El destino BYOC Logs ahora admite la recarga en caliente de archivos mTLS.
- El Worker ahora admite un límite configurable para el apagado controlado.
- El destino de Amazon S3 ahora admite el cifrado SSE-KMS utilizando las opciones `server_side_encryption` y `ssekms_key_id`.

#### Correcciones {#fixes-15}

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

#### Nuevas funciones {#new-features-7}

- El comando `run` ahora admite una opción `--log-format`, también configurable mediante la variable de entorno `DD_OP_LOG_FORMAT`, para seleccionar el formato de los propios registros `stdout` y `stderr` de Worker. El `text` predeterminado conserva la salida existente legible para las personas, y `json` emite registros JSON estructurados que se pueden seguir y procesar directamente sin reglas de parseo adicionales.
- El procesador Tag Cardinality Limit ahora admite una opción `tracking_mode`. `exact_fingerprint` rastrea los valores de las etiquetas exactamente usando huellas digitales de 64 bits, lo que utiliza menos memoria que el método anterior de almacenar valores sin procesar, y `probabilistic` usa un filtro de Bloom para un uso de memoria aún menor a cambio de un falso positivo ocasional. El modo probabilístico acepta un campo `false_positive_rate`, que tiene como valor predeterminado `0.001` (0.1%).
- La fuente WebSocket está disponible para ingerir registros desde un punto de conexión de WebSocket, con soporte para estrategias de autenticación `none`, `basic`, `bearer` y `custom`, así como TLS.
- Un nuevo procesador `generate_metrics` enruta las métricas a cualquier destino de métricas compatible. Datadog recomienda usarlo en lugar del procesador `generate_datadog_metrics` existente, aunque el uso de este último no se ve afectado.

#### Mejoras {#enhancements-11}

- Se ha añadido soporte mTLS al destino BYOC Logs.
- La opción `measure_cpu_usage` ahora está habilitada, por lo que `pipelines.component_cpu_usage_ns_total` siempre se emite para los siguientes procesadores de registros: Custom Processor, Sensitive Data Scanner, Grok Parser, Parse JSON, Parse XML, OCSF Mapper, Enrichment Table, Reduce, Dedupe, Split Array y Throttle; y los siguientes procesadores de métricas: Aggregate y Tag Cardinality Limit.
- Los errores de configuración de la canalización ahora incluyen el ID del componente que causó la falla. Esto facilita la identificación de qué fuente, procesador o destino necesita corrección. Para los procesadores compuestos por múltiples bloques, como el Custom Processor, Generate Metrics y OCSF Mapper, el error también identifica qué bloque individual falló, incluyendo su posición y, cuando el bloque tiene uno, su nombre.
- Las métricas de la canalización ahora están etiquetadas con el nombre de la canalización usando `pipeline_name:<NORMALIZED_PIPELINE_NAME>`.

#### Correcciones {#fixes-16}

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

<div class="alert alert-warning"><strong>Cambio incompatible:</strong> El procesador Generate Metrics ahora emite el nombre del campo sin procesar como la clave de etiqueta para <code>group_by</code> entradas que contienen caracteres fuera de <code>[a-zA-Z0-9_@]</code>, tales como <code>http.status_code</code> y <code>kube-cronjob</code>. Anteriormente, el procesador agregaba un guion bajo final (<code>_</code>) a las claves de etiqueta que contenían esos caracteres. Por ejemplo, la clave de etiqueta <code>http.status_code</code> se convirtió en <code>http.status_code_</code> porque la clave contenía un punto (<code>.</code>).<br><br>Después de actualizar a Worker 2.17, actualice cualquier panel, monitor, alerta o cuaderno que utilice claves de etiqueta con el guion bajo final para usar esas claves de etiqueta sin el guion bajo. Los puntos de datos históricos siguen siendo consultables bajo la clave de etiqueta antigua. Pipelines cuyas <code>group_by</code> entradas que solo usan nombres que coinciden con <code>[a-zA-Z0-9_@]+</code> no se ven afectadas.</div>

La versión 2.17.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-8}

- Para Custom Processor:
    - Los literales de cadena VRL ahora admiten `\u{HEX}` secuencias de escape Unicode. Cualquier valor escalar Unicode válido puede expresarse, como `"hello\u{1F30E}world"`. Las secuencias no válidas, como llaves vacías, dígitos que no son hexadecimales, puntos de código suplentes o valores superiores a U+10FFFF, se informan como errores en tiempo de compilación.
    - La función `parse_regex` ahora acepta patrones de regex dinámicos (variables y expresiones en tiempo de ejecución), de manera consistente con `parse_regex_all`. Cuando el patrón es un literal, la información del tipo de retorno permanece precisa según los grupos de captura con nombre.

#### Mejoras {#enhancements-12}

- Se ha mejorado el rendimiento del procesador Generate Metrics para reducir la sobrecarga de CPU al usar etiquetas de `group_by`.
- Para el procesador personalizado, se ha mejorado el rendimiento de `parse_regex_all` mediante la reutilización de la regex compilada en todas las invocaciones.

#### Correcciones {#fixes-17}

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

#### Correcciones {#fixes-18}

- El Worker ya no falla al obtener configuraciones en centros de datos que no son US1.

---

## Versión 2.16.0 del Worker {#worker-version-2160}

Para actualizar a la versión 2.16.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.16.0][44].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.16.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.16.0`.

La versión 2.16.0 del Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-9}

- Destino [Databricks Zerobus][47]: envíe datos de registro a tablas de Databricks Unity Catalog utilizando el servicio de ingesta Zerobus. El destino de Databricks admite autenticación OAuth 2.0, obtención automática de esquemas de Unity Catalog y codificación por lotes de protobuf.
- La fuente Splunk HEC ahora admite el enriquecimiento de eventos de registro entrantes utilizando el decodificador VRL.
- El destino de Amazon S3 ahora admite codificación por lotes de Apache Parquet con definiciones de esquema flexibles y compresión configurable (Snappy, ZSTD, GZIP, LZ4 o ninguna).
- Para Custom Processor:
    - La función `encode_proto` ahora acepta un argumento `allow_lossy_string_coercion`.
    - La codificación Protobuf ahora fuerza tipos escalares compatibles al tipo de campo de destino: se aceptan enteros y cadenas para campos `bool`, y se aceptan enteros para campos `float` o `double`.

#### Mejoras {#enhancements-13}

- Se ha añadido soporte para mTLS a las siguientes fuentes: Fluent, Logstash, OpenTelemetry (registros y métricas), Splunk HEC, Splunk TCP, HTTP/S Server, Socket y Syslog.
- Los eventos de Live Capture ahora incluyen el UUID del Worker que envió el evento.
- El búfer del procesador Reference Tables ahora emite las métricas gauge `buffer_size_events` y `buffer_size_bytes` para reemplazar las métricas obsoletas `buffer_events` y `buffer_byte_size`. Las métricas obsoletas todavía se envían por compatibilidad con versiones anteriores.
- El destino Datadog Logs ahora admite anulaciones del punto de conexión de registros de cada sitio mediante el campo `logs-sites` del archivo bootstrap o la variable de entorno `DD_OP_LOGS_<SITE>`, como `DD_OP_LOGS_US1`. Las variables de entorno tienen prioridad sobre el archivo de arranque.
- Las fuentes ahora registran estas métricas de distribución:
    - `source_send_latency_seconds`: El tiempo que le toma a la fuente enviar un fragmento de eventos al siguiente componente.
    - `source_send_batch_latency_seconds`: El tiempo que le toma a la fuente enviar un lote, el cual puede contener múltiples fragmentos de eventos, al siguiente componente.

#### Correcciones {#fixes-19}

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

#### Nuevas funciones {#new-features-10}

- El Custom Processor ahora admite las funciones `to_entries` y `from_entries` para convertir entre objetos y arreglos de pares clave-valor (estilo jq).

#### Mejoras {#enhancements-14}

- El destino Datadog Metrics ahora utiliza compresión zstd para los puntos de conexión de la Datadog API v2 y de sketches, lo que reduce el uso de CPU, memoria y ancho de banda.
- La función `flatten` del Custom Processor ahora acepta un argumento opcional `except` para excluir claves específicas del aplanamiento.

#### Correcciones {#fixes-20}

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

#### Nuevas funciones {#new-features-11}

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

#### Mejoras {#enhancements-15}

- La fuente de Amazon S3 ahora acepta datos comprimidos.
- El destino de Elasticsearch se ha actualizado con nuevas opciones: `auto_routing`, `compression`, `id_key`, `pipeline`, `request_retry_partial`, `sync_fields` y `tls`.
- Ahora se admite el mapeo de campos de origen de matriz de objetos a destinos de matriz de objetos OCSF.
- El destino de Datadog Metrics ahora utiliza de forma predeterminada el punto de conexión de series v2 de Datadog (`/api/v2/series`).
- La opción GeoIP del procesador Enrichment Table ahora incluye un campo de red que contiene la red CIDR asociada con el resultado de la búsqueda. El campo de red está disponible para todos los tipos de base de datos (City, ISP/ASN, Connection-Type, Anonymous-IP).
- El Custom Processor ahora tiene una función `encode_csv` que codifica una matriz de valores en una cadena con formato CSV. Esta es la inversa de la función `parse_csv` y admite un delimitador opcional de un solo byte (el valor predeterminado es `,`).
- Los nombres de campo ahora admiten `.`, como `foo."bar.baz"`.

#### Correcciones {#fixes-21}

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

#### Correcciones {#fixes-22}

- Se corrigió la forma en que se maneja una ruta vacía en un campo de procesador. Por ejemplo, cómo el procesador Parse JSON maneja el `Field to parse JSON on` con el valor `.`.

---

## Versión 2.14.0 del Worker {#worker-version-2140}

Para actualizar a la versión 2.14.0 del Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.14.0][38].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.14.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.14.0`.

La versión 2.14.0 del Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-12}

- Se han agregado asignaciones OCSF para eventos de Palo Alto Networks Threat.
- La fuente Database se ha actualizado con cambios relacionados con el tiempo de espera.
- Se agregaron las métricas internas de `component_latency_seconds` histograma y `component_latency_mean_seconds` gauge. Las métricas se basan en el tiempo que un evento pasa en un solo procesador, incluido el búfer del procesador.

#### Mejoras {#enhancements-16}

- El reporte de errores de Enrichment Table ahora utiliza métricas de Reference Tables para reducir la cantidad de registros similares.
- El destino Splunk HEC ahora admite la extracción de campos de índice de los eventos.
- El asignador OCSF ahora tiene una opción para conservar los campos no coincidentes.
- Para el procesador Enrichment Table, se ha aumentado el tiempo de retención en la caché local de las entradas que no se encuentran en una Reference Table. El tiempo de retención es ahora de 30 minutos, en lugar de 10 minutos.
- Se han mejorado las comprobaciones de validación de SQL de Database Source.
- La biblioteca de Sensitive Data Scanner ahora cuenta con reglas de escaneo predeterminadas nuevas y actualizadas para PII, credenciales y datos financieros. También se han corregido errores menores.
- El comando `observability-pipelines-worker top` tiene nuevos atajos de teclado para desplazarse, ordenar y filtrar.
- El destino Datadog Logs se ha actualizado para usar compresión `zstd` de forma predeterminada en lugar de no usar compresión.
- La variable de entorno para la dirección de la fuente Datadog Agent ahora es configurable.

#### Correcciones {#fixes-23}

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

#### Correcciones {#fixes-24}

- Se corrigieron las consultas `exists` y `missing` para que coincidan con los objetos.

---

## Versión 2.13.1 de Worker {#worker-version-2131}

Para actualizar a la versión 2.13.1 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.13.1][22].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.13.1`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.13.1`.

La versión 2.13.1 de Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-25}

- Todos los procesadores se actualizaron para gestionar sin fallas las consultas de filtro con una sintaxis incorrecta.

---

## Versión 2.13.0 de Worker {#worker-version-2130}

Para actualizar a la versión 2.13.0 de Worker:

- Docker: Ejecute el comando `docker pull` para la [imagen 2.13.0][23].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.13.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.13.0`.

La versión 2.13.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-13}

- [Custom Processor][24] para métricas: utilice VRL para transformar eventos de métricas.
- [Secrets Management][31]: Observability Pipelines puede recuperar secretos mediante Datadog Secrets Management.
- [Live Capture][25] está disponible para pipelines de métricas.
- El procesador [Enrichment Tables][28] puede utilizar conjuntos de datos de Reference Tables.

#### Mejoras {#enhancements-17}

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

#### Correcciones {#fixes-26}

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

#### Nuevas funciones {#new-features-14}

- [Destino HTTP][29] para pipelines de métricas: enruta las métricas a un punto de conexión de un cliente HTTP.
- [MySQL Source][30]: Envía registros de una base de datos MySQL a Observability Pipelines.

#### Mejoras {#enhancements-18}

- La fuente y el destino HTTP Client se han actualizado para que pueda establecer una estrategia de autorización personalizada.
- El procesador de filtro de métricas se actualizó para filtrar métricas en `kind` y `value`.
- Los grupos de procesadores que enrutan y procesan solo eventos específicos se han actualizado para reducir la sobrecarga de procesamiento.
- La fuente del Datadog Agent se ha actualizado para admitir tiempos de espera, lo que incrementa las métricas `component_timed_out_events_total` y `component_timed_out_requests_total`.

#### Correcciones {#fixes-27}

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
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.11.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.11.0`.

<div class="alert alert-info">Para las canalizaciones que ejecutan Worker 2.10 o versiones anteriores:<br>- Después de actualizar a Worker 2.11, sus consultas de filtro de procesador continúan ejecutando la sintaxis de búsqueda heredada.<br>- Debe actualizar manualmente sus consultas de filtro a la nueva Search Syntax.<br>- Luego, habilite el interruptor <b>New Search Syntax</b> en la interfaz de usuario, o establezca <code>use_legacy_search_syntax</code> a <code>false</code> usando la API o Terraform.<br><br>Consulte <a href="https://docs.datadoghq.com/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/">Actualice sus consultas de filtro a la nueva Search Syntax</a> para obtener más información.</a></div>

La versión 2.11.0 le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-15}

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
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.10.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.10.0`.

La versión 2.10.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-16}

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

#### Mejoras {#enhancements-19}

- Se ha mejorado el rendimiento de Custom Processor.
- Los Workers se han actualizado para usar su propia copia de la clave de Datadog para la autenticación, ignorando cualquier clave enviada por el Datadog Agent para evitar el uso de claves obsoletas.
- Se ha mejorado la notificación de errores al validar el esquema JSON en funciones personalizadas que utilizan la función `validate_json_schema`.

#### Correcciones {#fixes-28}

- Se ha corregido la lógica de filtrado a nivel de grupo para excluir los registros correctos.

---

## Versión 2.9.1 de Worker {#worker-version-291}

Para actualizar a la versión 2.9.1 de Worker:

- Docker: ejecute el comando `docker pull` para descargar la [imagen 2.9.1][7].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.9.1`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.9.1`.

La versión 2.9.1 de Worker le brinda acceso a lo siguiente:

#### Correcciones {#fixes-29}

- El destino de Microsoft Sentinel se ha limitado a tamaños de lote de 1 MB al leer registros mediante Azure Logs Ingestion API. El tamaño límite se determinó según la [documentación de Azure][8].

---

## Versión 2.9.0 de Worker {#worker-version-290}

Para actualizar a la versión 2.9.0 de Worker:

- Docker: ejecute el comando `docker pull` para descargar la [imagen 2.9.0][9].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.9.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.9.0`.

La versión 2.9.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-17}

- [Fuente de OpenTelemetry Collector][10]: Recopile registros de su OpenTelemetry Collector en Observability Pipelines.
- [Destino de Datadog BYOC Logs][11]: Envíe registros al destino de Datadog BYOC Logs.
- [Destino de Google Pub/Sub][12]: Envíe registros desde Observability Pipelines al sistema de mensajería de Google Pub/Sub.
- La función personalizada `haversine` para calcular la distancia de haversine y el rumbo.

#### Mejoras {#enhancements-20}

- Los registros internos de Observability Pipelines Worker se han actualizado para ocultar parcialmente la clave de API de Datadog (solo los primeros 28 caracteres), para ayudar a investigar problemas relacionados con la clave de API.
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

#### Correcciones {#fixes-30}

- Se ha corregido la estrategia de autorización de la fuente HTTP Client.

---

## Versión 2.8.0 de Worker {#worker-version-280}

Para actualizar a la versión 2.8.0 de Worker:

- Docker: Ejecute el comando `docker pull` para descargar la [imagen 2.8.0][14].
- Kubernetes: Consulte el [chart de Helm][2] y [Actualizar el Worker][37].
- APT: Ejecute el comando `apt-get install observability-pipelines-worker=2.8.0`.
- RPM: Ejecute el comando `sudo yum install observability-pipelines-worker-2.8.0`.

La versión 2.8.0 de Worker le brinda acceso a lo siguiente:

#### Nuevas funciones {#new-features-18}

- Todas las fuentes y destinos se han actualizado para admitir variables de entorno personalizadas.

#### Mejoras {#enhancements-21}

- La [estrategia de indexación][21] del destino Elasticsearch se ha actualizado para incluir flujos de datos.
- El destino HTTP Client admite sintaxis de plantilla.

#### Correcciones {#fixes-31}

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

#### Nuevas funciones {#new-features-19}

- [El destino HTTP Client][16]: Envíe registros a un cliente HTTP, como una plataforma de registro o un SIEM.
- [Processor Groups][17]: Organice sus procesadores en grupos lógicos para ayudarle a administrarlos.
- Los destinos disponen de opciones de almacenamiento en búfer en [disco y memoria][18].

#### Mejoras {#enhancements-22}

- La función personalizada `decode_lz4` se ha actualizado para admitir la descompresión de datos de trama `lz4`.
- Los campos de prefijo de los destinos de archivo de Azure Blob Storage y Google Cloud Storage admiten sintaxis de plantilla.
- El destino de Splunk HEC tiene una variable de entorno personalizada.
- El procesador de muestra tiene un [parámetro `group_by`][20] opcional.

#### Correcciones {#fixes-32}

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
[55]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.22.0
[56]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.23.0
[57]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.23.1
[58]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.23.2
[59]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.24.0
[60]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.24.1
[61]: https://trust.datadoghq.com/?tcuUid=301abdf4-0ad2-4db0-9843-c447a0714bfe
[62]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.25.0
[63]: /es/observability_pipelines/sources/prometheus/
[64]: /es/observability_pipelines/destinations/prometheus/
[65]: /es/observability_pipelines/destinations/opentelemetry/metrics/
[66]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.25.1
[67]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.25.2
[68]: /es/observability_pipelines/destinations/azure_data_explorer/
[69]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.26.0
[70]: /es/observability_pipelines/processors/spike_protection/
[71]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.26.1
[72]: /es/observability_pipelines/log_anomaly_detection/
[73]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.26.2