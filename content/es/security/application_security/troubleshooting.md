---
aliases:
- /es/security_platform/application_security/troubleshooting
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Monitorizar amenazas con Datadog App and API Protection
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection en Datadog
title: Solucionar problemas de App and API Protection
---

## Información general

Si experimentas un comportamiento inesperado al utilizar Datadog App and API Protection (AAP), existen algunos problemas comunes que puedes investigar, como se menciona a continuación. Si sigues teniendo problemas, ponte en contacto con el [servicio de asistencia de Datadog][1] para obtener más ayuda.

## Límites de frecuencia AAP

Las trazas (traces) de AAP tienen un límite de 100 trazas por segundo. Las trazas enviadas más llá del límite no se informan. Si necesitas cambiar el límite, ponte en contacto con el [servicio de asistencia de Datadog][1].

## AAP no detecta trazas de seguridad

Existe una serie de pasos que deben ejecutarse correctamente para que la información sobre amenazas aparezca en el [Explorador de trazas y señales][2] de AAP. Al investigar este problema, es importante verificar cada paso. Los pasos adicionales para solucionar problemas para lenguajes específicos se encuentran en la pestaña de lenguajes al final.

### Confirmar que la AAP está habilitado

Para comprobar si AAP se está ejecutando, puedes utilizar la métrica `datadog.apm.appsec_host`.

1. Ve a **Metrics > Summary** (Métricas > Resumen) en Datadog.
2. Busca la métrica `datadog.apm.appsec_host` . Si la métrica no existe, entonces no hay servicios ejecutando AAP. Si la métrica existe, los servicios se informan mediante las etiquetas (tags) de métricas `host` y `service`.
3. Selecciona la métrica y busca `service` en la sección **Etiquetas** para ver qué servicios están ejecutando AAP.

Si no ves `datadog.apm.appsec_host`, comprueba las [instrucciones en la aplicación][3] para confirmar que se han completado todos los pasos de la configuración inicial.

Los datos de AAP se envían con trazas de APM. Consulta [Solucionar problemas de APM][4] para [confirmar la configuración de APM][5] y comprobar si hay [errores de conexión][6].

### Envío de un ataque de prueba a tu aplicación

 Para probar tu configuración de AAP, activa la regla [Analizador de seguridad detectado][7], ejecutando un archivo que contenga el siguiente script curl:

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

**Nota:** El valor `dd-test-scanner-log` es compatible con las versiones más recientes.

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

**Nota:** El valor `dd-test-scanner-log` es compatible con las versiones más recientes.

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

**Nota:** El valor `dd-test-scanner-log` es compatible con las versiones más recientes.

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
**Nota:** El valor `dd-test-scanner-log` es compatible con las versiones más recientes.

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

Unos minutos después de habilitar tu aplicación y ejercitarla, si todo sale según lo esperado, aparecerá información sobre amenazas en el [Explorador de trazas y señales][2].

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="Página con información sobre señales de seguridad, que muestra etiquetas, métricas, pasos a seguir sugeridos y direcciones IP de atacantes asociados a una amenaza." style="width:100%;" >}}

### Comprobar si las integraciones requeridas del rastreador están desactivadas

AAP depende de ciertas integraciones del rastreador. Si están desactivadas, AAP no funcionará. Para ver si hay integraciones desactivadas, busca `disabled_integrations` en tus [logs de inicio][8].

Las integraciones requeridas varían según el lenguaje.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

Para Java, si utiliza alguna de las siguientes tecnologías, se requiere la respectiva integración:

- grizzly
- grizzly-filterchain
- jersey
- embarcadero
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

Para .NET, se requiere ASP.NET integración.

**Nota:** Si ASP.NET Core está deshabilitado, AAP debería seguir funcionando con este marco.


