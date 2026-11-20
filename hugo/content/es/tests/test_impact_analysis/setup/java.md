---
aliases:
- /es/continuous_integration/intelligent_test_runner/java/
- /es/continuous_integration/intelligent_test_runner/setup/java/
- /es/intelligent_test_runner/setup/java
code_lang: java
code_lang_weight: 10
further_reading:
- link: /continuous_integration/tests
  tag: Documentación
  text: Exploración de los resultados de tests y del rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Test Impact Analysis para Java
type: lenguaje de código múltiple
---

## Compatibilidad

Test Impact Analysis es compatible en `dd-java-agent >= 1.27.0`.

Se admiten los siguientes marcos de tests:
- JUnit >= 4.10 y >= 5.3
- TestNG >= 6.4
- Spock >= 2.0
- Cucumber >= 5.4.0
- Karate >= 1.0.0
- Scalatest >= 3.0.8

## Configuración

### Test Optimization

Antes de configurar Test Impact Analysis, configura [Test Optimization para Java][1]. Si informas de los datos a través del Agent, utiliza v6.40 y posteriores o v7.40 y posteriores.

{{% ci-itr-activation-instructions %}}

## Ejecutar tests con Test Impact Analysis activado

Una vez finalizada la configuración, ejecuta los tests como lo haces normalmente:

{{< tabs >}}
{{% tab "Gradle" %}}

{{< code-block lang="shell" >}}
DD_CIVISIBILITY_ENABLED=true \
DD_ENV=ci \
DD_SERVICE=my-java-app \
GRADLE_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar \
./gradlew clean test
{{< /code-block >}}

{{% /tab %}}
{{% tab "Maven" %}}

{{< code-block lang="shell" >}}
DD_CIVISIBILITY_ENABLED=true \
DD_ENV=ci \
DD_SERVICE=my-java-app \
MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar \
mvn clean verify
{{< /code-block >}}

{{% /tab %}}
{{% tab "Other" %}}

{{< code-block lang="shell" >}}
DD_CIVISIBILITY_ENABLED=true \
DD_ENV=ci \
DD_SERVICE=my-java-app \
JAVA_TOOL_OPTIONS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar \
// run your tests
{{< /code-block >}}

{{% /tab %}}{{< /tabs >}}

## Desactivar la omisión de tests específicos

Puedes anular el comportamiento de Test Impact Analysis y evitar que se omitan tests específicos. Estos tests se denominan tests no omitibles.

### ¿Por qué hacer que los tests sean no omitibles?

Test Impact Analysis utiliza datos de cobertura del código para determinar si deben omitirse tests o no. En algunos casos, estos datos pueden no ser suficientes para tomar esta determinación.

Algunos ejemplos son:

- Tests que leen datos de archivos de texto
- Tests que interactúan con API ajenas al código que se está probando (como las API REST remotas).
- Designar los tests como no omitibles garantiza que Test Impact Analysis los ejecute independientemente de los datos de cobertura.

### Compatibilidad

Los tests no omitibles son compatibles con las siguientes versiones y marcos de tests:

- JUnit >= 4.10 y >= 5.3
- TestNG >= 6.4
- Spock >= 2.2
- Cucumber >= 5.4.0
- Scalatest >= 3.0.8

### Hacer que los tests sean no omitible

{{< tabs >}}
{{% tab "JUnit 5" %}}

#### Caso de test individual

Añade una JUnit `Tag` con el valor `datadog_itr_unskippable` a tu caso de test para marcarlo como no omitible.

```java
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Tags;
import org.junit.jupiter.api.Test;

public class MyTestSuite {

  @Test
  @Tags({@Tag("datadog_itr_unskippable")})
  public void myTest() {
    // ...
  }
}
```

#### Conjunto de tests

Añade una JUnit `Tag` con el valor `datadog_itr_unskippable` a tu conjunto de tests para marcarlo como no omitible.

Si un conjunto está marcado como no omitible, ninguno de los casos de test de ese conjunto puede ser omitido por Test Impact Analysis.

```java
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Tags;
import org.junit.jupiter.api.Test;

@Tags({@Tag("datadog_itr_unskippable")})
public class MyTestSuite {

  @Test
  public void myTest() {
    // ...
  }
}
```

{{% /tab %}}
{{% tab "JUnit 4" %}}

#### Caso de test individual

