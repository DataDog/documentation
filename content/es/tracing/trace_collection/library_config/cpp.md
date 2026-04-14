---
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-cpp
  tag: Código fuente
  text: Código fuente
- link: /tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentación
  text: Propagación del contexto de rastreo
title: Configuración de la librería de rastreo de C++
type: multi-code-lang
---

Después de configurar la librería de rastreo con tu código y de configurar el Agent para recopilar datos de APM, también puedes configurar la librería de rastreo como prefieras e incluir la configuración del [Etiquetado unificado de servicios][1].

Es recomendado utilizar `DD_SERVICE`, `DD_ENV` y `DD_VERSION` para establecer `env`, `service` y `version` para tus servicios. Consulta las recomendaciones de la documentación [etiquetado de servicios unificado][1] sobre qué valor establecer para las variables de entorno.

## Variables de entorno
Para configurar el rastreador mediante variables de entorno, establece las variables antes de lanzar la aplicación instrumentada.

### Etiquetado de servicios unificado

`DD_SERVICE`
: **Desde**: v0.1.0 <br>
Establece el nombre de servicio.

`DD_ENV`
: **Desde**: v0.1.0 <br>
**Ejemplo**: `prod`, `pre-prod`, o `staging` <br>
Añade la etiqueta `env` con el valor especificado a todos los tramos generados.

`DD_VERSION`
: **Desde**: v0.1.0 <br>
**Ejemplo**: `1.2.3`, `6c44da20`, `2020.02.13` <br>
Establece la versión del servicio.

### Trazas

`DD_TRACE_ENABLED`
: **Desde**: 0.1.0 <br>
**Por defecto**: `true` <br>
Enviar o no trazas al Datadog Agent . <br>
Cuando es `false`, la librería deja de enviar trazas al Datadog Agent. Sin embargo, la librería continúa generando trazas, informando la telemetría y sondeando actualizaciones de configuración remotas.

`DD_TRACE_AGENT_PORT`
: **Desde**: v0.1.0 <br>
**Por defecto**: `8126` <br>
Establece el puerto al que se envían trazas (el puerto en el que el Agent escucha conexiones). Se ignora si `DD_TRACE_AGENT_URL` está configurado. Si [la configuración del Agent][3] establece `receiver_port` o `DD_APM_RECEIVER_PORT` en algo distinto del valor predeterminado `8126`, entonces `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.

`DD_TRACE_AGENT_URL`
: **Desde**: v0.1.0 <br>
**Por defecto**: `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>` si están configurado, o `http://localhost:8126`.
**Ejemplos**: <br>
URL HTTP: `http://localhost:8126` <br>
Unix Domain Socket: `unix:///var/run/datadog/apm.socket` <br><br>
Establece el endpoint de la URL donde se envían trazas. Sustituye `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT` si están definidos. Esta URL admite esquemas de direcciones HTTP, HTTPS y Unix. <br>
Si [la configuración del Agent][3] establece `receiver_port` o `DD_APM_RECEIVER_PORT` en algo distinto del valor predeterminado `8126`, entonces `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.

`DD_TRACE_RATE_LIMIT`
: **Desde**: 0.1.0 <br>
**Por defecto**: `200` <br>
Número máximo de trazas que se permite enviar por segundo.

`DD_SPAN_SAMPLING_RULES`
: **Versión**: v0.1.0 <br>
**Por defecto `null`<br>
Una matriz de objetos JSON. Las reglas se aplican en el orden configurado para determinar la frecuencia de muestreo del tramo. El valor de `sample_rate` debe estar comprendido entre `0.0` y `1.0` (ambos inclusive).

`DD_SPAN_SAMPLING_RULES_FILE`
: **Desde**: 0.1.0 <br>
Apunta a un archivo JSON que contiene las reglas de muestreo del tramo. Consulta `DD_SPAN_SAMPLING_RULES` para conocer el formato de las reglas.

`DD_TRACE_REPORT_HOSTNAME`
: **Desde**: 0.1.0 <br>
**Por defecto**: `false` <br>
Añade la etiqueta `hostname` con el resultado de `gethostname`.

`DD_TRACE_STARTUP_LOGS`
: **Desde**: 0.1.0 <br>
**Por defecto**: `true` <br>
Loguear la configuración del rastreador una vez que el rastreador está completamente inicializado. <br>

`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **Desde**: 0.1.6 <br>
**Por defecto**: `true` <br>
Si es `true`, el rastreador generará IDs de traza de 128 bits. <br>
Si es `false`, el rastreador generará IDs de traza legacy de 64 bits.

`DD_REMOTE_CONFIGURATION_ENABLED`
: **Desde**: 0.2.0 <br>
**Por defecto**: `true` <br>
Habilita la capacidad que permite configurar de forma remota y cambiar el comportamiento del rastreador. <br>
Si es `false`, esta función está deshabilitada. <br>
Para más información, consulta [Configuración remota][5].

`DD_REMOTE_CONFIG_POLL_INTERVAL_SECONDS`
: **Desde**: 0.2.0 <br>
**Por defecto**: `5.0` <br>
Establece la frecuencia, en segundos, con la que se consulta al Datadog Agent en busca de actualizaciones de configuración remota.

`DD_TRACE_DELEGATE_SAMPLING`
: **Versión**: 0.2.0 <br>
**Por defecto**: `false` <br>
Si es `true`, delega la decisión de muestreo de trazas a un servicio secundario y prefiere la decisión resultante a la suya propia, si procede.

### Agent

`DD_TAGS`
: **Desde**: v0.1.0 <br>
**Ejemplo**: `team:intake,layer:api,foo:bar` <br>
Una lista separada por comas de pares `key:value` que se añadirán a todos los tramos generados.

`DD_AGENT_HOST`
: **Desde**: v0.1.0 <br>
**Por defecto**: `localhost` <br>
Establece el host donde se envían las trazas (el host que ejecuta el Agent). Puede ser un nombre de host o una dirección IP. Se ignora si `DD_TRACE_AGENT_URL` está configurado.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **Desde**: 0.1.12 <br>
**Por defecto**: `true` <br>
Datadog puede recopilar [información de entorno y de diagnóstico sobre tu sistema][4] para mejorar el producto. Cuando es `false`, no se recopilan datos de telemetría.

### Propagación del contexto de rastreo

`DD_PROPAGATION_STYLE`
: **Desde**: 0.1.0 <br>
Lista separada por comas de los estilos de propagación a utilizar al extraer e inyectar el contexto de rastreo. <br>
Cuando se dan múltiples valores, el orden de coincidencia se basa en el orden de los valores.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Desde**: v0.1.6 <br>
**Por defecto**: `datadog,tracecontext` <br>
**Valores aceptados**: `datadog`, `tracecontext`, `b3` <br>
Lista separada por comas de estilos de propagación a utilizar cuando se inyecta contexto de rastreo.
Cuando se establecen múltiples valores, el orden de coincidencia se basa en el orden de los valores.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Desde**: v0.1.6 <br>
**Por defecto**: `datadog,tracecontext` <br>
**Valores aceptados**: `datadog`, `tracecontext`, `b3` <br>
Lista separada por comas de los estilos de propagación a utilizar al extraer el contexto de rastreo.
Cuando se establecen múltiples valores, el orden de coincidencia se basa en el orden de los valores.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /es/agent/configuration/network/#configure-ports
[4]: /es/tracing/configure_data_security#telemetry-collection
[5]: /es/agent/remote_config
