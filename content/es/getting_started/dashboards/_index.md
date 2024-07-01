---
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Comparte dashboards de forma segura con cualquier persona que no pertenezca
    a tu organización
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
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva sobre mejores visualizaciones con dashboards
kind: documentación
title: Empezando con los dashboards
---

## Información general

La clave para entender el funcionamiento de los dashboards es saber qué tipo de preguntas sueles hacerte. ¿Cuáles son los problemas más habituales a los que se enfrentan tus clientes? Cuando se produce algún problema, ¿qué preguntas te ayudan a encontrar una solución?

Crear un buen dashboard pasa por responder a esas preguntas. Sin embargo, ten en cuenta que no debes incluir todo lo que se te ocurra en un mismo dashboard. Si creas dashboards independientes para tratar cada problema, te resultará más fácil encontrar rápidamente esas respuestas cuando las necesites.

En esta guía, te indicamos los primeros pasos que debes dar para crear dashboards. Con estos dashboards básicos, podrás comunicarte con tu equipo y solucionar los problemas más rápido.

## Requisitos previos

Si aún no lo has hecho, crea una [cuenta de Datadog][1]. Instala el Agent en un host, además de una integración de algo que se ejecute en ese host.

## Elabora un plan

Antes de crear un dashboard, define bien su objetivo. Un dashboard puede servir para que tanto tú como tus compañeros de equipo sepáis hacia donde hay que dirigir la atención. Los _dashboards de equipo_ funcionan a modo de recordatorios, puesto que reflejan cuál es la máxima prioridad, a qué debemos prestar atención y qué estamos haciendo bien. Crea un dashboard de equipo (o varios) con la información que se suele necesitar. Normalmente, los mejores dashboards de equipo incluyen detalles relacionados con los SLOs y SLIs.

Un dashboard que disponga de datos en tiempo real es una herramienta de gran utilidad para guiar la comunicación con los responsables y el personal ejecutivo. Un buen _dashboard ejecutivo_ puede reflejar que te estás ocupando de lo más importante, el coste de un servicio o si estás progresando hacia la consecución de los objetivos, cumpliendo tus SLOs y escalando correctamente. Los dashboards ejecutivos son más efectivos cuando aportan las mejores respuestas posibles a estas cuestiones y cuando están interconectados para comparar y analizar las respuestas.

Los dashboards también pueden ayudarte a localizar y solucionar problemas persistentes. Los _dashboards para solucionar problemas_ suelen originarse a partir de notas sobre lo que ya sabes y van tomando forma poco a poco, a medida que descubres más cosas. Por poner un ejemplo, puedes empezar con un gráfico o widget de otro dashboard o vista que presente un problema. A partir de ahí, sigue analizando hasta encontrar una solución.

## Explora los dashboards predefinidos

Datadog ofrece un gran número de dashboards predefinidos para funciones e integraciones. Si necesitas alguno para la infraestructura que monitorizas, echa un vistazo a los que vienen de serie:

1. Dirígete a **Dashboards > Dashboards list** (Dashboards > Lista de dashboards) y busca el nombre de una integración que hayas añadido, como puede ser `Redis`, o de una función que utilices, como puede ser `RUM`.
2. Consulta los dashboards con la marca *Preset* (Predefinido) que aparezcan en los resultados de búsqueda y comprueba si hay algún gráfico que refleje las respuestas que necesitas.
3. Explora los enlaces de la lista desplegable de títulos de dashboards predefinidos para obtener más información sobre cómo se están usando.

## Reutiliza primero otros dashboards

Una forma habitual de iniciar un dashboard consiste en buscar un dashboard parecido que ya esté en uso y adaptarlo a nuestras necesidades. Si encuentras un dashboard que ya responda a gran parte de las preguntas que te planteas:

1. Clónala al abrir el dashboard y seleccionar **Clonar dashboard** en el menú Acciones de configuración (el botón Configurar de la derecha). De este modo se crea una copia no vinculada de dashboard; los cambios que realices en la nueva copia no afectarán al widget de origen.
  {{< img src="getting_started/dashboards/configure_clone_dashboard.png" alt="Opción clonar dashboard en el menú Acciones de configuración" style="width:100%;" >}}
