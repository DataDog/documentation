---
aliases:
- /es/continuous_integration/setup_tests/ruby
- /es/continuous_integration/tests/ruby
- /es/continuous_integration/tests/setup/ruby
code_lang: Ruby
code_lang_weight: 40
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentación
  text: Reenvío de variables entorno para tests en contenedores
- link: /continuous_integration/tests
  tag: Documentación
  text: Exploración de los resultados de tests y del rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Tests de Ruby
type: lenguaje de código múltiple
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">En este momento, CI Visibility no está disponible en el sitio ({{< region-param key="dd_site_name" >}}) seleccionado.</div>
{{< /site-region >}}

## Compatibilidad

Lenguajes compatibles:

| Lenguaje | Versión |
|---|---|
| Ruby | v2.7 o anterior |
| JRuby | v9.4 o anterior |

Marcos para tests compatibles:

| Marco para tests | Versión |
|---|---|
| RSpec | v3.0.0 o anterior |
| Minitest | v5.0.0 o anterior |
| Cucumber | v3.0 o anterior |

Ejecutores de tests compatibles:

| Ejecutor de tests | Versión |
|---|---|
| Knapsack Pro | v7.2.0 o anterior |
| ci-queue | v0.53.0 o anterior |

## Configuración del método de notificación

Para informar de resultados de tests a Datadog, necesitas configurar el gem `datadog-ci`:

