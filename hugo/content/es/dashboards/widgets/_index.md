---
aliases:
- /es/graphing/dashboards/widgets
- /es/graphing/faq/widgets
- /es/graphing/widgets
description: Bloques de construcción de Dashboard para visualizar y correlacionar
  datos en la infraestructura con varios tipos de gráficos y displays.
further_reading:
- link: /dashboards/
  tag: Documentación
  text: Aprenda más sobre Dashboards
- link: /dashboards/widgets/configuration
  tag: Documentación
  text: Conozca las opciones de configuración de widgets y las mejores prácticas
- link: /dashboards/widgets/types/
  tag: Documentación
  text: Explore todos los tipos de widgets disponibles
title: Widgets
---
## Resumen {#overview}

Los Dashboard widgets son representaciones visuales de datos. Sirven como los bloques de construcción para sus [Dashboards][2] para visualizar y correlacionar sus datos a través de su infraestructura. Pueden contener diferentes tipos de información, como gráficos, imágenes, registros y estados, para darle una visión general de sus sistemas y entornos.

## Comience {#get-started}

La forma más rápida de incorporar widgets relevantes a sus datos es clonar un Dashboard de la [lista preestablecida][1], que incluye Dashboards creados por otros miembros de su organización y plantillas listas para usar para sus integraciones instaladas. Después de clonar un Dashboard, puede personalizar los widgets para su caso de uso.


{{< whatsnext desc="Guías y cursos adicionales para aprender sobre widgets:" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}<u>Introducción a Dashboards</u>: Guía para construir un Dashboard con widgets{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}<u>Dashboard Graph Widgets</u>: Curso del centro de aprendizaje que explica cómo crear, configurar y usar los Dashboard Graph Widgets{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}<u>Introduction to Dashboards</u>: Curso del centro de aprendizaje que explica cómo construir un Dashboard en un entorno de pruebas{{< /nextlink >}}
{{< /whatsnext >}}

### Agregue un widget a su Dashboard {#add-a-widget-to-your-dashboard}

Para comenzar a usar widgets en sus Dashboards:

1. Navegue a la [Dashboard List][1] en Datadog.
2. Haga clic en {{< ui >}}New Dashboard{{< /ui >}} o seleccione un Dashboard existente para editar.
3. Haga clic en {{< ui >}}Add Widget{{< /ui >}}. Elija entre una variedad de tipos de widgets, como series temporales, gráfico de barras, tabla o flujo de eventos.
4. Configure su widget:
    - Seleccione la fuente de datos: Elija métricas, registros, trazas u otras fuentes de datos.
    - Personalice la visualización: Ajuste la configuración de visualización, unidades y períodos de tiempo para adaptarse a sus necesidades.
    - Agregue contexto: Utilice enlaces personalizados, formato condicional y agrupación para obtener información mejorada.
5. Guarde su Dashboard y compártalo con su equipo o externamente según sea necesario.

Para más información, consulte [Widget Configuration][3] y explore los [Widget Types][4] disponibles.

### Organice los widgets con pestañas {#organize-widgets-with-tabs}

A medida que los Dashboards crecen, utilice pestañas para agrupar los widgets en secciones nombradas. En modo de edición, abra el menú de compartir de un widget y seleccione **Mover a pestaña** para asignarlo a una pestaña existente o crear una nueva. Las pestañas aparecen como una barra de navegación en la parte superior del Dashboard, permitiendo a los usuarios navegar directamente a la sección que necesitan. Para más información, consulte [Pestañas][5].

## Fuentes de datos {#data-sources}

Los widgets pueden visualizar datos de múltiples fuentes de Datadog, incluyendo:

- **APM Traces**: Datos de monitoreo del rendimiento de la aplicación.
- **Eventos**: Eventos personalizados, implementaciones y anotaciones
- **Registros**: Eventos de registro, análisis de registros y métricas basadas en registros
- **Métricas**: Infraestructura, aplicación y métricas personalizadas
- **RUM**: Real User Monitoring y datos de prueba Synthetic
- **SLOs**: Service Level Objectives y error budgets
- **Seguridad**: Señales de seguridad y datos de cumplimiento

## Casos de uso comunes {#common-use-cases}

{{% collapse-content title="Infrastructure Monitoring" level="h4" expanded=false %}}
- Utilice **widgets de series temporales** para métricas de CPU, memoria y red a lo largo del tiempo
- Utilice **widgets de hostmap** para visualizar el uso de recursos en su infraestructura
- Utilice **widgets de lista principal** para identificar los hosts o servicios más intensivos en recursos
{{% /collapse-content %}}

{{% collapse-content title="Rendimiento de Aplicaciones" level="h4" expanded=false %}}
- Utilice **widgets de series temporales** para rastrear tiempos de respuesta, tasas de error y rendimiento
- Utilice **widgets de Service Summary** para obtener una visión general de la salud del servicio a alto nivel.
- Utilice **widgets de Topology Map** para visualizar las dependencias del servicio y el flujo de datos.
{{% /collapse-content %}}

{{% collapse-content title="Inteligencia Empresarial" level="h4" expanded=false %}}
- Utilice **widgets de Query Value** para indicadores clave de rendimiento y métricas empresariales.
- Utilice **widgets de Funnel** para rastrear la conversión de usuarios a través de su aplicación.
- Utilice **widgets de Retention** para analizar el compromiso y la deserción de usuarios.
{{% /collapse-content %}}

{{% collapse-content title="Incident Response" level="h4" expanded=false %}}
- Utilice **widgets de Alert Graph** para mostrar el historial y las tendencias de alertas.
- Utilice **widgets de Monitor Summary** para el estado actual de alertas en su infraestructura.
- Utilice **widgets de Event Stream** para el monitoreo de eventos en tiempo real.
{{% /collapse-content %}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists/preset/1
[2]: /es/dashboards/
[3]: /es/dashboards/widgets/configuration/
[4]: /es/dashboards/widgets/types/
[5]: /es/dashboards/configure/#tabs