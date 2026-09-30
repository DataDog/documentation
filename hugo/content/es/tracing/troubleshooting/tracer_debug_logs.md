---
description: Habilita y recopila logs de depuración de trazas de APM para solucionar
  problemas de configuración y conectividad.
further_reading:
- link: /tracing/troubleshooting/connection_errors/
  tag: Documentación
  text: Solucionar problemas de errores de conexión de APM
title: Logs de depuración de rastreador
---

## Recopilación de logs de depuración automatizada
<div class="alert alert-danger">La depuración automatizada de logs solo es compatible con Java, Python, Node.js y .NET. Para otros lenguajes, utiliza <a href="/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode">la recopilación manual de depuración de logs</a>.</div>

Un flare te permite enviar la información necesaria para solucionar problemas al equipo de soporte de Datadog, incluyendo el logs del rastreador, con los datos confidenciales eliminados. Los flares son útiles para solucionar problemas como el uso elevado de la CPU, el uso elevado de la memoria y tramos (spans) faltantes.

### Requisitos previos
- La [configuración remota][3] debe estar activada.
- Tu clave de API debe estar configurada para la Configuración remota.
- Debes tener una versión del rastreador compatible:
  - Java: `1.26.0` o posterior
  - Python: `3.12.0` o posterior
  - Node.js: `5.15.0` o posterior, o `4.39.0` o posterior
  - .NET: `2.46.0` o posterior

### Enviar un flare
Para enviar un flare desde el sitio de Datadog, asegúrate de haber habilitado [Fleet Automation][3] en el Agent.
{{% remote-flare %}}

<div class="alert alert-danger">Si no ves la opción para tu servicio, es probable que haya un error en la conexión entre la aplicación y el Datadog Agent y deberías optar por la opción manual de proporcionar los logs del rastreador de depuración.</div>

Por ejemplo:

{{< img src="agent/fleet_automation/fleet-automation-flare-agent-and-tracer-debuglevel.png" alt="El botón Enviar ticket inicia un formulario para enviar una bengala sobre un nuevo ticket de asistencia o uno existente" style="width:60%;" >}}

## Activar el modo de depuración

Utiliza la configuración de depuración de Datadog para diagnosticar problemas o auditar datos de rastreo. Datadog no recomienda activar el modo de depuración en sistemas de producción porque aumenta el número de eventos que se envían a los registradores. Utiliza el modo de depuración solo con fines de depuración.

El modo de depuración está desactivado por defecto. Para activarlo, sigue las instrucciones del rastreador de lenguaje correspondiente:

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}

{{< programming-lang lang="java" >}}

Para habilitar el modo de depuración para el rastreador de Datadog Java, establece el indicador `-Ddd.trace.debug=true` when starting the JVM or add `DD_TRACE_DEBUG=true` como variable de entorno.

**Notas**:
- Datadog Java Tracer implementa SLF4J SimpleLogger, para que [se puedan aplicar todas sus configuraciones][1]. Por ejemplo, puedes configurarlo para generar logs en un archivo de log exclusivo:
```
-Ddatadog.slf4j.simpleLogger.logFile=<NEW_LOG_FILE_PATH>
```
- Para generar logs de Datadog Java Tracer en un formato JSON compatible con la interfaz de usuario de Datadog Logs, utiliza:
```
-Ddatadog.slf4j.simpleLogger.jsonEnabled=true
```


[1]: https://www.slf4j.org/api/org/slf4j/simple/SimpleLogger.html
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Los pasos para activar el modo de depuración en el rastreador de Datadog Python dependen de la versión del rastreador que utiliza tu aplicación. Elige el escenario que corresponda:

### Escenario 1: ddtrace versión 2.x y posterior

1. Para activar el modo de depuración: `DD_TRACE_DEBUG=true`

2. Para dirigir los logs de depuración a un archivo de log, establece `DD_TRACE_LOG_FILE` en el nombre de archivo de ese archivo de log, en relación con el directorio de trabajo actual. Por ejemplo, `DD_TRACE_LOG_FILE=ddtrace_logs.log`.
   Por defecto, el tamaño del archivo es 15728640 bytes (unos 15MB), y se crea un archivo de log de copia de seguridad. Para aumentar el tamaño predeterminado del archivo de log, especifica el tamaño en bytes con el ajuste `DD_TRACE_LOG_FILE_SIZE_BYTES`.

