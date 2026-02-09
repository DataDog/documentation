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
description: Visualiza tus datos para obtener más información
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Dashboards
  tag: Notas de versiones
  text: ¡Ëchales un vistazo a las últimas versiones de dashboards de Datadog! (Se
    requiere iniciar sesión en la aplicación).
- link: /dashboards/sharing/
  tag: Documentación
  text: Compartir gráficos fuera de Datadog
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Añade widgets del dashboard a tu portapapeles
- link: https://www.datadoghq.com/blog/datadog-dashboards/
  tag: Blog
  text: Una nueva experiencia con los dashboards de Datadog
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: Prácticas recomendadas
  text: Crea unos dashboards de integración excelentes
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participa en una sesión interactiva sobre las mejores visualizaciones con
    dashboards
title: Dashboards
---

## Información general

Los dashboards proporcionan información en tiempo real sobre el rendimiento y el estado de los sistemas y las aplicaciones de una organización. Permiten a los usuarios analizar visualmente los datos, realizar un seguimiento de los indicadores clave de rendimiento (KPI) y monitorizar tendencias de forma eficaz. Con los dashboards, los equipos pueden identificar anomalías, priorizar problemas, detectar problemas de forma proactiva, diagnosticar sus causas raíz y garantizar el cumplimiento de los objetivos de confiabilidad. Permite a tus equipos tomar decisiones informadas, optimizar las operaciones del sistema e impulsar el éxito empresarial, proporcionando una interfaz centralizada y fácil de utilizar para monitorizar y analizar los indicadores críticos de métricas y de rendimiento.

{{< whatsnext desc="Funciones del dashboard:">}}
    {{< nextlink href="/dashboards/configure" >}}Configuración: Información general sobre las opciones de configuración de dashboards{{< /nextlink >}}
    {{< nextlink href="/dashboards/list" >}}Lista de dashboards: Búsqueda, visualización o creación de dashboards y listas{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}Variable de plantilla: Filtrado dinámico de widgets en un dashboard{{< /nextlink >}}
    {{< nextlink href="/dashboards/guide/datadog_clipboard/" >}}Portapapeles de Datadog{{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API: Gestión de dashboards mediante programación{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Funciones gráficas:">}}
    {{< nextlink href="/dashboards/widgets" >}}Widgets: Obtén información sobre la configuración de diferentes visualizaciones{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}Consultas: Visualiza las opciones de formatos para las consultas gráficas{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}Funciones: Modifica consultas sobre métricas y los gráficos resultantes{{< /nextlink >}}
    {{< nextlink href="/dashboards/change_overlays" >}}Superposiciones: Superpone automáticamente eventos de cambios en gráficos{{< /nextlink >}}
{{< /whatsnext >}}

## Para empezar

Para crear un dashboard:
1. Haz clic en **+Nuevo dashboard** en la page (página) [Listas de dashboards][4] o en **Nuevo dashboard** en el menú de navegación.
2. Introduce un nombre para el dashboard y elige una opción de diseño.

{{< img src="dashboards/create-dashboard.png" alt="Añadir un nuevo dashboard" style="width:70%;">}}

Dashboards 
: Tienen un diseño basado en cuadrículas, que puede incluir una variedad de objetos como imágenes, gráficos y logs. Suelen utilizarse como tableros de estado o vistas narrativas que se actualizan en tiempo real y pueden representar puntos específicos del pasado. Tienen una anchura máxima de 12 cuadrados de cuadrícula y también resultan útiles para tareas de depuración.

Timeboards (Tableros temporales)
: Tienen un diseño automático que representa un único punto en el tiempo, ya sea fijo o en tiempo real, en todo el dashboard. Suelen utilizarse para solucionar problemas, la correlación y la exploración general de datos.

Screenboards (Pantallas)
: Dashboards con un diseño de forma libre que puede incluir una variedad de objetos, como imágenes, gráficos y logs. Suelen utilizarse como tableros de estado o vistas narrativas que se actualizan en tiempo real o que representan puntos específicos del pasado.

{{< whatsnext desc="Consulta los siguientes recursos:" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}Empezando con los dashboards{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Curso de aprendizaje: Presentación de los dashboards{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/building-better-dashboards" >}}Curso de aprendizaje: Crear mejores dashboards{{< /nextlink >}}
{{< /whatsnext >}}

## Frecuencia de actualización

La frecuencia de actualización de un dashboard privado depende del periodo de tiempo que se esté visualizando. Cuanto más corto sea el periodo, más a menudo se actualizarán los datos. Los dashboards compartidos públicamente se actualizan cada treinta segundos, independientemente del intervalo de tiempo que se haya seleccionado.

| Periodo de tiempo   | Frecuencia de actualización |
|--------------|--------------|
| 1 minuto     | 10 segundos   |
| 2 minutos    | 10 segundos   |
| 5 minutos    | 10 segundos   |
| 10 minutos   | 10 segundos   |
| 30 minutos   | 20 segundos   |
| 1 hora       | 20 segundos   |
| 3 horas      | 1 minuto     |
| 4 horas      | 1 minuto     |
| 1 día        | 3 minutos     |
| 2 días       | 10 minutos    |
| 1 semana       | 1 hora       |
| 1 mes      | 1 hora       |
| 3 meses     | 1 hora       |
| 6 meses     | 1 hora       |
| 1 año       | 1 hora       |

## Ver dashboards en dispositivos móviles

Consulta tus dashboards en formato móvil con la aplicación móvil de Datadog, disponible en [Apple App Store][2] y [Google Play Store][3]. La aplicación móvil viene equipada con widgets móviles en la pantalla de inicio que te permiten monitorizar servicios de salud y de infraestructura sin abrir la aplicación móvil.

**Nota**: Para configurar o editar un dashboard, debes iniciar sesión en la interfaz de usuario del navegador de Datadog. Para obtener más información sobre la instalación de la aplicación, consulta la documentación de la [aplicación móvil de Datadog][1].

## Referencias adicionales

{{< learning-center-callout header="Try Creating Graph Widgets in the Datadog Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/dashboard-graph-widgets">}} Explora los widgets de series temporales, valor de consulta, top list (lista principal), tabla, distribución y gráfico circular. Aprende a configurar los widgets y a comprender cuándo debe utilizarse cada tipo de widget. {{< /learning-center-callout >}}

{{< learning-center-callout header="Try Creating Table, List, SLO, and Architecture Widgets in the Datadog Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/discovering-table-list-widgets">}} Explora los widgets de tabla, lista, SLOs y arquitectura. Aprende a rastrear las métricas y el rendimiento de una aplicación web y descubre cómo presentar datos importantes. {{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists