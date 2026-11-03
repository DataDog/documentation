---
description: Aprenda a crear dashboards efectivos para el seguimiento de equipos,
  informes ejecutivos y resolución de problemas utilizando las herramientas de visualización
  de Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: blog
  text: Comparta dashboards de forma segura con cualquier persona fuera de su organización
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: blog
  text: Utilice variables de plantilla asociadas para refinar sus dashboards
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: Centro de aprendizaje
  text: Creación de mejores dashboards
- link: /dashboards/
  tag: Documentación
  text: Conceptos básicos de dashboards
- link: /notebooks/
  tag: Documentación
  text: Cuente una historia sobre los datos con notebooks
- link: /monitors/
  tag: Documentación
  text: Monitors, SLOs, notificaciones, tiempos de inactividad e incidentes
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva sobre mejores visualizaciones con Dashboards
title: Primeros pasos con dashboards
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Dashboarding">}}
  Explore y regístrese en las sesiones de Foundation Enablement. Aprenda a personalizar sus dashboards utilizando nuestra biblioteca de visualizaciones y el Dashboard builder de arrastrar y soltar. Habilite el éxito de su equipo compartiendo datos con las partes interesadas a través de informes, URLs públicas y notebooks.
{{< /learning-center-callout >}}

## Descripción general {#overview}

La clave para empezar con los dashboards es saber qué tipo de preguntas se hace regularmente. ¿Cuáles son los problemas comunes que enfrentan sus clientes? Cuando ocurre un problema, ¿qué preguntas le ayudan a encontrar una solución? 

Crear un buen dashboard consiste en sacar a la superficie las respuestas a estas preguntas. Además, es importante no abarrotar todos esos pensamientos en el mismo dashboard. Crear dashboards separados para identificar diferentes problemas puede ayudarle a encontrar sus respuestas rápidamente.

Esta guía le ayuda a comenzar en el camino hacia la creación de dashboards. Estos dashboards básicos permiten la discusión en equipo y aceleran la resolución de problemas.

## Requisitos previos {#prerequisites}

Si aún no lo ha hecho, cree una [cuenta de Datadog][1]. Instale el Agent en un servidor y una integración para algo que se ejecute en ese servidor.

## Plan {#plan}

Determine el propósito del Dashboard que está creando. Un Dashboard puede ayudarle a usted y a sus compañeros de equipo a concentrarse en el trabajo correcto. Un _Dashboard de equipo_ le recuerda qué es de alta prioridad, qué necesita atención y en qué está teniendo éxito. Cree un Dashboard de equipo (o varios) con la información que las personas necesitan con mayor frecuencia y que tienen que buscar. Los detalles de SLO y SLI son excelentes para un Dashboard de equipo.

Un Dashboard conectado a datos en tiempo real es una herramienta poderosa para guiar las conversaciones con gerentes y ejecutivos. Un buen _Dashboard ejecutivo_ puede mostrar que usted está trabajando en las cosas más importantes, cuánto le está costando un servicio o si está progresando hacia sus objetivos, cumpliendo sus SLO y escalando de manera efectiva. Los Dashboards ejecutivos son más efectivos cuando responden a estas preguntas al nivel más alto y están interconectados para comparar y analizar la respuesta.

Los Dashboards también pueden ayudarle a localizar problemas persistentes y solucionarlos. _Los Dashboards de solución de problemas_ a menudo comienzan como un bloc de notas de cosas que usted conoce y se desarrollan gradualmente a medida que descubre más. Por ejemplo, comience con un gráfico o widget de otro Dashboard o vista que muestre un problema. Puede analizar más a fondo desde allí para encontrar su solución.

## Explore out-of-the-box Dashboards {#explore-out-of-the-box-dashboards}

Datadog proporciona muchos out-of-the-box Dashboards para features e Integrations. Para la infraestructura que realiza seguimiento, consulte los out-of-the-box Dashboards que se proporcionan con Datadog:

1. En Datadog, vaya a la [Dashboards List page][2] y busque el nombre de una integración que haya agregado. Por ejemplo, `Redis`, o un feature que utilice, como `RUM`. 
2. Explore los resultados de búsqueda de Dashboards marcados como {{< ui >}}Preset{{< /ui >}} y vea si al menos algunos de los gráficos muestran las respuestas que busca.
3. Explore los enlaces en el menú desplegable del título del Dashboard out-of-the-box para encontrar más información sobre cómo los usuarios lo están utilizando.

## Comience reutilizando otros Dashboards {#start-by-reusing-other-dashboards}

