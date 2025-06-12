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
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Tests Python
type: lenguaje de código múltiple
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">En este momento, CI Visibility no está disponible en el sitio ({{< region-param key="dd_site_name" >}}) seleccionado.</div>
{{< /site-region >}}

## Compatibilidad

Lenguajes compatibles:

| Lenguaje | Versión |
|---|---|
| Python 2 | v2.7 o anterior |
| Python 3 | v3.6 o anterior |

Marcos para tests compatibles:

| Marco para tests | Versión |
|---|---|
| `pytest` | v3.0.0 o anterior |
| `pytest-benchmark` | v3.1.0 o anterior |
| `unittest` | v3.7 o anterior |

## Configuración del método de notificación

Para informar de los resultados de los tests a Datadog, debes configurar la biblioteca Python de Datadog:

{{< tabs >}}
{{% tab "Acciones Github" %}}
Puedes utilizar la [acción Github para la visibilidad de tests][1] exclusiva, para habilitar la visibilidad de los tests.
Si lo haces, puedes omitir el resto de los pasos de configuración que se indican a continuación.

[1]: https://github.com/marketplace/actions/configure-datadog-test-visibility
{{% /tab %}}

{{% tab "Jenkins" %}}
Puedes utilizar la [configuración basada en la interfaz de usuario][1], para habilitar la visibilidad de los tests para tus tareas y pipelines.
Si lo haces, puedes omitir el resto de los pasos de configuración que se indican a continuación.

[1]: /es/continuous_integration/pipelines/jenkins/#enable-with-the-jenkins-configuration-ui-1
{{% /tab %}}


{{% tab "Otro proveedor CI en la nube" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "Proveedor CI on-premises" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## Instalación del rastreador Python 

Instala el rastreador Python ejecutando:

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

Para obtener más información, consulta la [documentación de instalación del rastreador Python][1].

## Instrumentación de tus tests

{{< tabs >}}
{{% tab "pytest" %}}

Para habilitar la instrumentación de tests `pytest`, añade la opción `--ddtrace` al ejecutar `pytest`, especificando el nombre del servicio o de la biblioteca a los que se realizan tests, en la variable de entorno `DD_SERVICE`. y el entorno en el que se ejecutan los tests (por ejemplo, `local`, cuando ejecutas tests en una estación de desarrollador, o `ci`, cuando los ejecutas en un proveedor CI) en la variable de entorno `DD_ENV`:

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace
{{< /code-block >}}

Si también quieres activar el resto de las integraciones APM para tener más información en tu gráfico de llamas, añade la opción `--ddtrace-patch-all`:

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

### Añadir etiquetas (tags) personalizadas a los tests

Para añadir etiquetas personalizadas a tus tests, define `ddspan` como argumento en tu test:

```python
from ddtrace import tracer

# Define `ddspan` como argumento en tu test
def test_simple_case(ddspan):
    # Configura tus etiquetas
    ddspan.set_tag("test_owner", "my_team")
    # el test continúa normalmente
    # ...
```

Para crear filtros o campos `group by` para estas etiquetas, primero debes crear facetas. Para obtener más información sobre cómo añadir etiquetas, consulta la sección [Añadir etiquetas][1] en la documentación de instrumentación personalizada de Python.

### Añadir medidas personalizadas a los tests

Además de las etiquetas, también puedes añadir medidas personalizadas a tus tests utilizando el tramo que esté activo en ese momento:

```python
from ddtrace import tracer

# Define `ddspan` como argumento en tu test
def test_simple_case(ddspan):
    # Configura tus etiquetas
    ddspan.set_tag("memory_allocations", 16)
    # el test continúa normalmente
    # ...
```
Para obtener más información sobre las medidas personalizadas, consulta la [guía para añadir medidas personalizadas][2].

[1]: /es/tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[2]: /es/tests/guides/add_custom_measures/?tab=python
{{% /tab %}}

{{% tab "pytest-benchmark" %}}

Para instrumentar tus tests de referencia con `pytest-benchmark`, ejecuta tus tests de referencia con la opción `--ddtrace` al ejecutar `pytest` y Datadog detecta métricas de `pytest-benchmark` automáticamente:

```python
def square_value(value):
    return value * value


def test_square_value(benchmark):
    result = benchmark(square_value, 5)
    assert result == 25
```

{{% /tab %}}

{{% tab "unittest" %}}

Para habilitar la instrumentación de los tests `unittest`, ejecuta tus tests añadiendo `ddtrace-run` al principio de tu comando `unittest`.

Asegúrate de especificar el nombre del servicio o de la biblioteca a los que se realizan tests en la variable de entorno `DD_SERVICE`.
Además, puedes definir el entorno donde se ejecutan los tests en la variable de entorno `DD_ENV`:

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci ddtrace-run python -m unittest
{{< /code-block >}}

Alternativamente, si quieres habilitar la instrumentación `unittest` manualmente, utiliza `patch()` para habilitar la integración:

{{< code-block lang="python" >}}
from ddtrace import patch
import unittest
patch(unittest=True)

class MyTest(unittest.TestCase):
def test_will_pass(self):
assert True
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## Parámetros de configuración

La siguiente es una lista de los parámetros de configuración más importantes que puedes utilizar con el rastreador, ya sea mediante código o mediante variables de entorno:

`DD_SERVICE`
: Nombre del servicio o de la biblioteca a los que se realizan tests.<br/>
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

## Limitaciones conocidas

{{< tabs >}}

{{% tab "pytest" %}}

Los complementos para `pytest` que alteran la ejecución de los tests pueden provocar comportamientos inesperados.

### Paralelización

Los complementos que introducen una paralelización en `pytest` (como [`pytest-xdist`][1] o [`pytest-forked`][2]) crean un evento de sesión para cada instancia paralelizada. Se pueden crear varios módulos o conjuntos de eventos, si los tests del mismo paquete o módulo se ejecutan en diferentes procesos.

El número total de eventos de test (y su corrección) no se ven afectados. Los eventos de sesión individual, módulo o conjunto pueden tener resultados incoherentes con otros eventos de la misma ejecución de `pytest`.

### Solicitudes de tests

Los complementos que cambian el orden de ejecución de los tests (como [`pytest-randomly`][3]) pueden crear varios eventos de módulo o conjunto. La duración y los resultados de los eventos de módulo o conjunto también pueden ser incoherentes con los resultados informados por `pytest`.

El número total de eventos de test (y su corrección) no se ven afectados.


[1]: https://pypi.org/project/pytest-xdist/
[2]: https://pypi.org/project/pytest-forked/
[3]: https://pypi.org/project/pytest-randomly/

{{% /tab %}}

{{% tab "unittest" %}}

En algunos casos, si la ejecución de tu test `unittest` se realiza de forma paralela, esto puede romper la instrumentación y afectar a la visibilidad de los tests.

Datadog recomienda utilizar un máximo de un proceso a la vez para no afectar a la visibilidad de los tests.

{{% /tab %}}

{{< /tabs >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/dd_libraries/python/
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/tracing/trace_collection/library_config/python/?tab=containers#configuration