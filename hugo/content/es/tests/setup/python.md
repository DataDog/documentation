---
aliases:
- /es/continuous_integration/setup_tests/python
- /es/continuous_integration/tests/python
- /es/continuous_integration/tests/setup/python
code_lang: python
code_lang_weight: 30
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentación
  text: Reenvío de variables de entorno para pruebas en Containers
- link: /continuous_integration/tests
  tag: Documentación
  text: Explorar resultados de pruebas y rendimiento
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Test Optimization
title: Pruebas de Python
type: multi-code-lang
---
## Compatibilidad {#compatibility}

Idiomas admitidos:

| Idioma | Versión |
|---|---|
| Python 2 | >= 2.7 |
| Python 3 | >= 3.6 |

Marcos de prueba compatibles:

| Framework de prueba | Versión |
|---|---|
| `pytest` | >= 3.0.0 |
| `pytest-benchmark` | >= 3.1.0 |
| `unittest` | >= 3.7 |

<div class="alert alert-info">Si utiliza Bazel para ejecutar pruebas de Python, utilice las <a href="/tests/setup/bazel/python/">reglas de Datadog para Bazel en pruebas de Python</a>.</div>

## Configuración del método de reporte {#configuring-reporting-method}

Para reportar los resultados de las pruebas a Datadog, necesita configurar la biblioteca de Python de Datadog:

{{< tabs >}}
{{% tab "Proveedor de CI con soporte para instrumentación automática" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "Otro proveedor de CI en la nube" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "Proveedor de CI local" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## Instalación del rastreador de Python {#installing-the-python-tracer}

Instale el rastreador de Python ejecutando:

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

Para obtener más información, consulte la [documentación de instalación del rastreador de Python][1].

## Instrumentación de sus pruebas {#instrumenting-your-tests}

{{< tabs >}}
{{% tab "pytest" %}}

Para habilitar la instrumentación de pruebas de `pytest`, agregue la opción `--ddtrace` al ejecutar `pytest`.

{{< code-block lang="shell" >}}
pytest --ddtrace
{{< /code-block >}}

Si también desea habilitar el resto de las integraciones de APM para obtener más información en su flamegraph, agregue la opción `--ddtrace-patch-all`:

{{< code-block lang="shell" >}}
pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

Para obtener información de configuración adicional, consulte [Configuración][3].

### Agregar etiquetas personalizadas a las pruebas {#adding-custom-tags-to-tests}

Para agregar etiquetas personalizadas a sus pruebas, declare `ddspan` como un argumento en su prueba:

```python
from ddtrace import tracer

# Declare `ddspan` as argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("test_owner", "my_team")
    # test continues normally
    # ...
```

Para crear filtros o `group by` campos para estas etiquetas, primero debe crear facetas. Para obtener más información sobre cómo agregar etiquetas, consulte la sección [Adding Tags][1] de la documentación de instrumentación personalizada de Python.

### Agregar medidas personalizadas a las pruebas {#adding-custom-measures-to-tests}

Al igual que con las etiquetas, para agregar medidas personalizadas a sus pruebas, utilice el span activo actual:

```python
from ddtrace import tracer

# Declare `ddspan` as an argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("memory_allocations", 16)
    # test continues normally
    # ...
```
Lea más sobre las métricas personalizadas en la [Guía para agregar métricas personalizadas][2].

[1]: /es/tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[2]: /es/tests/guides/add_custom_measures/?tab=python
[3]: #configuration-settings
{{% /tab %}}

{{% tab "pytest-benchmark" %}}

Para instrumentar sus pruebas de benchmark con `pytest-benchmark`, ejecute sus pruebas de benchmark con la opción `--ddtrace` al ejecutar `pytest`, y Datadog detecta las métricas de `pytest-benchmark` automáticamente:

```python
def square_value(value):
    return value * value


def test_square_value(benchmark):
    result = benchmark(square_value, 5)
    assert result == 25
```

Para configuraciones adicionales, consulte [Configuración][1].

[1]: #configuration-settings
{{% /tab %}}

{{% tab "unittest" %}}

Para habilitar la instrumentación de pruebas de `unittest`, ejecute sus pruebas añadiendo `ddtrace-run` al principio de su comando `unittest`.

{{< code-block lang="shell" >}}
ddtrace-run python -m unittest
{{< /code-block >}}

Alternativamente, si desea habilitar la instrumentación `unittest` manualmente, use `patch()` para habilitar la integración:

{{< code-block lang="python" >}}
from ddtrace import patch
import unittest
patch(unittest=True)

class MyTest(unittest.TestCase):
def test_will_pass(self):
assert True
{{< /code-block >}}

Para configuraciones adicionales, consulte [Configuración][1].

[1]: #configuration-settings
{{% /tab %}}

{{% tab "Instrumentación manual (beta)" %}}

### API de pruebas manuales {#manual-testing-api}

<div class="alert alert-warning">La API de pruebas manuales de Test Optimization está en <strong>beta</strong> y está sujeta a cambios.</div>

A partir de la versión `2.13.0`, el [Datadog Python SDK][1] proporciona la API de Test Optimization (`ddtrace.ext.test_visibility`) para enviar resultados de optimización de pruebas según sea necesario.

#### Ejecución de la API {#api-execution}

La API utiliza clases para proporcionar métodos con espacios de nombres para enviar eventos de Test Optimization.

La ejecución de pruebas tiene dos fases:
- Descubrimiento: informar a la API qué elementos esperar
- Ejecución: enviar resultados (usando llamadas de inicio y finalización)

Las fases distintas de descubrimiento y ejecución permiten un intervalo entre el proceso del ejecutor de pruebas que recopila las pruebas y el inicio de las mismas.

Los usuarios de la API deben proporcionar identificadores consistentes (descritos a continuación) que se utilizan como referencias para los elementos de Test Optimization dentro del almacenamiento de estado de la API.

##### Habilitar `test_visibility` {#enable-test-visibility}

Debe llamar a la función `ddtrace.ext.test_visibility.api.enable_test_visibility()` antes de usar la API de Test Optimization.

Llame a la función `ddtrace.ext.test_visibility.api.disable_test_visibility()` antes del cierre del proceso para asegurar el vaciado adecuado de los datos.

#### Modelo de dominio {#domain-model}

La API se basa en cuatro conceptos: sesión de prueba, módulo de prueba, conjunto de pruebas y prueba.

Los módulos, conjuntos de pruebas y pruebas forman una jerarquía en la API de Test Optimization de Python, representada por la relación de padre del identificador del elemento.

##### Sesión de prueba {#test-session}

Una sesión de prueba representa la ejecución de pruebas de un proyecto, que normalmente corresponde a la ejecución de un comando de prueba. Solo se puede descubrir, iniciar y finalizar una sesión en la ejecución del programa Test Optimization.

Llame a `ddtrace.ext.test_visibility.api.TestSession.discover()` para descubrir la sesión, pasando el comando de prueba, un nombre de framework determinado y la versión.

Llame a `ddtrace.ext.test_visibility.api.TestSession.start()` para iniciar la sesión.

Cuando las pruebas hayan finalizado, llame a `ddtrace.ext.test_visibility.api.TestSession.finish()` .


##### Módulo de prueba {#test-module}

Un módulo de prueba representa una unidad de trabajo más pequeña dentro de las pruebas de un proyecto (un directorio, por ejemplo).

Llame a `ddtrace.ext.test_visibility.api.TestModuleId()`, proporcionando el nombre del módulo como parámetro, para crear un `TestModuleId`.

Llame a `ddtrace.ext.test_visibility.api.TestModule.discover()`, pasando el objeto `TestModuleId` como argumento, para descubrir el módulo.

Llame a `ddtrace.ext.test_visibility.api.TestModule.start()`, pasando el objeto `TestModuleId` como argumento, para iniciar el módulo.

Después de que todos los elementos secundarios dentro del módulo hayan finalizado, llame a `ddtrace.ext.test_visibility.api.TestModule.finish()`, pasando el objeto `TestModuleId` como argumento.


##### Conjunto de Pruebas {#test-suite}

Un conjunto de pruebas representa un subconjunto de pruebas dentro de los módulos de un proyecto (un archivo `.py`, por ejemplo).

Llame a `ddtrace.ext.test_visibility.api.TestSuiteId()`, proporcionando el `TestModuleId` del módulo principal y el nombre del conjunto de pruebas como argumentos, para crear un `TestSuiteId`.

Llame a `ddtrace.ext.test_visibility.api.TestSuite.discover()`, pasando el objeto `TestSuiteId` como argumento, para descubrir el conjunto de pruebas.

Llame a `ddtrace.ext.test_visibility.api.TestSuite.start()`, pasando el objeto `TestSuiteId` como argumento, para iniciar el conjunto de pruebas.

Después de que todos los elementos secundarios dentro del conjunto de pruebas hayan finalizado, llame a `ddtrace.ext.test_visibility.api.TestSuite.finish()`, pasando el objeto `TestSuiteId` como argumento.

##### Prueba {#test}

Una prueba representa una sola incidencia de prueba que se ejecuta como parte de un conjunto de pruebas.

Llame a `ddtrace.ext.test_visibility.api.TestId()`, proporcionando la `TestSuiteId` de la suite principal y el nombre de la prueba como argumentos, para crear una `TestId`. El método `TestId()` acepta una cadena analizable en formato JSON como el argumento opcional `parameters`. El argumento `parameters` se puede utilizar para distinguir pruebas parametrizadas que tienen el mismo nombre, pero diferentes valores de parámetros.

Llame a `ddtrace.ext.test_visibility.api.Test.discover()`, pasando el objeto `TestId` como argumento, para descubrir la prueba. El método de clase `Test.discover()` acepta una cadena como el parámetro opcional `resource`, que tiene como valor predeterminado el `name` del `TestId`.

Llame a `ddtrace.ext.test_visibility.api.Test.start()`, pasando el objeto `TestId` como argumento, para iniciar la prueba.

Llame a `ddtrace.ext.test_visibility.api.Test.mark_pass()`, pasando el objeto `TestId` como argumento, para marcar que la prueba ha pasado exitosamente.
Llame a `ddtrace.ext.test_visibility.api.Test.mark_fail()`, pasando el objeto `TestId` como argumento, para marcar que la prueba ha fallado. `mark_fail()` acepta un objeto `TestExcInfo` opcional como el parámetro `exc_info`.
Llame a `ddtrace.ext.test_visibility.api.Test.mark_skip()`, pasando el objeto `TestId` como argumento, para marcar que la prueba fue omitida. `mark_skip()` acepta una cadena opcional como el parámetro `skip_reason`.

###### Información de la excepción {#exception-information}

El método de clase `ddtrace.ext.test_visibility.api.Test.mark_fail()` contiene información sobre las excepciones encontradas durante el fallo de una prueba.

El método `ddtrace.ext.test_visibility.api.TestExcInfo()` toma tres parámetros posicionales:
- `exc_type`: el tipo de excepción encontrada
- `exc_value`: el objeto `BaseException` para la excepción
- `exc_traceback`: el objeto `Traceback` para la excepción

###### Información del propietario del código {#codeowner-information}

El método de clase `ddtrace.ext.test_visibility.api.Test.discover()` acepta una lista de cadenas opcional como el parámetro `codeowners`.

###### Información del archivo fuente de la prueba {#test-source-file-information}

El método de clase `ddtrace.ext.test_visibility.api.Test.discover()` acepta un objeto `TestSourceFileInfo` opcional como el parámetro `source_file_info`. Un objeto `TestSourceFileInfo` representa la ruta y, opcionalmente, las líneas de inicio y fin de una prueba determinada.

El método `ddtrace.ext.test_visibility.api.TestSourceFileInfo()` acepta tres parámetros posicionales:
- `path`: un objeto `pathlib.Path` (hecho relativo a la raíz del repositorio por la API `Test Optimization`)
- `start_line`: un número entero opcional que representa la línea de inicio de la prueba en el archivo
- `end_line`: un número entero opcional que representa la línea de fin de la prueba en el archivo

###### Configuración de parámetros después del descubrimiento de pruebas {#setting-parameters-after-test-discovery}

El método de clase `ddtrace.ext.test_visibility.api.Test.set_parameters()` acepta un objeto `TestId` como argumento, y una cadena analizable en JSON, para establecer el `parameters` para la prueba.

**Nota:** esto sobrescribe los parámetros asociados con la prueba, pero no modifica el campo `TestId` del objeto `parameters`.

Configurar parámetros después de que se haya descubierto una prueba requiere que el objeto `TestId` sea único incluso sin que el campo `parameters` esté definido.

#### Ejemplo de código {#code-example}

```python
from ddtrace.ext.test_visibility import api
import pathlib
import sys

if __name__ == "__main__":
    # Enable the Test Optimization service
    api.enable_test_visibility()

    # Discover items
    api.TestSession.discover("manual_test_api_example", "my_manual_framework", "1.0.0")
    test_module_1_id = api.TestModuleId("module_1")
    api.TestModule.discover(test_module_1_id)

    test_suite_1_id = api.TestSuiteId(test_module_1_id, "suite_1")
    api.TestSuite.discover(test_suite_1_id)

    test_1_id = api.TestId(test_suite_1_id, "test_1")
    api.Test.discover(test_1_id)

    # A parameterized test with codeowners and a source file
    test_2_codeowners = ["team_1", "team_2"]
    test_2_source_info = api.TestSourceFileInfo(pathlib.Path("/path/to_my/tests.py"), 16, 35)

    parametrized_test_2_a_id = api.TestId(
        test_suite_1_id,
        "test_2",
        parameters='{"parameter_1": "value_is_a"}'
    )
    api.Test.discover(
        parametrized_test_2_a_id,
        codeowners=test_2_codeowners,
        source_file_info=test_2_source_info,
        resource="overriden resource name A",
    )

    parametrized_test_2_b_id = api.TestId(
        test_suite_1_id,
        "test_2",
        parameters='{"parameter_1": "value_is_b"}'
    )
    api.Test.discover(
      parametrized_test_2_b_id,
      codeowners=test_2_codeowners,
      source_file_info=test_2_source_info,
      resource="overriden resource name B"
    )

    test_3_id = api.TestId(test_suite_1_id, "test_3")
    api.Test.discover(test_3_id)

    test_4_id = api.TestId(test_suite_1_id, "test_4")
    api.Test.discover(test_4_id)


    # Start and execute items
    api.TestSession.start()

    api.TestModule.start(test_module_1_id)
    api.TestSuite.start(test_suite_1_id)

    # test_1 passes successfully
    api.Test.start(test_1_id)
    api.Test.mark_pass(test_1_id)

    # test_2's first parametrized test succeeds, but the second fails without attaching exception info
    api.Test.start(parametrized_test_2_a_id)
    api.Test.mark_pass(parametrized_test_2_a_id)

    api.Test.start(parametrized_test_2_b_id)
    api.Test.mark_fail(parametrized_test_2_b_id)

    # test_3 is skipped
    api.Test.start(test_3_id)
    api.Test.mark_skip(test_3_id, skip_reason="example skipped test")

    # test_4 fails, and attaches exception info
    api.Test.start(test_4_id)
    try:
      raise(ValueError("this test failed"))
    except:
      api.Test.mark_fail(test_4_id, exc_info=api.TestExcInfo(*sys.exc_info()))

    # Finish suites and modules
    api.TestSuite.finish(test_suite_1_id)
    api.TestModule.finish(test_module_1_id)
    api.TestSession.finish()
```

Para configuraciones adicionales, consulte [Configuración][2].

[1]: https://github.com/DataDog/dd-trace-py
[2]: #configuration-settings
{{% /tab %}}

{{< /tabs >}}

## Configuración de ajustes {#configuration-settings}

Para configurar el SDK, establezca las siguientes variables de entorno antes de iniciar el proceso de prueba. Para ejecutores de pruebas en paralelo, establézcalas en el proceso principal para que cada trabajador las herede.

`DD_SERVICE` (Opcional)
: Nombre del servicio o biblioteca bajo prueba.<br/>
**Predeterminado**: El nombre del repositorio. Si no está disponible, `test` para pytest o `unittest` para unittest.<br/>
**Ejemplo**: `my-python-app`

`DD_ENV` (Opcional)
: Nombre del entorno donde se ejecutan las pruebas.<br/>
**Predeterminado**: `none`<br/>
**Ejemplos**: `local`, `ci`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Requerido para el modo Agentless)
: Habilita el modo Agentless para enviar los resultados de las pruebas directamente a Datadog.<br/>
**Predeterminado**: `false`

`DD_API_KEY` (Requerido para el modo Agentless)
: La clave de Datadog API utilizada para autenticar la carga de resultados de prueba. Esta variable no habilita el modo Agentless.<br/>
**Predeterminado**: `(empty)`

`DD_SITE` (Opcional para el modo Agentless)
: El [sitio de Datadog][4] al cual cargar los resultados de las pruebas. Establezca esta configuración cuando utilice un sitio distinto a US1.<br/>
**Predeterminado**: `datadoghq.com`

`DD_TRACE_AGENT_URL` (Solo cuando se utiliza el Datadog Agent)
: URL del Datadog Agent para la recopilación de trazas, en el formato `http://hostname:port`.<br/>
**Predeterminado**: `http://localhost:8126`

`DD_TEST_SESSION_NAME` (Opcional)
: Identifica un grupo de pruebas, como `unit-tests`, `integration-tests` o `smoke-tests`.<br/>
**Predeterminado**: El nombre del trabajo de CI y el comando de prueba, o el comando de prueba si el nombre del trabajo de CI no está disponible.<br/>
**Ejemplo**: `unit-tests`, `integration-tests`, `smoke-tests`

Para obtener más información sobre las etiquetas reservadas `service` y `env`, consulte [Unified Service Tagging][2].

También se pueden usar todas las demás opciones de [Datadog Tracer configuration][3].

## Recopilación de metadatos de Git {#collecting-git-metadata}

{{% ci-git-metadata %}}

## Mejores prácticas {#best-practices}

### Nombre de la sesión de prueba `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

Use `DD_TEST_SESSION_NAME` para definir el nombre de la sesión de prueba y el grupo de pruebas relacionado. Ejemplos de valores para esta etiqueta serían:

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

Si no se especifica `DD_TEST_SESSION_NAME`, el valor predeterminado es el nombre del trabajo de CI y el comando de prueba. Si el nombre del trabajo de CI no está disponible, se utiliza el comando de prueba.

El nombre de la sesión de prueba debe ser único dentro de un repositorio para ayudarle a distinguir diferentes grupos de pruebas.

#### Cuándo usar `DD_TEST_SESSION_NAME` {#when-to-use-dd-test-session-name}

Existe un conjunto de parámetros que Datadog verifica para establecer la correspondencia entre las sesiones de prueba. El comando de prueba utilizado para ejecutar las pruebas es uno de ellos. Si el comando de prueba contiene una cadena que cambia en cada ejecución, como una carpeta temporal, Datadog considera que las sesiones no están relacionadas entre sí. Por ejemplo:

- `pytest --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recomienda usar `DD_TEST_SESSION_NAME` si sus comandos de prueba varían entre ejecuciones.

## Limitaciones conocidas {#known-limitations}

{{< tabs >}}

{{% tab "pytest" %}}

Los complementos para `pytest` que alteran la ejecución de la prueba pueden causar un comportamiento inesperado.

### Paralelización {#parallelization}

Los complementos que introducen la paralelización en `pytest` (como [`pytest-xdist`][1] o [`pytest-forked`][2]) crean un evento de sesión para cada instancia paralelizada.

Existen varios problemas cuando estos complementos se utilizan junto con `ddtrace`, aunque se han resuelto para `pytest-xdist` en versiones recientes de `dd-trace-py` (3.12.6 y posteriores). Por ejemplo, una sesión, un módulo o una suite pueden aprobarse incluso cuando las pruebas individuales fallan. Asimismo, todas las pruebas pueden aprobarse y la suite/sesión/módulo fallar. Esto sucede porque estos complementos crean subprocesos de trabajo, y los spans creados en el proceso principal pueden no reflejar los resultados de los procesos secundarios. Por esta razón, **el uso de `ddtrace` junto con `pytest-forked` no es compatible por el momento, mientras que `pytest-xdist` solo tiene soporte para `ddtrace>=3.12.6`.**

Cada trabajador informa los resultados de las pruebas a Datadog de forma independiente, por lo que las pruebas del mismo módulo que se ejecutan en diferentes procesos generan eventos de módulo o suite separados.

El recuento total de eventos de prueba (y su exactitud) no se ve afectado. Los eventos individuales de sesión, módulo o suite pueden tener resultados inconsistentes con otros eventos en la misma ejecución de `pytest` (con `pytest-forked`).

### Orden de las pruebas {#test-ordering}

Los complementos que cambian el orden de ejecución de la prueba (como [`pytest-randomly`][3]) pueden crear múltiples eventos de módulo o suite. La duración y los resultados de los eventos de módulo o suite también pueden ser inconsistentes con los resultados informados por `pytest`.

El recuento total de eventos de prueba (y su exactitud) permanece sin cambios.


[1]: https://pypi.org/project/pytest-xdist/
[2]: https://pypi.org/project/pytest-forked/
[3]: https://pypi.org/project/pytest-randomly/

{{% /tab %}}

{{% tab "unittest" %}}

En algunos casos, si la ejecución de la prueba `unittest` se realiza de manera paralela, esto puede interrumpir la instrumentación y afectar la optimización de las pruebas.

Datadog recomienda que utilice hasta un proceso a la vez para evitar afectar la optimización de las pruebas.

{{% /tab %}}

{{< /tabs >}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/dd_libraries/python/
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/tracing/trace_collection/library_config/python/?tab=containers#configuration
[4]: /es/getting_started/site/