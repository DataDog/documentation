---
aliases:
- /es/graphing/dashboards/widgets
- /es/graphing/faq/widgets
- /es/graphing/widgets
description: Bloques de construcción de dashboard para visualizar y correlacionar
  datos en toda la infraestructura con varios tipos de gráficos y visualizaciones.
further_reading:
- link: /dashboards/
  tag: Documentación
  text: Más información sobre dashboards
- link: /dashboards/widgets/configuration
  tag: Documentación
  text: Conoce las opciones de configuración de los widgets y las mejores prácticas
- link: /dashboards/widgets/types/
  tag: Documentación
  text: Explorar todos los tipos de widgets disponibles
title: Widgets
---

## Información general

Los widgets de dashboard son representaciones visuales de los datos. Sirven como bloques de construcción para tus [dashboards][2] para visualizar y correlacionar tus datos a través de tu infraestructura. Pueden contener distintos tipos de información, como gráficos, imágenes, logs y estados, para ofrecerte una visión general de tus sistemas y entornos.

## Para empezar

La forma más rápida de incorporar widgets relevantes para tus datos es clonar un dashboard de la [lista de preajustes][1], que incluye dashboards creados por otros miembros de tu organización y plantillas predefinidas para tus integraciones instaladas. Después de clonar un dashboard, puedes personalizar los widgets según tu caso de uso.


{{< whatsnext desc="Guías adicionales y cursos para conocer sobre widgets:" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}<u>Introducción a dashboards</u>: instrucciones para crear un dashboard con widgets{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}<u>Widgets de gráfico de dashboard</u>: curso del centro de aprendizaje que explica cómo crear, configurar y usar widgets de gráfico de dashboard{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}<u>Introducción a dashboards</u>: curso del centro de aprendizaje que explica cómo crear un dashboard en un entorno de pruebas{{< /nextlink >}}
{{< /whatsnext >}}

### Añadir un widget a tu dashboard

Para empezar a utilizar widgets en tus dashboards:

1. Navega hasta la [Lista de dashboards][1] en Datadog.
2. Haz clic en **New Dashboard** (Nuevo dashboards) o selecciona un dashboard existente para editarlo.
3. Haz clic en **Add Widget** (Añadir widget). Elige entre una variedad de tipos de widgets como series de tiempo, gráfico de barras, tabla o flujo de eventos.
4. Configurar tu widget:
    - Seleccionar la fuente de datos: elija métricas, logs, trazas u otras fuentes de datos.
    - Personalizar la visualización: ajusta la configuración de visualización, las unidades y los plazos para adaptarlos a tus necesidades.
    - Añadir contexto: utiliza enlaces personalizados, formato condicional y agrupación para obtener información mejorada.
5. Guarda tu dashboard y compártelo con tu equipo o externamente según sea necesario.

Para más información, consulta [Configuración de widgets][3] y explora los [Tipos de widgets][4] disponibles.

## Fuentes de datos

Los widgets pueden visualizar datos de múltiples fuentes de Datadog, entre ellas:

- **Trazas de APM**: datos de monitorización del rendimiento de las aplicaciones
- **Eventos**: eventos personalizados, despliegues y anotaciones.
- **Logs**: eventos de log, análisis de logs y métricas basadas en logs
- **Métricas**: infraestructura, aplicación y métricas personalizadas
- **RUM**: Real User Monitoring y datos de synthetic test
- **SLOs**: objetivos de nivel de servicio (SLO) y presupuestos de errores
- **Seguridad**: señales de seguridad y datos de cumplimiento

## Casos de uso común

{{% collapse-content title="Monitorización de infraestructura" level="h4" expanded=false %}}
- Utiliza widgets **Series temporales** para las métricas de CPU, memoria y red a lo largo del tiempo
- Utiliza widgets **Mapa de host** para visualizar el uso de recursos en toda tu infraestructura
- Utiliza los widgets **Lista principal** para identificar los hosts o servicios que consumen más recursos.
{{% /collapse-content %}}

{{% collapse-content title="Rendimiento de las aplicaciones" level="h4" expanded=false %}}
- Utiliza widgets **Series temporales** para realizar un seguimiento de los tiempos de respuesta, las tasas de error y el rendimiento.
- Utiliza los widgets **Resumen de servicios** para obtener una visión general del estado de los servicios.
- Utiliza los widgets **Mapa de topología** para visualizar las dependencias de los servicios y el flujo de datos.
{{% /collapse-content %}}

{{% collapse-content title="Inteligencia empresarial" level="h4" expanded=false %}}
- Utiliza widgets **Valor de consulta** para indicadores clave de rendimiento y métricas empresariales.
- Utiliza widgets **Embudo** para realizar un seguimiento de la conversión de los usuarios a través de tu aplicación.
- Utiliza widgets de **Retención** para analizar el compromiso y la rotación de los usuarios.
{{% /collapse-content %}}

{{% collapse-content title="Respuesta a incidentes" level="h4" expanded=false %}}
- Utiliza los widgets **Gráfico de alertas** para mostrar el historial y las tendencias de las alertas
- Utiliza los widgets **Resumen de monitor** para conocer el estado actual de las alertas en toda tu infraestructura.
- Utiliza los widgets **Flujo de eventos** para controlar los eventos en tiempo real
{{% /collapse-content %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists/preset/1
[2]: /es/dashboards/
[3]: /es/dashboards/widgets/configuration/
[4]: /es/dashboards/widgets/types/