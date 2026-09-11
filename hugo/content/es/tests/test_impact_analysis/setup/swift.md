---
aliases:
- /es/continuous_integration/intelligent_test_runner/swift/
- /es/continuous_integration/intelligent_test_runner/setup/swift/
- /es/intelligent_test_runner/setup/swift
code_lang: swift
code_lang_weight: 40
further_reading:
- link: /tests
  tag: Documentación
  text: Exploración de los resultados de tests y del rendimiento
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de Test Optimization
title: Test Impact Analysis para Swift
type: lenguaje de código múltiple
---

## Compatibilidad

Test Impact Analysis sólo es compatible con [`dd-sdk-swift-testing`][1] en las versiones `2.2.0` o posteriores.

## Configuración

### Optimización de tests

Antes de configurar Test Impact Analysis, configura [Test Optimization para Swift][2]. La opción de **cobertura de código** también debe estar activada en la configuración de test de tu esquema o plan de test, o `--enable-code-coverage` debe añadirse a tu comando de test de Swift (si utilizas un destino de SPM).

Si comunicas los datos a través del Agent, utiliza v6.40 y posteriores o v7.40 y posteriores.

{{% ci-itr-activation-instructions %}}

## Ejecutar tests con Test Impact Analysis activado

Una vez finalizada la configuración, ejecuta los tests como lo haces normalmente.

## Desactivación de la omisión de tests específicos

Puedes anular el comportamiento de Test Impact Analysis y evitar que se omitan tests específicos. Estos tests se denominan tests no omitibles.

### ¿Por qué no se pueden saltar los tests?

Test Impact Analysis utiliza datos de cobertura del código para determinar si deben omitirse tests o no. En algunos casos, estos datos pueden no ser suficientes para tomar esta determinación.

Algunos ejemplos son:

* Tests que leen datos de archivos de texto
* Tests que interactúan con APIs ajenas al código que se está probando (como las APIs de REST remotas).
* Tests que ejecutan procesos externos
* Tests que dependen del estado global compartido (por ejemplo, cachés creadas por un test diferente o proceso)
* Tests que utilizan procesos ancllados (la cobertura de código por test sólo recopila la cobertura del proceso principal)
* Tests de integración que utilizan capybara o selenium-webdriver

Designar los tests como no omitibles garantiza que Test Impact Analysis las ejecute independientemente de los datos de cobertura.

### Marcar tests como no omitibles

```swift
import XCTest
import DatadogSDKTesting

class SomeTestCase: XCTestCase {
  func testMethod() {}
}

extension SomeTestCase: ExtendableTaggedType {
  static func extendableTypeTags() -> ExtendableTypeTags {
    withTagger { tagger in
      // Mark all class unskippable
      tagger.set(type: .itrSkippable, to: false)
      // Set only one method unskippable
      tagger.set(instance: .itrSkippable, to: false, method: #selector(testMethod))
    }
  }
}
```

### Desactivación temporal de Test Impact Analysis

Test Impact Analysis puede desactivarse localmente estableciendo la variablede entorno `DD_CIVISIBILITY_ITR_ENABLED` en `false` o `0`.

`DD_CIVISIBILITY_ITR_ENABLED` (opcional)
: habilita las funciones de cobertura y omisión de tests de Test Impact Analysis<br />
**Por defecto**: `(true)`

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing
[2]: /es/tests/setup/swift