2. Abre el clon y haz clic en **Edit widgets** (Editar widgets) para hacer cambios. 
3. Selecciona **Delete** (Eliminar) en el menú de configuración del widget para eliminar los widgets que no necesites.
4. Reorganiza la información en función de tus necesidades. Los widgets individuales y los grupos se pueden arrastrar hacia otras localizaciones del dashboard.
5. Puedes copiar los widgets que te gusten de otros dashboards. Para ello, solo tienes que colocar el cursor sobre el widget y teclear `Command + C` (`Ctrl + C` en Windows). Luego, abre el dashboard y teclea `Command + V` (`Ctrl + V` en Windows) para pegarlo.
5. Usa la opción **Export to Dashboard** (Exportar a dashboard) que encontrarás en muchas de las vistas de Datadog para exportar los datos. Por ejemplo, las vistas Logs Explorer y Log Analytics cuentan con opciones de uso compartido para exportar listas de logs y métricas a los dashboards.

## Obtén más información sobre las métricas

Datadog recopila las [métricas][2] de tu infraestructura y aplicaciones a través de las integraciones. Las métricas recopiladas se documentan en los archivos README (LÉAME) de la integración. Si te topas con alguna métrica en el [Metrics Explorer (Navegador de métricas)][3] o durante la creación de un dashboard, y quieres saber a qué hace referencia, búscala en la documentación sobre las integraciones.

Por ejemplo, supongamos que estás viendo un gráfico temporal de métrica `aws.s3.first_byte_latency`. Ve a la sección [Datos recopilados][4] del archivo README de la integración Amazon S3 para ver su descripción: `The average per-request time from the complete request being received by a bucket to when the response starts to be returned. Shown as millisecond.`

## Añade widgets y redefine su contenido

Una vez que hayas seleccionado algunas de las métricas que quieras añadir a tu dashboard, prueba varios [tipos de widget][5], [consultas][6], [funciones][7] y [enfoques de agregación][8] para mostrar los datos de la forma que mejor responda a las cuestiones que te planteas.

Al indicar las variables de plantilla, puedes hacer que un dashboard responda a las preguntas en varias situaciones diferentes. Por ejemplo, puedes crear un gráfico temporal que muestre todas las métricas de latencia o solo las de la región del centro de datos que seleccione el usuario desde la lista desplegable de variables del dashboard. Para más información, consulta la sección [Variables de plantilla][9].

Puedes facilitar la lectura de los gráficos ajustando los rangos del eje Y, los colores o las leyendas, o bien añadiendo marcadores y superposiciones de eventos. Consulta la [documentación sobre los dashboards][10] para descubrir todas las formas en las que puedes personalizar y reajustar las [cronologías][11] y [demás widgets][5].

Para más información y ejemplos acerca de estas técnicas, inscríbete en el curso de aprendizaje en línea [Building Better Dashboards (Cómo mejorar los dashboards)][12].

## Prueba otros widgets

Los gráficos cronológicos de métricas son muy útiles, pero los dashboards pueden contener muchos tipos de widgets para aportar información importante. Prueba estos:

 - **Valores de alerta y estados de check**: resalta con números grandes de color rojo, amarillo y verde los buenos resultados o los problemas.
 - **Mapas de actividad**: refleja la compleja relación métrica-infraestructura de varias etiquetas (tags) mediante gráficos intuitivos que representan la intensidad con colores.
   {{< img src="getting_started/dashboards/heatmap_widget.png" alt="Ejemplo de mapa de actividad" >}}
 - **Iframes, texto con formato e imágenes**: refleja un número indeterminado de detalles propios de un sitio web para explicar mejor el contenido del dashboard y proporcionar recursos adicionales.
 - **Tablas**: refleja listas de métricas agrupadas por claves de etiqueta.
 - **Listas principales**: refleja, por ejemplo, los hosts con menos espacio disponible, los servicios que generan más errores o las URL que presentan más errores 404.
 - **Mapa del host**: refleja un diagrama en el que se ven, por ejemplo, los hosts de tu infraestructura con colores que representan el estado de sus integraciones o servicios.
 - **Objetivos de nivel de servicio (SLOs)**: refleja el rendimiento del equipo respecto a sus objetivos con un widget que resume los SLOs; además, agrupa los widgets adicionales que aportan detalles relacionados con los SLIs.
 - **Distribuciones**: refleja, por ejemplo, un histograma con los diferentes tipos de eventos que ocurren en un entorno contenedorizado, el número de errores críticos que hay en cada servicio, el flujo del sitio web (número de usuarios que llegan a la página 2, la página 3, la página 4, etc.) o los buckets con los percentiles de latencia.

