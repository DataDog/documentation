---
aliases:
- /es/intelligent_test_runner/setup/ruby
code_lang: ruby
code_lang_weight: 20
further_reading:
- link: /tests
  tag: Documentación
  text: Exploración de los resultados de tests y del rendimiento
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de Test Optimization
title: Test Impact Analysis para Ruby
type: lenguaje de código múltiple
---

## Compatibilidad

Test Impact Analysis solo es compatible con las siguientes versiones y marcos de test:

* `datadog-ci >= 1.0`
* `Ruby >= 2.7`
  * JRuby no es compatible.
* `rspec >= 3.0.0`
* `minitest >= 5.0.0`
* `cucumber >= 3.0.0`

## Configuración

### Optimización de tests

Antes de configurar Test Impact Analysis, configura [Test Optimization para Ruby][1]. Si informas datos a través del Agent, utiliza v6.40 y posteriores o v7.40 y posteriores.

{{% ci-itr-activation-instructions %}}

## Ejecutar tests con Test Impact Analysis activado

Una vez finalizada la configuración, ejecuta los tests como lo haces normalmente.

## Desactivación de la omisión de tests específicos

Puedes anular el comportamiento de Test Impact Analysis y evitar que se omitan tests específicos. Estos tests se denominan tests no omitibles.

### ¿Por qué no se pueden omitir los tests?

Test Impact Analysis utiliza datos de cobertura de código para determinar si deben omitirse tests o no. En algunos casos, estos datos pueden no ser suficientes para tomar esta determinación.

Algunos ejemplos son:

* Tests que leen datos de archivos de texto
* Tests que interactúan con API ajenas al código que se está probando (como las API REST remotas).
* Tests que ejecutan procesos externos
* Tests que dependen del estado global compartido (por ejemplo, cachés creadas por un test diferente o proceso)
* Tests que utilizan procesos bifurcados (la cobertura de código por test solo recopila la cobertura del proceso principal)
* Tests de integración que utilizan capybara o selenium-webdriver

Designar los tests como no omitibles garantiza que Test Impact Analysis los ejecute independientemente de los datos de cobertura.

### Marcar tests como no omitibles

{{< tabs >}}
{{% tab "RSpec" %}}
Para garantizar que no se omitan las pruebas RSpec de un bloque específico, añada la clave de metadatos `datadog_itr_unskippable` con el valor `true` a cualquier bloque `describe`, `context` o `it`. Esto marca todas las pruebas de ese bloque como no saltables.

```ruby
# mark the whole file as unskippable
RSpec.describe MyClass, datadog_itr_unskippable: true do
  describe "#my_method" do
    context "when called without arguments" do
      it "works" do
      end
    end
  end
end

# mark one test as unskippable
RSpec.describe MyClass do
  describe "#my_method" do
    context "when called without arguments" do
      it "works", datadog_itr_unskippable: true do
      end
    end
  end
end

# mark specific block as unskippable
RSpec.describe MyClass do
  describe "#my_method", datadog_itr_unskippable: true do
    context "when called without arguments" do
      it "works" do
      end
    end
  end
end
```

{{% /tab %}}
{{% tab "Cucumber" %}}
Para marcar todo un archivo de características como no saltable en Cucumber, utilice `@datadog_itr_unskippable` etiquetar . Esto evita que Test Impact Analysis omita cualquiera de los escenarios definidos en ese archivo de características.

Para que solo ciertos escenarios no se puedan omitir, aplica esta etiqueta (tag) directamente al escenario deseado.

```ruby
@datadog_itr_unskippable
Feature: Unskippable feature
  Scenario: Say greetings
    When the greeter says greetings
    Then I should have heard "greetings"

Feature: An unskippable scenario

  @datadog_itr_unskippable
  Scenario: Unskippable scenario
    When the ITR wants to skip this scenario
    Then it will never be skipped

  Scenario: Skippable scenario
    When the ITR wants to skip this scenario
    Then it will be skipped
```

{{% /tab %}}
{{% tab "Minitest" %}}
Para hacer que toda una subclase de Minitest sea imposible de saltar, utilice el método `datadog_itr_unskippable`. Si desea marcar pruebas específicas dentro de la subclase como no saltables, proporcione los nombres de estos métodos de prueba como argumentos a la llamada al método `datadog_itr_unskippable`.

```ruby
# mark the whole class unskippable
class MyTest < Minitest::Test
  datadog_itr_unskippable

  def test_my_method
  end
end

# here only test1 and test2 are unskippab;e
class MyTest < Minitest::Test
  datadog_itr_unskippable "test1", "test2"

  def test1
  end

  def test2
  end

  def test3
  end
end
```

{{% /tab %}}
{{< /tabs >}}

### Desactivación temporal de Test Impact Analysis

Test Impact Analysis puede desactivarse localmente configurando la variable de entorno `DD_CIVISIBILITY_ITR_ENABLED` como `false` o `0`.

`DD_CIVISIBILITY_ITR_ENABLED` (opcional)
: Habilita las funciones de cobertura y omisión de tests de Test Impact Analysis<br />
**Por defecto**: `(true)`

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/setup/ruby