{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

No se requiere integraciones para PHP.
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Los siguientes marcos Go deben ser instrumentados utilizando las integraciones APM predefinidas:

{{% tracing-go-v2 %}}

- [gRPC][8] ([v1][2])
- [net/http][9] ([v1][3])
- [Gorilla Mux][10] ([v1][4])
- [Echo][11] ([v1][5])
- [Chi][12] ([v1][6])

Por favor, asegúrate de hacer referencia a los documentos apropiados para tu versión (v1.x o v2.x) de Go Tracer. Si tu marco no es compatible, [crea un nuevo incidente][7] en el repositorio Go.

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

Para Node.js, es necesario el HTTP integración.
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Para Ruby, se requiere la versión [Rack][2] integración. También se requiere la versión Ruby tracer `1.0.0` o superior. Consulte la información sobre [migración de 0.x a 1.x][3].

**Nota:** Rack puede añadirse manualmente o automáticamente con la integración [Rails][4] o [Sinatra][5]. Si se añade manualmente, el middleware del rastreador debe aparecer antes que el middleware de seguridad en el stack tecnológico de Rack.

[2]: /es/tracing/trace_collection/dd_libraries/ruby/#rack
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[4]: /es/tracing/trace_collection/dd_libraries/ruby/#rails
[5]: /es/tracing/trace_collection/dd_libraries/ruby/#sinatra
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Para Python, se requiere el WSGI integración junto con el integración para el
framework que esté utilizando, como Django o Flask integración.
<p></p>

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Comprobar la configuración del Datadog Agent

Para resolver este paso del proceso, haz lo siguiente:

- Comprueba los detalles del Agent que se está ejecutando en esta dirección `http://<agent-machine-name>:<agent-port>/info`, normalmente `http://localhost:8126/info`.
- Asegúrate de que no hay errores de transmisión del Agent relacionados con tramos (spans) en los [logs de tu rastreador][7].
- Si el Agent se instala en una máquina independiente, comprueba que `DD_AGENT_HOST` y, opcionalmente, `DD_TRACE_AGENT_PORT` están configurados, o que `DD_TRACE_AGENT_URL` está configurado para la biblioteca de rastreo de aplicaciones.

### Comprobar si los tramos se transmiten correctamente a Datadog

Los datos de AAP se envían a través de [tramos][9]. Para confirmar si los tramos se transmiten correctamente a Datadog, comprueba si tu rastreador contiene logs con un aspecto parecido al siguiente:

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

Si no se transmiten tramos, el rastreador contendrá logs con un aspecto parecido al siguiente:

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## Solucionar problemas por lenguaje

A continuación se indican los pasos adicionales para solucionar problemas para lenguajes específicos.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}
La biblioteca Java utiliza [SLF4J][1] para la generación de logs. Añade las siguientes marcas de tiempo de ejecución para que el rastreador genere logs en un archivo:

```java
 -Ddatadog.slf4j.simpleLogger.defaultLogLevel=info
 -Ddatadog.slf4j.simpleLogger.logFile=dd.log
```

Luego de que se inicia el servicio, el rastreador genera logs en un archivo especificado. Datadog recomienda utilizar `INFO` para el nivel de logs, ya que los logs `DEBUG` contienen muchos datos.

[1]: https://www.slf4j.org/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

La biblioteca .NET genera logs en un archivo, pero no puede generar logs en `stdout`/`stderr`. El nivel de logs por defecto es `INFO`. Para habilitar logs `DEBUG`, configura `DD_TRACE_DEBUG=true`.

Los archivos de log están disponibles en los siguientes directorios:

| Plataforma   | Directorio de logs    |
|------------|----------------|
| Docker       | Directorio del contenedor `/var/log/datadog/dotnet/`. Una opción recomendada es montar la carpeta de logs en la máquina host utilizando [volúmenes][1]. |
| Linux      | /var/log/datadog/dotnet/                                   |
| Windows    | C:\ProgramData\Datadog .NET Tracer\logs                    |

[1]: https://docs.docker.com/storage/volumes/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

En PHP, para empezar a solucionar problemas con la extensión AAP de Datadog, habilita logs de depuración en el archivo `.ini` de la extensión AAP.

El archivo `ini` de la extensión se encuentra normalmente en `/etc/php/<version>/xxx/conf.d/98-ddtrace.ini`, aunque su localización puede variar dependiendo de tu instalación. Observa el principio del resultado de `phpinfo()` para identificar el directorio que se analiza en busca de archivos `.ini`, si los hay. En el archivo `.ini`, define las siguientes opciones de configuración con lo siguiente:

```php
datadog.appsec.log_level='debug'
datadog.appsec.helper_extra_args='--log_level=debug'
datadog.appsec.helper_log_file='/tmp/helper.log'
```

La extensión envía logs al archivo de log por defecto `php_error`. Si no hay logs en el archivo, añade lo siguiente al archivo `.ini`:

```php
datadog.appsec.log_file='tmp/extension.log'
```

### La instalación no encuentra PHP
Si el script de instalación no puede encontrar la versión correcta de PHP, puedes configurar el `--php-bin` en la localización del binario PHP, por ejemplo:

```
$ php datadog-setup.php --php-bin /usr/bin/php7.4 --enable-appsec
```
### Fallo en la conexión con el auxiliar
Si la extensión AAP no puede comunicarse con el proceso del auxiliar, se genera la siguiente advertencia:

```
PHP Warning:  Unknown: [ddappsec] Connection to helper failed and we are not going to attempt to launch it: dd_error
```

La advertencia puede ir seguida de uno de estos mensajes de error:

```
PHP Warning:  Unknown: [ddappsec] Could not open lock file /tmp/ddappsec.lock: Permission denied in Unknown on line 0
```
```
PHP Warning:  Unknown: [ddappsec] Call to bind() failed: Permission denied
```
```
PHP Warning:  Unknown: [ddappsec] Failed to unlink /tmp/ddappsec.sock: Operation not permitted
```

Esto indica que el archivo de bloqueo o el archivo de socket utilizado por la extensión tiene permisos no válidos o que el usuario que ejecuta el proceso PHP no tiene acceso de escritura al directorio `tmp`.

Si el archivo de bloqueo o el archivo de socket tienen permisos no válidos, puedes eliminarlos y reiniciar Apache/FPM o ajustar el `user:group` para que coincida con el que Apache/FPM utiliza, por ejemplo, `www-data`.

Si el usuario no tiene acceso de escritura al directorio tmp, puedes cambiar la localización del archivo de bloqueo y del archivo de socket modificando los siguientes parámetros en el archivo `.ini` de la extensión:

```
datadog.appsec.helper_runtime_path = /<directory with compatible permissions>/
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### Confirmar que AAP está habilitado en la aplicación en ejecución

Los [logs de inicio del rastreador][1] muestran la configuración del rastreador y si AAP está habilitado o no. Si `appsec` es `true`, entonces AAP está habilitado y en ejecución.

Por ejemplo, el siguiente log de inicio muestra que AAP está deshabilitado:

```
2022/02/17 14:49:00 Datadog Tracer v1.36.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2022-02-17T14:49:00+01:00","os_name":"Linux (Unknown Distribution)","os_version":"5.13.0","version":"v1.36.0","lang":"Go","lang_version":"go1.17.1","env":"prod","service":"grpcserver","agent_url":"http://localhost:8126/v0.4/traces","debug":false,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","service_mappings":null,"tags":{"runtime-id":"69d99219-b68f-4718-9419-fa173a79351e"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"profiler_code_hotspots_enabled":false,"profiler_endpoints_enabled":false,"dd_version":"","architecture":"amd64","global_service":"","lambda_mode":"false","appsec":false,"agent_features":{"DropP0s":false,"Stats":false,"StatsdPort":0}}
```

#### Activa logs de depuración

Habilita logs de depuración con la variable de entorno `DD_TRACE_DEBUG=1`. La biblioteca AAP generará logs para el resultado de error estándar.

**Nota:** AAP solo envía logs cuando está habilitado. Utiliza la variable de entorno `DD_APPSEC_ENABLED=1` para habilitar AAP.

[1]: /es/tracing/troubleshooting/tracer_startup_logs/
{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Si has actualizado tu biblioteca Node.js de 1.x a 2.x, utiliza esta [guía de migración][1] para evaluar cualquier cambio de última hora.

Si no ves información sobre amenazas AAP en el [Explorador de trazas y señales][2] para tu aplicación Node.js, sigue estos pasos para solucionar el problema:

1. Confirma que se está ejecutando la última versión de AAP, comprobando que `appsec_enabled` es `true` en los [logs de inicio][3]

    a. Si no ves logs de inicio después de enviar una solicitud, añade la variable de entorno `DD_TRACE_STARTUP_LOGS=true` para habilitar los logs de inicio. Comprueba que los logs de inicio para `appsec_enabled` son `true`.

    b. Si `appsec_enabled` es `false`, entonces AAP no se ha habilitado correctamente. Consulta las [instrucciones de instalación][4].

    c. Si `appsec_enabled` no está en los logs de inicio, necesitas instalar la última versión de AAP. Consulta las [instrucciones de instalación][4].

2. ¿Funciona el rastreador? ¿Puedes ver trazas relevantes en el dashboard de APM?

    AAP depende del rastreador, por lo que si no ves trazas, es posible que el rastreador no esté funcionando. Consulta [Solucionar problemas de APM][5].

3. En el directorio de tu aplicación, ejecuta el comando `npm explore @datadog/native-appsec -- npm run install` y reinicia tu aplicación.

    a. Si no se encuentra `@datadog/native-appsec`, la instalación es incorrecta.

    b. Si `@datadog/native-appsec` es encontrado al iniciar tu aplicación, añade el comando a tu script de inicio del tiempo de ejecución.

    c. Si el rastreador sigue sin funcionar, es posible que estés ejecutando un tiempo de ejecución no compatible.

4. Para habilitar logs, añade las siguientes variables de entorno:

    ```
    DD_TRACE_DEBUG=1
    DD_TRACE_LOG_LEVEL=info
    ```

[1]: https://github.com/DataDog/dd-trace-js/blob/main/MIGRATING.md
[2]: https://app.datadoghq.com/security/appsec/
[3]: /es/tracing/troubleshooting/tracer_startup_logs/
[5]: /es/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Si no ves información sobre amenazas AAP en el [Explorador de trazas y señales][1] para tu aplicación Python, comprueba que AAP se está ejecutando y que tu rastreador está funcionando.

1. Define el nivel de logs de tu aplicación en `DEBUG` para confirmar que AAP se está ejecutando:

   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

   A continuación, ejecuta cualquier llamada HTTP a la aplicación. Deberías ver el siguiente log:

   ```
   DEBUG:ddtrace.appsec.processor:[DDAS-001-00] Executing AppSec In-App WAF with parameters:
   ```

   Si este log no está presente, significa que AAP no se está ejecutando.

2. ¿Funciona el rastreador? ¿Puedes ver trazas relevantes en el dashboard de APM?

   AAP depende del rastreador, por lo que si no ves trazas, es posible que el rastreador no esté funcionando. Consulta [Solucionar problemas de APM][2].


[1]: https://app.datadoghq.com/security/appsec/
[2]: /es/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

En Ruby, si no ves información sobre amenazas de AAP en el [Explorador de trazas y señales][1] después de unos minutos, habilita los diagnósticos del rastreador para [logs de depuración][2]. Por ejemplo:

```ruby
Datadog.configure do |c|
  c.diagnostics.debug = true  # increase general log level to debug
  c.appsec.waf_debug = true   # also enable WAF-specific log verbosity to highest level
