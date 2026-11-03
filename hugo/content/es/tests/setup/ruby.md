---
aliases:
- /es/continuous_integration/setup_tests/ruby
- /es/continuous_integration/tests/ruby
- /es/continuous_integration/tests/setup/ruby
code_lang: ruby
code_lang_weight: 40
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentación
  text: Reenvío de variables de entorno para pruebas en Containers
- link: /continuous_integration/tests
  tag: Documentación
  text: Explorar resultados de pruebas y rendimiento
- link: /tests/test_parallelization/
  tag: Documentación
  text: Configure la paralelización de prueba
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Test Optimization
title: Pruebas de Ruby
type: multi-code-lang
---
## Compatibilidad {#compatibility}

Idiomas admitidos:

| Idioma | Versión |
| -------- | ------- |
| Ruby     | >= 2.7  |

Marcos de prueba compatibles:

| Test Framework | Versión  |
| -------------- | -------- |
| RSpec          | >= 3.0.0 |
| Minitest       | >= 5.0.0 |
| Cucumber       | >= 3.0   |

Ejecutores de pruebas admitidos:

| Ejecutor de pruebas    | Versión   |
| -------------- | --------- |
| Knapsack Pro   | >= 7.2.0  |
| parallel_tests | >= 4.0.0  |
| ci-queue       | >= 0.53.0 |

## Configuración del método de reporte {#configuring-reporting-method}

Para reportar los resultados de las pruebas a Datadog, debe configurar la gema `datadog-ci`:

