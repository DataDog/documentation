---
aliases:
- /es/developers/ide_integrations/vscode/
description: Aprende a ejecutar tests Synthetic en entornos locales directamente en
  VS Code.
further_reading:
- link: /getting_started/synthetics/
  tag: Documentación
  text: Empezando con Synthetic Monitoring
- link: /continuous_testing/
  tag: Documentación
  text: Más información sobre los tests continuos
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Más información sobre la integración del código fuente.
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: Blog
  text: Reducir el cambio de contexto y solucionar problemas con plugins de entorno
    de desarrollo integrado de Datadog
is_beta: true
title: Extensión de Datadog para Visual Studio Code
---

## Información general

La extensión de Datadog para Visual Studio Code (VS Code) se integra con Datadog para acelerar tu desarrollo.

{{< img src="/developers/ide_plugins/vscode/datadog-vscode.png" alt="La extensión de Datadog para VS Code" style="width:100%;" >}}

Incluye varias funciones:

- [**Información del código**](#code-insights) para mantenerte informado sobre

  - Problemas de [Rastreo de errores][10]
  - Informes de [Application Vulnerability Management][11]
  - [Flaky Test][12] detectadas por CI Visibility

- [**Tests Synthetic**](#synthetic-tests) para asegurar la calidad durante el desarrollo permitiéndote ejecutar las tests Synthetic existentes contra servidores locales.


- [Ver en código VS**](#view-in-vs-code) para pasar directamente de tus referencias de archivo en la plataforma de Datadog a tus archivos fuente.

- [**Navegación de logs**](#logs-navigation) para permitirte buscar logs desde tu código.

- [**Code Delta**](#code-delta) para asignar con mayor precisión los datos de observabilidad a tus archivos en VS Code.

- [Análisis estático**](#static-analysis) para detectar y solucionar problemas incluso antes de confirmar los cambios.

## Requisitos

- **Una cuenta de Datadog**: la extensión requiere una cuenta de Datadog (excepto cuando se utilizan las funciones de [Análisis estático][14]). Si eres nuevo en Datadog, visita el [sitio web de Datadog][2] para obtener más información sobre las herramientas de observabilidad de Datadog y regístrate para una prueba gratuita.

- **VS Code Git**: la extensión funciona mejor cuando la integración de VS Code Git está habilitada. Puedes asegurarte de que la integración está habilitada al comprobar el ajuste `git.enabled`.

## Configuración

Instala la [extensión de Datadog][6] desde Visual Studio Marketplace.

## Información del código

El árbol **Code Insights** (Información del código) muestra información generada por la plataforma de Datadog que es relevante para tu código base. Los datos se agrupan en tres categorías: rendimiento, fiabilidad y seguridad.

{{< img src="/developers/ide_plugins/vscode/code-insights.png" alt="La vista Información del código." style="width:100%;" >}}

La Información del código incluye una descripción detallada de cada problema y enlaces a:

- La localización de código fuente correspondiente
- La plataforma de Datadog para más información

Puedes descartar información individual y establecer filtros para ver la información que te interese.

## Tests Synthetic

La extensión de Datadog te permite [ejecutar test Synthetic HTTP y tests de navegador en entornos locales][1] directamente en VS Code. Puedes identificar y solucionar posibles problemas derivados de cambios en el código antes de que se desplieguen en producción y afecten a tus usuarios finales.

<div class="alert alert-info">Admitimos <a href="https://docs.datadoghq.com/synthetics/api_tests/http_tests/?tab=requestoptions">tests de API HTTP</a> y <a href=" https://docs.datadoghq.com/synthetics/browser_tests/?tab=requestoptions">tests de navegador</a>.</div>


{{< img src="developers/ide_plugins/vscode/vscode-extension-demo.png" alt="La extensión de Datadog en VS Code" style="width:100%;" >}}

### Ejecuta tests Synthetic de forma local

1. Selecciona una test Synthetic para ejecutarla. Puedes buscar tests específicas haciendo clic en el icono **Search** (Buscar).
2. Cambia la configuración de la test para convertir la URL de inicio y especifica una URL `localhost` en la página **Settings** (Configuración).
3. Haz la test.

{{< img src="developers/ide_plugins/vscode/test_configuration_modified_starturl.png" alt="El panel de configuración de test y página de Configuración donde puedes especificar la URL de inicio de una test Synthetics a una URL de host local" style="width:100%;" >}}

Si aún no has configurado las tests de Synthetic, [crea una test en Datadog][3]. Para obtener más información sobre la ejecución de tests en un entorno local, consulta [Empezando con tests de API][4], [Empezando con tests de navegador][5] y la [documentación de pruebas continuas][1].

### Permisos

De manera predeterminada, solo los usuarios con los roles [Administrador de Datadog y Estándar de Datadog][7] pueden crear, editar y eliminar tests de navegador y HTTP Synthetic. Para poder crear, editar y eliminar tests de navegador y HTTP Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][7].

Si estás utilizando la [función de rol personalizado][8], añade tu usuario a cualquier rol que incluya permisos `synthetics_read` (lectura de Synthetics) y `synthetics_write` (escritura de Synthetics).

## Ver en VS Code

La función **View in VS Code** (Ver en VS Code) proporciona un enlace desde la plataforma de Datadog directamente a los archivos fuente. Busca el botón junto a los marcos en stack traces que se muestra en la interfaz de usuario (por ejemplo, en [Rastreo de errores][10]):

{{< img src="/developers/ide_plugins/vscode/view-in-vscode.png" alt="Una stack trace en la plataforma de Datadog que muestra el botón Ver en VS Code." style="width:100%;" >}}

<div class="alert alert-info">Para utilizar esta función, primero configura <a href="/integrations/guide/source-code-integration/">la integración de código fuente</a> para tu servicio.</div>

## Navegación de logs

Puedes navegar al [Log Explorer][28] en la [plataforma de Datadog][2] directamente desde tus archivos de código fuente.

Si estás utilizando una biblioteca de registro compatible, la extensión es capaz de mostrarte lentes de código en las líneas en las que has detectado patrones de logs que coinciden con los registros de la plataforma de Datadog:

{{< img src="/developers/ide_plugins/vscode/logs_navigation.mp4" alt="Vista previa de la navegación de logs" style="width:100%" video=true >}}

Las bibliotecas de registro compatibles son:

- JavaScript
  - [@datadog/browser-logs][16]
  - [Winston][17]
  - [Pino][18]
  - [Bunyan][19]
  - [Log4js][20]
- Python
  - [registros][21]

Alternativamente, puedes seleccionar algún texto en tu código fuente, haz clic con el botón derecho y busca la opción **Datadog > Search Logs With Selected Text** (Datadog > Buscar logs con texto seleccionado).

{{< img src="developers/ide_plugins/vscode/log_search.png" alt="Uso de la característica Datadog Logs Explorer" style="width:100%;" >}}

## Code Delta

Code Delta compara los números de línea incluidos en la telemetría de Datadog con los números de línea de los archivos en los que estás trabajando actualmente en VS Code.

Por ejemplo, todos los enlaces [Ver en VS Code](#view-in-vs-code) de la plataforma de Datadog codifican información sobre la versión en tiempo de ejecución, y la extensión la utiliza para calcular la línea de código correspondiente en el editor, teniendo en cuenta los cambios de versión.

Puedes modificar la configuración de Code Delta para cambiar el funcionamiento del algoritmo de coincidencia. En particular, puedes modificar el valor `Minimum Affinity`, que determina el grado de confianza necesario para que coincidan las líneas.

## Análisis estático

La integración **Análisis estático** analiza tu código (localmente) en función de reglas predefinidas para detectar y corregir problemas.

La extensión de Datadog ejecuta reglas de [Análisis estático][14] en los archivos fuente que tienes abiertos en tu solución. El objetivo es detectar y corregir problemas de mantenimiento, errores o vulnerabilidades de seguridad en el código antes de confirmar los cambios.

El [Análisis estático][14] admite la exploración de muchos lenguajes de programación. Si deseas consultar la lista completa, consulta [Reglas del análisis estático][15]. Para los tipos de archivos pertenecientes a los lenguajes compatibles, los problemas se muestran en el editor de código fuente con el sistema de inspección de VS Code, y las correcciones sugeridas se pueden aplicar directamente:

{{< img src="/developers/ide_plugins/vscode/static_analysis.mp4" alt="Vista previa del análisis estático" style="width:100%" video=true >}}

### Empezando

Cuando empieces a editar un archivo fuente, la extensión buscará [static-analysis.datadog.yml][22] en la raíz de tu repositorio fuente. Te pedirá que la crees si es necesario.

{{< img src="/developers/ide_plugins/vscode/static-analysis-onboard.png" alt="Un cartel para la incorporación." style="width:100%;" >}}

Una vez creado el archivo de configuración, el analizador estático se ejecuta automáticamente en segundo plano.

<div class="alert alert-info">La función de Análisis estático no requiere una cuenta en Datadog, ya que los archivos fuente se analizan localmente.</div>

## Licencia

Lee atentamente este [Acuerdo de licencia de usuario final][23] antes de descargar o utilizar Datadog Visual Studio Code Extension.

## Datos y telemetría

Datadog recopila de forma anónima información sobre el uso que haces de este entorno de desarrollo integrado, incluyendo cómo interactúas con él, si se han producido errores mientras lo usabas, y qué causó esos errores, de acuerdo con la [política de privacidad de Datadog][24] y [VS Code extension EULA][23] de Datadog.

Si no deseas enviar estos datos a [Datadog][2], puedes desactivar la opción en cualquier momento en la configuración de la extensión de VS Code: `Datadog > Telemetry > Setup > Enable Telemetry` y seleccionar `disabled`.

<div class="alert alert-info">La extensión de Datadog también respeta la configuración de telemetría de <a href="https://code.visualstudio.com/docs/getstarted/telemetry#_output-channel-for-telemetry-events">VS Code</a>.</div>

## Ayuda y comentarios

Para compartir tus comentarios, envía un correo electrónico a [team-ide-integration@datadoghq.com][9] o crea una incidencia en el [repositorio público][26] de la extensión.

Comprueba la sección [Problemas][27] para descubrir problemas conocidos.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_testing/
[2]: https://www.datadoghq.com/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /es/getting_started/synthetics/api_test
[5]: /es/getting_started/synthetics/browser_test
[6]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[7]: /es/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[8]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[9]: mailto:team-ide-integration@datadoghq.com
[10]: /es/tracing/error_tracking/
[11]: /es/security/application_security/vulnerability_management/
[12]: /es/continuous_integration/guides/flaky_test_management/
[13]: /es/watchdog/insights
[14]: /es/continuous_integration/static_analysis/?tab=githubactions
[15]: /es/continuous_integration/static_analysis/rules/
[16]: /es/logs/log_collection/javascript/
[17]: https://github.com/winstonjs/winston
[18]: https://github.com/pinojs/pino
[19]: https://github.com/trentm/node-bunyan
[20]: https://github.com/log4js-node/log4js-node
[21]: https://docs.python.org/3/library/logging.html
[22]: /es/continuous_integration/static_analysis/?tab=circleciorbs#setup
[23]: https://www.datadoghq.com/legal/eula/
[24]: https://www.datadoghq.com/legal/privacy/
[25]: https://code.visualstudio.com/docs/getstarted/telemetry#_output-channel-for-telemetry-events
[26]: https://github.com/DataDog/datadog-for-vscode
[27]: https://github.com/DataDog/datadog-for-vscode/issues?q=is%3Aissue+label%3A%22known+issue%22
[28]: /es/logs/explorer/