Una forma común de comenzar un Dashboard es encontrando un Dashboard similar que ya esté en uso y ajustándolo para que se adapte a sus necesidades. Si encuentra un Dashboard que responde a muchas de las preguntas que desea que su Dashboard responda: 

1. Clónelo abriendo el Dashboard y seleccionando {{< ui >}}Clone dashboard{{< /ui >}} en el menú Configuration Actions (el botón {{< ui >}}Configure{{< /ui >}} en el lado derecho). Esto crea una copia no vinculada del Dashboard; los cambios que realice en la nueva copia no afectan al widget de origen.
  {{< img src="getting_started/dashboards/configure_clone_dashboard.png" alt="Opción Clone Dashboard en el menú Configuration Actions" style="width:100%;" >}}
2. Edite el clon abriéndolo y haciendo clic en {{< ui >}}Edit widgets{{< /ui >}}. 
3. Elimine los widgets que no necesite seleccionando {{< ui >}}Delete{{< /ui >}} en el menú Settings del widget.
4. Mueva los elementos según sus necesidades. Los grupos y los widgets individuales se pueden arrastrar y soltar en nuevas ubicaciones dentro del Dashboard.
5. Copie los widgets que le gusten de otros Dashboards pasando el cursor sobre el widget y presionando `Command + C` (`Ctrl + C` en Windows). Péguelo en su Dashboard abriéndolo y presionando `Command + V` (`Ctrl + V` en Windows).
5. Utilice la opción {{< ui >}}Export to Dashboard{{< /ui >}} que ofrecen muchas visualizaciones de Datadog para los datos que muestran. Por ejemplo, las visualizaciones Explorador de registros y Analítica de registros tienen opciones para compartir que permiten exportar listas de registros y métricas a tableros.

## Obtenga más información sobre las métricas {#learn-more-about-metrics}

A través de las integraciones, Datadog recopila [metrics][3] de su infraestructura y aplicaciones. Las métricas recopiladas están documentadas en los archivos README de la integración. Si encuentra una métrica en el [Metrics Explorer][4] o mientras crea un Dashboard, y desea saber qué es la métrica, búsquela en la documentación de Integrations. 

Por ejemplo, suponga que está viendo un gráfico de tiempo de la métrica `aws.s3.first_byte_latency`. Vaya a la sección [Data collected][5] del archivo README de la integración de Amazon S3 para ver su descripción: `The average per-request time from the complete request being received by a bucket to when the response starts to be returned. Shown as millisecond.`

## Agregue widgets y refine lo que muestran {#add-widgets-and-refine-what-they-show}

Después de haber seleccionado algunas métricas para agregar a su Dashboard, experimente con varios [tipos de widgets][6], [consultas][7], [funciones][8] y [enfoques de agregación][9], para mostrar los datos de las formas que mejor respondan a las preguntas que tenga. 

Al especificar variables de plantilla, puede hacer que un Dashboard responda preguntas para una selección de escenarios. Por ejemplo, puede crear un gráfico de tiempo que muestre métricas de latencia para la geografía del centro de datos que el usuario seleccione en el menú desplegable de variables del Dashboard, o para todos ellos juntos. Para obtener más información, consulte [Template Variables][10].

Puede hacer que los gráficos sean más fáciles de leer ajustando los rangos del eje Y, los colores o las leyendas, o agregando marcadores y superposiciones de eventos. Consulte la [Dashboards documentation][11] para conocer todas las formas en que puede personalizar y refinar [series temporales][12] y [otros widgets][6].

Para obtener más detalles y ejemplos de estas técnicas, inscríbase en el curso de aprendizaje en línea [Building Better Dashboards][13].

## Pruebe otros widgets {#try-out-other-widgets}

Los gráficos de series temporales de métricas son útiles, pero los paneles pueden contener muchos tipos de widgets para comunicar información importante. Pruebe:

 - **Valores de alerta y estados de verificación**: Muestre números grandes en rojo, amarillo y verde para llamar la atención sobre éxitos o problemas.
 - **Mapas de calor**: Muestre relaciones complejas entre métricas e infraestructura a través de múltiples etiquetas con gráficos intuitivos de intensidad de color.
   {{< img src="getting_started/dashboards/heatmap_widget.png" alt="Ejemplo de mapa de calor" >}}
 - **iFrames, texto con formato e imágenes**: Muestre cualquier cantidad de detalles similares a los de un sitio web para ayudar a explicar el contenido del Dashboard y proporcionar recursos adicionales.
 - **Tablas**: Muestre listas de métricas agrupadas por claves de etiqueta.
 - **Top lists**: Por ejemplo, muestre qué servidores tienen menos espacio libre, qué servicios arrojan la mayor cantidad de errores o qué URL devuelven la mayor cantidad de errores 404.
 - **Mapa de servidores**: Muestre un diagrama de, por ejemplo, los servidores en su infraestructura con colores que muestren el estado de sus integraciones o servicios.
 - **Service Level Objectives (SLO)**: Muestre el desempeño del equipo frente a los objetivos con un widget de SLO y agrúpelo con widgets adicionales que muestren detalles de las métricas de SLI.
 - **Distribuciones**: Muestre, por ejemplo, un histograma del número de diferentes tipos de eventos en un entorno contenedorizado, el número de errores críticos en cada servicio, el flujo del sitio web (número de usuarios que llegan a la página 2, página 3, página 4) o los cubos de percentiles de latencia.

