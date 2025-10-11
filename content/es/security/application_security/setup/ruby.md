---
aliases:
- /es/security_platform/application_security/getting_started/ruby
- /es/security/application_security/getting_started/ruby
- /es/security/application_security/enabling/tracing_libraries/threat_detection/ruby/
- /es/security/application_security/threats/setup/threat_detection/ruby
- /es/security/application_security/threats_detection/ruby
- /es/security/application_security/setup/aws/fargate/ruby
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
  text: Reglas predefinidas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de App and API Protection
title: Habilitar AAP para Ruby
type: multi-code-lang
---

Puedes monitorizar aplicaciones App and API Protection para Ruby que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

{{% appsec-getstarted %}}

## Habilitación de la detección de amenazas

### Para empezar

1. **Actualiza tu Gemfile para incluir la biblioteca de Datadog**:

   ```ruby
   gem 'datadog', '~> 2.0' # Use 'ddtrace' if you're using v1.x
   ```

   Para comprobar si el lenguaje y las versiones del marco de tu servicio son compatibles con las funciones de AAP, consulta [Compatibilidad][1].

   Para obtener más información sobre la actualización a la v2 desde una versión `dd-trace` 1.x, consulta [la guía de actualización del rastreador Ruby][2].

2. **Habilita AAP** activando el rastreador APM. Las siguientes opciones describen una configuración rápida que cubre los casos más frecuentes. Consulta la [documentación del rastreador Ruby][3] para obtener más detalles.

   Puedes activar AAP en tu código:

   {{< tabs >}}

{{% tab "Rails" %}}
   Habilita el rastreador APM añadiendo un inicializador en el código de la aplicación:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :rails

     # enable AAP
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

   O habilita el rastreador APM a través de la instrumentación automática actualizando tu Gemfile para instrumentar automáticamente:

   ```ruby
   gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
   ```

   Y también habilita `appsec`:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # the APM tracer is enabled by auto-instrumentation

     # enable AAP
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

{{% /tab %}}

{{% tab "Sinatra" %}}
   Habilita el rastreador APM añadiendo lo siguiente al inicio de la aplicación:

   ```ruby
   require 'sinatra'
   require 'datadog'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :sinatra

     # enable AAP for Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```

   O habilita el rastreador APM a través de la instrumentación automática:

   ```ruby
   require 'sinatra'
   require 'datadog/auto_instrument'

   Datadog.configure do |c|
     # the APM tracer is enabled by auto-instrumentation

     # enable AAP for Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```

{{% /tab %}}

{{% tab "Rack" %}}
   Habilita el rastreador APM añadiendo lo siguiente al archivo `config.ru`:

   ```ruby
   require 'datadog'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :rack

     # enable AAP for Rack
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

Actualiza tu contenedor de configuración para APM añadiendo el siguiente argumento en tu comando `docker run`:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Añade el siguiente valor de variable de entorno a tu contenedor Dockerfile:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualiza el contenedor del archivo yaml de configuración para APM y añade la variable de entorno AppSec:

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
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Actualiza tu archivo JSON de definición de tarea de ECS añadiendo esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Inicializa AAP en tu código o configura la variable de entorno `DD_APPSEC_ENABLED` como true en la invocación de tu servicio:

```shell
env DD_APPSEC_ENABLED=true rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

## Uso de AAP sin el rastreo APM

Si quieres utilizar Application & API Protection sin la funcionalidad de rastreo APM, puedes desplegarla con el rastreo desactivado:

1. Configura tu biblioteca de rastreo con la variable de entorno `DD_APM_TRACING_ENABLED=false`, además de la variable de entorno `DD_APPSEC_ENABLED=true`.
2. Esta configuración reduce la cantidad de datos de APM enviados a Datadog al mínimo requerido por los productos App and API Protection.

Para obtener más información, consulta [App and API Protection individual][standalone_billing_guide].
[guía_de_facturación_individual]: /security/application_security/guide/standalone_application_security/

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/ruby/
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide2.md
[3]: /es/tracing/trace_collection/dd_libraries/ruby/