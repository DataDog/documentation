---
aliases:
- /es/continuous_integration/guides/rum_integration
- /es/continuous_integration/integrate_tests/browser_tests
- /es/continuous_integration/tests/browser_tests
description: Aprenda a usar CI Visibility y RUM para conectar sus resultados de pruebas
  con sesiones de navegador y reproducciones de sesión.
further_reading:
- link: /continuous_integration/tests
  tag: Documentación
  text: Aprenda sobre Test Optimization
- link: /real_user_monitoring/application_monitoring/browser
  tag: Documentación
  text: Obtenga información sobre RUM Browser Monitoring
title: Instrumente sus pruebas de navegador con RUM
---
## Descripción general {#overview}

Test Optimization se integra con [Real User Monitoring][2] de Datadog para proporcionarle las herramientas para un análisis profundo de sus pruebas de navegador.

### Compatibilidad {#compatibility}

Para habilitar la integración de RUM, asegúrese de que [Test Optimization][1] esté configurado para sus pruebas y que la aplicación que se está probando esté instrumentada usando [RUM][2].

La integración de RUM es compatible con pruebas de navegador basadas en Cypress, Playwright, WebdriverIO y Selenium.

#### Cypress {#cypress}

* `cypress` >= 6.7.0
* `dd-trace-js` >= 1.7.0
* `browser-sdk` >= 3.11.0

#### Selenium {#selenium}

* `selenium-js` >= 4.11.0, `dd-trace-js` >= 5.11.0 / >= 4.35.0
* `selenium-java` >= 3.141.59, `dd-trace-java` >= 1.34.0
* `selenium-dotnet` >= 3.0.0, `dd-trace-dotnet` >= 2.51.0
* `selenium-ruby` >= 4.0.0, `datadog-ci` >= 1.0.0.beta6
* `browser-sdk` >= 5.15.0

#### Playwright {#playwright}

* `playwright` >= 1.38.0
* `dd-trace-js` >= 5.46.0
* `browser-sdk` >= 5.15.0

#### WebdriverIO {#webdriverio}

* `webdriverio` >= 9.0.0 con el adaptador del framework Mocha o Jasmine
* `dd-trace-js` >= 5.125.0 en la línea de versiones v5 o >= 6.14.0 en la línea de versiones v6
* `browser-sdk` >= 5.15.0

La integración de RUM requiere una sesión de navegador WebDriver BiDi.

<div class="alert alert-info">
A partir de Browser SDK v5.0.0, habilite el <code>allowUntrustedEvents</code> parámetro de inicialización durante las pruebas para capturar los clics correctamente.
</div>

## Conecte las pruebas de navegador y RUM {#connect-browser-tests-and-rum}

Si utiliza Cypress, Playwright, WebdriverIO o Selenium para ejecutar sus pruebas de navegador y la aplicación que se está probando está instrumentada mediante [Real User Monitoring][2], los resultados de sus pruebas se vinculan automáticamente con las sesiones de navegador de RUM y las reproducciones de sesión generadas a partir de ellas.

Si una prueba finaliza antes de que su sesión de RUM se envíe, la sesión y la prueba pueden aparecer desvinculadas. Para darle a la sesión más tiempo para enviarse, establezca la variable de entorno `DD_CIVISIBILITY_RUM_FLUSH_WAIT_MILLIS` en un valor superior al predeterminado de 500 milisegundos.

Aparece una pestaña {{< ui >}}Browser Sessions{{< /ui >}} en el panel lateral de detalles de la prueba de Test Optimization.

{{< img src="ci/ci-browser-session-tab.png" alt="Pestaña de sesión de navegador en los detalles de la prueba" style="width:100%;">}}

La sesión de RUM tiene todos los datos que [RUM recopila normalmente][3] para que pueda depurar posibles problemas en sus pruebas de navegador, como errores inesperados.

{{< img src="ci/ci-browser-session-tab-errors.png" alt="Errores de la pestaña de sesión de navegador en los detalles de la prueba" style="width:100%;">}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/setup/
[2]: /es/real_user_monitoring/application_monitoring/browser/
[3]: /es/real_user_monitoring/application_monitoring/browser/data_collected/