end
```

Los logs de depuración contienen muchos datos pero son útiles. Si abres un ticket para el [servicio de asistencia de Datadog][1], reenvía los logs junto con tu solicitud.

#### ¿Está AAP correctamente habilitado?

AAP se ha habilitado correctamente si ves logs como el siguiente:

```
D, [2021-12-14T11:03:32.167125 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_info, :func=> "ddwaf_set_log_cb", :file=>"PowerWAFInterface.cpp", :message=>"Sending log messages to binding, min level trace"}
D, [2021-12-14T11:03:32.200491 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_debug, :func= >"parse", :file=>"parser_v2.cpp", :message=>"Loaded 124 rules out of 124 available in the ruleset"}
```

Si no ves estos logs, comprueba lo siguiente:

- Si las variables de entorno de AAP correctas están configuradas para el proceso de tu aplicación.
- Si la última versión del gem está instalada.
- Si el rastreador está configurado correctamente y envía trazas de APM a tu dashboard de APM.

#### ¿Se llama a AAP en cada solicitud HTTP?

Para confirmar que se llama a AAP en cada solicitud HTTP, activa un [ataque de prueba](#send-a-test-attack-to-your-application) y busca estos logs:

```
D, [2022-01-19T21:25:50.579745 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/reactive/operation.rb:14:in `initialize') operation: rack.request initialize
D, [2022-01-19T21:25:50.580300 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:25:in `block (2 levels) in watch') root span: 964736568335365930
D, [2022-01-19T21:25:50.580371 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:26:in `block (2 levels) in watch') active span: 964736568335365930
D, [2022-01-19T21:25:50.581061 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/reactive/request.rb:34:in `block in subscribe') reacted to ["request.headers", "request.uri.raw", "request.query", "request.cookies", "request.body.raw"]: [{"version"=>"HTTP/1.1", "host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, "http://127.0.0.1:9292/", [], {}, ""]
```

Si no ves estos logs, prueba lo siguiente:

- Comprueba si otro sistema de seguridad anterior no está filtrando las solicitudes basándose en el valor de cabecera del test, lo que impide que la solicitud llegue a la aplicación.
- Envía otro [ataque de prueba](#send-a-test-attack-to-your-application) utilizando otro valor del Agent del usuario en el comando curl, para ver si la información sobre la amenaza se envía correctamente.
- En la aplicación, busca los logs de la solicitud exacta que has ejecutado, para confirmar que la solicitud ha llegado a la aplicación y no ha sido respondida por otro sistema anterior.

Si la integración Rack se ha configurado manualmente, algunas veces el problema que impide el funcionamiento de AAP es uno conocido. Por ejemplo:

```ruby
Datadog.configure do |c|
  c.tracing.instrument :rails
  ...
  c.tracing.instrument :rack, web_service_name: "something", request_queuing: true
```

Si `c.tracing.instrument :rack` está presente, elimínalo para ver si el check se aprueba.

#### ¿Detecta AAP las amenazas a la seguridad de las solicitudes HTTP?

Para confirmar que AAP está detectando amenazas de seguridad, activa un [ataque de prueba](#send-a-test-attack-to-your-application) y busca estos logs:

```
D, [2021-12-14T22:39:53.268820 #106051] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/appsec/contrib/rack/reactive/request.rb:63:in `block in subscribe') WAF: #<struct Datadog::AppSec::WAF::Result action=:monitor, data=[{"rule"=>{"id"=>"ua0-600-10x", "name"=>"Nessus", "tags"=>{"type"=>"security_scanner", "category"=>"attack_attempt"}}, "rule_matches"=>[{"operator"=>"match_regex", "operator_value"=>"(?i)^Nessus(/|([ :]+SOAP))", "parameters"=>[{"address"=>"server.request.headers.no_cookies", "key_path"=>["user-agent"], "value"=>"Nessus SOAP", "highlight"=>["Nessus SOAP"]}]}]}], perf_data=nil, perf_total_runtime=20519>
```
Si no ves estos logs, comprueba que otro sistema de seguridad anterior no está filtrando las solicitudes o alterándolas basándose en el valor de cabecera del test.

#### ¿El rastreador envía trazas con datos de seguridad?
Los datos de AAP se envían con trazas de APM. Para confirmar que AAP detecta e inserta correctamente los datos de seguridad en las trazas, activa un [ataque de prueba](#send-a-test-attack-to-your-application) y busca los siguientes logs del rastreador:

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

Espera un minuto a que el Agent reenvíe las trazas y luego comprueba que estas aparecen en el dashboard de APM. La información de seguridad de las trazas puede tardar un tiempo adicional en ser procesada por Datadog, antes de aparecer como trazas de seguridad en el [Explorador de trazas y señales][1] de AAP.

[1]: https://app.datadoghq.com/security/appsec/
[2]: /es/tracing/troubleshooting/#tracer-debug-logs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Confirmar que AAP está habilitado

Para comprobar si AAP se está ejecutando, puedes utilizar la métrica `datadog.apm.appsec_host`.

1. Ve a **Metrics > Summary** (Métricas > Resumen) en Datadog.
2. Busca la métrica `datadog.apm.appsec_host` . Si la métrica no existe, entonces no hay servicios ejecutando AAP. Si la métrica existe, los servicios se informan mediante las etiquetas de métricas `host` y `service`.
3. Selecciona la métrica y busca `service` en la sección **Etiquetas** para ver qué servicios están ejecutando AAP.

Si no ves `datadog.apm.appsec_host`, comprueba las [instrucciones en la aplicación][3] para confirmar que se han completado todos los pasos de la configuración inicial.

Los datos de AAP se envían con trazas de APM. Consulta [Solucionar problemas de APM][4] para [confirmar la configuración de APM][5] y comprobar si hay [errores de conexión][6].

### Confirmar que las versiones del rastreador están actualizadas

Consulta la documentación de configuración del producto App and API Protection para confirmar que estás utilizando la versión correcta del rastreador. Estas versiones mínimas son necesarias para comenzar a enviar datos de telemetría que incluyan información de la biblioteca.

### Garantizar la comunicación de los datos de telemetría

Asegúrate de que la variable de entorno `DD_INSTRUMENTATION_TELEMETRY_ENABLED` (`DD_TRACE_TELEMETRY_ENABLED` para Node.js) está configurada como `true` o que la propiedad del sistema correspondiente a tu lenguaje está habilitada. Por ejemplo, en Java: `-Ddd.instrumentation.telemetry.enabled=true`

## Deshabiltar AAP

Para desactivar AAP, utiliza uno de los siguientes métodos.

Si habilitaste AAP utilizando la variable de entorno `DD_APPSEC_ENABLED=true`, utiliza la sección DD_APPSEC_ENABLED a continuación.
Si habilitaste AAP mediante la [Configuración remota][16], utiliza el método de configuración remota que se indica a continuación.

### DD_APPSEC_ENABLED

Si la variable de entorno `DD_APPSEC_ENABLED=true` está configurada para tu servicio, elimina la variable de entorno `DD_APPSEC_ENABLED=true` de la configuración de tu aplicación y reinicia tu servicio.

Si tu servicio es un servicio PHP, define explícitamente la variable de entorno `DD_APPSEC_ENABLED=false` y, si corresponde, comenta el indicador `datadog.appsec.enabled = On` en el archivo de configuración `php.ini`. A continuación, reinicia tu servicio.

### Configuración remota

Si AAP se habilitó mediante [configuración remota][16], haz lo siguiente: 
  1. Ve a [Services (Servicios)][15].
  2. Selecciona **App & API Protection in Monitoring Mode** (App & API Protection en modo de monitorización).
  3. En la faceta **App & API Protection**, activa **Monitoring Only** (Solo monitorización), **No data** (Sin datos) y **Ready to block** (Listo para bloquear).
  4. Haz clic en un servicio.
  5. En los detalles del servicio, en **App & API Protection**, haz clic en **Deactivate** (Desactivar).

<div class="alert alert-info">Si AAP se habilitó mediante <a href="https://app.datadoghq.com/organization-settings/remote-config">configuración remota</a>, puedes utilizar el botón <strong>Deactivate</strong> (Desactivar). Si AAP se habilitó mediante configuración local, el botón <strong>Deactivate</strong> (Desactivar) no es una opción.</div>

### Desactivar en bloque

Para deshabilitar AAP en tus servicios de forma masiva, haz lo siguiente: 
  1. Ve a [Services (Servicios)][15].
  3. En la faceta **App & API Protection**, activa **Monitoring Only** (Solo monitorización), **No data** (Sin datos) y **Ready to block** (Listo para bloquear).
  3. Selecciona las casillas de verificación de servicios en las que quieres deshabilitar la detección de amenazas.
  4. En **Bulk Actions** (Acciones en bloque), selecciona **Deactivate Threat detection on (number of) services** (Desactivar detección de amenazas en (número) servicios).


## ¿Necesitas más ayuda?

Si sigues teniendo problemas con AAP, ponte en contacto con el [servicio de asistencia de Datadog][1] con la siguiente información:

- Confirmación de que el [ataque de prueba](#send-a-test-attack-to-your-application) se ha enviado correctamente
- [Inicio][8] del rastreador o logs de [depuración][10]

## Referencias adicionales

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