{{< tabs >}}
{{% tab "Proveedor de CI con soporte para instrumentación automática" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "Proveedor de CI en la nube (Agentless)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "Proveedor de CI local (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## Instrumentación manual {#manual-instrumentation}

<div class="alert alert-info">
Esta sección <strong>solo es necesaria</strong> si su proveedor de CI no admite la instrumentación automática. Si seleccionó <strong>Proveedor de CI con soporte para instrumentación automática</strong> en la sección <a href="#configuring-reporting-method">Configuración del método de informes</a> anterior, omita esta sección y continúe con <a href="#configuration-settings">Configuración de ajustes</a>.
</div>

Si su proveedor de CI no admite la instrumentación automática (por ejemplo, si seleccionó {{< ui >}}Cloud CI provider (Agentless){{< /ui >}} o {{< ui >}}On-Premises CI Provider (Datadog Agent){{< /ui >}}), siga estos pasos para instalar la biblioteca e instrumentar sus pruebas manualmente.

1. Agregue la [gema de Test Optimization de Ruby][10] a su Gemfile:

{{< code-block lang="ruby" filename="Gemfile" >}}
gem "datadog-ci", "~> 1.0", group: :test
{{< /code-block >}}

2. [Configurar el método de informes](#configuring-reporting-method)

3. Establezca la variable de entorno `RUBYOPT` en el comando que ejecuta sus pruebas:

   ```bash
   RUBYOPT="-rbundler/setup -rdatadog/ci/auto_instrument" bundle exec rake test
   ```

   **Nota**: Si prefiere no establecer la variable de entorno `RUBYOPT`, anteponga `bundle exec ddcirb exec` a su comando de pruebas:

   ```bash
   bundle exec ddcirb exec rake test
   ```

## Configuración de ajustes {#configuration-settings}

Para configurar la biblioteca Test Optimization, establezca las siguientes variables de entorno antes de iniciar el proceso de prueba. Para ejecutores de pruebas en paralelo, establézcalas en el proceso principal para que cada trabajador las herede.

`DD_CIVISIBILITY_ENABLED=true` (Obligatorio)
: Habilita Test Optimization.<br/>
**Predeterminado**: `false`

`DD_ENV` (Opcional)
: Nombre del entorno donde se ejecutan las pruebas.<br/>
**Predeterminado**: `(empty)`<br/>
**Ejemplos**: `local`, `ci`

`DD_SERVICE` (Opcional)
: Nombre del servicio o biblioteca bajo prueba.<br/>
**Predeterminado**: El nombre del repositorio<br/>
**Ejemplo**: `my-ruby-app`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Requerido para el modo Agentless)
: Habilita el modo Agentless para enviar los resultados de las pruebas directamente a Datadog.<br/>
**Predeterminado**: `false`

`DD_API_KEY` (Requerido para el modo Agentless)
: La clave de Datadog API utilizada para autenticar la carga de resultados de prueba. Esta variable no habilita el modo Agentless.<br/>
**Predeterminado**: `(empty)`

`DD_SITE` (Opcional para el modo Agentless)
: El [sitio de Datadog][11] al que se cargarán los resultados de las pruebas. Establezca esta configuración cuando utilice un sitio distinto a US1.<br/>
**Predeterminado**: `datadoghq.com`

`DD_TRACE_AGENT_URL` (Solo cuando se utiliza el Datadog Agent)
: URL del Datadog Agent para la recopilación de trazas, en el formato `http://hostname:port`.<br/>
**Predeterminado**: `http://127.0.0.1:8126`

`DD_TEST_SESSION_NAME` (Opcional)
: Identifica un grupo de pruebas, como `unit-tests`, `integration-tests` o `smoke-tests`.<br/>
**Predeterminado**: El nombre del trabajo de CI y el comando de prueba, o el comando de prueba si el nombre del trabajo de CI no está disponible.<br/>
**Ejemplo**: `unit-tests`, `integration-tests`, `smoke-tests`

También se pueden usar todas las demás opciones de [Datadog Tracer configuration][5].

Las funciones adicionales de Test Optimization tienen sus propias opciones de configuración documentadas en sus respectivas páginas.

## Agregar etiquetas personalizadas a las pruebas {#adding-custom-tags-to-tests}

Puede agregar etiquetas personalizadas a sus pruebas utilizando la prueba activa actual:

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_tag("test_owner", "my_team")
# test continues normally
# ...
```

Para crear filtros o `group by` campos para estas etiquetas, primero debe crear facetas. Para obtener más información sobre cómo agregar etiquetas, consulte la sección [Agregar etiquetas][2] de la documentación de instrumentación personalizada de Ruby.

## Agregar medidas personalizadas a las pruebas {#adding-custom-measures-to-tests}

Al igual que con las etiquetas, puede agregar medidas personalizadas a sus pruebas utilizando la prueba activa actual:

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_metric("memory_allocations", 16)
# test continues normally
# ...
```

Para obtener más información sobre medidas personalizadas, consulte la [Guía para agregar medidas personalizadas][3].

## Uso de instrumentación adicional {#using-additional-instrumentation}

Puede ser útil tener información de traza detallada sobre sus pruebas que incluya el tiempo dedicado a realizar operaciones de base de datos u otras llamadas externas, como se ve en el siguiente gráfico de llama:

{{< img src="continuous_integration/tests/setup/ci-ruby-test-trace-with-redis.png" alt="Prueba de traza con Redis instrumentado" >}}

Puede habilitar la instrumentación de APM automática agregando la siguiente línea en su `test_helper/spec_helper`:

```ruby
require "datadog/auto_instrument" if ENV["DD_ENV"] == "ci"
```

**Nota**: En modo CI, estas trazas se envían a Test Optimization y **no** aparecen en Datadog APM.

Para obtener la lista completa de métodos de instrumentación disponibles, consulte la [documentación de traza][6]

## Recopilación de metadatos de Git {#collecting-git-metadata}

{{% ci-git-metadata %}}

## Uso de la API pública de la biblioteca para marcos de prueba no compatibles {#using-librarys-public-api-for-unsupported-test-frameworks}

Si usa RSpec, Minitest o Cucumber, **no use la API de prueba manual**, ya que Test Optimization los instrumenta automáticamente y envía los resultados de las pruebas a Datadog. La API de prueba manual es **incompatible** con los marcos de pruebas ya compatibles.

Utilice la API de prueba manual solo si usa un marco de pruebas no compatible o si tiene un mecanismo de pruebas diferente.
La documentación completa de la API pública está disponible en el [sitio de YARD][8].

### Modelo de dominio {#domain-model}

La API se basa en cuatro conceptos: sesión de prueba, módulo de prueba, conjunto de pruebas y prueba.

#### Sesión de prueba {#test-session}

Una sesión de prueba representa una ejecución de comando de prueba.

Para iniciar una sesión de prueba, llame a `Datadog::CI.start_test_session` y pase el servicio de Datadog y las etiquetas (como el framework de prueba
que utiliza).

Cuando todas sus pruebas hayan terminado, llame a `Datadog::CI::TestSession#finish`, lo cual cierra la sesión y envía la traza de la sesión.
al backend.

#### Módulo de prueba {#test-module}

Un módulo de prueba representa una unidad de trabajo más pequeña dentro de una sesión.
Para los frameworks de prueba compatibles, el módulo de prueba siempre es el mismo que la sesión de prueba.
Para su caso de uso, esto podría ser un paquete en su aplicación componentizada.

Para iniciar un módulo de prueba, llame a `Datadog::CI.start_test_module` y pase el nombre del módulo.

Cuando la ejecución del módulo haya terminado, llame a `Datadog::CI::TestModule#finish`.

#### Conjunto de pruebas {#test-suite}

Un conjunto de pruebas comprende un grupo de pruebas que evalúan una funcionalidad similar.
Un solo conjunto suele corresponder a un solo archivo donde se definen las pruebas.

Cree conjuntos de pruebas llamando a `Datadog::CI#start_test_suite` y pasando el nombre del conjunto de pruebas.

Llame a `Datadog::CI::TestSuite#finish` cuando todas las pruebas relacionadas en el conjunto hayan terminado su ejecución.

#### Prueba {#test}

Una prueba representa una sola incidencia de prueba que se ejecuta como parte de un conjunto de pruebas.
Por lo general, corresponde a un método que contiene lógica de prueba.

Cree pruebas en un conjunto llamando a `Datadog::CI#start_test` o `Datadog::CI.trace_test` y pasando el nombre de la prueba y el nombre del conjunto de pruebas. El nombre del conjunto de pruebas debe ser el mismo que el nombre del conjunto de pruebas iniciado en el paso anterior.

Llame a `Datadog::CI::Test#finish` cuando una prueba haya terminado su ejecución.

### Ejemplo de código {#code-example}

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

## Mejores prácticas {#best-practices}

### Nombre de la sesión de prueba `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

Use `DD_TEST_SESSION_NAME` para definir el nombre de la sesión de prueba y el grupo de pruebas relacionado. Ejemplos de valores para esta etiqueta serían:

-   `unit-tests`
-   `integration-tests`
-   `smoke-tests`
-   `flaky-tests`
-   `ui-tests`
-   `backend-tests`

Si no se especifica `DD_TEST_SESSION_NAME`, el valor predeterminado es el nombre del trabajo de CI y el comando de prueba. Si el nombre del trabajo de CI no está disponible, se utiliza el comando de prueba.

El nombre de la sesión de prueba debe ser único dentro de un repositorio para ayudarle a distinguir diferentes grupos de pruebas.

#### Cuándo usar `DD_TEST_SESSION_NAME` {#when-to-use-dd-test-session-name}

Existe un conjunto de parámetros que Datadog verifica para establecer la correspondencia entre las sesiones de prueba. El comando de prueba utilizado para ejecutar las pruebas es uno de ellos. Si el comando de prueba contiene una cadena que cambia en cada ejecución, como una lista de archivos a ejecutar, Datadog considera que las sesiones no están relacionadas entre sí. Por ejemplo:

-   `bundle exec rspec my_spec.rb my_other_spec.rb`

Datadog recomienda usar `DD_TEST_SESSION_NAME` si sus comandos de prueba varían entre ejecuciones.

## Lecturas adicionales {#further-reading}

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
[11]: /es/getting_started/site/