**Nota:** Si la aplicación utiliza el registrador raíz y cambia el nivel de log a `DEBUG`, se habilitan los logs de depuración del rastreador. Si deseas anular este comportamiento, anula el registrador `ddtrace` de la siguiente manera:

```
import logging

# root logger configuration
root_logger = logging.getLogger()
root_logger.setLevel(logging.DEBUG)

# override the ddtrace configuration to WARNING log level
logging.getLogger("ddtrace").setLevel(logging.WARNING)
```


### Escenario 2: ddtrace versión 1.3.2 a <2.x

1. Para activar el modo de depuración: `DD_TRACE_DEBUG=true`

2. Para dirigir los logs de depuración a un archivo de log, establece `DD_TRACE_LOG_FILE` con un nombre de archivo en el que se deben escribir los logs del rastreador, relativos al directorio de trabajo actual. Por ejemplo, `DD_TRACE_LOG_FILE=ddtrace_logs.log`.
   Por defecto, el tamaño del archivo es 15728640 bytes (unos 15MB) y se crea un archivo de log de copia de seguridad. Para aumentar el tamaño predeterminado del archivo de log, especifica el tamaño en bytes con el ajuste `DD_TRACE_LOG_FILE_SIZE_BYTES`.

3. Para dirigir logs a la consola, para aplicaciones **Python 2**, configura `logging.basicConfig()` o similar. Los logs se envían automáticamente a la consola para aplicaciones **Python 3**.


### Escenario 2: ddtrace versión 1.3.2 a <2.x

1. Para activar el modo de depuración: `DD_TRACE_DEBUG=true`

2. Para dirigir logs a la consola, para aplicaciones **Python 2 o Python 3**, configura `logging.basicConfig()` o utiliza `DD_CALL_BASIC_CONFIG=true`.

### Escenario 4: ddtrace versión 0.x

1. Para activar el modo de depuración: `DD_TRACE_DEBUG=true`

2. Para dirigir logs a la consola, para aplicaciones **Python 2 o Python 3**, configura `logging.basicConfig()` o utiliza `DD_CALL_BASIC_CONFIG=true`.

### Escenario 5: Configuración de la generación de logs de depuración en el código de la aplicación con la biblioteca de registro estándar

Para cualquier versión de ddtrace, en lugar de establecer la variable de entorno del rastreador `DD_TRACE_DEBUG`, puedes habilitar la generación de logs de depuración en el código de la aplicación utilizando directamente la biblioteca estándar de `logging`:

```
log = logging.getLogger("ddtrace.tracer")
log.setLevel(logging.DEBUG)
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

Para activar el modo de depuración del rastreador de Datadog Ruby, configura la variable de entorno `DD_TRACE_DEBUG=true`.

**Logs de aplicación**

Por defecto, todos los logs son procesados por el registrador por defecto de Ruby. Cuando uses Rails, deberías ver los mensajes en tu archivo de log de aplicación.

Los mensajes de log de cliente de Datadog se marcan con `[ddtrace]`, para que puedas aislarlos de otros mensajes.

Puedes anular el registrador predeterminado y sustituirlo por uno personalizado con el atributo `log` del rastreador:

```ruby
f = File.new("<FILENAME>.log", "w+")           # Los mesajes de log van aquí
Datadog.configure do |c|
  c.logger.instance = Logger.new(f)                 # Anular el rastreador por defecto
end

Datadog::Tracing.logger.info { "this is typically called by tracing code" }
```

Consulta [la documentación de la API][1] para obtener más detalles.


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#custom-logging
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

Para habilitar el modo de depuración para el rastreador de Datadog Go, establece la variable de entorno `DD_TRACE_DEBUG=true`,
o habilita el modo de depuración durante la configuración de `Start`:

```go
package main

