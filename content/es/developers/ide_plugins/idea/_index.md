---
aliases:
- /es/developers/ide_integrations/idea/
disable_toc: false
further_reading:
- link: /getting_started/profiler/
  tag: Documentación
  text: Empezando con Continuous Profiler.
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Más información sobre la integración del código fuente.
- link: /static_analysis/?tab=githubactions
  tag: Documentación
  text: Más información sobre el análisis estático.
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: Blog
  text: Reducir el cambio de contexto y solucionar problemas con plugins de entorno
    de desarrollo integrado de Datadog
is_beta: true
title: Plugin de Datadog para entornos de desarrollo integrados de JetBrains
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    La extensión de Datadog para IDEs de JetBrains no es compatible con tu <a href="/getting_started/site">sitio de Datadog seleccionado</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## Información general

El complemento de Datadog para IDEs de JetBrains ayuda a mejorar el rendimiento de software al proporcionar información del código en el IDE basado en datos de observabilidad en tiempo real. El complemento es para desarrolladores que usan productos de Datadog incluidos [Log Explorer][5], [Error Tracking][6], [Live Debugger][21], [Continuous Profiler][10], [Code Security][7], [Test Optimization][18] y [CI Visibility][19] para monitorizar sus servicios. Está disponible para IntelliJ IDEA, GoLand, PyCharm, WebStorm y PhpStorm.

{{< img src="/developers/ide_plugins/idea/overview1.png" alt="La ventana de la herramienta de Datadog abierta en IDEA" style="width:100%;" >}}

La integración de **Logs** muestra logs observados en el editor de código fuente y ofrece enlaces al [Log Explorer][5] para ver logs generados por una línea de código específica.

La característica **Code Insights** ayuda a encontrar y corregir errores de tiempo de ejecución desde [Error Tracking][6], biblioteca y vulnerabilidades de código de tiempo de ejcución desde [Code Security][7], tests flaky tests detectados por [Test Optimization][18] y más.

El [**Live Debugger**][20] te permite capturar información de depuración vital al añadir logs temporales a tu código de tiempo de ejecución y sin tener que detener e iniciar tu servicio o aplicación.

El [**Continuous Profiler**][22] te ayuda a reducir la latencia y disminuir los costes de nube al destacar el código que usa el mayor tiempo de CPU, asigna la mayor memoria, activa las mayores excepciones o consume altas cantidades de otros recursos.

La característica **CI Test Runs** abre el [CI Visibility Explorer][9] para mostrar las ejecuciones recientes de cualquier test.

El motor **Static Analysis**, que se ejecuta localmente, analiza tu código con las reglas predefinidas para detectar y corregir problemas antes de confirmar los cambios.

## Requisitos

- **Una cuenta de Datadog**: el complemento requiere una cuenta de Datadog (excepto cuando usa características de [Static Analysis][13]). Si eres nuevo en Datadog, ve al [sitio web de Datadog][3] para obtener más información sobre las herramientas de observabilidad de Datadog e iniciar sesión para un periodo de prueba gratuito.
- **Continuous Profiler**: para mostrar los datos e información de perfil, el complemento requiere que se configure el Continuous Profiler para tus servicios. Para obtener más información, consulta [Empezando con el Continuous Profiler][2].

## Configuración

### Instala el complemento de Datadog

1. Haz clic en **Plugins** (Complementos) y busca `Datadog`.
1. Haz clic en **Install** (Instalar) para descargar e instalar el complemento en tu IDE.
1. Si recibes una indicación que te notifica que Datadog es un complemento externo, haz clic en **Accept** (Aceptar).
1. Haz clic en **Restart IDE** (Reiniciar IDE).

{{< img src="/developers/ide_plugins/idea/install-plugin.png" alt="El complemento de Datadog" style="width:100%;" >}}

De forma alternativa, puedes instalar el complemento desde el [JetBrains Marketplace][4].

<span id="datadog_plugin_install_button"></span>

### Inicia sesión en Datadog

Después de instalar el complemento de Datadog y reiniciar el IDE, inicia sesión en Datadog:
1. Con un archivo o proyecto abierto en el IDE, haz clic en la ventana de la herramienta de **Datadog**.
1. Haz clic en **Log in...** (Iniciar sesión...).
1. En la ventana del navegador que se abre, selecciona tu sitio y organización y, luego, autoriza el acceso a la plataforma.

