---
code_lang: Python
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: Código fuente
  text: Código fuente
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: Sitio externo
  text: Documentos API
- link: /tracing/trace_collection/trace_context_propagation/python/
  tag: Documentación
  text: Propagación del contexto de rastreo
- link: tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
- link: tracing/
  tag: Documentación
  text: Uso avanzado
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentación
  text: Configuraciones de variables de entorno de OpenTelemetry
title: Configuración de la librería de rastreo de Python
type: lenguaje de código múltiple
---

Después de configurar la librería de rastreo con tu código y de configurar el Agent para recopilar datos de APM, también puedes configurar la librería de rastreo como prefieras e incluir la configuración del [etiquetado unificado de servicios][1].

Cuando se utiliza **ddtrace-run**, se pueden utilizar las siguientes [opciones de variables de entorno][2]:

`DD_TRACE_DEBUG`
: **Por defecto**: `false`<br>
Habilita el registro de depuración en el rastreador.

`DD_PATCH_MODULES`
: Anula los módulos que tienen parches para la ejecución de esta aplicación. Sigue el formato: `DD_PATCH_MODULES=module:patch,module:patch...`.

Se recomienda utilizar `DD_ENV`, `DD_SERVICE` y `DD_VERSION` para configurar `env`, `service` y `version` para tus servicios. Para obtener recomendaciones sobre la configuración de estas variables de entorno, consulta la documentación sobre [etiquetado unificado de servicios][1].

`DD_ENV`
: Define el entorno de la aplicación , por ejemplo: `prod`, `pre-prod`, `staging`. Obtén más información sobre [cómo configurar tu entorno][3]. Disponible en la versión 0.38 o posterior.

`DD_SERVICE`
: El nombre de servicio que se utilizará para esta aplicación. El valor se pasa cuando se configura el middleware para integraciones de web frameworks como Pylons, Flask o Django. Para rastrear sin una integración web, se recomienda definir el nombre del servicio en código ([por ejemplo, consulta estos documentos de Django][4]). Disponible en la versión 0.38 o superior.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Por defecto**: `tracecontext,Datadog`<br>
Estilos de propagación a utilizar al inyectar cabeceras de rastreo. Por ejemplo, utiliza `DD_TRACE_PROPAGATION_STYLE_INJECT=Datadog,B3` para inyectar cabeceras con los formatos de Datadog y B3.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Por defecto**: Valor de `DD_TRACE_PROPAGATION_STYLE_INJECT` (`tracecontext,Datadog`)<br>
Estilos de propagación a utilizar cuando se extraen cabeceras de rastreo. Cuando se dan múltiples valores, se utiliza la primera coincidencia de cabecera encontrada. El orden de coincidencia se basa en el orden de los valores dados. Por ejemplo, `DD_TRACE_PROPAGATION_STYLE_EXTRACT=B3,Datadog` busca primero las cabeceras de `B3` y sólo utiliza las de `Datadog`, si las primeras no están disponibles.

`DD_SERVICE_MAPPING`
: Define asignaciones de nombres de servicios para permitir renombrar servicios en trazas, por ejemplo: `postgres:postgresql,defaultdb:postgresql`. Disponible en la versión 0.47 o posterior.

`DD_VERSION`
: Define la versión de la aplicación, por ejemplo: `1.2.3`, `6c44da20`, `2020.02.13`. Disponible en la versión 0.38 o posterior.

`DD_TRACE_SAMPLE_RATE`
: Activa el control del volumen del rastreo.

`DD_TRACE_SAMPLING_RULES`
: **Por defecto**: `[]`<br>
Una matriz JSON de objetos. Cada objeto debe tener una `"sample_rate"`. Los campos `"name"` y `"service"` son opcionales. El valor de `"sample_rate"` debe estar comprendido entre `0.0` y `1.0` (inclusive). Las reglas se aplican en el orden configurado para determinar la frecuencia de muestreo de la traza.

`DD_TRACE_RATE_LIMIT`
: Número máximo de tramos a muestrear por segundo, por cada proceso Python. Por defecto es `100` cuando `DD_TRACE_SAMPLE_RATE` está configurada. De lo contrario, delega la limitación de frecuencias al Datadog Agent.