import (
  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
    tracer.Start(tracer.WithDebugMode(true))
    defer tracer.Stop()
}
```

#### Logs de tramo abandonados

El rastreador de Datadog Go también admite la generación de logs para tramos (spans) potencialmente abandonados. Para habilitar este modo de depuración en Go, establece la variable de entorno `DD_TRACE_DEBUG_ABANDONED_SPANS=true`. Para cambiar la duración después de la cual los tramos se consideran abandonados (por defecto=`10m`), establece la variable de entorno `DD_TRACE_ABANDONED_SPAN_TIMEOUT` al tiempo de duración deseado. Los logs de tramos abandonados aparecen en el nivel de información.

También puedes activar la depuración de tramos abandonados durante la configuración de `Start`:

```go
package main

import (
  "time"

  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
    tracer.Start(tracer.WithDebugSpansMode(10 * time.Minute))
    defer tracer.Stop()
}
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

Para activar el modo de depuración para el rastreador de Datadog Node.js, utiliza la variable de entorno `DD_TRACE_DEBUG=true`.

**Nota:** Para versiones inferiores a la 2.X, el modo de depuración podía activarse mediante programación dentro de la inicialización del rastreador, pero esto ya no es posible.

**Logs de aplicación**

En el modo de depuración, el rastreador logueará la información de depuración en `console.log()` y los errores en `console.error()`. Puedes cambiar este comportamiento pasando un registrador personalizado al rastreador. El registrador debe contener métodos `debug()` y `error()` que puedan manejar mensajes y errores, respectivamente.

Por ejemplo:

```javascript
const bunyan = require('bunyan')
const logger = bunyan.createLogger({
  name: 'dd-trace',
  level: 'trace'
})

const tracer = require('dd-trace').init({
  logger: {
    debug: message => logger.trace(message),
    error: err => logger.error(err)
  }
})
```

Luego, comprueba los logs del Agent para ver si hay más información sobre tu problema:

* Si la traza se envió al Agent correctamente, deberías ver entradas de log `Response from the Agent: OK`. Esto indica que el rastreador está funcionando correctamente, por lo que el problema puede estar en el propio Agent. Consulta la [guía para solucionar problemas del Agent][1] para más información.

* Si se produjo un error en el Agent (o no se pudo acceder al Agent), verás las entradas de log `Error from the Agent`. En este caso, valida tu configuración de red para asegurarte de que se puede acceder al Agent. Si estás seguro de que la red funciona y de que el error proviene del Agent, consulta la [guía para solucionar problemas del Agent][1].

Si ninguna de estas entradas de log está presente, entonces no se envió ninguna solicitud al Agent, lo que significa que el rastreador no está instrumentando tu aplicación. En este caso, [contacta con el soporte de Datadog][2] y proporciona las entradas de log relevantes con [un flare][3].

Para ver más ajustes del rastreador, consulta la [documentación de la API][4].


[1]: /es/agent/troubleshooting/
[2]: /es/help/
[3]: /es/agent/troubleshooting/#send-a-flare
[4]: https://datadog.github.io/dd-trace-js/#tracer-settings
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Para activar el modo de depuración para el rastreador de Datadog .NET, establece el parámetro de configuración `DD_TRACE_DEBUG` en `true`. Este parámetro puede establecerse como una variable de entorno, en el archivo `web.config` o `app.config` (solo para .NET Framework), o en un archivo `datadog.json`. Alternativamente, puedes activar el modo de depuración llamando a `GlobalSettings.SetDebugEnabled(true)`:

```csharp
using Datadog.Trace;

// enable debug mode
GlobalSettings.SetDebugEnabled(true);

```

Los logs se guardan por defecto en los siguientes directorios. Utiliza la configuración de `DD_TRACE_LOG_DIRECTORY` para cambiar estas rutas.

