---
aliases:
- /es/continuous_integration/guides/rum_swift_integration
- /es/continuous_integration/integrate_tests/swift_tests
- /es/continuous_integration/tests/swift_tests
description: Aprende a utilizar Test Optimization (optimización de tests) y RUM para
  conectar los resultados de tus tests de Swift con sesiones de aplicaciones y repeticiones
  de sesiones.
further_reading:
- link: /tests
  tag: Documentación
  text: Más información sobre Test Optimization (optimización de tests)
- link: /real_user_monitoring/ios
  tag: Documentación
  text: Más información sobre la monitorización de iOS y tvOS de RUM
title: Instrumentación de tests Swift con RUM
---

## Información general

Asegúrate de que [Test Optimization][3] ya está configurado para Swift.

### Compatibilidad

La integración de Test Optimization y RUM está disponible para estas versiones de `dd-sdk-swift-testing` y `dd-sdk-ios`:

* `dd-sdk-swift-testing` >= 2.0.0
* `dd-sdk-ios` >= 1.10.0

## Conectar los tests de Swift y RUM

Si vinculas `dd-sdk-swift-testing` para tu paquete de tests de interfaz de usuario y la aplicación que se está probando se instrumenta utilizando [Real User Monitoring][1], los resultados de tus tests y tus sesiones de aplicación RUM generadas y las repeticiones de sesión se vinculan automáticamente.

Aparecerá una pestaña de **RUM Sessions** (Sesiones de RUM) en el panel lateral de detalles del test de Test Optimization.

{{< img src="ci/ci-swift-rum-session-tab.png" alt="Pestaña de sesión de navegador en Detalles de test" style="width:100%;">}}

La sesión de RUM tiene todos los datos que [RUM recopila normalmente][2] para que puedas depurar posibles problemas en tus tests de iOS, como el nombre de usuario o errores inesperados.

{{< img src="ci/ci-swift-rum-session-tab-errors.png" alt="Errores en la pestaña de la Sesión de navegador en los Detalles de test" style="width:100%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/ios/
[2]: /es/real_user_monitoring/ios/data_collected/
[3]: /es/tests/setup/swift/