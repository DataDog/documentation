---
aliases:
- /security_platform/application_security/getting_started/ruby
- /security/application_security/getting_started/ruby
- /security/application_security/enabling/ruby
code_lang: ruby
code_lang_weight: 30
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Agregado de información de usuario a trazas (traces)
- link: https://github.com/DataDog/dd-trace-rb
  tag: Código fuente
  text: Código fuente de la biblioteca Ruby de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas de Application Security Management predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
title: Habilitación de ASM para Ruby
type: multi-code-lang
---

Puedes monitorizar la seguridad de las aplicaciones Ruby que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

{{% appsec-getstarted %}}

## Habilitación de la detección de amenazas
### Primeros pasos

1. **Actualiza tu Gemfile para incluir la biblioteca de Datadog**:

   ```ruby
   gem 'datadog', '~> 2.0' # Use 'ddtrace' if you're using v1.x
   ```

   Para verificar que las versiones del lenguaje y del marco del servicio son compatibles con las funciones de ASM, consulta [Compatibilidad][1].

   Para obtener más información sobre la actualización a la v2 desde una versión `dd-trace` 1.x, consulta [la guía de actualización del rastreador Ruby][2].

2. **Habilita ASM** activando el rastreador de APM. Las siguientes opciones describen una configuración rápida que cubre los casos más comunes. Lee [la documentación del rastreador Ruby][3] para obtener más información.

   Puedes habilitar ASM en tu código:

   {{< tabs >}}

{{% tab "Rails" %}}
   Habilita el rastreador de APM añadiendo un inicializador en el código de la aplicación:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :rails

     # enable ASM
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

   O habilita el rastreador de APM a través de la instrumentación automática actualizando tu Gemfile para instrumentar automáticamente:

   ```ruby
   gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
   ```

   Y también habilita `appsec`:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # el rastreador de APM está habilitado por la instrumentación automática

     # enable ASM
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
     # habilitar el rastreador de APM
     c.tracing.instrument :sinatra

     # habilitar ASM para Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```

   O habilita el rastreador de APM a través de la instrumentación automática:

   ```ruby
   require 'sinatra'
   require 'datadog/auto_instrument'

   Datadog.configure do |c|
     # el rastreador de APM se habilita mediante instrumentación automática

     # habilitar ASM para Sinatra
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
     # habilitar el rastreador de APM
     c.tracing.instrument :rack

     # habilitar ASM para Rack
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
{{% tab "CLI Docker" %}}

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

Inicializa ASM en tu código o establece la variable de entorno `DD_APPSEC_ENABLED` en true en tu invocación de servicio:
```shell
env DD_APPSEC_ENABLED=true rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles, y el explorador de vulnerabilidades y detalles." video="true" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/enabling/compatibility/ruby
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide2.md
[3]: /es/tracing/trace_collection/dd_libraries/ruby/