| Plataforma                                             | Ruta                                             |
|------------------------------------------------------|--------------------------------------------------|
| Windows                                              | `%ProgramData%\Datadog .NET Tracer\logs\`        |
| Linux                                                | `/var/log/datadog/dotnet/`                       |
| Linux (cuando se utiliza la [inyección de la biblioteca de Kubernetes][1]) | `/datadog-lib/logs`                              |
| Azure App Service                                    | `%AzureAppServiceHomeDirectory%\LogFiles\datadog`|

**Nota:**: En Linux, debes crear el directorio de logs antes de activar el modo de depuración.

A partir de la versión `2.19.0`, puedes utilizar el ajuste `DD_TRACE_LOGFILE_RETENTION_DAYS` para configurar el rastreador para borrar archivos de log del directorio de generación de logs actual al iniciarse. El rastreador elimina archivos de log de la misma antigüedad y más antiguos que el número de días dado, con un valor por defecto de `32`.

Para más detalles sobre cómo configurar el rastreador de .NET, consulta la sección [Configuración][2].

Hay dos tipos de logs que se crean en estas rutas:
1. **Logs desde código nativo:** a partir de la versión 1.26.0, estos logs se guardan como `dotnet-tracer-native-<processname>-<processid>.log`. Desde la versión 1.21.0 hasta la 1.25.x, estos logs se guardaban como `dotnet-tracer-native.log`. En 1.20.x y versiones anteriores, estos se guardaban como `dotnet-profiler.log`.
2. **Logs desde código gestionado:** en 1.21.0 y versiones posteriores, estos logs se guardan en `dotnet-tracer-managed-<processname>-<date>.log`. En 1.20.x y versiones anteriores, se guardaban como `dotnet-tracer-<processname>-<date>.log`.


[1]: /es/tracing/trace_collection/library_injection/?tab=kubernetes
[2]: /es/tracing/setup/dotnet/#configuration
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

Para habilitar el modo de depuración para el rastreador de Datadog PHP, establece la variable de entorno `DD_TRACE_DEBUG=true`. Consulta [documentos de configuración][1] de PHP para obtener más información sobre cómo y cuándo debe establecerse el valor de esta variable de entorno para que el rastreador lo gestione correctamente.

Hay dos opciones para dirigir logs de depuración del rastreador a un archivo.

**Opción 1:**

Con dd-trace-php 0.98.0+, puedes especificar una ruta a un archivo de log para determinados logs de depuración del rastreador:

- **Variable de entorno**: `DD_TRACE_LOG_FILE`

- **INI**: `datadog.trace.log_file`

**Notas**:
  - Para obtener más información sobre dónde configurar `DD_TRACE_LOG_FILE`, consulta [Configuración de la biblioteca de rastreo de PHP][2].
  - Si no se especifica `DD_TRACE_LOG_FILE`, los logs pasarán a la localización del error por defecto en PHP (Ver **Opción 2** para más detalles).

**Opción 2:**

Puedes especificar dónde PHP debe colocar los mensajes `error_log`, ya sea a nivel de servidor o como parámetro `ini` de PHP, que es la forma estándar de configurar el comportamiento de PHP.

Si utilizas un servidor Apache, utiliza la directiva `ErrorLog`.
Si utilizas un servidor NGINX, utiliza la directiva `error_log`.
Si estás configurando en su lugar en el nivel de PHP, utiliza el parámetro ini `error_log` de PHP.


[1]: https://www.php-fig.org/psr/psr-3
[2]: /es/tracing/trace_collection/library_config/php/
{{< /programming-lang >}}

{{< programming-lang lang="cpp" >}}

Las bibliotecas binarias de versión están compiladas con símbolos de depuración añadidos a la versión optimizada. Puedes utilizar GDB o LLDB para depurar la biblioteca y leer los volcados de núcleos. Si estás compilando la biblioteca desde la fuente, pasa el argumento `-DCMAKE_BUILD_TYPE=RelWithDebInfo` a cmake para compilar una versión optimizada con símbolos de depuración.

```bash
cmake -B .build -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
cmake --build .build -j
cmake --install .build
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Revisar logs de depuración


