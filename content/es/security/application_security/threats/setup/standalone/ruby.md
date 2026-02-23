---
aliases:
- /es/security_platform/application_security/getting_started/ruby
- /es/security/application_security/getting_started/ruby
- /es/security/application_security/enabling/tracing_libraries/threat_detection/ruby/
code_lang: ruby
code_lang_weight: 30
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Añadir información del usuario a trazas
- link: https://github.com/DataDog/dd-trace-rb
  tag: Código fuente
  text: Código fuente de la biblioteca Ruby de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predeterminadas de App & API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de App & API Protection
title: Activar Application & API Protection para Ruby
type: lenguaje de código múltiple
---

Puedes monitorizar la seguridad de las aplicaciones Ruby que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

{{% appsec-getstarted-standalone %}}

## Activar Application & API Protection
### Para empezar

1. **Actualiza tu Gemfile para incluir la biblioteca de Datadog**:

   ```ruby
   gem 'datadog', '~> 2.0' # Use 'ddtrace' if you're using v1.x
   ```

   Para comprobar que las versiones del lenguaje y del marco de trabajo de tu servicio son compatibles con las funciones de Application & API Protection, consulta [Compatibilidad][1].

   Para obtener más información sobre la actualización a la v2 desde una versión `dd-trace` 1.x, consulta [la guía de actualización del rastreador Ruby][2].

2. **Activa Application & API Protection** activando el rastreador de APM. Las siguientes opciones describen una configuración rápida que cubre los casos más comunes. Lee [la documentación del rastreador de Ruby][3] para obtener más detalles.

   Puedes activar Application & API Protection en tu código:

   {{< tabs >}}

{{% tab "Rails" %}}
   Habilita el rastreador de APM añadiendo un inicializador en el código de la aplicación:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer but disable trace processing - for security-only use
     c.tracing.instrument :rails
     c.tracing.enabled = false

     # enable Application & API Protection
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

   O habilita el rastreador de APM a través de la instrumentación automática actualizando tu Gemfile para instrumentar automáticamente:

   ```ruby
   gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
   ```

   Y también activar `appsec` y desactivar el rastreo:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # the APM tracer is enabled by auto-instrumentation
     c.tracing.enabled = false

     # enable Application & API Protection
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

{{% /tab %}}

{{% tab "Sinatra" %}}
   Habilita el rastreador de APM añadiendo lo siguiente al inicio de la aplicación:

   ```ruby
   require 'sinatra'
   require 'datadog'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer but disable trace processing - for security-only use
     c.tracing.instrument :sinatra
     c.tracing.enabled = false

     # enable Application & API Protection for Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```

   O habilita el rastreador de APM a través de la instrumentación automática:

   ```ruby
   require 'sinatra'
   require 'datadog/auto_instrument'

   Datadog.configure do |c|
     # the APM tracer is enabled by auto-instrumentation
     c.tracing.enabled = false

     # enable Application & API Protection for Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```
{{% /tab %}}

{{% tab "Rack" %}}
   Habilita el rastreador de APM añadiendo lo siguiente al archivo `config.ru`:

   ```ruby
   require 'datadog'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer but disable trace processing - for security-only use
     c.tracing.instrument :rack
     c.tracing.enabled = false

     # enable Application & API Protection for Rack
     c.appsec.enabled = true
     c.appsec.instrument :rack
   end

   use Datadog::Tracing::Contrib::Rack::TraceMiddleware
   use Datadog::AppSec::Contrib::Rack::RequestMiddleware
   ```
{{% /tab %}}

{{< /tabs >}}

   O uno de los siguientes métodos, dependiendo de dónde se ejecute la aplicación:

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Actualiza tu contenedor de configuración para APM añadiendo los siguientes argumentos en tu comando `docker run`:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true -e DD_APM_TRACING_ENABLED=false [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Añade los siguientes valores de variable de entorno a tu archivo de contenedor de Docker:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualiza el contenedor de tu archivo yaml de configuración para APM y añade las variables de entorno:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
            - name: DD_APM_TRACING_ENABLED
              value: "false"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Actualiza tu archivo JSON de definición de tareas de ECS, añadiendo esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  },
  {
    "name": "DD_APM_TRACING_ENABLED",
    "value": "false"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Inicializa Application & API Protection en tu código o establece las variables de entorno en tu invocación de servicio:
```shell
env DD_APPSEC_ENABLED=true DD_APM_TRACING_ENABLED=false rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/ruby/
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide2.md
[3]: /es/tracing/trace_collection/dd_libraries/ruby/