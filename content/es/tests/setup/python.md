---
aliases:
- /es/continuous_integration/setup_tests/python
- /es/continuous_integration/tests/python
- /es/continuous_integration/tests/setup/python
code_lang: Python
code_lang_weight: 30
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
title: Tests Python
type: lenguaje de código múltiple
---

## Compatibilidad

Lenguajes compatibles:

| Lenguaje | Versión |
|---|---|
| Python 2 | >= 2.7 |
| Python 3 | >= 3.6 |

Marcos de test compatibles:

| Marco de test | Versión |
|---|---|
| `pytest` | >= 3.0.0 |
| `pytest-benchmark` | >= 3.1.0 |
| `unittest` | >= 3.7 |

## Configuración del método de informe

Para informar resultados de tests a Datadog, debes configurar la librería Datadog Python:

{{< tabs >}}
{{% tab "CI Provider with Auto-Instrumentation Support" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "Other Cloud CI Provider" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "On-Premises CI Provider" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## Instalación del rastreador de Python

Instala el rastreador de Python ejecutando:

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

Para obtener más información, consulta la [documentación de instalación del rastreador de Python][1].

## Instrumentación de tus tests

{{< tabs >}}
{{% tab "pytest" %}}

Para activar la instrumentación de tests `pytest`, añade la opción `--ddtrace` al ejecutar `pytest`.

{{< code-block lang="shell" >}}
pytest --ddtrace
{{< /code-block >}}

Si también quieres activar el resto de las integraciones de APM para obtener más información en tu gráfico de llamas, añade la opción `--ddtrace-patch-all`:

{{< code-block lang="shell" >}}
pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

Para ver configuraciones adicionales, consulta [Configuración][3].

### Añadir etiquetas (tags) personalizadas a tests

Para añadir etiquetas personalizadas a tus tests, declara `ddspan` como un argumento en tu test:

```python
from ddtrace import tracer

# Declare `ddspan` as argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("test_owner", "my_team")
    # test continues normally
    # ...
```

Para crear filtros o campos `group by` para estas etiquetas, debes primero crear facetas. Para obtener más información sobre cómo añadir etiquetas, consulta la sección [Añadir etiquetas][1] en la documentación de instrumentación de Python.

### Añadir medidas personalizadas a tests

Al igual que con las etiquetas, para añadir medidas a tus tests, utiliza el tramo (span) activo actual:

```python
from ddtrace import tracer

# Declare `ddspan` as an argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("memory_allocations", 16)
    # test continues normally
    # ...
```
Conoce más sobre las medidas personalizadas en la [guía para añadir medidas personalizadas][2].

[1]: /es/tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[2]: /es/tests/guides/add_custom_measures/?tab=python
[3]: #configuration-settings
{{% /tab %}}

{{% tab "pytest-benchmark" %}}

Para instrumentar tus tests de referencia con `pytest-benchmark`, ejecuta tus tests de referencia con la opción `--ddtrace` cuando se ejecuta `pytest` y Datadog detecta métricas desde `pytest-benchmark` automáticamente:

```python
def square_value(value):
    return value * value


def test_square_value(benchmark):
    result = benchmark(square_value, 5)
    assert result == 25
```

Para ver configuraciones adicionales, consulta [Configuración][1].

[1]: #configuration-settings
{{% /tab %}}

{{% tab "unittest" %}}

Para activar la instrumentación de tests de `unittest`, ejecuta tus tests al anexar `ddtrace-run` al comienzo de tu comando `unittest`.

{{< code-block lang="shell" >}}
ddtrace-run python -m unittest
{{< /code-block >}}

Alternativamente, si quieres activar la instrumentación de `unittest` de forma manual, utiliz `patch()` para activar la integración:

{{< code-block lang="python" >}}
from ddtrace import patch
import unittest
patch(unittest=True)

class MyTest(unittest.TestCase):
def test_will_pass(self):
assert True
{{< /code-block >}}

Para ver configuraciones adicionales, consulta [Configuración][1].

[1]: #configuration-settings
{{% /tab %}}

{{% tab "Manual instrumentation (beta)" %}}

### API de test manual

<div class="alert alert-danger"><strong>Nota</strong>: La API de test manual de Test Optimization está en fase <strong>beta</strong> y puede sufrir modificaciones.</div>

A partir de la versión `2.13.0`, el [rastreador Python de Datadog][1] proporciona la API de Test Optimization (`ddtrace.ext.test_visibility`) para enviar resultados de optimización de tests según sea necesario.

#### Ejecución de la API

La API utiliza clases para proporcionar métodos con espacios de nombres para enviar eventos de optimización de tests.

La ejecución de tests tiene dos fases:
- Descubrimiento: informar a la API sobre los elementos que puede esperar
- Ejecución: enviar los resultados (mediante llamadas de inicio y fin)

Las distintas fases de descubrimiento y ejecución permiten que haya un intervalo entre que el proceso del ejecutor de tests recopila los tests y éstos comienzan.

Los usuarios de la API deben proporcionar identificadores coherentes (descritos a continuación) que se utilizan como referencias para los elementos de Test Optimization dentro del almacenamiento de estados de la API.

##### Activar `test_visibility`

Debes llamar a la función `ddtrace.ext.test_visibility.api.enable_test_visibility()` antes de utilizar la API de Test Optimization.

Llama a la función `ddtrace.ext.test_visibility.api.disable_test_visibility()` antes de que el proceso termine para asegurarte de que los datos se vacíen correctamente.

#### Modelo de dominio

La API se basa en cuatro conceptos: sesión de tests, módulo de test, conjuntos de tests y tests.

Los módulos, paquetes y tests conforman una jerarquía en la API de optimización de tests de Python, representada por la relación de superioridad del identificador de elemento.

##### Sesión de tests

Una sesión de test representa la ejecución del test de un proyecto, que suele corresponder a la ejecución de un comando de test. Sólo se puede detectar, iniciar y finalizar una sesión en la ejecución del programa de Test Optimization.

Llama a `ddtrace.ext.test_visibility.api.TestSession.discover()` para detectar la sesión, pasando el comando del test, un nombre de marco de trabajo determinado y la versión.

Llama a `ddtrace.ext.test_visibility.api.TestSession.start()` para iniciar la sesión.

Una vez finalizados los tests, llama a `ddtrace.ext.test_visibility.api.TestSession.finish()`.


##### Módulo de test

Un módulo de test representa una unidad de trabajo más pequeña dentro de la ejecución de tests de un proyecto (un directorio, por ejemplo).

Llama a `ddtrace.ext.test_visibility.api.TestModuleId()` y proporciona el nombre del módulo como parámetro para crear un `TestModuleId`.

Llama a `ddtrace.ext.test_visibility.api.TestModule.discover()` y pasa el objeto `TestModuleId` como argumento para detectar el módulo.

Llama a `ddtrace.ext.test_visibility.api.TestModule.start()` y pasa el objeto `TestModuleId` como argumento para iniciar el módulo.

Después de que se hayan completado todos los elementos secundarios dentro del módulo, llama a `ddtrace.ext.test_visibility.api.TestModule.finish()` y pasa el objeto `TestModuleId` como argumento.


##### Conjunto de tests

Un paquete de tests representa un subconjunto de tests dentro de los módulos de un proyecto (archivo`.py`, por ejemplo).

Llama a `ddtrace.ext.test_visibility.api.TestSuiteId()` y proporciona el `TestModuleId` del módulo principal y el nombre del paquete como argumentos para crear un `TestSuiteId`.

Llama a `ddtrace.ext.test_visibility.api.TestSuite.discover()` y pasa el objeto `TestSuiteId` como argumento para detectar el paquete.

Llama a `ddtrace.ext.test_visibility.api.TestSuite.start()` y pasa el objeto `TestSuiteId` como argumento para iniciar el paquete.

Después de que se hayan completado todos los elementos secundarios dentro del paquete, llama a `ddtrace.ext.test_visibility.api.TestSuite.finish()` y pasa el objeto `TestSuiteId` como argumento.

##### Test

Un test representa un único caso de test que se ejecuta como parte de un paquete de tests.

Llama a `ddtrace.ext.test_visibility.api.TestId()` y proporciona el `TestSuiteId` del paquete principal y el nombre del test como argumentos para crear un `TestId`. El método `TestId()` acepta una cadena analizable JSON como argumento opcional `parameters`. El argumento `parameters` puede utilizarse para distinguir tests parametrizados que tienen el mismo nombre, pero diferentes valores de parámetros.

Llama a `ddtrace.ext.test_visibility.api.Test.discover()` y pasa el objeto `TestId` como argumento para detectar el test. El método de clase `Test.discover()` acepta una cadena como parámetro opcional `resource` , que por defecto es el `name` del `TestId`.

Llama a `ddtrace.ext.test_visibility.api.Test.start()` y pasa el objeto `TestId` como argumento para iniciar el test.

Llama a `ddtrace.ext.test_visibility.api.Test.mark_pass()` y pasa el objeto `TestId` como argumento para indicar que el test fue exitoso.
Llama a `ddtrace.ext.test_visibility.api.Test.mark_fail()` y pasa el objeto `TestId` como argumento para indicar que el test falló. `mark_fail()` acepta un objeto opcional `TestExcInfo` como parámetro `exc_info`.
Llama a `ddtrace.ext.test_visibility.api.Test.mark_skip()` y pasa el objeto `TestId` como argumento para indicar que el test fue omitido. `mark_skip()` acepta una cadena opcional como parámetro `skip_reason`.

###### Información de excepción

El método de clase `ddtrace.ext.test_visibility.api.Test.mark_fail()` contiene información sobre las excepciones encontradas durante el fallo de un test.

El método `ddtrace.ext.test_visibility.api.TestExcInfo()` toma tres parámetros de posición:
- `exc_type`: tipo de excepción encontrada
- `exc_value`: objeto `BaseException` de la excepción
- `exc_traceback`: objeto `Traceback` de la excepción

###### Información sobre el propietario del código

El método de clase `ddtrace.ext.test_visibility.api.Test.discover()` acepta una lista opcional de cadenas como parámetro `codeowners`.

###### Información del archivo fuente del test

El método de clase `ddtrace.ext.test_visibility.api.Test.discover()` acepta un objeto opcional `TestSourceFileInfo` como parámetro `source_file_info`. Un objeto `TestSourceFileInfo` representa la ruta y, opcionalmente, las líneas de inicio y fin de un test determinado.

El método `ddtrace.ext.test_visibility.api.TestSourceFileInfo()` acepta tres parámetros de posición:
- `path`: objeto `pathlib.Path` (hecho relativo a la raíz del repositorio por la API `Test Optimization` )
- `start_line`: entero opcional que representa la línea de inicio del test en el archivo
- `end_line`: entero opcional que representa la línea de fin del test en el archivo

###### Definición de parámetros tras la detección de un test

El método de clase `ddtrace.ext.test_visibility.api.Test.set_parameters()` acepta un objeto `TestId` como argumento y una cadena analizable JSON para definir los `parameters` del test.

**Nota:** Esta acción sobrescribe los parámetros asociados al test, pero no modifica el campo `parameters` del objeto `TestId`.

La definición de parámetros tras la detección de un test requiere que el objeto `TestId` sea único, incluso sin haber configurado el campo `parameters`.

#### Ejemplo de código

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

Para ver configuraciones adicionales, consulta los [parámetros de configuración][2].

[1]: https://github.com/DataDog/dd-trace-py
[2]: #configuration-settings
{{% /tab %}}

{{< /tabs >}}

## Ajustes de configuración

La siguiente es una lista de los parámetros de configuración más importantes que puedes utilizar con el rastreador, ya sea mediante código o mediante variables de entorno:

`DD_TEST_SESSION_NAME`
: Identifica un grupo de tests, como `integration-tests`, `unit-tests` o `smoke-tests`.<br/>
**Variable de entorno**: `DD_TEST_SESSION_NAME`<br/>
**Por defecto**: (nombre del trabajo CI + comando de test)<br/>
**Ejemplo**: `unit-tests`, `integration-tests`, `smoke-tests`

`DD_SERVICE`
: Nombre del servicio o de la librería en proceso de test.<br/>
**Variable de entorno**: `DD_SERVICE`<br/>
**Por defecto**: `pytest`<br/>
**Ejemplo**: `my-python-app`

`DD_ENV`
: Nombre del entorno en el que se ejecutan los tests.<br/>
**Variable de entorno **: `DD_ENV`<br/>
**Por defecto**: `none`<br/>
**Ejemplos**: `local`, `ci`

Para obtener más información sobre las etiquetas reservadas `service` y `env`, consulta [Etiquetado unificado de servicios][2].

La siguiente variable de entorno puede utilizarse para configurar el localización del Datadog Agent:

`DD_TRACE_AGENT_URL`
: La URL del Datadog Agent URL para recopilar trazas (traces) con el formato `http://hostname:port`.<br/>
**Por defecto**: `http://localhost:8126`

También puedes utilizar todas las demás opciones de [configuración del Datadog Tracer][3].

## Recopilación de metadatos Git

{{% ci-git-metadata %}}

## Prácticas recomendadas

### Nombre de la sesión de test `DD_TEST_SESSION_NAME`

Utiliza `DD_TEST_SESSION_NAME` para definir el nombre de la sesión de test y del grupo de tests relacionado. Algunos ejemplos de valores de esta etiqueta serían:

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

Si no se especifica `DD_TEST_SESSION_NAME`, el valor por defecto utilizado es una combinación de:

- Nombre del trabajo CI
- Comando utilizado para ejecutar los tests (como `pytest --ddtrace`)

El nombre de la sesión de test debe ser único dentro de un repositorio para ayudar a distinguir diferentes grupos de tests.

#### Cuándo utilizar `DD_TEST_SESSION_NAME`

Hay un conjunto de parámetros que Datadog comprueba para establecer la correspondencia entre las sesiones de test. El comando de test utilizado para ejecutar los tests es uno de ellos. Si el comando de test contiene una cadena que cambia en cada ejecución, como una carpeta temporal, Datadog considera que las sesiones no están relacionadas entre sí. Por ejemplo:

- `pytest --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recomienda utilizar `DD_TEST_SESSION_NAME` si tus comandos de test varían entre ejecuciones.

## Limitaciones conocidas

{{< tabs >}}

{{% tab "pytest" %}}

Los complementos para `pytest` que alteran la ejecución de los tests pueden provocar comportamientos inesperados.

### Paralelización

Los complementos que introducen una paralelización en `pytest` (como [`pytest-xdist`][1] o [`pytest-forked`][2]) crean un evento de sesión para cada instancia paralelizada.

Existen varios problemas cuando estos complementos se utilizan junto con `ddtrace`. Por ejemplo, una sesión, un módulo o un paquete pueden pasar aunque fallen los tests individuales. Del mismo modo, todos los tests pueden pasar, pero el paquete, la sesión o el módulo pueden fallar. Esto ocurre porque estos complementos crean subprocesos de Worker y los tramos creados en el proceso principal pueden no reflejar los resultados de los procesos secundarios. Por esta razón, **no se admite el uso de `ddtrace` junto con `pytest-xdist` y `pytest-forked` por el momento.**

Cada Worker informa de los resultados de los tests a Datadog de forma independiente, por lo que los tests del mismo módulo que se ejecutan en diferentes procesos generan eventos de módulos o paquete separados.

El recuento global de eventos de tests (y su corrección) no se ve afectado. Los eventos de sesión individual, módulo o paquete pueden tener resultados incompatibles con otros eventos en la misma ejecución `pytest`.

### Solicitudes de tests

Los complementos que cambian el orden de ejecución de los tests (como [`pytest-randomly`][3]) pueden crear varios eventos de módulo o conjunto. La duración y los resultados de los eventos de módulo o conjunto también pueden ser incoherentes con los resultados informados por `pytest`.

El número total de eventos de test (y su corrección) no se ven afectados.


[1]: https://pypi.org/project/pytest-xdist/
[2]: https://pypi.org/project/pytest-forked/
[3]: https://pypi.org/project/pytest-randomly/

{{% /tab %}}

{{% tab "unittest" %}}

En algunos casos, si la ejecución de tu test `unittest` se realiza de forma paralela, esto puede romper la instrumentación y afectar a la optimización del test.

Datadog recomienda utilizar un máximo de un único proceso a la vez para no afectar a la optimización de los tests.

{{% /tab %}}

{{< /tabs >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/dd_libraries/python/
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/tracing/trace_collection/library_config/python/?tab=containers#configuration
