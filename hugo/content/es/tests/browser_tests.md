---
aliases:
- /es/continuous_integration/guides/rum_integration
- /es/continuous_integration/integrate_tests/browser_tests
- /es/continuous_integration/tests/browser_tests
description: Aprende a utilizar CI Visibility y RUM para conectar los resultados de
  tus tests con sesiones de navegador y repeticiones de sesión.
further_reading:
- link: /continuous_integration/tests
  tag: Documentación
  text: Más información sobre Test Optimization
- link: /real_user_monitoring/browser
  tag: Documentación
  text: Más información sobre la monitorización de navegador de RUM
title: Instrumentar tus tests de navegador con RUM
---

## Información general

Test Optimization se integra con Datadog [Real User Monitoring][2] para proporcionarte las herramientas para un análisis profundo de tus tests de navegador.

### Compatibilidad

Para habilitar la integración de RUM, asegúrate de que [Test Optimization][1] está configurado para tus tests y que la aplicación que se está testeando está instrumentada con [RUM][2].

La integración de RUM es compatible con los tests de navegador de Cypress y los tests de navegador de Selenium.

#### Cypress

* `cypress` >= 6.7.0
* `dd-trace-js` >= 1.7.0
* `browser-sdk` >= 3.11.0

#### Selenium

* `selenium-js` >= 4.11.0, `dd-trace-js` >= 5.11.0 / >= 4.35.0
* `selenium-java` >= 3.141.59, `dd-trace-java` >= 1.34.0
* `selenium-dotnet` >= 3.0.0, `dd-trace-dotnet` >= 2.51.0
* `selenium-ruby` >= 4.0.0, `datadog-ci` >= 1.0.0.beta6
* `browser-sdk` >= 5.15.0

#### Playwright

* `playwright` >= 1.38.0
* `dd-trace-js` >= 5.46.0
* `browser-sdk` >= 5.15.0

<blockquote class="alert alert-info">
Desde el SDK de navegador v5.0.0, activa el parámetro de inicialización `allowUntrustedEvents` durante los tests para capturar correctamente los clics.
</blockquote>

## Conectar tests de navegador y RUM

Si utilizas Cypress, Selenium o Playwright para ejecutar tus tests de navegador y la aplicación que se está testeando está instrumentada mediante [Real User Monitoring][2], tus resultados de test y sus sesiones de navegador de RUM generadas y las repeticiones de sesión se vinculan automáticamente.

En el panel lateral de detalles del test en Test Optimization aparece una pestaña **Browser Sessions** (Sesiones de navegador).

{{< img src="ci/ci-browser-session-tab.png" alt="Pestaña de sesión de navegador en los detalles de test" style="width:100%;">}}

La sesión de RUM tiene todos los datos que [RUM normalmente recopila][3] para que puedas depurar posibles problemas en tus tests de navegador, como errores inesperados.

{{< img src="ci/ci-browser-session-tab-errors.png" alt="Errores de pestaña de sesión de navegador en los detalles del test" style="width:100%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/setup/
[2]: /es/real_user_monitoring/browser/
[3]: /es/real_user_monitoring/browser/data_collected/