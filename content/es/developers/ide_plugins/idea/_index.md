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
- link: https://www.jetbrains.com/lp/toolbox/
  tag: Sitio externo
  text: Más información sobre JetBrains Toolbox.
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: Blog
  text: Reducir el cambio de contexto y solucionar problemas con plugins de entorno
    de desarrollo integrado de Datadog
is_beta: true
title: Plugin de Datadog para entornos de desarrollo integrados de JetBrains
---

## Información general

El plugin de Datadog para entornos de desarrollo integrado de JetBrains está disponible para IDEA, GoLand, PhpStorm y PyCharm. Te ayuda a mejorar el rendimiento del software proporcionando información significativa a nivel de código directamente en el entorno de desarrollo integrado según los datos de observabilidad en tiempo real.

{{< img src="/developers/ide_plugins/idea/overview1.png" alt="Ventana de la herramienta de Datadog abierta en IDEA" style="width:100%;" >}}

La vista **Code Insights** (Información del código) te mantiene informado sobre:
- Problemas de [rastreo de errores][6]
- Informes de [vulnerabilidad][8] de Application Security Management
- [Flaky Test][9] detectadas por CI Visibility
- Información de perfiles de [Watchdog Insights][10]

**Continuous Profiler** te ayuda a reducir la latencia y disminuir los costes de la nube resaltando las líneas de código que:
- Utilizan más CPU
- Asignan mayor cantidad de memoria
- Dedican la mayor parte del tiempo a bloqueos, E/S de disco y E/S de socket

El soporte **Logs** muestra logs observados en el código fuente, tal y como se ha detectado a partir de [patrones de logs][15], y proporciona enlaces al Datadog Log Explorer para ver los logs generados por una línea específica de código.

La función **Ejecuciones de test de CI** abre Continuos Integration Visibility Explorer para mostrar las ejecuciones recientes de una test seleccionada.

La integración **Análisis estático** analiza tu código (localmente) en función de reglas predefinidas para detectar y corregir problemas antes de confirmar los cambios.

## Requisitos

