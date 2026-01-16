---
description: Configura y analiza los logs de inicio del rastreador para solucionar
  problemas de configuración y conectividad del Agent.
further_reading:
- link: /tracing/troubleshooting/connection_errors/
  tag: Documentación
  text: Solucionar problemas de errores de conexión de APM
title: Logs de inicio de rastreador
---
## Logs de inicio

Los logs de inicio del rastreador capturan toda la información obtenible al inicio y la loguean como `DATADOG TRACER CONFIGURATION`, `DATADOG TRACER DIAGNOSTICS`, `DATADOG ERROR`, o `DATADOG CONFIGURATION` para simplificar la búsqueda dentro de tus logs.

Algunos lenguajes loguean en un archivo separado dependiendo de las convenciones del lenguaje y la seguridad de acceso a `Stdout` o equivalente. En esos casos, la localización de los logs se anotan en la pestaña de lenguaje a continuación. Algunos lenguajes no loguean entradas de diagnóstico, también se indica esto a continuación.

Los logs `CONFIGURATION` son una representación en formato JSON de los ajustes aplicados a tu rastreador. En los lenguajes en los que se realiza un check de conectividad del Agent, el JSON de configuración también incluirá una clave `agent_error`, que indica si se puede acceder al Agent.

Las entradas de log `DIAGNOSTICS` o `ERROR`, en los lenguajes que las producen, ocurren cuando el rastreador encuentra un error durante el inicio de la aplicación. Si ves líneas de log `DIAGNOSTICS` o `ERROR`, confirma desde el log indicado que los ajustes y configuraciones se aplican correctamente.

Si no ves logs en absoluto, asegúrate de que tus logs de aplicación no están silenciados y de que tu nivel de log es como mínimo `INFO` cuando proceda.

{{< programming-lang-wrapper langs="java,.NET,php,go,nodejs,python,ruby,cpp" >}}
{{< programming-lang lang="java" >}}

**Configuration:** (Configuración)

```text
{"os_name":"Mac OS X","os_version":"10.15.4","architecture":"x86_64","lang":"jvm","lang_version":"11.0.6","jvm_vendor":"AdoptOpenJDK","jvm_version":"11.0.6+10","java_class_version":"55.0","enabled":true,"service":"unnamed-java-app","agent_url":"http://localhost:8126","agent_error":false,"debug":false,"analytics_enabled":false,"sampling_rules":[{},{}],"priority_sampling_enabled":true,"logs_correlation_enabled":false,"profiling_enabled":false,"dd_version":"null","health_checks_enabled":false,"configuration_file":"no config file present","runtime_id":"b69deb26-8bc3-4c00-8952-d42bf8c2123b"}
```

**Diagnostics:**

El rastreador de Java no emite logs de Diagnóstico. Para este check, ejecuta el rastreador en [modo de depuración][1].


[1]: /es/tracing/troubleshooting/tracer_debug_logs/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

**File Location:**

Los archivos de log se guardan por defecto en los siguientes directorios. Utiliza la configuración de `DD_TRACE_LOG_DIRECTORY` para cambiar estas rutas.