**Nota**: Para la mayoría de los usuarios, solo se requiere un inicio de sesión. Si estás utilizando una configuración de varias organizaciones, asegúrate de que la cuenta correcta está activa. Para saber qué nombre de usuario está utilizando tu entorno de desarrollo integrado, haz clic en *Settings** -> **Tools** -> **Datadog** (Configuración -> Herramientas -> Datadog), y comprueba qué cuenta está activa.

### Vincular un servicio

Para proporcionar los datos relevantes de la plataforma de Datadog, añade servicios relacionados a tu proyecto:
1. Con tu proyecto abierto en el IDE, abre la ventana de la herramienta **Datadog** y selecciona **Manage Linked Services...** (Administrar servicios vinculados...) del menú **Options** (Opciones).
1. Se abre un cuadro de diálogo, haz clic en el ícono más (**+**).
1. Busca y selecciona los servicios que deseas añadir al proyecto actual.

Para eliminar un servicio, selecciónalo en la tabla **Services** (Servicios) y haz clic en el ícono menos (**-**).

<div class="alert alert-info">Los nombres de los servicios vinculados persisten con el proyecto cuando lo cierras.</div>

## Información de logs

Los patrones de log de Datadog se emparejan directamente con las líneas de código en tu editor para tus archivos fuente de Java, JavaScript, TypeScript, Go y Python:
{{< img src="/developers/ide_plugins/idea/log-patterns.png" alt="Una línea de log que muestra eventos de log desde Datadog" style="width:100%;" >}}

Una ventana emergente muestra los valores de ejecución de las entradas de log:
{{< img src="/developers/ide_plugins/idea/log-patterns-popup.png" alt="Una ventana emergente que muestra los patrones de log de Datadog" style="width:100%;" >}}

Haz clic en el icono de log para abrir el [Log Explorer][5] en Datadog con una consulta precargada que coincida lo más posible con el nombre del registrador, el nivel de log y el mensaje de log:
{{< img src="/developers/ide_plugins/idea/loguear-explorer-link.png" alt="Un archivo fuente que muestra un ícono y enlace de Ver logs." style="width:100%;" >}}

## Información del código
La pestaña **Code Insights** (Información del código) muestra información generada por la plataforma de Datadog que es relevante para tu proyecto actual. Los datos se agrupan en tres categorías: rendimiento, fiabilidad y seguridad.

{{< img src="/developers/ide_plugins/idea/code-insights.png-2" alt="La pestaña Información del código." style="width:100%;" >}}

La Información del código incluye una descripción detallada de cada problema y enlaces a:
- La localización de código fuente correspondiente
- La plataforma de Datadog para más información

Puedes descartar información individual y establecer filtros para ver las categorías de información que te interesen.

## Live Debugger

El [**Live Debugger**][20] te permite añadir puntos de log (puntos de interrupción que expiran automáticamente y no se rompen) a tu código en tiempo de ejecución para recopilar información para la depuración.

{{< img src="/developers/ide_plugins/idea/live_debugger/tool-window-tab.png" alt="La pestaña Live Debugger" style="width:100%;" >}}

Más información en la [documentación de Live Debugger][20].

## Continuous Profiler

El [**Continuous Profiler**][22] destaca el consumo de recursos (como CPU, asignación de memoria y excepciones lanzadas) utilizando datos de perfiles recopilados de servicios desplegados. Esta información ayuda a los desarrolladores a escribir código más eficiente y eliminar cuellos de botella.

{{< img src="/developers/ide_plugins/idea/continuous_profiler/flamegraph.png" alt="Una gráfica de llamas que muestra ek Tiempo de CPU en la última hora" style="width:100%;" >}}

Más información en la [documentación de Continuous Profiler][22].

## Ejecución de tests de CI
Puedes ver las ejecuciones recientes de tests en [CI Visibility Explorer][12] navegando directamente desde tus archivos fuente. Busca las incrustaciones **CI Test Run** encima de las declaraciones de métodos de test en tu código fuente:

{{< img src="/developers/ide_plugins/idea/ci-navigation.png" alt="Un archivo fuente que muestra un CI Test Run inlay." style="width:100%;" >}}

Al hacer clic en el enlace, se abre la pestaña **Test Runs** (Ejecuciones de test), que muestra el historial reciente de un caso de test.