- **Una cuenta de Datadog**: el plugin requiere una cuenta de Datadog (excepto cuando se utilizan las funciones de [Análisis estático][13]). Si eres nuevo en Datadog, visita el [sitio web de Datadog][3] para obtener más información sobre las herramientas de observabilidad de Datadog y regístrate para una prueba gratuita.
- **Continuous Profiler**: para mostrar datos de perfiles y perspectivas, el plugin requiere que Continuous Profiler esté configurado para tus servicios. Para obtener más información, consulta [Empezando con Continuous Profiler][2].
- **JetBrains Toolbox**: para utilizar la función [Ver en entorno de desarrollo integrado](#view-in-ide), el plugin requiere que [JetBrains Toolbox][7] esté instalado en la máquina del desarrollador.

## Ajuste

### Instala el plugin de Datadog 

1. Haz clic en **Plugins** y busca `Datadog`.
1. Haz clic en **Install** (Instalar) para descargar e instalar el plugin en tu entorno de desarrollo integrado.
1. Si recibes un aviso de que Datadog es un plugin de terceros, haz clic en **Accept** (Aceptar).
1. Haz clic en **Restart IDE** (Reiniciar entorno de desarrollo integrado).

{{< img src="/developers/ide_plugins/idea/install-plugin.png" alt="El plugin de Datadog" style="width:100%;" >}}

También puedes instalar el plugin desde [JetBrains Marketplace][4].

<span id="datadog_plugin_install_button"></span>

### Iniciar sesión en Datadog

Tras instalar el plugin de Datadog y reiniciar el entorno de desarrollo integrado, inicia sesión en Datadog:
1. Con un archivo o proyecto abierto en el entorno de desarrollo integrado, haz clic en la ventana de la herramienta **Datadog**.
1. Haz clic en **Log in...** (Iniciar sesión...).
1. En la ventana del navegador que se abre, selecciona tu sitio y organización y, a continuación, autoriza el acceso a la plataforma.

**Nota**: Para la mayoría de los usuarios, solo se requiere un inicio de sesión. Si estás utilizando una configuración de varias organizaciones, asegúrate de que la cuenta correcta está activa. Para saber qué nombre de usuario está utilizando tu entorno de desarrollo integrado, haz clic en *Settings** -> **Tools** -> **Datadog** (Configuración -> Herramientas -> Datadog), y comprueba qué cuenta está activa.

### Vincular un servicio

Para proporcionar datos relevantes de la plataforma de Datadog, añade servicios relacionados a tu proyecto:
1. Con el proyecto abierto en el entorno de desarrollo integrado, abre la ventana de la herramienta **Datadog** y selecciona **Manage Linked Services...** (Administrar servicios vinculados...) en el menú **Options** (Opciones).
1. Se abre un cuadro de diálogo de configuración, haz clic en el icono más (**+**).
1. Busca y selecciona los servicios que deseas añadir al proyecto actual.

Para eliminar un servicio, selecciónalo en la tabla **Services** (Servicios) y haz clic en el icono del signo menos (**-**).

<div class="alert alert-info">Los nombres de los servicios vinculados persisten con el proyecto cuando lo cierras.</div>

## Información del código
La pestaña **Code Insights** (Información del código) muestra información generada por la plataforma de Datadog que es relevante para tu proyecto actual. Los datos se agrupan en tres categorías: rendimiento, fiabilidad y seguridad.

{{< img src="/developers/ide_plugins/idea/code-insights.png" alt="La pestaña Información del código." style="width:100%;" >}}

La Información del código incluye una descripción detallada de cada problema y enlaces a:
- La localización de código fuente correspondiente
- La plataforma de Datadog para más información

Puedes descartar información individual y establecer filtros para ver las categorías de información que te interesen.

## Continuous Profiler

La pestaña **Continuous Profiler** muestra información de perfiles del servicio en un entorno seleccionado, recopilada en un periodo específico. Las vistas disponibles son:
- [Lista principal](#top-list): muestra una lista de los métodos que consumen más recursos para la medida de perfil actual.
- [Gráfico de llamas](#flame-graph): un gráfico de llamas que representa stack traces en los perfiles.

Puedes especificar los siguientes parámetros para los datos de perfiles:
- El tipo de perfil que se mostrará
- El entorno en el que se ejecuta el servicio 
- El plazo para agregar las muestras de perfiles

Los tipos de perfiles disponibles suelen incluir opciones como **CPU Time** (Tiempo de CPU) y **Allocated Memory** (Memoria asignada), pero vienen determinados por la plataforma y varían según el idioma.

### Lista de principales

La subpestaña **Top List** (Lista principal) muestra los métodos que consumen más recursos según los datos de perfil agregados cargados desde los servidores de Datadog. Estos son los métodos que son candidatos más probables para la optimización.

{{< img src="/developers/ide_plugins/idea/top-list1.png" alt="La vista Lista principal" style="width:100%;" >}}

- Haciendo doble clic en un elemento de lista (o seleccionando **Jump to Source** (Saltar a la fuente) en el menú contextual) se abre un editor de código fuente que muestra dónde está definido el método.
- Para visualizar un gráfico de llama de un método, selecciona **Search in Flame Graph** (Buscar en gráfico de llama) en el menú contextual.

#### Árbol de llamadas

El árbol de llamadas situado a la derecha de **Top List** (Lista principal) muestra las rutas que conducen a (y desde) el método seleccionado.

La vista por defecto **Caller Hierarchy** (Jerarquía de llamadas) muestra quién hizo la llamada (o predecesores) del método de destino y la frecuencia con la que aparecen en la pila de llamadas. Para ver los invocadores (o sucesores), haz clic en el botón **Callee Hierarchy** (Jerarquía de invocadores) en la barra de herramientas.

Haz clic con el botón derecho en un método del árbol de llamadas para ver las opciones de navegación al editor de fuentes o al gráfico de llamas.

### Gráfico de llama

Un gráfico de llama es una visualización de muestras de perfiles que incluye stack traces y su frecuencia relativa durante el periodo de la muestra. El plugin de Datadog recopila varios perfiles individuales del intervalo de tiempo solicitado y los agrega. Cada perfil individual cubre un intervalo de 60 segundos dentro del marco temporal solicitado.

{{< img src="/developers/ide_plugins/idea/flamegraph1.png" alt="Un gráfico de llamas que muestra el Tiempo de CPU de la última hora" style="width:100%;" >}}

Cada vez que cambies el tipo de perfil, el marco temporal o el entorno, el plugin de Datadog genera un nuevo gráfico de llama.

Puedes navegar por el gráfico de llamas de varias maneras:
- Haz doble clic en cualquier marco para centrarte en ese método y en todos los métodos que ha llamado durante el periodo de la muestra.
- Utiliza el minimapa para desplazarte por el gráfico.
- Haz clic con el botón derecho en un método y selecciona **Jump to Source** (Saltar a la fuente) para ir al punto correspondiente del código fuente.

Al pasar el ratón por encima de un método, aparece un cuadro de herramienta con la siguiente información:
- El nombre de la clase y la firma del método
- El nombre del paquete
- El valor de la métrica de perfil y el desglose del porcentaje.

Las muestras de perfiles incluyen información sobre stack trace y el número de línea. Utiliza el botón **Separate Flame Graph by** (Separar gráfico de llamas por) para cambiar entre separar los marcos por método o por número de línea.

{{< img src="/developers/ide_plugins/idea/separate-flamegraph-by.png" alt="Usa el botón del cuadro de herramientas para separar marcos por método o número de línea" style="width:40%;" >}}

### Destacar fuente

Cuando la pestaña Continuous Profiler está activa, el plugin resalta el código en el margen del editor de código fuente. En el caso de los métodos principales, aparece un icono en el margen del editor y se resalta en la línea del código en función de los datos de perfil activos.
- Pasa el ratón sobre el icono para ver más información.
- Haz clic en el icono para abrir la pestaña Perfiles principales o abre Perfiles en Datadog.
  {{< img src="/developers/ide_plugins/idea/interest-options.png" alt="Haz clic en el ícono de Datadog para abrir los datos de Perfiles en una pestaña o en Datadog" style="width:100%;" >}}

La pestaña de Perfiles activa también afecta a la vista en árbol del proyecto, que se anota con las métricas del perfil seleccionado:
{{< img src="/developers/ide_plugins/idea/project-tree-view.png" alt="El árbol de proyecto anotado con métricas de perfil de una pestaña de perfil" style="width:60%;" >}}

## Información de logs

Patrones de log de Datadog se conectan directamente con líneas de código de tu editor para archivos fuente de Java, Go y Python:
{{< img src="/developers/ide_plugins/idea/log-patterns.png" alt="Una línea de log que muestra eventos de log de Datadog" style="width:100%;" >}}

Una ventana emergente muestra los valores de ejecución de las entradas de log:
{{< img src="/developers/ide_plugins/idea/log-patterns-popup.png" alt="Una ventana emergente que muestra los patrones de log de Datadog" style="width:100%;" >}}

Haz clic en el icono de log para abrir el [Log Explorer][5] en la plataforma de Datadog con una consulta precargada que coincida lo más posible con el nombre del registrador, el nivel de log y el mensaje de log:
{{< img src="/developers/ide_plugins/idea/loguear-explorer-link.png" alt="Un archivo fuente que muestra un ícono y enlace de Ver logs." style="width:100%;" >}}

## Ejecución de tests de CI
Puedes ver las tests realizadas recientemente en el [Continuous Integration Visibility Explorer][12] navegando directamente desde tus archivos fuente. Busca los enlaces **View Test Runs** (Ver ejecuciones de test) después de las declaraciones de métodos de test en tu código fuente:

{{< img src="/developers/ide_plugins/idea/ci-navigation.png" alt="Un archivo fuente que muestra un enlace de Ver ejecuciones de test." style="width:100%;" >}}

Al hacer clic en el enlace, se abre la pestaña **Test Runs** (Ejecuciones de test), que muestra el historial reciente de un caso de test.

## Ver en entorno de desarrollo integrado

La función **View in IDE** (Ver en entorno de desarrollo integrado) proporciona un enlace desde la plataforma de Datadog directamente a los archivos fuente en tu entorno de desarrollo integrado. Busca el botón junto a los marcos en stack traces que se muestra en la plataforma (por ejemplo, en [Rastreo de errores][6]):

{{< img src="/developers/ide_plugins/idea/view-in-idea.png" alt="Una stack trace en la plataforma de Datadog que muestra el botón Vista en IntelliJ." style="width:100%;" >}}

<div class="alert alert-info">Esta función tiene dos requisitos previos: (1) la integración del código fuente está configurada para tu servicio y (2) la JetBrains Toolbox está instalada en tu máquina de desarrollo.</div>

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

## Lectura adicional

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
[7]: https://www.jetbrains.com/lp/toolbox/
[8]: /es/security/application_security/vulnerability_management/
[9]: /es/continuous_integration/guides/flaky_test_management/
[10]: /es/watchdog/insights
[11]: mailto:team-ide-integration@datadoghq.com
[12]: /es/continuous_integration/explorer/?tab=testruns
[13]: /es/static_analysis/?tab=githubactions
[14]: /es/static_analysis/rules/#python-rules
[15]: /es/logs/explorer/analytics/patterns/