| Plataforma                                             | Ruta                                             |
|------------------------------------------------------|--------------------------------------------------|
| Windows                                              | `%ProgramData%\Datadog .NET Tracer\logs\`        |
| Linux                                                | `/var/log/datadog/dotnet/`                       |
| Linux (cuando se utiliza la [inyección de la biblioteca de Kubernetes][1]) | `/datadog-lib/logs`                              |
| Azure App Service                                    | `%AzureAppServiceHomeDirectory%\LogFiles\datadog`|

**Nota:** En Linux, debes crear el directorio de logs antes de activar el modo de depuración.

A partir de la versión `2.19.0`, puedes utilizar el ajuste `DD_TRACE_LOGFILE_RETENTION_DAYS` para configurar el rastreador para borrar archivos de log del directorio de generación de logs actual al iniciarse. El rastreador elimina archivos de log de la misma antigüedad y más antiguos que el número de días dado, con un valor por defecto de `32`.

- `dotnet-tracer-managed-{processName}-{timestamp}.log` contiene los logs de configuración.

- `dotnet-tracer-native-{processName}-{processID}.log` contiene los logs de diagnóstico, si se genera alguno.

**Configuration:** (Configuración)

```text
2020-06-29 12:26:39.572 +02:00 [INF] DATADOG TRACER CONFIGURATION -
{"date":"2020-06-29T12:26:39.5615724+02:00","os_name":"Windows",
"os_version":"Microsoft Windows NT 6.2.9200.0","version":"1.17.1.0",
"platform":"x64","lang":".NET Framework","lang_version":"4.8+",
"env":null,"enabled":true,"service":"git-credential-manager",
"agent_url":"http://localhost:8126","debug":false,
"analytics_enabled":false,"sample_rate":null,"sampling_rules":null,
"tags":[],"log_injection_enabled":false,
"runtime_metrics_enabled":false,"disabled_integrations":[]}
```

**Diagnostics:**

El rastreador de .NET imprime las siguientes líneas de diagnóstico:

```text
DATADOG TRACER DIAGNOSTICS - Profiler disabled in DD_TRACE_ENABLED
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {process_name} not found in DD_PROFILER_PROCESSES
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {process_name} found in DD_PROFILER_EXCLUDE_PROCESSES
DATADOG TRACER DIAGNOSTICS - Failed to attach profiler: interface ICorProfilerInfo3 not found
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {application_pool} is recognized as an Azure App Services infrastructure process
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {application_pool} is recognized as Kudu, an Azure App Services reserved process
DATADOG TRACER DIAGNOSTICS - Profiler disabled: no enabled integrations found
DATADOG TRACER DIAGNOSTICS - Failed to attach profiler: unable to set event mask
DATADOG TRACER DIAGNOSTICS - Error fetching configuration {exception}
```

[1]: /es/tracing/trace_collection/library_injection/?tab=kubernetes
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

**PHP Info:**
Obtén la cadena JSON de logs de inicio de una página `phpinfo()` junto a "DATADOG TRACER CONFIGURATION" (Configuración del rastreador de Datadog). Crea el siguiente archivo PHP y accede a él desde un navegador en la máquina de host.

```php
<?php phpinfo(); ?>
```

La información de diagnóstico se muestra en una tabla separada para ayudar a diagnosticar problemas comunes.

{{< img src="tracing/troubleshooting/PHPInfo.png" alt="PHP Info" >}}

**CLI SAPI:**

Obtén la información de CLI SAPI ejecutando `php --ri=ddtrace`.

```text
ddtrace


Datadog PHP tracer extension
For help, check out the documentation at https://docs.datadoghq.com/tracing/languages/php/
(c) Datadog 2020

Datadog tracing support => enabled
Version => 1.0.0-nightly
DATADOG TRACER CONFIGURATION => {"date":"2020-07-01T17:43:54Z","os_name":"Linux 49b1cb4bdd12 4.19.76-linuxkit #1 SMP Tue May 26 11:42:35 UTC 2020 x86_64","os_version":"4.19.76-linuxkit","version":"1.0.0-nightly","lang":"php","lang_version":"7.4.5","env":null,"enabled":true,"service":null,"enabled_cli":false,"agent_url":"https://localhost:8126","debug":false,"analytics_enabled":false,"sample_rate":1.000000,"sampling_rules":null,"tags":null,"service_mapping":null,"distributed_tracing_enabled":true,"priority_sampling_enabled":true,"dd_version":null,"architecture":"x86_64","sapi":"cli","ddtrace.request_init_hook":null,"open_basedir_configured":false,"uri_fragment_regex":null,"uri_mapping_incoming":null,"uri_mapping_outgoing":null,"auto_flush_enabled":false,"generate_root_span":true,"http_client_split_by_domain":false,"measure_compile_time":true,"report_hostname_on_root_span":false,"traced_internal_functions":null,"auto_prepend_file_configured":false,"integrations_disabled":null,"enabled_from_env":true,"opcache.file_cache":null,"agent_error":"Couldn't connect to server","ddtrace.request_init_hook_reachable":false}

                               Diagnostics
agent_error => Couldn't connect to server
ddtrace.request_init_hook_reachable => false

