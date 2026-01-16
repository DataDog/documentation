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
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de Test Optimization (optimización de tests)
title: Tests de Ruby
type: lenguaje de código múltiple
---

## Compatibilidad

Lenguajes compatibles:

| Lenguaje | Versión |
|---|---|
| Ruby | >= 2.7 |
| JRuby | >= 9.4 |

Marcos de tests compatibles:

| Marco de test | Versión |
|---|---|
| RSpec | >= 3.0.0 |
| Minitest | >= 5.0.0 |
| Cucumber | >= 3.0 |

Ejecutores de test compatibles:

| Ejecutor de test | Versión |
|---|---|
| Knapsack Pro | >= 7.2.0 |
| parallel_tests | >= 4.0.0 |
| ci-queue | >= 0.53.0 |

## Configuración del método de informe

Para informar los resultados de test a Datadog, debes configurar el gem `datadog-ci`:

{{< tabs >}}
{{% tab "CI Provider with Auto-Instrumentation Support" %}}
{{% ci-autoinstrumentation %}}

<div class="alert alert-danger">
  <strong>Nota</strong>: La instrumentación automática no es compatible con JRuby. En su lugar, sigue los <a href="/tests/setup/ruby/?tab=ciproviderwithautoinstrumentationsupport#manually-instrumenting-your-tests">pasos de instrumentación manual</a>.
</div>

{{% /tab %}}