Consulta la sección [Widgets][5] para obtener más información y ejemplos sobre la configuración de estos gráficos.

## Organiza, vincula y analiza

Mueve los gráficos de un lado a otro para crear un flujo en tu trabajo o en las conversaciones que tienes dentro el dashboard. Arrastra y suelta los widgets para colocarlos donde quieras. En los screenboards, usa widgets de texto libre para organizar las secciones debajo de los encabezados. En los timeboards, añade un widget de grupo que pueda contener varios widgets y contraerse a medida que consultas el dashboard.

Existen dos formas de crear enlaces que vinculen un dashboard con una URL de destino:

 - Añade un widget de notas y enlaces que admita texto en formato Markdown, como los enlaces. El editor del widget te dará consejos acerca de cómo utilizar el formato Markdown.
 - Crea un enlace personalizado desde el menú de configuración (rueda dentada) de un widget. Los enlaces personalizados pueden interpolar variables y variables de plantilla para que el enlace cambie en función de lo que haya seleccionado el usuario. De este modo, cuando el usuario haga clic, irá directamente al lugar exacto en el que hay que analizar los datos o aplicar acciones correctivas.
     {{< img src="getting_started/dashboards/opening_custom_link.mp4" alt="Cómo abrir un enlace personalizado" video=true >}}

## ¿Qué toca hacer ahora?

### Comparte tus dashboards fuera del sitio de Datadog

Haz clic en **Configurar URL pública** en el menú de exportación del dashboard para crear una URL que puedas compartir con pantallas grandes o con personas que no tengan necesariamente una cuenta en Datadog. Para más información, consulta [Compartir dashboards][13].

Integra las comunicaciones con tu equipo mediante la [integración de Slack][14] para importar dashboards y otras funciones de Datadog, como monitores e incidentes, a un canal de Slack.

### Crea varios dashboards con rapidez

Todos los dashboards tienen una representación JSON que puedes copiar o exportar desde el menú de configuración. Los widgets del dashboard también tienen una definición JSON; para editarla, abre el editor del widget (icono del lápiz) y haz clic en la pestaña JSON de **Graph your data** (Tus datos en un gráfico).

Dado que todos los <txprotected>widgets</txprotected> y dashboards se representan como JSON, puedes generarlos mediante programación utilizando la [API de dashboards][15], lo que resulta útil si deseas generar un dashboard cada vez que tu equipo inicie un nuevo proyecto o se encuentre con un incidente, o formalice un SLO, por ejemplo.

### Consulta los dashboards desde la aplicación móvil de Datadog

Consulta tus dashboards en tu dispositivo móvil con la [aplicación móvil de Datadog][16], disponible en [Apple App Store][17] y [Google Play Store][18]. 

La aplicación móvil te permite ver y buscar todos los dashboards a los que tienes acceso en tu organización de Datadog. Además, puedes filtrarlos usando las mismas variables de plantilla que en la aplicación web de Datadog.

{{< img src="dashboards/dashboards-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Dashboards en iOS y Android">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/
[2]: /es/metrics/introduction/
[3]: /es/metrics/explorer/
[4]: /es/integrations/amazon_s3/#data-collected
[5]: /es/dashboards/widgets/
[6]: /es/dashboards/querying/
[7]: /es/dashboards/functions/
[8]: /es/metrics/distributions/
[9]: /es/dashboards/template_variables/
[10]: /es/dashboards/
[11]: /es/dashboards/widgets/timeseries/
[12]: https://learn.datadoghq.com/courses/building-better-dashboards/
[13]: /es/dashboards/sharing/
[14]: /es/integrations/slack/
[15]: /es/api/v1/dashboards/
[16]: /es/service_management/mobile/
[17]: https://apps.apple.com/app/datadog/id1391380318
[18]: https://play.google.com/store/apps/details?id=com.datadog.app