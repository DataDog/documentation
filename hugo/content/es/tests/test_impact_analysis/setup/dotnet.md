---
aliases:
- /es/continuous_integration/intelligent_test_runner/dotnet/
- /es/continuous_integration/intelligent_test_runner/setup/dotnet/
- /es/intelligent_test_runner/setup/dotnet
code_lang: dotnet
code_lang_weight: 0
further_reading:
- link: /continuous_integration/tests
  tag: Documentación
  text: Exploración de los resultados de tests y del rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Test Impact Analysis para .NET
type: lenguaje de código múltiple
---

## Compatibilidad

Test Impact Analysis sólo es compatible con `dd-trace>= 2.22.0` (ejecuta `dd-trace --version` para obtener la versión de la herramienta).

## Configuración

### Optimización de tests

Antes de configurar Test Impact Analysis, configura [Optimización de tests para .NET][1]. Si vas a informar de los datos a través del Agent, utiliza la versión 6.40 y versiones posteriores o 7.40 y versiones posteriores.

{{% ci-itr-activation-instructions %}}

## Ejecutar tests con Test Impact Analysis activado

Una vez completada la configuración, ejecuta tus tests como lo haces normalmente utilizando [dotnet test][2] o [VSTest.Console.exe][3]:

{{< tabs >}}

{{% tab "dotnet test" %}}


{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}


{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## Desactivar la omisión de tests específicos

Puedes anular el comportamiento de Test Impact Analysis y evitar que se omitan tests específicos. Estos tests se denominan tests no omitibles.

### ¿Por qué no se pueden omitir los tests?

Test Impact Analysis utiliza datos de cobertura de código para determinar si deben omitirse tests o no. En algunos casos, estos datos pueden no ser suficientes para tomar esta determinación.

Algunos ejemplos son:

- Tests que leen datos de archivos de texto.
- Tests que interactúan con APIs ajenas al código que se está testeando (como las APIs REST remotas).
- Designar los tests como no omitibles garantiza que Test Impact Analysis los ejecute independientemente de los datos de cobertura.

### Marcar tests como no omitibles

{{< tabs >}}
{{% tab "XUnit" %}}

#### Caso de test individual

Añade un `TraitAttribute` de XUnit con la clave `datadog_itr_unskippable` a tu caso de test para marcarlo como no omitible.

```csharp
using Xunit;
using Xunit.Abstractions;

public class MyTestSuite
{
  [Fact]
  [Trait("datadog_itr_unskippable", null)]
  public void MyTest()
  {
    // ...
  }
}
```

#### Conjunto de tests

Añade un `TraitAttribute` de XUnit con la clave `datadog_itr_unskippable` a tu conjunto de test para marcarlo como no omitible.

Si un conjunto está marcado como no omitible, ninguno de los casos de test de ese conjunto puede ser omitido por Test Impact Analysis.

```csharp
using Xunit;
using Xunit.Abstractions;

[Trait("datadog_itr_unskippable", null)]
public class MyTestSuite
{
  [Fact]
  public void MyTest()
  {
    // ...
  }
}
```

{{% /tab %}}
{{% tab "NUnit" %}}

#### Caso de test individual

Añade un `PropertyAttribute` de NUnit con la clave `datadog_itr_unskippable` y un valor no nulo (por ejemplo, string.Empty) a tu caso de test para marcarlo como no omitible.

```csharp
using NUnit.Framework;

public class MyTestSuite
{
  [Test]
  [Property("datadog_itr_unskippable", "")]
  public void MyTest()
  {
    // ...
  }
}
```

#### Conjunto de tests

Añade un `PropertyAttribute` de NUnit con la clave `datadog_itr_unskippable` y un valor no nulo (por ejemplo, string.Empty) a tu conjunto de test para marcarlo como no omitible.

Si un conjunto está marcado como no omitible, ninguno de los casos de test de ese conjunto puede ser omitido por Test Impact Analysis.

```csharp
using NUnit.Framework;

[Property("datadog_itr_unskippable", "")]
public class MyTestSuite
{
  [Test]
  public void MyTest()
  {
    // ...
  }
}
```

{{% /tab %}}
{{% tab "MsTestV2" %}}

#### Caso de test individual

Añade un `TestPropertyAttribute` de MsTestV2 con la clave `datadog_itr_unskippable` a tu caso de test para marcarlo como no omitible.

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class MyTestSuite
{
  [TestMethod]
  [TestProperty("datadog_itr_unskippable", null)]
  public void MyTest()
  {
    // ...
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/tests/dotnet
[2]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test
[3]: https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options