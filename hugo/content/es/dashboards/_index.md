---
aliases:
- /es/guides/templating/
- /es/graphing/dashboards/
- /es/guides/graphing
- /es/graphing/miscellaneous/metrics_arithmetic
- /es/graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
- /es/graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
- /es/graphing/
- /es/dashboards/dashboards/
- /es/dashboards/screenboards/
- /es/dashboards/timeboards/
cascade:
  algolia:
    rank: 70
    tags:
    - snapshot
    - dashboards
description: Visualiza tus datos para obtener información
further_reading:
- link: /dashboards/sharing/
  tag: Documentación
  text: Comparte tus gráficos fuera de Datadog
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: Mejores prácticas
  text: Crea excelentes tableros de integración
- link: https://dtdg.co/fe
  tag: Habilitación de la fundación
  text: Únete a una sesión interactiva sobre mejores visualizaciones con Dashboards
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Agrega widgets de tablero a tu portapapeles
- link: https://www.datadoghq.com/blog/datadog-dashboards/
  tag: Blog
  text: La nueva experiencia de tableros de Datadog
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Diseña tableros ejecutivos efectivos con Datadog
- link: https://app.datadoghq.com/release-notes?category=Dashboards
  tag: Notas de la versión
  text: ¡Consulta los últimos lanzamientos de Dashboards de Datadog! (Se requiere
    inicio de sesión en la aplicación).
title: Dashboards
---
## Resumen {#overview}

Los paneles proporcionan información en tiempo real sobre el rendimiento y la salud de los sistemas y aplicaciones dentro de una organización. Permiten a los usuarios analizar visualmente los datos, rastrear indicadores clave de rendimiento (KPI) y monitorear tendencias de manera eficiente. Con los paneles, los equipos pueden identificar anomalías, priorizar problemas, detectar proactivamente problemas, diagnosticar causas raíz y asegurar que se cumplan los objetivos de confiabilidad. Empodera a tus equipos para tomar decisiones informadas, optimizar las operaciones del sistema y impulsar el éxito empresarial al proporcionar una interfaz centralizada y fácil de usar para monitorear y analizar métricas críticas e indicadores de rendimiento.

{{< whatsnext desc="Características del tablero:">}}
    {{< nextlink href="/dashboards/configure" >}}Configurar: Resumen de las opciones de configuración para tableros{{< /nextlink >}}
    {{< nextlink href="/dashboards/list" >}}Dashboard List: Buscar, ver o crear tableros y listas{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}Variables de plantilla: Filtrar dinámicamente widgets en un tablero{{< /nextlink >}}
    {{< nextlink href="/dashboards/guide/datadog_clipboard/" >}}Portapapeles de Datadog{{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API: Administrar tableros programáticamente{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Características de graficación:">}}
    {{< nextlink href="/dashboards/widgets" >}}Widgets: Aprender la configuración para diferentes visualizaciones{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}Consultas: Ver las opciones de formato para consultas gráficas{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}Funciones: Modificar consultas de métricas y gráficos resultantes{{< /nextlink >}}
    {{< nextlink href="/dashboards/change_overlays" >}}Superposiciones: Superponer automáticamente eventos de cambio en gráficos{{< /nextlink >}}
{{< /whatsnext >}}

## Comenzar {#get-started}

Para crear un tablero: 
1. Haz clic en **+Nuevo Tablero** en la página [Dashboard List][4] o **Nuevo Tablero** en el menú de navegación.
2. Introduce un nombre para el tablero y elige una opción de diseño.

{{< img src="dashboards/create-dashboard.png" alt="Agregando un nuevo tablero" style="width:70%;">}}

Dashboards 
: Un diseño basado en cuadrícula, que puede incluir una variedad de objetos como imágenes, gráficos y registros. Se utilizan comúnmente como tableros de estado o vistas narrativas que se actualizan en tiempo real, y pueden representar puntos fijos en el pasado. Tienen un ancho máximo de 12 cuadros de cuadrícula y también funcionan bien para la depuración.

Tableros de tiempo
: Diseños automáticos que representan un único punto en el tiempo—ya sea fijo o en tiempo real—en todo el tablero. Se utilizan comúnmente para la resolución de problemas, correlación y exploración general de datos.

Paneles visuales
: Paneles visuales con diseños de forma libre que pueden incluir una variedad de objetos como imágenes, gráficos y registros. Se utilizan comúnmente como paneles visuales de estado o vistas narrativas que se actualizan en tiempo real o representan puntos fijos en el pasado.

{{< whatsnext desc="Vea los siguientes recursos:" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}Introducción a los Dashboards{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Curso de aprendizaje: Introducción a los Dashboards{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/building-better-dashboards" >}}Curso de aprendizaje: Creando mejores Dashboards{{< /nextlink >}}
{{< /whatsnext >}}

## Frecuencia de actualización {#refresh-rate}

La frecuencia de actualización de un tablero privado depende del intervalo de tiempo que esté visualizando. Cuanto más corto sea el intervalo de tiempo, más frecuentemente se actualizan los datos. Los tableros compartidos públicamente se actualizan cada treinta segundos, independientemente del intervalo de tiempo seleccionado.

| Intervalo de tiempo   | Frecuencia de actualización |
|--------------|--------------|
| 1 minuto     | 10 segundos   |
| 2 minutos    | 10 segundos   |
| 5 minutos    | 10 segundos   |
| 10 minutos   | 10 segundos   |
| 30 minutos   | 20 segundos   |
| 1 hora       | 20 segundos   |
| 3 horas      | 1 minuto     |
| 4 horas      | 1 minuto     |
| 1 día        | 3 minutos     |
| 2 días       | 10 minutos    |
| 1 semana     | 1 hora       |
| 1 mes        | 1 hora       |
| 3 meses      | 1 hora       |
| 6 meses      | 1 hora       |
| 1 año        | 1 hora       |

## Ver tableros en dispositivos móviles {#view-dashboards-on-mobile-devices}

Vea sus tableros en un formato amigable para móviles con la aplicación móvil de Datadog, disponible en el [Apple App Store][2] y [Google Play Store][3]. La aplicación móvil viene equipada con widgets para la pantalla de inicio que te permiten hacer seguimiento de la salud del servicio y de la infraestructura sin abrir la aplicación móvil.

**Nota**: Para configurar o editar un tablero, debes iniciar sesión en la interfaz de usuario del navegador de Datadog. Para más información sobre la instalación de la aplicación, revisa la documentación de la [aplicación móvil de Datadog][1].

## Lectura adicional {#further-reading}

{{< learning-center-callout header="Prueba crear widgets de gráficos en el Centro de Aprendizaje de Datadog" btn_title="Inscríbete ahora" btn_url="https://learn.datadoghq.com/courses/dashboard-graph-widgets">}} Explora widgets de series temporales, valor de consulta, lista principal, tabla, distribución y gráfico circular. Aprende a configurar los widgets y entiende cuándo usar cada tipo de widget. {{< /learning-center-callout >}}

{{< learning-center-callout header="Prueba crear widgets de tabla, lista, SLO y arquitectura en el Centro de Aprendizaje de Datadog" btn_title="Inscríbete ahora" btn_url="https://learn.datadoghq.com/courses/discovering-table-list-widgets">}} Explora widgets de tabla, lista, SLO y arquitectura. Aprende a rastrear las métricas y el rendimiento de una aplicación web y descubre cómo presentar datos importantes. {{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists