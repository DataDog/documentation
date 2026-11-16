---
aliases:
- /es/security_platform/application_security/troubleshooting
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Monitoreo de amenazas con Datadog App and API Protection
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection en Datadog
title: Solución de problemas de protección de aplicaciones y API
---
## Descripción general {#overview}

Si experimenta un comportamiento inesperado con Datadog App and API Protection (AAP), hay problemas comunes que puede investigar, como se menciona a continuación. Si continúa teniendo problemas, comuníquese con el [soporte de Datadog][1] para obtener más ayuda.

## Límites de tasa de AAP {#aap-rate-limits}

Las trazas de AAP tienen un límite de tasa de 100 trazas por segundo. Las trazas enviadas después del límite no se reportan. Comuníquese con el [soporte de Datadog][1] si necesita cambiar el límite.

## No se detectaron trazas de seguridad por AAP {#no-security-traces-detected-by-aap}

Hay una serie de pasos que deben ejecutarse correctamente para que la información de amenazas aparezca en el [Explorador de trazas y señales][2] de AAP. Es importante verificar cada paso al investigar este problema. Pasos adicionales de solución de problemas para lenguajes específicos se encuentran en la pestaña de lenguaje al final.

### Confirme que AAP esté habilitado {#confirm-aap-is-enabled}

Puede usar la métrica `datadog.apm.appsec_host` para verificar si AAP se está ejecutando.

1. Vaya a **Metrics > Summary** en Datadog.
2. Busque la métrica `datadog.apm.appsec_host`. Si la métrica no existe, entonces no hay servicios ejecutando AAP. Si la métrica existe, los servicios se reportan con las etiquetas de métrica `host` y `service`.
3. Seleccione la métrica y, en la sección **Tags**, busque `service` para ver qué servicios están ejecutando AAP.

Si no ve `datadog.apm.appsec_host`, consulte las [instrucciones en la aplicación][3] para confirmar que todos los pasos de la configuración inicial estén completos.

Los datos de AAP se envían con trazas de APM. Consulte [solución de problemas de APM][4] para [confirmar la configuración de APM][5] y verificar si hay [errores de conexión][6].

### Envíe un ataque de prueba a su aplicación {#send-a-test-attack-to-your-application}

 Para probar su configuración de AAP, active la regla [Security Scanner Detected][7] ejecutando un archivo que contenga el siguiente script de curl:

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**Nota:** El valor `dd-test-scanner-log` es compatible en las versiones más recientes.

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**Nota:** El valor `dd-test-scanner-log` es compatible en las versiones más recientes.

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# Target existing service's routes 
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service's routes 
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done

```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**Nota:** El valor `dd-test-scanner-log` es compatible en las versiones más recientes.

{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```
**Nota:** El valor `dd-test-scanner-log` es compatible en las versiones más recientes.

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

Unos minutos después de habilitar su aplicación y probarla, y si tiene éxito, la información sobre amenazas aparece en el [Explorador de trazas y señales][2].

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="Página de detalles de Security Signal que muestra etiquetas, métricas, próximos pasos sugeridos y direcciones IP del atacante asociadas con una amenaza." style="width:100%;" >}}

### Verifique si las integraciones de tracer requeridas están desactivadas {#check-if-required-tracer-integrations-are-deactivated}

AAP depende de ciertas integraciones de tracer. Si están desactivadas, AAP no funcionará. Para ver si hay integraciones desactivadas, busque `disabled_integrations` en sus [registros de inicio][8].

Las integraciones requeridas varían según el lenguaje.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

Para Java, si utiliza alguna de las siguientes tecnologías, se requiere la integración respectiva:

- grizzly
- grizzly-filterchain
- jersey
- jetty
- ratpack
- ratpack-request-body (también requiere ratpack)
- resteasy
- servlet
- servlet-2
- servlet-3
- servlet-request-body (también requiere servlet)
- spring-web
- tomcat


{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Para .NET, se requiere la integración de ASP.NET.

**Nota:** Si ASP.NET Core está deshabilitado, AAP debería seguir funcionando con este framework.


{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

No hay integraciones requeridas para PHP.
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Los siguientes frameworks de Go deben ser instrumentados utilizando las integraciones de APM listas para usar.

{{% tracing-go-v2 %}}

- [gRPC][8] ([v1][2])
- [net/http][9] ([v1][3])
- [Gorilla Mux][10] ([v1][4])
- [Echo][11] ([v1][5])
- [Chi][12] ([v1][6])

Por favor, asegúrese de consultar la documentación adecuada para su versión (v1.x o v2.x) del Go Tracer. Si su framework no es compatible, [cree una nueva incidencia][7] en el repositorio de Go.

[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://github.com/DataDog/dd-trace-go/issues/new?title=Missing%20appsec%20framework%20support
[8]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2
[9]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http/v2
[10]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2
[11]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[12]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi.v5/v2
[13]: /es/tracing/trace_collection/custom_instrumentation/go/migration

{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Para Node.js, se requiere la integración HTTP.
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Para Ruby, se requiere la integración [Rack][2]. También se requiere la versión `1.0.0` o superior del tracer de Ruby. Consulte la información sobre la [migración de 0.x a 1.x][3].

**Nota:** Rack puede agregarse manualmente o automáticamente con la integración de [Rails][4] o [Sinatra][5]. Si se agrega manualmente, el middleware del rastreador debe aparecer antes del middleware de seguridad en la pila de Rack.

[2]: /es/tracing/trace_collection/dd_libraries/ruby/#rack
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[4]: /es/tracing/trace_collection/dd_libraries/ruby/#rails
[5]: /es/tracing/trace_collection/dd_libraries/ruby/#sinatra
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Para Python, se requiere la integración de WSGI junto con la integración para el
marco de trabajo que esté utilizando, como la integración de Django o Flask.
<p></p>

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Verifique la configuración del Datadog Agent {#check-datadog-agent-configuration}

 Para solucionar problemas en este paso del proceso, haga lo siguiente:

- Verifique los detalles del Agent en ejecución en esta dirección `http://<agent-machine-name>:<agent-port>/info`, generalmente `http://localhost:8126/info`.
- Asegúrese de que no haya errores de transmisión del Agente relacionados con los spans en sus [registros del tracer][10].
- Si el Agente está instalado en una máquina separada, verifique que `DD_AGENT_HOST` y, opcionalmente, `DD_TRACE_AGENT_PORT` estén configurados, o que `DD_TRACE_AGENT_URL` esté configurado para el SDK de la aplicación.

### Verifique si los spans se transmiten correctamente a Datadog {#check-if-spans-are-successfully-transmitted-to-datadog}

Los datos de AAP se envían a través de [spans][9]. Para confirmar que los spans se transmiten correctamente a Datadog, verifique que sus registros del tracer contengan registros similares a este:

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

Si los spans no se están transmitiendo, entonces los registros del tracer contendrán registros similares a este:

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## Solución de problemas por lenguaje {#troubleshooting-by-language}

A continuación se presentan pasos adicionales de solución de problemas para lenguajes específicos.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}
La biblioteca de Java utiliza [SLF4J][1] para el registro. Agregue las siguientes banderas de tiempo de ejecución para que el SDK registre en un archivo:

```java
 -Ddatadog.slf4j.simpleLogger.defaultLogLevel=info
 -Ddatadog.slf4j.simpleLogger.logFile=dd.log
```

Después de que el servicio se inicia, el SDK registra en el archivo especificado. Datadog recomienda usar `INFO` para el nivel de registro porque los registros `DEBUG` son detallados.

[1]: https://www.slf4j.org/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

La biblioteca .NET registra en un archivo y no puede registrar en `stdout`/`stderr`. El nivel de registro predeterminado es `INFO`. Para habilitar los registros `DEBUG`, establezca `DD_TRACE_DEBUG=true`.

Los archivos de registro están disponibles en los siguientes directorios:

| Plataforma 	 | Directorio de registros 	|
|------------|----------------|
| Docker 	   | El directorio del contenedor `/var/log/datadog/dotnet/`. Una opción recomendada es montar la carpeta de registros en la máquina servidor usando [volumes][1]. |
| Linux	     | /var/log/datadog/dotnet/	                                  |
| Windows 	 | C:\ProgramData\Datadog .NET Tracer\logs                    |

[1]: https://docs.docker.com/storage/volumes/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

Para PHP, para comenzar a solucionar problemas con la extensión AAP de Datadog, habilite los registros de depuración en el archivo `.ini` de la extensión AAP.

El archivo `ini` de la extensión generalmente se encuentra en `/etc/php/<version>/xxx/conf.d/98-ddtrace.ini`, pero la ubicación puede variar según su instalación. Revise el principio de la salida de `phpinfo()` para identificar el directorio que se analiza en busca de archivos `.ini`, si los hay. En el archivo `.ini`, establezca las siguientes opciones de configuración con lo siguiente:

```php
datadog.appsec.log_level='debug'
datadog.appsec.helper_extra_args='--log_level=debug'
datadog.appsec.helper_log_file='/tmp/helper.log'
```

La extensión envía los registros al archivo de registro `php_error` predeterminado. Si no hay registros en el archivo, agregue lo siguiente al archivo `.ini`:

```php
datadog.appsec.log_file='tmp/extension.log'
```

### La instalación no encuentra PHP {#installation-fails-to-find-php}
Si el script de instalación no puede encontrar la versión correcta de PHP, puede establecer `--php-bin` en la ubicación del binario de PHP, por ejemplo:

```
$ php datadog-setup.php --php-bin /usr/bin/php7.4 --enable-appsec
```
### Error en la conexión con el asistente {#connection-to-helper-failed}
Si la extensión AAP no puede comunicarse con el proceso del asistente, aparece la siguiente advertencia:

```
PHP Warning:  Unknown: [ddappsec] Connection to helper failed and we are not going to attempt to launch it: dd_error
```

La advertencia podría ir seguida de uno de estos mensajes de error:

```
PHP Warning:  Unknown: [ddappsec] Could not open lock file /tmp/ddappsec.lock: Permission denied in Unknown on line 0
```

```
PHP Warning:  Unknown: [ddappsec] Call to bind() failed: Permission denied
```

```
PHP Warning:  Unknown: [ddappsec] Failed to unlink /tmp/ddappsec.sock: Operation not permitted
```

Esto indica que el archivo de bloqueo o el archivo de socket utilizado por la extensión tiene permisos no válidos, o que el usuario que ejecuta el proceso PHP no tiene acceso de escritura al directorio `tmp`.

Si el archivo de bloqueo o el archivo de socket tiene permisos no válidos, puede eliminarlos y reiniciar Apache/FPM o ajustar `user:group` para que coincida con el utilizado por Apache/FPM, por ejemplo, `www-data`.

Si el usuario no tiene acceso de escritura al directorio tmp, puede cambiar la ubicación del archivo de bloqueo y del archivo de socket modificando los siguientes ajustes en el archivo `.ini` de la extensión:

```
datadog.appsec.helper_runtime_path = /<directory with compatible permissions>/
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### Confirme que AAP esté habilitado en la aplicación en ejecución {#confirm-aap-is-enabled-in-the-running-application}

Los [registros de inicio del SDK][1] muestran la configuración del SDK y si AAP está habilitado o no. Si `appsec` es `true`, entonces AAP está habilitado y en ejecución.

Por ejemplo, el siguiente registro de inicio muestra que AAP está deshabilitado:

```
2022/02/17 14:49:00 Datadog Tracer v1.36.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2022-02-17T14:49:00+01:00","os_name":"Linux (Unknown Distribution)","os_version":"5.13.0","version":"v1.36.0","lang":"Go","lang_version":"go1.17.1","env":"prod","service":"grpcserver","agent_url":"http://localhost:8126/v0.4/traces","debug":false,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","service_mappings":null,"tags":{"runtime-id":"69d99219-b68f-4718-9419-fa173a79351e"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"profiler_code_hotspots_enabled":false,"profiler_endpoints_enabled":false,"dd_version":"","architecture":"amd64","global_service":"","lambda_mode":"false","appsec":false,"agent_features":{"DropP0s":false,"Stats":false,"StatsdPort":0}}
```

#### Habilite registros de depuración {#enable-debug-logs}

Habilite los registros de depuración con la variable de entorno `DD_TRACE_DEBUG=1`. La biblioteca AAP registrará en la salida de error estándar.

**Nota:** AAP solo genera registros cuando está habilitado. Use la variable de entorno `DD_APPSEC_ENABLED=1` para habilitar AAP.

[1]: /es/tracing/troubleshooting/tracer_startup_logs/
{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Utilice esta [guía de migración][1] para evaluar cualquier cambio importante si actualizó su biblioteca de Node.js de la versión 1.x a la 2.x.

Si no ve información de amenazas de AAP en el [Explorador de traza y señales][2] para su aplicación de Node.js, siga estos pasos para solucionar el problema:

1. Confirme que la versión más reciente de AAP se está ejecutando verificando que `appsec_enabled` sea `true` en los [registros de inicio][3].
   1. Si no ve registros de inicio después de haber enviado una solicitud, agregue la variable de entorno `DD_TRACE_STARTUP_LOGS=true` para habilitar los registros de inicio. Verifique en los registros de inicio que `appsec_enabled` sea `true`.
   1. Si `appsec_enabled` es `false`, entonces AAP no se habilitó correctamente. Consulte las [instrucciones de instalación][4].
   1. Si `appsec_enabled` no aparece en los registros de inicio, es necesario instalar la versión más reciente de AAP. Consulte las [instrucciones de instalación][4].
2. Confirme que el SDK funciona buscando trazas relevantes en el panel de control de APM.<br />
    AAP depende del SDK, por lo que si no ve trazas, es posible que el SDK no esté funcionando. Consulte [APM Troubleshooting][5].
3. En el directorio de su aplicación, ejecute el comando `npm explore @datadog/native-appsec -- npm run install` y reinicie su aplicación.
   1. Si `@datadog/native-appsec` no se encuentra, entonces la instalación es incorrecta.
   1. Si `@datadog/native-appsec` se encuentra al iniciar su aplicación, agregue el comando a su script de inicio de tiempo de ejecución.
   1. Si el SDK aún no funciona, es posible que esté ejecutando un tiempo de ejecución no compatible.
4. Para habilitar los registros, agregue las siguientes variables de entorno:
    ```
    DD_TRACE_DEBUG=1
    DD_TRACE_LOG_LEVEL=info
    ```

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: https://app.datadoghq.com/security/appsec/
[3]: /es/tracing/troubleshooting/tracer_startup_logs/
[4]: /es/security/application_security/setup/nodejs/
[5]: /es/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Si no ve información de amenazas de AAP en el [Explorador de Trazas y Señales][1] para su aplicación de Python, verifique que AAP se esté ejecutando y que su trazador esté funcionando.

1. Establezca el nivel de registro de su aplicación en `DEBUG` para confirmar que AAP se está ejecutando:

   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```
  
   Luego, ejecute cualquier llamada HTTP a la aplicación. Debería ver el siguiente registro:
  
   ```
   DEBUG:ddtrace.appsec.processor:[DDAS-001-00] Executing AppSec In-App WAF with parameters:
   ```
  
   Si este registro no aparece, AAP no se está ejecutando.

2. ¿Está funcionando el SDK? ¿Puede ver trazas relevantes en el panel de APM?

   AAP depende del SDK. Si no ve trazas, es posible que el SDK no esté funcionando. Consulte [APM Troubleshooting][2].


[1]: https://app.datadoghq.com/security/appsec/
[2]: /es/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Para Ruby, si no ve información de amenazas de AAP en el [Trace and Signals Explorer][1] después de unos minutos, habilite los diagnósticos del trazador para [debug logs][2]. Por ejemplo:

```ruby
Datadog.configure do |c|
  c.diagnostics.debug = true  # increase general log level to debug
  c.appsec.waf_debug = true   # also enable WAF-specific log verbosity to highest level
end
```

Los registros de depuración son detallados pero útiles. Si abre un ticket con [Datadog support][1], envíe los registros con su solicitud.

#### ¿Está AAP habilitado correctamente? {#is-aap-correctly-enabled}

AAP se ha habilitado correctamente si ve registros como:

```
D, [2021-12-14T11:03:32.167125 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_info, :func=> "ddwaf_set_log_cb", :file=>"PowerWAFInterface.cpp", :message=>"Sending log messages to binding, min level trace"}
D, [2021-12-14T11:03:32.200491 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_debug, :func= >"parse", :file=>"parser_v2.cpp", :message=>"Loaded 124 rules out of 124 available in the ruleset"}
```

Si no ve esos registros, verifique lo siguiente:

- Si las variables de entorno de AAP correctas están configuradas para su proceso de aplicación.
- La última versión de la gema está instalada.
- El SDK está configurado correctamente y enviando trazas de APM a su panel de APM.

#### ¿Se llama a AAP para cada solicitud HTTP? {#is-aap-called-for-each-http-request}

Para confirmar que se llama a AAP para cada solicitud HTTP, active un [ataque de prueba](#send-a-test-attack-to-your-application) y busque estos registros:

```
D, [2022-01-19T21:25:50.579745 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/reactive/operation.rb:14:in `initialize') operation: rack.request initialize
D, [2022-01-19T21:25:50.580300 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:25:in `block (2 levels) in watch') root span: 964736568335365930
D, [2022-01-19T21:25:50.580371 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:26:in `block (2 levels) in watch') active span: 964736568335365930
D, [2022-01-19T21:25:50.581061 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/reactive/request.rb:34:in `block in subscribe') reacted to ["request.headers", "request.uri.raw", "request.query", "request.cookies", "request.body.raw"]: [{"version"=>"HTTP/1.1", "host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, "http://127.0.0.1:9292/", [], {}, ""]
```

Si no ve esos registros, intente lo siguiente:

- Verifique que otro sistema de seguridad ascendente no esté filtrando las solicitudes según el valor del encabezado de prueba, lo que impediría que la solicitud llegue a la aplicación.
- Envíe otro [ataque de prueba](#send-a-test-attack-to-your-application) usando otro valor de agente de usuario en el comando curl para ver si la información de la amenaza se envía correctamente.
- Busque en los registros de la aplicación la solicitud exacta que ejecutó para confirmar que la solicitud llegó a la aplicación y que no fue respondida por otro sistema ascendente.

Si la integración de Rack se configuró manualmente, a veces un problema conocido impide que AAP funcione. Por ejemplo:

```ruby
Datadog.configure do |c|
  c.tracing.instrument :rails
  ...
  c.tracing.instrument :rack, web_service_name: "something", request_queuing: true
```

Si `c.tracing.instrument :rack` está presente, elimínelo para ver si la verificación pasa.

#### ¿Está AAP detectando amenazas de seguridad en las solicitudes HTTP? {#is-aap-detecting-http-request-security-threats}

Para confirmar que AAP está detectando amenazas de seguridad, active un [ataque de prueba](#send-a-test-attack-to-your-application) y busque estos registros:

```
D, [2021-12-14T22:39:53.268820 #106051] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/appsec/contrib/rack/reactive/request.rb:63:in `block in subscribe') WAF: #<struct Datadog::AppSec::WAF::Result action=:monitor, data=[{"rule"=>{"id"=>"ua0-600-10x", "name"=>"Nessus", "tags"=>{"type"=>"security_scanner", "category"=>"attack_attempt"}}, "rule_matches"=>[{"operator"=>"match_regex", "operator_value"=>"(?i)^Nessus(/|([ :]+SOAP))", "parameters"=>[{"address"=>"server.request.headers.no_cookies", "key_path"=>["user-agent"], "value"=>"Nessus SOAP", "highlight"=>["Nessus SOAP"]}]}]}], perf_data=nil, perf_total_runtime=20519>
```
Si no ve esos registros, verifique que otro sistema de seguridad ascendente no esté filtrando las solicitudes o alterándolas según el valor del encabezado de prueba.

#### ¿Está el SDK enviando trazas con datos de seguridad? {#is-the-sdk-sending-traces-with-security-data}
Los datos de AAP se envían con trazas de APM. Para confirmar que AAP detecta e inserta correctamente los datos de seguridad en las trazas, active un [ataque de prueba](#send-a-test-attack-to-your-application) y busque estos registros del trazador:

```
Tags: [
   runtime-id => 0c3dfc67-9cf3-457c-a980-0229b203d048,
   _dd.runtime_family => ruby,
   appsec.event => true,
   _dd.appsec.json => {"triggers":[{"rule":{"id":"ua0-600-10x","name":"Nessus","tags":{"type":"security_scanner","category":"attack_attempt"}},"rule_matches":[{"operator":"match_regex","operator_value":"(?i)^Nessus(/|([ :]+SOAP))","parameters":[{"address":"server.request.headers.no_cookies","key_path":["user-agent"],"value":"Nessus SOAP","highlight":["Nessus SOAP"]}]}]}]},
   http.request.headers.host => 127.0.0.1:9292,
   http.request.headers.accept => */*,
   http.request.headers.user-agent => Nessus SOAP,
   http.response.headers.content-type => text/plain,
   http.host => 127.0.0.1,
   http.useragent => Nessus SOAP,
   network.client.ip => 127.0.0.1,
   _dd.origin => appsec,
   http.method => GET,
   http.url => /,
   http.base_url => http://127.0.0.1:9292,
   http.status_code => 200,
   http.response.headers.content_type => text/plain]
Metrics: [
   _dd.agent_psr => 1.0,
   system.pid => 155644.0,
   _dd.appsec.enabled => 1.0,
   _dd.measured => 1.0,
   _sampling_priority_v1 => 2.0]]
```

Espere un minuto a que el agente reenvíe las trazas, luego verifique que las trazas aparezcan en el panel de APM. La información de seguridad en las trazas puede tardar más tiempo en ser procesada por Datadog antes de aparecer como trazas de seguridad en el [Explorador de trazas y señales][1] de AAP.

[1]: https://app.datadoghq.com/security/appsec/
[2]: /es/tracing/troubleshooting/#tracer-debug-logs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Confirme que las versiones del trazador estén actualizadas {#confirm-tracer-versions-are-updated}

Consulte la documentación de configuración del producto de Protección de aplicaciones y API para validar que está utilizando la versión correcta del SDK. Estas versiones mínimas son necesarias para comenzar a enviar datos de telemetría que incluyan información de la biblioteca.

### Asegure la comunicación de los datos de telemetría {#ensure-the-communication-of-telemetry-data}

Asegúrese de que la variable de entorno `DD_INSTRUMENTATION_TELEMETRY_ENABLED` (`DD_TRACE_TELEMETRY_ENABLED` para Node.js) esté establecida en `true`, o que la propiedad del sistema correspondiente para su lenguaje esté habilitada. Por ejemplo, en Java: `-Ddd.instrumentation.telemetry.enabled=true`

## Deshabilitar AAP {#disabling-aap}

Para deshabilitar AAP, utilice uno de los siguientes métodos.

Si habilitó AAP utilizando la variable de entorno `DD_APPSEC_ENABLED=true`, utilice la sección DD_APPSEC_ENABLED a continuación.
Si habilitó AAP utilizando [Remote Configuration][16], utilice el método de Remote Configuration a continuación.

### DD_APPSEC_ENABLED {#dd-appsec-enabled}

Si la variable de entorno `DD_APPSEC_ENABLED=true` está configurada para su servicio, elimine la variable de entorno `DD_APPSEC_ENABLED=true` de la configuración de su aplicación y reinicie su servicio.

Si su servicio es un servicio PHP, establezca explícitamente la variable de entorno en `DD_APPSEC_ENABLED=false` y, si corresponde, comente la marca `datadog.appsec.enabled = On` de su archivo de configuración `php.ini`. Luego, reinicie su servicio. 

### Remote Configuration {#remote-configuration}

Si AAP se activó mediante [Remote Configuration][16], haga lo siguiente: 
  1. Vaya a [{{< ui >}}Services{{< /ui >}}][15].
  2. Seleccione {{< ui >}}App & API Protection in Monitoring Mode{{< /ui >}}.
  3. En la faceta {{< ui >}}App & API Protection{{< /ui >}}, habilite {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}} y {{< ui >}}Ready to block{{< /ui >}}.
  4. Haga clic en un servicio.
  5. En los detalles del servicio, en {{< ui >}}App & API Protection{{< /ui >}}, haga clic en {{< ui >}}Deactivate{{< /ui >}}.

<div class="alert alert-info">Si AAP se activó mediante <a href="https://app.datadoghq.com/organization-settings/remote-config">Remote Configuration</a>, puede usar un botón de <strong>Desactivar</strong>. Si AAP se activó mediante la configuración local, el botón <strong>Desactivar</strong> no es una opción.</div>

### Deshabilitar en bloque {#bulk-disable}

Para deshabilitar AAP en sus servicios de forma masiva, haga lo siguiente: 
  1. Vaya a [{{< ui >}}Services{{< /ui >}}][15].
  3. En la faceta {{< ui >}}App & API Protection{{< /ui >}}, habilite {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}} y {{< ui >}}Ready to block{{< /ui >}}.
  3. Seleccione las casillas de verificación de los servicios en los que desea deshabilitar la detección de amenazas.
  4. En {{< ui >}}Bulk Actions{{< /ui >}}, seleccione {{< ui >}}Deactivate Threat detection on (number of) services{{< /ui >}}.

  
## ¿Necesita más ayuda? {#need-more-help}

Si sigue teniendo problemas con AAP, comuníquese con [soporte de Datadog][1] con la siguiente información:

- Confirmación de que el [ataque de prueba](#send-a-test-attack-to-your-application) se envió correctamente
- Tracer [startup][8] o [debug][10] registros

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: https://app.datadoghq.com/security/appsec/
[3]: https://app.datadoghq.com/security/appsec?instructions=all
[4]: /es/tracing/troubleshooting/
[5]: /es/tracing/troubleshooting/#confirm-apm-setup-and-agent-status
[6]: /es/tracing/troubleshooting/connection_errors/
[7]: /es/security/default_rules/security-scan-detected/
[8]: /es/tracing/troubleshooting/tracer_startup_logs/
[9]: /es/tracing/glossary/#spans
[10]: /es/tracing/troubleshooting/#tracer-debug-logs
[12]: https://app.datadoghq.com/security/appsec/vm
[13]: /es/security/code_security/iast/
[14]: /es/security/code_security/software_composition_analysis
[15]: https://app.datadoghq.com/security/configuration/asm/services-config
[16]: https://app.datadoghq.com/organization-settings/remote-config
[17]: https://ddtrace.readthedocs.io/en/stable/integrations.html#flask