Directive => Local Value => Master Value
ddtrace.disable => Off => Off
...
```

**Configuration:** (Configuración)

Si el rastreador está en [modo DEBUG][1] (depuración), los logs de inicio aparecerán en `error_log` una vez por proceso en la primera solicitud.

```text
DATADOG TRACER CONFIGURATION - {"agent_error":"Couldn't connect to server","ddtrace.request_init_hook_reachable":false,"date":"2020-07-01T17:42:50Z","os_name":"Linux 49b1cb4bdd12 4.19.76-linuxkit #1 SMP Tue May 26 11:42:35 UTC 2020 x86_64","os_version":"4.19.76-linuxkit","version":"1.0.0-nightly","lang":"php","lang_version":"7.4.5","env":null,"enabled":true,"service":null,"enabled_cli":false,"agent_url":"https://localhost:8126","debug":false,"analytics_enabled":false,"sample_rate":1.000000,"sampling_rules":null,"tags":null,"service_mapping":null,"distributed_tracing_enabled":true,"priority_sampling_enabled":true,"dd_version":null,"architecture":"x86_64","sapi":"cgi-fcgi","ddtrace.request_init_hook":null,"open_basedir_configured":false,"uri_fragment_regex":null,"uri_mapping_incoming":null,"uri_mapping_outgoing":null,"auto_flush_enabled":false,"generate_root_span":true,"http_client_split_by_domain":false,"measure_compile_time":true,"report_hostname_on_root_span":false,"traced_internal_functions":null,"auto_prepend_file_configured":false,"integrations_disabled":null,"enabled_from_env":true,"opcache.file_cache":null}
```

**Diagnostics:**

Los diagnósticos fallidos del rastreador de PHP se imprimen en `error_log` si el rastreador está en [modo DEBUG][1] (depuración).

```text
DATADOG TRACER DIAGNOSTICS - agent_error: Couldn't connect to server
DATADOG TRACER DIAGNOSTICS - ddtrace.request_init_hook_reachable: false
```

**Tiempo de ejecución:**

Accede a los logs de inicio como una cadena JSON en tiempo de ejecución con `\DDTrace\startup_logs()`.

```php
echo \DDTrace\startup_logs() . PHP_EOL;
```

[1]: /es/tracing/troubleshooting/tracer_debug_logs?tab=php#enable-tracer-debug-mode
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

**Configuration:** (Configuración)

```text
2020/07/09 15:57:07 Datadog Tracer v1.26.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2020-07-09T15:57:07-05:00","os_name":"darwin","os_version":"10.15.4","version":"v1.26.0","lang":"Go","lang_version":"go1.14.2","env":"","service":"splittest2","agent_url":"http://127.0.0.1:8126/v0.4/traces","agent_error":"","debug":true,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","tags":{"runtime-id":"d269781c-b1bf-4d7b-9a55-a8174930554f"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"dd_version":"","architecture":"amd64","global_service":""}
```

**Diagnostics:**

El rastreador de Go imprime una de las dos líneas de diagnóstico posibles, una para cuando no se puede acceder al Agent, y la otra para errores de muestreo de traza.

```text
2020/07/09 15:57:07 Datadog Tracer v1.26.0 WARN: DIAGNOSTICS Unable to reach agent: [Reason for error]
2020/07/09 15:57:07 Datadog Tracer v1.26.0 WARN: DIAGNOSTICS Error(s) parsing DD_TRACE_SAMPLING_RULES:
    at index 1 ...
    at index 4 ....
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Los logs de inicio están desactivados por defecto a partir de la versión 2.x del rastreador. Pueden activarse utilizando la variable de entorno `DD_TRACE_STARTUP_LOGS=true`.

**Configuration:** (Configuración)

```text
[2020-07-02 14:51:16.421] [INFO] app - host:port==localhost:9080
[2020-07-02 14:51:16.423] [INFO] app - db type==mongo
[2020-07-02 14:51:16.439] [INFO] routes - Use dataaccess:../dataaccess/mongo/index.js
[2020-07-02 14:51:16.599] [INFO] app - Error connecting to database - exiting process: MongoError: connect ECONNREFUSED 127.0.0.1:27017
[2020-07-02 14:51:16.600] [INFO] app - Initialized database connections
[2020-07-02 14:51:16.601] [INFO] app - Express server listening on port 9080
DATADOG TRACER CONFIGURATION - {"date":"2020-07-02T18:51:18.294Z","os_name":"Darwin","os_version":"19.2.0","architecture":"x64","version":"0.23.0","lang":"nodejs","lang_version":"12.18.1","enabled":true,"service":"acmeair","agent_url":"http://localhost:8126","agent_error":"Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126","debug":false,"analytics_enabled":false,"sample_rate":1,"sampling_rules":[],"tags":{"service":"acmeair","version":"0.0.4"},"dd_version":"0.0.4","log_injection_enabled":false,"runtime_metrics_enabled":false,"integrations_loaded":["http","fs","net","dns","express@4.17.1"]}
```

**Diagnostics:**

El rastreador de Node.js imprime una línea de diagnóstico cuando no se puede acceder al Agent.