{{< tabs >}}
{{% tab "Proveedor CI en la nube (Agentless)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "Proveedor CI on-premises (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## Instalación de la biblioteca de visibilidad de tests Ruby

Para instalar la biblioteca de visibilidad de tests Ruby:

1. Añade el gem `datadog-ci` en tu `Gemfile`:

{{< code-block lang="ruby" filename="Gemfile" >}}
source "<https://rubygems.org>"
gem "datadog-ci", "~> 1.0", group: :test
{{< /code-block >}}

2. Instala el gem ejecutando `bundle install`

## Instrumentación de tus tests

{{< tabs >}}
{{% tab "RSpec" %}}

La integración RSpec rastrea todas las ejecuciones de ejemplos de grupos y ejemplos, cuando se utiliza el marco para tests `rspec`.

Para activar tu integración, añade lo siguiente al archivo `spec_helper.rb`:

```ruby
require "rspec"
require "datadog/ci"

# Sólo activa la instrumentación de tests en CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # habilita la visibilidad de los tests
    c.ci.enabled = true

    # Nombre del servicio o de la biblioteca a los que se realizan tests
    c.service = "my-ruby-app"

    # Habilita la instrumentación RSpec
    c.ci.instrument :rspec
  end
end
```

Ejecuta tus tests como lo haces habitualmente, especificando el entorno en que se ejecutan los tests en la variable de entorno `DD_ENV`.

Puedes utilizar los siguientes entornos:

* `local` cuando ejecutas tests en una estación de trabajo de desarrollador
* `ci` cuando los ejecutas en un proveedor CI

Por ejemplo:

```bash
DD_ENV=ci bundle exec rake spec
```

{{% /tab %}}

{{% tab "Minitest" %}}

La integración Minitest rastrea todas las ejecuciones de tests, cuando se utiliza el marco `minitest`.

Para activar tu integración, añade lo siguiente al archivo `test_helper.rb`:

```ruby
require "minitest"
require "datadog/ci"

# Sólo activa la instrumentación de tests en CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # habilita la visibilidad de los tests
    c.ci.enabled = true

    # Nombre del servicio o de la biblioteca a los que se realizan tests
    c.service = "my-ruby-app"

    c.ci.instrument :minitest
  end
end
```

Ejecuta tus tests como lo haces habitualmente, especificando el entorno en el que se ejecutan los tests en la variable de entorno `DD_ENV`.

Puedes utilizar los siguientes entornos:

* `local` cuando ejecutas tests en una estación de trabajo de desarrollador
* `ci` cuando los ejecutas en un proveedor CI

Por ejemplo:

```bash
DD_ENV=ci bundle exec rake test
```

<div class="alert alert-warning">
<strong>Nota:</strong> Cuando utilices `minitest/autorun`, asegúrate de que se te pida `datadog/ci` antes que `minitest/autorun`.
</div>

Ejemplo de configuración con `minitest/autorun`:

```ruby
require "datadog/ci"
require "minitest/autorun"

if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    c.ci.enabled = true

    c.service = "my-ruby-app"

    c.ci.instrument :minitest
  end
end
```

{{% /tab %}}

{{% tab "Cucumber" %}}

La integración Cucumber rastrea ejecuciones de escenarios y pasos cuando se utiliza el marco `cucumber`.

Para activar tu integración, añade el siguiente código a tu aplicación:

```ruby
require "cucumber"
require "datadog/ci"

# Sólo activa la instrumentación de tests en CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # habilita la visibilidad de los tests
    c.ci.enabled = true

    # Nombre del servicio o de la biblioteca a los que se realizan tests
    c.service = "my-ruby-app"

    # Habilita la instrumentación Cucumber
    c.ci.instrument :cucumber
  end
end
```

Ejecuta tus tests como lo haces habitualmente, especificando el entorno en que se ejecutan los tests en la variable de entorno `DD_ENV`.
Puedes utilizar los siguientes entornos:

* `local` cuando ejecutes tests en una estación de trabajo de desarrollador
* `ci` cuando los ejecutes en un proveedor CI

Por ejemplo:

```bash
DD_ENV=ci bundle exec rake cucumber
```

{{% /tab %}}
{{< /tabs >}}

### Para añadir etiquetas (tags) personalizadas a los tests

Puedes añadir etiquetas personalizadas a tus tests utilizando el test que esté activo en ese momento:

```ruby
require "datadog/ci"

# dentro de tu test
Datadog::CI.active_test&.set_tag("test_owner", "my_team")
# el test continúa normalmente
# ...
```

Para crear filtros o campos `group by` para estas etiquetas, primero debes crear facetas. Para obtener más información sobre cómo añadir etiquetas, consulta la sección [Añadir etiquetas][2] en la documentación de instrumentación personalizada de Ruby.

### Añadir medidas personalizadas a los tests

Además de las etiquetas, también puedes añadir medidas personalizadas a tus tests utilizando el test que esté activo en ese momento:

```Ruby
require "datadog/ci"

# dentro de tu test
Datadog::CI.active_test&.set_metric("memory_allocations", 16)
# el test continúa normalmente
# ...
```

Para obtener más información sobre las medidas personalizadas, consulta la [guía para añadir medidas personalizadas][3].

## Parámetros de configuración

La siguiente es una lista de los parámetros de configuración más importantes que puedes utilizar con la biblioteca de visibilidad de tests, ya sea en código, utilizando un bloque `Datadog.configure`, o utilizando variables de entorno:

`service`
: Nombre del servicio o de la biblioteca a los que se realizan tests.<br/>
**Variable de entorno**: `DD_SERVICE`<br/>
**Por defecto**: `$PROGRAM_NAME`<br/>
**Ejemplo**: `my-ruby-app`

`env`
: Nombre del entorno en el que se ejecutan los tests.<br/>
**Variable de entorno **: `DD_ENV`<br/>
**Por defecto**: `none`<br/>
**Ejemplos**: `local`, `ci`

Para obtener más información sobre las etiquetas reservadas `service` y `env`, consulta [Etiquetado unificado de servicios][4].

La siguiente variable de entorno puede utilizarse para configurar el localización del Datadog Agent:

`DD_TRACE_AGENT_URL`
: La URL del Datadog Agent URL para recopilar trazas con el formato `http://hostname:port`.<br/>
**Por defecto**: `http://localhost:8126`

También puedes utilizar todas las demás opciones de [configuración del Datadog Tracer][5].

## Uso de la instrumentación adicional

Puede ser útil disponer de información de seguimiento enriquecida sobre tus tests que incluya el tiempo empleado en realizar operaciones con la base de datos u otras llamadas externas, como se muestra en el siguiente gráfico de llamas:

{{< img src="continuous_integration/tests/setup/ci-ruby-test-trace-with-redis.png" alt="Rastreo de tests con Redis instrumentado" >}}

Para ello, configura la instrumentación adicional en tu bloque `configure`:

```ruby
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    #  ... configuraciones e instrumentación CI aquí ...
    c.tracing.instrument :redis
    c.tracing.instrument :pg
    # ... cualquier otra instrumentación compatible con el gem de Datadog ...
  end
end
```

También puedes habilitar la instrumentación automática en `test_helper/spec_helper`:

```ruby
require "datadog/auto_instrument" if ENV["DD_ENV"] == "ci"
```

**Nota**: En modo CI, estas trazas (traces) se envían a CI Visibility y **no** aparecen en Datadog APM .

Para ver la lista de todos los métodos de instrumentación disponibles, consulta la [documentación sobre rastreo][6].

## Webmock/VCR

[Webmock][7] y [VCR][9]
son populares bibliotecas Ruby que agregan stubs a las solicitudes HTTP cuando se ejecutan tests.
Por defecto, fallan cuando se utilizan con datadog-ci porque se envían trazas
a Datadog con llamadas HTTP.

Para permitir conexiones HTTP para el backend de Datadog, necesitas configurar
Webmock y VCR en consecuencia.

```ruby
# Webmock
# cuando se utiliza el modo Agentless:
WebMock.disable_net_connect!(:allow => /datadoghq/)

# cuando se utiliza el Agent y se lo ejecuta localmente:
WebMock.disable_net_connect!(:allow_localhost => true)

# o, para una configuración más específica, configura la URL de tu Agent. Por ejemplo:
WebMock.disable_net_connect!(:allow => "localhost:8126")

# VCR
VCR.configure do |config|
  # ... tu configuración habitual aquí ...

  # cuando se utiliza el Agent
  config.ignore_hosts "127.0.0.1", "localhost"

  # cuando se utiliza el modo Agentless
  config.ignore_request do |request|
    # ignora todas las solicitudes a hosts datadoghq
    request.uri =~ /datadoghq/
  end
end
```

## Recopilación de metadatos Git

{{% ci-git-metadata %}}

## Uso de la API de tests manuales

Si utilizas RSpec, Minitest o Cucumber, **no utilices la API de tests manuales**, ya que CI Visibility los instrumenta automáticamente y envía los resultados a Datadog. La API de tests manuales es **incompatible** con los marcos para tests que ya son compatibles.

Utiliza la API de tests manuales sólo si utilizas un marco de tests no compatible o si tienes un mecanismo de test diferente.
Toda la documentación de la API pública está disponible en el [sitio YARD][8].

### Modelo de dominio

La API se basa en cuatro conceptos: sesión de tests, módulo de test, conjuntos de tests y tests.

#### Sesión de tests

Una sesión de tests representa la ejecución de un comando de test.

Para iniciar una sesión de tests, llama a `Datadog::CI.start_test_session` y pasa el servicio y las etiquetas de Datadog (como el marco de test
que estás utilizando).

Cuando todos tus tests hayan terminado, llama a `Datadog::CI::TestSession#finish`. Esto cierra la sesión y envía
la traza de la sesión al backend.

#### Módulo de test

Un módulo de test representa una unidad de trabajo más pequeña dentro de una sesión.
Para los marcos para tests compatibles, el módulo de test es siempre igual a la sesión de tests.
Para tu caso de uso, podría ser un paquete en tu aplicación componentizada.

Para iniciar un módulo de test, llama a `Datadog::CI.start_test_module` y pasa el nombre del módulo.

Una vez finalizada la ejecución del módulo, llama a `Datadog::CI::TestModule#finish`.

#### Conjunto de tests

Un conjunto de tests incluye un grupo de tests que comprueban funcionalidades similares.
Un único conjunto suele corresponder a un único archivo en el que se definen los tests.

Crea conjuntos de tests llamando a `Datadog::CI#start_test_suite` y pasando el nombre del conjunto de tests.

Llama a `Datadog::CI::TestSuite#finish` cuando todos los tests relacionados del conjunto hayan terminado de ejecutarse.

#### Test

Un test representa un único caso de test que se ejecuta como parte de un conjunto de tests.
Suele corresponder a un método que contiene la lógica de test.

Crea conjuntos de tests llamando a `Datadog::CI#start_test` o `Datadog::CI.trace_test` y pasando el nombre del test y el nombre del conjunto de tests. El nombre del conjunto de tests debe ser el mismo que el del conjunto de tests iniciado en el paso anterior.

Llama a `Datadog::CI::Test#finish` cuando una prueba haya terminado de ejecutarse.

### Ejemplo de código

El siguiente código representa un ejemplo de uso de la API:

```ruby
require "datadog/ci"

Datadog.configure do |c|
  c.service = "my-test-service"
  c.ci.enabled = true
end

def run_test_suite(tests, test_suite_name)
  test_suite = Datadog::CI.start_test_suite(test_suite_name)

  run_tests(tests, test_suite_name)

  test_suite.passed!
  test_suite.finish
end

def run_tests(tests, test_suite_name)
  tests.each do |test_name|
    Datadog::CI.trace_test(test_name, test_suite_name) do |test|
      test.passed!
    end
  end
end

Datadog::CI.start_test_session(
  tags: {
    Datadog::CI::Ext::Test::TAG_FRAMEWORK => "my-framework",
    Datadog::CI::Ext::Test::TAG_FRAMEWORK_VERSION => "0.0.1",
  }
)
Datadog::CI.start_test_module("my-test-module")

run_test_suite(["test1", "test2", "test3"], "test-suite-name")

Datadog::CI.active_test_module&.passed!
Datadog::CI.active_test_module&.finish

Datadog::CI.active_test_session&.passed!
Datadog::CI.active_test_session&.finish
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[3]: /es/tests/guides/add_custom_measures/?tab=ruby
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: /es/tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[6]: /es/tracing/trace_collection/dd_libraries/ruby/#integration-instrumentation
[7]: https://github.com/bblimke/webmock
[8]: https://datadoghq.dev/datadog-ci-rb/Datadog/CI.html
[9]: https://github.com/vcr/vcr