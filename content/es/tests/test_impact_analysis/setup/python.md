---
aliases:
- /es/continuous_integration/intelligent_test_runner/python/
- /es/continuous_integration/intelligent_test_runner/setup/python/
- /es/intelligent_test_runner/setup/python
code_lang: python
code_lang_weight: 30
further_reading:
- link: /continuous_integration/tests
  tag: Documentación
  text: Exploración de los resultados de tests y del rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Test Impact Analysis para Python
type: lenguaje de código múltiple
---

## Compatibilidad

Test Impact Analysis sólo es compatible con las siguientes versiones y frameworks de test:

* `pytest>=7.2.0`
  * De `ddtrace>=2.1.0`.
  * De `Python>=3.7`.
  * Requiere `coverage>=5.5`.
  * Incompatible con `pytest-cov` (consulta [limitaciones conocidas](#known-limitations))
* `unittest`
  * De `ddtrace>=2.2.0`.
  * De `Python>=3.7`.
* `coverage`
  * Incompatible para la recopilación de cobertura (consulta [limitaciones conocidas](#known-limitations))

## Configuración

### Test Optimization (optimización de tests)

Antes de configurar Test Impact Analysis, configura [Test Optimization (optimización de tests) para Python][1]. Si vas a informar de los datos a través del Agent, utiliza la versión 6.40 y versiones posteriores o 7.40 y versiones posteriores.

{{% ci-itr-activation-instructions %}}

### Dependencias necesarias

Test Impact Analysis requiere el [paquete `coverage`][2].

Instala el paquete en tu entorno de test de CI especificándolo en el archivo de requisitos correspondiente, por ejemplo, o utilizando `pip`:

{{< code-block lang="shell" >}}
pip install coverage
{{< /code-block >}}

Consulta [limitaciones conocidas](#known-limitations) si ya estás utilizando el paquete `coverage` o un complemento como `pytest-cov`.

## Ejecución de tests con Test Impact Analysis activado

Test Impact Analysis se activa cuando se ejecutan tests con la integración de Datadog activa. Ejecuta tus tests con el siguiente comando:

{{< tabs >}}

{{% tab "Pytest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app pytest --ddtrace
{{< /code-block >}}

{{% /tab %}}

{{% tab "Unittest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app ddtrace-run python -m unittest
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

### Desactivación temporal de Test Impact Analysis

Test Impact Analysis puede desactivarse localmente estableciendo la variable de entorno `DD_CIVISIBILITY_ITR_ENABLED` en `false` o `0`.

`DD_CIVISIBILITY_ITR_ENABLED` (opcional)
: habilita las funciones de cobertura y omisión de tests de Test Impact Analysis<br />
**Por defecto**: `(true)`

Ejecuta el siguiente comando para desactivar Test Impact Analysis:

{{< tabs >}}

{{% tab "Pytest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app DD_CIVISIBILITY_ITR_ENABLED=false pytest --ddtrace
{{< /code-block >}}

{{% /tab %}}

{{% tab "Unittest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app DD_CIVISIBILITY_ITR_ENABLED=false ddtrace-run python -m unittest
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## Desactivación de la omisión de test específicos

Puedes anular el comportamiento de Test Impact Analysis y evitar que se omitan tests específicos. Estos tests se denominan tests no omitibles.

### ¿Por qué no se pueden omitir los tests?

Test Impact Analysis utiliza datos de cobertura del código para determinar si deben omitirse tests o no. En algunos casos, estos datos pueden no ser suficientes para tomar esta determinación.

Algunos ejemplos son:

* Tests que leen datos de archivos de texto
* Tests que interactúan con APIs ajenas al código que se está probando (como las API REST remotas).

Designar los tests como no omitibles garantiza que Test Impact Analysis los ejecute independientemente de los datos de cobertura.


{{< tabs >}}

{{% tab "Pytest" %}}

### Compatibilidad

En las siguientes versiones se admiten los tests no omitibles:

* `pytest`
  * De `ddtrace>=1.19.0`.

### Marcar tests como no omitibles

Puedes utilizar la [marca `skipif`][2] de [`pytest`][1] para evitar que Test Impact Analysis omita tests o módulos individuales. Especifica la `condition` como `False` y la `reason` como `"datadog_itr_unskippable"`.

#### Tests individuales

Los tests individuales pueden marcarse como no omitibles utilizando el decorador `@pytest.mark.skipif` de la siguiente manera:
```python
import pytest

@pytest.mark.skipif(False, reason="datadog_itr_unskippable")
def test_function():
    assert True
```
#### Módulos

Los módulos pueden omitirse utilizando la [variable global `pytestmark`][3] de la siguiente manera:
```python
import pytest

pytestmark = pytest.mark.skipif(False, reason="datadog_itr_unskippable")

def test_function():
    assert True
```

**Nota**: Esto no anula ninguna otra marca `skip`, o `skipif` que tenga una `condition` que evalúe en `True`.

[1]: https://pytest.org/
[2]: https://docs.pytest.org/en/latest/reference/reference.html#pytest-mark-skipif-ref
[3]: https://docs.pytest.org/en/latest/reference/reference.html#globalvar-pytestmark

{{% /tab %}}

{{% tab "Unittest" %}}

### Compatibilidad

En las siguientes versiones se admiten los tests no omitibles:

* `unittest`
  * De `ddtrace>=2.2.0`.

### Marcar tests como no omitibles en `unittest`

Puedes utilizar la [marca `skipif`][2] de [`unittest`][1] para evitar que Test Impact Analysis omita tests individuales. Especifica la `condition` como `False` y la `reason` como `"datadog_itr_unskippable"`.

#### Tests individuales

Los tests individuales pueden marcarse como no omitibles utilizando el decorador `@unittest.skipif` de la siguiente manera:
```python
import unittest

class MyTestCase(unittest.TestCase):
  @unittest.skipIf(False, reason="datadog_itr_unskippable")
  def test_function(self):
      assert True
```


El uso de `@unittest.skipif` no anula ninguna otra marca `skip`, ni las marcas `skipIf` que tengan una `condition` que evalúe en `True`.

[1]: https://docs.python.org/3/library/unittest.html
[2]: https://docs.python.org/3/library/unittest.html#unittest.skipIf

{{% /tab %}}

{{< /tabs >}}

## Limitaciones conocidas

### Recopilación de cobertura de código

#### Interacción con las herramientas de cobertura

Los datos de cobertura pueden aparecer incompletos cuando Test Impact Analysis está activado. Las líneas de código que normalmente estarían cubiertas por los tests no lo están cuando estos tests se omiten.

#### Interacción con el paquete de cobertura

Test Impact Analysis utiliza la API del paquete [`coverage`][2] para recopilar la cobertura del código. Los datos de `coverage run` o de complementos como `pytest-cov` están incompletos debido a que `ddtrace` utiliza la clase `Coverage`.

Algunas condiciones race pueden provocar excepciones al utilizar complementos de `pytest` como `pytest-xdist` que cambian el orden de ejecución de los tests o introducen paralelización.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/tests/python
[2]: https://pypi.org/project/coverage/