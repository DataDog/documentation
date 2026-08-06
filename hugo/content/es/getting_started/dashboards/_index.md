---
description: Aprende a crear dashboards eficaces para la monitorización de equipos,
  la elaboración de informes ejecutivos y la resolución de problemas utilizando las
  herramientas de visualización de Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Comparte dashboards de forma segura con cualquier persona que no pertenezca
    a tu organización.
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Usa variables de plantilla asociadas para redefinir tus dashboards
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: Centro de aprendizaje
  text: Building Better Dashboards (Cómo mejorar los dashboards)
- link: /dashboards/
  tag: Documentación
  text: Aspectos básicos de los dashboards
- link: /notebooks/
  tag: Documentación
  text: Cuenta algo sobre los datos con notebooks
- link: /monitors/
  tag: Documentación
  text: Monitores, SLOs, notificaciones, tiempos de inactividad e incidencias
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participa en una sesión interactiva sobre las mejores visualizaciones con
    dashboards
title: Empezando con los dashboards
---

{{< learning-center-callout header="Únete a una sesión de webinar de Enablement" hide_image="true" btn_title="Inicio de sesión" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Dashboarding">}}
  Explora y regístrate en las sesiones de Foundation Enablement. Aprende a personalizar tus dashboards mediante nuestra biblioteca de visualizaciones y el compilador de dashboard de arrastrar y soltar. Facilita el éxito de tu equipo al compartir datos con las partes interesadas a través de informes, URL públicas y notebooks.
{{< /learning-center-callout >}}

## Información general

La clave para entender el funcionamiento de los dashboards es saber qué tipo de preguntas sueles hacerte. ¿Cuáles son los problemas más habituales a los que se enfrentan tus clientes? Cuando se produce algún problema, ¿qué preguntas te ayudan a encontrar una solución?

Crear un buen dashboard pasa por responder a esas preguntas. Sin embargo, ten en cuenta que no debes incluir todo lo que se te ocurra en un mismo dashboard. Si creas dashboards independientes para tratar cada problema, te resultará más fácil encontrar rápidamente esas respuestas cuando las necesites.

En esta guía, te indicamos los primeros pasos que debes dar para crear dashboards. Con estos dashboards básicos, podrás comunicarte con tu equipo y solucionar los problemas más rápido.

## Requisitos previos

Si aún no lo has hecho, crea una [cuenta de Datadog][1]. Instala el Agent en un host, además de una integración de algo que se ejecute en ese host.

## Plan

Antes de crear un dashboard, define bien su objetivo. Un dashboard puede servir para que tanto tú como tus compañeros de equipo sepáis hacia donde hay que dirigir la atención. Los _dashboards de equipo_ funcionan a modo de recordatorios, puesto que reflejan cuál es la máxima prioridad, a qué debemos prestar atención y qué estamos haciendo bien. Crea un dashboard de equipo (o varios) con la información que se suele necesitar. Normalmente, los mejores dashboards de equipo incluyen detalles relacionados con los SLOs y SLIs.

Un dashboard que disponga de datos en tiempo real es una herramienta de gran utilidad para guiar la comunicación con los responsables y el personal ejecutivo. Un buen _dashboard ejecutivo_ puede reflejar que te estás ocupando de lo más importante, el coste de un servicio o si estás progresando hacia la consecución de los objetivos, cumpliendo tus SLOs y escalando correctamente. Los dashboards ejecutivos son más efectivos cuando aportan las mejores respuestas posibles a estas cuestiones y cuando están interconectados para comparar y analizar las respuestas.

Los dashboards también pueden ayudarte a localizar y solucionar problemas persistentes. Los _dashboards para solucionar problemas_ suelen originarse a partir de notas sobre lo que ya sabes y van tomando forma poco a poco, a medida que descubres más cosas. Por poner un ejemplo, puedes empezar con un gráfico o widget de otro dashboard o vista que presente un problema. A partir de ahí, sigue analizando hasta encontrar una solución.

## Explora los dashboards predefinidos

Datadog ofrece un gran número de dashboards predefinidos para funciones e integraciones. Si necesitas alguno para la infraestructura que monitorizas, echa un vistazo a los que vienen de serie:

1. En Datadog, ve a la [página Lista de dashboards][2] y busca el nombre de una integración que hayas añadido. Por ejemplo, `Redis`, o una función que utilices, como `RUM`.
2. Consulta los dashboards con la marca *Preset* (Predefinido) que aparezcan en los resultados de búsqueda y comprueba si hay algún gráfico que refleje las respuestas que necesitas.
3. Explora los enlaces del menú desplegable de títulos de dashboards predefinidos para obtener más información sobre cómo los utiliza la gente.

## Reutiliza primero otros dashboards

Una forma habitual de iniciar un dashboard consiste en buscar un dashboard parecido que ya esté en uso y adaptarlo a nuestras necesidades. Si encuentras un dashboard que ya responda a gran parte de las preguntas que te planteas:

1. Clónala abriendo el dashboard y seleccionando **Clonar dashboard** en el menú Acciones de configuración (el botón Configurar de la derecha). De este modo, se crea una copia no vinculada de dashboard. Los cambios que realices en la nueva copia no afectarán al widget de origen.
  {{< img src="getting_started/dashboards/configure_clone_dashboard.png" alt="Opción clonar dashboard en el menú Acciones de configuración" style="width:100%;" >}}
2. Abre el clon y haz clic en **Edit widgets** (Editar widgets) para hacer cambios. 
3. Selecciona **Delete** (Eliminar) en el menú de configuración del widget para eliminar los widgets que no necesites.
4. Reorganiza la información en función de tus necesidades. Los widgets individuales y los grupos se pueden arrastrar hacia otras localizaciones del dashboard.
5. Puedes copiar los widgets que te gusten de otros dashboards. Para ello, solo tienes que colocar el cursor sobre el widget y teclear `Command + C` (`Ctrl + C` en Windows). Luego, abre el dashboard y teclea `Command + V` (`Ctrl + V` en Windows) para pegarlo.
5. Utiliza la opción **Export to Dashboard** (Exportar al dashboard) que ofrecen muchas vistas de Datadog para los datos que muestran. Por ejemplo, las vistas del Log Explorer y Log Analytics tienen opciones compartidas para exportar listas y métricas de logs a dashboards.

## Obtén más información sobre las métricas

A través de integraciones, Datadog recopila [métricas][3] de tu infraestructura y aplicaciones. Las métricas recopiladas se registran en los archivos README de la integración. Si encuentras una métrica en el [Metrics Explorer][4] o mientras creas un dashboard y quieres saber qué es la métrica, búscala en los documentos de integraciones.

Por ejemplo, supongamos que estás viendo un gráfico temporal de la métrica `aws.s3.first_byte_latency`. Ve a la sección [Datos recopilados][5] del archivo README de la integración de Amazon S3 para ver su descripción: `The average per-request time from the complete request being received by a bucket to when the response starts to be returned. Shown as millisecond.`

## Añadir widgets y redefinir lo que muestran

Una vez que hayas seleccionado algunas métricas para añadirlas a tu dashboard, experimenta con varios [tipos de widget][6], [consultas][7], [funciones][8] y [enfoques de agregación][9] para mostrar los datos de la forma que mejor responda a las preguntas que tengas. 

Al especificar variables de plantilla, puedes hacer que un dashboard responda a preguntas para una selección de escenarios. Por ejemplo, puedes crear un gráfico de tiempo que muestre las métricas de latencia para cualquier geografía del centro de datos que el usuario seleccione en el menú desplegable de variables del dashboard, o para todas ellas juntas. Para más información, consulta [Variables de plantilla][10].

Puedes facilitar la lectura de los gráficos ajustando los rangos del eje Y, los colores o las leyendas, o bien añadiendo marcadores y superposiciones de eventos. Consulta la [documentación sobre los dashboards][11] para descubrir todas las formas en las que puedes personalizar y reajustar las [cronologías][12] y [demás widgets][6].

Para más información y ejemplos acerca de estas técnicas, inscríbete en el curso de aprendizaje en línea [Building Better Dashboards (Cómo mejorar los dashboards)][13].

## Prueba otros widgets

Los gráficos cronológicos de métricas son muy útiles, pero los dashboards pueden contener muchos tipos de widgets para aportar información importante. Prueba estos:

 - **Valores de alerta y estados de check**: resalta con números grandes de color rojo, amarillo y verde los buenos resultados o los problemas.
 - **Mapas de actividad**: refleja la compleja relación métrica-infraestructura de varias etiquetas (tags) mediante gráficos intuitivos que representan la intensidad con colores.
   {{< img src="getting_started/dashboards/heatmap_widget.png" alt="Ejemplo de mapa de actividad" >}}
 - **Iframes, texto con formato e imágenes**: refleja un número indeterminado de detalles propios de un sitio web para explicar mejor el contenido del dashboard y proporcionar recursos adicionales.
 - **Tablas**: refleja listas de métricas agrupadas por claves de etiqueta.
 - **Listas principales**: refleja, por ejemplo, los hosts con menos espacio disponible, los servicios que generan más errores o las URL que presentan más errores 404.
 - **Mapa del host**: refleja un diagrama en el que se ven, por ejemplo, los hosts de tu infraestructura con colores que representan el estado de sus integraciones o servicios.
 - **Objetivos de nivel de servicio (SLOs)**: refleja el rendimiento del equipo respecto a sus objetivos con un widget de SLOs; además, agrupa los widgets adicionales que aportan detalles relacionados con las métricas de SLIs.
 - **Distribuciones**: refleja, por ejemplo, un histograma con los diferentes tipos de eventos que ocurren en un entorno contenedorizado, el número de errores críticos que hay en cada servicio, el flujo del sitio web (número de usuarios que llegan a la página 2, la página 3, la página 4, etc.) o los buckets con los percentiles de latencia.

Consulta [widgets][6] para obtener más información y ejemplos de configuración de estos gráficos.

## Organiza, vincula y analiza

Mueve los gráficos de un lado a otro para crear un flujo en tu trabajo o en las conversaciones que tienes dentro el dashboard. Arrastra y suelta los widgets para colocarlos donde quieras. En los screenboards, usa widgets de texto libre para organizar las secciones debajo de los encabezados. En los timeboards, añade un widget de grupo que pueda contener varios widgets y contraerse a medida que consultas el dashboard.

Existen dos formas de crear enlaces que vinculen un dashboard con una URL de destino:

 - Añade un widget de notas y enlaces que admita texto en formato Markdown, como los enlaces. El editor del widget te dará consejos acerca de cómo utilizar el formato Markdown.
 - Crea un enlace personalizado desde el menú de configuración (rueda dentada) de un widget. Los enlaces personalizados pueden interpolar variables y variables de plantilla para que el enlace cambie en función de lo que haya seleccionado el usuario. De este modo, cuando el usuario haga clic, irá directamente al lugar exacto en el que hay que analizar los datos o aplicar acciones correctivas.
     {{< img src="getting_started/dashboards/opening_custom_link.mp4" alt="Cómo abrir un enlace personalizado" video=true >}}

## Próximos pasos

### Comparte tus dashboards fuera del sitio de Datadog

Haz clic en **Configure Public URL** (Configurar URL pública) en el menú de exportación de un dashboard para crear una URL que puedas compartir con pantallas grandes o con personas que no tengan necesariamente una cuenta de Datadog. Para más información, consulta [Compartir dashboards][14].

Integra las comunicaciones de tu equipo mediante la [integración de Slack][15] para importar dashboards y otras funciones de Datadog, como monitores e incidencias, a un canal de Slack.

### Crea varios dashboards con rapidez

Todos los dashboards tienen una representación JSON que puedes copiar o exportar desde el menú de configuración. Los widgets del dashboard también tienen una definición JSON; para editarla, abre el editor del widget (icono del lápiz) y haz clic en la pestaña JSON de **Graph your data** (Tus datos en un gráfico).

Dado que todos los widgets y dashboards se representan como JSON, puedes generarlos mediante programación utilizando la [API de dashboards][16], lo que resulta útil si deseas generar un dashboard cada vez que tu equipo inicie un nuevo proyecto o se encuentre con una incidencia, o formalice un SLO, por ejemplo.

### Consulta los dashboards desde la aplicación móvil de Datadog

Consulta tus dashboards en un dispositivo móvil con la [Datadog Mobile App][17], disponible en [Apple App Store][18] y [Google Play Store][19]. 

La aplicación móvil te permite ver y buscar todos los dashboards a los que tienes acceso en tu organización de Datadog. Además, puedes filtrarlos usando las mismas variables de plantilla que en la aplicación web de Datadog.

{{< img src="dashboards/dashboards-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Dashboards en iOS y Android">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /es/metrics/introduction/
[4]: /es/metrics/explorer/
[5]: /es/integrations/amazon_s3/#data-collected
[6]: /es/dashboards/widgets/
[7]: /es/dashboards/querying/
[8]: /es/dashboards/functions/
[9]: /es/metrics/distributions/
[10]: /es/dashboards/template_variables/
[11]: /es/dashboards/
[12]: /es/dashboards/widgets/timeseries/
[13]: https://learn.datadoghq.com/courses/building-better-dashboards/
[14]: /es/dashboards/sharing/
[15]: /es/integrations/slack/
[16]: /es/api/v1/dashboards/
[17]: /es/mobile/
[18]: https://apps.apple.com/app/datadog/id1391380318
[19]: https://play.google.com/store/apps/details?id=com.datadog.app