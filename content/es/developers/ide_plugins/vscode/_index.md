---
aliases:
- /es/developers/ide_integrations/vscode/
description: Aprende a ejecutar tests Synthetic en entornos locales directamente en
  VS Code.
further_reading:
- link: /continuous_testing/
  tag: Documentación
  text: Más información sobre Continuous Testing
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Más información sobre la integración del código fuente.
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: Blog
  text: Reducir el cambio de contexto y solucionar problemas con plugins de entorno
    de desarrollo integrado de Datadog
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: Blog
  text: Simplifica la depuración de la producción con Datadog Exception Replay
is_beta: true
title: Extensión de Datadog para Visual Studio Code
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    La extensión de Datadog para Visual Studio Code no es compatible con el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Resumen

La extensión de Datadog para Visual Studio Code (VS Code) se integra con Datadog para acelerar tu desarrollo.

{{< img src="/developers/ide_plugins/vscode/datadog-vscode-2.png" alt="La extensión de Datadog para VS Code" style="width:100%;" >}}

Contiene varias características, incluidas:

- [**Code Insights**](#code-insights) para mantenerle informado sobre

  - Problemas de [Error Tracking][10]
  - Informes de [Application Vulnerability Management][11]
  - [Flaky Tests][12] detectadas por CI Visibility

- [**View in VS Code**](#view-in-vs-code) para ir directamente de tus referencias de archivo en la plataforma de Datadog a tus archivos fuente.

- [**Navegación de logs**](#logs-navigation) te permite buscar logs desde tu código.

- [**Code Delta**](#code-delta) para asignar con mayor precisión los datos de observabilidad a tus archivos en VS Code.

- [**Análisis estático**](#static-analysis) para detectar y corregir problemas incluso antes de confirmar los cambios.

- [**Exception Replay**](#exception-replay) para ayudar a depurar tu código de producción.

## Requisitos

- **Una cuenta de Datadog**: la extensión requiere una cuenta de Datadog (excepto cuando se utilizan las características de [Análisis estático][14]). Si es la primera vez que visitas Datadog, visita el [sitio web de Datadog][1] para obtener más información sobre las herramientas de observabilidad de Datadog y suscribirte a una versión de prueba gratuita.

- **VS Code Git**: la extensión funciona mejor cuando la integración de VS Code Git está activada. Asegúrate de que la integración está habilitada comprobando la configuración de `git.enabled`.

## Configuración

Instala la [Extensión de Datadog][2] desde Visual Studio Marketplace.

## Code Insights

El árbol **Code Insights** muestra información generada por la plataforma de Datadog que es relevante para tu código base. La información se agrupa en tres categorías: rendimiento, fiabilidad y seguridad.

{{< img src="/developers/ide_plugins/vscode/code-insights.png" alt="La vista de Code Insights." style="width:100%;" >}}

Code Insights incluye una descripción detallada de cada problema y enlaces a:

- La localización del código fuente relacionado 
- La plataforma de Datadog para obtener información adicional

Puedes descartar Code Insights individuales y establecer filtros para ver los que más te interesen.

## View in VS Code

La función **View in VS Code** proporciona un enlace desde Datadog directamente a tus archivos fuente. Busca el botón junto a los marcos en stack traces que se muestra en la interfaz de usuario (por ejemplo, en [Error Tracking][10]):

{{< img src="/developers/ide_plugins/vscode/view-in-vscode.png" alt="Un stack trace en la plataforma de Datadog que muestra el botón de View in VS Code." style="width:100%;" >}}

<div class="alert alert-info">Para utilizar esta función, primero <a href="/integrations/guide/source-code-integration/">configura la integración de código fuente</a> para tu servicio.</div>

## Navegación de logs

Puedes navegar al [Log Explorer][28] en la [plataforma de Datadog][1] directamente desde tus archivos de código fuente.

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

{{< img src="developers/ide_plugins/vscode/log_search.png" alt="Uso de la característica Datadog Log Explorer" style="width:100%;" >}}

## Code Delta

Code Delta compara los números de línea incluidos en la telemetría de Datadog con los números de línea de los archivos en los que estás trabajando actualmente en VS Code.

Por ejemplo, todos los enlaces [Ver en VS Code](#view-in-vs-code) de la plataforma de Datadog codifican información sobre la versión en tiempo de ejecución, y la extensión la utiliza para calcular la línea de código correspondiente en el editor, teniendo en cuenta los cambios de versión.

Puedes modificar la configuración de Code Delta para cambiar el funcionamiento del algoritmo de coincidencia. En particular, puedes modificar el valor `Minimum Affinity`, que determina el grado de confianza necesario para que coincidan las líneas.

## Análisis estático

La integración [Análisis estático][14] analiza tu código (localmente) en función de reglas predefinidas para detectar y corregir problemas.

La extensión de Datadog ejecuta reglas de [Análisis estático][14] en los archivos fuente que tienes abiertos en tu solución. El objetivo es detectar y corregir problemas de mantenimiento, errores o vulnerabilidades de seguridad en el código antes de confirmar los cambios.

El [Análisis estático][14] admite la exploración de muchos lenguajes de programación. Si deseas consultar la lista completa, consulta [Reglas del análisis estático][15]. Para los tipos de archivos pertenecientes a los lenguajes compatibles, los problemas se muestran en el editor de código fuente con el sistema de inspección de VS Code, y las correcciones sugeridas se pueden aplicar directamente:

{{< img src="/developers/ide_plugins/vscode/static_analysis.mp4" alt="Vista previa del análisis estático" style="width:100%" video=true >}}

### Para empezar

Cuando empieces a editar un archivo fuente, la extensión buscará [static-analysis.datadog.yml][22] en la raíz de tu repositorio fuente. Te pedirá que la crees si es necesario.

{{< img src="/developers/ide_plugins/vscode/static-analysis-onboard.png" alt="Un cartel para la incorporación." style="width:100%;" >}}

Una vez creado el archivo de configuración, el analizador estático se ejecuta automáticamente en segundo plano.

<div class="alert alert-info">La función de Análisis estático no requiere una cuenta en Datadog, ya que los archivos fuente se analizan localmente.</div>

## Exception Replay

Exception Replay te permite navegar a través de los marcos del stack trace de cualquier información de código en Error Tracking y obtener información sobre los valores de las variables del código que se ejecuta en producción.

Para acceder a esta función, debes activar [Error Tracking Exception Replay][29] en Datadog.

Una vez activada la función, podrás ver un botón `Exception Replay` junto a la sección del stack trace de cualquier información del código instrumentada en Error Tracking. Si haces clic en él, podrás:

- acceder a toda la información que Datadog tiene sobre los diferentes marcos
- navegar por el código de producción
- revisar el valor de las diferentes variables implicadas

Selecciona una información de código de Error Tracking en la vista de Code Insights. Ve al stack trace y haz clic en el botón Exception Replay. VS Code muestra una nueva actividad con dos nuevas vistas:

- **Variables**: muestra las variables relacionadas con un determinado marco del stack trace.
- **Stack Trace**: permite navegar por los diferentes marcos del stack trace.

Selecciona un marco del stack trace e inspecciona los valores de todas las variables que Datadog capturó de tu código de producción.

{{< img src="/developers/ide_plugins/vscode/exception_replay.mp4" alt="Vista previa de Exception Replay" style="width:100%" video=true >}}

## Licencia

Lee atentamente este [Acuerdo de licencia de usuario final][23] antes de descargar o utilizar Datadog Visual Studio Code Extension.

## Datos y telemetría

Datadog recopila de forma anónima información sobre el uso que haces de este entorno de desarrollo integrado, incluyendo cómo interactúas con él, si se han producido errores mientras lo usabas, y qué causó esos errores, de acuerdo con la [política de privacidad de Datadog][24] y [VS Code extension EULA][23] de Datadog.

Si no deseas enviar estos datos a [Datadog][1], puedes excluirte en cualquier momento en la configuración de la extensión VS Code: `Datadog > Telemetry > Setup > Enable Telemetry` y selecciona `disabled`.

<div class="alert alert-info">La extensión de Datadog también respeta la configuración de telemetría de <a href="https://code.visualstudio.com/docs/getstarted/telemetry#_output-channel-for-telemetry-events">VS Code</a>.</div>

## Ayuda y comentarios

Para compartir tus comentarios, envía un correo electrónico a [team-ide-integration@datadoghq.com][3] o crea una incidencia en el [repositorio público][26] de la extensión.

Comprueba la sección [Problemas][27] para descubrir problemas conocidos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: mailto:team-ide-integration@datadoghq.com
[10]: /es/tracing/error_tracking/
[11]: /es/security/code_security/software_composition_analysis/
[12]: /es/continuous_integration/guides/flaky_test_management/
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
[29]: /es/tracing/error_tracking/exception_replay
