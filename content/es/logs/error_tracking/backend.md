---
description: Aprende a realizar un rastreo de los errores de backend desde tus logs.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Entiende los problemas de las aplicaciones con el seguimiento de errores de
    Datadog
- link: /logs/error_tracking/explorer/
  tag: Documentación
  text: Más información sobre Error Tracking Explorer
is_beta: true
kind: documentación
title: Rastrear errores de backend
---

## Información general

Si aún no estás recopilando logs con Datadog, consulta la [documentación de logs][10] para configurar logs. Asegúrate de que la etiqueta `source` (especificando el idioma) está correctamente configurada. Datadog recomienda configurar la recopilación de log basada en Agent.

## Configuración

Para idiomas como **Python**, **Java** y **Ruby**, no se necesita configuración adicional si la etiqueta `source` en tus logs está configurada correctamente. Todos los atributos necesarios se etiquetan automáticamente y se envían a Datadog.

Para lenguajes backend como **C#**, **.NET**, **Go** y **Node.js**, los ejemplos de código de cada sección demuestran cómo configurar correctamente un log de error y adjuntar la stack trace necesaria en la `error.stack` del log.

Si ya estás enviando stack traces a Datadog, pero no están en `error.stack`, puedes configurar una [reasignación de log genérica][8] para reasignar la stack trace al atributo correcto en Datadog.

Para configurar fragmentos de código en línea en las incidencias, configura la [integración del código fuente][9]. Añadir fragmentos de código en el rastreo de errores para logs no requiere APM; las etiquetas de enriquecimiento y el repositorio vinculado es el mismo para ambos.

#### Atributos para el rastreo de errores

Para activar el rastreo de errores, los logs deben incluir los dos elementos siguientes:

- un campo `error.type` o `error.stack`
- un nivel de estado de `ERROR`, `CRITICAL`, `ALERT`, o `EMERGENCY`

El resto de atributos enumerados a continuación son opcionales, pero su presencia mejora la agrupación de errores.

Los atributos específicos tienen una pantalla de interfaz de usuario dedicada dentro de Datadog. Para activar estas funcionalidades para el rastreo de errores, utiliza los siguientes nombres de atributos:

| Atributo            | Descripción                                                             |
|----------------------|-------------------------------------------------------------------------|
| `error.stack`        | Stack trace correspondiente                                                      |
| `error.message`      | Mensaje de error contenido en la stack trace                              |
| `error.kind`         | El tipo o clase de un error (por ejemplo, "Exception" u "OSError") |

**Nota**: De forma predeterminada, los pipelines de integración intentan reasignar parámetros de bibliotecas de logging predeterminados a esos atributos específicos y repartir stack traces o hacer un seguimiento para extraer automáticamente `error.message` y `error.kind`.

Para obtener más información, consulta la [documentación completa sobre atributos de código fuente][11].

### C# y .NET

{{< tabs >}}
{{% tab "Serilog" %}}

Si no has configurado la recopilación de logs para C#, consulta la [documentación sobre la recopilación de logs para C#][1].

Para registrar una excepción capturada por ti mismo, puedes utilizar opcionalmente:

```csharp
var log = new LoggerConfiguration()
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")
    .Enrich.WithExceptionDetails()
    .CreateLogger();
try {
  // ...
} catch (Exception ex) {
  // pass exception as first argument of log call
  log.Error(ex, "an exception occurred");
}
```

[1]: /es/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{% tab "NLog" %}}

Si no has configurado la recopilación de log para C#, consulta la [documentación de la recopilación de log de C#][1].

Para registrar una excepción capturada por ti mismo, puedes utilizar opcionalmente:

```csharp
private static Logger log = LogManager.GetCurrentClassLogger();

static void Main(string[] args)
{
  try {
    // ...
  } catch (Exception ex) {
    // pass exception as second argument of log call
    log.ErrorException("an exception occurred", ex);
  }
}
```

[1]: /es/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{% tab "Log4Net" %}}

Si no has configurado la recopilación de log para C#, consulta la [documentación de la recopilación de log de C#][1].

Para registrar una excepción capturada por ti mismo, puedes utilizar opcionalmente:

```csharp
class Program
{
  private static ILog logger = LogManager.GetLogger(typeof(Program));

  static void Main(string[] args)
  {
    try {
      // ...
    } catch (Exception ex) {
      // pass exception as second argument of log call
      log.Error("an exception occurred", ex);
    }
  }
}
```

[1]: /es/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{< /tabs >}}

### Go

#### Logrus

Si no has configurado la recopilación de logs para Go, consulta la [documentación sobre la recopilación de logs de Go][1].

Para registrar una excepción capturada manualmente, también puedes utilizar:

```go
// for https://github.com/pkg/errors
type stackTracer interface {
    StackTrace() errors.StackTrace
}

type errorField struct {
  Kind    string `json:"kind"`
  Stack   string `json:"stack"`
  Message string `json:"message"`
}

func ErrorField(err error) errorField {
    var stack string
    if serr, ok := err.(stackTracer); ok {
        st := serr.StackTrace()
        stack = fmt.Sprintf("%+v", st)
        if len(stack) > 0 && stack[0] == '\n' {
            stack = stack[1:]
        }
    }
    return errorField{
        Kind: reflect.TypeOf(err).String(),
        Stack: stack,
        Message: err.Error(),
    }
}


log.WithFields(log.Fields{
    "error": ErrorField(err)
}).Error("an exception occurred")
```