`DD_SPAN_SAMPLING_RULES`
: **Por defecto**: `[]`<br>
Una matriz JSON de objetos. Las reglas se aplican en el orden configurado para determinar la frecuencia de muestreo de tramos. El valor de `sample_rate` debe estar comprendido entre 0,0 y 1,0 (inclusive).
Para obtener más información, consulta [Mecanismos de consumo][5].<br>
**Ejemplo:**<br>
  - Define la frecuencia de muestreo de tramos en 50% para el nombre de servicio `my-service` y de operación `http.request`, hasta 50 trazas por segundo: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`


`DD_TAGS`
: Una lista de etiquetas por defecto que se añadirá a cada tramo y perfil, por ejemplo: `layer:api,team:intake,key:value`. Disponible en la versión 0.38 o posterior.

`DD_TRACE_HEADER_TAGS`
: **Por defecto**: `null`<br>
Lista separada por comas de nombres de cabecera que se informan en el tramo raíz como etiquetas. Por ejemplo, `DD_TRACE_HEADER_TAGS="User-Agent:http.user_agent,Referer:http.referer,Content-Type:http.content_type,Etag:http.etag"`.

`DD_TRACE_ENABLED`
: **Por defecto**: `true`<br>
Habilita la instrumentación de web frameworks y bibliotecas. Cuando es `false`, el código de la aplicación no genera trazas.

`DD_AGENT_HOST`
: **Por defecto: `localhost` <br>
Anula la dirección del host del Trace Agent a la que el rastreador por defecto intenta enviar trazas.

`DD_AGENT_PORT`
**Por defecto**: `8126`<br>
Anula el puerto del Trace Agent al que el el rastreador por defecto envía trazas. Si la [configuración del Agent][13] configura `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto al predeterminado `8126`, `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.

`DD_TRACE_AGENT_URL`
: La URL del Trace Agent a la que envía el rastreador. Si se define, tiene prioridad sobre el nombre del host y puerto. Admite sockets de dominio Unix (UDS), en combinación con la configuración `apm_config.receiver_socket` en tu archivo `datadog.yaml`, o la variable de entorno `DD_APM_RECEIVER_SOCKET` definida en el Datadog Agent . Por ejemplo, `DD_TRACE_AGENT_URL=http://localhost:8126` para URL HTTP y `DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket` para UDS. Si la [configuración del Agent][13] configura `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto al predeterminado `8126`, `DD_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.

`DD_DOGSTATSD_URL`
: La URL utilizada para conectarse al Datadog Agent para métricas de DogStatsD. Si se define, tiene prioridad sobre el nombre del host y puerto. Admite sockets de dominio Unix (UDS), en combinación con la configuración `dogstatsd_socket` en tu archivo `datadog.yaml`, o la variable de entorno `DD_DOGSTATSD_SOCKET` definida en el Datadog Agent . Por ejemplo, `DD_DOGSTATSD_URL=udp://localhost:8126` para URL UDP y `DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket` para UDS. Si la [configuración del Agent][13] configura `dogstatsd_port` o `DD_DOGSTATSD_PORT` con un valor distinto al predeterminado `8125`, la librería de rastreo `DD_DOGSTATSD_URL` o `DD_DOGSTATSD_PORT` debe coincidir con él.

`DD_DOGSTATSD_HOST`
: **Por defecto**: `localhost`<br>
Anula la dirección del host del Trace Agent a la que el rastreador por defecto intenta enviar métricas de DogStatsD. Utiliza `DD_AGENT_HOST` para anular `DD_DOGSTATSD_HOST`.


: **Por defecto: `8125` <br>
Anula el puerto por defecto del Trace Agent para el envío de métricas de DogStatsD. Si la [configuración del Agent][13] configura `dogstatsd_port` o `DD_DOGSTATSD_PORT` con un valor distinto al predeterminado `8125`, `DD_DOGSTATSD_PORT` o `DD_DOGSTATSD_PORT` de la librería de rastreo deben coincidir con él.

`DD_LOGS_INJECTION`
: **Por defecto**: `false`<br>
Habilita la [conexión de la inyección de logs y trazas][6].



## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /es/tracing/guide/setting_primary_tags_to_scope/
[4]: https://ddtrace.readthedocs.io/en/stable/integrations.html#django
[5]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[6]: /es/tracing/other_telemetry/connect_logs_and_traces/python/
[13]: /es/agent/configuration/network/#configure-ports
[14]: /es/opentelemetry/interoperability/environment_variable_support