Consulte [Widgets][6] para obtener más información y ejemplos sobre cómo configurar estos gráficos.

## Organice, vincule y analice {#organize-link-and-analyze}

Mueva los gráficos para que creen un flujo para el trabajo que realiza o las conversaciones que tiene sobre el Dashboard. Arrastre y suelte los widgets para colocarlos. En screenboards, use Free Text widgets para organizar secciones bajo encabezados. En timeboards, agregue un Group widget que pueda contener múltiples widgets y que pueda colapsarse para que no estorbe cuando esté viendo el Dashboard.

Para los Dashboards que crecen mucho, use pestañas para organizar los widgets en secciones con nombre. Haga clic en {{< ui >}}\+{{< /ui >}} en la barra de pestañas (o {{< ui >}}Add New Tab{{< /ui >}} en el menú desplegable junto a {{< ui >}}Add Widgets{{< /ui >}}) para agregar una pestaña, luego mueva los widgets entre pestañas desde el menú de compartir (⋮) de cada widget. El uso de pestañas mantiene un único Dashboard enfocado y fácil de navegar sin requerir que los espectadores se desplacen por contenido no relacionado. Para obtener más información, consulte [Pestañas][20].

Existen dos formas de crear enlaces desde un Dashboard a cualquier URL de destino:

 - Agregue un Notes and Links widget, que puede contener texto con formato Markdown, incluidos enlaces. El editor de widgets incluye consejos de formato Markdown.
 - Cree un Custom link desde el menú de Settings (engranaje) de un widget. Los Custom links pueden interpolar variables y variables de plantilla, de modo que el enlace cambie según lo que el usuario haya seleccionado al hacer clic, llevándolo exactamente al lugar correcto para analizar datos o tomar medidas correctivas. 
     {{< img src="getting_started/dashboards/opening_custom_link.mp4" alt="Abrir un Custom link" video=true >}}

## ¿Qué sigue? {#whats-next}

### Comparta sus Dashboards fuera del sitio de Datadog {#share-your-dashboards-outside-of-the-datadog-site}

Haga clic en {{< ui >}}Configure Public URL{{< /ui >}} en el menú de exportación de un Dashboard para crear una URL que pueda compartir con pantallas grandes o personas que no necesariamente tengan una cuenta de Datadog. Para obtener más información, consulte [Compartir Dashboards][14].

Intégrese con las comunicaciones de su equipo usando la [Slack integration][15] para importar Dashboards y otras funciones de Datadog, como monitores e incidentes, a un canal de Slack.

### Cree múltiples Dashboards rápidamente {#create-multiple-dashboards-quickly}

Cada Dashboard tiene una representación JSON que puede copiar o exportar desde el menú de Settings. Cada widget en el Dashboard también tiene una definición JSON, la cual puede ver y editar abriendo el widget editor (icono de lápiz) y haciendo clic en la pestaña JSON debajo de {{< ui >}}Graph your data{{< /ui >}}.

Debido a que todos los widgets y Dashboards están representados como JSON, puede generarlos programáticamente usando la [Dashboards API][16], lo cual es útil si desea generar un Dashboard cada vez que su equipo comienza un nuevo proyecto o se enfrenta a un incidente, o formaliza un SLO, por ejemplo.

### Vea Dashboards desde la aplicación móvil de Datadog {#view-dashboards-from-the-datadog-mobile-app}

Vea sus Dashboards en su dispositivo móvil con la [aplicación móvil de Datadog][17], disponible en la [Apple App Store][18] y [Google Play Store][19]. 

La aplicación móvil le permite ver y buscar todos los Dashboards a los que tiene acceso en su organización de Datadog, y filtrarlos usando las mismas variables de plantilla utilizadas en el Datadog web app.

{{< img src="dashboards/dashboards-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Dashboards en iOS y Android">}}

## Lecturas adicionales {#further-reading}

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
[20]: /es/dashboards/configure/#tabs