{{% tab "Proveedor de Cloud CI (Agentmenos)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}{{< /tabs >}}

## Instalación de la librería de Test Optimization para Ruby

Para instalar el [gem de Test Optimization de Ruby][10] ejecuta:

```bash
bundle add datadog-ci --group "test"
```
También puedes añadirlo manualmente a tu Gemfile:

1. Añade el gem `datadog-ci` a tu `Gemfile`:

{{< code-block lang="ruby" filename="Gemfile" >}}
gem "datadog-ci", "~> 1.0", group: :test
{{< /code-block >}}

2. Instala el gem ejecutando `bundle install`

## Instrumentación de tus tests

Sigue estos pasos si tu proveedor de CI no es compatible con la instrumentación automática (consulta [Configuración del método de generación de informes](#configuring-reporting-method)).

1. Establece las siguientes variables de entorno para configurar el rastreador:

`DD_CIVISIBILITY_ENABLED=true` (obligatorio)
: activa el producto Test Optimization.

`DD_TEST_SESSION_NAME`
: permite identificar un grupo de tests (por ejemplo: `unit-tests` o `integration-tests`).

`DD_ENV` (Obligatorio)
: entorno donde se ejecutan los tests (por ejemplo: `local` cuando se ejecutan tests en una estación de trabajo de desarrollador o `ci` cuando se ejecutan en un proveedor de CI).

`DD_SERVICE` (opcional)
: nombre de servicio o biblioteca que se está comprobando.

2. Anexa tu comando de test con este wrapper de la CLI datadog-ci:

```bash
bundle exec ddcirb exec bundle exec rake test
```

Como alternativa, establece la variable de entorno `RUBYOPT` en `"-rbundler/setup -rdatadog/ci/auto_instrument"` y no modifiques tu comando de test.

### Añadir etiquetas personalizadas a los tests

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

## Ajustes de configuración

A continuación, se muestra una lista de los ajustes más importantes de configuración que se pueden utilizar con la librería de Test Optimization, ya sea en código mediante un bloque `Datadog.configure`, o utilizando variables de entorno:

`service`
: Nombre del servicio o de la librería en proceso de test.<br/>
**Variable de entorno**: `DD_SERVICE`<br/>
**Por defecto**: `$PROGRAM_NAME`<br/>
**Ejemplo**: `my-ruby-app`

`env`
: nombre del entorno donde se están ejecutando los tests.<br/>
**Variable de entorno **: `DD_ENV`<br/>
**Por defecto**: `none`<br/>
**Ejemplos**: `local`, `ci`

Para obtener más información sobre las etiquetas reservadas `service` y `env`, consulta [Etiquetado unificado de servicios][4].

La siguiente variable de entorno puede utilizarse para configurar el localización del Datadog Agent:

`DD_TRACE_AGENT_URL`
: La URL del Datadog Agent URL para recopilar trazas (traces) con el formato `http://hostname:port`.<br/>
**Por defecto**: `http://localhost:8126`

También puedes utilizar todas las demás opciones de [configuración del Datadog Tracer][5].

## Uso de la instrumentación adicional

Puede ser útil disponer de información de seguimiento enriquecida sobre tus tests, que incluya el tiempo empleado en realizar operaciones con la base de datos u otras llamadas externas, como se muestra en el siguiente gráfico de llamas:

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

También puedes activar la instrumentación de APM automática en `test_helper/spec_helper`:

```ruby
require "datadog/auto_instrument" if ENV["DD_ENV"] == "ci"
```

**Nota**: En modo CI, estas trazas se envían a Test Optimization y **no** aparecen en Datadog APM.

Para ver la lista de todos los métodos de instrumentación disponibles, consulta la [documentación sobre rastreo][6].

## Recopilación de metadatos Git

{{% ci-git-metadata %}}

## Instrumentación manual de los tests

<div class="alert alert-info">
<strong>Atención</strong>: cuando utilices la instrumentación manual, ejecuta tus tests como lo haces normalmente:
no cambies la variable de entorno `RUBYOPT` y no añadas `bundle exec ddcirb exec` al comando de test.
</div>

La instrumentación añade una sobrecarga adicional de rendimiento en la fase de carga del código. Puede ser notable para
repositorios grandes con muchas dependencias. Si tu proyecto tarda más de 20 segundos en iniciarse, es probable que te sea útil
instrumentar manualmente tus tests.

{{< tabs >}}
{{% tab "RSpec" %}}

La integración de RSpec rastrea todas las ejecuciones de grupos de ejemplos y ejemplos cuando se utiliza el marco de tests `rspec`.

Para activar tu integración, añade esto al archivo `spec_helper.rb`:

```ruby
require "rspec"
require "datadog/ci"

# Only activates test instrumentation on CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # enables test optimization
    c.ci.enabled = true

    # The name of the service or library under test
    c.service = "my-ruby-app"

    # Enables the RSpec instrumentation
    c.ci.instrument :rspec
  end
end
```

Ejecuta tus tests como lo haces normalmente, especificando el entorno donde se están ejecutando los tests en la variable de entorno `DD_ENV`.

Puedes utilizar las siguientes entornos:

* `local` cuando ejecutes tests en una estación de trabajo de desarrollador
* `ci` cuando los ejecutes en un proveedor CI

Por ejemplo:

```bash
DD_ENV=ci bundle exec rake spec
```

{{% /tab %}}

{{% tab "Minitest" %}}

La integración de Minitest rastrea todas las ejecuciones de tests cuando se utiliza el marco `minitest`.

Para activar tu integración, añade esto al archivo `test_helper.rb`:

```ruby
require "minitest"
require "datadog/ci"

# Only activates test instrumentation on CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # enables test optimization
    c.ci.enabled = true

    # The name of the service or library under test
    c.service = "my-ruby-app"

    c.ci.instrument :minitest
  end
end
```

Ejecuta tus tests como lo haces normalmente, especificando el entorno donde se están ejecutando los tests en la variable de entorno `DD_ENV`.

Puedes utilizar las siguientes entornos:

* `local` cuando ejecutes tests en una estación de trabajo de desarrollador
* `ci` cuando los ejecutes en un proveedor CI

Por ejemplo:

```bash
DD_ENV=ci bundle exec rake test
```

<div class="alert alert-danger">
<strong>Nota:</strong> Cuando utilices `minitest/autorun`, asegúrate de que `datadog/ci` es obligatorio antes que `minitest/autorun`.
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

# Only activates test instrumentation on CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # enables test optimization
    c.ci.enabled = true

    # The name of the service or library under test
    c.service = "my-ruby-app"

    # Enables the Cucumber instrumentation
    c.ci.instrument :cucumber
  end
end
```

Ejecuta tus tests como lo haces habitualmente, especificando el entorno en el que se ejecutan los tests en la variable de entorno `DD_ENV`.
Puedes utilizar los siguientes entornos:

* `local` cuando ejecutes tests en una estación de trabajo de desarrollador
* `ci` cuando los ejecutes en un proveedor CI

Por ejemplo:

```bash
DD_ENV=ci bundle exec rake cucumber
```

{{% /tab %}}
{{< /tabs >}}

## Utilización de la API pública de la librería para marcos de tests no compatibles

Si utilizas RSpec, Minitest o Cucumber, **no utilices la API de tests manuales**, ya que Test Optimization los instrumenta automáticamente y envía los resultados de los tests a Datadog. La API de tests manuales **no es incompatible** con los marcos de tests ya compatibles.

Utiliza la API de tests manuales sólo si utilizas un marco para tests que no es compatible o si utilizas un mecanismo de test diferente.
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
En el caso de los marcos para tests compatibles, el módulo de test es siempre igual a la sesión de tests.
Para tu caso de uso, podría tratarse de un paquete en tu aplicación componentizada.

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

## Prácticas recomendadas

### Nombre de la sesión de test `DD_TEST_SESSION_NAME`

Utiliza `DD_TEST_SESSION_NAME` para definir el nombre de la sesión de test y del grupo de tests relacionado. Ejemplos de valores para esta etiqueta serían:

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

Si no se especifica `DD_TEST_SESSION_NAME`, el valor por defecto utilizado es una combinación de:

- Nombre del trabajo de CI
- Comando utilizado para ejecutar los tests (como `yarn test`)

El nombre de la sesión de test debe ser único dentro de un repositorio para ayudar a distinguir diferentes grupos de tests.

#### Cuándo utilizar `DD_TEST_SESSION_NAME`

Hay un conjunto de parámetros que Datadog comprueba para establecer la correspondencia entre las sesiones de test. El comando de test utilizado para ejecutar los tests es uno de ellos. Si el comando de test contiene una cadena que cambia en cada ejecución, como una carpeta temporal, Datadog considera que las sesiones no están relacionadas entre sí. Por ejemplo:

- `yarn test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`
- `pnpm vitest --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recomienda utilizar `DD_TEST_SESSION_NAME` si tus comandos de test varían entre ejecuciones.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[3]: /es/tests/guides/add_custom_measures/?tab=ruby
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: /es/tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[6]: /es/tracing/trace_collection/dd_libraries/ruby/#integration-instrumentation
[7]: https://github.com/bblimke/webmock
[8]: https://datadoghq.dev/datadog-ci-rb/Datadog/CI.html
[9]: https://github.com/vcr/vcr
[10]: https://github.com/DataDog/datadog-ci-rb