## Ver en entorno de desarrollo integrado

La función **View in IDE** (Ver en entorno de desarrollo integrado) proporciona un enlace desde la plataforma de Datadog directamente a los archivos fuente en tu entorno de desarrollo integrado. Busca el botón junto a los marcos en stack traces que se muestra en la plataforma (por ejemplo, en [Rastreo de errores][6]):

{{< img src="/developers/ide_plugins/idea/view-in-idea.png" alt="Una stack trace en la plataforma de Datadog que muestra el botón Vista en IntelliJ." style="width:100%;" >}}

<div class="alert alert-info">Un requisito previo para aprovechar al máximo esta función es que la integración de código fuente esté configurada para tu servicio.</div>

## Análisis estático
El plugin de Datadog ejecuta reglas de [Análisis estático][13] en tus archivos fuente mientras los editas. El objetivo es detectar y corregir problemas de mantenimiento, errores o vulnerabilidades de seguridad en el código antes de confirmar los cambios. 

El Análisis estático admite la exploración de muchos lenguajes de programación. Si deseas consultar la lista completa, consulta [Reglas del análisis estático][14]. Para los tipos de archivos pertenecientes a los lenguajes compatibles, los problemas se muestran en el editor de código fuente con el sistema de inspección JetBrains, y las correcciones sugeridas se pueden aplicar directamente:

{{< img src="/developers/ide_plugins/idea/static-analysis-issue.png" alt="Una infracción a una regla del análisis estático y una corrección recomendada." style="width:100%;" >}}

Además, todos los problemas detectados por esta función se enumeran en la vista estándar **Problems** (Problemas).

### Empezando
Cuando empieces a editar un archivo fuente admitido por el Análisis estático, el plugin comprueba `static-analysis.datadog.yml` en la raíz de tu repositorio fuente. Te pedirá que crees el archivo si es necesario:

{{< img src="/developers/ide_plugins/idea/static-analysis-onboard.png" alt="Un cartel para la incorporación." style="width:100%;" >}}

Una vez creado el archivo de configuración, el analizador estático se ejecuta automáticamente en segundo plano.

<div class="alert alert-info">La función de Análisis estático no requiere una cuenta en Datadog, ya que los archivos fuente se analizan localmente.</div>

## Comentarios

Puedes darnos tu opinión en el [foro de debate][1], o enviar un correo electrónico a [team-ide-integration@datadoghq.com][11].

## Datos y telemetría
Datadog recopila información sobre el uso que haces de este IDE, incluyendo cómo interactúas con él, si se han producido errores durante su uso y cuál ha sido la causa de dichos errores, de acuerdo con la [Política de privacidad de Datadog][16] y [EULA de Datadog][17].

Si no deseas enviar estos datos a Datadog, puedes desactivar la recopilación en cualquier momento en los ajustes: `Settings > Tools > Datadog > Data Sharing` y desactivar la opción `Send usage statistics`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<script src="https://plugins.jetbrains.com/assets/scripts/mp-widget.js"></script>
<script>
  // Reemplaza #yourelement con un ID de elemento real de tu página web
  MarketplaceWidget.setupMarketplaceWidget('install', 19495, "#datadog_plugin_install_button");
</script>

[1]: https://github.com/DataDog/datadog-for-intellij/discussions
[2]: /es/getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://plugins.jetbrains.com/plugin/19495-datadog
[5]: /es/logs/explorer/
[6]: /es/tracing/error_tracking/
[7]: /es/security/code_security/
[8]: /es/security/code_security/software_composition_analysis/
[9]: /es/continuous_integration/explorer/
[10]: /es/profiler/
[11]: mailto:team-ide-integration@datadoghq.com
[12]: /es/continuous_integration/explorer/?tab=testruns
[13]: /es/static_analysis/?tab=githubactions
[14]: /es/static_analysis/rules/#python-rules
[15]: /es/logs/explorer/analytics/patterns/
[16]: https://www.datadoghq.com/legal/privacy/
[17]: https://www.datadoghq.com/legal/eula/
[18]: /es/tests/
[19]: /es/continuous_integration/
[20]: /es/developers/ide_plugins/idea/live_debugger/
[21]: /es/tracing/live_debugger/
[22]: /es/developers/ide_plugins/idea/continuous_profiler/