Añade una JUnit `Category` con el valor `datadog_itr_unskippable` a tu caso de test para marcarlo como no omitible.
No es necesario crear el `datadog_itr_unskippable` para cada caso de test o conjunto de tests, y una categoría es suficiente para todo el proyecto.

```java
import org.junit.Test;
import org.junit.experimental.categories.Category;

public class MyTestSuite {

  @Category(datadog_itr_unskippable.class)
  @Test
  public void myTest() {
    // ...
  }

  public interface datadog_itr_unskippable {}
}
```

#### Conjunto de tests

Añade una JUnit `Tag` con el valor `datadog_itr_unskippable` a tu caso de test para marcarlo como no omitible.
No es necesario crear el `datadog_itr_unskippable` para cada caso de test o conjunto de tests, y una categoría es suficiente para todo el proyecto.

Si un conjunto está marcado como no omitible, ninguno de los casos de test de ese conjunto puede ser omitido por Test Impact Analysis.

```java
import org.junit.Test;
import org.junit.experimental.categories.Category;

@Category(MyTestSuite.datadog_itr_unskippable.class)
public class MyTestSuite {

  @Test
  public void myTest() {
    // ...
  }

  public interface datadog_itr_unskippable {}
}
```

{{% /tab %}}
{{% tab "TestNG" %}}

#### Caso de test individual

Añade un grupo con el valor `datadog_itr_unskippable` a tu caso de test para marcarlo como no omitible.

```java
import org.testng.annotations.Test;

public class MyTestSuite {

  @Test(groups = "datadog_itr_unskippable")
  public void myTest() {
    // ...
  }
}
```

#### Conjunto de tests

Añade un grupo con el valor `datadog_itr_unskippable` a tu conjunto de tests para marcarlo como no omitible.

Si un conjunto está marcado como no omitible, ninguno de los casos de test de ese conjunto puede ser omitido por Test Impact Analysis.

```java
import org.testng.annotations.Test;

@Test(groups = "datadog_itr_unskippable")
public class MyTestSuite {

  @Test
  public void myTest() {
    // ...
  }
}
```

{{% /tab %}}
{{% tab "Spock" %}}

#### Caso de test individual

Añade un `spock.lang.Tag` con el valor `datadog_itr_unskippable` a tu caso de test para marcarlo como no omitible.

```java
import spock.lang.Specification
import spock.lang.Tag

class MyTestSuite extends Specification {

  @Tag("datadog_itr_unskippable")
  def myTest() {
    // ...
  }
}
```

#### Conjunto de tests

Añade un `spock.lang.Tag` con el valor `datadog_itr_unskippable` a tu conjunto de tests para marcarlo como no omitible.

Si un conjunto está marcado como no omitible, ninguno de los casos de test de ese conjunto puede ser omitido por Test Impact Analysis.

```java
import spock.lang.Specification
import spock.lang.Tag

@Tag("datadog_itr_unskippable")
class MyTestSuite extends Specification {

  def myTest() {
    // ...
  }
}
```

{{% /tab %}}
{{% tab "Pepino" %}}

#### Escenario individual

Añade una etiqueta (tag) `datadog_itr_unskippable` a tu escenario Gherkin para marcarlo como no omitible.

```gherkin
Feature: My Feature

  @datadog_itr_unskippable
  Scenario: My Scenario
    # ...
```

#### Función

Añade una etiqueta `datadog_itr_unskippable` a tu función Gherkin para marcarla como no omitible.

Si una función está marcada como no omitible, ninguno de los escenarios de esa función puede ser omitido por Test Impact Analysis.

```gherkin
@datadog_itr_unskippable
Feature: My Feature

  Scenario: My Scenario
    # ...
```

{{% /tab %}}
{{% tab "ScalaTest" %}}

Crea una `Tag` con el valor `datadog_itr_unskippable` y etiqueta tu caso de test con ella:

```scala
import org.scalatest.Tag
import org.scalatest.flatspec.AnyFlatSpec

object ItrUnskippableTag extends Tag("datadog_itr_unskippable")

class MyTestSuite extends AnyFlatSpec {
  "myTest" should "assert something" taggedAs ItrUnskippableTag in {
    // ...
  }
}
```

{{% /tab %}}{{< /tabs >}}


## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/tests/java
[2]: https://www.jacoco.org/jacoco/