```text
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

**Localización del log:**

El rastreador de Python loguea información de configuración como nivel INFO. Loguea la información de diagnóstico, si se encuentra, como ERROR.

Si no hay registro de configuración, solo se emitirá Diagnostics (Diagnóstico) a `Stderr`.

Para ver los logs de inicio del rastreador, añade un registrador, o establece `DD_TRACE_DEBUG=true` en tu configuración y ejecuta tu aplicación con `ddtrace-run`. Esto añade un registrador y expone tanto los logs de depuración como de inicio del rastreador.

Para ver las opciones de registro en un archivo con `DD_TRACE_LOG_FILE`, lee [Logs de depuración del rastreador][1].

**Configuration:** (Configuración)

```text
2020-07-09 11:04:08,098 INFO [ddtrace.tracer] [tracer.py:338] - - DATADOG TRACER CONFIGURATION - {"date": "2020-07-09T15:04:08.092797", "os_name": "Darwin", "os_version": "19.5.0", "is_64_bit": true, "architecture": "64bit", "vm": "CPython", "version": "0.38.1.dev79+gd22e2972.d20200707", "lang": "python", "lang_version": "3.7.6", "pip_version": "20.0.2", "in_virtual_env": true, "agent_url": "http://localhost:1234", "agent_error": "Agent not reachable. Exception raised: [Errno 61] Connection refused", "env": "", "is_global_tracer": true, "enabled_env_setting": null, "tracer_enabled": true, "sampler_type": "DatadogSampler", "priority_sampler_type": "RateByServiceSampler", "service": "", "debug": true, "enabled_cli": true, "analytics_enabled": false, "log_injection_enabled": false, "health_metrics_enabled": false, "dd_version": "", "priority_sampling_enabled": true, "global_tags": "", "tracer_tags": "", "integrations": {"asyncio": "N/A", "boto": "N/A", "botocore": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.15.32", "module_imported": false, "config": "N/A"}, "bottle": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "0.12.18", "module_imported": false, "config": null}, "cassandra": "N/A", "celery": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "4.2.2", "module_imported": false, "config": "N/A"}, "consul": "N/A", "django": "N/A", "elasticsearch": "N/A", "algoliasearch": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "2.2.0", "module_imported": false, "config": "N/A"}, "futures": "N/A", "grpc": "N/A", "mongoengine": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.19.1", "module_imported": false, "config": "N/A"}, "mysql": "N/A", "mysqldb": "N/A", "pymysql": "N/A", "psycopg": "N/A", "pylibmc": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.6.1", "module_imported": false, "config": "N/A"}, "pymemcache": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.4.4", "module_imported": false, "config": "N/A"}, "pymongo": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.10.1", "module_imported": false, "config": "N/A"}, "redis": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.5.3", "module_imported": false, "config": "N/A"}, "rediscluster": "N/A", "requests": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "2.23.0", "module_imported": false, "config": "N/A"}, "sqlalchemy": "N/A", "sqlite3": "N/A", "aiohttp": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.6.2", "module_imported": false, "config": "N/A"}, "aiopg": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.15.0", "module_imported": false, "config": "N/A"}, "aiobotocore": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.0.1", "module_imported": false, "config": null}, "httplib": "N/A", "vertica": "N/A", "molten": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.7.4", "module_imported": false, "config": "N/A"}, "jinja2": "N/A", "mako": "N/A", "flask": "N/A", "kombu": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "4.3.0", "module_imported": false, "config": null}, "falcon": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.4.1", "module_imported": false, "config": null}, "pylons": "N/A", "pyramid": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.10.4", "module_imported": false, "config": null}, "logging": "N/A"}}
```

**Diagnostics:**

El rastreador de Python imprime una línea de diagnóstico cuando no se puede acceder al Agent.

```text
DATADOG TRACER DIAGNOSTIC - Agent not reachable. Exception raised: [Errno 61] Connection refused
```
[1]: /es/tracing/troubleshooting/tracer_debug_logs/?code-lang=python#enable-debug-mode

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

### Activar logs de inicio

Puedes activar logs de inicio utilizando la configuración de código o una variable de entorno:

**Código**:

Para activar los logs de inicio en tu código:

```ruby
Datadog.configure do |c|
     c.diagnostics.startup_logs.enabled = true