### Java (analizado)

Si no has configurado la recopilación de logs para Java, consulta la [documentación sobre la recopilación de logs de Java][4]. Asegúrate de que tus logs estén etiquetados con `source:java`.

{{< tabs >}}
{{% tab "Log4j" %}}

Para registrar una excepción capturada manualmente, también puedes utilizar:

```java
Logger logger = LogManager.getLogger("HelloWorld");
try {
  // ...
} catch (Exception e) {
  // pass exception as last argument of log call
  logger.error("an exception occurred", e)
}
```

{{% /tab %}}
{{% tab "SLF4J" %}}

Para registrar una excepción capturada manualmente, también puedes utilizar:

```java
Logger logger = LoggerFactory.getLogger(NameOfTheClass.class);
try {
  // ...
} catch (Exception e) {
  // pass exception as last argument of log call
  logger.error("an exception occurred", e)
}
```

{{% /tab %}}
{{< /tabs >}}

### Node.js

#### Winston (JSON)

Si no has configurado la recopilación de logs para Node.js, consulta la [documentación sobre la recopilación de logs de Node.js][5].

Para registrar una excepción capturada manualmente, también puedes utilizar:

```json
try {
  // ...
} catch (e) {
  logger.error("an exception occurred", {
    error: {
      message: e.message,
      stack: e.stack
    }
  });
}
```

### PHP

#### Monolog (JSON)

Si no has configurado la recopilación de logs para PHP, consulta la [documentación sobre la recopilación de logs de PHP][12].

Para registrar una excepción capturada manualmente, también puedes utilizar:

```php
try {
    // ...
} catch (\Exception $e) {
    $logger->error('An error occurred', [
        'error.message' => $e->getMessage(),
        'error.kind' => get_class($e),
        'error.stack' => $e->getTraceAsString(),
    ]);
}
```

### Python

#### Gestión de logs

Si no has configurado la recopilación de logs para Python, consulta la [documentación sobre la recopilación de logs de Python][6]. Asegúrate de que tus logs estén etiquetados con `source:java`.

Para registrar una excepción capturada manualmente, también puedes utilizar:

```python
try:
  // ...
except:
  logging.exception('an exception occurred')
```

### Ruby on Rails

#### Formateador de registro personalizado

Si no has configurado la recopilación de logs para Ruby on Rails, consulta la [documentación sobre la recopilación de logs de Ruby on Rails][7].

Para registrar manualmente un error, crea un formateador utilizando JSON y asigna los valores de excepción a los campos correctos:

```ruby
require 'json'
require 'logger'

class JsonWithErrorFieldFormatter < ::Logger::Formatter
    def call(severity, datetime, progname, message)
        log = {
            timestamp: "#{datetime.to_s}",
            level: severity,
        }

        if message.is_a?(Hash)
            log = log.merge(message)
        elsif message.is_a?(Exception)
            log['message'] = message.inspect
            log['error'] = {
                kind: message.class,
                message: message.message,
                stack: message.backtrace.join("\n"),
            }
        else
            log['message'] = message.is_a?(String) ? message : message.inspect
        end

        JSON.dump(log) + "\n"
    end
end
```

Y úsalo en tu registrador:
```ruby
logger = Logger.new(STDOUT)
logger.formatter = JsonWithErrorFieldFormatter.new
```

Si utilizas **Lograge**, también puedes configurarlo para que envíe logs de error formateados:
``` ruby
Rails.application.configure do
    jsonLogger = Logger.new(STDOUT) # STDOUT o archivo según la configuración de tu agent
    jsonLogger.formatter = JsonWithErrorFieldFormatter.new

    # Reemplaza Rails por el registrador TaggedLogging por defecto con uno nuevo con el formateador json.
    # TaggedLogging no es compatible con mensajes con formato json más complejos
    config.logger = jsonLogger

    # Lograge config
    config.lograge.enabled = true
    config.lograge.formatter = Lograge::Formatters::Raw.new

    # Desactiva la coloración de log
    config.colorize_logging = false

    # Configura el registro de excepciones en los campos correctos
    config.lograge.custom_options = lambda do |event|
        if event.payload[:exception_object]
            return {
                level: 'ERROR',
                message: event.payload[:exception_object].inspect,
                error: {
                    kind: event.payload[:exception_object].class,
                    message: event.payload[:exception_object].message,
                    stack: event.payload[:exception_object].backtrace.join("\n")
                }
            }
        end
    end
end
```
## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking
[2]: https://app.datadoghq.com/logs/onboarding/client
[3]: /es/logs/log_collection/go/
[4]: /es/logs/log_collection/java/?tab=log4j
[5]: /es/logs/log_collection/nodejs/?tab=winston30
[6]: /es/logs/log_collection/python/?tab=jsonlogformatter
[7]: /es/logs/log_collection/ruby/
[8]: /es/logs/log_configuration/processors/?tab=ui#remapper
[9]: https://app.datadoghq.com/source-code/setup/apm
[10]: /es/logs/log_collection/
[11]: /es/logs/log_configuration/attributes_naming_convention/#source-code
[12]: /es/logs/log_collection/php/