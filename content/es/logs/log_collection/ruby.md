---
aliases:
- /es/logs/languages/ruby
further_reading:
- link: https://github.com/roidrage/lograge
  tag: Código fuente
  text: Documentación de Lograge
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Guía para solucionar problemas relacionados con la recopilación de logs
- link: https://www.datadoghq.com/blog/managing-rails-application-logs/
  tag: Blog
  text: Cómo recopilar, personalizar y gestionar logs de aplicación de Rails
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: Blog
  text: Cómo gestionar archivos de log con logrotate
- link: /glossary/#tail
  tag: Glosario
  text: Entrada de glosario para "tail" (cola)
kind: documentación
title: Recopilación de logs de Ruby on Rails
---

## Información general

Para enviar tus logs a Datadog, loguea un archivo con [`Lograge`][1] y [supervisa][11] este archivo con tu Datadog Agent. Cuando configures el registro con Ruby, ten en cuenta los [atributos reservados][2].

Con Lograge, puedes transformar el formato estándar de log basado en texto, como en este ejemplo:

```text
Started GET "/" for 127.0.0.1 at 2012-03-10 14:28:14 +0100
Processing by HomeController#index as HTML
  Rendered text template within layouts/application (0.0ms)
  Rendered layouts/_assets.html.erb (2.0ms)
  Rendered layouts/_top.html.erb (2.6ms)
  Rendered layouts/_about.html.erb (0.3ms)
  Rendered layouts/_google_analytics.html.erb (0.4ms)
Completed 200 OK in 79ms (Views: 78.8ms | ActiveRecord: 0.0ms)
```

Al siguiente formato JSON del log, que proporciona más estructura:

```json
{
  "timestamp": "2016-01-12T19:15:19.118829+01:00",
  "level": "INFO",
  "logger": "Rails",
  "method": "GET",
  "path": "/jobs/833552.json",
  "format": "json",
  "controller": "jobs",
  "action": "show",
  "status": 200,
  "duration": 58.33,
  "view": 40.43,
  "db": 15.26
}
```

## Instala y configura tu registrador

{{< tabs >}}
{{% tab "Lograge" %}}

1. Añade el gem `lograge` a tu proyecto:
    ```ruby
    gem 'lograge'
    ```
2. En tu archivo de configuración, establece lo siguiente para configurar Lograge:
    ```ruby
    # Lograge config
    config.lograge.enabled = true

    # This specifies to log in JSON format
    config.lograge.formatter = Lograge::Formatters::Json.new

    ## Disables log coloration
    config.colorize_logging = false

    # Log to a dedicated file
    config.lograge.logger = ActiveSupport::Logger.new(Rails.root.join('log', "#{Rails.env}.log"))

    # This is useful if you want to log query parameters
    config.lograge.custom_options = lambda do |event|
        { :ddsource => 'ruby',
          :params => event.payload[:params].reject { |k| %w(controller action).include? k }
        }
    end
    ```
    **Nota**: Lograge también puede añadir información contextual a tus logs. Consulta la [documentación de Lograge][1] para obtener más detalles.

Para ver un ejemplo más detallado de esta configuración, consulta [Cómo recopilar, personalizar y gestionar logs de aplicación de Rails][2].

### RocketPants

Para configurar Lograge para controladores `rocket_pants`, en el archivo `config/initializers/lograge_rocketpants.rb` (la localización puede variar dependiendo de tu proyecto):

```ruby
# Come from here:
#   https://github.com/Sutto/rocket_pants/issues/111
app = Rails.application
if app.config.lograge.enabled
  ActiveSupport::LogSubscriber.log_subscribers.each do |subscriber|
    case subscriber
      when ActionController::LogSubscriber
        Lograge.unsubscribe(:rocket_pants, subscriber)
    end
  end
  Lograge::RequestLogSubscriber.attach_to :rocket_pants
end
```

[1]: https://github.com/roidrage/lograge#installation
[2]: https://www.datadoghq.com/blog/managing-rails-application-logs
{{% /tab %}}
{{% tab "Grape" %}}

1. Añade el gem `grape_logging` a tu proyecto:

    ```ruby
    gem 'grape_logging'
    ```
2. Añade la configuración adicional a Grape:

    ```ruby
    use GrapeLogging::Middleware::RequestLogger,
          instrumentation_key: 'grape',
          include: [ GrapeLogging::Loggers::Response.new,
                    GrapeLogging::Loggers::FilterParameters.new ]
    ```
3. Crea el archivo `config/initializers/instrumentation.rb` y añade la siguiente configuración:

    ```ruby
    # Subscribe to grape request and log with a logger dedicated to Grape
    grape_logger = Logging.logger['Grape']
    ActiveSupport::Notifications.subscribe('grape') do |name, starts, ends, notification_id, payload|
        grape_logger.info payload
    end
    ```

{{% /tab %}}
{{< /tabs >}}
## Configurar el Datadog Agent

Cuando tengas la [recopilación de logs activada][3], configura la [recopilación de logs personalizada][4] para supervisar tus archivos de log y enviarlos a Datadog.

1. Crea una carpeta `ruby.d/` en el [directorio de configuración del Agent][5] `conf.d/`.
2. Crea un archivo `conf.yaml` en `ruby.d/` con el siguiente contenido:
    ```yaml
      logs:
        - type: file
          path: "<RUBY_LOG_FILE_PATH>.log"
          service: <SERVICE_NAME>
          source: ruby
          sourcecategory: sourcecode
          ## Uncomment the following processing rule for multiline logs if they
          ## start by the date with the format yyyy-mm-dd
          #log_processing_rules:
          #  - type: multi_line
          #    name: new_log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
4. [Reinicia el Agent][6].
5. Ejecuta el [subcomando de estado del Agent][8] y busca `ruby` en la sección `Checks` para confirmar que los logs se han enviado correctamente a Datadog.

Si los logs están en formato JSON, Datadog [parsea los mensajes del log][7] de forma automática para extraer sus atributos. Utiliza el [Log Explorer][8] para ver tus logs y solucionar problemas relacionados.

## Conectar logs y trazas

Si APM está habilitado para esta aplicación, puedes mejorar la conexión entre los logs de aplicación y las trazas (traces) siguiendo la [documentación de registro de APM Ruby][7] para añadir automáticamente trazas e IDs de tramos en tus logs.

## Prácticas recomendadas

Añade contexto adicional (usuario, sesión, acción y métricas) a tus logs cuando sea posible.

En lugar de registrar mensajes de cadena simples, puedes utilizar hashes de log como se muestra en el siguiente ejemplo:

```ruby
my_hash = {'user' => '1234', 'button_name'=>'save','message' => 'User 1234 clicked on button saved'};
logger.info(my_hash);
```

El hash se convierte en JSON y se pueden realizar análisis para `user` y `button_name`:

```json
{
  "timestamp": "2016-01-12T19:15:18.683575+01:00",
  "level": "INFO",
  "logger": "WelcomeController",
  "message": {
    "user": "1234",
    "button_name": "save",
    "message": "User 1234 clicked on button saved"
  }
}
```
## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/roidrage/lograge
[2]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[3]: /es/agent/logs/?tab=tailfiles#activate-log-collection
[4]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /es/agent/configuration/agent-commands/#restart-the-agent
[7]: /es/tracing/other_telemetry/connect_logs_and_traces/ruby/
[8]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[9]: /es/logs/log_configuration/parsing
[10]: /es/logs/explorer/
[11]: /es/glossary/#tail