Cuando el modo de depuración de tu rastreador está habilitado, los mensajes de log específicos del rastreador informan cómo se inicializó el rastreador y si se enviaron trazas (traces) al Agent. Los logs de depuración se almacenan en una ruta separada dependiendo de tu configuración de generación de logs. Si habilitas la información del rastreador a nivel de aplicación, también se envían logs de depuración en la bengala para los [lenguajes compatibles](##prerequisites). Los siguientes ejemplos de logs muestran lo que puede aparecer en tu archivo de log.

Si hay errores que no entiendes, o si se informan trazas como descartadas en Datadog, pero no puedes verlas en la interfaz de usuario de Datadog, [ponte en contacto con el soporte de Datadog][1] y proporciona las entradas de log pertinentes con [un flare][2].

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

**Log de inicialización para el rastreador:**

```java
[main] DEBUG datadog.trace.agent.ot.DDTracer - Using config: Config(runtimeId=<runtime ID>, serviceName=<service name>, traceEnabled=true, writerType=DDAgentWriter, agentHost=<IP HERE>, agentPort=8126, agentUnixDomainSocket=null, prioritySamplingEnabled=true, traceResolverEnabled=true, serviceMapping={}, globalTags={env=none}, spanTags={}, jmxTags={}, excludedClasses=[], headerTags={}, httpServerErrorStatuses=[512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511], httpClientErrorStatuses=[400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499], httpClientSplitByDomain=false, partialFlushMinSpans=1000, runtimeContextFieldInjection=true, propagationStylesToExtract=[DATADOG], propagationStylesToInject=[DATADOG], jmxFetchEnabled=true, jmxFetchMetricsConfigs=[], jmxFetchCheckPeriod=null, jmxFetchRefreshBeansPeriod=null, jmxFetchStatsdHost=null, jmxFetchStatsdPort=8125, logsInjectionEnabled=false, reportHostName=false)
```

**Ejemplo de generación de trazas:**

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<trace id>, s_id=<span id>, p_id=<parent id>] trace=SpringBoot_Service/OperationHandler.handle/OperationHandler.handle metrics={} tags={component=spring-web-controller, env=none, span.kind=server, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=92808848
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <trace id> -- Expired reference. count = 1
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<trace id>, s_id=<span id>, p_id=0] trace=SpringBoot_Service/servlet.request/GET /actuator/prometheus metrics={_sampling_priority_v1=1} tags={component=java-web-servlet, env=none, http.method=GET, http.status_code=200, http.url=http://<IP>:8080/actuator/prometheus, language=jvm, peer.hostname=<IP>, peer.ipv4=<IP>, peer.port=50778, runtime-id=<runtime id>, span.kind=server, span.origin.type=org.apache.catalina.core.ApplicationFilterChain, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=157972901
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - Writing 2 spans to DDAgentWriter { api=DDApi { tracesUrl=http://<IP address>/v0.4/traces } }.
```

**Trazas enviadas al Datadog Agent:**

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <trace id> -- Expired reference. count = 0
[dd-trace-writer] DEBUG datadog.trace.agent.common.writer.DDApi - Successfully sent 1 of 2 traces to the DD agent.
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Los logs generados por el rastreador de Python tienen la `ddtrace` del nombre del gestor de generación de logs.

**Se generaron trazas:**

```text
<YYYY-MM-DD> 19:51:22,262 DEBUG [ddtrace.internal.processor.trace] [trace.py:211] - trace <TRACE ID> has 8 spans, 7 finished
```

**Tramo generado por el rastreador de Python:**

```text
<YYYY-MM-DD> 19:51:22,251 DEBUG [ddtrace.tracer] [tracer.py:715] - finishing span name='flask.process_response' id=<SPAN ID> trace_id=<TRACE ID>  parent_id=<PARENT ID> service='flask' resource='flask.process_response' type=None start=1655495482.2478693 end=1655495482.2479873 duration=0.000118125 error=0 tags={} metrics={} (enabled:True)
0.0:5050/
```


**Trazas enviadas al Datadog Agent:**

```text
<YYYY-MM-DD> 19:59:19,657 DEBUG [ddtrace.internal.writer] [writer.py:405] - sent 1.57KB in 0.02605s to http://localhost:8126/v0.4/traces
```

**Trazas que fallaron al ser enviadas al Datadog Agent:**

```text
<YYYY-MM-DD> 19:51:23,249 ERROR [ddtrace.internal.writer] [writer.py:567] - failed to send traces to Datadog Agent at http://localhost:8126/v0.4/traces
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

**Se genera el tramo:**

```text
D, [<YYYY-MM-DD>T16:42:51.147563 #476] DEBUG -- ddtrace: [ddtrace] (/usr/local/bundle/gems/ddtrace-<version>/lib/ddtrace/tracer.rb:371:in `write') Writing 4 spans (enabled: true)

 Name: rack.request
Span ID: <span id>
Parent ID: 0
Trace ID: <trace id>
Type: web
Service: todo
Resource: NotesController#index
Error: 0
Start: <start time>
End: <end time>
Duration: 11985000
Allocations: 1202
Tags: [
   system.pid => 476,
   env => dev,
   language => ruby,
   http.method => GET,
   http.url => /notes,
   http.base_url => http://0.0.0.0:3000,
   http.status_code => 304,
   http.response.headers.x_request_id => <header value>]
Metrics: [
   ..],

```


{{< /programming-lang >}}

{{< programming-lang lang="go" >}}


**Intento de envío de la traza al Agent:**

```text
YYYY/MM/DD 16:06:35 Datadog Tracer <version> DEBUG: Sending payload: size: <size of traces> traces: <number of traces>.
```


**Traza que falló al enviar al Datadog Agent:**

```text
2019/08/07 16:12:27 Datadog Tracer <version> ERROR: lost <number of traces> traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused, 4 additional messages skipped (first occurrence: DD MM YY 16:11 UTC)
```


{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

**Problema al enviar la traza al Agent:**

```json
{
    "name": "dd-trace",
    "hostname": "<hostname>",
    "pid": 28817,
    "level": 50,
    "err": {
        "message": "Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126",
        "name": "Error",
        "stack": "Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126\n    at ClientRequest.req.on.e (/path/to/dd-trace/src/platform/node/request.js:44:33)\n    at scope.activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:68:19)\n    at Scope._activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:44:14)\n    at Scope.activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:13:17)\n    at ClientRequest.<anonymous> (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:67:20)\n    at ClientRequest.emit (events.js:193:13)\n    at ClientRequest.req.emit (/path/to/dd-trace/packages/datadog-plugin-http/src/client.js:93:21)\n    at Socket.socketErrorListener (_http_client.js:397:9)\n    at Socket.emit (events.js:198:15)\n    at emitErrorNT (internal/streams/destroy.js:91:8)"
    },
    "msg": "Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126",
    "time": "2019-08-06T20:48:27.769Z",
    "v": 0
}
```


{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

**Logs desde código nativo:**

```text
[dotnet] 19861: [debug] JITCompilationStarted: function_id=<function id> token=<token id> name=System.Net.Http.Headers.HttpHeaders.RemoveParsedValue()
```


**Logs desde código gestionado que muestra que se generaron tramos:**

```text
{ MachineName: ".", ProcessName: "dotnet", PID: <process id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span started: [s_id: <span id>, p_id: <parent span id>, t_id: <trace id>]
{ MachineName: ".", ProcessName: "dotnet", PID: <process id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span closed: [s_id: <span id>, p_id: <parent span id>, t_id: <trace id>] for (Service: test-webapi, Resource: custom, Operation: custom.function, Tags: [<span tags>])
```

**Logs desde código gestionado que muestra trazas que no pudieron ser enviadas al Datadog Agent:**

```text
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [ERR] An error occurred while sending traces to the agent at System.Net.Http.HttpRequestException: Connection refused ---> System.Net.Sockets.SocketException: Connection refused
   at System.Net.Http.ConnectHelper.ConnectAsync(String host, Int32 port, CancellationToken cancellationToken)
   --- End of inner exception stack trace ---
```


{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

**Cargar una integración:**

Nota: Este log **no** sigue a `DD_TRACE_LOG_FILE` (ini: `datadog.trace.log_file`) y siempre se dirige a la directiva ErrorLog.

```text
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [debug] - Loaded integration web
```

**Información del tramo:**

Disponible a partir de 0.98.0:

```text
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [span] Encoding span <SPAN ID>: trace_id=<TRACE ID>, name='wpdb.query', service='wordpress', resource: '<RESOURCE NAME>', type 'sql' with tags: component='wordpress'; and metrics: -
```

**Intento de enviar trazas:**

```text
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [info] Flushing trace of size 56 to send-queue for http://datadog-agent:8126
```


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/agent/troubleshooting/#send-a-flare
[3]: /es/tracing/guide/remote_config
[5]: /es/remote_configuration#enabling-remote-configuration