end
```
**Variable de entorno**:

Para activar los logs de inicio utilizando una variable de entorno:

```shell
export DD_TRACE_STARTUP_LOGS=true
```

### Salida

Cuando se activan los logs de inicio, el rastreador emite información de configuración y diagnóstico.

**Configuration:** (Configuración)

El rastreador Ruby imprime una línea de configuración para cada producto (por ejemplo, Profiling, Core y Tracing).

```text
I, [2023-08-16T18:09:01.972265 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - PROFILING - {"profiling_enabled":false}

I, [2023-08-16T18:09:01.972767 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - CORE - {"date":"2023-08-16T18:09:01+00:00","os_name":"aarch64-unknown-linux-gnu","version":"1.13.0","lang":"ruby","lang_version":"3.0.6","env":null,"service":"rails","dd_version":null,"debug":false,"tags":null,"runtime_metrics_enabled":false,"vm":"ruby-3.0.6","health_metrics_enabled":false}

I, [2023-08-16T18:09:27.223143 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - TRACING - {"enabled":true,"agent_url":"http://agent:8126?timeout=30","analytics_enabled":false,"sample_rate":null,"sampling_rules":null,"integrations_loaded":"active_model_serializers@,aws@","partial_flushing_enabled":false,"priority_sampling_enabled":false,"integration_active_model_serializers_analytics_enabled":"false","integration_active_model_serializers_analytics_sample_rate":"1.0","integration_active_model_serializers_enabled":"true","integration_active_model_serializers_service_name":"","integration_aws_analytics_enabled":"false","integration_aws_analytics_sample_rate":"1.0","integration_aws_enabled":"true","integration_aws_service_name":"aws","integration_aws_peer_service":""}
```

**Diagnostics:**

El rastreador de Ruby imprime una línea de error cuando no se puede acceder al Agent.

```text
W, [2020-07-08T21:19:05.765994 #143]  WARN -- ddtrace: [ddtrace] DATADOG ERROR - TRACER - Agent Error: Datadog::Transport::InternalErrorResponse ok?: unsupported?:, not_found?:, client_error?:, server_error?:, internal_error?:true, payload:, error_type:Errno::ECONNREFUSED error:Failed to open TCP connection to ddagent:9127 (Connection refused - connect(2) for "ddagent" port 9127)
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

**Configuration:** (Configuración)

```text
{"agent_url":"http://localhost:8126","analytics_enabled":false,"analytics_sample_rate":null,"date":"2020-07-03T00:44:37+0000","dd_version":"","enabled":true,"env":"test-env","lang":"cpp","lang_version":"201402","operation_name_override":"","report_hostname":false,"sampling_rules":"[{\"sample_rate\": 1.0}]","service":"service_name","tags":{},"version":"v1.2.0"}
```

**Diagnostics:**

Para C++, no hay líneas de salida `DATADOG TRACER DIAGNOSTICS` a los logs del rastreador. Sin embargo, si no se puede llegar al Agent, aparecen errores en tus logs de aplicación. En Envoy se produce un aumento de la métricas `tracing.datadog.reports_failed` y `tracing.datadog.reports_dropped`.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Errores de conexión

Si la aplicación o los logs de inicio contienen errores o mensajes `DIAGNOSTICS` a los que el Agent no puede acceder o conectarse (varían en función del lenguaje), significa que el rastreador no puede enviar trazas al Datadog Agent.

Si tienes estos errores, comprueba que tu Agent está configurado para recibir trazas para [ECS][1], [Kubernetes][2], [Docker][3] o [cualquier otra opción][4], o [contacta con soporte][5] para revisar tu rastreador y configuración del Agent.

Consulta [Errores de conexión][6] para obtener información sobre los errores que indican que tu aplicación instrumentada no puede comunicarse con el Datadog Agent.

## Ajustes de configuración

Si tus logs contienen solo líneas de `CONFIGURATION`, un paso útil para solucionar problemas es confirmar que la configuración de salida del rastreador coincide con la configuración de tu despliegue y configuración del rastreador de Datadog. Además, si no ves trazas específicas en Datadog, revisa la sección [Requisitos de compatibilidad][7] de la documentación para confirmar que estas integraciones son compatibles.

Si una integración que estás utilizando no es compatible, o deseas un análisis nuevo de tu salida de configuración para entender por qué las trazas no están apareciendo como se esperaba en Datadog, [ponte en contacto con el soporte][5] que puede ayudarte a diagnosticar y crear una Solicitud de características para una nueva integración.

## Desactivar los logs de inicio

Para cada lenguaje, puedes desactivar los logs de inicio configurando la variable de entorno `DD_TRACE_STARTUP_LOGS=false`, pero hazlo solo si los logs emitidos plantean un problema. Si más tarde envías logs de [depuración][8], recuerda habilitar los logs de inicio y enviar todos los logs relevantes juntos para acelerar el análisis de tu caso de soporte.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/amazon_ecs/?tab=java#trace-collection
[2]: /es/agent/kubernetes/?tab=helm
[3]: /es/agent/docker/apm/?tab=java
[4]: /es/tracing/send_traces/
[5]: /es/help/
[6]: /es/tracing/troubleshooting/connection_errors/
[7]: /es/tracing/compatibility_requirements/
[8]: /es/tracing/troubleshooting/tracer_debug_logs/